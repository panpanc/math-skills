#!/usr/bin/env python3
"""Verify Markdown math spans and renderer-safe LaTeX hygiene."""

from __future__ import annotations

import argparse
import bisect
import json
import pathlib
import re
import shutil
import subprocess
import sys
from dataclasses import dataclass


MATH_COMMAND_OUTSIDE_RE = re.compile(
    r"\\(?:begin|end)\s*\{[^}]+\}|\\(?:frac|sqrt|operatorname|left|right)\b"
)
TEXT_MACRO_RE = re.compile(r"\\text\s*\{([^{}]*)\}")
PANDOC_FORMAT = "markdown+tex_math_dollars+tex_math_single_backslash+tex_math_double_backslash"
ALLOWED_TEXT_WORDS = {"and", "or", "if", "for", "where", "when", "then"}


@dataclass
class MathSpan:
    opener: str
    closer: str
    kind: str
    start_idx: int
    end_idx: int
    content: str
    start_line: int
    start_col: int
    end_line: int
    end_col: int


def build_line_starts(text: str) -> list[int]:
    starts = [0]
    for idx, char in enumerate(text):
        if char == "\n":
            starts.append(idx + 1)
    return starts


def line_col(line_starts: list[int], idx: int) -> tuple[int, int]:
    line_idx = bisect.bisect_right(line_starts, idx) - 1
    line_no = line_idx + 1
    col_no = idx - line_starts[line_idx] + 1
    return line_no, col_no


def mask_fenced_code(text: str) -> tuple[str, list[str]]:
    lines = text.splitlines(keepends=True)
    masked: list[str] = []
    warnings: list[str] = []
    in_fence = False
    fence_marker = ""

    for line_no, line in enumerate(lines, start=1):
        stripped = line.lstrip()
        match = re.match(r"^(`{3,}|~{3,})(.*)$", stripped)
        if match:
            marker = match.group(1)
            if not in_fence:
                in_fence = True
                fence_marker = marker[0]
            elif marker[0] == fence_marker and len(marker) >= 3:
                in_fence = False
                fence_marker = ""
            masked.append(re.sub(r"[^\n]", " ", line))
            continue

        if in_fence:
            if "$" in line or r"\(" in line or r"\[" in line or r"\begin{" in line:
                warnings.append(
                    f"line {line_no}: possible math-like content inside fenced code block; keep math outside fences"
                )
            masked.append(re.sub(r"[^\n]", " ", line))
            continue

        masked.append(line)

    return "".join(masked), warnings


def is_escaped(text: str, idx: int) -> bool:
    backslashes = 0
    cursor = idx - 1
    while cursor >= 0 and text[cursor] == "\\":
        backslashes += 1
        cursor -= 1
    return backslashes % 2 == 1


def scan_math_spans(text: str) -> tuple[list[MathSpan], list[str]]:
    spans: list[MathSpan] = []
    errors: list[str] = []
    line_starts = build_line_starts(text)
    openers = [
        ("$$", "$$", "display"),
        (r"\[", r"\]", "display"),
        (r"\(", r"\)", "inline"),
        ("$", "$", "inline"),
    ]

    active: tuple[str, str, str, int] | None = None
    buffer: list[str] = []
    i = 0

    while i < len(text):
        if active is None:
            matched = False
            for opener, closer, kind in openers:
                if text.startswith(opener, i) and not is_escaped(text, i):
                    active = (opener, closer, kind, i)
                    buffer = []
                    i += len(opener)
                    matched = True
                    break
            if matched:
                continue
            i += 1
            continue

        opener, closer, kind, start_idx = active
        if text.startswith(closer, i) and not is_escaped(text, i):
            start_line, start_col = line_col(line_starts, start_idx)
            end_line, end_col = line_col(line_starts, i + len(closer) - 1)
            spans.append(
                MathSpan(
                    opener=opener,
                    closer=closer,
                    kind=kind,
                    start_idx=start_idx,
                    end_idx=i + len(closer),
                    content="".join(buffer),
                    start_line=start_line,
                    start_col=start_col,
                    end_line=end_line,
                    end_col=end_col,
                )
            )
            active = None
            buffer = []
            i += len(closer)
            continue

        buffer.append(text[i])
        i += 1

    if active is not None:
        opener, closer, kind, start_idx = active
        start_line, start_col = line_col(line_starts, start_idx)
        errors.append(
            f"line {start_line}:{start_col}: unclosed {kind} math delimiter '{opener}' (expected '{closer}')"
        )

    return spans, errors


