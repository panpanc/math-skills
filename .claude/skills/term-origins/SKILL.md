---
name: term-origins
description: Explain the origin, etymology, historical timeline, and abstraction evolution of mathematical terms
---

Explain where a mathematical term comes from, how its meaning changed over time, and how it climbed from concrete usage to abstract structure.

## Perspective

Write as a historian-mathematician who treats terminology as compressed theory. You value:
- Etymology as a clue to original intuition
- Timeline as evidence (who, when, where, why)
- Abstraction shifts as the core intellectual story
- Distinguishing true historical lineage from textbook myth

## Instructions

1. **Parse arguments**: The user provides one or more terms as: $ARGUMENTS. Examples: `"manifold"`, `"group and ring"`, `"normal cone"`, `"my_notes.md sigma-algebra"`.
   - If any argument is an existing file path, read it as background context.
   - Parse up to 5 terms from separators like commas, `and`, or `vs`.

2. **Read source document** (if provided): Use the file as context and extend it. Do not repeat it.

3. **Write an opening section** titled `## Scope`:
   - List the term(s) being analyzed
   - State the main historical question for each term in one sentence
   - Preview the output structure so the reader knows what is coming

4. **For each term, create a section** `## <Term>` with these required subsections, in order:

   ### 1) Sense Map (Polysemy Split)
   - If the term has multiple meanings across fields/eras, list each sense first (short bullets)
   - For each sense: field/era + one-line meaning
   - If there is only one dominant sense, state that explicitly

   ### 2) Current Mathematical Meaning
   - Give a precise modern meaning in 1-3 sentences
   - If helpful, include a compact formal statement in LaTeX

   ### 3) Etymology
   - Root language(s), root word(s), and literal meaning
   - Early non-mathematical usage (if relevant)
   - Explain how the literal meaning maps (or fails to map) to modern mathematical meaning

   ### 4) Entry Into Mathematics & Historical Dates
   - Earliest known mathematical usage (era, mathematician, and context)
   - What problem this term was introduced to solve
   - Any competing early terminology and why this term won
   - Distinguish explicitly:
     - **First coined/attested term**
     - **First formal mathematical definition**
     - **Modern standardization** (textbook/community consolidation)
   - If a date is uncertain, mark it and explain the uncertainty

   ### 5) Primary Text Snapshot
   - Include one short primary-source quote or close paraphrase
   - Explain what that usage meant *then* and how it differs from today's usage

   ### 6) Development Timeline
   - Provide a chronological milestone list with dates/eras
   - Include one Mermaid timeline/graph that shows at least 4 milestones from origin to modern usage
   - If parallel schools/lineages exist, use Mermaid branching to show them explicitly
   - For each milestone: what changed in meaning, scope, or rigor

   ### 7) Notation Evolution
   - Track major notation/symbol changes over time
   - Explain why each shift improved (or complicated) rigor, pedagogy, or abstraction
   - Include at least one older-vs-modern notation comparison line

   ### 8) Abstraction Ladder
   - Reconstruct the abstraction climb in 4 levels:
     - **Level A (Concrete origin)**: operational or geometric starting intuition
     - **Level B (Formalization)**: explicit definitions and early theorem use
     - **Level C (Structural generalization)**: broader context (algebraic/topological/analytic)
     - **Level D (Modern abstract framing)**: categorical, functorial, or high-level unification when relevant
   - Include one tiny worked example at each level
   - Explicitly state what was gained and what was lost at each step

   ### 9) Terminology Drift and Cross-Language Variants
   - Name at least 2 terminology shifts, translation differences, or notation divergences across schools/languages
   - Include a compact cross-language variants table (e.g., Latin/Greek/French/German/English where relevant)
   - Explain practical consequences for modern learners reading older texts

   ### 10) Myths, Misreadings, and False Friends
   - Give 2-4 common misunderstandings caused by the term's wording, including false etymologies
   - For each: wrong intuition, why it sounds plausible, and correction

   ### 11) Adjacent Terms and Concept Network
   - List 4-8 adjacent terms and the relationship type (`prerequisite`, `generalization`, `specialization`, `dual`, `historical predecessor`, `terminological cousin`)
   - Include a Mermaid relationship graph

   ### 12) Evidence and Confidence Ledger
   - For each major historical claim, include:
     - **Provenance**: `primary`, `secondary`, or `uncertain`
     - **Confidence**: `high`, `medium`, or `low`
     - A short citation line or source pointer when available

5. **Multi-term synthesis**:
   - If the user gave 2+ terms, add `## Cross-Term Synthesis` with:
     - Shared linguistic pattern
     - Shared abstraction pattern
     - One key difference in development path
     - A short comparative table

6. **Write a closing section** titled `## Why Names Matter`:
   - 4-6 bullet takeaways on how etymology helps (and sometimes misleads) mathematical understanding
   - 2-3 exercises:
     - One etymology-focused
     - One timeline-focused
     - One abstraction-focused

7. **Writing style**:
   - Use clear prose and concrete historical framing
   - Use LaTeX (`$...$`, `$$...$$`) for formal math only
   - Reserve fenced code blocks for Mermaid diagrams, ASCII fallback diagrams, and compact tables/traces
   - Prefer Mermaid fenced blocks (language tag `mermaid`) for timeline and concept-network diagrams
   - Use `> **Gain:**` and `> **Loss:**` callouts in the Abstraction Ladder subsection
   - Mark uncertain historical details explicitly as uncertain rather than inventing precision
   - Do not fabricate citations; when unknown, label as `uncertain` with a brief note
   - Keep provenance and confidence labels compact and consistent across terms

8. **Naming**:
   - Save as `<term_slug>_origin.md` for one term
   - Save as `<term1>_<term2>_origins.md` for two terms (trim to concise slugs)

9. **Verify**:
   a. `## Scope` and `## Why Names Matter` exist
   b. Every term section has all 12 required subsections
   c. Three-date discipline appears in subsection 4 for each term (coined, formalized, standardized)
   d. Each term includes at least one Mermaid timeline/graph and one Mermaid concept network
   e. Timeline uses branching Mermaid when parallel historical lineages exist
   f. Abstraction Ladder includes a worked mini-example at each level
   g. Cross-language variants table is present in subsection 9
   h. Evidence and Confidence Ledger includes provenance + confidence tags for major historical claims
   i. No unclosed fenced code blocks
   j. No unclosed LaTeX delimiters
   k. No LaTeX math inside fenced code blocks
   l. Multiline display math uses `\\begin{aligned}...\\end{aligned}` with `\\\\` line breaks
   m. Read the file and fix issues found

10. **Progress output**:
    `Generated term-origin analysis for <term(s)> covering etymology, timeline, and abstraction evolution`

11. **Follow-up suggestions**:

    > **What's next?**
    > - Go deeper on one term: `/concept <term from this file>`
    > - Trace a related theorem: `/theorem <theorem linked to a timeline milestone>`
    > - Expand the historical network: `/survey list 15 terms historically connected to <term>`

    Use the actual generated filename and items from it.

## Example usage

```
/term-origins manifold
/term-origins group and ring
/term-origins normal cone
/term-origins my_notes.md sigma-algebra
```
