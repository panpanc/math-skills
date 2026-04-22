---
name: deep-explain
description: Explain a mathematical concept or theorem in exhaustive reader-friendly detail, with early textbook statement/definition, concept-specific notation decoding, motivation for each construction, integrated mental-model callouts with transfer examples, worked examples, non-examples, and special attention to steps first-time readers commonly find confusing. Use when the user asks for a very detailed math explanation, a theorem/concept unpacked line by line, special symbols explained, confusing parts clarified, or the motivation behind unusual definitions/proof moves.
---

# Deep Explain

Generate a markdown explanation that treats the reader as smart but new to the topic. The goal is not merely to state the mathematics, but to make the textbook statement, special notation, construction choices, definition choices, and proof moves feel motivated and navigable.

Use this skill for concepts and theorems. If the user explicitly asks for a bottom-up invention path from elementary primitives, prefer `bottom-up`; otherwise use this skill when the request is for maximal clarity, notation decoding, and detailed explanation.

## Workflow

### 1. Parse the Request

- Parse `$ARGUMENTS`. The first non-file argument is the target concept or theorem.
- If an argument is a readable file path, use it as optional source context and explain the target in relation to that source.
- Determine the mode:
  - **Concept mode** for definitions, constructions, objects, theories, or techniques.
  - **Theorem mode** for named results, lemmas, propositions, proof requests, or statements with hypotheses and conclusions.
- Infer the audience level from the prompt if possible. If not specified, assume a motivated reader with solid calculus and linear algebra, but do not assume they know the target's field-specific notation.

### 2. Write the Document

Save the markdown document as `<target_slug>_deep_explain.md` in the current working directory.

Use these required sections, in this order:

Integrated mental-model rule:

- Introduce mental models inline throughout Sections 4-10 at the exact point where the model helps explain a definition clause, construction choice, proof move, or example.
- Do not create a standalone Mental Models section near the end.
- Use 4-7 total mental-model callouts across the document.
- Each mental-model callout must include:
  - **Mental model:** short name.
  - **Image or analogy:** the picture or intuition.
  - **What it clarifies here:** the local concept/theorem move it explains.
  - **Formal anchor:** the definition, equation, proof step, or construction it corresponds to.
  - **Where it breaks:** the limit of the analogy.
  - **Shared by:** 2-3 other math concepts or theorems that use the same mental model.

#### 1. What We Are Explaining

- Name the target.
- Say whether this is Concept mode or Theorem mode.
- Give a plain-English one-paragraph preview of the idea.
- State the central question the explanation answers.
- Include a short "reader contract": what the reader should understand by the end.

#### 2. Textbook Statement or Clean Definition

Put the standard textbook concept/theorem near the beginning, before motivation-heavy rebuilding.

In Concept mode:

- Give the clean formal definition as a textbook would state it.
- Explain each clause briefly, without yet doing the full intuition/proof development.
- Include one plain-English restatement.
- Say which parts of the definition will receive deeper explanation later.

In Theorem mode:

- State the theorem formally.
- Split the statement into hypotheses, objects, and conclusion.
- Explain the quantifier structure briefly.
- State the theorem again in plain English.
- Give a proof map before giving proof details.

Keep this section concise and canonical. Its job is to orient the reader by showing the mathematical object exactly as it appears in textbooks before the rest of the document explains why it has that form.

#### 3. Notation and Symbol Ledger

List only the symbols that are special to this concept/theorem, overloaded in this context, field-specific, or structurally central to the formal statement. Do not ledger ordinary punctuation, standard arithmetic signs, common variables used only locally, or every bound variable in examples unless they carry concept-specific meaning.

For each symbol include:

- **Symbol**
- **Type**: number, vector, function, set, space, relation, operator, map, index, parameter, hypothesis, conclusion, etc.
- **Meaning**
- **Where it first appears**
- **Common confusion**

Rules:

- Every special or concept-specific symbol in the textbook statement/definition must appear in this ledger or be introduced immediately before that statement.
- Later displayed formulas may introduce local dummy variables or standard operators in the surrounding prose, but any recurring special notation should be added to the ledger.
- If the same letter has multiple conventional meanings, state which meaning is active here.
- Distinguish objects from their elements, maps from their values, spaces from coordinates, and equality from isomorphism/equivalence when relevant.

