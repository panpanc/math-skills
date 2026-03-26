---
name: abstraction-levels
description: Explain a mathematical concept at multiple abstraction levels, from intuitive to formal and unifying views. Use when the user asks for "different levels of abstraction", "explain at multiple levels", "ladder of abstraction", or requests a top-mathematician style layered explanation.
---

Explain a math concept through a clear abstraction ladder so the same idea is seen from concrete intuition up to high-level structure.

This skill is dedicated to prompts like:
`You are a top mathematician. Can you explain the concept of <concept> in different levels of abstractions?`

## Instructions

1. **Parse arguments**: The concept is provided in `$ARGUMENTS`. The first non-file argument is the target concept. If any argument is a readable file path, read it as optional context.

2. **Adopt perspective**:
   - Write as a top mathematician who is also a patient teacher.
   - Prioritize conceptual clarity over jargon density.
   - Keep each level self-contained while preserving cross-level continuity.

3. **Choose an abstraction ladder**:
   - Choose a natural number of levels based on concept complexity, with **minimum 10 levels**.
   - Let this count be `N`, where `N >= 10`.

4. **Write the document** with the following required sections and order:

   ### 1. The Question
   Start with:
   `You are a top mathematician. Can you explain the concept of <concept> in different levels of abstractions?`
   Then give a 2-4 sentence preview of how the ladder will progress.

   ### 2. Concept Snapshot
   - One-sentence definition in plain language
   - Why this concept matters (2-3 sentences)
   - Name the running example

   ### 3. Abstraction Ladder (Levels 1-N, with N >= 10)
   For each level, include all of the following labeled parts:
   - **Core view:**
   - **Running example at this level:**
   - **One precise statement/formula:**
   - **What this level makes easy:**
   - **What this level hides:**
   - **Bridge upward:**

   ### 4. Translation Table Across Levels
   Include a compact table with one row per level and these columns:
   - `Level`
   - `How the concept is phrased`
   - `Typical objects`
   - `Main operation`
   - `Main risk/misconception`

   ### 5. Same Claim, Rephrased by Level
   Pick one representative claim/theorem and restate it once per level (from intuitive wording to formal abstract wording).

   ### 6. How to Climb the Ladder
   Give a concrete study path:
   - 3-6 prerequisite ideas
   - 3-6 "next questions" that move the reader up one level at a time
   - One warning about a common abstraction trap

6. **Writing constraints**:
   - Use LaTeX (`$...$`, `$$...$$`) for math.
   - Do not put math inside fenced code blocks.
   - LaTeX authoring constraints (to reduce renderer failures):
     - Prefer a single-line display equation whenever the derivation comfortably fits on one line; use `$$\begin{aligned}...\end{aligned}$$` only when multi-line alignment is genuinely necessary.
     - Keep prose and labels outside math whenever possible; let the surrounding sentence name the event, condition, or interpretation.
     - Use `\text{}` only for short connector words such as `and`, `if`, `for`, `where`, or `when`; do not hide multi-word labels or conditions inside equations.
     - Prefer `Factorization condition: $$f=u\circ q.$$` over `$$f \text{ factors through } q \Longleftrightarrow f=u\circ q.$$`
     - Prefer one symbolic derivation chain per display block; do not mix full English sentences into `$$...$$`.
     - If a display derivation has more than one equality, implication, or transformation step and spans multiple visual lines, wrap it in `$$\begin{aligned}...\end{aligned}$$` and align on `&=`, `&\to`, or a similar marker instead of relying on raw line breaks inside `$$...$$`.
     - Use a conservative command subset unless the document truly needs more: `\frac`, `\sqrt`, Greek letters, superscripts/subscripts, `\operatorname{Hom}`, `\operatorname{Im}`, simple matrix environments, and `\left...\right` only when needed.
     - Every `$`, `$$`, `\(`, `\)`, `\[`, `\]`, `\begin{...}`, `\end{...}`, `{`, `}`, `\left`, and `\right` must balance within the same math expression.
   - If diagrams are helpful, use Mermaid (ASCII-safe labels, one edge per line).
   - Avoid vague statements like "it generalizes things"; name what generalizes and how.
   - Every level must explicitly connect to the previous level.

7. **Naming**: Save the output as `<concept_slug>_abstraction_levels.md` in the current working directory.
   - Use lowercase snake_case.
   - Keep slug short (1-4 words when possible).

8. **Verification checklist**:
   - `N >= 10`.
   - Exactly one running example appears in all levels.
   - Every level includes all 6 required labeled parts.
   - Translation table has one row per level.
   - Section 5 contains one claim rewritten at each level.
   - Run deterministic Markdown-math verification:
     - `repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"`
     - `python3 "$repo_root/.claude/skills/bottom-up/scripts/verify_markdown_math.py" --strict-warnings "<concept_slug>_abstraction_levels.md"`
     - If this command reports failures, fix only the flagged math passages, usually by closing delimiters/environments or moving prose out of math, and rerun until it passes.
   - No unclosed fenced code blocks.
   - No math inside fenced code blocks.
   - Read and patch any unclear jump before finishing.

9. **Completion line**:
   Print:
   `Explained <concept> across <N> abstraction levels with one invariant running example.`

## Example usage

```
/abstraction-levels pushforward and pullback
/abstraction-levels spectral theorem
/abstraction-levels compactness in topology
/abstraction-levels Fourier transform
```
