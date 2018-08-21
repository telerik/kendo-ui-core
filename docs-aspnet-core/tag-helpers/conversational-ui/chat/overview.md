---
title: Overview
page_title: Chat | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Chat TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_chat_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/chat
position: 1
---

# Chat TagHelper Overview

The Chat tag helper is a server-side wrapper for the [Kendo UI Chat for jQuery](https://demos.telerik.com/kendo-ui/chat/index) and allows you to configure the widget in ASP.NET Core applications.

The Chat widget allows the user to participate in chat sessions with other users or with chat bots. The widget provides support for default [cards](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#default-cards) and [actions](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#default-actions), and enables the configuration of [custom templates](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#custom-templates) and [custom components](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#custom-components).

## Basic Usage

The following example demonstrates how to define the Chat by using the Chat tag helper.

###### Example

    <kendo-chat name="chat"></kendo-chat>

## Configuration

The following example demonstrates the configuration options that are available for the Chat tag helper.

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
* [Peer-to-Peer Chat with SignalR]({% slug taghelpers_chat_aspnetcore_signalr %})
* [Overview of the Kendo UI Chat Widget](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview)
* [JavaScript API Reference of the Chat](http://docs.telerik.com/kendo-ui/api/javascript/ui/chat)
* [Chat HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/chat/overview)
* [Telerik UI for ASP.NET MVC API Reference: ChatBuilder](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/ChatBuilder)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
