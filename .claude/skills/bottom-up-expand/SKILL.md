---
name: bottom-up-expand
description: Expand a stage or concept inside an existing document by diagnosing missing elementary foundations and rebuilding the explanation bottom-up with explicit dependency links.
---


Expand a selected stage or concept in an existing document. First diagnose missing elementary/foundational ideas, then rebuild the explanation bottom-up so the expanded section becomes smooth, explicit, and teachable. After generating the expansion document, automatically audit it and produce a patched version.

**Non-destructive rule:** Never modify the source document. This skill is write-new-files-only.

## Instructions

### Phase 1 — Generate the expansion document

**Step 1.** Parse arguments from `$ARGUMENTS`:
- **Expansion target**: the first non-file argument (for example: `stage 4`, `active-set update rule`, `complementary slackness geometry`).
- **Source document**: the first readable file path argument. This is required.
- Treat the source document as read-only reference material.
- If no readable file path is provided, print: `"No source document found — provide a path to an existing .md document."` and STOP.

**Step 2.** Read the source document in full and extract:
- Source concept/title from Section 1 (or top title if numbered sections are absent)
- Existing foundation primitives (if present)
- Existing stage structure (if present)
- The exact block to expand:
  - If target is `stage N`: locate Stage N and its neighboring stage boundaries
  - Otherwise: locate the most relevant section(s) where the target concept appears

**Step 3.** Classify expansion mode:
- **Stage mode**: target is a specific stage number/name in the source
- **Concept mode**: target is a concept used in the source that needs deeper bottom-up reconstruction

**Step 4.** Diagnose missing foundations before writing:
- Build a **Gap Inventory** for the target block:
  - Undefined terms/symbols
  - Skipped derivation steps
  - Assumed geometric/algebraic facts
  - Missing motivation bridges
- Split dependencies into:
  - **Reused foundations** (already in source and sufficient to reference briefly)
  - **New elementary foundations** (must be added and fully explained)
- New foundations must stay within calculus + linear algebra primitives.

**Step 5.** Write a markdown document with these required sections and order:

#### 1. Destination and Why It Matters
- Name the specific expansion target in one sentence.
- State what explanation pain point is being fixed.
- 2–4 sentence route preview explicitly naming the source file and source concept.

#### 2. Foundation Layer for the Expansion

##### New Elementary Foundations
For each new primitive:
- **What it is** (plain + compact formal form if needed)
- **Why it is load-bearing here**
- **One tiny concrete numeric example**

If none are needed, write: `No new elementary foundations are required beyond those already in <source_file>.`

If reused ideas are important, reference them inline inside stage `Uses:` lines or in short bridge sentences; do not create a dedicated "Reused Foundations" section.

#### 3. Bottom-Up Expansion Stages
- Build **5–9 stages** total.
- Each stage must include all five subheadings in order:
  - **Motivation**
  - **Intuition**
  - **Construction step**
  - **Worked example**
  - **What this unlocks next**
- Every stage must explicitly name what it uses (source stage/section and/or earlier stages in this document).
- Keep strict dependency order.

#### 4. Expanded Standalone Block (for the new output document)
- Provide a polished expanded block for the target (stage or concept section) as part of this new document.
- Preserve the source's notation style where possible.
- Include explicit bridges for every diagnosed gap from Step 4.

#### 5. Assembly Snapshot
- One dependency chain:
  `[source foundations] -> [new elementary ideas] -> [expanded target explanation]`
- One Mermaid `graph BT` including:
  - `SOURCE["<source concept> (from <source_file>)"]`
  - new intermediate nodes
  - destination node for expanded target

#### 6. Final Expanded Statement + Guardrails
- Give a clean final statement/definition/result for the expanded target.
- Include one near-miss/non-example.
- Include one wrong mental model and correction.

#### 7. Downstream Growth from the Same Foundations
- 4–8 items, each with:
  - Name
  - Reused foundations
  - One-sentence dependency reason
  - Suggested next command
