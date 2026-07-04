---
name: generalization-ladder
description: Explain a mathematical concept by listing higher, more abstract concepts that generalize it, and by showing precisely how the original concept is recovered as a special case of each broader concept. Use when the user asks "what generalizes X", "what abstractions are above X", "how is X a special case", "fit X into a broader framework", "higher concepts behind X", or wants a ladder of generalizations rather than a proof or first-principles derivation.
---

# Generalization Ladder

Explain a mathematical concept by moving upward: identify broader concepts that abstract from it, then show the exact specialization data, axioms, or choices that recover the starting concept.

Use this skill for conceptual orientation. If the user wants multiple explanatory levels of the same concept, prefer `abstraction-levels`; if they want to reinvent the concept from elementary pressures, prefer `reinvent-from-scratch`; if they want a theorem proof analysis, prefer `theorem`.

## Workflow

### 1. Parse the request

- Treat the first non-file argument as the target concept.
- If an argument is a readable file path, read it as optional context.
- Infer the reader level from the prompt. If unspecified, assume a motivated reader with solid calculus and linear algebra plus early abstract algebra/topology vocabulary.
- Infer a requested rung count from phrases such as `8 generalizations` or `15 rungs`. If unspecified, use `12`. Clamp the final count to `8..16`.
- Save the final markdown as `<target_slug>_generalization_ladder.md` in the current working directory.

If no target concept is identifiable, print:

```text
No target concept found. Provide a concept like "metric space", "vector space", "group", or "Fourier transform".
```

Then stop.

### 2. Choose legitimate generalizations

Build a ladder of higher concepts where the target is genuinely a special case.

Use a rung only when the target can be recovered by at least one of these mechanisms:

- **Forgetting structure:** discard extra operations, measurements, order, topology, smoothness, linearity, or coordinates.
- **Weakening axioms:** relax a law such as commutativity, associativity, invertibility, completeness, compactness, smoothness, or finite dimensionality.
- **Changing ambient category:** reinterpret the target inside sets, categories, functor categories, enriched categories, sheaves, modules, spaces, spectra, or another broader setting.
- **Adding specialization data:** recover the target by choosing objects, morphisms, fields, bases, metrics, norms, topologies, generators, relations, or coefficients.
- **Universal-property inclusion:** show the target as the object satisfying an abstract mapping property in a larger class.
- **Internalization/enrichment:** view the target as an ordinary case of an internal, enriched, indexed, derived, or higher-categorical version.

Do not put mere analogies in the main ladder. If a related idea is illuminating but not a strict special-case relation, place it in the "Near Generalizations and False Friends" section.

Prefer a mix of nearby and far-up abstractions:

- 3-5 immediate generalizations.
- 3-5 structural or categorical generalizations.
- 2-4 unifying frameworks that reveal the target as one instance of a broad pattern.

Order the rungs from closest to most abstract unless the user asks for a different order.

### 3. Write the document

Use these required sections in this order.

#### 1. The Starting Concept

- State the target concept in plain language.
- Give a compact formal anchor.
- Name one running example that will be carried through the ladder.
- State the main kind of structure the concept has.
- State the main kind of structure it will lose, weaken, or reinterpret as the ladder climbs.

#### 2. Generalization Map

Include a table with one row per rung and these columns:

- `Rung`
- `Broader concept`
- `Generalization move`
- `How the target is recovered`
- `What becomes visible`
- `What gets forgotten`

Every row must contain an explicit recovery phrase such as `choose...`, `restrict to...`, `add the axiom...`, `take the one-object case...`, `use discrete topology...`, or `work over...`.

#### 3. The Ladder

For each rung, use this exact structure:

```text
### Rung N - <broader concept>

- **Broader concept:** <name and one-sentence meaning>
- **What it abstracts from <target>:** <the structure, axiom, or viewpoint being generalized>
- **Specialization recipe:** <the precise added constraints/data that recover the target>
- **Translation of the target data:** <how the target's objects, maps, operations, or laws are represented upstairs>
- **Running example upstairs:** <the running example reinterpreted at this rung>
- **New phenomena upstairs:** <what can happen in the broader concept that cannot happen in the target>
- **What this buys:** <why this generality is useful>
- **Misconception to avoid:** <one boundary or false inference>
- **Bridge upward:** <how this rung suggests the next broader concept>
```

Quality requirements for each rung:

