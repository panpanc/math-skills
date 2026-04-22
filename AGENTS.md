# Math Skills

A set of agent skills (SKILL.md format) that generate educational content — explanations, notebooks, courses, and LeetCode walkthroughs. Uses the cross-tool SKILL.md standard for portability across Claude Code, Codex CLI, OpenCode, Cursor, Windsurf, and other agents. See [WHY.md](WHY.md) for why this beats asking ChatGPT.

## Getting started

```bash
git clone https://github.com/panpanc/math-skills.git
cd math-skills  
```

Invoke the skill that matches your task directly.

### Claude Code

Skills in `.claude/skills/` are auto-discovered as slash commands.

**Direct:** `/explain binary search`

### Codex desktop / CLI

Skills are discovered from `.agents/skills/` (symlinked to `.claude/skills/`).

**Direct:** `$notebook-py gradient descent`

### OpenCode

Reads `.claude/skills/` and this file (`AGENTS.md`) automatically.

**Direct:** `use the leetcode-notebook-py skill for two sum`

### Cursor / Windsurf

Reads `AGENTS.md` as project context.

**Direct:** `use the course-notebook-py skill to teach me about transformers`

## Skill structure

Skills are organized by topic and output format:

| Category | Skills | Output |
|---|---|---|
| Explanation | `explain` | .md |
| Learning motivation | `motivate-learning` | .md |
| Detailed explanation | `deep-explain` | .md |
| Math concept (deep) | `concept` | .md |
| General math Q&A | `general` | .md |
| Theorem & proof | `theorem` | .md |
| Epistemic exploration | `illuminate` | .md |
| Math synthesis question | `survey` | .md |
| Math prompts | `prompts` | .md |
| Abstraction ladder | `abstraction-levels` | .md |
| Bottom-up foundations | `bottom-up` | .md |
| Term origins & etymology | `term-origins` | .md |
| Dependency mapping | `dependency-map` | .md |
| Dependency map audit | `dependency-map-audit` | .md |
| Mental models (concept/theorem) | `mental-models` | .md |
| Mental models extraction | `mental-models-extract` | .md |
| Map-scoped course | `course-from-map` | .md |
| Interactive notebook | `notebook-py`, `notebook-ts`, `notebook-deep-py` | .ipynb |
| Multi-chapter course | `course-notebook-py` | .ipynb |
| Multi-chapter course | `course-markdown` | .md |
| Multi-chapter course (bottom-up chapters) | `course-bottom-up` | .md |
| LeetCode | `leetcode-notebook-py`, `leetcode-notebook-ts` | .ipynb |
| Follow-up | `explore` | .ipynb/.md |

See [QA.md](QA.md) for usage guide and workflows.

## Skills

Skills live as SKILL.md files in the following directories (all equivalent via symlink):

- `.claude/skills/` — primary location
- `.agents/skills/` — symlink, for Codex CLI compatibility

Each skill can be invoked directly (e.g., `/explain binary search`).
