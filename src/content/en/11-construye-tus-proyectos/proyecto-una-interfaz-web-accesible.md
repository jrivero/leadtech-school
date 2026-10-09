---
title: "Project: an Accessible Web Interface"
description: "Design a task list with semantic HTML and evaluate keyboard use, focus, labels, and contrast, using WCAG 2.2 as a verifiable guide."
module: "11-construye-tus-proyectos"
order: 1
duration: 120
level: "Intermediate"
objectives:
  - "Organize an interactive list with semantic HTML and native controls."
  - "Check keyboard use, labels, errors, and contrast with a test checklist."
  - "Distinguish evidence for WCAG 2.2 criteria from a claim of full conformance."
prerequisites:
  - "Basic HTML, CSS, and JavaScript."
  - "Basic use of a terminal and browser."
updatedDate: '2026-10-08'
sources:
  - label: "W3C — WCAG 2.2"
    url: "https://www.w3.org/TR/WCAG22/"
---

## Project brief

A neighborhood association is preparing a clean-up day and needs a page to coordinate tasks: add one, mark it done, and delete it. Some people will navigate using only a keyboard, magnify the screen, or use a screen reader. The challenge is not decorating a card, but making each action, error, and task status understandable. Work as a local prototype: there are no accounts, personal data, or server.

## Minimum scope

Build a single view with native HTML, CSS, and JavaScript; you do not need a framework or external service. Include a clear heading, a visible label and text field, an add button, a list, and controls to complete or delete each task. Also design empty-list, completed-task, invalid-input, and successful-add states. Keep items in memory only: they may disappear when the page reloads. Persistence is optional and should not distract from accessibility. This project connects the verifiable requirements and HTML/JavaScript from earlier modules with quality work: turn each criterion into an observable test. If you ask an AI assistant to suggest the structure, give it the brief and request a small change; review the markup, focus, and messages yourself before accepting the result.

## Step-by-step plan

1. **Define tests before styling.** Write three flows: add a task, complete it, and delete it. Add cases for submitting the form empty and for a list with no items. For each flow, note what the person should see and hear.
2. **Build the structure.** Use meaningful regions and headings, a label associated with the field, and real buttons. An initial pattern could be `<label for="nueva-tarea">Nueva tarea</label>` alongside `<input id="nueva-tarea" name="tarea">`. Do not use the field's example text as a substitute for its label.
3. **Implement the actions.** On submission, trim spaces and reject an empty string with a text message near the field. Display tasks in a list; use a labeled checkbox to change its status and a clearly named button to delete it. Preserve the task text instead of communicating a change through color alone.
4. **Apply styles and test.** Keep a visible focus indicator, good contrast, natural reading order, and controls that are easy to press. Use `Tab` and `Shift+Tab` to move through the page; use `Enter` or `Space` to activate controls. Check that there are no keyboard traps. Zoom the browser to 200% and narrow the window: the content and actions should remain available.
5. **Record evidence.** Check colors with a free tool or the browser's tools. For normal text, subject to the criterion's exceptions, WCAG 2.2 AA sets a minimum contrast ratio of 4.5:1 as a reference; for large text, 3:1. Repeat the test with a completed task and with the error visible.

## Deliverables and acceptance criteria

Submit `index.html`, `styles.css`, `app.js`, and a brief checklist of checks with their results and methods. The prototype is accepted if tasks can be added, completed, and deleted with a mouse and keyboard; focus is always distinguishable; each input has a label; errors are explained in text; status is not communicated by color alone; and text contrast meets the stated goal. Also record the width or zoom level at which you reviewed the design so another person can repeat it.

## Suggested solution and common errors

Prefer native HTML elements before adding ARIA attributes: a form, label, checkbox, and button already communicate purpose and behavior to the browser. Keep focus visible with a `:focus-visible` style and use a discreet status region to announce “Task added” or the error. An automated check can flag problems, but by itself does not demonstrate that every guideline is met: manually verify keyboard use, reading order, and messages.

Common mistakes include using only `placeholder` as a label; turning a `div` into a button without keyboard support; removing the focus outline; marking “done” only in green; or testing only with a mouse and a fully populated list. Review with empty, long, and short values. This exercise is not a professional audit or WCAG certification; before publishing a real product, expand the tests, review all flows, and consult people with different access needs.
