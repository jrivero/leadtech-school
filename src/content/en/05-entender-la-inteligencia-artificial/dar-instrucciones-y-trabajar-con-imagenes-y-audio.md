---
title: "Giving Instructions and Working with Images and Audio"
description: "Structure verifiable prompts for text, images, and audio; try a Whisper-style transcription and a visual option without exposing real data."
module: "05-entender-la-inteligencia-artificial"
order: 3
duration: 35
level: "Beginner"
objectives:
  - "Write instructions that separate the task, context, limits, format, and handling of uncertainty."
  - "Recognize possible errors when analyzing images, generating visual content, or transcribing audio."
  - "Evaluate a multimodal output against its original material and protect data and rights."
prerequisites:
  - "como-funciona-la-ia-generativa"
updatedDate: '2026-10-08'
sources:
  - label: "OpenAI: audio transcription guide"
    url: "https://developers.openai.com/api/docs/guides/transcription"
  - label: "OpenAI: images and vision"
    url: "https://developers.openai.com/api/docs/guides/images-vision"
  - label: "Magnific, formerly Freepik: official AI documentation"
    url: "https://www.freepik.com/ai/docs"
---

## Core Idea — Conceptual Explanation

A useful instruction specifies five things: the task, the necessary context, the limits, the expected format, and what to do if information is missing. “Extract the name and time from this fictional poster; return a table; write ‘illegible’ if you cannot make out a detail” is easier to verify than “look at this.” A detailed instruction reduces ambiguity, but it does not make the answer an exact measurement or fix an input that does not contain the information.

With **multimodality**, an application can receive text, images, or audio, and some combine more than one type of input. The handling depends on the specific model and product. A blurry or rotated image, or one with small print, may be read incorrectly. Audio with noise, accents, multiple voices, or proper names may produce an incomplete transcript. Generating an image is a different task from describing an existing image: do not use a generated result as evidence of what was in a photograph.

Whisper is the well-known name of an OpenAI speech-recognition technology, and the official transcription documentation describes model options and outputs that may change over time. A transcript can be useful as a draft, subtitle, or index for finding moments; it does not prove that every word is correct. For critical information—for example, an amount, a quotation, or a medical instruction—check the original recording and use an appropriate process.

The historical reference mentions Freepik. Its official pages currently present the AI brand as **Magnific**; do not assume that the name, features, access terms, or availability are the same as in an old tutorial. For any visual generator, review the current terms and the rights to material you submit or publish. Do not upload other people's faces, documents, or work content without permission.

## Concrete Example

Prepare an invented poster with two activities and their times, and a voice note of yourself reading them aloud. The task is not to “understand the event,” but to extract four specific fields. If the system turns “16:15” into “16:50,” the sentence may still sound convincing; the source of truth remains the poster and recording. If you generate a new poster image in Magnific, manually check that its text is legible: visual generators can distort letters.

## Guided Practice — Step-by-Step

1. Draw a card with invented details and record your own voice reading it. Do not use other people's voices or an organization's materials.
2. Write the prompt with a task, fields, format, and abstention rule: ask for “not stated” or “illegible” instead of a guess.
3. If you have an image-analysis feature, submit the fictional card. If you have access to a transcription tool compatible with Whisper, process the recording separately. Check the current documentation to see which options the specific tool supports; do not copy parameters or code from an outdated tutorial.
4. To explore visual generation, describe a simple original image—for example, an illustration of an empty library—in Magnific if the feature is available. Do not request a real person or someone else's brand.
5. Compare each transcribed detail with the audio and each visual reading with the poster. Record correct answers, omissions, and ambiguous cases; do not silently choose the most convenient interpretation.

This is an evaluation recipe that does not require an API. If you do not have access to those features, you can prepare the inputs, write sample answers, and practice checking them manually. Do not create an account, key, or subscription just to finish the exercise.

## Validation and Troubleshooting

Check each field against an identifiable part of the source: a line on the poster or a moment in the recording. If it fails, first examine noise, framing, resolution, language, and prompt clarity. Repeat the test while changing one condition only. If the detail remains ambiguous, preserve the uncertainty in the output. Before submitting content, check whether processing is remote or local and whether you have permission to share it.

## Common Mistakes

- Confusing a clear instruction with a guarantee of accuracy.
- Treating an automatic transcript as a verbatim record without reviewing it.
- Using an image generator to reproduce small text and assuming it will spell everything correctly.
- Following a tutorial that calls a current feature Freepik without checking its name and terms.
- Uploading real images, audio, voices, or documents for convenience.

## In Summary

Define the task and format, specify how uncertainty should be reported, and keep the original as evidence. Whisper and Magnific can help explore audio and image tasks, but their features and access should be confirmed in current documentation. Human validation and permission to use the material remain part of the work.
