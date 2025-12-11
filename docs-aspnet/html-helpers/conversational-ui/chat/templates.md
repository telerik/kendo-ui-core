---
title: Templates
page_title: Telerik UI Chat Documentation - Templates
description: "Learn about the template customization options available in the Telerik UI for {{ site.framework }} Chat component."
components: ["chat"]
slug: htmlhelpers_templates_chat
position: 7
---

# Templates

The Chat component provides extensive template customization options that allow you to control the rendering of various chat elements. 

By using templates, you can adjust the default appearance and behavior of messages, file attachments, suggestions, and other UI components to match your application's design and requirements. For more information on the capabilities and syntax of the templates, see the [Using Client Templates]({% slug client_templates_overview %}) article.

## Overview

The Chat component supports the following templates:

* [**Message Templates**](#message-templates)&mdash;Control how individual messages and message groups are rendered.
* [**Files Template**](#files-template)&mdash;Customize the display of file attachments within messages.
* [**Header Items**](#header-items)&mdash;Define custom content for the chat header area.
* [**Suggestion Templates**](#suggestion-templates)&mdash;Modify suggested actions and message suggestions layout.
* [**Timestamp Template**](#timestamp-template)&mdash;Control how date and time separators are displayed.

## Message Templates

The Chat component offers comprehensive message templating capabilities that enable you to customize the visual presentation and behavior of individual messages, message groups, and reference elements within the chat interface.

### MessageTemplate

The `MessageTemplate` method controls the rendering of individual messages within the chat interface. The templating option receives comprehensive data about the message and related functionality, allowing for complete customization of message appearance including text content, timestamps, author information, and interactive elements. 

The following example demonstrates how to use the `MessageTemplateHandler()` option to customize the layout of the Chat messages.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .MessageTemplateHandler("getMessageLayout")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" message-template-handler="getMessageLayout">
</kendo-chat>
```
{% endif %}
```JavaScript Scripts
<script>
    function getMessageLayout(
        message,
        replyMessage,
        downloadAll,
        messages,
        expandable,
        messageTimeFormat,
        ) {
        return (
            "<div class='custom-message'>" +
            "<div class='custom-message-text'>TEXT" +
            message.text +
            "</div>" +
            "<div class='custom-message-time'>Time" +
            kendo.toString(message.timestamp, "HH:mm") +
            "</div>" +
            "</div>"
        );
    }
</script>
```

### MessageGroupTemplate

The `MessageGroupTemplate()` option controls how message groups are rendered when multiple consecutive messages come from the same author. Message groups help organize conversations by visually grouping messages together, reducing visual clutter and improving readability in busy chat environments. The templating option is particularly useful for customizing how author information is displayed, implementing conversation threading, or creating distinct visual styles for different types of message groups.

The following example demonstrates how to use the `MessageGroupTemplateHandler()` option to customize the rendering of the message groups.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .MessageGroupTemplateHandler("getMessageGroupLayout")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" message-group-template-handler="getMessageGroupLayout">
</kendo-chat>
```
{% endif %}
```JavaScript Scripts
<script>
    function getMessageGroupLayout(data) {
        if (data.message.files.length > 0) {
            return (
            "<div class='custom-message-group'>" +
            "<span class='custom-author'><strong>Author: " +
            data.author.name +
            "</strong></span>" +
            "<div class='custom-message-content " +
            data.author.name +
            "'><strong>Text:</strong> " +
            data.message.text +
            "</div>" +
            "<div class='custom-files'><i>Files:</i> " +
            data.message.files.length +
            " file(s)</div>" +
            "</div>"
            );
        }
        return (
            "<div class='custom-message-group'>" +
            "<span class='custom-author'><strong>Author: " +
            data.author.name +
            "</strong></span>" +
            "<div class='custom-message-content " +
            data.author.name +
            "'><strong>Text:</strong> " +
            data.message.text +
            "</div></div>"
        );
    }
</script>
```
```CSS Styles
<style>
    .Emma {
    color: darkcyan;
    font-style: italic;
    }

    .Lora {
    color: rgb(94, 26, 123);
    }
</style>
```

### MessageReferenceTemplate

The `MessageReferenceTemplate()` method customizes the rendering of the message references that are used for reply chains and pinned message indicators within the chat interface. The templating option displays contextual information about referenced messages, allowing users to understand the relationship between current messages and previously sent content. You can use the template to create visually distinct reference displays, implement custom styling for different reference types (replies versus pins), or add interactive elements that allow users to navigate to the original referenced message.

> The outermost element must always have the `ref-chat-message-reference-pin-wrapper` attribute.

The following example demonstrates how to use the `MessageReferenceTemplateHandler()` option to customize the appearance of the message references.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .MessageReferenceTemplateHandler("getMessageReferenceLayout")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" message-reference-template-handler="getMessageReferenceLayout">
</kendo-chat>
```
{% endif %}
```JavaScript Scripts
<script>
    function getMessageReferenceLayout(data) {
        return `<div class='custom-reference' ref-chat-message-reference-pin-wrapper><span class='custom-reference-text'><strong>Message reference:</strong>${data.text}</span></div>`;
    }
</script>
```

## Files Template

The `FilesTemplate()` method customizes how file attachments are displayed within chat messages, providing complete control over the presentation and interaction of shared files. The templating option allows you to create custom file previews, display file metadata such as size, type, and upload date.

> The outermost element must always have the `ref-chat-file-wrapper` attribute.

The following example demonstrates how to use the `FilesTemplateHandler()` option to customize the appearance of the attachments in the message.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .FilesTemplateHandler("getFilesLayout")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" files-template-handler="getFilesLayout">
</kendo-chat>
```
{% endif %}
```JavaScript Scripts
<script>
    function getFilesLayout(files, downloadAll, messages, closeButton) {
        return "<div class='custom-files'><i>Custom Files:</i> " + files.length + " file(s)</div>";
    }
</script>
```

## Header Items

The `HeaderItems()` configuration allows you to define custom content for the chat header area using flexible template functions that return HTML content. Each header item can include logos, titles, navigation elements, action buttons, or any other UI components that enhance the chat experience and provide contextual information to users. 

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .HeaderItems(items =>
    {
        items.Add().Type(AppBarItemType.ContentItem).Template("<strong>Careers portal chat</strong>");
        items.Add().Type(AppBarItemType.Spacer);
        items.Add().Type(AppBarItemType.ContentItem).Template(Html.Kendo().Template()
        .AddComponent(btn => btn
            .Button()
            .Name("new-chat")
            .Text("New Chat")
            .Icon("plus")
        ));
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat">
    <header-items>
        <header-item type="AppBarItemType.ContentItem" template="<strong>Careers portal chat</strong>" />
        <header-item type="AppBarItemType.Spacer"/>
        <header-item type="AppBarItemType.ContentItem" template="<button id='new-chat'>New Chat</button>"/>
    </header-items>
</kendo-chat>
```
{% endif %}

## Suggestion Templates

You can modify the default layout of the **Message Suggestions** and **Suggested Actions** elements. For more information on the suggestion mechanisms of the Chat, refer to the [Quick Actions documentation](slug:htmlhelpers_quick_actions_chat).

### SuggestedActionsTemplate

The `SuggestedActionsTemplate()` option customizes the rendering of suggested actions that appear with specific messages, typically originating from chatbots, automated systems, or AI assistants. These suggested actions provide users with quick response options, eliminating the need to type common replies and improving conversation flow by offering contextually relevant choices.

The following example demonstrates how to customize the default appearance of the suggested actions using a JavaScript handler.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .SuggestedActionsTemplateHandler("getActionTemplate")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" suggested-actions-template-handler="getActionTemplate">
</kendo-chat>
```
{% endif %}
```JavaScript Scripts
<script>
    function getActionTemplate(suggestions) {
        let html = "<div class='custom-actions'>";
        html += "<p class='actions-title'>Choose an option:</p>";

        for (let i = 0; i < suggestions.length; i++) {
            html += "<button class='custom-action-btn' data-action='" + suggestions[i].text + "'>";
            html += "<span class='action-icon'></span>";
            html += suggestions[i].text;
            html += "</button>";
        }

        html += "</div>";
        return html;
    }
    kendo.ui.icon($(".action-icon"), { icon: 'globe-outline' });
</script>
```

### SuggestionsTemplate

The `SuggestionsTemplate()` option customizes the rendering of message suggestions that appear above the chat input area, providing users with quick reply options and commonly used phrases. The suggestions help streamline conversations by offering pre-defined responses that users can select instead of typing, which is particularly useful for customer service scenarios or repetitive interactions. 

The following example demonstrates how to customize the default appearance of the suggestion messages.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .Suggestions(suggestions => {
        suggestions.Add().Text("Check Weather");
        suggestions.Add().Text("Set Reminder");
        suggestions.Add().Text("Play Music");
        suggestions.Add().Text("Get News");
        suggestions.Add().Text("Help");
    })
    .SuggestionsTemplateHandler("getSuggestionsTemplate")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" suggestions-template-handler="getSuggestionsTemplate">
    <suggestions>
        <suggestion text="Check Weather" />
        <suggestion text="Set Reminder" />
        <suggestion text="Play Music" />
        <suggestion text="Get News" />
        <suggestion text="Help" />
    </suggestions>
</kendo-chat>
```
{% endif %}
```JavaScript Scripts
<script>
    function getSuggestionsTemplate(suggestions) {
        let html = "<div class='custom-suggestions' ref-chat-suggestion-group>";
        html += "<span class='suggestions-label'>Quick replies:</span>";
        
        for (let i = 0; i < suggestions.length; i++) {
            html += "<button class='custom-suggestion-btn k-suggestion'>";
            html += "<span class='suggestion-icon'>💬</span>";
            html += suggestions[i].text;
            html += "</button>";
        }
        
        html += "</div>";
        return html;
    }
</script>
```

## Timestamp Template

The `TimestampTemplate()` method controls how date and time separators are displayed between message groups, providing crucial temporal context that helps users navigate through conversation history. The templating option allows you to customize the appearance of time dividers that automatically appear when there are significant time gaps between messages, making it easier for users to understand when different parts of the conversation took place. 

The following example demonstrates how to use the `TimestampTemplateHandler()` option to style the timestamp elements.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .TimestampTemplateHandler("getTimeStampFormat")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" timestamp-template-handler="getTimeStampFormat">
</kendo-chat>
```
{% endif %}
```JavaScript Scripts
<script>
    function getTimeStampFormat(data) {
        const date = data.date; // The Date() object representing the timestamp.
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        let displayText;
        if (diffDays === 0) {
            displayText = "Today";
        } else if (diffDays === 1) {
            displayText = "Yesterday";
        } else if (diffDays < 7) {
            displayText = date.toLocaleDateString('en-US', { weekday: 'long' });
        } else {
            displayText = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: diffDays > 365 ? 'numeric' : undefined
            });
        }

        return "<div class='custom-timestamp'>" +
            "<span class='timestamp-line'></span>" +
            "<span class='timestamp-text'>" + displayText + "</span>" +
            "<span class='timestamp-line'></span>" +
            "</div>";
    }
</script>
```

## See Also

* [Export Chat History using the Chat for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chat/export)
* [Subscribing to Chat Events]({% slug events_chat_aspnetcore %})
* [Server-Side API of the Chat HtmlHelper](/api/chat)
{% if site.core %}
* [Server-Side API of the Chat TagHelper](/api/taghelpers/chat)
{% endif %}
* [Client-Side API of the Chat](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat)