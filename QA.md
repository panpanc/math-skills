# Math Skills Q&A

## What skills are available?

| Skill | Output | What it does |
|---|---|---|
| `bottom-up` | `<topic>_bottom_up_vN.md` | Builds a concept or theorem upward from calculus and linear algebra, audits it, patches it, and keeps the final version |
| `motivate-learning` | `<topic>_learning_motivation.md` | Scans project artifacts and explains why a new concept or theorem is worth learning next |
| `bottom-up-expand` | `<source>_<target>_expanded_bottom_up.md` and `_vN.md` | Rebuilds one weak stage or concept inside an existing document without editing the source |
| `course-bottom-up` | `<topic>_bottom_up_course/` | Creates a syllabus-first multi-chapter course whose chapters follow the bottom-up pattern |
| `deep-explain` | `<topic>_deep_explain.md` | Explains a concept or theorem symbol by symbol, with construction motivation, mental models, examples, non-examples, and confusion repair |
| `theorem` | `<theorem>_proof.md` | Dissects a theorem and its proof across motivation, crux, walkthrough, failed attempts, and transfer techniques |
| `dependency-map` | `<topic>_dependency_map.md` and `.html` | Produces a prerequisite DAG, layered order, bottlenecks, minimal paths, and an interactive graph viewer |
| `mental-models` | `<topic>_mental_models_map.md` | Lists 10-20 mental models with exactly 5 transfer examples per model |
| `field-mental-models` | `<field>_field_mental_models_map.md` | Lists the major mental models of a math field, labels each as native or borrowed, and gives in-field plus cross-field examples |
| `prompts` | `<topic>_prompts.md` | Generates exactly 10 new prompts for a topic using a live `prompt_questions.md` bank |
| `term-origins` | `<term>_origin.md` or `<a>_<b>_origins.md` | Tracks etymology, historical dates, abstraction drift, and cross-language terminology |
| `abstraction-levels` | `<topic>_abstraction_levels.md` | Explains one concept across at least 10 abstraction levels with a running example |

## Which skill should I choose?

| If you want... | Use |
|---|---|
| A concept rebuilt as an invention from basics | `bottom-up` |
| Motivation for why a new topic matters given your existing notes | `motivate-learning` |
| Every symbol, construction choice, and confusing step explained in detail | `deep-explain` |
| The same idea translated from intuition to formalism to high abstraction | `abstraction-levels` |
| One confusing stage in an existing document rebuilt carefully | `bottom-up-expand` |
| A theorem explained so the clever move finally makes sense | `theorem` |
| A whole study sequence instead of one artifact | `course-bottom-up` |
| A study-order graph for a topic or course | `dependency-map` |
| Transferable reasoning patterns behind a topic | `mental-models` |
| The signature reasoning habits of an entire field | `field-mental-models` |
| Ten fresh topic-specific prompts derived from a live question bank | `prompts` |
| Why a term is named the way it is and how its meaning changed | `term-origins` |

## What is the difference between `bottom-up`, `deep-explain`, `abstraction-levels`, and `theorem`?

`bottom-up` is about construction. It starts from elementary building blocks, climbs in strict dependency order, and tries to make the target feel invented rather than announced.

`deep-explain` is about clarity under a microscope. It decodes notation, motivates each construction choice, slows down confusing proof or definition steps, and adds a symbol ledger, non-examples, mental models, and a confusion clinic.

`abstraction-levels` keeps the concept fixed and changes the register. It is about translation: concrete view, formal view, structural view, and so on.

`theorem` assumes the theorem is already in view and focuses on why the proof works: the crux, proof anatomy, failed attempts, load-bearing hypotheses, and reusable techniques.

## What does `prompts` need?

`prompts` uses a live `prompt_questions.md` question bank. This repo ships a default one at the repository root, and you can override it with your own file when you want a different prompt style.

The skill resolves the file in this order:

1. An explicit `prompt_questions.md` path passed in the command
2. `./prompt_questions.md`
3. The repository root's `prompt_questions.md`

In a normal clone of this repo, step 3 already exists. If you remove it and do not provide an override, the skill stops and asks for one.

## Can I point these skills at existing files?

Yes. Several skills are designed to read existing material.

- `bottom-up` can take a context file alongside the target concept or theorem.
- `motivate-learning` can take context files or directories and prioritizes them when connecting the new target to prior study.
- `bottom-up-expand` requires an existing markdown source file and never edits it.
- `deep-explain` can take a notes file alongside the target and use it as source context.
- `theorem` can read a proof or notes file and dissect that text.
- `dependency-map` can read a course directory, syllabus, chapter set, or notes files.
- `term-origins` can use a notes file as background context for one or more terms.
- `prompts` can read optional context files in addition to the prompt bank and target topic.

Examples:

```text
/bottom-up my_notes.md divergence theorem
/motivate-learning my_notes.md spectral sequence
/bottom-up-expand stage 4 spectral_theorem_notes.md
/deep-explain my_notes.md tensor product of modules
/theorem my_proof_notes.md Hahn-Banach theorem
/dependency-map my_course/
/term-origins my_notes.md sigma-algebra
/prompts Lie groups
```

