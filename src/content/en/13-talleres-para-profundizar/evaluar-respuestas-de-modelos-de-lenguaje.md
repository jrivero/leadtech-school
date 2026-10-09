---
title: "Evaluating Language Model Responses"
description: "Create a small set of cases and observable criteria to compare responses; detect regressions by category without relying on an API or automated evaluator."
module: "13-talleres-para-profundizar"
order: 7
duration: 50
level: "Intermediate"
objectives:
  - "Turn response requirements into observable evaluation criteria."
  - "Prepare representative cases with references, boundaries, and difficult examples."
  - "Compare variants and document errors without treating a single score as a guarantee."
prerequisites:
  - "Know the difference between a generated response and a reference response."
  - "Be able to express quality rules and read a data table."
updatedDate: "2026-10-08"
sources:
  - label: "OpenAI Developers: best practices for designing evaluations"
    url: "https://developers.openai.com/api/docs/guides/evaluation-best-practices"
  - label: "OpenAI Developers: datasets and Evals availability"
    url: "https://developers.openai.com/api/docs/guides/evaluation-getting-started"
---

## From “seems good” to a repeatable test

An evaluation of a model compares observed behavior with written expectations. The useful question is not “which response sounds better?” but “what behavior must this system exhibit for this input, and which error would be unacceptable?” A test can check format, accuracy against a source, coverage of requested points, tone, or abstention when information is missing. A single score does not represent all those aspects or demonstrate general safety.

We will use a fictional assistant that classifies support requests as `acceso`, `facturacion`, or `otro`. Before looking at an output, define rules: the label must belong to the allowed set; if the message does not provide enough information, the system must ask; and it must never invent account details. Separate an easy-to-automate binary rule—valid label—from a judgment that needs context—whether the explanation is supported by the request.

## Design the dataset before adjusting the prompt

Create twelve synthetic cases with no real names: four normal examples, two paraphrases, two ambiguous cases, one out-of-scope inquiry, one request that requires acknowledging missing information, one quoted instruction that must not change the task, and one empty input. Save the input, expected label, success condition, and risk of failure. This amount is useful for a smoke test and design practice; it is not enough to estimate statistical reliability or approve a high-impact system.

Set aside eight cases for development and reserve four as a final test. If you repeatedly review the four reserved cases and adjust the instruction for them, they are no longer an independent evaluation. Note two versions to compare: the current behavior and the candidate. For a useful comparison, keep the same inputs and record the model, configuration, date, and prompt changes when that information is available. Some outputs vary between runs; repeat variable cases instead of hiding that variation.

A results table could have these columns: case, expected output, observed output, valid format, accuracy, grounded explanation, should it have abstained?, severity, and comment. Calculate results by category and risk type. Do not average a critical privacy error together with many correct style responses: report launch-blocking failures separately.

## Activity: test on paper without an API

1. Write six of the twelve cases and their references; a classmate writes the other six to introduce formulations you did not anticipate.
2. Simulate two responses per case on paper or in a table. One can be deliberately convincing but wrong; the other can be correct but shorter.
3. Score each criterion separately. For “grounded explanation,” mark each claim that does not appear in the input or fictional source.
4. Review disagreements between evaluators. If two people interpret “useful response” differently, turn the rubric into a more specific rule or keep a documented human evaluation.
5. Change one system rule and repeat the development cases. Then apply the reserved cases once and record any new errors too.
6. Decide: accept for another prototype, revise the instruction, or block integration. Explain the decision with results, not with the text's fluency.

You can later turn deterministic rules into a code test and use human evaluation for nuances. An evaluator based on another model is an auxiliary tool: it can reproduce biases, miss a false citation, and disagree with specialists. Calibrate its judgment with examples reviewed by people and record its limitations.

## Validation, errors, and maintenance

A useful evaluation includes normal and difficult cases, stable criteria, data separate from the data used for adjustment, and a procedure for investigating each failure. If accuracy improves but abstention worsens, the change is not automatically good. If the average seems stable but one category fails, look for the pattern before concluding there was no regression.

Do not select examples only because the model handled them well; do not use the same response to teach and measure; do not treat text matching as the only measure of meaning; and do not call a small list of attacks “validated security.” Requirements and evaluation tools evolve: keep cases in a portable format, add examples after incidents, and check that information is current before basing the process on external endpoints. Currency note as of October 8, 2026: OpenAI announces that its Evals platform will become read-only on October 31, 2026, and plans to close it on November 30, 2026. This workshop does not depend on that platform; keep cases and rubrics in portable formats.

## Wrap-up

A good evaluation is an executable or reviewable specification of expected behavior. Start small, separate format, accuracy, and boundaries, keep reserved cases, and report failures by severity. The goal is to know what you learned from the experiment and what remains unproven.
