---
name: dependency-map
description: Build a concept-and-theorem dependency map for a course, including a prerequisite DAG, learning layers, and bottleneck concepts
---

Build a dependency map for course material so a learner can see what depends on what, in what order to study, and where the conceptual bottlenecks are.
In addition to the markdown map, also produce an interactive HTML graph that supports prerequisite highlighting.

## Perspective

Write as a mathematically rigorous curriculum architect. You care about:
- Explicit dependency edges instead of vague "you should know this first"
- Separating concept dependencies from theorem dependencies
- Showing uncertainty where source material is ambiguous
- Producing a map that is actionable for study sequencing

## Instructions

1. **Parse arguments**: The user provides `$ARGUMENTS`, which may contain:
   - A course directory (for example, `<topic>_course/`)
   - One or more files (for example, `00_syllabus.md`, chapter markdown, notes)
   - A topic phrase if no files are provided (for example, `"real analysis course dependency map"`)
   - Optional focus hints (for example, `"focus on convergence theorems"`)
   Parse up to 5 file paths if provided.

2. **Load source material**:
   - If a directory is provided, read `00_syllabus.md` first (if present), then chapter files in lexical order.
   - If specific files are provided, read those files only.
   - If no files are provided, infer a canonical course skeleton from the topic and mark inferred items clearly as inferred.
   - Do not repeat large source passages; extract dependencies.

3. **Extract nodes**:
   - Build a node list with 2 required node types:
     - `concept` (definitions, constructions, techniques)
     - `theorem` (theorems, lemmas, propositions, corollaries)
   - For each node include:
     - `id` (short slug)
     - `label`
     - `type`
     - `source` (chapter/file or `inferred`)
     - `confidence` (`high`, `medium`, `low`)

4. **Infer dependency edges**:
   - Use directed edges `A -> B` meaning "A is required before B."
   - Include only meaningful prerequisite edges:
     - concept -> concept
     - concept -> theorem
     - theorem -> theorem
     - theorem -> concept (rare; only if explicitly used to motivate/define later material)
   - For each edge, provide a one-line rationale.
   - If a cyclic dependency appears, keep both directions only if truly unavoidable and flag the cycle explicitly as pedagogical coupling.

5. **Write output** with these mandatory sections, in order:

   ### 1) Scope and Inputs
   - List the input files/topic
   - State whether the map is extracted, inferred, or mixed
   - Define what counts as a dependency in this map

   ### 2) Node Inventory
   - Table of nodes with columns: `id | label | type | source | confidence`

   ### 3) Dependency Edge Ledger
   - Table of edges with columns: `from | to | rationale | confidence`
   - Keep rationales compact and concrete

   ### 4) Global Dependency Graph
   - One Mermaid directed graph containing major nodes and edges
   - If the graph is too dense, add subgraphs by unit/chapter

   ### 5) Layered Learning Order (Topological View)
   - Group nodes into study layers `L0, L1, ...` where each layer depends only on earlier layers
   - If true DAG layering is impossible due to cycles, isolate cycle clusters and explain

   ### 6) Bottlenecks and Keystone Results
   - Identify high-outdegree prerequisites (concept bottlenecks)
   - Identify theorem chokepoints (results reused by many later results)
   - Explain why each is central

   ### 7) Minimal Prerequisite Paths
   - Choose 3-5 important target theorems/concepts
   - For each, give one minimal prerequisite chain

   ### 8) Ambiguities and Alternative Edges
   - List edge decisions that were uncertain or school-dependent
   - Provide at least 2 plausible alternative edges/orderings when relevant

   ### 9) Study Plans From the Map
   - Propose 2-3 map-based study traversals (for example: theorem-first, intuition-first, exam-focused)
   - Each traversal must reference layers/nodes from section 5

   ### 10) Sanity Check Summary
   - Number of nodes, number of edges, number of cycle clusters (if any)
   - One-paragraph summary of what the dependency shape reveals about the course

