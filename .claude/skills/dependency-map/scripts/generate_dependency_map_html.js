#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const CONFIDENCE_VALUES = new Set(["high", "medium", "low"]);
const NODE_TYPES = new Set(["concept", "theorem"]);
const EDGE_WEIGHT = {
  high: 1,
  medium: 1.5,
  low: 2
};

function usage() {
  console.error(
    [
      "Usage:",
      "  node scripts/generate_dependency_map_html.js <input.md> [output.html]",
      "",
      "Options:",
      "  --template <path>   HTML template path (default: ../assets/interactive_viewer_template.html)",
      "  --title <text>      Override HTML title",
      "  --strict            Fail on unknown type/confidence values (default: true)",
      "  --no-strict         Warn instead of failing on unknown type/confidence values",
      "  --strict-structure  Fail when structural lint checks detect suspicious nodes",
      "  --help              Show help"
    ].join("\n")
  );
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const out = {
    strict: true,
    strictStructure: false,
    positionals: []
  };

  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (a === "--help" || a === "-h") {
      out.help = true;
      continue;
    }
    if (a === "--strict") {
      out.strict = true;
      continue;
    }
    if (a === "--no-strict") {
      out.strict = false;
      continue;
    }
    if (a === "--strict-structure") {
      out.strictStructure = true;
      continue;
    }
    if (a === "--template") {
      i += 1;
      out.template = args[i];
      continue;
    }
    if (a === "--title") {
      i += 1;
      out.title = args[i];
      continue;
    }
    if (a.startsWith("--")) {
      throw new Error(`Unknown option: ${a}`);
    }
    out.positionals.push(a);
  }

  return out;
}

function fail(message) {
  throw new Error(message);
}

