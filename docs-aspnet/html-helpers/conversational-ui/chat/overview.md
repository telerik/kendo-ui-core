---
title: Overview
page_title: Chat Overview
description: "Learn the basics when working with the Telerik UI Chat component for {{ site.framework }}."
previous_url: /helpers/html-helpers/chat, /helpers/conversational-ui/chat/overview
slug: htmlhelpers_chat_aspnetcore
position: 0
---

# {{ site.framework }} Chat Overview

{% if site.core %}
The Telerik UI Chat TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Chat widget. To add the component to your ASP.NET Core app, you can use either.
{% else %}
The Telerik UI Chat HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Chat widget.
{% endif %}

The Chat allows the user to participate in chat sessions with other users or with chat bots. It provides support for default cards and actions, and enables the configuration of custom templates and custom components.

* [Demo page for the Chat](https://demos.telerik.com/{{ site.platform }}/chat/index)

## Initializing the Chat

The following example demonstrates how to define the Chat.

```HtmlHelper
    @(Html.Kendo().Chat()
        // The name of the Chat is mandatory.
        // It specifies the "id" and the "name" attributes of the widget.
        .Name("chat")
    )
```
{% if site.core %}
```TagHelper
    <kendo-chat name="chat"></kendo-chat>
```
{% endif %}

## Basic Configuration

The following example demonstrates the available configuration options supported by the Chat component.

```HtmlHelper
    @(Html.Kendo().Chat()
        .Name("chat")
        // The user configuration of the Chat.
        .User(u => u
            .Name("ChatBot Name")
            .IconUrl("https://demos.telerik.com/kendo-ui/content/chat/avatar.png")
        )
        // Attach the event handlers.
        .Events(e => e
            .Post("onPost")
            .ActionClick("onActionClick")
            .SendMessage("onSendMessage")
            .TypingStart("onTypingStart")
            .TypingEnd("onTypingEnd")
        )
        // Configure the placeholder message.
        .Messages(m => m
            .Placeholder("Type your message")
        )
    )
```
{% if site.core %}
```TagHelper
    <!-- Initializing the Chat and attaching the event handlers -->
    <kendo-chat name="chat"
        on-post="onPost"
        on-action-click="onActionClick"
        on-send-message="onSendMessage"
        on-typing-start="onTypingStart"
        on-typing-end="onTypingEnd">
            <!-- The Chat User configuration -->
            <user name="ChatBot Name"
                icon-url="https://demos.telerik.com/kendo-ui/content/chat/avatar.png" />
            <!-- Configuring the Placeholder message -->
            <messages placeholder="Type your message" />
    </kendo-chat>
```
{% endif %}

## Functionality and Features

* [Toolbar]({% slug htmlhelpers_chat_toolbar_aspnetcore %})—The component allows you to add toolbar actions for achieving a more user-friendly conversational UI.
* [Peer-to-Peer Chat]({% slug htmlhelpers_chat_aspnetcore_signalr %})—The Chat provides an option for creating a peer-to-peer Chat application by using SignalR.

## Next Steps

* [Getting Started with the Chat]({% slug aspnetcore_chat_getting_started %})
* [Basic Usage of the Chat for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chat/)
{% if site.core %}
* [Chat in Razor Pages]({% slug htmlhelpers_chat_razorpage_aspnetcore %})
{% endif %}


## See Also

* [Client-Side API of the Chat for {{ site.framework}}](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat)
* [Server-Side API of the Chat for {{ site.framework }}](/api/chat)
* [Knowledge Base Section](/knowledge-base)
