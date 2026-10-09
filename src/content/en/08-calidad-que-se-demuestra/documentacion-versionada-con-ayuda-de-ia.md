---
title: "Versioned Documentation with AI Assistance"
description: "Update documentation alongside code changes and use assistants to draft text that is checked against tests, sources, and commands that actually run."
module: "08-calidad-que-se-demuestra"
order: 6
duration: 35
level: "Intermediate"
objectives:
  - "Choose which documentation to update when behavior changes."
  - "Review an AI draft against code and project evidence."
  - "Keep examples, prerequisites, and commands precise within the same review cycle."
prerequisites:
  - "Know how to read a diff and locate a project's documentation."
  - "Be able to distinguish a check that was run from a proposal."
updatedDate: '2026-10-08'
sources:
  - label: "GitHub Docs: writing and Markdown formatting"
    url: "https://docs.github.com/en/get-started/writing-on-github"
  - label: "AGENTS.md: versioned instructions for agents"
    url: "https://agents.md/"
---

## Documentation changes with the product

A getting-started README, user guide, configuration reference, and operations note answer different questions. When a feature changes, you do not always need to rewrite every document; find the ones that contain a statement that is no longer true. If an application now exports CSV, users need to know where the option is, the column format, and relevant limits. A maintainer may also need to know where the rule is applied and which test protects the format.

AI can summarize a diff, suggest a list of affected sections, and draft text in the project's tone. It does not necessarily know what behavior is missing, which commands are available, the publication policies, or decisions that were never written down. Check every claim against code, tests, configuration, and the official documentation for dependencies. If the draft adds an environment variable, permission, or command that does not exist, remove the invention instead of adapting the project to persuasive text.

Good documentation is versioned alongside the code so that one change includes both explanation and behavior. Keep examples small and executable when possible. State prerequisites, input data, expected results, and limitations. Do not mark an operation as tested if only a snippet was generated. In agent instructions, state operational boundaries and stable conventions; specialized procedures may live in a skill, but each file should have a clear, reviewable purpose.

Documentation is also a security surface. Do not include keys, private addresses, personal data, unauthorized deployment instructions, or screenshots with real identifiers. An example needs invented, consistent values, not a fake credential that looks valid. If an activity requires an account or could incur a charge, say so before the step and offer a local check when possible.

## Example: adding task export

Suppose a change adds a button to download completed tasks as CSV. Previously, the README described only the on-screen list. The diff and test show that the export now includes the `titulo` (“title”) and `estado` (“status”) columns, omits pending tasks, and escapes quotation marks in a title according to the format. The user guide should describe the button and filter; the developer note can explain which function generates the CSV. If opening the file in a spreadsheet has not been tested, do not promise universal compatibility with every program.

You can ask an assistant: “Summarize the diff and point out which README statements might be outdated. Do not invent commands; tie each suggestion to a changed file and flag uncertainties.” Then read the original diff and open the cited sources. The suggestion is a review map, not proof that the documents are complete.

## Step-by-step activity

1. Choose a small change and list the documented statements that depend on it.
2. Read the code and tests before writing; separate observed facts from decisions that are still pending.
3. Draft a user-facing paragraph and, if needed, another for maintainers. Use terms visible in the interface and fictional values.
4. If you use AI, share only the permitted diff and ask it to identify assumptions and references; do not send secrets or sensitive code to an unapproved service.
5. Check every sentence against the implementation. Run the examples and commands you claim work; if you cannot, label them as illustrative or pending.
6. Review the full code and documentation diff as one unit, looking for contradictions, incorrect paths, and unverified promises.

## Verification and solution

For the CSV example, a consistent guide says that only completed tasks are exported and that the columns are `titulo` (“title”) and `estado` (“status”); the technical document names the actual function; and no text claims that external applications were tested if they were not. Verification means comparing each sentence with the tests and behavior. If the columns change tomorrow, the test and documentation should be updated in the same change or left as an explicit task with an owner.

## Common mistakes

- **Copying the generated summary without opening the files.** Check facts, names, and scope against the code.
- **Documenting an option that does not exist yet.** Distinguish a proposal, prototype, and available feature.
- **Leaving commands that cannot run.** Use real project scripts and note their prerequisites.
- **Duplicating complete instructions across many files.** Keep one primary source and use internal links when they are stable.
- **Adding sensitive data to examples.** Replace it with invented fixtures before versioning or sharing.

## Summary

Documentation explains the product contract and should evolve with it. Use assistants to locate changes or draft text, but verify every sentence against the diff and tests. Keep examples safe, commands real, and limitations explicit; clear but false text makes software quality worse.
