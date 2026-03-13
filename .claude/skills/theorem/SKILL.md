---
name: theorem
description: Dissect a theorem and its proof — motivation, origin, prerequisites, intuition, techniques, mental models, and generalizations
---

Dissect a theorem and its proof in depth. Generate a markdown document that makes the proof fully intelligible: not just what the steps are, but why they work, what mental models unlock them, and how the techniques recur across mathematics.

## Perspective

Write as a mathematician-educator who believes a proof is only understood when you could have discovered it yourself. You value:
- The "why it must be true" feeling before the formal argument
- Naming the crux — the single clever step that does the real work
- Showing what fails without that step
- Connecting techniques to their broader lives across mathematics

## Instructions

1. **Parse arguments**: The user provides a theorem (and optional source document) as: $ARGUMENTS. For example: `"Cantor's diagonal argument"`, `"the pumping lemma for regular languages"`, `"Cauchy-Schwarz inequality"`. If any argument matches an existing file path, read it as the source document (a proof text or notes to dissect).

2. **Read source document** (if provided): Read the file and use it as the primary proof text. Dissect it rather than restate it — annotate, interrogate, and illuminate it.

3. **Write the document** with these 15 mandatory sections:

   ### 1. Theorem Statement
   State the theorem cleanly and precisely in both formal notation and plain English. If there are multiple equivalent formulations, show the most illuminating one alongside the standard one.

   ### 2. Motivation
   - What problem does this theorem solve? What question does it answer?
   - Why did mathematicians care about it? What broke without it?
   - What becomes possible *because* of this theorem? Name downstream results it enables.
   - Rate the theorem's reach: local result, foundational lemma, or paradigm-shifting?

   ### 3. Origin
   - Who proved it, when, and in what context?
   - What was the state of the field before it was proved? Why was it hard?
   - Were there failed attempts, near-misses, or partial results first?
   - Any surprising or counterintuitive aspects of the history?

   ### 4. Prerequisites
   List everything the reader must have a **solid** (not just passing) understanding of before this proof makes sense. For each:
   - **Concept**: name and one-line description
   - **Why it's load-bearing**: exactly where in the proof it appears
   - **Gauge question**: one question the reader should be able to answer to confirm they're ready

   Format as a checklist. Be honest — if the proof requires real analysis fluency, say so.

   ### 5. Intuition
   Give the conceptual "why it must be true" *before* any formal argument:
   - Geometric, visual, or physical intuitions (use Mermaid diagrams where helpful; ASCII only as fallback)
   - Analogies and "think of it like..." explanations
   - The informal argument a mathematician might sketch on a napkin
   - The feeling of inevitability — why, once you see it, the result seems obvious

   > **Goal:** After reading this section, the reader should feel the theorem is *plausible*, even without seeing the proof.

   ### 6. The One-Sentence Insight
   Distill the entire proof into a single sentence capturing the crux — the one idea that does the real work. Everything else is scaffolding around this.

   Use this format:
   > **Crux:** [The proof works because ___.]

   ### 7. Proof Anatomy
   Show the high-level skeleton of the proof before the details. Use a Mermaid flow diagram or numbered outline:

   ```
   Step 1: Setup / establish notation
   Step 2: Key lemma — [name the lemma]
   Step 3: Main argument — [name the technique]
   Step 4: Derive contradiction / construct object / bound expression
   Step 5: Conclude
   ```

   Annotate each step with *one phrase* saying what it accomplishes (not how).

   ### 8. Technique Inventory
   List every major proof technique or concept deployed in the proof. For each:
   - **Technique**: name (e.g., diagonalization, pigeonhole, compactness, induction on structure)
   - **Role**: what job it does in this specific proof
   - **Why this technique**: why not a simpler or more direct approach? What does this technique enable that alternatives don't?
   - **Where it enters**: which step of the proof anatomy

   ### 9. Proof Walkthrough
   Walk through the proof step by step with full annotations. For each non-trivial step:
   - State the step clearly in math
   - Explain *why* this step is taken (not just what it does)
   - Flag any steps where a reader might get lost and explain them more carefully
   - Use `> **Why this works:**` blockquotes for the non-obvious moves

   Use LaTeX (`$...$` inline, `$$...$$` display) for all math. Never put math inside fenced code blocks.

   ### 10. Failed Attempts
   Show 1–3 naive or natural approaches that don't work, and explain precisely where and why they fail. This reveals what the actual proof is solving.

   For each failed attempt:
   - What approach seems natural?
   - Where does it break down?
   - What does this failure tell us about why the real proof needs its clever step?

   ### 11. Hypothesis Stress-Test
   For each hypothesis in the theorem, remove it and show:
   - A concrete counterexample (the theorem fails)
   - What the counterexample reveals about why that condition is load-bearing

   This answers: "What is each hypothesis *for*?"

   ### 12. Mental Models
   Identify 3–5 named mental models that compress understanding of this theorem or its proof. For each:
   - **Name**: a memorable handle
   - **The model**: the analogy, image, or compressed idea
   - **What it explains**: what part of the theorem it makes intuitive
   - **Where it breaks down**: every model has limits — name them

   ### 13. Technique Atlas
   For each technique from the Technique Inventory, show where it appears elsewhere in mathematics:
   - 3–5 other theorems or proofs that use the same technique
   - What these share in common structurally (the abstract pattern)
   - A brief "when to reach for this technique" heuristic

   > **Goal:** After reading this section, the reader should recognize the technique as a *recurring tool*, not a one-off trick.

   ### 14. Generalization Ladder
   Show the theorem's place in a hierarchy of related results:

   ```
   Simpler special case → This theorem → Direct generalization → Abstract version
   ```

   For each rung: state the result, what changes from the previous rung, and what the generalization costs (in assumptions, complexity, or proof difficulty).

   ### 15. Active Reconstruction
   Give the reader a way to test whether the mental model stuck:
   - A stripped version of the proof with 2–3 key steps blanked out — ask the reader to fill them in
   - 1–2 exercises: prove a simpler analogous result using the same technique, or apply the theorem to a non-trivial case
   - One open question: a natural "what if...?" that the reader can explore using the ideas from this proof

