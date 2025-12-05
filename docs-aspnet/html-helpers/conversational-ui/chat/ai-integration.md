---
title: AI Integration
page_title: Telerik UI Chat Documentation - AI Integration
description: "Connect the Telerik UI for {{ site.framework }} Chat to a streaming AI chat service to create intelligent conversational experiences."
slug: htmlhelpers_ai_integration_chat
position: 3
---

# AI Integration

Integrating AI services with the {{ site.product }} Chat component transforms a simple messaging interface into an intelligent conversational experience. Such integration allows you to create applications that can understand natural language, provide contextual responses, and deliver real-time AI-powered assistance to users.

In this article, you will build a practical, end-to-end example that demonstrates how to wire the Chat component to a lightweight AI chat client. This implementation covers opening a chat session, sending messages or quick replies, and streaming the AI model's response into the chat conversation.

## Getting Started

To create an AI chat service that connects to the Chat, follow the steps below:

> The example uses a Telerik-hosted AI service for demonstration purposes only. For production applications, you can implement your own AI service that understands your specific domain, data, and business requirements. For a runnable example with an established OpenAI backend integration, visit our <a target="_blank"  href="https://github.com/telerik/ui-for-aspnet-core-examples">GitHub Core Examples repository.

1. Add references to the AI service client and the required formatting libraries for enhanced message display:

    ```JS Scripts
    <!-- Syntax highlighting for code blocks in AI responses -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/styles/default.min.css">

    <!-- Markdown parsing library for formatting AI responses -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/16.2.0/lib/marked.umd.min.js"
        integrity="sha512-iFFK3wF8x/wQX/7dko0SsJeEgxUorBdYHFGRpGhnOsfnuewBBQ9a80cn0q1xjNB3kkBjA15NaRHFT7gQoG+V1g=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <!-- Markdown syntax highlighting integration -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/marked-highlight/2.2.2/index.umd.min.js"
        integrity="sha512-T5TNAGHd65imlc6xoRDq9hARHowETqOlOGMJ443E+PohphJHbzPpwQNBtcpmcjmHmQKLctZ/W3H2cY/T8EGDPA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <!-- Code syntax highlighting engine -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"
        integrity="sha512-EBLzUL8XLl+va/zAsmXwS7Z2B1F9HUHkZwyS/VKwh3S7T/U0nF4BaU29EP/ZSf6zgiIxYAnKLu6bJ8dqpmX5uw=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <!-- AI service client -->
    <script src="~/ai-service.js"></script>
    ```
    ```JS ai-service.js
    class StreamingService {
        constructor(serviceURL) {
            this.config = {
                apiBaseUrl: serviceURL
            };

            this.controller = null;
        }
        async streamAIResponse(chatId, message, files = [], callbacks = {}) {
            this.controller = new AbortController();

            const formData = new FormData();

            formData.append('message', message);
            if (files.length > 0) {
                files.forEach(file => {
                    formData.append("images", file.rawFile);
                });
            }

            try {
                const response = await fetch(`${this.config.apiBaseUrl}/chat/${encodeURIComponent(chatId)}`, {
                    method: 'POST',
                    body: formData,
                    signal: this.controller.signal
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                await this.processStreamingResponse(response, callbacks);
            } catch (error) {
                if (error.name === 'AbortError') {
                    callbacks.onAbort?.();
                } else {
                    callbacks.onError?.(error);
                }
            } finally {
                this.controller = null;
            }
        }

        async processStreamingResponse(response, callbacks) {
            let buffer = "";
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
                        const data = JSON.parse(line);
                        this.handleStreamingData(data, callbacks);
                    }
                }
            }
        }

        handleStreamingData(data, callbacks) {
            switch (data.status) {
                case "start": {
                    callbacks.onStart?.(data);
                    break;
                }
                case "streaming":
                    callbacks.onStreaming?.(data);
                    break;

                case "complete":
                    callbacks.onComplete?.(data);
                    break;
            }
        }

        abortRequest() {
            if (this.controller) {
                this.controller.abort();
                this.controller = null;
            }
        }

        // API methods
        async #apiRequest(endpoint, options = {}) {
            const response = await fetch(`${this.config.apiBaseUrl}${endpoint}`, {
                headers: { 'Content-Type': 'application/json' },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response;
        }

        // Retrieves the ids of all chat rooms that have been created so far.
        // Also retrieves the current token usage.
        async loadChatSession() {
            try {
                const response = await this.#apiRequest('/chat/conversations');
                const data = await response.json();

                return data;
            } catch (err) {
                console.error("Failed to load chat list:", err);
            }
        }

        // Loads the messages for a particular chat room.
        async loadChatInfo(chatId) {
            if (!chatId) return;

            try {
                const response = await this.#apiRequest(`/chat/${encodeURIComponent(chatId)}`);
                const data = await response.json();

                return data;
            } catch (err) {
                console.error("Failed to load chat info:", err);
            }
        }

        // Creates a new chat room with no messages. The AI won't be aware of the previous conversation.
        async createNewChat() {
            try {
                const response = await this.#apiRequest('/chat/conversations', { method: 'POST' });
                const data = await response.json();

                return data;
            } catch (err) {
                console.error("Failed to create new chat:", err);
            }
        }

        // Removes a chat room by given id.
        async deleteChat(chatId) {
            if (!chatId) return;

            try {
                await this.#apiRequest(`/chat/conversations/${encodeURIComponent(chatId)}`, {
                    method: 'DELETE'
                });
            } catch (err) {
                console.error("Failed to delete chat:", err);
            }
        }
    }

    window.StreamingService = StreamingService;
    ```

    How does the AI service client work?

    * **Session Management**: Creates chat sessions (`POST /chat/conversations`), loads existing conversations (`GET /chat/conversations`), and manages individual chat rooms (`GET /chat/{chatId}`).
    * **Message Streaming**: Sends messages with optional file attachments to `/chat/{chatId}` and processes streaming responses in real-time using the Fetch API and ReadableStream.
    * **Callback System**: Invokes structured callbacks based on stream status: `onStart` (when streaming begins), `onStreaming` (for each chunk of data), and `onComplete` (when finished). Also handles `onAbort` and `onError` for cancellation and error scenarios.
    * **Request Cancellation**: Supports aborting in-flight requests through `abortRequest()` using AbortController for immediate cancellation.
    * **File Support**: Handles image file uploads alongside text messages using FormData for multimodal AI interactions.
    * **Chat Lifecycle**: Provides full CRUD operations including creating new chats and deleting existing conversations (`DELETE /chat/conversations/{chatId}`).