function warn(message) {
  console.warn(`[warn] ${message}`);
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeText(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

function slugToTitle(slug) {
  return slug
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function getDefaultOutputPath(inputPath) {
  if (inputPath.toLowerCase().endsWith(".md")) {
    return inputPath.slice(0, -3) + ".html";
  }
  return inputPath + ".html";
}

function splitTableRow(line) {
  return line
    .split("|")
    .map((x) => x.trim())
    .filter((x) => x.length > 0);
}

function extractTableAfterHeading(markdown, headingRegex) {
  const match = markdown.match(headingRegex);
  if (!match || match.index == null) {
    fail(`Missing section heading: ${headingRegex}`);
  }

  const lines = markdown.slice(match.index).split("\n");
  const tableLines = [];
  let started = false;

  for (const line of lines) {
    if (!started) {
      if (line.trim().startsWith("|")) {
        started = true;
        tableLines.push(line);
      }
      continue;
    }

    if (line.trim().startsWith("|")) {
      tableLines.push(line);
      continue;
    }

    if (line.trim() === "") {
      continue;
    }

    break;
  }

  if (tableLines.length < 3) {
    fail(`Malformed markdown table near section: ${headingRegex}`);
  }

  const header = splitTableRow(tableLines[0]);
  const body = tableLines.slice(2).map(splitTableRow);

  return { header, body };
}

function verifyHeader(actual, expected, context) {
  const norm = actual.map((s) => s.toLowerCase());
  const target = expected.map((s) => s.toLowerCase());
  if (norm.length !== target.length) {
    fail(`${context} header has ${norm.length} columns, expected ${target.length}`);
  }
  for (let i = 0; i < target.length; i += 1) {
    if (norm[i] !== target[i]) {
      fail(`${context} header mismatch at column ${i + 1}: got "${actual[i]}", expected "${expected[i]}"`);
    }
  }
}

function tableToObjects(table, expectedHeader, context) {
  verifyHeader(table.header, expectedHeader, context);
  return table.body.map((cols, rowIdx) => {
    if (cols.length !== expectedHeader.length) {
      fail(`${context} row ${rowIdx + 1} has ${cols.length} cells; expected ${expectedHeader.length}`);
    }
    const obj = {};
    expectedHeader.forEach((h, i) => {
      obj[h] = cols[i].replace(/\s+/g, " ").trim();
    });
    return obj;
  });
}

function validateNodes(nodes, strict) {
  if (nodes.length === 0) {
    fail("Node inventory is empty.");
  }

  const ids = new Set();
  for (const n of nodes) {
    if (!n.id) fail("Node with empty id.");
    if (ids.has(n.id)) fail(`Duplicate node id: ${n.id}`);
    ids.add(n.id);

    if (!n.label) fail(`Node ${n.id} has empty label.`);
    if (!n.type) fail(`Node ${n.id} has empty type.`);
    if (!n.source) fail(`Node ${n.id} has empty source.`);
    if (!n.confidence) fail(`Node ${n.id} has empty confidence.`);

    if (!NODE_TYPES.has(n.type.toLowerCase())) {
      const msg = `Node ${n.id} has unknown type "${n.type}"`;
      if (strict) fail(msg);
      warn(msg);
    }

    if (!CONFIDENCE_VALUES.has(n.confidence.toLowerCase())) {
      const msg = `Node ${n.id} has unknown confidence "${n.confidence}"`;
      if (strict) fail(msg);
      warn(msg);
    }
  }
}

function validateEdges(edges, nodeIds, strict) {
  if (edges.length === 0) {
    fail("Edge ledger is empty.");
  }
  for (const e of edges) {
    if (!e.from || !e.to) {
      fail("Edge contains empty from/to.");
    }
    if (!nodeIds.has(e.from)) {
      fail(`Edge source "${e.from}" is not in node inventory.`);
    }
    if (!nodeIds.has(e.to)) {
      fail(`Edge target "${e.to}" is not in node inventory.`);
    }
    if (!e.rationale) {
      fail(`Edge ${e.from} -> ${e.to} has empty rationale.`);
    }
    if (!e.confidence) {
      fail(`Edge ${e.from} -> ${e.to} has empty confidence.`);
    }
    if (!CONFIDENCE_VALUES.has(e.confidence.toLowerCase())) {
      const msg = `Edge ${e.from} -> ${e.to} has unknown confidence "${e.confidence}"`;
      if (strict) fail(msg);
      warn(msg);
    }
  }
}

function extractDocTitle(markdown, inputPath) {
  const m = markdown.match(/^#\s+(.+)\s*$/m);
  if (m && m[1]) return m[1].trim();

  const base = path.basename(inputPath).replace(/\.md$/i, "");
  return slugToTitle(base);
}

function parseLayerIndex(markdown) {
  const heading = markdown.match(/^##\s*5\)\s*Layered Learning Order[^\n]*$/m);
  if (!heading || heading.index == null) return {};
  const lines = markdown.slice(heading.index).split("\n");
  const layerIndex = {};
  const rx = /^\s*-\s*`L(\d+)`:\s*(.+)\s*$/;
  for (const line of lines) {
    const m = line.match(rx);
    if (!m) {
      if (Object.keys(layerIndex).length > 0 && line.trim().startsWith("## ")) break;
      continue;
    }
    const level = Number(m[1]);
    const ids = Array.from(m[2].matchAll(/`([^`]+)`/g)).map((x) => x[1].trim()).filter(Boolean);
    ids.forEach((id) => {
      layerIndex[id] = level;
    });
  }
  return layerIndex;
}

function structuralLint(nodes, edges, layerIndex) {
  const indeg = {};
  const outdeg = {};
  nodes.forEach((n) => {
    indeg[n.id] = 0;
    outdeg[n.id] = 0;
  });
  edges.forEach((e) => {
    outdeg[e.from] += 1;
    indeg[e.to] += 1;
  });

  const layerVals = Object.values(layerIndex);
  const maxLayer = layerVals.length > 0 ? Math.max(...layerVals) : null;

  const warnings = [];
  const isolated = nodes.filter((n) => indeg[n.id] === 0 && outdeg[n.id] === 0);
  if (isolated.length > 0) {
    warnings.push({
      code: "isolated-nodes",
      message: `Isolated nodes with no incoming/outgoing edges: ${isolated.map((n) => n.id).join(", ")}`
    });
  }

  const suspiciousLeaves = nodes.filter((n) => {
    if (n.type !== "concept") return false;
    if (outdeg[n.id] !== 0) return false;
    const hasIncoming = indeg[n.id] > 0;
    if (!hasIncoming) return false;
    if (maxLayer == null) return true;
    const layer = layerIndex[n.id];
    if (!Number.isFinite(layer)) return true;
    return layer < maxLayer;
  });
  if (suspiciousLeaves.length > 0) {
    warnings.push({
      code: "mid-layer-concept-leaf",
      message:
        "Concept nodes that unlock nothing outside final layer (possible missing edges): " +
        suspiciousLeaves.map((n) => n.id).join(", ")
    });
  }

  const suspiciousRoots = nodes.filter((n) => {
    if (n.type !== "theorem") return false;
    if (indeg[n.id] !== 0) return false;
    const hasOutgoing = outdeg[n.id] > 0;
    if (!hasOutgoing) return false;
    if (maxLayer == null) return true;
    const layer = layerIndex[n.id];
    if (!Number.isFinite(layer)) return true;
    return layer > 0;
  });
  if (suspiciousRoots.length > 0) {
    warnings.push({
      code: "theorem-root",
      message:
        "Theorem nodes with no prerequisites away from base layer (possible missing inbound edges): " +
        suspiciousRoots.map((n) => n.id).join(", ")
    });
  }

  return warnings;
}

function confidenceWeight(confidence) {
  const key = String(confidence || "medium").toLowerCase();
  return EDGE_WEIGHT[key] || EDGE_WEIGHT.medium;
}

function buildIndex(nodes, edges) {
  const incoming = {};
  const outgoing = {};
  const ids = nodes.map((n) => n.id);

  ids.forEach((id) => {
    incoming[id] = [];
    outgoing[id] = [];
  });

  edges.forEach((e) => {
    const row = {
      from: e.from,
      to: e.to,
      confidence: e.confidence,
      weight: confidenceWeight(e.confidence)
    };
    incoming[e.to].push(row);
    outgoing[e.from].push(row);
  });

  return { incoming, outgoing, ids };
}

function collectReachable(startId, direction, index) {
  const seen = new Set([startId]);
  const reached = new Set();
  const stack = [startId];

  while (stack.length > 0) {
    const current = stack.pop();
    const nextEdges = direction === "in" ? index.incoming[current] : index.outgoing[current];
    nextEdges.forEach((edge) => {
      const nextId = direction === "in" ? edge.from : edge.to;
      reached.add(nextId);
      if (!seen.has(nextId)) {
        seen.add(nextId);
        stack.push(nextId);
      }
    });
  }

  return reached;
}

function computeBetweenness(index) {
  const ids = index.ids;
  const bc = {};
  ids.forEach((id) => {
    bc[id] = 0;
  });

  ids.forEach((s) => {
    const stack = [];
    const pred = {};
    const sigma = {};
    const dist = {};

    ids.forEach((id) => {
      pred[id] = [];
      sigma[id] = 0;
      dist[id] = -1;
    });

    sigma[s] = 1;
    dist[s] = 0;
    const queue = [s];

    while (queue.length > 0) {
      const v = queue.shift();
      stack.push(v);
      index.outgoing[v].forEach((edge) => {
        const w = edge.to;
        if (dist[w] < 0) {
          queue.push(w);
          dist[w] = dist[v] + 1;
        }
        if (dist[w] === dist[v] + 1) {
          sigma[w] += sigma[v];
          pred[w].push(v);
        }
      });
    }

    const delta = {};
    ids.forEach((id) => {
      delta[id] = 0;
    });

    while (stack.length > 0) {
      const w = stack.pop();
      pred[w].forEach((v) => {
        if (sigma[w] > 0) {
          delta[v] += (sigma[v] / sigma[w]) * (1 + delta[w]);
        }
      });
      if (w !== s) {
        bc[w] += delta[w];
      }
    }
  });

  return bc;
}

function computeBottleneckMetrics(nodes, edges) {
  const index = buildIndex(nodes, edges);
  const betweenness = computeBetweenness(index);
  const metrics = {};

  let maxOut = 0;
  let maxDesc = 0;
  let maxBc = 0;

  nodes.forEach((n) => {
    const outdegree = index.outgoing[n.id].length;
    const descendants = collectReachable(n.id, "out", index).size;
    const bc = betweenness[n.id] || 0;
    maxOut = Math.max(maxOut, outdegree);
    maxDesc = Math.max(maxDesc, descendants);
    maxBc = Math.max(maxBc, bc);
    metrics[n.id] = {
      outdegree,
      descendants,
      betweenness: Number(bc.toFixed(4)),
      score: 0
    };
  });

  Object.keys(metrics).forEach((id) => {
    const m = metrics[id];
    const outNorm = maxOut > 0 ? m.outdegree / maxOut : 0;
    const descNorm = maxDesc > 0 ? m.descendants / maxDesc : 0;
    const bcNorm = maxBc > 0 ? m.betweenness / maxBc : 0;
    const score = 100 * (0.5 * descNorm + 0.3 * outNorm + 0.2 * bcNorm);
    m.score = Number(score.toFixed(1));
  });

  return metrics;
}

function main() {
  const opts = parseArgs(process.argv);
  if (opts.help) {
    usage();
    process.exit(0);
  }

  const scriptDir = __dirname;
  const defaultTemplate = path.resolve(scriptDir, "../assets/interactive_viewer_template.html");

  const inputArg = opts.positionals[0];
  const outputArg = opts.positionals[1];

  if (!inputArg) {
    usage();
    fail("Missing required input markdown file.");
  }

  const inputPath = path.resolve(process.cwd(), inputArg);
  const outputPath = outputArg
    ? path.resolve(process.cwd(), outputArg)
    : getDefaultOutputPath(inputPath);
  const templatePath = opts.template
    ? path.resolve(process.cwd(), opts.template)
    : defaultTemplate;

  if (!fs.existsSync(inputPath)) {
    fail(`Input file not found: ${inputPath}`);
  }
  if (!fs.existsSync(templatePath)) {
    fail(`Template file not found: ${templatePath}`);
  }

  const markdown = readText(inputPath);
  const template = readText(templatePath);
  const title = opts.title || extractDocTitle(markdown, inputPath);

  const nodeTable = extractTableAfterHeading(markdown, /^##\s*2\)\s*Node Inventory\s*$/m);
  const edgeTable = extractTableAfterHeading(markdown, /^##\s*3\)\s*Dependency Edge Ledger\s*$/m);

  const nodes = tableToObjects(
    nodeTable,
    ["id", "label", "type", "source", "confidence"],
    "Node table"
  );
  const edges = tableToObjects(
    edgeTable,
    ["from", "to", "rationale", "confidence"],
    "Edge table"
  );

  validateNodes(nodes, opts.strict);
  const nodeIds = new Set(nodes.map((n) => n.id));
  validateEdges(edges, nodeIds, opts.strict);
  const layerIndex = parseLayerIndex(markdown);
  const lintWarnings = structuralLint(nodes, edges, layerIndex);
  lintWarnings.forEach((w) => warn(`[${w.code}] ${w.message}`));
  if (opts.strictStructure && lintWarnings.length > 0) {
    fail(`Structural lint failed with ${lintWarnings.length} warning(s).`);
  }

  if (!template.includes("__TITLE__")) {
    fail("Template placeholder __TITLE__ missing.");
  }
  if (!template.includes("__DEPENDENCY_JSON__")) {
    fail("Template placeholder __DEPENDENCY_JSON__ missing.");
  }

  const payload = {
    nodes,
    edges,
    metrics: {
      formula: "score = 100 * (0.5*descendants_norm + 0.3*outdegree_norm + 0.2*betweenness_norm)",
      edge_weights: EDGE_WEIGHT,
      byNode: computeBottleneckMetrics(nodes, edges)
    },
    lint: {
      warnings: lintWarnings
    }
  };
  const json = JSON.stringify(payload, null, 2);
  const html = template
    .replace(/__TITLE__/g, title)
    .replace("__DEPENDENCY_JSON__", json);

  const unresolvedJsonSlot = /<script id="dependency-data" type="application\/json">\s*__DEPENDENCY_JSON__\s*<\/script>/m;
  if (unresolvedJsonSlot.test(html)) {
    fail("Template JSON slot was not replaced.");
  }
  if (/<title>\s*__TITLE__\s*<\/title>/.test(html)) {
    fail("Template title placeholder was not replaced.");
  }

  writeText(outputPath, html);

  console.log(`Generated HTML dependency viewer`);
  console.log(`- markdown: ${inputPath}`);
  console.log(`- html: ${outputPath}`);
  console.log(`- template: ${templatePath}`);
  console.log(`- nodes: ${nodes.length}`);
  console.log(`- edges: ${edges.length}`);
}

try {
  main();
} catch (err) {
  console.error(`[error] ${err.message}`);
  process.exit(1);
}