## What files does each skill create?

| Skill | Filename pattern |
|---|---|
| `bottom-up` | Final retained file: `<topic_slug>_bottom_up_vN.md` |
| `motivate-learning` | `<topic_slug>_learning_motivation.md` |
| `bottom-up-expand` | `<source_stem>_<target_slug>_expanded_bottom_up.md`, audit report, and `<...>_vN.md` |
| `course-bottom-up` | `<topic_slug>_bottom_up_course/` with `00_syllabus.md` and chapter files |
| `deep-explain` | `<topic_slug>_deep_explain.md` |
| `theorem` | `<theorem_slug>_proof.md` |
| `dependency-map` | `<topic_slug>_dependency_map.md` and `<topic_slug>_dependency_map.html` |
| `mental-models` | `<topic_slug>_mental_models_map.md` |
| `field-mental-models` | `<field_slug>_field_mental_models_map.md` |
| `prompts` | `<topic_slug>_prompts.md` |
| `term-origins` | `<term_slug>_origin.md` or `<term1>_<term2>_origins.md` |
| `abstraction-levels` | `<topic_slug>_abstraction_levels.md` |

## Does `bottom-up` keep intermediate files?

No. The current workflow writes a draft and audit report temporarily, patches the document, verifies the final result, then deletes the temporary files. The intended retained artifact is the final versioned file, `<topic>_bottom_up_vN.md`.

## Does `bottom-up-expand` behave the same way?

Not exactly. `bottom-up-expand` is intentionally less destructive with intermediates. It preserves:

- The original expansion document
- The audit report
- The patched versioned file

That makes it easier to compare the expanded draft with the patched result while leaving the original source document untouched.

## How does `dependency-map` work now?

The current workflow is more than a markdown outline generator.

It now:

1. Builds a node inventory and edge ledger
2. Produces a layered learning order and bottleneck analysis
3. Generates an interactive HTML graph viewer
4. Runs an internal audit-and-repair loop
5. Regenerates derived sections and HTML if repairs are applied
6. Deletes temporary draft and audit artifacts before finishing

The normal user-facing outputs are just the final `.md` and `.html`.

## Does `course-bottom-up` generate chapters immediately?

It is syllabus-first by design.

The skill:

1. Creates `00_syllabus.md`
2. Summarizes the proposed course
3. Waits for confirmation before chapter generation
4. Writes chapter files in bottom-up style
5. Audits and patches chapters unless `--skip-audit` is used

Useful flags:

- `--syllabus-only` stops after writing the syllabus
- `--skip-audit` skips the chapter audit-and-patch pass
- `--keep-intermediates` keeps audit sidecars and optional pre-patch backups

## What workflows fit together well?

### Concept workflow

```text
/bottom-up pushforward and pullback
/deep-explain why pullbacks use a universal property
/abstraction-levels pushforward and pullback
/mental-models pushforward and pullback
/field-mental-models differential geometry
/term-origins manifold
```

This is a good path when you want the same topic as abstraction ladder, staged construction, transferable reasoning pattern, and terminology history.

### Proof workflow

```text
/theorem spectral theorem
/bottom-up-expand stage 5 spectral_theorem_proof.md
```

This works well when a proof is globally understandable but one step still feels like a leap.

### Course workflow

```text
/dependency-map algebraic topology
/course-bottom-up algebraic topology
```

This is the best fit when study order matters and you want the map before the chapters.

## Are there built-in verification checks?

Yes. The repo now includes deterministic helper scripts used by the skills themselves.

- `bottom-up` and `course-bottom-up` use depth checks to catch thin sections or stages.
- `bottom-up`, `deep-explain`, and `mental-models` use the markdown-math verifier.
- `field-mental-models` reuses the same markdown-math verifier from `bottom-up`.
- `motivate-learning` uses the same markdown-math verifier from `bottom-up`.
- `bottom-up`, `deep-explain`, `theorem`, and course chapters can use Mermaid verification.
- `dependency-map` uses dedicated markdown and HTML structure checks.

These checks are part of the workflow, not just documentation.

## Can I use this outside Claude Code?

Yes.

| Tool | How it reads the repo |
|---|---|
| Claude Code | Auto-discovers `.claude/skills/` |
| Codex desktop / CLI | Reads `.agents/skills/` and `AGENTS.md` |
| OpenCode | Reads `.claude/skills/` and `AGENTS.md` |
| Cursor / Windsurf | Uses `AGENTS.md` as project instructions |

## Are there example outputs in the repo?

Yes. The `examples/` directory currently includes:

- `density_operator_bottom_up.md` (content matches the current workflow, though the filename predates the `_vN` convention)
- `integration_by_parts_mental_models_map.md`
- `spectral_theory_linear_algebra_dependency_map.md`
- `spectral_theory_linear_algebra_dependency_map.html`
- `simplicial_homology_bottom_up_course/`

Those examples reflect the current workflow structure much better than the older deleted root-level artifacts, though a few filenames predate the latest naming conventions.
