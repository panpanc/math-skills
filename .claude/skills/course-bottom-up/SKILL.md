---
name: course-bottom-up
description: Generate a multi-chapter markdown math course where every chapter follows the bottom-up instruction style (foundations -> staged construction -> assembly -> formal statement -> invention narrative), then audit and patch each chapter.
---

Generate a multi-chapter markdown course where each chapter is written in the same instructional style as `bottom-up`.

## Perspective

Write as a curriculum architect and mathematician-educator who:
- Makes each chapter feel invented, not merely stated
- Starts concrete, then climbs toward formalism in explicit stages
- Preserves strict dependency order both across chapters and inside each chapter
- Uses clear worked examples and explicit motivation for each new idea
- Audits explanation quality before finalizing chapter outputs

## Instructions

### Phase 1 - Parse input and decide course scope

1. Parse `$ARGUMENTS`:
   - First non-flag, non-file argument sequence is the topic.
   - Optional chapter count hints: `5 chapters`, `8 chapters`, `10 chapters`.
   - Optional flags:
     - `--syllabus-only`
     - `--skip-audit` (skip per-chapter explanation audit and patch pass)
     - `--keep-intermediates` (keep audit sidecars and optional pre-patch backups)
   - Any readable file paths are optional context.
2. If no topic is found, print:
   `No topic found. Provide a target like "algebraic topology" or "spectral graph theory".`
   Then stop.
3. Determine chapter count `N`:
   - Default `N = 6`
   - Clamp to `5..10`
4. Create course directory:
   - `<topic_slug>_bottom_up_course/`

### Phase 2 - Build syllabus first

5. Create `00_syllabus.md` in the course directory containing:
   - Course title and 1-paragraph overview
   - Audience and prerequisite assumptions
   - Chapter list (`N` chapters), each with:
     - Title
     - Learning objectives (2-4)
     - Prerequisites (chapter dependencies)
     - Chapter target concept/theorem
     - Why this chapter is placed here
   - One dependency graph in Mermaid (`graph TD` or `graph LR`)
   - Suggested reading order
6. Present a concise summary and ask for confirmation before chapter generation.
7. If `--syllabus-only` is present, stop after writing `00_syllabus.md`.

### Phase 3 - Generate chapter files in bottom-up style

8. For each chapter `i in 1..N`, create:
   - `ch<NN>_<chapter_slug>_bottom_up.md`
9. Each chapter file must include a chapter preamble, then the exact bottom-up section skeleton below.

#### Chapter preamble (required)

- `# Chapter <i>: <title>`
- Learning objectives (2-4)
- Prerequisite chapters
- Chapter target concept/theorem

#### Bottom-up section skeleton (required, exact order)

1. `## 1. Destination and Why It Matters`
2. `## 2. Foundation Layer`
3. `## 3. Bottom-Up Thinking Stages`
4. `## 4. Final Concept/Theorem Statement`
5. `## 5. How the Thinking Process Could Have Invented It`

10. Apply `bottom-up` style constraints inside each chapter using depth-by-artifacts (not word counts):
   - Section 2 lists `5..8` load-bearing primitives. For each primitive include:
     - What it is
     - Why it is load-bearing
     - Tiny numeric example
     - One failure mode or misuse case
   - Section 3 has `7..9` stages, and each stage must include:
     - **Motivation** with all of the following lines:
       - `Bottleneck:` what prior limitation forces this stage
       - `Why-now trigger:` the concrete unresolved question/contradiction that makes this stage necessary now
       - `Rejected shortcut:` one tempting shortcut and why it fails
       - `Stage objective:` the capability/artifact this stage must produce
       - `Payoff signal:` a quick check that the objective was actually achieved
     - **Intuition** with both `Mental model:` and `Where it fails:` lines
     - **Construction step** with a `Uses:` dependency line and at least one LaTeX expression
     - **2-3 Worked examples** with labeled `Setup:`, `Compute:`, `Interpret:`, and `Common mistake:` lines
      - Every worked example must be artifact-explicit, not prose-only:
        - `Setup:` must name concrete objects and data (for example: vertex sets, edge sets, simplex sets, basis order, map definition, matrix shape, parameter values).
        - `Compute:` must show explicit intermediate steps (at least two concrete transformations/equalities, not a single summary sentence).
      - If a worked example compares two constructions, present both constructions explicitly (for example `Triangulation A` and `Triangulation B`) and list their concrete artifacts.
      - For triangulation/subdivision examples specifically, include labeled artifact lines such as `Vertices:`, `Edges:`, and `Triangles:` or `2-simplices:` inside the worked example.
      - Avoid placeholders like "two drawings" or "similarly" when concrete combinatorial data is required.
     - **What this unlocks next** with a `Remaining gap:` line naming what is still unresolved
   - Uneven stage depth is allowed and encouraged: if one stage is the main conceptual bottleneck, expand it more than neighboring stages.
   - For any hard stage, add optional explanation blocks after the required subsections, e.g.:
     - `Deepening note:`
     - `Second perspective:`
     - `Edge case:`
     - `Sanity check:`
   - Keep required subsection order intact; optional blocks are additive and do not replace required subsections.
   - Section 4 includes:
     - In concept mode: formal definition + near-miss/non-example
     - In theorem mode: formal statement + proof skeleton mapped to stages
     - One wrong mental model and correction
     - One `Scope boundary:` paragraph (where this formal statement does and does not apply)
   - Section 5 includes:
     - Invention narrative from limitation -> response -> new object
     - At least two explicit failed attempts (`Failed attempt 1`, `Failed attempt 2`) with break reasons
     - One `Design rule:` extracted from those failures
   - Math formatting rules:
     - Use LaTeX for all mathematical expressions: inline `$...$`, display `$$...$$`.
     - Never place mathematical formulas, symbols, or equations inside inline code backticks.
     - Reserve inline code backticks for commands, file names, and literal non-math tokens only.
     - Do not use shorthand vector/matrix text like `$[1\ -1]$` or `$[1\ 1\ -2]$`; write explicit LaTeX matrices/vectors (for example `$\begin{bmatrix}1 & -1\end{bmatrix}$` or `$\begin{bmatrix}1\\-1\\0\end{bmatrix}$`).

