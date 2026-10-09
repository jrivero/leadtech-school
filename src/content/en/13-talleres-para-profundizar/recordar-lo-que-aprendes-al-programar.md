---
title: "Remembering What You Learn While Programming"
description: "Turn programming concepts into retrieval questions and spaced reviews; check what you remember and correct errors with new examples."
module: "13-talleres-para-profundizar"
order: 10
duration: 45
level: "Beginner"
objectives:
  - "Create short questions that require recalling and applying concepts, not just recognizing them."
  - "Plan spaced reviews and adjust the interval based on how easily you can retrieve the answer."
  - "Use feedback and new examples to distinguish recall from transferable understanding."
prerequisites:
  - "Have studied at least one programming concept, such as functions, lists, or tests."
  - "Have paper or a local note for recording questions and mistakes."
updatedDate: "2026-10-08"
sources:
  - label: "PubMed: review and quantitative synthesis on distributed practice"
    url: "https://pubmed.ncbi.nlm.nih.gov/16719566/"
  - label: "PubMed: meta-analysis of testing versus restudying"
    url: "https://pubmed.ncbi.nlm.nih.gov/25150680/"
---

## Rereading is not always remembering

When you review familiar code, it can seem as if you know it because you recognize the words. To check, close the material and try to reconstruct the idea: explain what a function does, predict an output, or find a bug without looking at the answer. This retrieval practice gives you evidence about what you can remember; afterward, comparing with a correct source lets you repair gaps. It is not an exam to grade yourself, but a way to guide the next review.

Research on learning has studied retrieval practice and spacing between sessions. A meta-analysis comparing tests with restudy found that the effort of retrieval and the type of test affect the benefit of trying to remember. Another, on distributed practice, concluded that the most useful interval depends on how long it is until the final test: the further away that test is, the longer the space between sessions may be. These studies synthesize many experiments, but they do not establish a universal schedule or prove that one specific plan works the same way for every programmer. The plan below is therefore a starting point to adjust based on your experience and available time.

## Design questions for real work

When programming, you do not need to memorize every line of a library. It is more useful to recall concepts and decisions: when an empty list appears, why input should be validated, what distinguishes a query from a mutation, how to read an error, or which test protects a rule. Keep exact syntax details in reference documentation; use cards to understand the pattern and know when to look something up.

Prepare cards with one question and a short answer on the back. Alternate among four formats:

- **Explain:** “Why can `return` inside a loop end the function too early?”
- **Predict:** “If `pendientes` filters tasks where `hecha == False`, what does it return for an empty list?”
- **Debug:** “Which edge case is missing from this title validation?”
- **Transfer:** “How would the rule change if tasks are loaded from JSON and the field may be missing?”

Transfer questions connect recall to new examples; a card that asks you to repeat an exact definition may be useful, but by itself it does not show that you can apply the idea.

## Activity: six cards and four reviews

1. Choose a topic you studied this week, such as functions and conditionals. Spend five minutes writing, without notes, everything you can explain about it.
2. Review the material and mark concepts as correct, incomplete, or incorrect. For each gap, create a short card; prepare six questions in different formats, not six copies of the same definition.
3. Try to answer now with the material closed. Then check the answer and write a correction in your own words. Do not mark an answer as “known” if you only recognized it when you saw it.
4. Schedule a first review for the next day, another a few days later, another a week later, and another two weeks later. If you miss a question, consult the source, understand the error, and review it sooner; if you answer easily in several sessions, space it out further.
5. Mix older and newer cards in each session. Finish with a different example: modify a function or predict an edge case that was not on the card.
6. Record the date, result—without help, with a hint, or missed—and the next review. If the plan accumulates too many cards, remove duplicates and prioritize concepts you actually need.

You can complete the activity with paper cards or a local file, without installing an app, using AI, or paying for a platform. The practice is useful even if the interval is not identical for everyone; the important thing is to leave time between attempts and actively try to remember again.

## Validation and common mistakes

After two weeks, choose three cards at random and answer before looking. Then explain one of them using a new example. Useful evidence is remembering the rule and applying it correctly, not counting how many times you read the answer. If you miss one, categorize the reason: ambiguous question, concept not understood, interval too long, or confusion with a related idea. Adjust the material; do not turn ordinary forgetting into a judgment about your ability.

Common mistakes include rereading the card before trying to remember, writing questions that contain the answer, studying for ten minutes many times in a row without spacing, failing to correct a wrong answer, and scheduling so many reviews that the system becomes impossible to maintain. Also avoid memorizing long code snippets when what you need is to recognize the rule, consult the API, and test the behavior.

## Wrap-up

Remember in order to use, not recite. Write small questions, try to answer without looking, check against a reliable source, record mistakes, and practice again after a pause. The expected result is more accessible memory and a better ability to explain decisions; cards complement real programming, they do not replace it.
