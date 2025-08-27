---
title: Quick Actions
page_title: Telerik UI Chat Documentation - Quick Actions
description: "Learn how to configure and use message suggestions and suggested actions in the {{ site.product }} Chat component to provide quick response options for users."
slug: htmlhelpers_quick_actions_chat
position: 6
---

# Quick Actions

The Chat component provides two types of suggestion systems that enhance user interaction by offering quick response options: **Message Suggestions** and **Suggested Actions**. These features help streamline conversations by reducing typing effort and providing contextually relevant response options.

## Overview

The Chat component supports the following suggestion mechanisms:

* [**Message Suggestions**](#message-suggestions)&mdash;Global quick-reply options that appear above the message input.
* [**Suggested Actions**](#suggested-actions)&mdash;Contextual action buttons that appear with specific messages from bots or automated systems.

Both suggestion types help improve user experience by providing pre-defined response options that users can select instead of typing manual questions or responses.

## Message Suggestions

Message suggestions are persistent quick-reply options that appear above the message input area. The suggestions remain visible throughout the conversation and provide users with commonly used responses or frequently asked questions.

### Basic Configuration

Configure the desired message suggestions using the `Suggestions()` configuration of the Chat component:

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .Suggestions(suggestions => {
        suggestions.Add().Text("Yes, please");
        suggestions.Add().Text("No, thanks");
        suggestions.Add().Text("Tell me more");
        suggestions.Add().Text("Need help");
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat">
    <suggestions>
        <suggestion text="Yes, please" />
        <suggestion text="No, thanks" />
        <suggestion text="Tell me more" />
        <suggestion text="Need help" />
    </suggestions>
</kendo-chat>
```
{% endif %}

### Handling Suggestion Clicks

Subscribe to the `SuggestionClick` client-side event to handle user interactions with message suggestions:

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .Suggestions(suggestions => {
        suggestions.Add().Text("Yes, please");
        suggestions.Add().Text("No, thanks");
        suggestions.Add().Text("Tell me more");
        suggestions.Add().Text("Need help");
    })
    .Events(ev =>
    {
        ev.SuggestionClick("onSuggestionClick");
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" on-suggestio-click="onSuggestionClick">
    <suggestions>
        <suggestion text="Yes, please" />
        <suggestion text="No, thanks" />
        <suggestion text="Tell me more" />
        <suggestion text="Need help" />
    </suggestions>
</kendo-chat>
```
{% endif %}
```JavaScript Scripts
<script>
    function onSuggestionClick(e) {
        let suggestion = e.text; // Get the selected suggestion.
        // Handle different suggestion types.
        switch (suggestion) {
            case 'Yes, please':
                console.log('Confirming action...');
                break;
            case 'No, thanks':
                console.log('Canceling process...');
                break;
            case 'Tell me more':
                console.log('Find more infromation...');
                break;
            case 'Need help':
                console.log('Contact support...');
                break;
            default:
                // Handle unknown suggestion
                break;
        }
    }
</script>
```

### Customizing Suggestions

You can customize the appearance of the defined suggestions by using the `SuggestionsTemplate()` method. 

The option has a various overloads like `SuggestionsTemplateHandler()`, `SuggestionsTemplateId()`, and `SuggestionsTemplate()` that accepts a [Template component](slug:htmlhelpers_overview_template).

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
        for (let i = 0; i < suggestions.length; i++) {
            html += "<button class='custom-suggestion-btn k-suggestion'>" + suggestions[i].text + "</button>";
        }
        html += "</div>";
        return html;
    }
</script>
```

## Suggested Actions

Suggested actions are contextual buttons that appear with specific messages, typically from bots or automated systems. Unlike message suggestions, suggested actions are temporary and relate to the specific message they accompany.

### Adding Suggested Actions to Messages

To include suggested actions when posting messages, you need to post the message programmatically by setting the desired suggestions using the [`suggestedActions`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/suggestedActions) client-side property:

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .Events(ev =>
    {
        ev.SendMessage("onSendMessage"); // Handle the SendMessage event.
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" on-send-message="onSendMessage">
</kendo-chat>
```
{% endif %}
```JavaScript Scripts
<script>
    const assistant = {
        authorId: "job-assistant",
        authorName: "Job Assistant",
        authorImageUrl: "https://demos.telerik.com/aspnet-core/shared/web/Customers/RICSU.jpg",
        authorImageAltText: "Job Assistant's profile picture"
    };

    function onSendMessage(e) {
        const chat = $("#chat").getKendoChat();
        const message = {
            authorId: assistant.authorId,
            authorName: assistant.authorName,
            authorImageUrl: assistant.authorImageUrl,
            text: "I will be happy to help you. Please let me know what would you like me to do?",
            suggestedActions: [{ text: "Check Order Status" }, { text: "Cancel Order" }, { text: "Modify the Order?" }],
            id: kendo.guid(),
            timestamp: new Date()
        };

        chat.postMessage(message);
        chat.scrollToBottom();
    }
</script>
```

For a live example, visit the [Person To Bot Demo of the Chat component](https://demos.telerik.com/{{ site.platform }}/chat/person-to-bot).

### Handling Suggested Action Clicks

Suggested actions automatically trigger the `SendMessage` client-side event when clicked:

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .Events(ev =>
    {
        ev.SendMessage("onSendMessage"); // Handle the SendMessage event.
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" on-send-message="onSendMessage">
</kendo-chat>
```
{% endif %}
```JavaScript Scripts
<script>
    function onSendMessage(e) {
        console.log(e.message.text); // Retrieve the text of the clicked suggested action.
    }
</script>
```

### Customizing Suggested Actions

You can customize the appearance of suggested actions using the `SuggestedActionsTemplate()` option that accepts a [Template component](slug:htmlhelpers_overview_template). The `k-suggestions` class must be applied to the individual suggestion element. The wrapping element must have the `ref-chat-suggestion-group` attribute.

The template option provides overloads like `SuggestedActionsTemplateHandler()` and `SuggestedActionsTemplateId()`.

The following example demonstrates how to customize the default appearance of the suggested actions.

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
        let html = "<div class='custom-actions' ref-chat-suggestion-group>";
        for (let i = 0; i < suggestions.length; i++) {
            html += "<button class='custom-action-btn k-suggestion'>" + suggestions[i].text + "</button>";
        }
        html += "</div>";
        return html;
    }
</script>
```

## See Also

* [Customizing the Chat by using Templates]({% slug htmlhelpers_templates_chat %})
* [Server-Side API of the Chat HtmlHelper](/api/chat)
{% if site.core %}
* [Server-Side API of the Chat TagHelper](/api/taghelpers/chat)
{% endif %}