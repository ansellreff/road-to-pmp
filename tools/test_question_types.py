"""Test the tools on the question types: the checker must report each deliberately broken question,
and the exam builder must order the options of every type properly.

Usage: python tools/test_question_types.py   (from the project folder)
"""
import importlib.util
import json
import random
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, "tools")


def load(name):
    spec = importlib.util.spec_from_file_location(name, f"tools/{name}.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


check = load("check_content")
build = load("build_exams")
base = {"explanation": "e", "ref": "r", "links": [{"book": "b", "page": 1}]}
good = [
    {"id": "q1", "q": "single", "options": ["a", "b", "c", "d"], "answer": 1, **base},
    {"id": "q2", "q": "match", "type": "match", "left": ["l1", "l2", "l3"], "right": ["r1", "r2", "r3"], **base},
    {"id": "q3", "q": "strip", "options": ["a", "b", "c", "d"], "answer": 0, "strip": [{"who": "A", "says": "x"}, {"who": "B", "says": "y"}], **base},
]
broken = {
    "two pairs only": {"id": "b1", "q": "m", "type": "match", "left": ["a", "b"], "right": ["c", "d"], **base},
    "unequal sides": {"id": "b2", "q": "m2", "type": "match", "left": ["a", "b", "c"], "right": ["c", "d"], **base},
    "repeated item": {"id": "b3", "q": "m3", "type": "match", "left": ["a", "a", "c"], "right": ["x", "y", "z"], **base},
    "match with options": {"id": "b4", "q": "m4", "type": "match", "left": ["a", "b", "c"], "right": ["x", "y", "z"], "options": ["x"], "answer": 0, **base},
    "unknown type": {"id": "b5", "q": "u", "type": "essay", "options": ["a", "b", "c", "d"], "answer": 0, **base},
    "unknown drawing": {"id": "b6", "q": "d", "diagram": "no-such-drawing", "options": ["a", "b", "c", "d"], "answer": 0, **base},
    "hot spot on a drawing without areas": {"id": "b7", "q": "h", "type": "hotspot", "diagram": "fishbone", "options": ["a", "b", "c"], "answer": 0, **base},
    "strip of one panel": {"id": "b8", "q": "s", "options": ["a", "b", "c", "d"], "answer": 0, "strip": [{"who": "A", "says": "x"}], **base},
    "strip panel without words": {"id": "b9", "q": "s2", "options": ["a", "b", "c", "d"], "answer": 0, "strip": [{"who": "A", "says": ""}, {"who": "B", "says": "y"}], **base},
    "three options": {"id": "b10", "q": "t", "options": ["a", "b", "c"], "answer": 0, **base},
}
check_quiz = next(getattr(check, n) for n in dir(check) if n.startswith("check_quiz"))
failures = 0
with tempfile.TemporaryDirectory() as folder:
    path = Path(folder) / "quiz.json"
    filler = [{"id": f"f{i}", "q": f"filler {i}", "options": ["a", "b", "c", "d"], "answer": i % 4, **base} for i in range(12)]
    path.write_text(json.dumps(good + filler), encoding="utf-8")
    problems = []
    check_quiz(path, problems, [], {})
    if problems:
        failures += 1
        print("FAIL: sound questions were reported:", problems)
    for name, question in broken.items():
        path.write_text(json.dumps(good + filler + [question]), encoding="utf-8")
        problems = []
        check_quiz(path, problems, [], {})
        if not any(f"[{question['id']}]" in p for p in problems):
            failures += 1
            print("FAIL: not reported:", name)
print(f"checker: {len(broken)} broken questions tried, {failures} failures")

rng = random.Random(1)
for _ in range(200):
    order = build.option_order(good[1], 0, rng)
    assert sorted(order) == [0, 1, 2] and order != [0, 1, 2], order
for letter in range(4):
    order = build.option_order(good[0], letter, rng)
    assert sorted(order) == [0, 1, 2, 3] and order.index(1) == letter, (letter, order)
hot = {"type": "hotspot", "options": ["a", "b", "c"], "answer": 2, "explanation": "e"}
assert build.option_order(hot, 1, rng) == [0, 1, 2]
print("exam builder: matching never left in order, single answers land on their letter, hot spots untouched")
sys.exit(1 if failures else 0)
