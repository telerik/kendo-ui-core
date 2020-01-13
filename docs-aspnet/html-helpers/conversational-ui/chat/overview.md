---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Chat HtmlHelper for {{ site.framework }}."
previous_url: /helpers/html-helpers/chat, /helpers/conversational-ui/chat/overview
slug: htmlhelpers_chat_aspnetcore
position: 1
---

# Chat HtmlHelper Overview

The Telerik UI Chat HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Chat widget.


* [Demo page for the Chat](https://demos.telerik.com/{{ site.platform }}/chat/index)

## Initializing the Chat

The following example demonstrates how to define the Chat by using the Chat HtmlHelper.

    @(Html.Kendo().Chat()
        // The name of the Chat is mandatory.
        // It specifies the "id" and the "name" attributes of the widget.
        .Name("chat")
    )

## Basic Configuration

The following example demonstrates the available configuration options supported by the Chat HtmlHelper.

```
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

## Functionality and Features

The Chat provides an option for creating a [Peer-to-Peer Chat application by using SignalR]({% slug htmlhelpers_chat_aspnetcore_signalr %}).   

## See Also

* [Basic Usage of the Chat HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chat/index)
* [Server-Side API](/api/chat)
