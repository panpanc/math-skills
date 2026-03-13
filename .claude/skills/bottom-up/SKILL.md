---
name: bottom-up
description: Explain a mathematical concept or theorem through a bottom-up construction process that begins with elementary calculus and linear algebra ideas, then builds step by step with motivations, intuitions, and concrete examples. Use when the user asks for "from first principles", "build it from basics", "bottom-up", "how could we invent this", or wants concept/theorem understanding through a staged thinking process.
---


Explain a concept or theorem as an invention process: start from elementary building blocks and assemble upward until the final object feels inevitable. After generating the document, automatically audit it for explanation gaps, produce a patched final version, then clean up temporary files.

## Instructions

### Phase 1 — Generate the bottom-up document

**Step 1.** Parse arguments from `$ARGUMENTS`. The first non-file argument is the target concept/theorem. If any argument is a readable file path, use it as optional context.

**Step 2.** Determine mode:
- If the target is a named theorem/result/proof request, use **Theorem mode**.
- Otherwise, use **Concept mode**.

**Step 3.** Write a markdown document with the following required sections and order:

#### 1. Destination and Why It Matters
- Name the target concept/theorem in one sentence.
- State the mathematical pain point it solves.
- Give a 2-4 sentence route preview: "we start from A/B/C, then build D/E, then reach the target."

#### 2. Foundation Layer (Calculus + Linear Algebra Only)
- List 4-8 primitive ideas from single-variable/multivariable calculus and core linear algebra only.
- For each primitive include:
  - What it is (plain language + compact formal statement if needed)
  - Why it is load-bearing in this construction
  - One tiny concrete example with numbers
- Disallow advanced objects in this section (no measure theory, topology, functional analysis, manifolds, etc.).

#### 3. Bottom-Up Thinking Stages
- Build 6-10 stages from the foundation layer to the destination.
- For each stage, start with a one-line `Stage output:` naming the artifact produced (definition, lemma, construction, test, operator, or rule).
- Each stage must include these subheadings and required lines:
  - **Motivation** with:
    - `Bottleneck:`
    - `Why-now trigger:`
    - `Rejected shortcut:`
    - `Stage objective:`
    - `Payoff signal:`
  - **Intuition** with:
    - `Mental model:`
    - `Where it fails:`
  - **Construction step** with:
    - `Uses:`
    - `Assumptions:`
    - `Artifact produced:`
    - At least one short LaTeX derivation/check
  - **Worked example** with:
    - 2-3 worked examples per stage (not one).
    - Each worked example must include:
      - `Setup:`
      - `Compute:`
      - `Interpret:`
      - `Common mistake:`
      - `Sanity check:`
    - Every worked example must be artifact-explicit, not prose-only:
      - `Setup:` must name concrete objects/data (for example: vertex sets, edge sets, simplex sets, basis order, map definition, matrix shape, parameter values).
      - `Compute:` must show explicit intermediate steps (at least two concrete transformations/equalities, not a single summary sentence).
    - If a worked example compares two constructions, present both constructions explicitly (for example `Construction A` and `Construction B`) and list concrete artifacts for each.
    - For triangulation/subdivision examples, include labeled artifact lines such as `Vertices:`, `Edges:`, and `Triangles:` or `2-simplices:` inside the worked example.
    - Avoid placeholders like "two drawings" or "similarly" when concrete combinatorial data is required.
  - **What this unlocks next** with:
    - `Remaining gap:`
    - `Next question:`
    - `Dependency edge:` using either `stage_k -> stage_{k+1}: <transfer>` or `stage_k -> destination: <transfer>`
- Each stage must explicitly name which previous-stage ideas it uses.
- Keep dependency order strict: never use a concept before it is introduced.

#### 4. Assembly Snapshot
- Summarize the entire build in one dependency chain:
  `foundation primitives -> intermediate ideas -> destination`
- Add one Mermaid diagram showing the dependency graph from bottom to top (`graph BT`).

#### 5. Final Concept/Theorem Statement
- In Concept mode: give the clean formal definition and one near-miss/non-example.
- In Theorem mode: give the formal statement, then a proof skeleton that maps each major proof move back to earlier stages.
- Include one "wrong mental model" and the correction.

