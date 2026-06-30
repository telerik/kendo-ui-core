---
title: Enabling Scrollable Tables in Kendo UI for jQuery Chat Bubble
description: Learn how to enable horizontal and vertical scrolling for tables inside Kendo UI for jQuery Chat bubbles.
type: how-to
page_title: How to Enable Horizontal and Vertical Scrolling for Tables in Chat Bubbles
meta_title: How to Enable Horizontal and Vertical Scrolling for Tables in Chat Bubbles
slug: enabling-scrollable-tables-kendo-jquery-chat
tags: kendo-ui-for-jquery, chat, table, scrolling, overflow
res_type: kb
ticketid: 1715961
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> Kendo UI for jQuery Chat </td>
</tr>
<tr>
<td> 2026.2.520 </td>
<td> Current </td>
</tr>
</tbody>
</table>

## Description

When displaying tables in Kendo UI for jQuery Chat bubbles, tables with many columns or rows may not render properly as horizontal or vertical scrolling is not enabled. This makes it difficult for users to view the full table content.

This knowledge base article also answers the following questions:
- How to make tables scrollable in Kendo UI Chat bubbles?
- How to handle large tables in Kendo UI Chat?
- How to add horizontal and vertical scroll to tables in Kendo UI Chat?

## Solution

To enable both horizontal and vertical scrolling for tables inside Kendo UI for jQuery Chat bubbles, wrap the table in a container div and apply CSS to manage overflow. Follow these steps:

1. Modify the `completeStream` function to use a `transformTables` function alongside the existing `transformCodeBlocks` function:

```javascript
function completeStream(currentAIMessage, rawResponse, markedInstance) {
    var markdown = markedInstance.parse(rawResponse);
    markdown = transformCodeBlocks(markdown);
    markdown = transformTables(markdown);   
    $("#chat").data("kendoChat").updateMessage(currentAIMessage, { text: markdown });
}
```

2. Add the `transformTables` function to wrap each table in a container div with a custom class:

```javascript
function transformTables(html) {
    return html
        .replace(/<table/gi, '<div class="scrollable-table-container"><table')
        .replace(/<\/table>/gi, '</table></div>');
}
```

3. Apply custom CSS to style the container and enable scrolling:

```css
/* Scrollable table styles */
.scrollable-table-container {
    max-width: 100%;
    overflow-x: auto;
    overflow-y: auto;
    max-height: 400px;
    margin: 12px 0;
    border: 1px solid var(--kendo-color-border);
    border-radius: 4px;
}

.scrollable-table-container table {
    min-width: 600px;
    border-collapse: collapse;
    font-size: 14px;
}
```

4. Below you can find a live demonstration of this solution:

