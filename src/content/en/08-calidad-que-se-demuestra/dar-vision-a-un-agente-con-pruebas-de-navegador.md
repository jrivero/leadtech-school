---
title: "Giving an Agent Vision with Browser Tests"
description: "Use Playwright to express visible journeys with accessible locators and stable assertions, giving an agent reproducible feedback without relying on remote services."
module: "08-calidad-que-se-demuestra"
order: 11
duration: 45
level: "Intermediate"
objectives:
  - "Design a browser test for a specific task using understandable roles and names."
  - "Distinguish DOM evidence, an assertion, and a screenshot during review."
  - "Keep the journey in a local application and avoid unnecessary waits or external data."
prerequisites:
  - "Know HTML, forms, and basic automated testing."
  - "Be able to describe the visible result of an interaction."
updatedDate: '2026-10-08'
sources:
  - label: "Playwright: locator documentation"
    url: "https://playwright.dev/docs/locators"
  - label: "Playwright: assertions and auto-waiting"
    url: "https://playwright.dev/docs/test-assertions"
---

## What an agent sees in the browser

A browser test turns a human action into a repeatable journey: open a screen, enter data, activate a control, and check the visible result. Playwright offers locators by role, accessible name, label, and text to target elements as a person would. Its test assertions wait for a condition during a configured interval, which is usually more stable than pausing the browser for a fixed amount of time. Consult the documentation for the installed version because options can evolve.

The browser provides different evidence from a unit test. It can reveal that a button is not connected to the form or that state does not appear on screen. An accessibility tree exposes names and roles; a screenshot helps review visual composition; an assertion confirms one specific condition. None replaces the others: a polished image does not prove that the keyboard works, and a test that finds text does not necessarily check that the design is usable. For an agent, results should come back as bounded signals: failure, locator, relevant state, and a screenshot when it adds context.

A reliable test uses a local route, deterministic data, and a clear task. Avoid billable API calls, real authentication, content that changes every minute, and selectors based on internal classes when a user-facing name is available. Do not expose credentials so browser automation can access production. Keep the environment isolated and clear state between tests; otherwise a test may depend on what ran before it.

## Example with a local task

The following TypeScript test assumes a `demo.html` page served by the project and a structure with a `Nueva tarea` (“New task”) label, an `Añadir` (“Add”) button, and a list that displays tasks. The test enters and checks the exact text `Preparar demo` (“Prepare demo”); keep these Spanish fixture strings unchanged, or update the page and test together if you translate the interface. This is real Playwright Test code, not a standalone command: it needs the package and the project's runner configuration. It does not visit an external service.

```typescript
import { test, expect } from '@playwright/test';

test('añade una tarea a la lista', async ({ page }) => {
  await page.goto('/demo.html');
  await page.getByLabel('Nueva tarea').fill('Preparar demo');
  await page.getByRole('button', { name: 'Añadir' }).click();
  await expect(page.getByRole('list')).toContainText('Preparar demo');
});
```

The locators describe the intent: fill a field identified by its label, click a button by name, and observe a list. If `getByLabel` cannot find the control, first check whether the label is associated with it; do not immediately replace it with a fragile selector. If there are multiple lists, label the region or locate the appropriate container so the assertion does not pass because it found text somewhere else.

## Step-by-step activity

1. Write the journey before the test: initial state, action, and result a person should perceive.
2. Prepare a local page with semantic controls and visible names; use invented tasks.
3. Implement the example test or adapt its labels to the real interface. Do not add `waitForTimeout` to hide an unknown condition.
4. Run Playwright with the configuration already installed in your project. If the browser or runner is missing, stop and record that prerequisite; do not download anything without authorization.
5. Temporarily change the button's name and observe the test fail. Restore the expected name and run it again.
6. Review the result with a keyboard and screenshot; note what evidence each tool provides and what it does not check.

## Verification and solution

The test passes when the field is identified by its label, the button by its name, and the task appears in the list after the action. If it fails to locate the field, check the `<label for>` and `id` link; if it fails at the end, check whether the event updates the list or whether the test is looking in the wrong container. An assertion wait gives the interface time to respond; it does not fix a feature that fails to update state.

The local test can run without an API, account, or provider cost. The Playwright dependency and browser must already be available; installing them is a separate decision. When sharing results with an agent, remove sensitive data from screenshots, traces, and logs, and limit the session to a test environment.

## Common mistakes

- **Using `sleep` to stabilize every test.** Wait for a meaningful condition and find the cause of the slow state.
- **Selecting by position or internal class.** Prefer role, label, and accessible name when they describe the control.
- **Checking only that the page loaded.** Verify an action and the result that satisfies the requirement.
- **Interpreting a screenshot as complete proof.** Also check keyboard use, semantics, error messages, and states.
- **Automating production with real credentials.** Use fictional data and an authorized local server or isolated environment.

## Summary

Playwright can provide reproducible feedback about real browser journeys. Write task-centered tests with accessible locators and result assertions; keep data local and review semantics as well as appearance. Automation reports on the scenario that ran; it does not certify the entire interface.