#### 4. The Problem It Solves

- Explain the mathematical pain point or gap that makes the target necessary.
- Describe what a naive approach would try first.
- Explain why that naive approach is insufficient.
- Name the new capability the target provides.

#### 5. Prerequisite Ideas, Briefly Rebuilt

List 4-10 prerequisite ideas the reader must hold in working memory. For each:

- Give a plain-language explanation.
- Give a compact formal version.
- Explain exactly where it will be used later.
- Include a tiny concrete example.

Keep this section short, but do not merely name prerequisites. Rebuild the pieces the explanation will lean on.

#### 6. Main Objects and Their Jobs

Introduce the central objects one at a time. For each object:

- **Object:** name it.
- **What it is:** give the formal shape.
- **Why it exists:** explain the problem it solves.
- **What job it performs:** say what role it plays in the concept/theorem.
- **What would break without it:** identify the missing function.
- **First-time-reader trap:** name a likely misunderstanding and fix it.

#### 7. Construction Walkthrough

Break the construction, definition, or proof setup into 5-10 ordered steps. Each step must include:

- **Step output:** the object, statement, equation, or proof state produced.
- **Motivation:** why this step is the next natural move.
- **Inputs:** previously introduced objects or facts used here.
- **Action:** what is built, assumed, transformed, or checked.
- **Formula/notation explanation:** decode any special or newly introduced notation in the step. Do not belabor routine dummy variables or standard arithmetic/logical symbols unless they are likely to confuse the intended reader.
- **Micro-example:** a concrete small case with explicit values, sets, functions, matrices, or diagrams-as-text.
- **Why this is not arbitrary:** explain why the construction is shaped this way instead of a plausible alternative.
- **Common confusion:** describe a reader's likely stumbling point and resolve it.

Keep dependency order strict: never use a concept or symbol before it has been introduced or locally decoded.

#### 8. The Key Insight

State the conceptual crux in one sentence.

Then expand it with:

- The intuition behind the insight.
- The formal content behind the intuition.
- Why this insight is easy to miss.
- A wrong but tempting mental model and the correction.
- At least one integrated mental-model callout, using the format from the integrated mental-model rule above.

#### 9. Detailed Reasoning or Proof Walkthrough

In Concept mode:

- Explain how the definition behaves under examples.
- Derive at least two basic consequences.
- Show how to verify whether an object satisfies the definition.
- Include one near-miss and one non-example if they clarify why the definition uses exactly these clauses.

In Theorem mode:

- Walk through the proof step by step.
- For every nontrivial implication, include a `Why this follows:` explanation.
- For algebraic or logical derivations, show intermediate steps instead of jumping to the result.
- Map each proof step back to the proof map from Section 2.
- Flag hidden assumptions, existence claims, uniqueness claims, and changes of viewpoint.

#### 10. Worked Examples

Provide 3-5 worked examples. Each example must include:

- **Setup:** concrete objects and data.
- **Goal:** what is being computed, proved, or checked.
- **Computation or argument:** explicit intermediate steps.
- **Interpretation:** what the result means.
- **Sanity check:** how the reader can tell the result is plausible.
- **Common mistake:** one likely error and how to avoid it.

Use examples that increase in complexity gradually.

#### 11. Non-Examples and Boundary Cases

Give 2-4 non-examples or edge cases. For each:

- Describe why it looks tempting.
- Identify the exact condition or proof step that fails.
- Explain what the failure teaches about the target.

#### 12. Confusion Clinic

Answer 8-12 likely first-time-reader questions. Include questions about:

- Symbols that look similar but mean different things.
- Why a construction is defined this way rather than another natural way.
- Where a proof step gets its authority.
- What is being held fixed versus allowed to vary.
- How to recognize the concept/theorem in the wild.

Each answer should be concrete and should point back to an earlier section when useful.

#### 13. Reconstruction Checklist

Give the reader a way to rebuild the idea without looking:

- A 6-10 item checklist for reconstructing the concept/theorem.
- 3 short exercises with answers or solution sketches.
- One "explain it back" prompt that tests conceptual understanding.

#### 14. Connections and Next Steps

List 5-8 related concepts, theorems, or techniques. For each:

