---
name: dependency-map-audit
description: Audit a dependency map markdown file for structural and semantic correctness, then produce concrete edge fixes
---

Audit a dependency map markdown file to determine whether concept/theorem dependencies are credible, directionally correct, and pedagogically coherent. Produce a concrete review report and actionable fixes.

## Perspective

Write as a mathematically rigorous reviewer who:
- Treats edge claims as falsifiable prerequisite statements
- Separates "provably malformed" issues from "judgment calls"
- Flags missing load-bearing prerequisites and over-strong edges
- Prioritizes high-confidence fixes over speculative rewrites

## Instructions

1. **Parse arguments**: The user provides `$ARGUMENTS`, typically:
   - A dependency map markdown file (`*_dependency_map.md`) (required)
   - Optional focus scope (`"duality edges"`, `"geometry section"`, `"target strong duality"`)
   - Optional strictness hints (`"conservative"`, `"aggressive"`)

2. **Load source map**:
   - Read the file.
   - Extract:
     - Section `2) Node Inventory`
     - Section `3) Dependency Edge Ledger`
     - Section `5) Layered Learning Order`
     - Section `8) Ambiguities and Alternative Edges` (if present)

3. **Run deterministic checks first**:
   - Run:
     - `node .claude/skills/dependency-map/scripts/verify_dependency_map.js <map_file>`
     - `node .claude/skills/dependency-map/scripts/generate_dependency_map_html.js <map_file> --strict-structure`
   - Include results in the audit report.
   - If deterministic checks fail, continue auditing but mark deterministic failures as priority-0 fixes.

4. **Perform semantic audit (no API calls)**:
   - Evaluate every edge category:
     - concept -> concept
     - concept -> theorem
     - theorem -> theorem
     - theorem -> concept (rare)
   - Identify:
     - **Missing edges**: load-bearing prerequisites implied by surrounding map structure
     - **Wrong-direction edges**: dependencies that appear reversed
     - **Over-strong edges**: edges that seem optional or school-dependent
     - **Dead-end concepts**: concept nodes that unlock nothing without justification
   - Use confidence levels (`high`, `medium`, `low`) for each finding.

5. **Write audit report** with these mandatory sections:

   ### 1) Scope and Inputs
   - Input file
   - Focus scope
   - Audit mode (conservative/aggressive)

   ### 2) Deterministic Verification Results
   - `verify_dependency_map.js` summary
   - `generate_dependency_map_html.js --strict-structure` summary
   - Explicit PASS/FAIL for each

   ### 3) High-Confidence Semantic Findings
   - Table: `type | from | to | issue | suggested_fix | confidence`
   - Include only high-confidence issues

   ### 4) Medium/Low Confidence Findings
   - Table: `type | from | to | concern | alternative | confidence`
   - Clearly mark uncertain items

   ### 5) Proposed Edge Patch Set
   - List concrete edits:
     - add `A -> B`
     - remove `A -> B`
     - relabel rationale for `A -> B`
   - Keep this as the minimal patch set that resolves the high-confidence findings
   - Include a machine-readable patch directive block immediately after the human-readable list, using this exact format:

     ```text
     action|from|to|rationale|confidence
     add|node_a|node_b|short rationale|high
     remove|node_c|node_d|short rationale|medium
     relabel|node_e|node_f|updated rationale text|high
     ```

   - If no changes are needed, still include the header and a single `noop` row:

     ```text
     action|from|to|rationale|confidence
     noop|-|-|no patch required|high
     ```

   ### 6) Layer and Terminal-Node Review
   - Check whether terminal concepts are plausible terminals
   - Identify concepts that should unlock downstream content
   - Recommend layer adjustments if needed

   ### 7) Re-verification Checklist
   - Exact commands to rerun after patching
   - Expected pass criteria

   ### 8) Final Verdict
   - Verdict: `pass`, `pass-with-notes`, or `needs-revision`
   - One paragraph on overall trust level of the map

6. **Output naming**:
   - Save audit as `<map_slug>_audit.md` in current working directory.

7. **Verification of the audit file**:
   - Ensure all 8 sections exist and are non-empty
   - Ensure section 5 contains a machine-readable patch directive block
   - No unclosed fenced code blocks
   - No unclosed LaTeX delimiters
   - Read and fix issues

8. **Progress output**:
   `Audited dependency map <map_file>: deterministic checks + semantic edge review + patch recommendations`

9. **Follow-up suggestions**:

> **What's next?**
> - Apply high-confidence patch set to the map and regenerate HTML
> - Re-audit after edits: `/dependency-map-audit <map_file>`
> - Expand corrected map into a course: `/course-from-map <map_file> <target>`

Use actual filenames from the audit.

## Example usage

```
/dependency-map-audit convex_analysis_dependency_map.md
/dependency-map-audit real_analysis_dependency_map.md focus on convergence theorems
/dependency-map-audit optimization_dependency_map.md conservative
```
