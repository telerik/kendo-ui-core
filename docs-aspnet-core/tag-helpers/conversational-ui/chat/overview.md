---
title: Overview
page_title: Chat Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Chat TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_chat_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/chat
position: 1
---

# Chat TagHelper Overview

The Chat allows the user to participate in chat sessions with other users or with chat bots.

The widget provides support for default [cards](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#default-cards) and [actions](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#default-actions), and enables the configuration of [custom templates](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#custom-templates) and [custom components](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview#custom-components).

The Chat tag helper is a server-side wrapper for the [Kendo UI Chat for jQuery](https://demos.telerik.com/kendo-ui/chat/index) and enables you to configure the widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Chat by using the Chat tag helper.

    <kendo-chat name="chat"></kendo-chat>

## Configuration

The following example demonstrates the configuration options that are available for the Chat tag helper.

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

## Functionality and Features

The Chat provides an option for creating a [Peer-to-Peer Chat application by using SignalR]({% slug taghelpers_chat_aspnetcore_signalr %}).

## See Also

* [Basic Usage of the Kendo UI Chat Widget (Demo)](https://demos.telerik.com/kendo-ui/chat/index)
* [JavaScript API Reference of the Chat](http://docs.telerik.com/kendo-ui/api/javascript/ui/chat)
