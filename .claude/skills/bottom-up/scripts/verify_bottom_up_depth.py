#!/usr/bin/env python3
"""Verify structural and artifact-based depth constraints for bottom-up outputs."""

from __future__ import annotations

import argparse
import pathlib
import re
import sys
from dataclasses import dataclass


EXPECTED_SECTIONS = [
    (1, "Destination and Why It Matters"),
    (2, "Foundation Layer"),
    (3, "Bottom-Up Thinking Stages"),
    (4, "Assembly Snapshot"),
    (5, "Final Concept/Theorem Statement"),
    (6, "How the Thinking Process Could Have Invented It"),
    (7, "Downstream Growth from the Same Elementary Ideas"),
]

STAGE_LABELS = [
    "Motivation",
    "Intuition",
    "Construction step",
    "Worked example",
    "What this unlocks next",
]

SECTION_HEADING_RE = re.compile(r"^##\s+(\d+)\.\s+(.+?)\s*$", re.MULTILINE)
PRIMITIVE_RE = re.compile(r"^###\s+Primitive\s+\d+\s*[:\-]\s+.+$", re.MULTILINE)
STAGE_RE = re.compile(r"^###\s+Stage\s+\d+\s*[:\-]\s+.+$", re.MULTILINE)


@dataclass
class Section:
    number: int
    title: str
    body: str


def normalize_title(title: str) -> str:
    return re.sub(r"\s+", " ", title.strip().lower())


def split_sections(text: str) -> list[Section]:
    matches = list(SECTION_HEADING_RE.finditer(text))
    sections: list[Section] = []
    for idx, match in enumerate(matches):
        start = match.end()
        end = matches[idx + 1].start() if idx + 1 < len(matches) else len(text)
        sections.append(
            Section(
                number=int(match.group(1)),
                title=match.group(2).strip(),
                body=text[start:end].strip(),
            )
        )
    return sections


def split_blocks(text: str, heading_re: re.Pattern[str]) -> list[str]:
    matches = list(heading_re.finditer(text))
    blocks: list[str] = []
    for idx, match in enumerate(matches):
        start = match.start()
        end = matches[idx + 1].start() if idx + 1 < len(matches) else len(text)
        blocks.append(text[start:end].strip())
    return blocks


def find_section(sections: list[Section], number: int) -> Section | None:
    for section in sections:
        if section.number == number:
            return section
    return None


def extract_stage_subsections(stage_block: str) -> tuple[dict[str, str], list[str]]:
    errors: list[str] = []
    found: dict[str, tuple[int, int]] = {}

    for label in STAGE_LABELS:
        match = re.search(rf"\*\*{re.escape(label)}\*\*\s*:\s*", stage_block, re.IGNORECASE)
        if not match:
            errors.append(f"missing label '**{label}**:'")
            continue
        found[label] = (match.start(), match.end())

    if errors:
        return {}, errors

    ordered = sorted(found.items(), key=lambda kv: kv[1][0])
    if [label for label, _ in ordered] != STAGE_LABELS:
        errors.append(
            "stage labels must appear in order: "
            + " -> ".join([f"**{label}**" for label in STAGE_LABELS])
        )
        return {}, errors

    content: dict[str, str] = {}
    for idx, label in enumerate(STAGE_LABELS):
        body_start = found[label][1]
        body_end = found[STAGE_LABELS[idx + 1]][0] if idx + 1 < len(STAGE_LABELS) else len(stage_block)
        content[label] = stage_block[body_start:body_end].strip()
    return content, errors