1. Define the Chat component with predefined suggestions and a **Download** file action that will be displayed when the message contains an attachment.

    ```HtmlHelper
    @(Html.Kendo().Chat()
        .Name("chat")
        .SkipSanitization(true)
        .AuthorId("user-123") // Specifies the unique identifier of the current user. If not set, a GUID will be generated automatically.
        .AllowMessageCollapse(true)
        .Suggestions(suggestions => {
            suggestions.Add().Text("Analyse my photo");
            suggestions.Add().Text("Provide CV template");
            suggestions.Add().Text("Generate a cover letter");
        })
        .FileActions(actions =>
        {
            actions.Add().Name("download").Text("Download").Icon("download");
        })
    )
    ```
    {% if site.core %}
    ```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chat name="chat"
        skip-sanitization="true"
        allow-message-collapse="true"
        author-id="user-123" // Specifies the unique identifier of the current user. If not set, a GUID will be generated automatically.
        >
        <suggestions>
            <suggestion text="Analyse my photo" />
            <suggestion text="Provide CV template" />
            <suggestion text="Generate a cover letter" />
        </suggestions>
        <file-actions>
            <file-action name="download" text="Download" icon="download" />
        </file-actions>
    </kendo-chat>
    ```
    {% endif %}

1. Handle the following Chat client events:

    * `SendMessage` event&mdash;Fires when a message is about to be sent (the user clicks the **Send** button) or when the send process is triggered. Within the event handler, get the message object (`e.message`) and post a message as a reply based on the received message text. For example, if the message text matches any of the predefined quick actions, post a templated answer. Otherwise, start the asynchronous call to the AI service. Provide the following callbacks:
      - `onStart`: Creates a new AI message in the Chat and toggles the **Send** button to generating state to show the loading indicator.
      - `onStreaming`: Accumulates the raw response for final processing, updates the displayed message with HTML-encoded content, and scrolls the chat to the bottom to follow the streaming text.
      - `onComplete`: Calls `completeStream()` to process the final message with Markdown formatting and updates token usage display with `data.message`.
      - `onError`: Clears the current AI message reference and stops the generating indicator.
      - `onAbort`: Calls `completeStream()` to finalize whatever content was received before cancellation.

    * `Download` event&mdash;Fires when a download action is triggered, either from the **Download All** button or from a file menu download action. Within the event handler, iterate through each file in the message, convert the file URL to a downloadable blob, and trigger a browser download using the [`kendo.saveAs()`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/kendo/methods/saveas) method.

    ```HtmlHelper
    @(Html.Kendo().Chat()
        .Name("chat")
        .Events(events =>
        {
            ev.Download("onDownload");
            ev.SendMessage("onSendMessage");
        })
        ... // Additional configuration.
    )
    ```
    {% if site.core %}
    ```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-chat name="chat"
        on-send-message="onSendMessage"
        on-download="onDownload">
        <!-- Additional configuration. -->
    </kendo-chat>
    ```
    {% endif %}
    ```JS Scripts
    <script>
        var chat,
        streamingService,
        markedInstance;

        const chats = [];
        const author = {
            id: "user-123",
            name: "John Smith"
        };

        $(document).ready(function() {
            chat = $("#chat").getKendoChat();
            if(chat) {
                // Initialize services and dependencies
                streamingService = new StreamingService("https://demos.telerik.com/service/v2/ai"); // Replace with your AI service endpoint (for example, "https://api.yourdomain.com/ai").
                markedInstance = await initializeMarkdown();
                const { chatSession, currentChatId, initialData } = await initializeChatSession(streamingService, author, markedInstance);
                // Set the Chat's data.
                chat.dataSource.data(initialData);
            }
        });

        function onDownload(e) {
            if(e.message.authorId == "ai-assistant") {
                e.files.forEach(function(file) {
                    createBlobFromFileUrl(file.url)
                    .then(blob => {
                        kendo.saveAs({
                            dataURI: blob,
                            fileName: file.name
                        });
                    })
                    .catch(err => {
                        console.error(err);
                    });
                });
            } else {
                kendo.alert("The file cannot be downloaded.");
            }
        }

        function onSendMessage(e) {
            if (e.generating) {
                streamingService.abortRequest();
                e.sender.toggleSendButtonGenerating(false);
                return;
            }

            e.message.authorName = author.name;
            e.message.id = kendo.guid();

            const messageText = e.message.text.toLowerCase().trim();

            if (messageText === 'provide cv template') {
                setTimeout(() => {
                    e.sender.postMessage({
                        authorId: 'ai-assistant',
                        authorName: "AI Assistant",
                        text: 'Sure. Here is a CV template file in PDF format. Can I help you with something else?',
                        timestamp: new Date(),
                        id: kendo.guid(),
                        files: [{
                            name: "CV_Template.pdf",
                            size: 5315153,
                            extension: "pdf",
                            url: "@Url.Content("~/shared/web/chat/CV_Template.pdf")"
                        }]
                    });
                }, 200);
            } else if (messageText === 'generate a cover letter') {
                setTimeout(() => {
                    e.sender.postMessage({
                        authorId: 'ai-assistant',
                        authorName: "AI Assistant",
                        text: 'Here is a cover letter template. You can customize it as needed.',
                        timestamp: new Date(),
                        id: kendo.guid(),
                        files: [{
                            name: "Cover_Letter_Template.pdf",
                            size: 5315153,
                            extension: "pdf",
                            url: "@Url.Content("~/shared/web/chat/Cover_Letter.pdf")"
                        }]
                    });
                }, 200);
            } else {
                handleAIResponse(e, streamingService, markedInstance, chats[chats.length - 1].id);
            }
        }

        function handleAIResponse(e, streamingService, markedInstance, currentChatId) {
            let rawResponse = '';
            let currentAIMessage = null;

            streamingService.streamAIResponse(currentChatId, e.message.text, e.message.files, {
                onStart: (data) => {
                    currentAIMessage = e.sender.postMessage({
                        authorId: 'ai-assistant',
                        authorName: "AI Assistant",
                        text: '',
                        id: kendo.guid()
                    });
                    e.sender.toggleSendButtonGenerating(true);
                },
                onStreaming: (data) => {
                    const newText = currentAIMessage.text + data.message;
                    rawResponse += data.message;
                    e.sender.updateMessage(currentAIMessage, {
                        text: kendo.htmlEncode(newText, true)
                    });
                    chat.scrollToBottom();
                },
                onComplete: (data) => {
                    completeStream(currentAIMessage, rawResponse, markedInstance);
                    updateTokenDisplay(data.message);
                },
                onError: (error) => {
                    currentAIMessage = null;
                    e.sender.toggleSendButtonGenerating(false);
                },
                onAbort: () => {
                    completeStream(currentAIMessage, rawResponse, markedInstance);
                }
            });
        }

        async function initializeMarkdown() {
            // Wait for marked to be available
            while (typeof marked === 'undefined' || typeof markedHighlight === 'undefined') {
                await new Promise(resolve => setTimeout(resolve, 50));
            }

            return new marked.Marked(markedHighlight.markedHighlight({
                highlight: function(code, lang) {
                    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                    return hljs.highlight(code, { language }).value;
                },
                langPrefix: 'hljs language-'
            }));
        }

        async function initializeChatSession(streamingService, author, markedInstance) {
            const chatSession = await streamingService.loadChatSession();
            chats.push(...chatSession.chats);

            if (chats.length === 0) {
                try {
                    const chatRoom = await streamingService.createNewChat();
                    chats.push({ id: chatRoom.chatId });
                } catch (error) {
                    console.error("Error creating chatroom:", error);
                }
            }

            const currentChatId = chats[chats.length - 1].id;
            const currentChatHistory = await streamingService.loadChatInfo(currentChatId);

            const initialData = currentChatHistory.map((message) => ({
                authorId: message.role === "user" ? author.id : "ai-assistant",
                authorName: message.role === "user" ? author.name : "AI Assistant",
                text: markedInstance.parse(message.text),
                id: kendo.guid(),
                timestamp: new Date(message.timestamp)
            }));

            return { chatSession, currentChatId, initialData };
        }

        async function createBlobFromFileUrl(fileUrl) {
            const response = await fetch(fileUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
            }
            const blob = await response.blob();
            return blob;
        }

        function completeStream(currentAIMessage, rawResponse, markedInstance) {
            const markdown = markedInstance.parse(rawResponse);
            $("#chat").data("kendoChat").updateMessage(currentAIMessage, { text: markdown });
            $("#chat").data("kendoChat").toggleSendButtonGenerating(false);
        }
    </script>
    ```
    
For the complete example, visit the [AI Integration Demo of the Chat component](https://demos.telerik.com/{{ site.platform }}/chat/ai-integration).

## See Also

* [Person-to-Bot Conversation using the Chat for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chat/person-to-bot)
* [Client-Side API of the Chat](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat)
* [Server-Side API of the Chat HtmlHelper](/api/chat)
{% if site.core %}
* [Server-Side API of the Chat TagHelper](/api/taghelpers/chat)
{% endif %}