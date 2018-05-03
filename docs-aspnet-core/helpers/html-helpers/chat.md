---
title: Chat
page_title: Chat | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Chat HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_chat_aspnetcore
---

# Chat HtmlHelper Overview

The Chat HtmlHelper extension is a server-side wrapper for the [Kendo UI Chat](https://demos.telerik.com/kendo-ui/chat/index) widget.

The Kendo UI Chat widget allows for integration with any Bot framework, due to its simplicity, flexible API and customizable templates. The widget supports out-of-the-box default [Cards](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#default-cards) and [Actions](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#default-actions). It also allows the configuration of [Custom Templates](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#custom-templates) and [Custom Components](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#custom-components).

For additional information on new Kendo UI Chat features, refer to the [Kendo UI Roadmap](http://www.telerik.com/support/whats-new/kendo-ui-web/roadmap).

For more information on the HtmlHelper, refer to the article on the [Chat HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/chat/overview).

## Basic Usage

The following example demonstrates how to define a Chat by using the Chat HtmlHelper.

###### Example

```tab-Razor
    @(Html.Kendo().Chat()
        //The name of the Chat is mandatory. It specifies the "id" and the "name" attributes of the widget.
        .Name("chat")
    )
```

## Configuration

The following example demonstrates the configuration options available for the Chat HtmlHelper.

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
