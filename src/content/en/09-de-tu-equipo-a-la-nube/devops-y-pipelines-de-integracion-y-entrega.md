---
title: "DevOps and CI/CD Pipelines"
description: "Learn to turn small changes into reliable releases with continuous integration, local tests, and a real workflow that neither deploys nor accesses the cloud."
module: "09-de-tu-equipo-a-la-nube"
order: 1
duration: 35
level: "Intermediate"
objectives:
  - "Distinguish DevOps, continuous integration, continuous delivery, and continuous deployment."
  - "Run standard unit tests as a local gate before proposing a change."
  - "Interpret a real GitHub Actions workflow without confusing it with a local simulation."
prerequisites:
  - "Be able to run commands in a terminal."
  - "Know basic Python functions and tests."
updatedDate: '2026-10-08'
sources:
  - label: "GitHub Actions: concepts and workflows"
    url: "https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows"
  - label: "GitHub Actions workflow syntax"
    url: "https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax"
  - label: "Published versions of actions/checkout"
    url: "https://github.com/actions/checkout/releases"
---

## DevOps as a way of working

Publishing software does not end with writing code: development and operations share responsibility for building, checking, and maintaining it. DevOps is a way to collaborate that reduces waiting and repeats reliable steps; it is not a tool, and it does not guarantee that automation will fix a poor process.

Continuous integration (CI) encourages teams to integrate small changes frequently and run automated checks on each change. Continuous delivery keeps a verified version ready for release, usually with human approval. Continuous deployment goes one step further: it automatically publishes each change that passes the agreed rules. These are different practices; you do not have to start by automating production.

A pipeline links stages—prepare, analyze, test, and build—and stops later stages if one fails. Run quick tests on every change; publishing also requires permissions, review, rollback, and monitoring. Keep the verified artifact so you do not build a different version again.

Automation does not turn a bad test into a good test. Each check should have a clear purpose and result. Limiting permissions matters too: a CI task that only reads the repository does not need deployment credentials. Secrets must not be written in YAML, printed in logs, or exposed to untrusted code. Start with tests, and add publishing only when you can explain who authorizes it and how it can be rolled back.

## A real workflow and a local run

This YAML is real configuration, for reading only. Saved as `.github/workflows/calidad.yml` and pushed to a repository, it activates a remote runner for a pull request or a push to `main`; do not save it or push it in this lesson. It runs tests, not a deployment. The executable activity is the local Python block.

```yaml
name: calidad
on:
  pull_request:
  push:
    branches: [main]
permissions:
  contents: read
jobs:
  pruebas:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - name: Ejecutar pruebas
        run: python3 -m unittest discover -v
```


`on` declares events; `jobs` groups jobs; `runs-on` selects the runner; and each `step` checks out code or runs a command. Read-only permission reduces the token's scope. The workflow assumes the project has tests discoverable by `unittest`; in a real repository, adapt the command to the language and its tests. The snippet is not a terminal command: do not paste it into Python or present it as a test run locally.

## Local activity

1. Open a terminal with Python 3 already available. The next block uses only the standard library: `python3 -` reads the program from standard input and avoids creating files or installing packages.
2. Paste the entire block. The function calculates a synthetic total and rejects negative amounts; two tests check both cases.

```sh
python3 - <<'PY'
import unittest

def total(precio, unidades):
    if precio < 0 or unidades < 0:
        raise ValueError("Los valores no pueden ser negativos")
    return round(precio * unidades, 2)

class PruebasTotal(unittest.TestCase):
    def test_multiplica_precio_y_unidades(self):
        self.assertEqual(total(2.5, 4), 10.0)

    def test_rechaza_unidades_negativas(self):
        with self.assertRaises(ValueError):
            total(2.5, -1)

resultado = unittest.TextTestRunner(verbosity=2).run(
    unittest.defaultTestLoader.loadTestsFromTestCase(PruebasTotal)
)
if not resultado.wasSuccessful():
    raise SystemExit(1)
print("DRY-RUN: pruebas superadas; no se ha publicado nada.")
PY
```


`unittest` reports each case; `wasSuccessful()` makes the process exit with an error if any case fails. That exit status is what lets a later stage stop. The final message is only a local confirmation: it does not simulate credentials, networking, artifacts, or a real deployment.

## Verification and outcome

The expected result is two passing tests and the message `DRY-RUN: pruebas superadas; no se ha publicado nada.` Temporarily change `10.0` to `9.0` and run it again: the test should fail, and the process should return a nonzero exit code. Restore the value. You have practiced the same idea as a CI gate, but without pushing code, opening an account, or contacting a remote runner.

## Common errors and solutions

If you see `python3: command not found`, Python is not available under that name; do not install anything for this exercise—check whether the `python` command already exists, or leave the exercise for another machine. If a test fails, compare the calculated value with the expected one and fix the cause; do not delete the check. In a project, `unittest discover` may not find tests if their names do not start with `test`; check the pattern and directory. Do not try to activate this workflow during the lesson; in an authorized project of your own, review its path and events before making any changes. Do not solve insufficient permissions by adding secrets: a test pipeline does not need production access.

## Summary

DevOps coordinates people and automation throughout the software life cycle. CI checks changes frequently; continuous delivery leaves a version ready, while continuous deployment publishes it without manual approval. A pipeline should fail clearly, use minimum permissions, and produce repeatable results. The local test in this activity validates a rule and an error signal; the YAML shows a separate, real configuration. You can start with that gate, observe its results, and add stages only when you understand their risks and recovery mechanism.