- At least one item must chain another expansion:
  `/bottom-up-expand <next_stage_or_concept> <source_or_output_file>`

**Step 6.** Writing constraints:
- Clarity and motivation before formalism
- Concrete examples with explicit numbers
- Use LaTeX for math (`$...$`, `$$...$$`), never inside fenced code blocks
- Fenced blocks only for Mermaid/code/computation traces
- LaTeX authoring constraints (to reduce renderer failures):
  - Prefer a single-line display equation whenever the derivation comfortably fits on one line; use `$$\begin{aligned}...\end{aligned}$$` only when multi-line alignment is genuinely necessary.
  - Keep prose and labels outside math whenever possible; let the surrounding sentence name the event, condition, or interpretation.
  - Use `\text{}` only for short connector words such as `and`, `if`, `for`, `where`, or `when`; do not hide multi-word labels or conditions inside equations.
  - Prefer `Boundary condition: $$F_{y'}(b)=0.$$` over `$$F_{y'}(b)=0 \text{ at the free endpoint}.$$`
  - Prefer one symbolic derivation chain per display block; do not mix full English sentences into `$$...$$`.
  - If a display derivation has more than one equality, implication, or transformation step and spans multiple visual lines, wrap it in `$$\begin{aligned}...\end{aligned}$$` and align on `&=`, `&\to`, or a similar marker instead of relying on raw line breaks inside `$$...$$`.
  - Matrix multiplications and multi-step simplifications should be vertically aligned when shown over multiple lines; prefer
    `$$\begin{aligned}Ax &= Mx \\ &= y\end{aligned}$$`
    over
    `$$Ax = Mx = y$$`
    split only by line breaks.
  - Do not put multiple tall matrix environments such as `\begin{bmatrix}...\end{bmatrix}` on the same row of an `aligned` block. Many Markdown math renderers keep that row as one wide, unbreakable box, which leads to cramped spacing or overflow. Instead, introduce intermediate matrices in separate display blocks, then sum or compare them in a shorter follow-up display.
  - Use a conservative command subset unless the document truly needs more: `\frac`, `\sqrt`, Greek letters, superscripts/subscripts, `\operatorname{tr}`, `\begin{bmatrix}...\end{bmatrix}`, and `\left...\right` only when needed.
  - Every `$`, `$$`, `\(`, `\)`, `\[`, `\]`, `\begin{...}`, `\end{...}`, `{`, `}`, `\left`, and `\right` must balance within the same math expression.
- Keep tone pedagogical and explicit

**Step 7.** Save as:
`<source_stem>_<target_slug>_expanded_bottom_up.md`
in current working directory. This is the permanent original and must not be modified after this phase.
Do not edit `<source_file>`.

**Step 8.** Verify before Phase 2:
- Section 2 uses only calculus/linear-algebra primitives for newly added foundations
- Section 3 has 5–9 stages and all five required subheadings in each stage
- Section 7 has at least 4 downstream items and includes `/bottom-up-expand`
- Run deterministic Markdown-math verification:
  - `repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"`
  - `python3 "$repo_root/.claude/skills/bottom-up/scripts/verify_markdown_math.py" --strict-warnings "<source_stem>_<target_slug>_expanded_bottom_up.md"`
  - If this command reports failures, fix only the flagged math passages, usually by closing delimiters/environments, converting multi-line derivations to `aligned`, or moving prose out of math, and rerun until it passes.
- No unclosed fences or LaTeX delimiters
- No math inside fenced code blocks
- Read the file and fix any issues found. Do not proceed to Phase 2 until this file is clean.
- Source document remains unchanged

---

### Phase 2 — Explanation Audit

Run an inline explanation audit on `<source_stem>_<target_slug>_expanded_bottom_up.md`.

**Step 9.** Build concept inventory:
- Terms introduced (in order)
- Terms used (in order)
- Used-before-introduced candidates

