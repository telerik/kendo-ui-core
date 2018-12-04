---
title: Overview
page_title: Chat | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Chat HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/chat
slug: htmlhelpers_chat_aspnetcore
position: 1
---

# Chat HtmlHelper Overview

The Chat HtmlHelper extension is a server-side wrapper for the [Kendo UI Chat](https://demos.telerik.com/kendo-ui/chat/index) widget.

The Chat allows the user to participate in chat sessions with other users or with chat bots. The widget provides support for default [cards](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#default-cards) and [actions](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#default-actions), and enables the configuration of [custom templates](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#custom-templates) and [custom components](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#custom-components).

For more information on new Chat features, refer to the [Kendo UI Roadmap](http://www.telerik.com/support/whats-new/kendo-ui-web/roadmap).

For more information on the HtmlHelper, refer to the article on the [Chat HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/chat/overview).

## Basic Usage

The following example demonstrates how to define the Chat by using the Chat HtmlHelper.

###### Example

    @(Html.Kendo().Chat()
        //The name of the Chat is mandatory.
        //It specifies the "id" and the "name" attributes of the widget.
        .Name("chat")
    )

## Configuration

The following example demonstrates the configuration options that are available for the Chat HtmlHelper.

###### Example

```
    @(Html.Kendo().Chat()
        .Name("chat")
        // The Chat User configuration
        .User(u => u
            .Name("ChatBot Name")
            .IconUrl("https://demos.telerik.com/kendo-ui/content/chat/avatar.png")
        )
        // Attaching the event handlers
        .Events(e => e
            .Post("onPost")
            .ActionClick("onActionClick")
            .SendMessage("onSendMessage")
            .TypingStart("onTypingStart")
            .TypingEnd("onTypingEnd")
        )
        // Configuring the Placeholder message
        .Messages(m => m
            .Placeholder("Type your message")
        )
    )
```

## See Also

* [Overview of the Chat TagHelper for .Net Core]({% slug taghelpers_chat_aspnetcore %})
* [Overview of the Kendo UI Chat Widget](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview)
* [JavaScript API Reference of the Chat](http://docs.telerik.com/kendo-ui/api/javascript/ui/chat)
* [Chat HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/chat/overview)
* [Telerik UI for ASP.NET MVC API Reference: ChatBuilder](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/ChatBuilder)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
