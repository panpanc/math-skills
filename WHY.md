# Why Math Skills?

## Bottom-up first: warm up before the hard part

The `bottom-up` skill captures one of the main ideas behind this repo: do not start with the scariest abstraction and hope the reader catches up. Start with a small set of familiar primitives from calculus and linear algebra, warm up the brain on those ingredients, and then build upward until the target concept feels earned instead of dropped from the sky.

That warm-up matters. A concept is much less intimidating when you have already touched the pieces it is made from, seen tiny numeric examples, and understood why each intermediate stage had to exist. Instead of confronting the final formal object cold, you arrive with momentum and with the feeling that the construction is solving a sequence of real problems.

This is one reason Math Skills is useful: it tries to reduce mathematical intimidation, not just increase explanation length.

## Math structure instead of generic chat

Each skill in this repo forces a particular mathematical teaching shape instead of hoping a model improvises one.

If you run `bottom-up`, you get a staged construction that starts from elementary ingredients and climbs toward the target concept with explicit motivation, examples, and dependency order. If you run `abstraction-levels`, you get a deliberate ladder with a running example, a translation table, and one claim restated across levels. If you run `theorem`, you get motivation, prerequisites, the crux, proof anatomy, failed attempts, hypothesis stress-tests, mental models, and a technique atlas. If you run `dependency-map`, you get a node inventory, edge ledger, layered order, bottlenecks, and an interactive graph instead of a vague study recommendation.

That matters because most math confusion is structural. The blocker is usually not "I need more words." It is "I need the right viewpoint, in the right order, with the hidden dependency made explicit."

## Audit-and-repair beats one-pass prose

Several of the current workflows are designed to write, inspect, and repair rather than stop after the first draft.

`bottom-up` generates a draft, audits it for skipped explanations and bumpy jumps, patches it, verifies it, and keeps only the final versioned file. `bottom-up-expand` does the same for one weak stage inside an existing document. `dependency-map` now runs an internal repair loop and regenerates the markdown and interactive HTML so the final artifacts stay aligned. `course-bottom-up` can audit and patch every chapter after generation.

That is a big upgrade over ordinary chat. The workflow assumes the first version may still hide undefined terms, missing bridges, or thin stages, and it tries to fix those issues before you study from the result.

## Deterministic checks make the outputs sturdier

The repo now ships helper scripts that check things the model is likely to get subtly wrong when left alone:

- section and stage depth
- markdown math balance
- Mermaid syntax
- dependency-map markdown and HTML structure

That does not make the outputs perfect, but it does make them more trustworthy than free-form chat replies that are never validated against any local rules.

## Better for proof learning

A lot of mathematical frustration comes from reading a proof that is correct but pedagogically opaque.

The `theorem` workflow is built around the questions learners actually get stuck on:

- What problem was this theorem solving?
- What is the one clever move doing the real work?
- Which natural attempts fail, and why?
- Why is each hypothesis load-bearing?
- Where else does this technique show up?

That shifts proof study away from memorizing the polished final argument and toward recognizing mechanism, technique choice, and proof shape.

## Better for long-form study, not just one-off answers

Math Skills is file-based. The outputs are markdown explanations, proof notes, dependency maps, HTML viewers, and course directories that survive the current session.

That changes the workflow. You can revisit a bottom-up build weeks later, compare a patched version with an earlier expansion, keep a growing examples folder, or assemble a whole topic as syllabus plus chapters instead of recreating context from scratch every time.

## The prompt generator adapts to the question bank you use

The `prompts` skill is not a static prompt catalog. It rereads the repo's `prompt_questions.md` on every run, or a file you explicitly provide, and infers archetypes from what is actually in that question bank.

So if the current question bank emphasizes duality, invariants, failure modes, abstraction shifts, or cross-field transfer, the generated prompts inherit those habits.

## Portable across agent tools

These workflows live as portable `SKILL.md` files. The repo is meant to work across Claude Code, Codex, OpenCode, Cursor, Windsurf, and similar environments.

That portability matters because the core value is not a single answer. It is the reusable teaching workflow encoded in the skill itself.