4. **Writing style**:
   - Use clear prose — explain like teaching a graduate student who is smart but hasn't seen this proof
   - Always explain *why* before *what* — the reasoning behind every move
   - Use LaTeX (`$...$` / `$$...$$`) for all math — never inside fenced code blocks
   - Reserve fenced code blocks for Mermaid diagrams, ASCII fallback diagrams, proof skeletons, and step-by-step traces
   - Mermaid authoring constraints (to prevent parse failures):
     - Use simple node IDs only (`A`, `step_2`, `lemma3`) and keep punctuation in labels, not IDs.
     - Always use quoted labels (for example: `A["Codimension-2 face appears twice"]`), not bare bracket labels.
     - Keep one edge per line.
     - If you use `subgraph`, include a matching `end` for every `subgraph`.
     - Prefer ASCII-safe label text in Mermaid blocks.
   - Use `> **Crux:**` for the key insight, `> **Why this works:**` for non-obvious steps, `> **Caution:**` for common mistakes
   - Prefer concrete small examples over abstract generality where both are available

5. **Naming**: Save the document in the current working directory as `<theorem_slug>_proof.md` (e.g., `cantor_diagonal_proof.md`, `cauchy_schwarz_proof.md`).

6. **Verify**: After writing, check for:
   a. All 15 sections are present and non-empty
   b. No unclosed fenced code blocks (every ``` has a matching close)
   c. No unclosed LaTeX delimiters (every `$` or `$$` has a matching close)
   d. No LaTeX math inside fenced code blocks — move any found to surrounding prose
   e. The Crux (section 6) is a single sentence
   f. Prerequisites (section 4) includes gauge questions for each item
   g. Hypothesis Stress-Test (section 11) has a counterexample for every hypothesis
   h. If the document contains Mermaid blocks, run deterministic Mermaid verification:
      - `repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"`
      - `node "$repo_root/.claude/skills/bottom-up/scripts/verify_mermaid_blocks.js" "<theorem_slug>_proof.md"`
      - If this command reports errors, fix Mermaid blocks and rerun until pass.
   i. Read the file and fix any issues found.

7. **Progress**: After completing the file, print a brief summary:
   `Dissected <theorem> across 15 sections: Statement → Motivation → Origin → Prerequisites → ... → Active Reconstruction`

8. **Follow-up suggestions**: After saving, print a "What's next?" block:

   > **What's next?**
   > - Explore a technique deeper: `/explore <filename> <technique> deeper`
   > - Illuminate the field this lives in: `/illuminate <field or concept from section 13>`
   > - Dissect a generalization: `/theorem <theorem from the Generalization Ladder>`

   Use the actual generated filename and pick items from the document.

## Example usage

```
/theorem Cantor's diagonal argument
/theorem Euclid's proof of infinite primes
/theorem the pumping lemma for regular languages
/theorem Cauchy-Schwarz inequality
/theorem Gödel's first incompleteness theorem
/theorem the fundamental theorem of calculus
/theorem my_proof_notes.md Zorn's lemma
```