def validate_braces(span: MathSpan) -> list[str]:
    errors: list[str] = []
    stack: list[tuple[int, int]] = []
    line_starts = build_line_starts(span.content)

    for idx, char in enumerate(span.content):
        if char == "{" and not is_escaped(span.content, idx):
            stack.append(line_col(line_starts, idx))
        elif char == "}" and not is_escaped(span.content, idx):
            if not stack:
                line_no, col_no = line_col(line_starts, idx)
                errors.append(
                    f"line {span.start_line + line_no - 1}:{col_no}: unmatched '}}' inside math span starting at line {span.start_line}"
                )
            else:
                stack.pop()

    for line_no, col_no in stack:
        errors.append(
            f"line {span.start_line + line_no - 1}:{col_no}: unclosed '{{' inside math span starting at line {span.start_line}"
        )
    return errors


def validate_environments(span: MathSpan) -> list[str]:
    errors: list[str] = []
    env_stack: list[tuple[str, int, int]] = []
    line_starts = build_line_starts(span.content)

    for match in re.finditer(r"\\(begin|end)\s*\{([^}]+)\}", span.content):
        kind = match.group(1)
        env = match.group(2)
        line_no, col_no = line_col(line_starts, match.start())
        absolute_line = span.start_line + line_no - 1
        if kind == "begin":
            env_stack.append((env, absolute_line, col_no))
            continue
        if not env_stack or env_stack[-1][0] != env:
            errors.append(
                f"line {absolute_line}:{col_no}: \\end{{{env}}} does not match the currently open environment"
            )
            continue
        env_stack.pop()

    for env, line_no, col_no in env_stack:
        errors.append(f"line {line_no}:{col_no}: \\begin{{{env}}} is not closed")
    return errors


def validate_left_right(span: MathSpan) -> list[str]:
    errors: list[str] = []
    tokens = list(re.finditer(r"\\(left|right)\b", span.content))
    balance = 0
    line_starts = build_line_starts(span.content)

    for match in tokens:
        token = match.group(1)
        line_no, col_no = line_col(line_starts, match.start())
        absolute_line = span.start_line + line_no - 1
        if token == "left":
            balance += 1
        else:
            balance -= 1
            if balance < 0:
                errors.append(f"line {absolute_line}:{col_no}: \\right appears without a matching \\left")
                balance = 0

    if balance != 0:
        errors.append(
            f"line {span.start_line}:{span.start_col}: math span has unmatched \\left/\\right delimiters"
        )
    return errors


def validate_span_warnings(span: MathSpan) -> list[str]:
    warnings: list[str] = []
    line_starts = build_line_starts(span.content)

    if span.kind == "inline" and "\n" in span.content:
        warnings.append(
            f"line {span.start_line}:{span.start_col}: inline math spans multiple lines; prefer display math or keep it on one line"
        )

    if "```" in span.content:
        warnings.append(
            f"line {span.start_line}:{span.start_col}: fenced-code marker found inside math; move code markers outside math"
        )

    for match in TEXT_MACRO_RE.finditer(span.content):
        raw_text = match.group(1).strip()
        line_no, col_no = line_col(line_starts, match.start())
        absolute_line = span.start_line + line_no - 1
        if not raw_text:
            warnings.append(
                f"line {absolute_line}:{col_no}: empty \\text{{}} inside math; remove it or move prose outside math"
            )
            continue
        words = re.findall(r"[A-Za-z]+", raw_text)
        normalized = " ".join(word.lower() for word in words)
        if normalized not in ALLOWED_TEXT_WORDS or len(words) > 1:
            warnings.append(
                f"line {absolute_line}:{col_no}: \\text{{...}} contains prose ('{raw_text}'); "
                "prefer putting labels/conditions in surrounding prose and keeping the equation symbolic"
            )

    return warnings