6. **Generate companion HTML dependency viewer**:
   - Save a second file that visualizes the same nodes and edges as an interactive directed graph.
   - Treat `<course_slug>_dependency_map.html` as a final artifact: generate/overwrite it only after the audit-and-repair loop reaches `pass` or `pass-with-notes`.
   - During audit iterations, you may generate a temporary HTML (for example, `<course_slug>_dependency_map.draft.html`) only for strict-structure checks; delete this temporary draft before the workflow finishes.
   - Use a browser-side graph library (preferred: Cytoscape.js with dagre layout via CDN scripts) so no build step is required.
   - Implement modes with explicit controls: `Prereqs`, `Unlocks`, `Bottleneck`, and `Path`.
   - In `Prereqs`, clicking a node highlights all transitive prerequisites (all ancestors following incoming edges), plus the edges on those prerequisite paths.
   - In `Unlocks`, clicking a node highlights all transitive descendants (what this node unlocks), plus edges on those descendant paths.
   - In `Bottleneck`, color/size nodes by bottleneck score `100 * (0.5*descendants_norm + 0.3*outdegree_norm + 0.2*betweenness_norm)`.
   - In `Path`, let users choose a target node and optional known nodes; highlight the lowest-cost prerequisite chain using edge weights (`high=1`, `medium=1.5`, `low=2`).
   - Include a clear/reset control to remove highlighting and restore base styling.
   - Include a side panel showing selected node metadata (`id`, `label`, `type`, `source`, `confidence`), prerequisite/unlock counts, bottleneck score, and current path trace.
   - Keep the HTML self-contained except for CDN library imports; embed graph data directly in the file as JSON.
   - Reuse `assets/interactive_viewer_template.html` when present; replace template placeholders with generated title/data.
   - Prefer running `scripts/generate_dependency_map_html.js` to generate/validate HTML from the markdown map rather than hand-editing HTML.

7. **Formatting rules**:
   - Use concise prose and explicit dependency claims
   - Use LaTeX only for formal math expressions when needed
   - Use fenced code blocks only for Mermaid diagrams and compact traces/tables
   - Include at least one Mermaid graph in section 4
   - If parallel tracks exist (for example, analytic vs algebraic development), show branching in Mermaid
   - Mark uncertain edges explicitly with `confidence: low`
   - Keep markdown and HTML data aligned: the HTML node/edge data must match the markdown node and edge ledgers by `id`, `from`, and `to`

8. **Naming**:
   - Save as `<course_slug>_dependency_map.md`
   - Save companion HTML as `<course_slug>_dependency_map.html`
   - Save the temporary audit report as `<course_slug>_dependency_map_audit.md`; delete it after the final map and final HTML are verified.
   - If source is a directory, use the directory stem as slug
   - If source is a single file, use file stem as slug
   - If topic-only, derive a concise slug from the topic

9. **Automatic audit-and-repair loop (required)**:
   - After generating the initial markdown map + companion HTML, invoke `dependency-map-audit` on the generated markdown file.
   - Parse section `5) Proposed Edge Patch Set` in the audit report and read the machine-readable directive block:
     - `add|from|to|rationale|confidence`
     - `remove|from|to|rationale|confidence`
     - `relabel|from|to|rationale|confidence`
     - `noop|-|-|...|...`
   - Apply all `high` confidence directives automatically.
   - Apply `medium` directives only when they do not introduce layer-order violations and do not contradict explicit source material.
   - Do not auto-apply `low` directives; instead document them in section 8 (Ambiguities).
   - After applying directives, regenerate all derived parts so they remain consistent:
     - Section 3 edge ledger
     - Section 4 Mermaid graph
     - Section 5 layered order
     - Section 6 bottlenecks/chokepoints
     - Section 7 minimal prerequisite paths
     - Section 9 study traversals (if layer indices changed)
     - Section 10 counts
     - Temporary companion HTML file for lint/validation
   - Re-run deterministic verification and strict-structure lint.
   - Re-run `dependency-map-audit` after repairs.
   - Stop when verdict is `pass` or `pass-with-notes`, or after 2 repair iterations.
   - Once loop exits with `pass`/`pass-with-notes`, generate the final `<course_slug>_dependency_map.html` from the finalized markdown map.
   - If still `needs-revision` after 2 iterations, keep the best map, list unresolved findings in section 8, and report them explicitly in the final response because the temporary audit file will be deleted.
   - After the final markdown map and final HTML pass verification, delete `<course_slug>_dependency_map.draft.html` if it exists.
   - After the final markdown map and final HTML pass verification, delete `<course_slug>_dependency_map_audit.md`.

