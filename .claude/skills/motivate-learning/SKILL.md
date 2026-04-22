---
name: motivate-learning
description: Generate a markdown motivation brief for learning a new mathematical concept or theorem by scanning the current project for past study artifacts, inferring what the learner has already encountered, and connecting the new topic to those familiar ideas. Use when the user asks why they should learn a concept/theorem, wants motivation before studying something new, wants a topic connected to their prior notes or generated files, or asks what learning the new topic will help them understand better.
---

# Motivate Learning

Create a project-aware motivation brief for a new mathematical concept or theorem. The output should make the target feel worth learning by connecting it to the learner's existing artifacts and by naming what becomes easier, sharper, or newly visible after learning it.

## Workflow

### 1. Parse the Request

- Parse the runtime argument string. The first non-file argument is the target concept or theorem.
- If any argument is a readable file or directory, treat it as explicit learning-context evidence and prioritize it over the general project scan.
- Determine mode:
  - **Concept mode** for definitions, constructions, objects, theories, techniques, or fields.
  - **Theorem mode** for named theorems, lemmas, propositions, proof requests, or results with hypotheses and conclusions.
- If no target is identifiable, print: `No concept or theorem found. Provide a target like "Yoneda lemma" or "spectral sequence".` and stop.

### 2. Scan the Current Project

Infer the learner's recent mathematical context from project artifacts. Do not claim the learner has mastered anything; use careful wording such as "your project suggests you have studied" or "your files contain evidence of work on."

Use this scan order:

1. Explicit files or directories passed in the runtime argument string.
2. Markdown and notebook artifacts in the current working directory and repository, excluding `.git/`, `.claude/skills/`, `.agents/`, caches, and dependency folders.
3. The `examples/` directory if there are too few user-generated artifacts.
4. `README.md`, `QA.md`, and `AGENTS.md` only as weak evidence about available workflows, not as evidence of what the learner studied.

For each candidate artifact, read only enough to extract learning evidence:

- Filename stem, especially generated-output patterns such as `_bottom_up`, `_deep_explain`, `_proof`, `_dependency_map`, `_mental_models_map`, `_origin`, `_abstraction_levels`, and course folders.
- The first 1-3 headings.
- Section titles named like "Connections", "Downstream Growth", "Prerequisites", "Mental Models", "Dependency", "Final Concept/Theorem Statement", or "What this unlocks next".
- A small number of repeated named concepts or theorems that appear central.

Build a concise evidence inventory with 6-15 items. Prefer items that are mathematically close to the target or recur across multiple artifacts.

If the project has many artifacts, do not summarize everything. Select the most relevant evidence by:

- Shared field or prerequisite path.
- Shared mental model.
- Direct downstream/upstream relation.
- Repeated appearance across filenames or headings.
- Recent-looking generated files in the working directory.

### 3. Build the Motivation Argument

Use the evidence inventory to explain why the target is a natural next topic.

Include these kinds of bridges:

- **Prerequisite bridge:** a prior concept is a direct input to the target.
- **Generalization bridge:** the target takes a familiar pattern and makes it more powerful.
- **Unification bridge:** the target explains why several familiar examples look alike.
- **Proof-technique bridge:** the target teaches a move that reappears in proofs the learner has seen.
- **Language bridge:** the target gives names or notation for something the learner has been doing informally.
- **Bottleneck bridge:** the target removes a limitation in a prior explanation, example, or theorem.

For every major bridge, cite the project evidence that suggested it. A citation can be a filename, heading, or course folder name. If a bridge is based on mathematical inference rather than explicit project evidence, label it as an inference.

### 4. Write the Markdown File

Save the document as `<target_slug>_learning_motivation.md` in the current working directory.

Use this required structure:

#### 1. Why This Topic Is Worth Your Attention

- Name the target and mode.
- Give a 3-5 sentence motivational thesis.
- State the main promise: what learning the target will let the learner see, ask, compute, or prove that was harder before.

#### 2. What Your Project Suggests You Already Know

- Give a short evidence note explaining how the project was scanned.
- List 6-15 evidence items. For each include:
  - **Artifact:** filename, folder, or heading.
  - **Studied idea suggested:** the concept/theorem/pattern inferred.
  - **Confidence:** high, medium, or low.
  - **Why it matters for the target:** one sentence.

