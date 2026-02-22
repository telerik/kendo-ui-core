---
title: Streaming AI Integration
page_title: Telerik UI AIPrompt Documentation - Streaming AI Integration
description: "Connect the Telerik UI for {{ site.framework }} AIPrompt to a streaming AI chat service to display AI responses in the Output view."
components: ["aiprompt"]
slug: htmlhelpers_streaming_integration_aiprompt
position: 5
---

# Streaming AI Integration

Connecting the AIPrompt component to a streaming AI chat client service is a common scenario.

In this article, you will build a practical, end-to-end example that wires the AIPrompt to a lightweight AI chat client, which opens a chat session, sends the user prompt, and streams the model's response into the Output view.

## Getting Started

To creare an AI chat serivce that connects to the AIPrompt, follow the next steps:

> The example uses a Telerik-hosted AI service for demonstration purposes only. For production applications, you can implement your own AI service that understands your specific domain, data, and business requirements.

1. Add a reference to the AI chat client script and initialize the client.

    ```JS
    <script src="~/ai-chat-service.js"></script>
    <script>
        const apiClient = new AIChatClient({
            // Replace with your AI service endpoint (for example, "https://api.yourdomain.com/ai").
            apiBaseUrl: "https://demos.telerik.com/service/v2/ai",
            defaultHeaders: { 'Content-Type': 'application/json' },
            aiId: kendo.guid()
        });
    </script>
    ```
    ```JS ai-chat-service.js
    class AIChatClient {
        constructor(config) {
            this.apiBaseUrl = config.apiBaseUrl || "https://demos.telerik.com/service/v2/ai"; // Replace with your AI service endpoint (for example, "https://api.yourdomain.com/ai").
            this.defaultHeaders = config.defaultHeaders || { 'Content-Type': 'application/json' };
            this.aiId = config.aiId || kendo.guid();
            this.currentChatId = null;
            this.controller = null;
            this.onTokenUpdate = config.onTokenUpdate || (() => { });
            this.onChatStateChange = config.onChatStateChange || (() => { });
        }
        async apiRequest(endpoint, options = {}) {
            const url = `${this.apiBaseUrl}${endpoint}`;
            const defaultOptions = { headers: this.defaultHeaders };
            const response = await fetch(url, { ...defaultOptions, ...options });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response;
        }
        async sendMessage(promptText, callbacks = {}) {
            if (!this.currentChatId) {
                await this.createNewChat();
            }
            this.controller = new AbortController();
            try {
                const response = await this.apiRequest(`/chat/${encodeURIComponent(this.currentChatId)}`, {
                    method: 'POST',
                    body: JSON.stringify(promptText),
                    signal: this.controller.signal
                });
                return await this.processStreamingResponse(response, callbacks);
            } catch (error) {
                this.handleStreamingError(error);
                throw error;
            } finally {
                this.controller = null;
            }
        }
        async createNewChat() {
            try {
                const response = await this.apiRequest('/chat/conversations', { method: 'POST' });
                const data = await response.json();
                this.currentChatId = data.chatId;
                this.onChatStateChange({ chatId: data.chatId, action: 'created' });
                return data.chatId;
            } catch (err) {
                console.error("Failed to create new chat:", err);
                throw err;
            }
        }
        async processStreamingResponse(response, callbacks = {}) {
            let buffer = "";
            let accumulatedText = "";
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            while (true) {
                const result = await reader.read();
                if (result.done) break;
                buffer += decoder.decode(result.value, { stream: !result.done });
                const lines = buffer.split("\n");
                buffer = lines.pop();
                for (const line of lines) {
                    if (line.trim()) {
                        try {
                            const data = JSON.parse(line);
                            accumulatedText = this.handleStreamingData(data, accumulatedText, callbacks);
                        } catch (e) {
                            console.error("Failed to parse streaming data:", e);
                        }
                    }
                }
            }
            return accumulatedText;
        }
        handleStreamingData(data, accumulatedText, callbacks = {}) {
            switch (data.status) {
                case "start":
                    if (callbacks.onStart) callbacks.onStart(data);
                    return "";
                case "streaming":
                    const messageContent = data.message || data.content || data.text || "";
                    accumulatedText += messageContent;
                    if (callbacks.onProgress) callbacks.onProgress(accumulatedText, data);
                    return accumulatedText;
                case "complete":
                    if (data.message && data.message.inputTokens !== undefined) {
                        this.onTokenUpdate(data.message.inputTokens, data.message.outputTokens);
                    } else if (data.inputTokens !== undefined) {
                        this.onTokenUpdate(data.inputTokens, data.outputTokens);
                    }
                    this.controller = null;
                    if (callbacks.onComplete) callbacks.onComplete(accumulatedText, data);
                    return accumulatedText;
                default:
                    return accumulatedText;
            }
        }
        handleStreamingError(error) {
            if (error.name === 'AbortError') {
                console.log('Request was aborted by user');
            } else {
                console.error('Error during streaming:', error);
            }
        }
        abortRequest() {
            if (this.controller) {
                this.controller.abort();
                this.controller = null;
            }
        }
    }
    ```

    How does the chat client work?

    * Creates a chat session (`/chat/conversations`).
    * Sends prompts (`/chat/{chatId}`).
    * Reads the stream and invokes callbacks: `onStart`, `onProgress`, `onComplete`.
    * Supports cancelling through `abortRequest()`.