#### 6. How the Thinking Process Could Have Invented It
- Explain, as a short narrative, why each stage is a natural response to the prior stage's limitation.
- Include at least one failed/naive attempt and why it breaks.

#### 7. Downstream Growth from the Same Elementary Ideas
- This section is mandatory and closes the document.
- List 4-8 additional concepts/theorems that build on the same or closely related foundations.
- For each item include:
  - Name
  - Which foundation ideas it reuses
  - One-sentence reason it depends on them
  - Suggested next command (for example: `/theorem ...` or `/concept ...`)

**Step 4.** Writing constraints:
- Prioritize clarity, motivation, and intuition before formalism.
- Use concrete verifiable examples (small vectors, simple functions, explicit numbers).
- Use LaTeX for math (`$...$`, `$$...$$`), never inside fenced code blocks.
- Use fenced code blocks only for Mermaid diagrams, code snippets, or computation traces.
- LaTeX authoring constraints (to reduce renderer failures):
  - Keep prose and labels outside math whenever possible; let the surrounding sentence name the event, condition, or interpretation.
  - Use `\text{}` only for short connector words such as `and`, `if`, `for`, `where`, or `when`; do not hide multi-word labels or conditions inside equations.
  - Prefer `Probability of passing the $u$-test: $$\operatorname{tr}(\rho P_u).$$` over `$$\operatorname{Prob}(u\text{-test passes})=\operatorname{tr}(\rho P_u).$$`
  - Prefer `Purity criterion: $$\rho^2=\rho.$$` over `$$\rho \text{ pure } \Longleftrightarrow \rho^2=\rho.$$`
  - Prefer one symbolic derivation chain per display block; do not mix full English sentences into `$$...$$`.
  - Use a conservative command subset unless the document truly needs more: `\frac`, `\sqrt`, Greek letters, superscripts/subscripts, `\operatorname{tr}`, `\begin{bmatrix}...\end{bmatrix}`, and `\left...\right` only when needed.
  - Every `$`, `$$`, `\(`, `\)`, `\[`, `\]`, `\begin{...}`, `\end{...}`, `{`, `}`, `\left`, and `\right` must balance within the same math expression.
- Mermaid authoring constraints (to prevent parse failures):
  - Use simple node IDs (`A`, `stage_2`, `foundation3`) and keep punctuation in labels, not IDs.
  - Put human-readable labels in bracketed/quoted forms (for example: `A["Gradient step (motivation)"]`).
  - Keep one dependency edge per line and ensure every `subgraph` has a matching `end`.
- Keep tone pedagogical and explicit: name every "why this step exists."

**Step 5.** Save the draft as `<target_slug>_bottom_up.md` in the current working directory. This file is **temporary** and will be removed after the final patched document is produced.

**Step 6.** Verify before proceeding to Phase 2:
- Section 2 uses only calculus/linear-algebra primitives.
- Section 3 has 6-10 stages.
- Each stage has a `Stage output:` line and all five required subheadings.
- Each stage includes all required labeled lines under each subheading.
- Each stage has explicit prior-stage dependencies and a valid `Dependency edge:` line.
- Section 7 has at least 4 downstream items with dependencies named.
- Run deterministic depth verification:
  - `repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"`
  - `python3 "$repo_root/.claude/skills/bottom-up/scripts/verify_bottom_up_depth.py" "<target_slug>_bottom_up.md"`
  - If this command reports failures, expand only the flagged sections/stages and rerun until it passes.
- Run deterministic Markdown-math verification:
  - `repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"`
  - `python3 "$repo_root/.claude/skills/bottom-up/scripts/verify_markdown_math.py" --strict-warnings "<target_slug>_bottom_up.md"`
  - If this command reports failures, fix only the flagged math passages, usually by closing delimiters/environments or moving prose out of math, and rerun until it passes.
- No unclosed code fences.
- No math inside fenced code blocks.
- Run deterministic Mermaid verification:
  - `repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"`
  - `node "$repo_root/.claude/skills/bottom-up/scripts/verify_mermaid_blocks.js" --require-mermaid "<target_slug>_bottom_up.md"`
  - If this command reports errors, fix Mermaid blocks and rerun until it passes.