**Step 10.** Scan issues with severity labels (`critical`, `moderate`, `minor`):
- skipped-explanation: `undefined-term`, `symbol-undefined`, `result-unapplied`, `missing-step`, `example-uses-unknown`
- bumpy-jump: `formalism-shift`, `missing-bridge`, `missing-motivation`, `untied-analogy`, `assumed-connection`

**Step 11.** Save audit report as:
`<source_stem>_<target_slug>_expanded_bottom_up_explanation_audit.md`
with these sections:
1. Audit Overview
2. Issue Register (exact template below)
3. Patch Inventory
4. Clean Sections
5. Revision Priority

Issue template:

```
#### Issue #N — [Type]: [Short label]

**Severity:** critical | moderate | minor
**Type:** skipped-explanation | bumpy-jump
**Sub-type:** undefined-term | symbol-undefined | result-unapplied | missing-step | example-uses-unknown | formalism-shift | missing-bridge | missing-motivation | untied-analogy | assumed-connection | other
**Location:** [Section heading] > [nearest subsection or paragraph cue]

**Original passage (quoted):**
> [exact quote from source, 1–4 sentences]

**Diagnosis:** [1–3 sentences]

**Suggested patch:** [complete ready-to-insert prose or LaTeX]
```

---

### Phase 3 — Create Versioned Patched Document

**Step 12.** Determine `vN`:
- If `<base>_v2.md` does not exist, use `v2`
- Else use first available `v3`, `v4`, ...

Where `<base>` is:
`<source_stem>_<target_slug>_expanded_bottom_up`

**Step 13.** Create `<base>_vN.md` with:

a) Revision header at top:

```
<!-- REVISION NOTES: <base>_vN.md -->
<!-- Generated by: bottom-up-expand (post-audit patch pass) -->
<!-- Original: <base>.md (unchanged) -->
<!-- Audit report: <base>_explanation_audit.md -->
<!-- Source document: <source_file> -->
<!-- Expansion target: <target> -->
<!--                                                              -->
<!-- CHANGES FROM ORIGINAL:                                       -->
<!-- #N [severity] location — one-line description of change      -->
<!-- (repeat for each applied patch)                              -->
<!-- ============================================================  -->
```

b) Apply patches:
- Apply all critical/moderate patches
- Apply minor patches unless they significantly disrupt flow (if skipped, note in header)
- Never remove content from original; only add or expand
- Preserve section structure (1–7)
- Do not patch or rewrite the source document

**Step 14.** Verify patched file:
- Header complete (includes source document + expansion target)
- All critical/moderate issues patched
- Run deterministic Markdown-math verification:
  - `repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"`
  - `python3 "$repo_root/.claude/skills/bottom-up/scripts/verify_markdown_math.py" --strict-warnings "<base>_vN.md"`
  - If this command reports failures, fix only the flagged math passages, usually by closing delimiters/environments, converting multi-line derivations to `aligned`, or moving prose out of math, and rerun until it passes.
- No unclosed fences/LaTeX
- Section structure intact

---

### Phase 4 — Completion Output

**Step 15.** Print:

```
Generated bottom-up expansion for <target> from <source_file>.

=== Post-generation audit ===
Audited <base>.md: N critical, M moderate, K minor issues found.
Patched document saved as: <base>_vN.md
  Applied: N critical + M moderate patches (+ K minor)
  Skipped: [list skipped minor patches or "none"]

=== File inventory ===
  <source_file>                                  — source document (unchanged)
  <base>.md                                      — original expansion (preserved, unmodified)
  <base>_explanation_audit.md                    — full audit report
  <base>_vN.md                                   — patched version
```

**Step 16.** Print a "What's next?" block:
- Always include one chaining command:
  `/bottom-up-expand <next_target> <base>_vN.md`
- If critical issues existed, suggest:
  a dedicated clarity re-audit pass on `<base>_vN.md` using the same audit rubric from Phase 2
- Suggest a deeper dive on the stage with highest conceptual load.
