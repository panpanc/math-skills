---
name: deep-dive-a-mental-model-in-a-field
description: Explain how one mental model appears inside a specific mathematical field or theory, including how the field modifies, specializes, generalizes, sharpens, and sometimes breaks the model. Use when the user asks how a mental model such as local-to-global, duality, invariants, quotienting, symmetry, fixed points, compactness, perturbation, linearization, energy minimization, or universal mapping appears in a field/theory such as algebraic topology, category theory, differential geometry, algebraic geometry, functional analysis, probability, representation theory, homological algebra, or model theory.
---

Explain one mental model inside one mathematical field or theory. Produce a structured markdown trace that starts with the model in its general form, translates it into the field's native language, then shows how the field modifies, specializes, and generalizes it.

## Perspective

Write as a mathematician-educator focused on transfer and adaptation:

- Treat the mental model as a reusable reasoning pattern, not a slogan.
- Treat the field/theory as an active environment that changes the model.
- Separate appearance, modification, specialization, and generalization.
- Prefer concrete named concepts, theorems, constructions, and examples.
- Be honest about boundaries: a transferred model can mislead when its source assumptions fail.

## Instructions

1. **Parse arguments**: The user provides a mental model and a target math field/theory in the standard runtime argument string variable named `ARGUMENTS`.
   - If any argument is a readable file path, use it as optional context for the field emphasis, terminology, or examples.
   - Infer common phrasings such as `local-to-global in algebraic topology`, `duality as it appears in functional analysis`, or `how quotienting changes in category theory`.
   - If no mental model is identifiable, print:
     `No mental model found. Provide a model like "local-to-global", "duality", "invariants", or "quotienting".`
     and STOP.
   - If no field/theory is identifiable, print:
     `No mathematical field or theory found. Provide a target like "algebraic topology", "functional analysis", or "category theory".`
     and STOP.

2. **Normalize the target**:
   - Let `<model>` be the mental model and `<field>` be the field/theory.
   - If `<field>` is very broad, choose a coherent subregion only when needed, and state the choice in Section 1.
   - If `<model>` is ambiguous, state the chosen meaning and list one nearby meaning not used.
   - Save the output as `<model_slug>_in_<field_slug>_mental_model_trace.md` in the current working directory.

3. **Write markdown output** with this exact section order:

### Section 1 - Target Snapshot

- **Mental model:** `<model>`
- **Field/theory:** `<field>`
- **Interpretation used:** one sentence defining the model as used in this output.
- **Field version in one sentence:** one sentence explaining how the field tends to reshape the model.
- **Scope note:** one sentence naming any subfield emphasis or excluded nearby meaning.

### Section 2 - The Model Before Field Adaptation

Explain the mental model before importing it into the field:

- **Core schema:** 2-4 sentences giving the generic reasoning pattern.
- **Primitive ingredients:** 3-6 bullets naming the assumptions, objects, operations, or tests the model usually needs.
- **Typical non-field appearances:** 3 examples from other areas, each with one sentence explaining the shared mechanism.
- **Failure mode before adaptation:** one sentence naming when the generic model stops being reliable.

Use LaTeX only when a compact symbolic schema clarifies the model. Define every symbol before using it.

### Section 3 - Translation Into the Field

Create 4-7 dictionary entries. Each entry must use this template:

```text
### Dictionary Entry #N - <entry name>

- **Generic model component:** <source-side ingredient>
- **Field-specific replacement:** <object, morphism, invariant, construction, or proof move in <field>>
- **Why this replacement is natural:** <1-2 sentences>
- **What gets sharpened:** <what the field makes more precise>
- **What gets lost or restricted:** <source-side assumption that no longer transfers cleanly>
```

The entries should explain how the field changes the vocabulary of the model, not just list examples.

### Section 4 - Where the Model Appears in the Field

Give 5-8 appearances in `<field>`. Prefer concrete concepts, theorems, constructions, or proof techniques. Each appearance must use:

```text
### Appearance #N - <in-field concept/theorem/construction>

- **Role of the model:** <what the model helps the mathematician do>
- **Field-specific form:** <the adapted statement, construction, or test>
- **Modification:** <how the field changes the generic model>
- **Specialization:** <which special assumptions make the model sharper here>
- **Generalization pressure:** <what this appearance suggests generalizing next>
- **Worked micro-example:** <small explicit example, computation, or symbolic check>
- **Boundary / failure mode:** <where the model misleads in this appearance>
```

At least 3 appearances must include a concrete mathematical object, map, equation, diagram described in prose, or computation. Avoid prose-only examples.