def verify(path: pathlib.Path, text: str) -> list[str]:
    errors: list[str] = []
    sections = split_sections(text)

    if len(sections) < len(EXPECTED_SECTIONS):
        errors.append("missing required numbered sections 1..7")
    else:
        for idx, (expected_num, expected_title) in enumerate(EXPECTED_SECTIONS):
            actual = sections[idx]
            if actual.number != expected_num:
                errors.append(
                    f"section order mismatch at position {idx + 1}: expected ## {expected_num}, got ## {actual.number}"
                )
            if normalize_title(expected_title) not in normalize_title(actual.title):
                errors.append(
                    f"section title mismatch for ## {expected_num}: expected to contain '{expected_title}', got '{actual.title}'"
                )

    section2 = find_section(sections, 2)
    if not section2:
        errors.append("missing section 2")
    else:
        primitive_blocks = split_blocks(section2.body, PRIMITIVE_RE)
        if not 4 <= len(primitive_blocks) <= 8:
            errors.append(f"section 2 must contain 4..8 primitives; found {len(primitive_blocks)}")
        for idx, block in enumerate(primitive_blocks, start=1):
            if not re.search(r"(?i)what it is", block):
                errors.append(f"section 2 primitive {idx} missing 'What it is'")
            if not re.search(r"(?i)why it is load-bearing", block):
                errors.append(f"section 2 primitive {idx} missing 'Why it is load-bearing'")
            if not re.search(r"(?i)tiny .*example|concrete example", block):
                errors.append(f"section 2 primitive {idx} missing tiny concrete example")
            if not re.search(r"\d", block):
                errors.append(f"section 2 primitive {idx} must include numeric detail")

    section3 = find_section(sections, 3)
    if not section3:
        errors.append("missing section 3")
    else:
        stage_blocks = split_blocks(section3.body, STAGE_RE)
        if not 6 <= len(stage_blocks) <= 10:
            errors.append(f"section 3 must contain 6..10 stages; found {len(stage_blocks)}")

        for idx, stage_block in enumerate(stage_blocks, start=1):
            if not re.search(r"(?im)^\s*stage output\s*:", stage_block):
                errors.append(f"stage {idx} missing 'Stage output:' line")

            parts, part_errors = extract_stage_subsections(stage_block)
            if part_errors:
                errors.extend([f"stage {idx} {error}" for error in part_errors])
                continue

            motivation = parts["Motivation"]
            for label in (
                "Bottleneck",
                "Why-now trigger",
                "Rejected shortcut",
                "Stage objective",
                "Payoff signal",
            ):
                if not re.search(rf"(?i)\b{re.escape(label)}\s*:", motivation):
                    errors.append(f"stage {idx} Motivation missing '{label}:' line")

            intuition = parts["Intuition"]
            if not re.search(r"(?i)\bmental model\s*:", intuition):
                errors.append(f"stage {idx} Intuition missing 'Mental model:' line")
            if not re.search(r"(?i)\bwhere it fails\s*:", intuition):
                errors.append(f"stage {idx} Intuition missing 'Where it fails:' line")

            construction = parts["Construction step"]
            if not re.search(r"(?i)\buses\s*:", construction):
                errors.append(f"stage {idx} Construction step missing 'Uses:' line")
            if not re.search(r"(?i)\bassumptions\s*:", construction):
                errors.append(f"stage {idx} Construction step missing 'Assumptions:' line")
            if not re.search(r"(?i)\bartifact produced\s*:", construction):
                errors.append(f"stage {idx} Construction step missing 'Artifact produced:' line")
            if not re.search(r"\$[^$]+\$|\$\$[\s\S]*?\$\$", construction):
                errors.append(f"stage {idx} Construction step must include at least one LaTeX expression")

            uses_match = re.search(r"(?im)^\s*uses\s*:\s*(.+)$", construction)
            if idx > 1:
                if not uses_match:
                    errors.append(f"stage {idx} Construction step missing usable 'Uses:' content")
                else:
                    uses_text = uses_match.group(1)
                    if not re.search(r"(?i)\bstage\b|stage_\d+", uses_text):
                        errors.append(
                            f"stage {idx} Uses should explicitly reference prior stage ideas (e.g., stage_{idx-1})"
                        )
                    for token in re.findall(r"stage_(\d+)", uses_text):
                        if int(token) >= idx:
                            errors.append(
                                f"stage {idx} Uses references future/non-prior stage stage_{token}"
                            )

            worked = parts["Worked example"]
            for label in ("Setup", "Compute", "Interpret", "Common mistake", "Sanity check"):
                if not re.search(rf"(?i)\b{re.escape(label)}\s*:", worked):
                    errors.append(f"stage {idx} Worked example missing '{label}:' line")

            setup_count = len(re.findall(r"(?im)^\s*setup\s*:", worked))
            if not 2 <= setup_count <= 3:
                errors.append(f"stage {idx} Worked example must include 2..3 examples; found {setup_count}")

            example_blocks = re.findall(r"(?ims)^\s*setup\s*:\s*(.*?)(?=^\s*setup\s*:|\Z)", worked)
            for ex_idx, block in enumerate(example_blocks, start=1):
                for label in ("Compute", "Interpret", "Common mistake", "Sanity check"):
                    if not re.search(rf"(?im)^\s*{re.escape(label)}\s*:", block):
                        errors.append(f"stage {idx} example {ex_idx} missing '{label}:' line")

                compute_match = re.search(r"(?ims)^\s*compute\s*:\s*(.*?)(?=^\s*interpret\s*:|\Z)", block)
                if compute_match:
                    compute_text = compute_match.group(1)
                    transform_hits = len(re.findall(r"(=|->|\\to|\\mapsto|\\Rightarrow|\\implies)", compute_text))
                    step_word_hits = len(re.findall(r"(?i)\b(first|second|next|then|step\s+\d+)\b", compute_text))
                    if transform_hits < 2 and step_word_hits < 2:
                        errors.append(
                            f"stage {idx} example {ex_idx} Compute should show explicit intermediate steps "
                            "(at least two transformations/equalities or two step markers)"
                        )

                if not re.search(
                    r"(?i)\b(vertices?|edges?|faces?|simplices?|basis|matrix|map|function|domain|codomain|set)\b",
                    block,
                ):
                    errors.append(
                        f"stage {idx} example {ex_idx} should name concrete objects/data "
                        "(e.g., vertices/edges/simplices/basis/matrix/map)"
                    )

                if re.search(r"(?i)\b(square|triangulat|diagonal|subdivis)\b", block):
                    if not re.search(r"(?im)^\s*vertices?\s*:", block):
                        errors.append(
                            f"stage {idx} example {ex_idx} triangulation-style example missing explicit 'Vertices:' line"
                        )
                    if not re.search(r"(?im)^\s*(edges?|triangles?|2-simplices?|simplices?)\s*:", block):
                        errors.append(
                            f"stage {idx} example {ex_idx} triangulation-style example missing explicit "
                            "'Edges:' or 'Triangles:'/'2-simplices:' line"
                        )

            has_numeric = re.search(r"\d", worked) is not None
            has_symbolic = re.search(r"=|->|\\to|\\mapsto|\\Rightarrow|\\implies", worked) is not None
            if not (has_numeric or has_symbolic):
                errors.append(f"stage {idx} Worked example must show explicit numeric or symbolic computation")

            unlocks = parts["What this unlocks next"]
            if not re.search(r"(?i)\bremaining gap\s*:", unlocks):
                errors.append(f"stage {idx} What this unlocks next missing 'Remaining gap:' line")
            if not re.search(r"(?i)\bnext question\s*:", unlocks):
                errors.append(f"stage {idx} What this unlocks next missing 'Next question:' line")

            dep_match = re.search(r"(?im)^\s*dependency edge\s*:\s*(.+)$", unlocks)
            if not dep_match:
                errors.append(f"stage {idx} What this unlocks next missing 'Dependency edge:' line")
            else:
                dep_text = dep_match.group(1).strip()
                if not re.search(
                    r"(?i)^stage_(?:k|\d+)\s*->\s*(?:stage_(?:\{?k\+1\}?|\d+)|destination)\s*:\s*.+$",
                    dep_text,
                ):
                    errors.append(
                        f"stage {idx} Dependency edge must match 'stage_k -> stage_{{k+1}}: ...' or "
                        "'stage_k -> destination: ...'"
                    )

    section4 = find_section(sections, 4)
    if not section4:
        errors.append("missing section 4")
    else:
        if not re.search(r"->", section4.body):
            errors.append("section 4 must include a dependency chain with '->'")

    if "```mermaid" not in text.lower():
        errors.append("document must include at least one mermaid diagram")

    section5 = find_section(sections, 5)
    if not section5:
        errors.append("missing section 5")
    else:
        if not re.search(r"(?i)formal definition|formal statement", section5.body):
            errors.append("section 5 must include a formal definition or formal statement")
        if not re.search(r"(?i)near-miss|non-example|proof skeleton", section5.body):
            errors.append("section 5 must include near-miss/non-example (concept mode) or proof skeleton (theorem mode)")
        if not re.search(r"(?i)wrong mental model", section5.body):
            errors.append("section 5 must include 'wrong mental model'")
        if not re.search(r"(?i)correction", section5.body):
            errors.append("section 5 must include a correction for the wrong mental model")

    section6 = find_section(sections, 6)
    if not section6:
        errors.append("missing section 6")
    else:
        if not re.search(r"(?i)failed|naive attempt", section6.body):
            errors.append("section 6 must include at least one failed/naive attempt")
        if not re.search(r"(?i)breaks|fails|does not work", section6.body):
            errors.append("section 6 must explain why the failed/naive attempt breaks")

    section7 = find_section(sections, 7)
    if not section7:
        errors.append("missing section 7")
    else:
        item_count = len(re.findall(r"(?im)^\s*[-*]?\s*suggested next command\s*:", section7.body))
        if not 4 <= item_count <= 8:
            errors.append(f"section 7 must contain 4..8 downstream items; found {item_count}")
        reuse_count = len(re.findall(r"(?i)reuses|foundation ideas reused|reused", section7.body))
        depends_count = len(re.findall(r"(?i)depends on|reason it depends", section7.body))
        if reuse_count < item_count:
            errors.append("section 7 downstream items must name which foundation ideas are reused")
        if depends_count < item_count:
            errors.append("section 7 downstream items must state why each item depends on those ideas")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Verify artifact-based depth constraints for bottom-up outputs.")
    parser.add_argument("output_file", help="Path to bottom-up markdown file")
    args = parser.parse_args()

    path = pathlib.Path(args.output_file)
    if not path.exists():
        print(f"FAIL: file not found: {path}")
        return 1

    text = path.read_text(encoding="utf-8")
    errors = verify(path, text)

    if errors:
        print(f"FAIL: {path}")
        for error in errors:
            print(f"  - {error}")
        return 1

    section3 = find_section(split_sections(text), 3)
    stage_count = len(split_blocks(section3.body, STAGE_RE)) if section3 else 0
    print(f"PASS: {path} | stages={stage_count}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
