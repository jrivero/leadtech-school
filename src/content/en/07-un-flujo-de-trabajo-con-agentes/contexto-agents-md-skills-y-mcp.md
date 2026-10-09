---
title: "Context, AGENTS.md, Skills, and MCP"
description: "Separate repository instructions, reusable procedures, and MCP connections to give an agent useful context without granting indiscriminate access."
module: "07-un-flujo-de-trabajo-con-agentes"
order: 2
duration: 40
level: "Intermediate"
objectives:
  - "Explain what problem AGENTS.md solves and how to keep its instructions specific."
  - "Distinguish a reusable skill from general repository instructions."
  - "Classify MCP resources, prompts, and tools, and review their permissions."
prerequisites:
  - "Know how to navigate a repository's folders and documentation."
  - "Understand that a tool can read or modify data."
updatedDate: '2026-10-08'
sources:
  - label: "AGENTS.md: Open format for agent instructions"
    url: "https://agents.md/"
  - label: "Agent Skills: description and format"
    url: "https://agentskills.io/"
  - label: "Model Context Protocol: architecture and primitives"
    url: "https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture"
---

## Three pieces, three responsibilities

An agent's context is not a bucket of text into which the entire repository should be dumped. It should include information that changes a decision: project structure, conventions, boundaries, and verification criteria. Three related but distinct mechanisms help organize it: `AGENTS.md` documents how to work in a repository; a skill packages a procedure that is activated when relevant; MCP connects an application to external tools or sources through a shared protocol.

`AGENTS.md` is ordinary Markdown, not a configuration language with required fields. It can explain how to get started, which tests to run, which folders not to touch, and which security checks to remember. The format's own documentation suggests using nested files to tailor instructions to subprojects; exact precedence can vary between tools, so check the behavior of the client you use. A short, precise, up-to-date file usually provides better guidance than an extensive policy full of conflicting exceptions.

A skill is a directory with a `SKILL.md` file describing when and how to follow a procedure. The open format allows metadata, instructions, and—if needed—references or scripts. One benefit of organizing material this way is that detailed steps can be loaded when a task needs them, rather than necessarily in every conversation. For example, a skill named `revisar-migracion` could explain how to inspect a schema and which checklist to complete, but it should not conceal an instruction to publish changes without review.

MCP, the Model Context Protocol, is an open standard that lets AI applications connect to external systems. Its primitives include **resources** for providing context, reusable **prompts**, and **tools** that can perform actions or queries. The “MCP” label does not make a connection safe: a tool for writing, sending, or deleting needs boundaries, confirmation where appropriate, and a reviewed source of trust. Always distinguish what the model can suggest from what a tool can actually execute.

## Example: preparing a migration

In a library repository, `AGENTS.md` might say that migrations require a round-trip test and that production data must not be used. A skill named `revisar-migracion` might describe the order of analysis, change, testing, and documentation updates. An MCP server could expose the development schema as a resource and provide a tool to query the local version. Querying the schema is read-only; applying a migration changes state. Do not grant both capabilities the same permission just because they are part of the same workflow.

Conflicting instructions and untrusted content also need consideration. A comment in a file or a remote result may contain text that looks like an instruction to the agent. The responsible person decides which instructions govern the project and which data is merely material to analyze. No context file should ask for credentials to be copied or a safeguard to be disabled to complete a task.

## Step-by-step activity

1. Choose a safe, repeatable task, such as checking the format of a fictional CSV file.
2. Note which rules apply to the whole project and which are just steps for that task.
3. Draft three lines for `AGENTS.md`: how to run a real check, which convention to follow, and which action is out of scope.
4. Sketch a skill with a name and description that say when to activate it; add steps only for the specific procedure.
5. Draw a hypothetical MCP connection and classify each capability as a read-only resource, prompt, or tool with effects.
6. For each tool, write down the minimum permission it needs and what confirmation would prevent an accidental change.

## Check

Your design is coherent if the general instructions do not repeat the full procedure, the skill can be reused without inventing project rules, and the connection makes clear which operation changes data. One possible solution: `AGENTS.md` contains repository boundaries and tests; the skill contains a CSV-validation recipe; MCP offers only a resource with fictional data and exposes no write tool. If you cannot name a use that justifies MCP, there is no need to add it.

## Common mistakes

- **Turning `AGENTS.md` into an encyclopedia.** Keep stable decisions and link to more detailed documentation.
- **Treating `SKILL.md` as permanent permission.** It describes a procedure; it does not replace client controls.
- **Assuming every MCP capability is read-only.** Classify tools by their effects and limit their credentials.
- **Copying instructions from a source without checking them.** A file you read may contain malicious or outdated content; compare it with the project's rules.
- **Expecting every agent to interpret folders the same way.** Check how your specific client discovers and prioritizes files.

## Summary

Use `AGENTS.md` to guide work in a repository, skills for procedures that can be activated as needed, and MCP to connect systems through explicit capabilities. Keep each piece small, understandable, and reviewable. Separate reading from writing and grant only necessary permissions; interoperability is not the same as trust.
