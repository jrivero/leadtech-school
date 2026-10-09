---
title: "Practicing a Technical Interview with and without AI"
description: "Practice solving technical problems first without assistance and then with AI as an interviewer, improving clarity, testing, and judgment without relying on copied answers."
module: "14-del-proyecto-a-una-oportunidad"
order: 2
duration: 50
level: "Intermediate"
objectives:
  - "Follow an observable sequence for approaching a technical problem out loud."
  - "Use AI as a practice partner without asking it to solve the challenge."
  - "Evaluate a solution for clarity, correctness, edge cases, and explanation."
prerequisites:
  - "Be able to solve simple problems with functions and collections."
updatedDate: "2026-10-08"
sources:
  - label: "UT Austin Career Services: preparing for technical interviews"
    url: "https://careerservices.cns.utexas.edu/resources/interviews/technical-interviews"
  - label: "Official Python tutorial: data structures"
    url: "https://docs.python.org/3/tutorial/datastructures.html"
---

## The goal is to show how you reason

A technical interview may include conversation, coding exercises, or questions about projects; the format and criteria depend on the role and organization. Practice does not guarantee a job offer. It can help you communicate how you understand a problem, choose a solution, and revise an idea when a counterexample appears. UT Austin Career Services recommends explaining the process, not just giving a final answer.

Use two separate rounds. In the first, work without AI, as if you were in a real session: read the prompt, ask about ambiguities, suggest examples, describe a plan, implement, and test. In the second, ask AI to act as the interviewer, ask a clarifying question, or point out a case you have not tested yet. Do not ask it to write the complete solution, and do not use unauthorized assistance during a real assessment.

## Guided exercise: remove duplicates while preserving order

Prompt: receive a list of integers and return another list without repetitions, keeping the first occurrence of each value. Before writing code, confirm with an example: `[3, 1, 3, 2, 1]` should produce `[3, 1, 2]`. Ask whether the elements are always integers and whether order matters. For this exercise, assume integers and preserve their order.

Explain the plan: iterate over the list, keep a set of values already seen, and add each value to the output only the first time it appears. Then implement:

```python
def sin_repetidos(valores):
    vistos = set()
    resultado = []
    for valor in valores:
        if valor not in vistos:
            vistos.add(valor)
            resultado.append(valor)
    return resultado
```

Test an empty list, a list with no duplicates, and one where all elements are the same. On average, the set allows membership to be checked quickly; you iterate over each element once, with expected linear time and additional memory proportional to the number of unique values. Clarify that this version assumes values can be stored in a set, such as integers or strings.

## Two ways to practice

**Round without AI:** set a limit of twelve minutes, but do not skip clarifying the contract. Say what you know, give an example, and explain why the set does not determine the output order; the list preserves that order. If you get stuck, say what information you need or what simple alternative you would try. At the end, manually run the edge cases.

**Round with AI:** paste only the prompt and ask: “Act as the interviewer. Do not write code or give me the solution; ask one clarifying question and wait for my answer.” After implementing, ask it to suggest a counterexample, not replace your code. Check whether the case really fails and test it yourself. End the conversation and try to solve a similar problem without help the next day; that way, you check what knowledge you can recall on your own.

## Step-by-step practice

1. Record an answer without AI: read the exercise and narrate your plan before coding.
2. Note the questions you should have asked and the assumptions you chose.
3. Run the solution with an empty list, unique values, and repeated values.
4. Repeat with AI as an interviewer, requesting one hint at a time.
5. Make only changes you can explain and support with a test.
6. The next day, solve a variation without opening the previous conversation.

## Self-assessment rubric

Give yourself zero to two points in five areas: I clarified the contract and inputs; I explained a plan before coding; the solution meets the expected outcome; I tested boundaries and counterexamples; I communicated complexity and limitations. A zero means evidence is missing, one means you did it partially, and two means you can demonstrate it with an example. The total helps you choose what to practice; it does not predict the outcome of a hiring process.

## Common mistakes

Do not start coding while the prompt still allows different interpretations. Do not confuse code that compiles with a correct answer. Do not memorize AI responses or use a tool during an assessment if it is not allowed. If you cannot explain a suggested line, replace it with a version you understand and test it again.

## Summary

Practice the sequence: clarify, give an example, plan, implement, test, and explain. Compare an independent round with an assisted one, and choose the next skill to improve based on concrete evidence, not on the feeling that you are finished.
