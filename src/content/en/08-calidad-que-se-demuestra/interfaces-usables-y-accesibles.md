---
title: "Usable and Accessible Interfaces"
description: "Design an understandable form with keyboard access, labels, and clear errors, and combine manual review with WCAG criteria without promising automatic conformance."
module: "08-calidad-que-se-demuestra"
order: 7
duration: 40
level: "Intermediate"
objectives:
  - "Relate a user task to understandable labels, structure, and feedback."
  - "Review a keyboard interaction and check how an error is handled."
  - "Use WCAG 2.2 as a reference without confusing an automated scanner with a complete evaluation."
prerequisites:
  - "Know basic HTML and forms."
  - "Be able to navigate a page using a keyboard and mouse."
updatedDate: '2026-10-08'
sources:
  - label: "W3C: Web Content Accessibility Guidelines (WCAG) 2.2"
    url: "https://www.w3.org/TR/WCAG22/"
  - label: "Playwright: locators by role and label"
    url: "https://playwright.dev/docs/locators"
---

## The user's task guides the interface

A usable interface helps people understand what to do, recognize the current state, and recover when something goes wrong. Accessibility prevents interaction from depending exclusively on one sensory ability or input device. Neither is a decorative layer or a single HTML attribute. Semantic structure, focus order, labels, clear language, visual contrast, and error responses affect different people and should be checked in the context of the actual task.

Imagine a form for creating a task with a title and an optional date. A placeholder such as “Type here” disappears while typing and does not explain the field well. A visible label associated with the input keeps its name available; the button should have text that describes the action. When an empty title is submitted, the message needs to identify the problem and be associated with the field. If an agent or automated test cannot recognize the control by its name and role, that may indicate an accessibility problem or a fragile test—not always the same cause.

WCAG 2.2 organizes verifiable success criteria, but conformance is an assessment of applicable requirements across defined pages and processes. Passing an automated scanner alone does not prove that the experience is correct: some checks require interpretation, keyboard use, magnification, a screen reader, and content review. Nor should you claim “WCAG compliant” just because you added an `aria-label` to every element; ARIA does not replace semantic HTML when a native element already expresses the function.

## Example markup

This snippet associates a label and instructions without relying on an external service. In a real application, the error message should appear when appropriate, be announced correctly, and not rely only on color. The snippet does not validate the form on its own and is not a complete audit. Its retained Spanish labels mean `Título de la tarea` (“Task title”), `Escribe entre 1 y 80 caracteres.` (“Enter 1–80 characters”), and `Crear tarea` (“Create task”).

```html
<form>
  <label for="titulo">Título de la tarea</label>
  <p id="ayuda-titulo">Escribe entre 1 y 80 caracteres.</p>
  <input id="titulo" name="titulo" aria-describedby="ayuda-titulo">
  <button type="submit">Crear tarea</button>
</form>
```

## Step-by-step activity

1. Open a local practice interface and complete a task using only Tab, Shift+Tab, Enter, and Space.
2. Note the focus order and whether you can always see which control has focus. Check that you do not get trapped in an element.
3. Identify each field by its label, not its temporary text. Activate the button and observe how a missing value is reported.
4. Repeat with browser magnification or an available screen reader; if you do not have those tools, record that limitation rather than infer the result.
5. Check that the error message names the field and how to correct it, and that state is not communicated only through red or green.
6. If you add a Playwright test, locate controls by role and accessible name; avoid selectors that depend on visual classes unrelated to use.

## Verification and expected result

The review is complete when you can finish the journey without a mouse, perceive focus, identify every input, and understand how to correct an error. The label must remain available after typing; the button must express what will happen. Fix any barriers and repeat exactly the same steps. This manual check helps uncover barriers, but it is not equivalent to testing every WCAG 2.2 guideline or every assistive device.

Prioritize by impact: someone who cannot submit a form faces a greater barrier than a minor difference in presentation. Record the page, the criterion or principle reviewed, the environment, and the evidence. An actionable report lets someone repeat the problem and verify the fix without including personal data.

## Common mistakes

- **Using color alone to show success or an error.** Add text or an icon with an accessible name and check contrast.
- **Using a placeholder instead of a label.** Keep a visible name associated with the control.
- **Adding ARIA roles without understanding their effect.** Prefer native HTML elements and review the resulting accessibility tree.
- **Trusting an automated audit as a certificate.** Combine tools with manual checks and assessment of applicable criteria.
- **Testing only with a mouse.** Repeat actions with a keyboard and available assistive technologies.

## Summary

Usability and accessibility are checked by completing real tasks through different modes of interaction. Build with native semantics, labels, visible focus, and understandable errors; compare with WCAG 2.2 and repeat the flow after fixes. Automated tests help, but do not offer a total guarantee or replace human evaluation.