def validate_commands_outside_math(text: str, spans: list[MathSpan]) -> list[str]:
    masked = list(text)
    for span in spans:
        for idx in range(span.start_idx, span.end_idx):
            if masked[idx] != "\n":
                masked[idx] = " "
    remainder = "".join(masked)
    line_starts = build_line_starts(remainder)
    errors: list[str] = []

    for match in MATH_COMMAND_OUTSIDE_RE.finditer(remainder):
        line_no, col_no = line_col(line_starts, match.start())
        snippet = match.group(0)
        errors.append(
            f"line {line_no}:{col_no}: LaTeX math command '{snippet}' appears outside math delimiters"
        )
    return errors


def count_pandoc_math_nodes(payload: object) -> int:
    if isinstance(payload, dict):
        count = 1 if payload.get("t") == "Math" else 0
        return count + sum(count_pandoc_math_nodes(value) for value in payload.values())
    if isinstance(payload, list):
        return sum(count_pandoc_math_nodes(item) for item in payload)
    return 0


def validate_with_pandoc(path: pathlib.Path, span_count: int) -> list[str]:
    if shutil.which("pandoc") is None:
        return []

    run = subprocess.run(
        ["pandoc", "-f", PANDOC_FORMAT, "-t", "json", str(path)],
        check=False,
        capture_output=True,
        encoding="utf-8",
    )
    if run.returncode != 0:
        message = (run.stderr or run.stdout or "unknown pandoc error").strip().splitlines()[0]
        return [f"pandoc could not parse markdown math cleanly: {message}"]

    try:
        payload = json.loads(run.stdout)
    except json.JSONDecodeError as exc:
        return [f"pandoc JSON output could not be decoded: {exc}"]

    pandoc_count = count_pandoc_math_nodes(payload)
    if pandoc_count != span_count:
        return [
            f"pandoc recognized {pandoc_count} math span(s), but the verifier found {span_count}; "
            "some intended math may not be parsed as math by Markdown renderers"
        ]
    return []


def verify(path: pathlib.Path) -> tuple[list[str], list[str]]:
    text = path.read_text(encoding="utf-8")
    masked_text, warnings = mask_fenced_code(text)
    spans, scan_errors = scan_math_spans(masked_text)

    errors = list(scan_errors)
    errors.extend(validate_commands_outside_math(masked_text, spans))

    for span in spans:
        errors.extend(validate_braces(span))
        errors.extend(validate_environments(span))
        errors.extend(validate_left_right(span))
        warnings.extend(validate_span_warnings(span))

    errors.extend(validate_with_pandoc(path, len(spans)))
    return errors, warnings


def main() -> int:
    parser = argparse.ArgumentParser(description="Verify Markdown math spans and basic LaTeX hygiene.")
    parser.add_argument("markdown_file", help="Path to markdown file")
    parser.add_argument(
        "--strict-warnings",
        action="store_true",
        help="Treat renderer-risk warnings as failures",
    )
    args = parser.parse_args()

    path = pathlib.Path(args.markdown_file)
    if not path.exists():
        print(f"FAIL: file not found: {path}")
        return 1

    errors, warnings = verify(path)

    if errors or (warnings and args.strict_warnings):
        print(f"FAIL: {path}")
        for error in errors:
            print(f"  - error: {error}")
        for warning in warnings:
            prefix = "error" if args.strict_warnings else "warning"
            print(f"  - {prefix}: {warning}")
        return 1

    print(f"PASS: {path} | math_spans_checked")
    for warning in warnings:
        print(f"warning: {warning}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