- Read the file and fix any issues found. Do not proceed to Phase 2 until this file is clean.

---

### Phase 2 — Explanation Audit (Temporary Report)

Run the explanation audit on the just-generated document. Do not invoke the `explanation-audit` skill separately — perform the audit inline using the criteria below.

**Step 7.** Build a concept inventory from `<target_slug>_bottom_up.md`:
- List every named concept, term, definition, symbol, and result **introduced** (defined or explained) in the document, in document order.
- List every named concept, term, symbol, and result **used** (appears in a claim, formula, argument, or example) in the document, in document order.
- Flag any term that is *used* before it is *introduced* as a candidate issue.

**Step 8.** Scan for issues using these two types:

**Type A — Skipped Explanation** (flag when any of these is true):
- A term or concept is used without prior or inline definition (**undefined-term**)
- A symbol appears in a formula without stating what it represents (**symbol-undefined**)
- A result or formula is invoked without stating what it says (**result-unapplied**)
- A derivation step jumps more than one logical step with no "why" (**missing-step**)
- A worked example uses a technique not yet covered in the document (**example-uses-unknown**)

**Type B — Bumpy Jump** (flag when any of these is true):
- Complexity or formalism increases sharply without a bridging sentence (**formalism-shift**)
- A new section begins without connecting motivation from the previous section (**missing-bridge**)
- A concept is introduced but its purpose in the current argument is never stated (**missing-motivation**)
- An analogy is invoked but never tied back to the formal content (**untied-analogy**)
- The reader must make a connection that requires background the document has not established (**assumed-connection**)

**Severity:**
- `critical` — will block comprehension
- `moderate` — will cause confusion; a diligent reader might work it out
- `minor` — would improve flow but will not block understanding

**Do NOT flag:** style preferences, mathematical errors, missing citations, or issues outside the Section 2 foundation layer constraint (the foundation layer explicitly restricts to calculus/linear-algebra, so using terms from those fields is not a skipped explanation).

**Step 9.** Save the audit report as `<target_slug>_bottom_up_explanation_audit.md`. This report is **temporary** and will be removed after patching. The audit report must contain:

1. **Audit Overview** — source file, audience assumed, issue count (N critical, M moderate, K minor), one-paragraph overall assessment.
2. **Issue Register** — for every issue found, in document order, using this exact template:

   ```
   #### Issue #N — [Type]: [Short label]

   **Severity:** critical | moderate | minor
   **Type:** skipped-explanation | bumpy-jump
   **Sub-type:** undefined-term | symbol-undefined | result-unapplied | missing-step | example-uses-unknown | formalism-shift | missing-bridge | missing-motivation | untied-analogy | assumed-connection | other
   **Location:** [Section heading] > [nearest subsection or paragraph cue]

   **Original passage (quoted):**
   > [exact quote from source, 1–4 sentences]

   **Diagnosis:** [1–3 sentences explaining why this blocks or confuses the reader]

   **Suggested patch:** [complete ready-to-insert prose or LaTeX that resolves the issue]
   ```

3. **Patch Inventory** — summary table of all issues and a statement that the original has not been modified.
4. **Clean Sections** — list of every major section with no issues.
5. **Revision Priority** — critical issues ordered by cascade impact; moderate issues if no critical ones.

---

### Phase 3 — Create Versioned Patched Document

**Step 10.** Determine the version number:
- Check whether `<target_slug>_bottom_up_v2.md` already exists.
- If it does not exist, the new version is `v2`.
- If `v2` exists, check `v3`, `v4`, etc. Use the first version number whose file does not yet exist.
- Call this version number `vN`.

**Step 11.** Create `<target_slug>_bottom_up_vN.md` as follows:

