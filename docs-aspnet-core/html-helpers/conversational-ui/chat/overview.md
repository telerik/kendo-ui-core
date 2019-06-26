---
title: Overview
page_title: Chat Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Chat HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/chat
slug: htmlhelpers_chat_aspnetcore
position: 1
---

# Chat HtmlHelper Overview

The Chat allows the user to participate in chat sessions with other users or with chat bots.

The widget provides support for default [cards](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#default-cards) and [actions](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#default-actions), and enables the configuration of [custom templates](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#custom-templates) and [custom components](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#custom-components).

The Chat HtmlHelper extension is a server-side wrapper for the [Kendo UI Chat](https://demos.telerik.com/kendo-ui/chat/index) widget. For more information on new Chat features, refer to the [Kendo UI Roadmap](http://www.telerik.com/support/whats-new/kendo-ui-web/roadmap). For more information on the Chat HtmlHelper for ASP.NET MVC, refer to [the UI for ASP.NET MVC documentation](http://docs.telerik.com/aspnet-mvc/helpers/chat/overview).

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

* [Basic Usage of the Chat HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/chat/index)
* [Basic Usage of the Kendo UI Chat Widget (Demo)](https://demos.telerik.com/kendo-ui/chat/index)
* [JavaScript API Reference of the Kendo UI Chat](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat)
