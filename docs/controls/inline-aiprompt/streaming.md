---
title: Streaming
page_title: jQuery InlineAIPrompt Documentation - InlineAIPrompt Streaming
description: "Learn how to implement real-time AI response streaming with Kendo UI for Kendo UI for jQuery's InlineAIPrompt component."
slug: streaming_inlineaiprompt
position: 10
---

# Streaming AI Responses with InlineAIPrompt

The Kendo UI for jQuery InlineAIPrompt component supports streaming responses, allowing users to see AI-generated content as it is being produced. This feature enhances the user experience by providing immediate feedback and a more interactive interface.

Streaming is particularly useful when:

- Working with long-form AI responses that take several seconds to generate.
- Creating inline editing interfaces where users expect real-time feedback.
- Integrating with AI services that support chunked responses.
- Enhancing user engagement in contextual AI assistance scenarios.


## Configuration

To enable streaming in the InlineAIPrompt component, follow these steps:


1. Enable the [`isStreaming`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/inlineaiprompt/configuration/isstreaming) property of the InlineAIPrompt. This property controls whether the component displays the **Stop Generation** button and indicates that a response is being streamed.

    ```js
    $("#inlineaiprompt").kendoInlineAIPrompt({
        isStreaming: true
    })
    ```


1. Handle the [`promptRequest`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/inlineaiprompt/events/promptrequest) event to start streaming. When the user clicks the **Send** button or presses Enter, the `promptRequest` event is fired.

    ```js
    promptRequest: async function(ev) {
        const inlineAiPromptInstance = this;
        if (ev.prompt && ev.prompt.trim()) {
            // handle the prompt and use it to start the streaming
        } else {
            console.log("Prompt is empty, not sending request.");
        }
    },
    ```


1. Utilize the [`startStreaming`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/inlineaiprompt/methods/startstreaming), [`stopStreaming`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/inlineaiprompt/methods/stopstreaming) methods to start and stop the prompt animation for streaming. To update the prompt output content, use the [`updatePromptOutputContent`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/inlineaiprompt/methods/updatepromptoutputcontent)

    ```js
    promptRequest: async function(ev) {
        const inlineAiPromptInstance = this;
        if (ev.prompt && ev.prompt.trim()) {
            const promptText = ev.prompt.trim();
            const currentOutputId = kendo.guid();
            try {
                const finalText = await apiClient.sendMessage(promptText, {
                    onStart: (data) => {
                        inlineAiPromptInstance.startStreaming();
                    },
                    onProgress: (accumulatedText, data) => {
                        inlineAiPromptInstance.updatePromptOutputContent(accumulatedText);
                    },
                    onComplete: (finalText, data) => {
                        inlineAiPromptInstance.stopStreaming();
                    }
                });
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log("Prompt is empty, not sending request.");
        }
    },
    ```


## See Also

* [Streaming Demo of the InlineAIPrompt](https://demos.telerik.com/kendo-ui/inline-aiprompt/streaming)
* [JavaScript API Reference of the InlineAIPrompt](/api/javascript/ui/inlineaiprompt)
