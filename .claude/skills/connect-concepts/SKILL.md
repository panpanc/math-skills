---
name: connect-concepts
description: Explore relationships among two or more mathematical concepts, theorems, fields, or techniques by building a typed concept-connection map with pairwise links, bridge examples, shared mental models, contrasts, and study pathways. Use when the user asks how math ideas are connected, wants a concept network, asks to compare or synthesize several topics, asks for bridges between concepts, or wants to see analogies, dependencies, generalizations, dualities, and false friends among multiple mathematical ideas.
---

# Connect Concepts

Build a mathematically honest connection map among multiple ideas. Emphasize mechanisms: not merely that two concepts are "related", but how the relation works, what data moves across it, and where the analogy breaks.

Use this skill for synthesis across concepts. If the user only wants prerequisite ordering for a course, prefer `dependency-map`; if they only want vertical abstraction of one concept, prefer `generalization-ladder`; if they only want reusable reasoning patterns inside one topic, prefer `mental-models`.

## Workflow

### 1. Parse the request

- Treat `$ARGUMENTS` as a list of mathematical concepts, theorems, fields, techniques, or files.
- Read any readable file paths as optional context; otherwise infer the concepts from the prompt.
- Split concept lists on commas, semicolons, bullets, `and`, `vs`, `between`, or phrases like `connections among`.
- Infer a focus lens when supplied, such as `category theory lens`, `analysis lens`, `for algebraic topology`, `study plan`, `intuition`, `examples`, `proof techniques`, or `historical`.
- If no explicit focus is supplied, use a balanced mathematical lens: definitions, examples, theorems, structures, proof techniques, and mental models.
- If fewer than 2 concepts are identifiable, print:

```text
No concept set found. Provide at least two targets, for example "compactness, continuity, and convergence" or "groups vs Lie algebras".
```

Then stop.

- Save the final markdown as `<concepts_slug>_concept_connections.md` in the current working directory.
- Build `concepts_slug` from 2-5 key concept names. For larger sets, use the first 3 plus `and_more`.

### 2. Classify the concepts

For each concept, create a compact concept card with:

- **Native setting:** field or mathematical context where the concept naturally lives.
- **Core object/data:** the objects, maps, operations, relations, spaces, or axioms involved.
- **Main purpose:** what mathematical pressure the concept answers.
- **Canonical example:** one concrete example that can be reused in comparisons.
- **Signature theorem/construction:** one theorem, construction, or method strongly associated with it.
- **Common confusion:** one nearby idea that is often conflated with it.

Keep cards short. The connection map is the main artifact.

### 3. Build typed edges

Create a relationship edge for each meaningful connection. For 2-8 concepts, consider every unordered pair. For more than 8 concepts, select the strongest edges while keeping every concept connected to at least two others when mathematically honest.

Use this edge taxonomy:

- `prerequisite`: one idea is normally needed before another.
- `generalizes`: one idea broadens another by weakening axioms, forgetting structure, changing context, or adding abstraction.
- `specializes`: one idea is recovered from another by adding constraints or choosing data.
- `dual`: one idea reverses arrows, operations, variance, order, or perspective from another.
- `analogy`: the ideas share a structure-preserving pattern without a strict implication.
- `shared-construction`: the same construction, such as quotient, completion, localization, linearization, representation, or compactification, appears in both.
- `shared-theorem-pattern`: the same proof architecture or theorem form appears in both.
- `invariant`: one idea measures, classifies, obstructs, or detects features of another.
- `example-of`: one idea supplies examples, models, or counterexamples for another.
- `method-for`: one idea is a technique used to study the other.
- `tension`: the ideas pull in different directions or expose a limitation in each other.
- `false-friend`: the connection is tempting but misleading unless qualified.

For each edge include:

- `from` and `to` concept names.
- relation type from the taxonomy.
- direction, if directional; otherwise mark `symmetric`.
- mechanism: the exact mathematical move linking the ideas.
- bridge object/theorem/example: a concrete named bridge.
- confidence: `high`, `medium`, or `low`.
- boundary: where the relation fails, becomes school-dependent, or needs extra hypotheses.

Prefer fewer strong edges over many vague ones.

### 4. Write the document

Use these required sections, in order.

#### 1. Scope and Reading Lens

- List the target concepts.
- State the inferred or requested lens.
- State whether the map is extracted from files, inferred from standard mathematics, or mixed.
- Define what counts as a connection in this map.

#### 2. Concept Cards

Provide one compact card per concept using the labels from Step 2.

#### 3. Connection Matrix

Create a matrix with concepts as rows and columns.

- Put `same` on the diagonal.
- In each off-diagonal cell, list 1-3 short relation tags, such as `generalizes`, `dual`, `method-for`, or `analogy`.
- If the relationship is directional, use an arrow phrase such as `prereq ->` or `<- specializes`.
- Use `weak` when the relation exists but is mostly analogy.
- Use `none obvious` only when a direct relation would be forced or misleading.

#### 4. Edge Ledger

Create a table with columns:

`from | to | relation | direction | mechanism | bridge | confidence | boundary`