11. Cross-chapter continuity requirements:
   - Chapter `i` can use only what has appeared in chapters `<= i`.
   - For chapter `i > 1`, include at least one callback to a prior chapter.
   - For chapter `i = 1`, include at least one explicit forward anchor to chapter 2.
   - Each chapter must include one bridge sentence into the next chapter (for the last chapter, bridge to post-course continuation topics).

12. After writing each chapter, print:
   `Written chapter <i>/<N>: <chapter_title>`

### Phase 4 - Verification for every chapter file

13. Verify each `ch<NN>_*_bottom_up.md` file:
   - Required section order present
   - Section 3 stage count in `6..9`
   - Every stage has all five required subheadings (additional optional subheadings are allowed)
   - Run deterministic depth verification:
     ```bash
     repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
     python3 "$repo_root/.claude/skills/course-bottom-up/scripts/verify_chapter_depth.py" "<chapter_file>"
     ```
   - If depth verification reports any failures, expand only the flagged sections/stages and rerun until pass.
   - Mathematical expressions use LaTeX delimiters (`$...$` or `$$...$$`), not inline code backticks
   - No unclosed fenced code blocks
   - No unclosed LaTeX delimiters
   - No LaTeX math inside fenced code blocks
   - Run a regex check for inline-code spans and review matches:
     ```bash
     rg -n "\\`[^\\`]*\\`" "<chapter_file>"
     ```
   - Treat any inline-code match containing math markers (`=`, `_`, `^`, `\\partial`, `\\sum`, `\\int`, `\\frac`, `H_n`, `C_n`, `Z_n`, `B_n`, `\\to`, `\\subset`, etc.) as an error and rewrite it with LaTeX delimiters.
14. If a chapter includes Mermaid blocks, run deterministic Mermaid verification:

```bash
repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
node "$repo_root/.claude/skills/bottom-up/scripts/verify_mermaid_blocks.js" "<chapter_file>"
```

If errors are reported, fix and rerun until pass. If no Mermaid blocks are present, skip this check.

### Phase 5 - Per-chapter explanation audit and in-place patch (unless --skip-audit)

15. If `--skip-audit` is set, skip to Phase 6.
16. For each chapter file `ch<NN>_<chapter_slug>_bottom_up.md`, run the same audit logic as `bottom-up`:
   - concept inventory (introduced vs used)
   - Type A skipped-explanation issues
   - Type B bumpy-jump issues
   - severity levels: critical/moderate/minor
   - Default behavior: keep audit report in runtime output only (do not persist a sidecar file).
   - If `--keep-intermediates` is set, also create `ch<NN>_<chapter_slug>_bottom_up_explanation_audit.md`.
17. Audit report must include:
   - Audit overview with counts
   - Issue register with quoted passage, diagnosis, and ready-to-insert patch
   - Patch inventory
   - Clean sections
   - Revision priority
18. Patch the chapter file in place (`ch<NN>_<chapter_slug>_bottom_up.md`):
   - Do not create `_v2` files by default.
   - If `--keep-intermediates` is set, optionally save a pre-patch backup as `ch<NN>_<chapter_slug>_bottom_up_prepatch.md`.
   - Do not add a `Revision Notes` section inside chapter files.
   - Apply all critical and moderate patches
   - Apply minor patches unless they would significantly disrupt flow; if skipped, report them in runtime/completion summary (not inside chapter files)
   - Keep chapter depth at or above Step 10 artifact completeness (do not remove bottlenecks, failure modes, trace steps, or scope boundaries while patching)
19. Verify each patched chapter using the same checks from Phase 4, including depth verification (and Mermaid verification only when Mermaid blocks are present).
20. Unless `--keep-intermediates` is set, remove transient scratch artifacts and keep only final chapter markdown files.

### Phase 6 - Completion output

21. Print a summary with:
   - Course topic and chapter count
   - Course directory path
   - Generated file inventory (syllabus + final chapter files; plus intermediates only if `--keep-intermediates` was used)
   - Per-chapter depth-check status (pass/fail before and after patching)
   - Audit totals across all chapters (if audits were run)

22. Print a short "What's next?" block with 2-3 commands using real generated paths, for example:
   - `/explore <course_dir>/ch03_<slug>_bottom_up.md <concept> deeper`
   - `/theorem <theorem_from_course>`
   - `/concept <core_concept_from_chapter6>`

## Output format

Create files under:

```text
<topic_slug>_bottom_up_course/
├── 00_syllabus.md
├── ch01_<slug>_bottom_up.md
├── ch02_<slug>_bottom_up.md
├── ...
```

Default: keep only `00_syllabus.md` and one final `ch<NN>_<slug>_bottom_up.md` per chapter.

If `--skip-audit` is set, skip the audit-and-patch phase entirely.

If `--keep-intermediates` is set, you may additionally keep audit sidecars and pre-patch backups.

## Example usage

```text
/course-bottom-up algebraic topology
/course-bottom-up spectral graph theory with 7 chapters
/course-bottom-up representation theory --syllabus-only
/course-bottom-up homological algebra --skip-audit
/course-bottom-up homology --keep-intermediates
```
