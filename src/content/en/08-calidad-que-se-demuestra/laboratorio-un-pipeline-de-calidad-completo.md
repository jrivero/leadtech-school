---
title: "Lab: A Complete Quality Pipeline"
description: "Build a sequence of reproducible gates to validate a change before integration, with least privilege, readable evidence, and no automatic deployment."
module: "08-calidad-que-se-demuestra"
order: 12
duration: 50
level: "Intermediate"
objectives:
  - "Order analysis, tests, build, and review in a pipeline that fails when errors occur."
  - "Connect each gate to a risk and repeatable evidence."
  - "Apply least privilege and separate validation from deployment or secret use."
prerequisites:
  - "Know local testing and the idea of continuous integration."
  - "Be able to run scripts defined by a project."
updatedDate: '2026-10-08'
sources:
  - label: "GitHub Actions: workflow and job concepts"
    url: "https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows"
  - label: "GitHub Actions: secure workflow practices"
    url: "https://docs.github.com/en/actions/reference/security/secure-use"
---

## A gate is a decision signal

A quality pipeline automates repeatable steps from the time a change is proposed until it is ready to integrate. Each stage answers a question: Is the code valid? Do the tests pass? Does the product build? Are there known risks to review? If a gate fails, the sequence should make clear what happened and avoid presenting the change as ready. A CI workflow does not have to publish to production; separating validation from deployment reduces permissions and makes the evidence easier to understand.

A typical sequence runs fast analysis and unit tests before broader integration checks, then builds the artifact and, when valuable, checks browser journeys or accessibility. The order aims to provide fast feedback without hiding higher-risk tests. Do not add a stage just because a tool exists: specify which defect it detects, how long it takes, and what the team will do with the result. A gate that nobody addresses or that fails intermittently becomes noise.

In GitHub Actions, a workflow describes triggering events, jobs, and steps run on runners. Configuration should request only the permissions each job needs; read access to the repository may be enough to validate code. Deployment secrets do not belong in a test job or in code from an untrusted external request. Carefully review any workflow that runs commands, uses third-party actions, or accesses credentials. Syntax and available policies can change, so consult official documentation before enabling publication.

## Example with this project

In this repository, `package.json` defines `npm run validate` as a local sequence that runs the Astro diagnostic, tests, build, and validation of the generated artifact. Those are scripts in this project, not universal commands for every application. The chain stops when a step returns an error, so the result identifies the first failed gate. It does not include deployment, calls to an AI provider, or the need for an external key.

A remote pipeline can run the same checks against a proposed change, but that requires configuring a real workflow and repository rules. Describing stages does not create CI. In a production configuration, review the event, runner, action versions, token scope, source of secrets, and who can approve publication. Reading this lesson does not execute any of those steps in the example application.

## Step-by-step lab

1. Check `package.json` to see which scripts actually exist and which tools each one invokes; do not copy commands from another project without checking them.
2. With local dependencies already installed, run `npm run validate` from the root of this repository. It does not require sending code to a provider.
3. Note each phase, its result, and the type of error it would detect. If it fails, keep the relevant message and fix the cause before continuing.
4. Design a workflow on paper: request event, validation job, minimum permissions, ordered steps, and failure signal. Label it as a design, not an executable file.
5. Add deployment only as a separate stage conditioned on review, approval, and protected credentials; do not implement it in this lab.
6. Write down what happens if tests are missing, the build fails, or a task requests write permissions it does not need.

## Verification and solution

A complete local run should show that the project's scripts finished; if any phase fails, do not claim that the pipeline is green. The minimum design solution includes an event, a read-only job, existing commands, and a failed result that blocks later steps. Publication remains out of scope. If `npm run validate` is unavailable in another copy of the project, check its scripts; do not invent a replacement command or claim it was run.

When enabling real CI, verify the log, the exact commit evaluated, and that the tests correspond to the current diff. If the change is modified afterward, earlier evidence no longer proves that version. Read permissions are sufficient for many validation tasks; an error caused by missing permission is not a reason to grant broad access without analyzing which operation needs it.

## Common mistakes

- **Adding deployment to the first pipeline.** Start with validation and separate publication authorization.
- **Using commands not defined by the project.** Inspect scripts and documentation before automating.
- **Giving every task write permissions.** Limit each workflow and job to the capability it needs.
- **Storing secrets in YAML or logs.** Use protected stores and avoid exposing them to untrusted runs.
- **Treating a successful run as a guarantee.** The pipeline demonstrates only the checks configured for the tested commit.

## Summary

A complete pipeline orders gates that produce evidence and stops integration when they fail. Reuse real commands, assign minimum permissions, and separate CI from deployment. Verify the commit and logs; a green run confirms those checks, not the complete absence of defects or the safety of every publication.