Make mechanisms concrete. Avoid entries like "both are important" or "both involve structure".

#### 5. Connection Graph

Include a Mermaid graph when there are 3 or more concepts.

- Use simple ASCII node IDs.
- Use short edge labels from the taxonomy.
- Put one edge per line.
- If there are more than 12 edges, show only the strongest high-level edges and say that the full edge set is in Section 4.

For exactly 2 concepts, replace the graph with a one-page bridge diagram in prose:

- what travels from concept A to concept B
- what travels from concept B to concept A
- what cannot travel without extra assumptions

#### 6. Synthesis Themes

Group the edges into 3-7 themes. Examples:

- structure vs property
- local-to-global transfer
- symmetry and invariance
- approximation and completion
- quotienting and loss of information
- linearization
- dual viewpoints
- algebraic encoding of geometry
- analytic control of algebraic data

For each theme, name the concepts it connects and explain the shared mechanism.

#### 7. Bridge Examples

Give 3-6 worked bridge examples. Each example must include:

- the concepts it connects
- the bridge object, theorem, or construction
- the concrete data being transported
- a short explanation of what becomes easier to see
- one limitation or failure mode

Use notation only when it clarifies the bridge.

#### 8. Tensions, False Friends, and Non-Connections

List 3-6 warnings. Include at least one false friend if the concept set naturally invites one.

For each warning:

- name the tempting connection
- explain why it is incomplete, false, or hypothesis-dependent
- state the corrected version

Do not overstate analogies as theorems.

#### 9. Study and Exploration Routes

Provide 3-5 routes through the concept network. Each route must have:

- a route name
- ordered concepts or bridge objects to study
- why that order works
- what the learner should be able to transfer at the end

Include at least one route optimized for prerequisites and one route optimized for conceptual synthesis.

#### 10. Sanity Check Summary

End with:

- number of concepts
- number of edges
- strongest connection types
- weakest or most uncertain connection
- one paragraph summarizing the shape of the network

## Writing Rules

- Write as a rigorous mathematician-educator focused on synthesis.
- Use precise relationship verbs: `is a special case of`, `classifies`, `represents`, `detects`, `forgets`, `linearizes`, `completes`, `dualizes`, `quotients`, `internalizes`, `acts on`, `is invariant under`.
- Separate strict relationships from analogies.
- Mark hypotheses explicitly when a connection only holds under conditions such as compactness, finiteness, smoothness, completeness, commutativity, abelianness, or finite dimensionality.
- Prefer named bridge objects and theorems over broad field-level claims.
- Avoid padding with weak edges. It is acceptable to say a direct connection is weak.
- Use LaTeX only for formal anchors and compact identities.
- Never put LaTeX math inside fenced code blocks.
- Use Mermaid only inside fenced `mermaid` blocks.
- Keep Mermaid labels short and ASCII-safe.

## Verification

Before finishing:

1. Confirm at least 2 concepts are present.
2. Confirm all 10 required sections exist and are non-empty.
3. Confirm every concept has a concept card.
4. Confirm the matrix includes every concept as both row and column.
5. Confirm each edge ledger row has all 8 required fields.
6. Confirm every edge uses a relation type from the taxonomy.
7. Confirm every edge has a concrete mechanism and bridge, not only a vague association.
8. Confirm directional relations state their direction.
9. Confirm at least 3 synthesis themes appear unless there are only 2 concepts.
10. Confirm false friends or non-connections are stated without overclaiming.
11. Check that no concept-specific symbol is used before it is introduced or decoded.
12. Check that no fenced code block is unclosed.
13. Resolve `REPO_ROOT` as the repository root or current directory, resolve `GENERATED_FILE` as the generated markdown file, then run:

```bash
python3 REPO_ROOT/.claude/skills/bottom-up/scripts/verify_markdown_math.py --strict-warnings GENERATED_FILE
```

Fix any flagged math passages and rerun until it passes.

14. If the document contains Mermaid blocks, run:

```bash
node REPO_ROOT/.claude/skills/bottom-up/scripts/verify_mermaid_blocks.js GENERATED_FILE
```

Fix any Mermaid errors and rerun until it passes.

15. Read the final document and patch vague edges, missing bridges, duplicated themes, or overstated analogies.

## Completion Summary

After saving and verifying the document, print:

```text
Generated a concept-connection map for <concept list>.
Saved as: <concepts_slug>_concept_connections.md
Verified:
  - all concepts have cards
  - matrix and edge ledger cover the network
  - strict vs analogical links are separated
  - Markdown math verifier passed
  - Mermaid verifier passed / not needed
```

Then give 2-3 context-aware next steps using actual concepts or bridge objects from the generated file.

## Example Usage

```text
connect-concepts compactness, continuity, convergence
connect-concepts groups, Lie algebras, representations
connect-concepts homology, cohomology, exact sequences, derived functors
connect-concepts Fourier transform and Pontryagin duality through a category theory lens
connect-concepts metric spaces, normed vector spaces, Banach spaces, Hilbert spaces
```