10. **Verify**:
   a. All 10 sections exist and are non-empty  
   b. Node table includes `id, label, type, source, confidence`  
   c. Edge table includes `from, to, rationale, confidence`  
   d. At least one Mermaid dependency graph exists  
   e. Layered order includes at least 3 layers unless the source is tiny  
   f. Cycles are explicitly flagged if present  
   g. No unclosed fenced code blocks  
   h. No unclosed LaTeX delimiters  
   i. No LaTeX math inside fenced code blocks  
   j. Markdown file and companion HTML file both exist with matching slug  
   k. HTML includes embedded graph data for all listed nodes and edges (no unresolved template placeholders)  
   l. HTML mode controls exist for `Prereqs`, `Unlocks`, `Bottleneck`, and `Path`  
   m. `Prereqs` and `Unlocks` clicks correctly highlight transitive ancestors/descendants  
   n. `Path` mode supports target selection, optional known nodes, and shortest path highlighting  
   o. `Bottleneck` mode shows heatmap using computed node scores  
   p. HTML includes a clear/reset control and side panel metrics  
   q. Run deterministic map verification via `node scripts/verify_dependency_map.js <generated_md_file>` and fix all reported errors  
   r. Run structural lint via `node scripts/generate_dependency_map_html.js <generated_md_file> --strict-structure`; if it fails, either repair the map or justify intentional terminal concepts using `--allow-terminal` in verification  
   s. Any concept node with zero outdegree outside the final learning layer is either connected by additional edges, moved to final layer, or explicitly justified in section 8  
   t. During the audit-repair loop, the audit report file exists and includes patch directives + verdict  
   u. Before completion, any temporary `<course_slug>_dependency_map.draft.html` file has been deleted  
   v. Before completion, `<course_slug>_dependency_map_audit.md` has been deleted after any needed unresolved findings were copied into section 8 and/or the final response  
   w. Read generated files and fix issues found

11. **Progress output**:
   `Generated dependency map for <course/topic> with node inventory, edge ledger, layered order, bottleneck analysis, interactive HTML viewer, automatic audit-repair pass, and temporary draft/audit cleanup`

12. **Follow-up suggestions**:

   > **What's next?**
   > - Deep-dive a bottleneck node: `/explore <generated_file> <node label> deeper`
   > - Explain a keystone theorem: `/theorem <theorem label from this map>`
   > - Re-run the audit on the final map if you want a fresh sidecar report: `/dependency-map-audit <generated_file>`
   > - Build a map-scoped course to a target: `/course-from-map <generated_file> <target node label>`
   > - Expand into a full course: `/course-markdown <topic implied by this map>`
   > - Open the interactive graph: `<generated_html_file>`

   Use the actual generated filenames and node/theorem names from the output.

## Example usage

```
/dependency-map linear_algebra_course/
/dependency-map real_analysis_course/ focus on convergence theorems
/dependency-map 00_syllabus.md ch01_limits.md ch02_continuity.md
/dependency-map abstract algebra course dependency map

# Optional: deterministic HTML generation from an existing markdown map
node .claude/skills/dependency-map/scripts/generate_dependency_map_html.js linear_algebra_dependency_map.md
```
