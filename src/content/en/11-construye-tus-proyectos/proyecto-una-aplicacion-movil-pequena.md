---
title: "Project: a Small Mobile App"
description: "Build a mobile errands list with Expo and React Native: add, change status, and delete items, with accessible controls and device or emulator testing."
module: "11-construye-tus-proyectos"
order: 3
duration: 150
level: "Intermediate"
objectives:
  - "Model an errands list with React Native components and state."
  - "Implement adding, completing, and deleting items on an Expo screen."
  - "Verify accessible names, states, and flows on an emulator or device."
prerequisites:
  - "Basic JavaScript and familiarity with React Native components."
  - "Basic use of the terminal."
updatedDate: '2026-10-08'
sources:
  - label: "Expo — Create your first app"
    url: "https://docs.expo.dev/tutorial/create-your-first-app/"
  - label: "React Native — Accessibility"
    url: "https://reactnative.dev/docs/accessibility"
---

## Project brief

Create a small app for preparing the day's errands: a person can enter an item, add it, mark it complete, and delete it. The value lies in a short flow that is clear on one screen, not in accumulating features. The app must work without signing in and keep data only for the current session.

## Minimum scope

Use Expo and basic React Native components. One screen is enough: a title, text field, add button, scrollable list, empty state, and per-item controls. Model each errand with an ID, text, and a `done` boolean. Do not include an account, cloud, geolocation, notifications, payments, or a database. The list may reset when the app closes or reloads; making that limitation clear is part of the prototype. Avoid adding UI libraries: start with the controls included in the template. This is the mobile continuation of the cycle already practiced: observable requirement, component, test, and evidence. You can ask an AI assistant for a scoped change, such as adding the empty state from the criteria; check that it does not replace native controls with inaccessible visual elements, and test the result in Expo.

## Step-by-step plan

1. **Prepare the learning environment.** In a new project, follow the official Expo tutorial; its start command is `npx create-expo-app@latest lista-del-dia`. Then enter the folder (`cd lista-del-dia`) and run `npx expo start`. The first command creates a new project and downloads its template and dependencies; the second starts the development server. The official tutorial explains the options for testing with Expo Go or an emulator. You do not need to publish the app or pay for a cloud service for this prototype.
2. **Sketch the states.** Decide what happens with an empty list, entered text, an empty-text error, a pending errand, a completed errand, and deletion. Keep a single source of truth: a React state containing the errands array.
3. **Build the interaction.** Use `TextInput` to capture text, `Pressable` or `Button` to add it, and `FlatList` to display items. Trim whitespace before creating an item; generate the ID on the device; when completing or deleting, produce an updated array instead of mutating the original state.
4. **Add accessible names and states.** Assign an understandable label to the field and each action. For example, a row button could announce “Complete Buy milk”; also communicate whether it is checked. Keep visible labels and sufficiently large controls, and do not rely only on color or an unnamed icon to explain the state.
5. **Check it in context.** Start Expo, open the app in an available emulator or test device, and go through the flow with a screen reader (TalkBack or VoiceOver if available). Try an empty list, long text, orientation change if the emulator allows it, and several rows. Record observed differences between platforms instead of assuming they behave the same.

## Deliverables and acceptance criteria

Submit the main screen, a note with startup steps, and a list of repeatable tests. It is accepted if errands can be added, completed, and deleted; an empty submission does not create a row and explains what is missing; the empty list has a useful message; each action is announced with its name and purpose; completion status can be understood without distinguishing a color; and controls do not become hidden when there are multiple items. Record the device or emulator used and the environment version so the test can be repeated.

## Suggested solution and common errors

Keep operations in small functions: `addTask`, `toggleTask(id)`, and `removeTask(id)`. To complete a task, use a transformation such as `tasks.map(...)`; to delete it, use `tasks.filter(...)`. In React Native, `accessibilityLabel`, `accessibilityRole`, and `accessibilityState` help describe controls; verify what the screen reader actually announces, because the experience may differ between Android and iOS. Do not routinely add attributes to every element if the visible text and native control are already clear.

Common mistakes include mutating the array and not seeing the render update; reusing indexes as IDs; leaving buttons that show only an icon; omitting an empty state; or testing only in the web browser. The project does not persist errands, cover every screen size, or undergo app-store, privacy, performance, or security review. Before distributing it, design persistence, accessibility tests on more devices, and a review of each platform's requirements.
