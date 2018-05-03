---
title: Chat
page_title: Chat | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Chat TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_chat_aspnetcore
---

# Chat TagHelper Overview

The Chat tag helper allows you to configure the Kendo UI Chart widget in ASP.NET Core applications. It is a server-side wrapper for the [Kendo UI Chat](https://demos.telerik.com/kendo-ui/chat/index) widget.

The Kendo UI Chat widget allows for integration with any Bot framework, due to its simplicity, flexible API and customizable templates. The widget supports out-of-the-box default [Cards](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#default-cards) and [Actions](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#default-actions). It also allows the configuration of [Custom Templates](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#custom-templates) and [Custom Components](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#custom-components).

## Basic Usage

The following example demonstrates how to define a Chat by using the Chat tag helper.

###### Example

    <kendo-chat name="chat"></kendo-chat>

## Configuration

The following example demonstrates the configuration options available for the Chat tag helper.

###### Example

```
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

## See Also

* [Overview of the Chat HtmlHelper for .Net Core]({% slug htmlhelpers_chat_aspnetcore %})
* [Overview of the Kendo UI Chat Widget](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview)
* [JavaScript API Reference of the Chat](http://docs.telerik.com/kendo-ui/api/javascript/ui/chat)
* [Chat HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/chat/overview)
* [Telerik UI for ASP.NET MVC API Reference: ChatBuilder](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/ChatBuilder)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
