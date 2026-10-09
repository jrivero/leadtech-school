---
title: "Privacy, Bias, and Responsible Use"
description: "Identify privacy, bias, and misuse risks, and learn to review regulatory frameworks without substituting for professional advice."
module: "05-entender-la-inteligencia-artificial"
order: 6
duration: 35
level: "Beginner"
objectives:
  - "Classify data by sensitivity and reduce shared information to what is necessary."
  - "Design tests that reveal unequal errors and assign human review according to impact."
  - "Recognize the AI Act as a regulatory framework and consult official sources without interpreting obligations on your own."
prerequisites:
  - "que-es-la-ia-y-que-no-es"
  - "como-funciona-la-ia-generativa"
updatedDate: '2026-10-08'
sources:
  - label: "NIST: AI Risk Management Framework"
    url: "https://www.nist.gov/itl/ai-risk-management-framework"
  - label: "NIST: generative AI risk profile"
    url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf"
  - label: "European Commission: regulatory framework for artificial intelligence"
    url: "https://digital-strategy.ec.europa.eu/es/policies/regulatory-framework-ai"
  - label: "EUR-Lex: European Artificial Intelligence Act"
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
---

## Core Idea — Conceptual Explanation

Responsible AI use begins before you write an instruction. Identify what data would be involved: public information, personal data, confidential work information, or particularly sensitive data. Then check the service terms and your organization's policy. “The tool seems private” does not prove where a request is processed, how long it is retained, or who can access it. Reducing the input to what is essential lowers exposure, but removing a name does not always anonymize someone if identifiable details remain.

Bias is not just an offensive sentence. It can arise when examples underrepresent certain groups, a category is poorly defined, or performance varies by language, accent, or context. A correct average can hide errors concentrated in particular groups. Prepare varied cases and record what kind of error occurs, whom it might affect, and whether the person can correct it. The NIST AI Risk Management Framework offers guidance for managing risks; it is a working framework, not an approval seal or legal advice.

In the European Union, the Artificial Intelligence Act—the AI Act—establishes obligations related to the uses, risks, and roles of those who develop, distribute, or use systems. As of October 8, 2026, the European Commission says the Regulation has applied since August 2, 2026, with exceptions: prohibitions and AI literacy have applied since February 2, 2025; governance rules and rules for general-purpose AI models since August 2, 2025; certain high-risk obligations under Annex III since December 2, 2027; and obligations for systems embedded in products regulated under Annex I since August 2, 2028. The Commission and EUR-Lex publish the summary and legal text. The timeline does not determine whether a case complies with the law: obligations depend on the category and context. This lesson is educational, not legal advice or authorization to deploy a system.

The level of care should correspond to the consequences. A tool that suggests labels for an invented collection does not carry the same risk as a system that affects employment, credit, health, or access to services. In important decisions, an automated output does not replace professional judgment, people's rights, or the organization's responsibilities.

## Concrete Example

An association wants to summarize customer comments to find recurring themes. If it pastes names, phone numbers, and identifiable complaints into an external tool, it shares more than necessary. It can start with fictional comments or data transformed with authorization. Then it checks whether the summaries ignore comments in another language or label language it does not understand as “neutral.” The summary helps organize the reading; a person checks the quotations and decides what conclusion to communicate.

## Guided Practice — Step-by-Step

1. Choose a low-impact task and write down which decision it will help make. If a wrong answer could harm someone, do not use that case as an initial experiment.
2. List the data the tool would require and classify it. Remove names, identifiers, credentials, health information, and nonessential internal content.
3. Check your team's policy and the service documentation to find out whether the tool is authorized and how it handles inputs. If you cannot confirm this, do not upload real data.
4. Prepare varied fictional cases, including edge cases and different ways of expressing the same idea. Define in advance what counts as an error and who will review the outputs.
5. For a regulatory question, record the intended use, your country, and the date, then consult the European Commission, EUR-Lex, or qualified counsel; do not infer an obligation from a commercial label alone.

## Validation and Troubleshooting

Compare the outputs with criteria defined before the test. Look not only at total errors, but at who bears them and whether a person can appeal or correct a result. If a disparity appears, stop using the system for real decisions, analyze the cause with qualified people, and repeat the tests after making corrections. If you cannot explain where the information comes from, limit the system to a draft. Reassess when the data, provider, or intended use changes.

## Common Mistakes

- Pasting real data “just to test” into an unauthorized account or service.
- Believing that removing a name always anonymizes data or that local execution eliminates every risk.
- Treating a neutral tone as proof that a decision is not discriminatory.
- Confusing voluntary guidance, a summary page, and the applicable legal text.
- Assuming a reviewer can correct harm without the time, information, or authority to stop the process.

## In Summary

Minimize data, verify permissions, test for errors across groups, and adapt oversight to the impact. Use official sources to understand the regulatory framework, but seek qualified advice to apply it to a case. If data handling, representativeness, or consequences are unclear, reduce the scope or pause the test.
