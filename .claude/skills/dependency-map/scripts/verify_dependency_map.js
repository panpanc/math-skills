#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function usage() {
  console.error(
    [
      "Usage:",
      "  node scripts/verify_dependency_map.js <dependency_map.md> [--allow-terminal id1,id2] [--json]",
      "",
      "Checks section structure, table integrity, layering consistency, and structural edge quality."
    ].join("\n")
  );
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const out = {
    positionals: [],
    allowTerminal: new Set(),
    json: false
  };
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (a === "--help" || a === "-h") {
      out.help = true;
      continue;
    }
    if (a === "--json") {
      out.json = true;
      continue;
    }
    if (a === "--allow-terminal") {
      i += 1;
      const raw = args[i] || "";
      raw.split(",").map((x) => x.trim()).filter(Boolean).forEach((id) => out.allowTerminal.add(id));
      continue;
    }
    if (a.startsWith("--")) {
      throw new Error(`Unknown option: ${a}`);
    }
    out.positionals.push(a);
  }
  return out;
}

function splitTableRow(line) {
  return line
    .split("|")
    .map((x) => x.trim())
    .filter((x) => x.length > 0);
}

function extractTableAfterHeading(markdown, headingRegex, label) {
  const m = markdown.match(headingRegex);
  if (!m || m.index == null) {
    throw new Error(`Missing section heading for ${label}`);
  }
  const lines = markdown.slice(m.index).split("\n");
  const table = [];
  let started = false;
  for (const line of lines) {
    if (!started) {
      if (line.trim().startsWith("|")) {
        started = true;
        table.push(line);
      }
      continue;
    }
    if (line.trim().startsWith("|")) {
      table.push(line);
      continue;
    }
    if (line.trim() === "") continue;
    break;
  }
  if (table.length < 3) throw new Error(`Malformed table for ${label}`);
  return {
    header: splitTableRow(table[0]),
    body: table.slice(2).map(splitTableRow)
  };
}

function tableToObjects(table, expected, label) {
  const h = table.header.map((x) => x.toLowerCase());
  const e = expected.map((x) => x.toLowerCase());
  if (h.length !== e.length) throw new Error(`${label} header has wrong width`);
  for (let i = 0; i < e.length; i += 1) {
    if (h[i] !== e[i]) throw new Error(`${label} header mismatch at column ${i + 1}: expected "${expected[i]}", got "${table.header[i]}"`);
  }
  return table.body.map((row, idx) => {
    if (row.length !== expected.length) throw new Error(`${label} row ${idx + 1} has wrong width`);
    const obj = {};
    expected.forEach((k, i) => {
      obj[k] = row[i].replace(/\s+/g, " ").trim();
    });
    return obj;
  });
}

function parseLayerIndex(markdown) {
  const m = markdown.match(/^##\s*5\)\s*Layered Learning Order[^\n]*$/m);
  if (!m || m.index == null) return { map: {}, count: 0 };
  const lines = markdown.slice(m.index).split("\n");
  const layerMap = {};
  const layerOrder = [];
  const rx = /^\s*-\s*`L(\d+)`:\s*(.+)\s*$/;
  for (const line of lines) {
    const lm = line.match(rx);
    if (!lm) {
      if (layerOrder.length > 0 && line.trim().startsWith("## ")) break;
      continue;
    }
    const layerNum = Number(lm[1]);
    if (!layerOrder.includes(layerNum)) layerOrder.push(layerNum);
    const ids = Array.from(lm[2].matchAll(/`([^`]+)`/g)).map((x) => x[1].trim()).filter(Boolean);
    ids.forEach((id) => {
      layerMap[id] = layerNum;
    });
  }
  return { map: layerMap, count: layerOrder.length, maxLayer: layerOrder.length > 0 ? Math.max(...layerOrder) : null };
}

function findCycles(nodeIds, edges) {
  const indeg = {};
  const out = {};
  nodeIds.forEach((id) => {
    indeg[id] = 0;
    out[id] = [];
  });
  edges.forEach((e) => {
    indeg[e.to] += 1;
    out[e.from].push(e.to);
  });
  const q = nodeIds.filter((id) => indeg[id] === 0);
  let visited = 0;
  while (q.length > 0) {
    const v = q.shift();
    visited += 1;
    out[v].forEach((nxt) => {
      indeg[nxt] -= 1;
      if (indeg[nxt] === 0) q.push(nxt);
    });
  }
  return visited !== nodeIds.length;
}

function checkFenceBalance(markdown) {
  const fenceCount = (markdown.match(/```/g) || []).length;
  return fenceCount % 2 === 0;
}

function checkLatexBalance(markdown) {
  const ds = (markdown.match(/\$\$/g) || []).length;
  if (ds % 2 !== 0) return false;
  const stripped = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\$\$[\s\S]*?\$\$/g, "")
    .replace(/\\\$/g, "");
  const inline = (stripped.match(/\$/g) || []).length;
  return inline % 2 === 0;
}