1. Define the AIPrompt component and enable the built-in [SpeechToTextButton](slug:htmlhelpers_overview_speechtotextbutton) and [TextArea](slug:htmlhelpers_overview_textarea) components through the `SpeechToText()` and `PromptTextArea()` configurations.

    ```HtmlHelper
    @(Html.Kendo().AIPrompt()
        .Name("aiprompt")
        .SpeechToText(speechBtn => speechBtn
            .IntegrationMode("webSpeech")
            .Lang("en-US")
            .Continuous(false)
            .InterimResults(true)
            .MaxAlternatives(1))
        .PromptTextArea(txtArea => txtArea
            .Resize(TextAreaResize.Auto)
            .Rows(3)
            .Placeholder("Enter your prompt here...")
            .FillMode(FillMode.Outline)
            .Rounded(Rounded.Medium)
            .MaxLength(1000)
        )
        .ActiveView(0)
        .Views(views =>
        {
            views.Add().Type(ViewType.Prompt);
            views.Add().Type(ViewType.Output);
        })
    )
    ```
    {% if site.core %}
    ```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-aiprompt name="aiprompt" active-view="0">
        <speech-to-text integration-mode="webSpeech" lang="en-US" continuous="false" interim-results="true" max-alternatives="1" />
        <prompt-text-area rows="3" resize="TextAreaResize.Auto" placeholder="Enter your prompt here..." fill-mode="outline" rounded="Rounded.Medium" max-length="1000">
        </prompt-text-area>
        <aiprompt-views>
            <aiprompt-view type="ViewType.Prompt"></aiprompt-view>
            <aiprompt-view type="ViewType.Output"></aiprompt-view>
        </aiprompt-views>
    </kendo-aiprompt>
    ```
    {% endif %}

1. Handle the following AIPrompt client events:

    * `PromptRequest` event&mdash;Fires when the user clicks the **Generate** or **Retry** buttons. Within the event handler, get the submitted text (`e.prompt`) and switch to the `Output` view. Start the asynchronous call to the chat client. Provide the following callbacks:
      - `onStart`: calls `startStreaming()`;
      - `onProgress(accumulatedText)`: calls `updatePromptOutputContent(accumulatedText, currentOutputId)`;
      - `onComplete`: calls `stopStreaming()`;

    * `PromptRequestCancel` event&mdash;Triggers when the user clicks **Stop** during streaming (the prompt request is canceled). Abort the in‑flight request by calling the `apiClient.abortRequest()`, so the streaming logic calls the `stopStreaming()` method of the AIPrompt and updates the output card.

    ```HtmlHelper
    @(Html.Kendo().AIPrompt()
        .Name("aiprompt")
        .Events(events =>
        {
            events.PromptRequest("onPromptRequest");
            events.PromptRequestCancel("onPromptRequestCancel");
        })
        ... // Additional configuration.
    )
    ```
    {% if site.core %}
    ```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-aiprompt name="aiprompt" active-view="0"
        on-prompt-request="onPromptRequest"
        on-prompt-request-cancel="onPromptRequestCancel">
        <!-- Additional configuration. -->
    </kendo-aiprompt>
    ```
    {% endif %}
    ```JS Scripts
    <script src="~/ai-chat-service.js"></script>
    <script>
        const apiClient = new AIChatClient({
            // Replace with your AI service endpoint (for example, "https://api.yourdomain.com/ai").
            apiBaseUrl: "https://demos.telerik.com/service/v2/ai",
            defaultHeaders: { 'Content-Type': 'application/json' },
            aiId: kendo.guid()
        });

        async function onPromptRequest(ev) {
            const aiPromptInstance = this;

            if (ev.prompt && ev.prompt.trim()) {
                const promptText = ev.prompt.trim();
                const currentOutputId = kendo.guid();
                const isRetry = ev.isRetry || false;

                // Set active view to output
                aiPromptInstance.activeView("output");

                try {
                    // Handle the streaming response using the API client.
                    const finalText = await apiClient.sendMessage(promptText, {
                        onStart: (data) => {
                            aiPromptInstance.startStreaming();
                        },
                        onProgress: (accumulatedText, data) => {
                                aiPromptInstance.updatePromptOutputContent(accumulatedText, currentOutputId);
                        },
                        onComplete: (finalText, data) => {
                            aiPromptInstance.stopStreaming();
                        }
                    });
                } catch (error) {
                    console.error("Error in prompt request:", error);
                    const errorMessage = error.name === 'AbortError'
                        ? "Request was cancelled."
                        : "An error occurred while generating the response.";

                    aiPromptInstance.updatePromptOutputContent(errorMessage);
                    aiPromptInstance.stopStreaming();
                }
            } else {
                console.log("Prompt is empty, not sending request.");
            }
        }

        function onPromptRequestCancel(e) {
            apiClient.abortRequest(); // Abort the current request.
        }
    </script>
    ```

For the complete example, visit the [Overview Demo of the AIPrompt component](https://demos.telerik.com/{{ site.platform }}/aiprompt).

## See Also

* [Integration with Microsoft.Extensions.AI]({% slug integration_microsoft_extensions_ai %})
* [Client-Side API of the AIPrompt](https://docs.telerik.com/kendo-ui/api/javascript/ui/aiprompt)
* [Server-Side API of the AIPrompt HtmlHelper](/api/aiprompt)
{% if site.core %}
* [Server-Side API of the AIPrompt TagHelper](/api/taghelpers/aiprompt)
{% endif %}