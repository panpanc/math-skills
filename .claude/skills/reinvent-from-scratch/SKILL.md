---
name: reinvent-from-scratch
description: Explain a mathematical concept by reinventing it from scratch, with motivation for each key construction step, concrete examples, transfer notes to 2-3 related concepts with similar mental models or construction logic, and deterministic Markdown LaTeX validation. Use when the user asks to reinvent, derive, rediscover, motivate, or build the concept as if creating it for the first time.
---

# Reinvent From Scratch

Explain a mathematical concept as a rediscovery process. The output should make the reader feel the concept was forced by a sequence of natural problems, failed attempts, repairs, and design choices.

Use this skill for concepts and constructions. If the user asks for a named theorem proof, prefer `theorem`; if they want a long climb from calculus and linear algebra primitives with an audit-and-patch loop, prefer `bottom-up`.

## Workflow

### 1. Parse the request

- Parse the invocation arguments. The first non-file argument is the target concept.
- If an argument is a readable file path, use it as optional context.
- Resolve the stage count:
  - If the user specifies a count, honor it exactly. Accept phrasings such as `--stages 7`, `stages=7`, `7 stages`, or `in 7 stages`.
  - If the user specifies a range, choose a count in that range, preferring the upper end for broad or technical concepts.
  - If no count is specified, default to 10-12 stages: use 10 for focused concepts and 11-12 for broader or more technical concepts.
- Infer the reader level from the prompt. If unspecified, assume a motivated reader with solid calculus and linear algebra, but not field-specific notation.
- Save the final markdown as `<target_slug>_reinvented.md` in the current working directory.

### 2. Write the document

Use these required sections in this order.

#### 1. The Thing We Are Trying to Invent

- Name the target concept.
- State the problem in plain language before naming any advanced machinery.
- Give a 2-4 sentence preview of the rediscovery route.
- State what the reader should be able to reconstruct by the end.

#### 2. Starting Ingredients

List 4-8 primitive ingredients the reader needs before inventing the target. For each:

- **Ingredient:** name and type.
- **Plain meaning:** what it says intuitively.
- **Tiny formal anchor:** a compact definition, equation, or condition.
- **Why it will matter:** the later pressure it will answer.
- **Micro-example:** one concrete example with explicit objects.

Do not introduce the target concept here.

#### 3. The Pressure That Forces a New Idea

- Describe the mathematical pain point.
- Show the naive approach a reasonable person would try first.
- Explain exactly where the naive approach fails.
- End with a question beginning `So we need a way to...`.

#### 4. Failed Prototypes

Give 2-4 plausible but insufficient attempts. For each:

- **Prototype:** what the attempt tries.
- **Why it is tempting:** the intuition that makes it look reasonable.
- **Failure mode:** the concrete obstruction.
- **Lesson extracted:** the requirement carried into the real construction.

At least one prototype must include a small worked example.

#### 5. Reinvention Stages

Build the target in the resolved number of ordered stages. If the user did not specify a stage count, use 10-12 stages. Each stage must use only ingredients or outputs already introduced.

Each stage must include:

- `Stage output:` the object, definition clause, test, equivalence, operation, or viewpoint produced.
- **Pressure:** the exact problem or failure from earlier sections that makes this stage necessary.
- **Motivation:** why this move is natural now.
- **Construction:** the precise object, rule, definition clause, or calculation introduced.
- **Why this exact design:** why this construction works better than at least one plausible alternative.
- **Concrete check:** a small explicit example or calculation. Include LaTeX when mathematical notation helps.
- **Similar moves elsewhere:** 2-3 other concepts, theorems, or constructions that share the same motivation, mental model, or construction pattern. For each, name the shared pattern in one short phrase.
- **Next pressure:** what gap remains after this stage.

Rules for the stage sequence:

- Never use the target definition before it is assembled.
- Name every object by type: set, element, map, vector space, topology, category, relation, operator, etc.
- Include at least one short derivation or symbolic check in each stage.
- Make every stage feel motivated by a bottleneck, not by authority.

#### 6. The Assembled Concept

- Present the final clean definition.
- Explain how each clause came from a previous stage.
- Give one near-miss or non-example and name the exact clause it violates.
- Include a compact dependency chain:

```text
starting ingredients -> failed prototypes -> stage outputs -> final concept
```

#### 7. Why This Is the Right Abstraction

- State the main mental model in one sentence.
- Explain what the abstraction preserves.
- Explain what it deliberately forgets or suppresses.
- State where the mental model breaks.
- Include one paragraph beginning `The invention worked because...`.

#### 8. Worked Examples

Give 2-4 examples that increase in complexity. Each example must include:

- **Setup:** concrete objects.
- **Goal:** what is being built, checked, or recognized.
- **Computation or construction:** explicit intermediate steps.
- **Interpretation:** what the result means.
- **Sanity check:** why the answer is plausible.
- **Common mistake:** one likely error and how to avoid it.

#### 9. Transfer Map

List 5-8 related concepts. For each:

- **Concept:** name it.
- **Shared motivation:** the problem pressure it has in common with the target.
- **Shared construction pattern or mental model:** the reusable move.
- **What changes:** how the target's pattern is modified there.
- **Suggested next command:** for example `bottom-up ...`, `deep-explain ...`, or `reinvent-from-scratch ...`.

#### 10. Reconstruction Checklist

Give:

- A 6-10 item checklist for reinventing the concept without notes.
- 3 short exercises with answers or solution sketches.
- One `Explain it back:` prompt.

## Writing Rules

- Explain why before what whenever a new clause, object, notation, or viewpoint appears.
- Prefer concrete examples over generic prose.
- Keep dependency order strict.
- Distinguish failed prototype, definition, construction, example, non-example, and consequence.
- Use standard inline and display LaTeX delimiters for math; never put LaTeX math inside fenced code blocks.
- Keep prose and long labels outside math. Use math text macros only for short connector words such as `and`, `if`, `for`, `where`, or `when`.
- Prefer a single-line display equation when it fits.
- For multi-line derivations, use an aligned environment and align on relation symbols.
- Every math delimiter, environment, brace, and paired fence must balance inside the same math expression.

If using Mermaid:

- Use simple node IDs such as `A`, `stage_2`, or `idea3`.
- Put labels in quoted bracket labels, for example `A["Naive prototype fails"]`.
- Keep one dependency edge per line.
- Ensure every `subgraph` has a matching `end`.

## Verification

Before finishing:

1. Check that all required sections are present and non-empty.
2. Check that Section 5 has the resolved number of stages, or 10-12 stages when the user did not specify a count.
3. Check that each stage contains every required labeled item, including `Similar moves elsewhere` with 2-3 related concepts.
4. Check that every final definition clause is motivated by an earlier stage.
5. Check that no concept-specific symbol is used before being introduced or decoded.
6. Check that there are no unclosed fenced code blocks and no LaTeX math inside fenced code blocks.
7. Resolve `REPO_ROOT` as the repository root or current directory, resolve `GENERATED_FILE` as the path to the generated markdown file, then run Markdown math verification:

   ```bash
   python3 REPO_ROOT/.claude/skills/bottom-up/scripts/verify_markdown_math.py --strict-warnings GENERATED_FILE
   ```

   If it reports failures, fix only the flagged math passages and rerun until it passes.

8. If the document contains Mermaid blocks, run Mermaid verification using the same `REPO_ROOT` and `GENERATED_FILE` values:

   ```bash
   node REPO_ROOT/.claude/skills/bottom-up/scripts/verify_mermaid_blocks.js GENERATED_FILE
   ```

   If it reports errors, fix the Mermaid blocks and rerun until it passes.

9. Read the final document once and patch any unexplained construction, abrupt motivation jump, or invalid LaTeX.

## Completion Summary

After saving and verifying the document, print:

```text
Generated reinvention explanation for <target>.
Saved as: <target_slug>_reinvented.md
Verified:
  - required sections present
  - stage motivation and transfer notes checked
  - Markdown math verifier passed
  - Mermaid verifier passed / not needed
```

Then give 2-3 context-aware next steps based on the generated document.

## Example Usage

```text
reinvent-from-scratch compactness
reinvent-from-scratch compactness --stages 10
reinvent-from-scratch tensor product of modules
reinvent-from-scratch tensor product of modules in 12 stages
reinvent-from-scratch my_notes.md sheaf
reinvent-from-scratch why invent quotient spaces
```
