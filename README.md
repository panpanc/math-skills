# Math Skills

Math Skills is a math-first set of portable `SKILL.md` teaching workflows. It is built for concepts, proofs, dependency structure, term history, bottom-up explanations, and course generation, with outputs that land as durable markdown or HTML artifacts instead of disappearing into chat scrollback.

The repo is designed to work across Claude Code, Codex desktop / CLI, Cursor, Windsurf, and similar agent tools. See [WHY.md](WHY.md) for the rationale behind the workflow.

## Getting started

```bash
git clone https://github.com/panpanc/math-skills.git
cd math-skills
```

Invoke the skill that matches the learning task.

### Claude Code

Skills in `.claude/skills/` are auto-discovered as slash commands.

**Examples:**
- `/bottom-up spectral theorem`
- `/motivate-learning spectral sequence`
- `/deep-explain why the definition of sheaf uses matching families`
- `/abstraction-levels pushforward and pullback`
- `/theorem Cauchy-Schwarz inequality`
- `/prompts Lie groups`

### Codex desktop / CLI

Skills are discovered from `.agents/skills/`, which is symlinked to `.claude/skills/`.

**Examples:**
- `$bottom-up spectral theorem`
- `$motivate-learning why learn adjunctions`
- `$deep-explain Yoneda lemma, explain every symbol`
- `$abstraction-levels observable in physics`
- `$dependency-map spectral theory in linear algebra`
- `$term-origins manifold`

### Cursor / Windsurf

These tools use `AGENTS.md` as project context.

**Example:** `use the bottom-up skill for the spectral theorem`

## Skill set

This repo currently documents the user-facing math skills below.

| Skill | Best for | Main output |
|---|---|---|
| `bottom-up` | Building a concept or theorem from ideas in calculus and linear algebra upward | `<topic>_bottom_up_vN.md` |
| `motivate-learning` | Connecting a new concept or theorem to prior project artifacts before studying it | `<topic>_learning_motivation.md` |
| `bottom-up-expand` | Repairing one weak stage or concept inside an existing document | `<source>_<target>_expanded_bottom_up.md` plus audit and `_vN.md` |
| `course-bottom-up` | Building a full multi-chapter bottom-up course | `<topic>_bottom_up_course/` |
| `deep-explain` | Explaining every symbol, construction choice, mental model, and likely confusion point | `<topic>_deep_explain.md` |
| `theorem` | Making a proof intelligible, not just correct | `<theorem>_proof.md` |
| `dependency-map` | Turning a topic or course into a prerequisite DAG and study plan | `<topic>_dependency_map.md` and `.html` |
| `mental-models` | Extracting reusable reasoning patterns from a topic | `<topic>_mental_models_map.md` |
| `field-mental-models` | Mapping the signature reasoning patterns of an entire math field | `<field>_field_mental_models_map.md` |
| `prompts` | Generating 10 target-specific prompts from a live question bank | `<topic>_prompts.md` |
| `term-origins` | Tracing how mathematical terms evolved historically and conceptually | `<term>_origin.md` or `<a>_<b>_origins.md` |
| `abstraction-levels` | Seeing one concept across concrete-to-abstract levels | `<topic>_abstraction_levels.md` |

See [QA.md](QA.md) for skill selection and workflow details.

## What is current in this repo

- `bottom-up` now runs a post-generation explanation audit, patches the result, and keeps only the final versioned file.
- `motivate-learning` scans existing project artifacts and writes a motivation brief that explains why a new concept or theorem is worth learning next.
- `dependency-map` now produces both a finalized markdown map and an interactive HTML viewer, then cleans temporary draft and audit artifacts.
- `course-bottom-up` is syllabus-first and supports `--syllabus-only`, `--skip-audit`, and `--keep-intermediates`.
- `deep-explain` focuses on symbol ledgers, construction motivation, mental models, and confusion clinics for first-time readers.
- `mental-models` enforces 10-20 models with exactly 5 transfer examples per model.
- `field-mental-models` maps a whole field's major reasoning patterns, labels each as native versus borrowed/adapted, and reuses the `bottom-up` markdown-math verifier.
- `prompts` reads `prompt_questions.md` fresh on every run. This repo includes a default question bank, and you can override it by passing a path explicitly or placing your own `prompt_questions.md` in the working directory.
- The repo ships deterministic helper scripts for depth checks, markdown-math checks, Mermaid validation, and dependency-map HTML generation.

## Why use it for math study?

- **Math structure is explicit.** The skills emphasize dependency order, proof anatomy, abstraction shifts, and bottlenecks rather than generic explanation.
- **Several workflows self-repair.** `bottom-up`, `bottom-up-expand`, `dependency-map`, and `course-bottom-up` are built around audit-and-patch loops instead of one-pass prose.
- **Outputs are reusable files.** You keep study artifacts as markdown and HTML, compare versions, and build a corpus over time.
- **The prompts come from a live question bank, not a canned list.** `prompts` derives new questions from the repo's default bank or your override file rather than a fixed baked-in catalog.
- **The workflows are portable.** The value lives in the `SKILL.md` workflows, not in one particular chat UI.

## Examples in `examples/`

These are real outputs currently checked into the repo.

| Example | Skill | Notes |
|---|---|---|
| [examples/density_operator_bottom_up.md](examples/density_operator_bottom_up.md) | `bottom-up` | A full bottom-up build of density operators; the content structure is current, though the filename predates the `_vN` convention |
| [examples/integration_by_parts_mental_models_map.md](examples/integration_by_parts_mental_models_map.md) | `mental-models` | Twelve mental models with transfer examples |
| [examples/spectral_theory_linear_algebra_dependency_map.html](examples/spectral_theory_linear_algebra_dependency_map.html) | `dependency-map` | Interactive companion graph for the same map |
| [examples/simplicial_homology_bottom_up_course/](examples/simplicial_homology_bottom_up_course/) | `course-bottom-up` | Full course folder with the syllabus and six bottom-up chapter files |

## Repo layout

- `.claude/skills/` contains the primary `SKILL.md` files.
- `.agents/skills/` is a symlink for Codex compatibility.
- `examples/` contains generated outputs that show the current skill structures; a few filenames predate the latest output naming conventions.
- Several skills include local `scripts/`, `assets/`, or `agents/` helpers that are part of the workflow and should be reused rather than reimplemented.

## Contributing

Contributions are welcome, especially for improving existing skills, adding new math-teaching workflows, and refreshing the examples in `examples/`.

- Update skill instructions in `.claude/skills/` when a workflow becomes clearer, more reliable, or more portable.
- Add or refresh examples when they help show the current output structure and teaching style of a skill.
- If a contribution changes behavior, outputs, or naming conventions, update the relevant docs in `README.md`, `QA.md`, and `WHY.md` so the repo stays internally consistent.

## Learn more

- [Q&A and workflow guide](QA.md)

## License

[MIT License](https://opensource.org/license/mit)
