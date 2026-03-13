#!/usr/bin/env node
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const SUPPORTED_DIRECTIVES = [
  "graph",
  "flowchart",
  "sequenceDiagram",
  "classDiagram",
  "stateDiagram",
  "stateDiagram-v2",
  "erDiagram",
  "journey",
  "gantt",
  "pie",
  "mindmap",
  "timeline",
  "gitGraph",
  "quadrantChart",
  "xychart-beta",
  "requirementDiagram",
  "C4Context",
  "C4Container",
  "C4Component",
  "C4Dynamic",
  "C4Deployment",
  "block-beta"
];

function usage(exitCode = 0) {
  const message = [
    "Usage:",
    "  node verify_mermaid_blocks.js [--require-mermaid] <markdown_file>",
    "",
    "Options:",
    "  --require-mermaid  Fail if no Mermaid blocks are found."
  ].join("\n");
  if (exitCode === 0) {
    console.log(message);
  } else {
    console.error(message);
  }
  process.exit(exitCode);
}

function parseArgs(argv) {
  let requireMermaid = false;
  let filePath = null;
  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") {
      usage(0);
    } else if (arg === "--require-mermaid") {
      requireMermaid = true;
    } else if (arg.startsWith("-")) {
      console.error(`Unknown option: ${arg}`);
      usage(2);
    } else if (!filePath) {
      filePath = arg;
    } else {
      console.error(`Unexpected argument: ${arg}`);
      usage(2);
    }
  }
  if (!filePath) {
    usage(2);
  }
  return { filePath, requireMermaid };
}

function extractMermaidBlocks(markdown) {
  const lines = markdown.split(/\r?\n/);
  const blocks = [];
  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim();
    if (!/^```mermaid$/i.test(trimmed)) {
      continue;
    }

    const startLine = i + 1;
    const contentLines = [];
    let closed = false;

    for (i += 1; i < lines.length; i += 1) {
      if (/^```\s*$/.test(lines[i].trim())) {
        closed = true;
        break;
      }
      contentLines.push(lines[i]);
    }

    blocks.push({
      index: blocks.length + 1,
      startLine,
      content: contentLines.join("\n"),
      closed
    });

    if (!closed) {
      break;
    }
  }
  return blocks;
}

function getFirstMeaningfulLine(block) {
  const lines = block.content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const text = lines[i].trim();
    if (!text || text.startsWith("%%")) {
      continue;
    }
    return {
      text,
      line: block.startLine + 1 + i
    };
  }
  return null;
}

function isSupportedDirective(text) {
  return SUPPORTED_DIRECTIVES.some((directive) =>
    new RegExp(`^${directive.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text)
  );
}

function directiveBase(text) {
  const firstToken = text.split(/\s+/)[0];
  return firstToken.toLowerCase();
}

function validateSubgraphBalance(block, errors) {
  const lines = block.content.split(/\r?\n/);
  let depth = 0;
  for (let i = 0; i < lines.length; i += 1) {
    const text = lines[i].trim();
    if (!text || text.startsWith("%%")) {
      continue;
    }
    if (/^subgraph\b/i.test(text)) {
      depth += 1;
      continue;
    }
    if (/^end\b/i.test(text)) {
      depth -= 1;
      if (depth < 0) {
        errors.push(
          `Block #${block.index} line ${block.startLine + 1 + i}: found "end" without matching "subgraph".`
        );
        depth = 0;
      }
    }
  }
  if (depth !== 0) {
    errors.push(
      `Block #${block.index} line ${block.startLine}: "subgraph" and "end" are unbalanced (${depth} unmatched).`
    );
  }
}