### Section 5 - Modification, Specialization, and Generalization Map

Organize the adaptation in three subsections:

- **Modifications inside `<field>`:** list 4-6 ways the field alters the model. For each item include `Original assumption:`, `Field replacement:`, and `New reasoning power:`.
- **Specializations inside `<field>`:** list 4-6 important special cases. For each include `Extra hypothesis:`, `Sharper conclusion:`, and `Representative concept/theorem:`.
- **Generalizations prompted by `<field>`:** list 4-6 broader patterns suggested by the field. For each include `Starting appearance:`, `Generalized form:`, and `What survives from the original model:`.

This section is the center of the skill. Do not collapse modification, specialization, and generalization into one generic transfer discussion.

### Section 6 - One Flagship Trace

Choose one flagship concept, theorem, or construction from Section 4 and trace the model through it:

1. **Naive transfer:** how the generic model first suggests an approach.
2. **Field correction:** what the field forces you to change.
3. **Formalized version:** a concise definition, statement, or symbolic check.
4. **Payoff:** what becomes easier to prove, compute, classify, or remember.
5. **Residual warning:** what the trace still does not justify.

Use a small explicit example when possible. If you use symbols, define them immediately before the formula.

### Section 7 - Transfer Boundaries and Wrong Imports

List 5-8 ways the model can be imported incorrectly into `<field>`. For each:

- Name the wrong import.
- Explain the tempting but false analogy.
- State the correction used by practitioners in the field.

### Section 8 - Reusable Playbook

Close with 5-8 rules of thumb for recognizing this adapted model elsewhere. Each rule should say what to look for, what question to ask, and what mistake to avoid.

4. **Writing constraints**:
   - Prioritize field-specific mechanisms over generic motivation.
   - Use concrete named objects and results; avoid broad area labels when a named example is available.
   - Define all notation before the first formula that uses it.
   - Use LaTeX for math only when it clarifies a definition, computation, symbolic schema, or proof move.
   - Keep prose, labels, and conditions outside equations whenever possible.
   - Prefer short symbolic identities or derivations over sentence-like display equations.
   - Use a conservative command set unless the topic truly needs more: fractions, square roots, Greek letters, superscripts/subscripts, named operators, small matrices, and simple aligned blocks.
   - Every inline math delimiter, display math delimiter, environment begin/end, brace, and left/right sizing command must balance within the same math expression.
   - Do not put LaTeX math inside fenced code blocks.
   - Do not fabricate citations or pretend to quote context files.

5. **Quality rules**:
   - Section 3 has 4-7 dictionary entries.
   - Section 4 has 5-8 appearances.
   - Section 4 has at least 3 appearances with concrete mathematical data or symbolic checks.
   - Section 5 has all three subsections and each subsection has 4-6 items.
   - Section 6 traces one flagship example from naive transfer to field-corrected version.
   - Every formula has nearby symbol definitions and a sentence explaining its role.

6. **Verify before finishing**:
   - Run the deterministic Markdown-math verifier used by the `bottom-up` skill:
     - Determine `<repo_root>` with `git rev-parse --show-toplevel`; if that fails, use the current working directory.
     - Run `python3 <repo_root>/.claude/skills/bottom-up/scripts/verify_markdown_math.py --strict-warnings <model_slug>_in_<field_slug>_mental_model_trace.md`.
   - If the verifier reports failures, fix only the flagged math passages and rerun until it passes.
   - Confirm there are no unclosed fenced code blocks.
   - Confirm there is no LaTeX math inside fenced code blocks.
   - Read the generated file and perform a formula sanity pass:
     - every symbol is defined before use
     - every displayed formula is followed or preceded by an interpretation
     - every worked micro-example has enough data to check the claim
     - no equation is doing work that the prose has not motivated
   - Fix any issue found before reporting completion.

7. **Progress output**:
   - After saving and verification, print:
     `Generated a mental-model trace for <model> in <field>. Saved to <output_file>. Markdown math verification passed.`

8. **Follow-up suggestions**:
   - Print a short `What's next?` block with 2-3 commands using actual names from the generated file, for example:
     - `/field-mental-models <field>`
     - `/mental-models <flagship_concept_from_section_6>`
     - `/special-case <specialized_appearance> as a special case of <generalized_form>`

## Example usage

```text
/a-mental-model-in-a-field local-to-global in algebraic topology
/a-mental-model-in-a-field duality as it appears in functional analysis
/a-mental-model-in-a-field quotienting in category theory
/a-mental-model-in-a-field compactness in model theory
```