- Name it.
- State the connection in one sentence.
- Say which symbol, construction, or mental model transfers.
- Suggest a next command, such as `/theorem ...`, `/bottom-up ...`, or `$deep-explain ...`.

## Writing Rules

- Explain why before what whenever a new object, definition clause, construction step, or proof move appears.
- Prefer concrete small examples over generic prose.
- Name every object by type: set, element, vector space, linear map, function, operator, topology, sigma-algebra, category, functor, natural transformation, group action, etc.
- Distinguish "definition," "construction," "hypothesis," "lemma," "claim," "example," and "consequence."
- Explain mental models inline where they clarify the active mathematical move, and always tie them to a formal anchor plus 2-3 other concepts/theorems that share the same model.
- When a construction has a distinctive or non-obvious design choice, include a paragraph beginning `Why this design choice matters:`.
- When a reader could confuse two nearby ideas, include a paragraph beginning `Do not confuse:`.
- Use fenced code blocks only for Mermaid diagrams, pseudocode, or computation traces. Never put LaTeX math inside fenced code blocks.

## LaTeX and Diagram Rules

Follow the LaTeX hygiene used by the `bottom-up` skill:

- Use LaTeX for math with `$...$` and `$$...$$`.
- Prefer a single-line display equation when it fits.
- Use `$$\begin{aligned}...\end{aligned}$$` for multi-line derivations with more than one equality, implication, or transformation step.
- Align derivations on `&=`, `&\le`, `&\ge`, `&\to`, `&\implies`, or the relevant relation.
- Keep prose and long labels outside math. Use `\text{}` only for short connector words such as `and`, `if`, `for`, `where`, or `when`.
- Prefer one symbolic derivation chain per display block.
- Do not place multiple tall matrix environments on the same row of an `aligned` block.
- Use a conservative command set unless needed: `\frac`, `\sqrt`, Greek letters, superscripts/subscripts, `\operatorname{tr}`, `\begin{bmatrix}...\end{bmatrix}`, and `\left...\right`.
- Every `$`, `$$`, `\(`, `\)`, `\[`, `\]`, `\begin{...}`, `\end{...}`, `{`, `}`, `\left`, and `\right` must balance within the same math expression.

For Mermaid diagrams:

- Use simple node IDs such as `A`, `step_2`, or `lemma3`.
- Put human-readable labels in quoted bracket labels, for example `A["Kernel measures collapse"]`.
- Keep one dependency edge per line.
- Ensure every `subgraph` has a matching `end`.

## Verification

Before finishing:

1. Check that all required sections are present and non-empty.
2. Check that every special or concept-specific symbol in the textbook statement/definition appears in the Symbol Ledger or is introduced immediately before the statement.
3. Check that every construction step has motivation, inputs, action, formula/notation explanation, micro-example, design-choice explanation, and common-confusion note.
4. Check that mental models are integrated inline rather than saved for a standalone end section, and that each mental model has a formal anchor plus 2-3 other concepts/theorems that share the same model.
5. Check that there are no unclosed fenced code blocks and no math inside fenced code blocks.
6. Run Markdown math verification using the bottom-up verifier:

   ```bash
   repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
   python3 "$repo_root/.claude/skills/bottom-up/scripts/verify_markdown_math.py" --strict-warnings "<target_slug>_deep_explain.md"
   ```

   If it reports failures, fix only the flagged math passages and rerun until it passes.

7. If the document contains Mermaid blocks, run Mermaid verification:

   ```bash
   repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
   node "$repo_root/.claude/skills/bottom-up/scripts/verify_mermaid_blocks.js" "<target_slug>_deep_explain.md"
   ```

   If it reports errors, fix the Mermaid blocks and rerun until it passes.

8. Read the final document once and patch any undefined symbol, unexplained construction, or abrupt reasoning jump.

## Completion Summary

After saving and verifying the document, print:

```text
Generated deep explanation for <target>.
Saved as: <target_slug>_deep_explain.md
Verified:
  - required sections present
  - special-symbol ledger checked
  - Markdown math verifier passed
  - Mermaid verifier passed / not needed
```

Then give 2-3 context-aware next steps based on the generated document.

## Example Usage

```text
$deep-explain spectral theorem
$deep-explain Yoneda lemma, explain the special notation
$deep-explain my_notes.md tensor product of modules
$deep-explain why the definition of sheaf uses matching families
```