a. **Revision Notes header** — Insert the following block at the very top of the file, before all other content:

   ```
   <!-- REVISION NOTES: <target_slug>_bottom_up_vN.md -->
   <!-- Generated by: bottom-up (post-audit patch pass) -->
   <!-- Original: <target_slug>_bottom_up.md (unchanged) -->
   <!-- Audit report: <target_slug>_bottom_up_explanation_audit.md -->
   <!--                                                              -->
   <!-- CHANGES FROM ORIGINAL:                                       -->
   <!-- #N [severity] location — one-line description of change      -->
   <!-- (repeat for each applied patch)                              -->
   <!-- ============================================================  -->
   ```

   Fill in one `<!-- #N ... -->` line per applied patch, in Issue # order.

b. **Apply all patches** — Working from the audit report, apply the suggested patch for every issue found. For each patch:

   - Insert, replace, or expand the flagged passage according to the **Suggested patch** text from the audit.
   - Critical and moderate patches must all be applied.
   - Minor patches should also be applied unless they would meaningfully disrupt the document's flow; if a minor patch is skipped, note it in the Revision Notes header as `<!-- #N [minor] SKIPPED — reason -->`.
   - Never remove content from the original — only add or expand.
   - Preserve all section headings, worked examples, diagrams, and the exact structure of Sections 1–7.

c. **Rest of document** — Copy all content from the original, incorporating the patches in the correct locations. The structure (sections, stages, subsections) must be identical to the original except for the inserted/expanded passages.

**Step 12.** Verify `<target_slug>_bottom_up_vN.md`:
- The Revision Notes header is present and complete.
- Every critical and moderate issue from the audit has a corresponding applied patch.
- Run deterministic depth verification:
  - `repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"`
  - `python3 "$repo_root/.claude/skills/bottom-up/scripts/verify_bottom_up_depth.py" "<target_slug>_bottom_up_vN.md"`
  - If this command reports failures, expand only the flagged sections/stages and rerun until it passes.
- Run deterministic Markdown-math verification:
  - `repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"`
  - `python3 "$repo_root/.claude/skills/bottom-up/scripts/verify_markdown_math.py" --strict-warnings "<target_slug>_bottom_up_vN.md"`
  - If this command reports failures, fix only the flagged math passages, usually by closing delimiters/environments or moving prose out of math, and rerun until it passes.
- No unclosed fenced code blocks. No math inside fenced code blocks.
- Run deterministic Mermaid verification:
  - `repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"`
  - `node "$repo_root/.claude/skills/bottom-up/scripts/verify_mermaid_blocks.js" --require-mermaid "<target_slug>_bottom_up_vN.md"`
  - If this command reports errors, fix Mermaid blocks and rerun until it passes.
- The section structure (1–7) is intact.
- Read the file and fix any violations found.

---

### Phase 4 — Completion Output

**Step 13.** Remove temporary files after the final patched file is verified:

- Delete `<target_slug>_bottom_up.md`
- Delete `<target_slug>_bottom_up_explanation_audit.md`
- Keep only `<target_slug>_bottom_up_vN.md`

**Step 14.** Print the following summary:

```
Generated bottom-up build for <target> from calculus/linear-algebra primitives to final destination.

=== Post-generation audit ===
Audited <target_slug>_bottom_up.md: N critical, M moderate, K minor issues found.
Patched document saved as: <target_slug>_bottom_up_vN.md
  Applied: N critical + M moderate patches (+ K minor)
  Skipped: [list any skipped minor patches, or "none"]
Temporary files removed:
  <target_slug>_bottom_up.md
  <target_slug>_bottom_up_explanation_audit.md

=== File inventory ===
  <target_slug>_bottom_up_vN.md             — final markdown output (only retained file)
```

**Step 15.** Print a "What's next?" block with 2-3 context-aware suggestions using the actual generated filenames. Tailor to the specific issues found:
- If critical issues were found and patched: suggest a dedicated clarity re-audit pass on `<target_slug>_bottom_up_vN.md` using the same audit rubric from Phase 2.
- Always suggest exploring a key concept from the downstream section.
- Suggest a deeper dive on whichever stage had the most issues.

---

## Example usage

```
/bottom-up compactness
/bottom-up Cauchy-Schwarz inequality
/bottom-up spectral theorem from first principles
/bottom-up my_notes.md divergence theorem
```