function validateDelimiterBalance(block, errors) {
  const openerFor = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"]
  ]);
  const closerFor = new Map([
    ["(", ")"],
    ["[", "]"],
    ["{", "}"]
  ]);

  const stack = [];
  const lines = block.content.split(/\r?\n/);
  let inDoubleQuote = false;
  let escaped = false;

  for (let lineOffset = 0; lineOffset < lines.length; lineOffset += 1) {
    const source = lines[lineOffset];
    const text = source.trimStart().startsWith("%%") ? "" : source;
    for (let col = 0; col < text.length; col += 1) {
      const ch = text[col];

      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        escaped = true;
        continue;
      }

      if (inDoubleQuote) {
        if (ch === "\"") {
          inDoubleQuote = false;
        }
        continue;
      }

      if (ch === "\"") {
        inDoubleQuote = true;
        continue;
      }

      if (closerFor.has(ch)) {
        stack.push({
          ch,
          line: block.startLine + 1 + lineOffset,
          col: col + 1
        });
        continue;
      }

      if (openerFor.has(ch)) {
        const needed = openerFor.get(ch);
        const top = stack[stack.length - 1];
        if (!top || top.ch !== needed) {
          errors.push(
            `Block #${block.index} line ${block.startLine + 1 + lineOffset}:${col + 1}: unmatched "${ch}".`
          );
          continue;
        }
        stack.pop();
      }
    }
  }

  if (inDoubleQuote) {
    errors.push(`Block #${block.index} line ${block.startLine}: unclosed double quote.`);
  }
  for (const unclosed of stack) {
    errors.push(
      `Block #${block.index} line ${unclosed.line}:${unclosed.col}: unclosed "${unclosed.ch}" (expected "${closerFor.get(
        unclosed.ch
      )}").`
    );
  }
}

function commandExists(command) {
  const result = spawnSync(command, ["--version"], { stdio: "ignore" });
  return result.status === 0;
}

function looksLikeBrowserRuntimeFailure(stderr) {
  const haystack = `${stderr || ""}`.toLowerCase();
  return (
    haystack.includes("failed to launch the browser process") ||
    haystack.includes("could not find chrome") ||
    haystack.includes("could not find chromium") ||
    haystack.includes("no usable sandbox")
  );
}

function validateWithMmdc(filePath, blocks, errors, warnings) {
  if (!commandExists("mmdc")) {
    warnings.push("mmdc not found; parser-level Mermaid validation skipped (heuristic checks still applied).");
    return;
  }

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "mermaid-verify-"));
  let parserDisabled = false;
  try {
    for (const block of blocks) {
      const inPath = path.join(tempDir, `block_${block.index}.mmd`);
      const outPath = path.join(tempDir, `block_${block.index}.svg`);
      fs.writeFileSync(inPath, `${block.content}\n`, "utf8");

      const run = spawnSync("mmdc", ["-i", inPath, "-o", outPath, "--quiet"], {
        encoding: "utf8"
      });

      if (run.status === 0) {
        continue;
      }

      if (looksLikeBrowserRuntimeFailure(run.stderr)) {
        parserDisabled = true;
        warnings.push(
          "mmdc is installed but cannot launch Chromium in this environment; falling back to heuristic checks only."
        );
        break;
      }

      const message = `${run.stderr || run.stdout || "unknown mmdc error"}`.trim().split(/\r?\n/)[0];
      errors.push(`Block #${block.index} line ${block.startLine}: mmdc parse/render failed: ${message}`);
    }
  } finally {
    if (!parserDisabled) {
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
      } catch (_err) {
        // Best-effort cleanup only.
      }
    }
  }
}

function main() {
  const { filePath, requireMermaid } = parseArgs(process.argv.slice(2));
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(2);
  }

  const markdown = fs.readFileSync(filePath, "utf8");
  const blocks = extractMermaidBlocks(markdown);
  const errors = [];
  const warnings = [];

  if (requireMermaid && blocks.length === 0) {
    errors.push("No Mermaid blocks found, but --require-mermaid was set.");
  }

  for (const block of blocks) {
    if (!block.closed) {
      errors.push(`Block #${block.index} line ${block.startLine}: unclosed Mermaid fence.`);
      continue;
    }

    const first = getFirstMeaningfulLine(block);
    if (!first) {
      errors.push(`Block #${block.index} line ${block.startLine}: Mermaid block is empty.`);
      continue;
    }

    if (!isSupportedDirective(first.text)) {
      errors.push(
        `Block #${block.index} line ${first.line}: unsupported or missing Mermaid directive "${first.text}".`
      );
      continue;
    }

    const base = directiveBase(first.text);
    if (base === "graph" || base === "flowchart") {
      validateSubgraphBalance(block, errors);
    }
    validateDelimiterBalance(block, errors);
  }

  validateWithMmdc(filePath, blocks, errors, warnings);

  if (errors.length > 0) {
    console.error(`Mermaid verification FAILED for ${filePath}`);
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    for (const warning of warnings) {
      console.error(`- warning: ${warning}`);
    }
    process.exit(1);
  }

  console.log(`Mermaid verification PASS for ${filePath} (${blocks.length} block${blocks.length === 1 ? "" : "s"} checked)`);
  for (const warning of warnings) {
    console.log(`warning: ${warning}`);
  }
}

main();