- Make the special-case relation explicit, not merely suggestive.
- Name the direction of abstraction: forgetting, weakening, internalizing, enriching, categorifying, decategorifying, completing, localizing, deriving, or changing base.
- Include at least one concrete object, map, equation, or diagrammatic relationship when notation helps.
- Avoid saying only "X is a special case of Y"; explain the recovery mechanism.

#### 4. Same Example Through the Ladder

Create a compact table that follows the running example through every rung:

- `Rung`
- `How the example appears`
- `Extra structure present in the target`
- `Structure forgotten or generalized upstairs`

#### 5. Special-Case Recipes

List 5-10 reusable patterns from the ladder. Each item must have:

- **Pattern name:** for example `forget a metric`, `one-object categorification`, `linearize over a field`, `choose coefficients`, `restrict morphisms`, or `impose locality`.
- **Abstract form:** the broad move.
- **Target recovery:** the concrete specialization that recovers the starting concept.
- **Another place this pattern appears:** one different concept or theorem using the same move.

#### 6. Near Generalizations and False Friends

List 3-6 related broader-looking concepts that are useful but not clean rungs.

For each:

- State whether it is an analogy, partial generalization, sibling concept, dual notion, or context shift.
- Explain why it is not in the main ladder.
- Explain what it still teaches about the target.

Do not include this section merely to pad the answer; use it to prevent overclaiming.

#### 7. How to Use the Ladder

Give:

- 3-6 questions the reader can ask to locate a concept inside a broader framework.
- 3-6 next concepts to study, ordered from closest to farthest.
- 2-4 suggested follow-up commands using actual concepts from the ladder, such as `abstraction-levels <rung>`, `reinvent-from-scratch <rung>`, or `theorem <named theorem>`.

## Writing Rules

- Write as a top mathematician-educator who values exactness and orientation.
- Keep the ladder navigable: each rung should teach one new abstraction move.
- Prefer concrete specialization recipes over broad prose.
- Use standard LaTeX delimiters for math and never put LaTeX math inside fenced code blocks.
- Keep prose and long labels outside math. Use `\text{}` only for short connector words such as `and`, `if`, `for`, `where`, or `when`.
- Prefer one-line display equations when they fit.
- For multi-line derivations, use `$$\begin{aligned}...\end{aligned}$$` and align on relation symbols.
- Every math delimiter, environment, brace, and paired fence must balance inside the same math expression.
- If using Mermaid, use ASCII-safe labels, simple node IDs, and one edge per line.

## Verification

Before finishing:

1. Confirm the final rung count is between 8 and 16 inclusive.
2. Confirm every main rung is a genuine special-case relation, not merely an analogy.
3. Confirm every rung includes all 9 required labeled items.
4. Confirm the Generalization Map and Same Example tables each have one row per rung.
5. Confirm every Generalization Map row has an explicit recovery phrase.
6. Confirm Section 5 contains 5-10 reusable special-case recipes.
7. Confirm Section 6 marks non-rungs honestly as analogies, siblings, partial generalizations, dual notions, or context shifts.
8. Check that no concept-specific symbol is used before it is introduced or decoded.
9. Check that there are no unclosed fenced code blocks and no LaTeX math inside fenced code blocks.
10. Resolve `REPO_ROOT` as the repository root or current directory, resolve `GENERATED_FILE` as the generated markdown file, then run:

   ```bash
   python3 REPO_ROOT/.claude/skills/bottom-up/scripts/verify_markdown_math.py --strict-warnings GENERATED_FILE
   ```

   If it reports failures, fix only the flagged math passages and rerun until it passes.

11. If the document contains Mermaid blocks, run:

   ```bash
   node REPO_ROOT/.claude/skills/bottom-up/scripts/verify_mermaid_blocks.js GENERATED_FILE
   ```

   Fix any Mermaid errors and rerun until it passes.

12. Read the final document and patch any vague generalization, missing recovery mechanism, or abrupt jump.

## Completion Summary

After saving and verifying the document, print:

```text
Generated a <N>-rung generalization ladder for <target>.
Saved as: <target_slug>_generalization_ladder.md
Verified:
  - every rung has an explicit special-case recipe
  - tables have one row per rung
  - Markdown math verifier passed
  - Mermaid verifier passed / not needed
```

Then give 2-3 context-aware next steps based on the ladder.

## Example Usage

```text
generalization-ladder metric space
generalization-ladder group with 12 rungs
generalization-ladder vector space as a special case of broader concepts
generalization-ladder Fourier transform higher abstractions
```
