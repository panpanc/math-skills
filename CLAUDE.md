# Math Skills

A set of Claude Code skills (SKILL.md format) that generate educational content — explanations, notebooks, courses, and LeetCode walkthroughs. Uses the cross-tool SKILL.md standard for portability across Claude Code, Cursor, Windsurf, and other agents. See [WHY.md](WHY.md) for why this beats asking ChatGPT.

## Skill structure

Skills are organized by topic and output format:

| Category | Skills | Output |
|---|---|---|
| Explanation | `explain` | .md |
| Epistemic exploration | `illuminate` | .md |
| Interactive notebook | `notebook-py`, `notebook-ts`, `notebook-deep-py` | .ipynb |
| Multi-chapter course | `course-notebook-py` | .ipynb |
| Multi-chapter course | `course-markdown` | .md |
| Multi-chapter course (bottom-up chapters) | `course-bottom-up` | .md |
| LeetCode | `leetcode-notebook-py`, `leetcode-notebook-ts` | .ipynb |
| Follow-up | `explore` | .ipynb/.md |
| Abstraction ladder | `abstraction-levels` | .md |
| Mental models (math field) | `field-mental-models` | .md |

See [QA.md](QA.md) for usage guide and workflows.

## Skills

All skills live in `.claude/skills/` as SKILL.md files. Each skill can be invoked directly (e.g., `/explain binary search`).