```dojo
<!DOCTYPE html>
<html>
<head>
    <base href="https://demos.telerik.com/kendo-ui/chat/markdown-visualization?_gl=1*8ky9au*_gcl_au*MTYxMTQ0MTQyMC4xNzgxMDczNDIxLjE3NzY0MzY0OTkuMTc4MjM3NDE0OC4xNzgyMzc0MTQ4*_ga*MTIyMDc2ODEzMC4xNzU2OTA3MTk1*_ga_9JSNBCSF54*czE3ODIzNjkyMzgkbzUzJGcxJHQxNzgyMzg2MTU1JGo0MiRsMCRoMA..">
    <style>html { font-size: 14px; font-family: Arial, Helvetica, sans-serif; }</style>
    <title></title>
    <link href="https://kendo.cdn.telerik.com/themes/14.1.0/meridian/meridian-main.css" rel="stylesheet" />
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    
    
    
    <script src="https://kendo.cdn.telerik.com/2026.2.520/js/kendo.all.min.js"></script>
    
    
</head>
<body>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/styles/default.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/16.2.0/lib/marked.umd.min.js"
    integrity="sha512-iFFK3wF8x/wQX/7dko0SsJeEgxUorBdYHFGRpGhnOsfnuewBBQ9a80cn0q1xjNB3kkBjA15NaRHFT7gQoG+V1g=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/marked-highlight/2.2.2/index.umd.min.js"
    integrity="sha512-T5TNAGHd65imlc6xoRDq9hARHowETqOlOGMJ443E+PohphJHbzPpwQNBtcpmcjmHmQKLctZ/W3H2cY/T8EGDPA=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"
    integrity="sha512-EBLzUL8XLl+va/zAsmXwS7Z2B1F9HUHkZwyS/VKwh3S7T/U0nF4BaU29EP/ZSf6zgiIxYAnKLu6bJ8dqpmX5uw=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script src="../content/shared/js/streaming.js"></script>

<style>
    .k-message-list-content, .k-message-box-wrapper {
        padding-left: 100px !important;
        padding-right: 100px !important;
    }

    .k-chat-header {
        margin: auto;
    }

    .k-chat {
        min-width: 300px !important;
    }

    .ai-sparkles-icon {
        display: inline-flex;
        align-items: center;
    }

    .k-chat .k-chat-message-list {
        padding-left: 100px;
        padding-right: 100px;
    }

    .k-message-group-receiver .k-message .k-bubble {
        background-color: transparent;
        border: none;
    }

    .k-chat-bubble-text {
        overflow-wrap: break-word !important;
        word-break: normal !important;
    }

    .k-notification {
        position: absolute;
        z-index: 9999;
        top: 70%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .note {
        font: normal 18px "Metric";
        border-radius: 2px;
        margin: 20px auto 40px auto;
        padding: 20px;
        border-left: 4px solid;
        border-left-color: #5392e4;
        background: rgba(83,146,228,0.1);
        text-align: center;
    }

    /* Markdown table styles */
    .scrollable-table-container {
        max-width: 100%;
        overflow-x: auto;
        overflow-y: auto;
        max-height: 400px;
        margin: 12px 0;
        border: 1px solid var(--kendo-color-border);
        border-radius: 4px;
    }

    .scrollable-table-container table {
        min-width: 600px;
        border-collapse: collapse;
        font-size: 14px;
    }

    .k-message th {
        text-align: left;
        padding: 12px 16px;
        font-weight: 600;
        color: var(--kendo-color-on-app-surface);
        border-bottom: 2px solid var(--kendo-color-border);
    }

    .k-message td {
        padding: 12px 16px;
        color: var(--kendo-color-on-app-surface);
        border-bottom: 1px solid var(--kendo-color-border);
        vertical-align: top;
    }

    .k-message tr:last-child td {
        border-bottom: none;
    }

    /* Inline code styles */
    .k-message code {
        background-color: var(--kendo-color-surface-alt);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Consolas', 'Monaco', monospace;
        font-size: 13px;
        color: var(--kendo-color-primary);
    }

    /* Code block styles */
    .k-message pre {
        background-color: var(--kendo-color-surface);
        color: var(--kendo-color-on-app-surface);
        padding: 16px;
        margin: 0;
        overflow-x: auto;
        font-size: 14px;
        line-height: 1.5;
    }

        .k-message pre code {
            background-color: transparent;
            padding: 0;
            color: inherit;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        }

    /* Code block wrapper with copy button */
    .code-wrapper {
        background: var(--kendo-color-surface);
        border-radius: 8px;
        margin: 12px 0;
        overflow: hidden;
    }

    .code-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px;
        border-bottom: 1px solid var(--kendo-color-border);
    }

    .code-language {
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        color: var(--kendo-color-subtle);
    }
</style>

<div class="note">
    <p>
        By accessing and using the Telerik AI service integration on the Progress website, you acknowledge and agree to be bound by the following <a href="https://www.telerik.com/purchase/license-agreement/demo-chatbots-terms-of-use" title="Terms of Use">Terms of Use</a>.
    </p>
</div>
<div id="container" class="k-d-flex k-justify-content-center" style="padding: 0 100px;">
    <span id="notification"></span>
    <div id="chat"></div>
</div>
<div class="note">
    <p>
        Please note that the responses provided by this demo are generated by artificial intelligence and may not always be accurate or up-to-date. Users are encouraged to verify any information obtained from the demo before relying on it.
    </p>
    <p>
        Progress is not responsible for any errors, omissions, or inaccuracies in the information provided, nor for any actions taken based on the responses received.
    </p>
</div>

<script>
    var chat,
        streamingService,
        markedInstance;

    const chats = [];
    const author = {
        id: "user-123",
        name: "John Smith"
    };

    $(document).ready(async function () {
        $("#notification").kendoNotification({
            width: 300,
            height: 54,
            appendTo: "#container",
            templates: [
                { type: "copyNotification", template: "<span class='copy-icon'></span> Message copied to clipboard." }
            ]
        });

        $("#chat").kendoChat({
            skipSanitization: true,
            suggestedActionsLayoutMode: "wrap",
            suggestionsLayoutMode: "wrap",
            authorId: "user-123",
            width: "900px",
            height: "600px",
            messageWidthMode: "full",
            showUsername: false,
            headerItems: [
                { type: "contentItem", template: "<span class='ai-sparkles-icon'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32'><foreignObject x='0' y='0' width='32' height='32'><div xmlns='http://www.w3.org/1999/xhtml' style='backdrop-filter:blur(2px);clip-path:url(#bgblur_0_2237_1717_clip_path);height:100%;width:100%'></div></foreignObject><g filter='url(#filter0_d_2237_1717)' data-figma-bg-blur-radius='4'><path d='M22 9L23.6972 13.3028L28 15L23.6972 16.6972L22 21L20.3028 16.6972L16 15L20.3028 13.3028L22 9ZM14.9394 18.9394L12 20L14.9394 21.0606L16 24L17.0606 21.0606L20 20L17.0606 18.9394L16 16L14.9394 18.9394ZM14.2044 10.2044L12 11L14.2044 11.7956L15 14L15.7956 11.7956L18 11L15.7956 10.2044L15 8L14.2044 10.2044Z' fill='url(#paint0_linear_2237_1717)'/></g><defs><filter id='filter0_d_2237_1717' x='0' y='0' width='32' height='32' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'><feFlood flood-opacity='0' result='BackgroundImageFix'/><feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/><feOffset dy='4'/><feGaussianBlur stdDeviation='6'/><feComposite in2='hardAlpha' operator='out'/><feColorMatrix type='matrix' values='0 0 0 0 0.0509804 0 0 0 0 0.0392157 0 0 0 0 0.172549 0 0 0 0.08 0'/><feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_2237_1717'/><feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_2237_1717' result='shape'/></filter><clipPath id='bgblur_0_2237_1717_clip_path'><path d='M22 9L23.6972 13.3028L28 15L23.6972 16.6972L22 21L20.3028 16.6972L16 15L20.3028 13.3028L22 9ZM14.9394 18.9394L12 20L14.9394 21.0606L16 24L17.0606 21.0606L20 20L17.0606 18.9394L16 16L14.9394 18.9394ZM14.2044 10.2044L12 11L14.2044 11.7956L15 14L15.7956 11.7956L18 11L15.7956 10.2044L15 8L14.2044 10.2044Z'/></clipPath><linearGradient id='paint0_linear_2237_1717' x1='14.1354' y1='10.337' x2='22.1053' y2='20.9343' gradientUnits='userSpaceOnUse'><stop stop-color='#C158E4'/><stop offset='1' stop-color='#4B5FFA'/></linearGradient></defs></svg></span>" },
                { type: "contentItem", template: "<strong>AI Knowledge Assistant</strong>" },
                { type: "spacer" }
            ],
            suggestions: [
                { text: "Show a JavaScript code snippet" },
                { text: "Compare frameworks in a table" },
                { text: "Explain async/await with examples" }
            ],
            suggestionClick: onSuggestionClick,
            toolbarAction: onToolbarAction,
            sendMessage: onSendMessage
        });

        chat = $("#chat").data("kendoChat");

        streamingService = new StreamingService("https://demos.telerik.com/service/v2/ai");
        markedInstance = await initializeMarkdown();
        const { chatSession, currentChatId, initialData } = await initializeChatSession(streamingService, author, markedInstance);
        chat.dataSource.data(initialData);

        chat.postMessage({
            authorId: "ai-assistant",
            text: "\uD83D\uDC4B Hello! I'm your AI Knowledge Assistant. I can help you with code snippets, framework comparisons, and technical explanations.\n\nTry one of the suggested prompts below!"
        });
    });

    function onSuggestionClick(e) {
        // Suggestions are handled as regular messages
    }

    function onToolbarAction(e) {
        if (e.type === "copy") {
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = e.message.text;
            var plainText = tempDiv.textContent || tempDiv.innerText || '';
            navigator.clipboard.writeText(plainText).then(function () {
                var notificationWidget = $("#notification").data("kendoNotification");
                notificationWidget.show("Message copied to clipboard.", "copyNotification");
                kendo.ui.icon($(".copy-icon"), { icon: 'copy' });
            });
        }
    }

    function onSendMessage(e) {
        if (e.generating) {
            streamingService.abortRequest();
            e.sender.toggleSendButtonGenerating(false);
            return;
        }

        if (!chats.length) {
            return;
        }

        e.message.authorName = author.name;
        handleAIResponse(e, streamingService, markedInstance, chats[chats.length - 1].id);
    }

    function handleAIResponse(e, streamingService, markedInstance, currentChatId) {
        var rawResponse = '';
        var currentAIMessage = null;

        streamingService.streamAIResponse(currentChatId, e.message.text, e.message.files || [], {
            onStart: function (data) {
                currentAIMessage = e.sender.postMessage({
                    authorId: 'ai-assistant',
                    text: '',
                });
                e.sender.toggleSendButtonGenerating(true);
            },
            onStreaming: function (data) {
                var newText = currentAIMessage.text + data.message;
                rawResponse += data.message;
                e.sender.updateMessage(currentAIMessage, {
                    text: kendo.htmlEncode(newText, true)
                });
                chat.scrollToBottom();
            },
            onComplete: function (data) {
                completeStream(currentAIMessage, rawResponse, markedInstance);
            },
            onError: function (error) {
                currentAIMessage = null;
                e.sender.toggleSendButtonGenerating(false);
            },
            onAbort: function () {
                completeStream(currentAIMessage, rawResponse, markedInstance);
            }
        });
    }

    async function initializeMarkdown() {
        while (typeof marked === 'undefined' || typeof markedHighlight === 'undefined') {
            await new Promise(function (resolve) { setTimeout(resolve, 50); });
        }

        return new marked.Marked(markedHighlight.markedHighlight({
            highlight: function (code, lang) {
                var language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, { language: language }).value;
            },
            langPrefix: 'hljs language-'
        }));
    }

    async function initializeChatSession(streamingService, author, markedInstance) {
        var chatSession = await streamingService.loadChatSession();

        try {
            var chatRoom = await streamingService.createNewChat();
            chats.push({ id: chatRoom.chatId });
        } catch (error) {
            console.error("Error creating chatroom:", error);
        }

        var currentChatId = chats[chats.length - 1].id;

        return { chatSession: chatSession, currentChatId: currentChatId, initialData: [] };
    }

    function completeStream(currentAIMessage, rawResponse, markedInstance) {
        var markdown = markedInstance.parse(rawResponse);
        markdown = transformCodeBlocks(markdown);
        markdown = transformTables(markdown);
        $("#chat").data("kendoChat").updateMessage(currentAIMessage, { text: markdown });
        $("#chat").data("kendoChat").toggleSendButtonGenerating(false);

        $(".copy-btn-icon").each(function () {
            if (!$(this).children().length) {
                kendo.ui.icon($(this), { icon: 'copy' });
            }
        });
    }

    function transformCodeBlocks(html) {
        var codeBlockPattern = /<pre><code class="hljs language-(\w+)">([\s\S]*?)<\/code><\/pre>/gi;
        return html.replace(codeBlockPattern, function (match, lang, code) {
            return '<div class="code-wrapper">' +
                '<div class="code-header">' +
                    '<span class="code-language">' + lang + '</span>' +
                    '<button class="k-button k-button-flat k-button-sm copy-code-btn" onclick="copyCodeBlock(this)" type="button">' +
                        '<span class="copy-btn-icon"></span>' +
                        '<span class="k-button-text">Copy</span>' +
                    '</button>' +
                '</div>' +
                '<pre><code class="hljs language-' + lang + '">' + code + '</code></pre>' +
            '</div>';
        });
    }

    function transformTables(html) {
        return html
            .replace(/<table/gi, '<div class="scrollable-table-container"><table')
            .replace(/<\/table>/gi, '</table></div>');
    }

    function copyCodeBlock(button) {
        var codeText = $(button).closest('.code-wrapper').find('code').text();
        navigator.clipboard.writeText(codeText).then(function () {
            var notificationWidget = $("#notification").data("kendoNotification");
            notificationWidget.show("Message copied to clipboard.", "copyNotification");
            kendo.ui.icon($(".copy-icon"), { icon: 'copy' });
        });
    }
</script>



</body>
</html>
```

## See Also

- [Kendo UI for jQuery Chat Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/chat/overview)
- [Customizing Markdown Rendering in Kendo UI Chat (Demo)](https://demos.telerik.com/kendo-ui/chat/markdown-visualization)
