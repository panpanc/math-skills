# Math Skills

A set of portable `SKILL.md` teaching workflows for math explanations, proofs, dependency maps, concept networks, generalization ladders, mental models, term history, and bottom-up courses. The same skill files are intended to work across Claude Code, Codex desktop / CLI, OpenCode, Cursor, Windsurf, and similar agent tools. See [WHY.md](WHY.md) for the rationale.

## Getting started

```bash
git clone https://github.com/panpanc/math-skills.git
cd math-skills
```

Invoke the skill that matches your task directly.

### Claude Code

Skills in `.claude/skills/` are auto-discovered as slash commands.

**Direct:** `/bottom-up spectral theorem`

### Codex desktop / CLI

Skills are discovered from `.agents/skills/`, which is symlinked to `.claude/skills/`.

**Direct:** `$generalization-ladder metric space`

### OpenCode

Reads `.claude/skills/` and this file (`AGENTS.md`) automatically.

**Direct:** `use the connect-concepts skill for compactness, continuity, and convergence`

### Cursor / Windsurf

Reads `AGENTS.md` as project context.

**Direct:** `use the course-bottom-up skill to teach me algebraic topology`

## Skill structure

Skills are organized by topic and output format:

| Category | Skills | Output |
|---|---|---|
| Learning motivation | `motivate-learning` | .md |
| Detailed explanation | `deep-explain` | .md |
| Theorem & proof | `theorem` | .md |
| Abstraction ladder | `abstraction-levels` | .md |
| Generalization ladder | `generalization-ladder` | .md |
| Concept connection mapping | `connect-concepts` | .md |
| Bottom-up foundations | `bottom-up` | .md |
| Bottom-up expansion | `bottom-up-expand` | .md |
| Reinvention from scratch | `reinvent-from-scratch` | .md |
| Term origins & etymology | `term-origins` | .md |
| Dependency mapping | `dependency-map` | .md/.html |
| Dependency map audit | `dependency-map-audit` | .md |
| Mental models (concept/theorem) | `mental-models` | .md |
| Mental models (math field) | `field-mental-models` | .md |
| Mental model adaptation in a field | `deep-dive-a-mental-model-in-a-field` | .md |
| Math prompts | `prompts` | .md |
| Multi-chapter course (bottom-up chapters) | `course-bottom-up` | .md folder |

See [QA.md](QA.md) for usage guide and workflows.

## Skills

Skills live as `SKILL.md` files in the following directories:

- `.claude/skills/` - primary location
- `.agents/skills/` - symlink for Codex compatibility

Each skill can be invoked directly, for example `/reinvent-from-scratch compactness --stages 10` or `$deep-dive-a-mental-model-in-a-field duality in functional analysis`.
