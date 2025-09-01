---
title: Tools
page_title: Telerik UI Chat Documentation - Tools
description: "Learn how to configure message actions and interactive tools in the Telerik UI for {{ site.framework }} Chat component."
slug: htmlhelpers_tools_chat
position: 4
---

# Tools

The Chat component delivers powerful message interaction features that allow users to engage with individual messages through customizable actions and interactive tools. This guide explores how to implement message-specific functionality and enhanced user interaction patterns.

## Context Menu Message Actions

Right-click functionality on chat messages reveals a context menu with actionable options for enhanced user productivity. This feature streamlines message management by providing instant access to common operations without disrupting the conversation flow.

The built-in options include **Reply**, **Copy**, and **Pin**, while the `MessageActions()` configuration allows you to add custom operations tailored to your application's workflow requirements.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .MessageActions(actions =>
    {
        actions.Add().Name("copy").Text("Copy").Icon("copy");
        actions.Add().Name("reply").Text("Reply").Icon("undo");
        actions.Add().Name("pin").Text("Pin").Icon("pin");
        actions.Add().Name("delete").Text("Delete").Icon("trash");
        actions.Add().Name("forward").Text("Share").Icon("share");
    })
    .Events(ev =>
    {
        ev.ContextMenuAction("onContextMenuAction"); // Handle the ContextMenuAction event.
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" on-context-menu-action="onContextMenuAction">
    <message-actions>
        <message-action name="copy" text="Copy" icon="copy" />
        <message-action name="reply" text="Reply" icon="undo" />
        <message-action name="pin" text="Pin" icon="pin" />
        <message-action name="delete" text="Delete" icon="trash" />
        <message-action name="forward" text="Share" icon="share" />
    </message-actions>
</kendo-chat>
```
{% endif %}
```JS Scripts
<script>
    function onContextMenuAction(e) {
        console.log("Menu action selected:", e.type, "for message:", e.message.text);
        switch (e.type) {
            case "copy":
                navigator.clipboard.writeText(e.message.text);
                alert("Text copied to clipboard!");
                break;
            case "delete":
                if (confirm("Remove this message permanently?")) {
                    this.removeMessage(e.message);
                }
                break;
            ...
        }
    }
</script>
```

## Message Toolbar Actions

Interactive toolbar buttons appear on individual messages to offer immediate access to frequently used operations. These action buttons enhance user efficiency by eliminating the need for multiple clicks or menu navigation when performing routine message tasks.

You can configure the toolbar actions using the `MessageToolbarActions()` configuration and implement response logic through the `ToolbarAction` client-side event for seamless user interactions.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .MessageToolbarActions(actions =>
    {
        actions.Add().Name("edit").Icon("pencil");
        actions.Add().Name("delete").Icon("trash");
        actions.Add().Name("refresh").Icon("arrow-rotate-cw");
    })
    .Events(ev =>
    {
        ev.ToolbarAction("onToolbarAction"); // Handle the ToolbarAction event.
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" on-toolbar-action="onToolbarAction">
    <message-toolbar-actions>
        <message-toolbar-action name="edit" icon="pencil" />
        <message-toolbar-action name="delete" icon="trash" />
        <message-toolbar-action name="refresh" icon="arrow-rotate-cw" />
    </message-toolbar-actions>
</kendo-chat>
```
{% endif %}
```JS Scripts
<script>
    function onToolbarAction(e) {
        switch (e.type) {
            case "edit":
                const updatedText = prompt("Modify message content:", e.message.text);
                if (updatedText) {
                    this.updateMessage(e.message, { text: updatedText });
                }
                break;
            case "delete":
                this.removeMessage(e.message);
                break;
        }
    }
</script>
```

## Message Styling

Visual customization options enable you to tailor message presentation to align with your application's design language and user experience requirements.

### Expandable Message Content

Long message content can be made collapsible to optimize screen real estate while maintaining access to full information. Users can toggle between expanded and collapsed states by clicking on messages, creating a cleaner interface for extensive conversations. Enable the `AllowMessageCollapse()` option to allow users to collapse the messages. 

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .AllowMessageCollapse(true)
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" allow-message-collapse="true">
</kendo-chat>
```
{% endif %}

### Message Width Configuration

Message width behavior can be controlled through the `MessageWidthMode()` setting to optimize readability and visual hierarchy. Choose between adaptive sizing and full-width display based on your content strategy and design preferences.

The `MessageWidthMode.Standard` setting provides balanced spacing and readability, while `MessageWidthMode.Full` maximizes horizontal space utilization for detailed content display.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .MessageWidthMode(MessageWidthMode.Full) // or "MessageWidthMode.Standard"
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" message-width-mode="MessageWidthMode.Full"> <!-- or "MessageWidthMode.Standard"-->
</kendo-chat>
```
{% endif %}

## See Also

* [Handling Attachments in the Chat]({% slug htmlhelpers_files_and_media_chat %})
* [Server-Side API of the Chat HtmlHelper](/api/chat)
{% if site.core %}
* [Server-Side API of the Chat TagHelper](/api/taghelpers/chat)
{% endif %}
* [Client-Side API of the Chat](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat)