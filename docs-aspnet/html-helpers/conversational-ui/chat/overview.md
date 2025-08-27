---
title: Overview
page_title: Chat Overview
description: "Learn the basics when working with the Telerik UI Chat component for {{ site.framework }}."
previous_url: /helpers/html-helpers/chat, /helpers/conversational-ui/chat/overview, /html-helpers/conversational-ui/chat/toolbar
slug: htmlhelpers_chat_aspnetcore
position: 0
---

# {{ site.framework }} Chat Overview

> Starting with version 2025.3.825, the Chat component has been completely redesigned. The API is updated accordingly to support the newly introduced features.

{% if site.core %}
The Telerik UI Chat TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Chat widget. To add the component to your ASP.NET Core app, you can use either.
{% else %}
The Telerik UI Chat HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Chat widget.
{% endif %}

The Chat component delivers a modern conversational interface designed to enhance user interaction and communication within web applications. It facilitates seamless communication between users, chatbots, and AI-powered systems through an intuitive and highly customizable interface. The component offers extensive functionality, including message threading, file attachments, user avatars, quick action suggestions, and comprehensive accessibility support. Built with flexibility in mind, it enables easy integration with various messaging services, machine learning models, and custom business workflows to meet diverse application requirements.

* [Demo page for the Chat](https://demos.telerik.com/{{ site.platform }}/chat/index)

## Initializing the Chat

The following example demonstrates how to define a Chat.

```HtmlHelper
    @(Html.Kendo().Chat()
        // The name of the Chat is mandatory.
        // It specifies the "id" and the "name" attributes of the widget.
        .Name("chat")
        .Height("600px")
        .Width("400px")
        .AuthorId("1")
    )
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat"
    width="400"
    height="600"
    author-id="1">
</kendo-chat>
```
{% endif %}

## Basic Configuration

The following example demonstrates how to define header items, predefined suggestions, and configure attachments and message actions.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .HeaderItems(items => {
        items.Add().Type(AppBarItemType.ContentItem).Template("<strong>Customer Support Chat</strong>");
        items.Add().Type(AppBarItemType.Spacer);
        items.Add().Type(AppBarItemType.ContentItem).Template("<button>Export</button>");
    })
    .FileActions(actions =>
    {
        actions.Add().Name("download").Text("Download").Icon("download");
    })
    .MessageToolbarActions(actions =>
    {
        actions.Add().Name("settings").Icon("gear");
        actions.Add().Name("share").Icon("share");
    })
    .MessageActions(actions =>
    {
        actions.Add().Name("copy").Text("Copy").Icon("copy");
        actions.Add().Name("pin").Text("Pin").Icon("pin");
        actions.Add().Name("delete").Text("Delete").Icon("trash");
    })
    .Suggestions(suggestions => {
        suggestions.Add().Text("Analyse a file");
        suggestions.Add().Text("Generate a cover letter");
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat">
    <header-items>
        <header-item type="AppBarItemType.ContentItem" template="<strong>Customer Support Chat</strong>"/>
        <header-item type="AppBarItemType.Spacer"/>
        <header-item type="AppBarItemType.ContentItem" template="<button>Export</button>"/>
    </header-items>
    <file-actions>
        <file-action name="download" text="Download" icon="download" />
    </file-actions>
    <message-toolbar-actions>
        <message-toolbar-action name="settings" icon="gear" />
        <message-toolbar-action name="share" icon="share" />
    </message-toolbar-actions>
    <message-actions>
        <message-action name="copy" text="Copy" icon="copy" />
        <message-action name="pin" text="Pin" icon="pin" />
        <message-action name="delete" text="Delete" icon="trash" />
    </message-actions>
    <suggestions>
        <suggestion text="Analyse a file" />
        <suggestion text="Generate a cover letter" />
    </suggestions>
</kendo-chat>
```
{% endif %}

## Functionality and Features

|Feature|Description|
|-------|-----------|
| [Data Binding]({% slug htmlhelpers_databinding_overview_chat %}) | Bind the Chat either to a local data collection or to data retrieved from a remote endpoint. |
| [AI Integration]({% slug htmlhelpers_ai_integration_chat %}) | Configure the Chat to interact with a large language model through a streaming AI chat service. |
| [Tools]({% slug htmlhelpers_tools_chat %}) | Utilize the available context menu actions and toolbar commands. |
| [File Uploads and Media]({% slug htmlhelpers_files_and_media_chat %}) | Enable file uploads, media sharing, and speech-to-text functionality of the Chat component. |
| [Quick Actions]({% slug htmlhelpers_quick_actions_chat %}) | Define quick response suggestions that appear above the message box. |
| [Templates]({% slug htmlhelpers_templates_chat %}) | Use template options to customize the rendering of the messages, attachments, quick actions, and more. |
| [Peer-to-Peer Chat]({% slug htmlhelpers_chat_aspnetcore_signalr %}) | Create a peer-to-peer Chat application using SignalR. |
| [Events]({% slug events_chat_aspnetcore %}) | Subscribe to the available client-side events to implement any custom logic. |
| [Accessibility]({% slug htmlhelpers_chat_accessibility %}) | The Chat is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts]({% slug keynav_aspnetcore_chat %}) for faster navigation. |

## Next Steps

* [Getting Started with the Chat]({% slug aspnetcore_chat_getting_started %})
* [Basic Usage of the Chat for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chat/)
{% if site.core %}
* [Chat in Razor Pages]({% slug htmlhelpers_chat_razorpage_aspnetcore %})
{% endif %}

## See Also

* [Using the API of the Chat (Demo)](https://demos.telerik.com/{{ site.platform }}/chat/api)
* [Server-Side API of the Chat HtmlHelper](/api/chat)
{% if site.core %}
* [Server-Side API of the Chat TagHelper](/api/taghelpers/chat)
{% endif %}
* [Client-Side API of the Chat](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat)
