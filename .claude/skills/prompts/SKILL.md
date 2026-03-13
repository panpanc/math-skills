---
name: prompts
description: Generate 10 new prompts for a math concept or theorem by reading the user's live prompt_questions.md at run time and remixing its question patterns into fresh, concept-specific prompts. Use when the user asks for prompt ideas, 10 new questions, or prompt variations for a math topic and wants them derived from their own prompt_questions.md rather than a fixed built-in catalog.
---

Generate exactly 10 new AI-ready prompts for a math concept or theorem by reading `prompt_questions.md` fresh on every invocation. Treat that file as the live question bank. Do not hardcode its questions into this skill, do not rely on memory from earlier turns, and do not copy its lines verbatim into the output.

## Instructions

1. **Parse arguments**:
   - Read the target math concept or theorem from `$ARGUMENTS`.
   - If any argument is a readable file path, treat it as optional background context.
   - If no target is identifiable, print:
     `No math concept or theorem found. Provide a target like "spectral theorem" or "Lie groups".`
     Then STOP.

2. **Resolve `prompt_questions.md` fresh every time**:
   - Check, in this order:
     - an explicit `prompt_questions.md` path provided in `$ARGUMENTS`
     - `./prompt_questions.md`
     - the repository root's `prompt_questions.md` if you can identify the repo root
   - Use the first readable match.
   - If no readable file exists, print:
     `Could not find prompt_questions.md. Add one to the working directory or pass its path explicitly.`
     Then STOP.
   - Read the file now, even if you already read it earlier in the same conversation.
   - Never substitute a remembered or previously summarized version of the file.

3. **Extract the live question bank**:
   - Collect the human-authored question lines from `prompt_questions.md`.
   - Ignore headings, blank lines, code fences, and purely decorative markdown.
   - Normalize obvious duplicates.
   - Treat the file as a bank of *question patterns*, not a catalog to copy.
   - Separate each seed question into:
     - the mathematical move it asks for
     - the tone/register of the question
     - any topic-specific nouns that should be replaced for the new target

4. **Infer prompt archetypes from the file itself**:
   - Derive the recurring prompt styles from the current contents of `prompt_questions.md`.
   - Examples of possible archetypes include abstraction ladder, duality, invariants, trade-offs, and cross-field transfer but do not force a static catalog if the file suggests a different set.
   - Prefer archetypes that appear multiple times or that seem especially fertile for the target concept/theorem.
   - If a seed question depends on source-specific objects that do not transfer well, replace them with target-appropriate objects or skip that seed.

5. **Generate exactly 10 new prompts**:
   - Every prompt must explicitly mention the target concept/theorem.
   - Every prompt must be genuinely new:
     - not copied verbatim from `prompt_questions.md`
     - not a trivial find-and-replace paraphrase
     - not a near-duplicate of another generated prompt
   - Use the live question bank as inspiration for the *kind* of question being asked, then specialize it to the target's actual structure, sub-results, examples, adjacent fields, and proof ideas.
   - Calibrate the prompt to the target:
     - broad theory -> allow prompts that ask for maps, taxonomies, learning paths, or 20-30 item lists
     - mid-sized concept -> prefer 10-20 item prompts
     - specific theorem/result -> prefer prompts about mechanism, proof structure, neighboring results, examples, counterexamples, and abstractions
   - Spread the 10 prompts across at least 4 distinct inferred archetypes when the source file supports that much variety.
   - If optional background files were provided, use them to name concrete sub-results, constructions, examples, or nearby concepts.

6. **Output format**:
   - Save to `<target_slug>_prompts.md` in the current working directory.
   - Use this structure:

### Section 1 - Source Snapshot

- **Target:** `<concept_or_theorem>`
- **Question bank:** `<resolved_path_to_prompt_questions.md>`
- **Seed questions read:** `<count>`
- **Inferred archetypes:** `<comma-separated list of 4-7 archetypes>`
- **Generation note:** 2-3 sentences on how the source file's live patterns shaped the output.

### Section 2 - 10 New Prompts

For each prompt, use:

```
#### Prompt #N - <short label>

> <full prompt ready to paste into an AI chat>

- **Inspired by:** <short description of the pattern(s) drawn from the live question bank>
- **Why this is useful for <target>:** <one sentence on the specific insight this prompt can unlock>
```

### Section 3 - Coverage Check

- List the archetypes covered by the 10 prompts.
- State briefly how the set balances intuition, structure, transfer, and strategy.

7. **Quality rules**:
   - Exactly 10 prompts, numbered in order.
   - Do not output generic fillers like `explain X`, `what is X`, or `give an overview of X`.
   - Do not quote or reproduce the source questions at length.
   - Every prompt must be strongly relevant to the target concept/theorem: it should hinge on the target's actual structures, mechanisms, examples, proof ideas, consequences, or neighboring results rather than merely swapping the target noun into a generic question template.
   - The wording should feel new while the *question-generating moves* clearly come from the live file.

8. **Verify before finishing**:
   - Re-read `prompt_questions.md` after drafting if needed to check that the generated prompts are not too close to the source wording.
   - Confirm there are exactly 10 prompts.
   - Confirm at least 4 distinct archetypes are represented when supported by the source file.
   - Confirm every prompt names the target concept/theorem explicitly.
   - Confirm each prompt would lose something essential if you replaced the target with an arbitrary different math topic; if it still reads as generic, rewrite it to anchor it in target-specific mathematical content.
   - Confirm no prompt is a near-copy of a source question.
   - Read the output file and fix issues.

9. **Progress output**:
   - After saving, print:
     `Generated 10 new prompts for <target> using live patterns from <resolved_prompt_questions_path>. Saved to <output_file>.`

10. **Follow-up suggestions**:
   - Print a short `What's next?` block with 2-3 concrete follow-ups using the generated prompts, for example:
     - `/term-origins <target>`
     - `/theorem <related theorem>`
     - `/mental-models <target>`

## Example usage

```text
/prompts Lie groups
/prompts the spectral theorem
/prompts limits and colimits in category theory
/prompts Galois theory
```
