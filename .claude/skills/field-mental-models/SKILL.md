---
name: field-mental-models
description: List the major mental models of a mathematical field, label each one as native to that field or borrowed/adapted from other fields, and map each model to in-field concepts/theorems plus exactly 5 concepts/theorems from other fields. Use when the user asks for the signature reasoning patterns of a field such as algebraic topology, functional analysis, category theory, algebraic geometry, or probability.
---

List the major mental models of a mathematical field. Produce a structured markdown map that distinguishes field-native models from borrowed or adapted ones and shows both within-field and cross-field transfer examples.

## Perspective

Write as a mathematician-educator who cares about reusable habits of thought, historical honesty, and transfer across domains:

- Name each model so a learner can remember and reuse it.
- Be conservative about novelty claims. Do not call a model "native" unless the case is strong.
- Treat "borrowed/adapted" as a positive classification, not a downgrade.
- Prefer concrete named concepts/theorems over broad area labels.

## Instructions

1. **Parse arguments**: The user provides a field name in the standard runtime argument string variable named `ARGUMENTS`.
   - Optional count can be inferred from phrases like `10 models`, `12 mental models`, `15`.
   - If no count is provided, default to `12`.
   - Enforce the range `10..20` by clamping:
     - below 10 -> use 10
     - above 20 -> use 20
   - If any argument is a readable file path, use it as optional context for field emphasis or terminology.
   - If no mathematical field is identifiable, print:
     `No mathematical field found. Provide a target like "algebraic topology" or "functional analysis".`
     and STOP.

2. **Interpret the target as a field, not a single theorem**:
   - Focus on the durable ways practitioners in this field organize definitions, constructions, proofs, and invariants.
   - If the request is really about one theorem or concept, prefer the existing `mental-models` skill pattern instead of collapsing this skill into theorem commentary.

3. **Build the model set**:
   - Produce `N` distinct major mental models for the target field (`N` from step 1).
   - Each model must include:
     - a short canonical name
     - one compressed explanation
     - why it matters specifically in the target field
     - an origin label
     - one boundary or failure mode
   - Origin labels must use one of these forms:
     - `Native to <field>`
     - `Borrowed/adapted from <source field or fields>`
   - Provenance rules:
     - Use `Native to <field>` only when the model is substantially developed, made central, or characteristically sharpened in the target field.
     - Use `Borrowed/adapted from ...` when the model clearly originates elsewhere or is better described as imported and repurposed.
     - If the case is mixed, prefer `Borrowed/adapted from ...` and explain the adaptation in the field-specific description.
   - Avoid near-duplicate models.

4. **Attach the within-field evidence set**:
   - For every mental model, list exactly 4 concepts or theorems from the target field that use the model.
   - For each of the 4 items, include one sentence explaining how the model appears there.
   - Prefer a mix of foundational concepts and flagship results when possible.

5. **Attach the cross-field transfer set**:
   - For every mental model, list exactly 5 concepts or theorems from fields other than the target field.
   - For each item:
     - name the concept or theorem
     - name the other field in parentheses
     - include one sentence explaining the shared mechanism
   - These 5 items must lie outside the target field.

6. **Write markdown output**:
   - Save as `<field_slug>_field_mental_models_map.md` in the current working directory.
   - Writing constraints for math-bearing topics:
     - Use LaTeX only when the field genuinely benefits from symbolic notation.
     - Keep prose, labels, and conditions outside equations whenever possible.
     - Prefer short symbolic identities over sentence-like display equations.
     - Use a conservative command set and make every delimiter or environment balance within a single math span.
     - Do not put math inside fenced code blocks.
   - Use this structure:

### Section 1 - Field Snapshot

- **Target field:** `<field>`
- **Requested models:** `<requested_or_default>`
- **Final model count:** `<N>`
- **Field summary:** 2-4 sentences on how this field tends to think, construct, classify, or prove.
- **How origin labels are used:** 1-2 sentences distinguishing field-native models from borrowed/adapted ones for this output.

### Section 2 - Mental Models Catalog

For each model, use:

```text
### Model #N - <model name>

- **Origin status:** <Native to <field> | Borrowed/adapted from <source field or fields>>
- **Compressed model:** <1-2 sentences>
- **Why it matters in <field>:** <1-2 sentences>
- **Where it appears in <field> (4):**
1. <concept/theorem 1> - <how the model appears>
2. <concept/theorem 2> - <how the model appears>
3. <concept/theorem 3> - <how the model appears>
4. <concept/theorem 4> - <how the model appears>
- **Cross-field transfer set (5):**
1. <concept/theorem 1> (<other field>) - <shared mechanism>
2. <concept/theorem 2> (<other field>) - <shared mechanism>
3. <concept/theorem 3> (<other field>) - <shared mechanism>
4. <concept/theorem 4> (<other field>) - <shared mechanism>
5. <concept/theorem 5> (<other field>) - <shared mechanism>
- **Boundary / failure mode:** <1 sentence>
- **Transfer takeaway:** <one reusable sentence>
```

### Section 3 - Field Synthesis

- Provide 5-8 compact rules of thumb describing:
  - which models feel native to the field
  - which imported models become especially powerful there
  - what a learner should watch for when transferring these habits elsewhere

7. **Quality rules**:
   - Total mental models is between 10 and 20 inclusive.
   - Every model has exactly 4 within-field items.
   - Every model has exactly 5 cross-field items.
   - Cross-field items really come from outside the target field.
   - Keep provenance honest; do not inflate novelty claims.
   - Do not fabricate citations or pretend to quote source files.

8. **Verify before finishing**:
   - Reuse the deterministic Markdown-math verifier referenced by the `bottom-up` skill:
     - `repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"`
     - `python3 "$repo_root/.claude/skills/bottom-up/scripts/verify_markdown_math.py" --strict-warnings "<field_slug>_field_mental_models_map.md"`
   - If the verifier reports failures, fix only the flagged math passages and rerun until it passes.
   - No unclosed fenced code blocks.
   - No unclosed LaTeX delimiters.
   - No LaTeX math inside fenced code blocks.
   - Confirm model count is in `10..20`.
   - Confirm each model has exactly 4 within-field items.
   - Confirm each model has exactly 5 cross-field items.
   - Read the file and fix issues.

9. **Progress output**:
   - After saving, print:
     `Generated <N> major mental models for <field>, with provenance labels, 4 in-field examples, and 5 cross-field transfers per model. Saved to <output_file>.`

10. **Follow-up suggestions**:
   - Print a short `What's next?` block with 2-3 commands using actual names from the generated file, for example:
     - `/mental-models <concept_from_field_list>`
     - `/theorem <theorem_from_field_list>`
     - `/abstraction-levels <cross_field_concept>`

## Example usage

```text
/field-mental-models algebraic topology
/field-mental-models functional analysis with 15 models
/field-mental-models my_notes.md algebraic geometry
```
