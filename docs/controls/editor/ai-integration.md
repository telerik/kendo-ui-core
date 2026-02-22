---
title: AI Integration
page_title: jQuery Editor Documentation - AI Integration
description: "Get familiar with the AI capabilities of the Kendo UI for jQuery Editor."
components: ["editor"]
slug: ai_integration_kendoui_editor
position: 15
---

# AI Integration Tool

The AI Integration Tool in the Kendo UI for jQuery Editor leverages advanced AI capabilities to assist users in creating and editing content more efficiently. This tool provides features such as:

* Content Suggestions: Automatically generate text suggestions based on the context of the content being written.
* Grammar and Spell Checking: Identify and correct grammatical errors and typos in real-time.
* Text Summarization: Summarize lengthy content into concise and readable formats.
* Translation Assistance: Translate text into multiple languages directly within the editor.
* Tone Adjustment: Modify the tone of the content to match the desired style, such as formal, casual, or persuasive.

The AI integration in the Editor is designed to enhance productivity, reduce manual effort, and ensure high-quality content creation. The AI Integration Tool can be customized and extended to meet specific user requirements, making it a versatile addition to the Kendo UI for jQuery Editor.

## Using the AIPrompt Component

The Editor provides a built-in integration with the [AIPrompt component]({% slug overview_kendoui_aiprompt_component %}) to help users apply AI-driven suggestions and completions to their Editor.

The integration with the AIPrompt component covers the following use cases:

* Standalone prompting - The user can ask the AIPrompt without any context provided by the Editor. This could be useful for idea generation, writing a whole piece of content (blog post), or just random questions.
* Prompting with context - The user prompt will use additional context from the Editor (the UI allows the user to decide whether to use the selected text, if any, or the whole content).
* Command with context - The user can select a command that will be applied to the selected content (if any) or the whole content if no text is selected.

To configure the AI Integration Tool, utilize the [`ai`](/api/javascript/ui/editor/configuration/ai) configuration object. It allows you to define various settings, including establishing a connection between the Editor and the remote service responsible for generating AI-driven responses. You can also define various commands, or the options for the integrated AIPrompt component.

## Using the Inline Prompt

The Editor provides a built-in integration with an inline prompt component to help users add AI-driven suggestions and completions to their Editor.

The inline prompt displays inside a Popup which appears when the user selects text in the Editor. Once enabled, each command prompt will work only with this selected context. The result appears in the card and can be replaced or appended directly inside the Editor, or discarded if the result is not good.

The Inline prompt will automatically appear and it will align its top left corner with the bottom left corner of the selection.

The integration with the Inline Prompt covers the following use cases:

* Prompting with context - The user prompt will use the selected text in the Editor as additional context.
* Command with context - The user will run a command that will be applied to the selected content.

To enable the inline prompt, set the [`ai.inlineAIPrompt`] option to `true`. The inline prompt will then use the same service and commands as the AIPrompt. 

## See Also

* [AI Integration in the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/ai-integration)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