#### 3. The Gap This New Topic Closes

- Name the mathematical bottleneck or frustration the target addresses.
- Show one naive approach that a learner with the project background might try.
- Explain why that approach runs out of power.
- State how the target changes the situation.

#### 4. Bridges From Familiar Ideas

Give 5-9 bridges. Each bridge must include:

- **From what you know:** a prior idea, with artifact evidence.
- **The transfer:** the exact mental move, structure, proof pattern, or notation that carries over.
- **What changes in the new topic:** how the target extends, corrects, abstracts, or reorganizes the familiar idea.
- **Payoff:** what becomes easier after making the bridge.
- **Caveat:** where the analogy stops being reliable.

#### 5. What You Will Understand Better After Learning This

This section is mandatory and should be concrete. Give 5-10 before/after entries:

- **Familiar thing to revisit:** a concept, theorem, proof, or artifact from the project.
- **Before learning the target:** what likely remains opaque or ad hoc.
- **After learning the target:** the sharper interpretation the target enables.
- **New question you can now ask:** one precise mathematical question unlocked by the target.

#### 6. A First Foothold, Not the Whole Mountain

- Give the smallest useful mental model for the target.
- Give one tiny concrete example or toy case.
- Include the first formal object or statement the learner should hold in memory.
- Name one common false start and how to avoid it.

#### 7. A Short Learning Route

Give a 4-7 step route from the learner's apparent background to the target. For each step include:

- **Step goal:** what to learn or verify.
- **Uses:** the prior project idea or bridge it relies on.
- **Micro-task:** a 5-15 minute exercise, check, or explanation prompt.
- **Ready signal:** how the learner knows they can move on.

#### 8. Why This Is Emotionally Worth It

Write a brief, grounded motivation paragraph. Avoid hype. Name the specific kind of relief, compression, control, or new curiosity the target can provide.

#### 9. Next Commands

Suggest 3-5 concrete follow-up commands using existing skills in this repo, such as:

- `/bottom-up <target>`
- `/deep-explain <target>`
- `/theorem <related theorem>`
- `/dependency-map <field containing target>`
- `/mental-models <target>`
- `/term-origins <key term>`

Use actual names from the motivation brief, not placeholders.

## Writing Rules

- Write as a motivating mathematical mentor: honest, specific, and rigorous, not salesy.
- Make the learner feel continuity: the new target should look like a next move from prior study, not a random assignment.
- Never overclaim from project evidence. Distinguish evidence, inference, and speculation.
- Prefer concrete artifacts from the project over generic prerequisite lists.
- Explain why the target matters before explaining what it formally is.
- Include enough formal notation to make the motivation mathematically anchored, but do not turn the document into a full proof or full bottom-up explanation.
- Use LaTeX for math and keep prose outside display equations.
- Use fenced code blocks only for Mermaid diagrams, code snippets, or command examples.
- Do not put LaTeX math inside fenced code blocks.

## Verification

Before finishing, run the Markdown verification used by the `bottom-up` skill:

```bash
python3 "<repo_root>/.claude/skills/bottom-up/scripts/verify_markdown_math.py" --strict-warnings "<target_slug>_learning_motivation.md"
```

If the verifier reports failures, fix only the flagged math passages and rerun until it passes.

Also verify manually:

- The output file exists and follows the required section order.
- Section 2 contains project evidence, not only generic prerequisites.
- Section 4 has 5-9 bridges and each bridge cites evidence or labels an inference.
- Section 5 explicitly says what becomes easier to understand after learning the target.
- No unclosed fenced code blocks.
- No unclosed LaTeX delimiters.
- No LaTeX math inside fenced code blocks.

If the document includes Mermaid, also run the Mermaid verifier from the `bottom-up` skill:

```bash
node "<repo_root>/.claude/skills/bottom-up/scripts/verify_mermaid_blocks.js" --require-mermaid "<target_slug>_learning_motivation.md"
```

After saving and verifying, print:

`Generated a project-aware motivation brief for <target>. Saved to <output_file>.`
