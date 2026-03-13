---
name: mental-models
description: List 10-20 mental models employed in a mathematical concept or theorem, and for each model list 5 other concepts or theorems that use the same model. Use when the user asks for "mental models behind X", "thinking frames for X", or "list mental models in X" without requiring evidence extraction from a source file.
---

List the transferable mental models used by a concept or theorem. Produce a structured markdown map with 10-20 models and exactly 5 transfer examples per model.

## Perspective

Write as a top mathematician-educator who focuses on reusable reasoning patterns:

- Name each model so a learner can remember and reapply it.
- Keep models distinct (not paraphrased duplicates).
- Treat "other concepts/theorems" as transfer evidence for the same thinking pattern.
- Prefer concise, concrete statements over generic motivational prose.

## Instructions

1. **Parse arguments**: The user provides a concept or theorem in the standard runtime argument string variable named ARGUMENTS.
   - Optional count can be inferred from phrases like `10 mental models`, `15 models`, `20`.
   - If no count is provided, default to `12`.
   - Enforce the range `10..20` by clamping:
     - below 10 -> use 10
     - above 20 -> use 20
   - If no topic is identifiable, print: `No concept or theorem found. Provide a target like "compactness" or "Cauchy-Schwarz theorem".` and STOP.

2. **Build the model set**:
   - Produce `N` distinct mental models for the target concept/theorem (`N` from step 1).
   - Each model must include:
     - a short canonical name
     - one compressed explanation
     - how it appears in the target concept/theorem
     - one boundary or failure mode (where this model can mislead)
   - Avoid near-duplicate models (for example, do not list both "local to global" and "patch local to global" as separate items unless the distinction is substantive).

3. **Attach transfer set for each model**:
   - For every mental model, list exactly 5 other concepts/theorems that use the same model.
   - For each of the 5 items, include one sentence explaining the shared mechanism.
   - Prefer concrete named concepts/theorems, not broad subject names.

4. **Write markdown output**:
   - Save as `<topic_slug>_mental_models_map.md` in the current working directory.
   - Writing constraints for math-bearing topics:
     - Use LaTeX only when the target genuinely benefits from symbolic notation.
     - Keep prose, labels, and conditions outside equations whenever possible.
     - Prefer short symbolic derivations or identities over sentence-like display equations.
     - Use a conservative command set and make every delimiter or environment balance within a single math span.
     - Do not put math inside fenced code blocks.
   - Use this structure:

### Section 1 - Topic Snapshot

- **Target:** `<concept_or_theorem>`
- **Requested models:** `<requested_or_default>`
- **Final model count:** `<N>`
- **Summary:** 2-4 sentences on the dominant reasoning style in this topic.

### Section 2 - Mental Models Catalog

For each model, use:

```
### Model #N - <model name>

- **Compressed model:** <1-2 sentences>
- **How it appears in <target>:** <1-2 sentences>
- **Boundary / failure mode:** <1 sentence>
- **Other concepts/theorems using this model (5):**
1. <concept/theorem 1> - <shared mechanism>
2. <concept/theorem 2> - <shared mechanism>
3. <concept/theorem 3> - <shared mechanism>
4. <concept/theorem 4> - <shared mechanism>
5. <concept/theorem 5> - <shared mechanism>
- **Transfer takeaway:** <one sentence the learner can reuse>
```

### Section 3 - Reusable Playbook

- Provide 5-8 compact rules of thumb for spotting and applying these models in new problems.

5. **Quality rules**:
   - Total mental models is between 10 and 20 inclusive.
   - Every model has exactly 5 transfer items.
   - Keep model names and transfer examples non-generic and non-redundant.
   - Do not fabricate citations or pretend to quote source files.

6. **Verify before finishing**:
   - Run the deterministic Markdown-math verifier used by the `bottom-up` skill:
     - `python3 <repo_root>/.claude/skills/bottom-up/scripts/verify_markdown_math.py --strict-warnings <topic_slug>_mental_models_map.md`
   - If the verifier reports failures, fix only the flagged math passages and rerun until it passes.
   - No unclosed fenced code blocks.
   - No unclosed LaTeX delimiters.
   - No LaTeX math inside fenced code blocks.
   - Confirm model count is in `10..20`.
   - Confirm each model has exactly 5 transfer items.
   - Read the file and fix issues.

7. **Progress output**:
   - After saving, print:
     `Generated <N> mental models for <target>, each with 5 transfer concepts/theorems. Saved to <output_file>.`

8. **Follow-up suggestions**:
   - Print a short "What's next?" block with 2-3 commands using actual names from the generated file, for example:
     - `/survey list 20 results that share the "<model_name>" pattern`
     - `/theorem <theorem_from_transfer_list>`
     - `/concept <concept_from_transfer_list>`

## Example usage

```
/mental-models compactness
/mental-models Cauchy-Schwarz theorem
/mental-models spectral theorem with 15 models
```