function main() {
  const opts = parseArgs(process.argv);
  if (opts.help) {
    usage();
    process.exit(0);
  }
  const inputArg = opts.positionals[0];
  if (!inputArg) {
    usage();
    throw new Error("Missing dependency map markdown file.");
  }
  const inputPath = path.resolve(process.cwd(), inputArg);
  if (!fs.existsSync(inputPath)) {
    throw new Error(`File not found: ${inputPath}`);
  }

  const markdown = fs.readFileSync(inputPath, "utf8");
  const errors = [];
  const warnings = [];

  for (let i = 1; i <= 10; i += 1) {
    const rx = new RegExp(`^##\\s*${i}\\)\\s+`, "m");
    if (!rx.test(markdown)) errors.push(`Missing required section heading: ## ${i}) ...`);
  }

  if (!/```mermaid[\s\S]*?```/m.test(markdown)) {
    errors.push("Missing Mermaid graph block.");
  }

  if (!checkFenceBalance(markdown)) {
    errors.push("Unclosed fenced code block(s).");
  }
  if (!checkLatexBalance(markdown)) {
    errors.push("Unbalanced LaTeX delimiters.");
  }

  let nodes = [];
  let edges = [];
  try {
    const nodeTable = extractTableAfterHeading(markdown, /^##\s*2\)\s*Node Inventory\s*$/m, "Node Inventory");
    const edgeTable = extractTableAfterHeading(markdown, /^##\s*3\)\s*Dependency Edge Ledger\s*$/m, "Dependency Edge Ledger");
    nodes = tableToObjects(nodeTable, ["id", "label", "type", "source", "confidence"], "Node table");
    edges = tableToObjects(edgeTable, ["from", "to", "rationale", "confidence"], "Edge table");
  } catch (err) {
    errors.push(err.message);
  }

  if (nodes.length > 0) {
    const ids = new Set();
    nodes.forEach((n) => {
      if (ids.has(n.id)) errors.push(`Duplicate node id: ${n.id}`);
      ids.add(n.id);
    });

    edges.forEach((e) => {
      if (!ids.has(e.from)) errors.push(`Edge source not in node table: ${e.from}`);
      if (!ids.has(e.to)) errors.push(`Edge target not in node table: ${e.to}`);
    });

    const layer = parseLayerIndex(markdown);
    if (nodes.length >= 6 && layer.count < 3) {
      errors.push(`Expected at least 3 learning layers for non-trivial map; found ${layer.count}.`);
    }

    const indeg = {};
    const outdeg = {};
    nodes.forEach((n) => {
      indeg[n.id] = 0;
      outdeg[n.id] = 0;
    });
    edges.forEach((e) => {
      indeg[e.to] += 1;
      outdeg[e.from] += 1;
      const lf = layer.map[e.from];
      const lt = layer.map[e.to];
      if (Number.isFinite(lf) && Number.isFinite(lt) && lf > lt) {
        errors.push(`Layering violation: ${e.from} -> ${e.to} goes from L${lf} to earlier L${lt}.`);
      }
    });

    const maxLayer = layer.maxLayer;
    nodes.forEach((n) => {
      const l = layer.map[n.id];
      if (!Number.isFinite(l)) {
        warnings.push(`Node ${n.id} not assigned to any layer.`);
      }
      if (n.type === "concept" && outdeg[n.id] === 0 && indeg[n.id] > 0) {
        if (Number.isFinite(maxLayer) && Number.isFinite(l) && l < maxLayer && !opts.allowTerminal.has(n.id)) {
          errors.push(
            `Concept ${n.id} is a mid-layer leaf (L${l}) with no unlocks. Add an outgoing edge, move to final layer, or pass --allow-terminal ${n.id}.`
          );
        }
      }
      if (n.type === "theorem" && indeg[n.id] === 0 && outdeg[n.id] > 0) {
        if (Number.isFinite(l) && l > 0) {
          warnings.push(`Theorem ${n.id} has no prerequisites but appears in L${l}.`);
        }
      }
    });

    const hasCycle = findCycles(nodes.map((n) => n.id), edges);
    if (hasCycle && !/cycle/i.test(markdown)) {
      warnings.push("Graph contains a cycle but cycle handling/mention is not obvious in markdown.");
    }
  }

  const result = {
    file: inputPath,
    node_count: nodes.length,
    edge_count: edges.length,
    errors,
    warnings,
    ok: errors.length === 0
  };

  if (opts.json) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(`Verification: ${result.ok ? "PASS" : "FAIL"}`);
    console.log(`- file: ${result.file}`);
    console.log(`- nodes: ${result.node_count}`);
    console.log(`- edges: ${result.edge_count}`);
    if (warnings.length > 0) {
      console.log("- warnings:");
      warnings.forEach((w) => console.log(`  - ${w}`));
    }
    if (errors.length > 0) {
      console.log("- errors:");
      errors.forEach((e) => console.log(`  - ${e}`));
    }
  }

  if (!result.ok) process.exit(1);
}

try {
  main();
} catch (err) {
  console.error(`[error] ${err.message}`);
  process.exit(1);
}
