---
title: Tools
page_title: jQuery Chat Documentation - Tools
description: "Learn how to configure message actions and interactive tools in the Kendo UI for jQuery Chat component."
components: ["chat"]
slug: tools_kendoui_chat
position: 4
---

# Tools

The jQuery Chat component delivers powerful message interaction features that allow users to engage with individual messages through customizable actions and interactive tools. This guide explores how to implement message-specific functionality and enhanced user interaction patterns.

## Context Menu Message Actions

Right-click functionality on chat messages reveals a context menu with actionable options for enhanced user productivity. This feature streamlines message management by providing instant access to common operations without disrupting the conversation flow.

Built-in options include Reply, Copy, Pin, and Delete, while the [`messageActions`](https://www.telerik.com/kendo-jquery-ui/documentation/api/ui/chat/configuration/messageactions) configuration allows you to add custom operations tailored to your application's workflow requirements.

```dojo
<div id="chat"></div>

<script>
    $("#chat").kendoChat({
        authorId: "currentUser",
        dataSource: [
            {
                id: 1,
                text: "Welcome to our support chat!",
                authorId: "support_agent",
                authorName: "Sarah Johnson",
                authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
                timestamp: new Date(2024, 11, 25, 9, 30)
            },
            {
                id: 2,
                text: "Hello! I need help with my order.",
                authorId: "currentUser",
                authorName: "John Smith",
                authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
                timestamp: new Date(2024, 11, 25, 9, 32)
            },
            {
                id: 3,
                text: "I'd be happy to help you with that. Can you provide your order number?",
                authorId: "support_agent",
                authorName: "Sarah Johnson",
                authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
                timestamp: new Date(2024, 11, 25, 9, 33)
            }
        ],
        messageActions: [
            { name: "copy", text: "Copy Text", icon: "copy" },
            { name: "reply", text: "Respond", icon: "undo" },
            { name: "delete", text: "Remove", icon: "trash" },
            { name: "pin", text: "Pin Message", icon: "pin" },
            { name: "forward", text: "Share", icon: "share" }
        ],
        contextMenuAction: function(e) {
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
            }
        }
    });
</script>
```

## Message Toolbar Actions

Interactive toolbar buttons appear on individual messages to offer immediate access to frequently used operations. These action buttons enhance user efficiency by eliminating the need for multiple clicks or menu navigation when performing routine message tasks.

Configure toolbar actions using the [`messageToolbarActions`](https://www.telerik.com/kendo-jquery-ui/documentation/api/ui/chat/configuration/messagetoolbaractions) property and implement response logic through the [`toolbarAction`](https://www.telerik.com/kendo-jquery-ui/documentation/api/ui/chat/events/toolbaraction) event handler for seamless user interactions.

```dojo
<div id="chat"></div>

<script>
    $("#chat").kendoChat({
        authorId: "currentUser",
        dataSource: [
            {
                id: 1,
                text: "Welcome to our support chat!",
                authorId: "support_agent",
                authorName: "Sarah Johnson",
                authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
                timestamp: new Date(2024, 11, 25, 9, 30)
            },
            {
                id: 2,
                text: "Hello! I need help with my order.",
                authorId: "currentUser",
                authorName: "John Smith",
                authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
                timestamp: new Date(2024, 11, 25, 9, 32)
            },
            {
                id: 3,
                text: "I'd be happy to help you with that. Can you provide your order number?",
                authorId: "support_agent",
                authorName: "Sarah Johnson",
                authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
                timestamp: new Date(2024, 11, 25, 9, 33)
            }
        ],
        messageToolbarActions: [
            { name: "edit", icon: "pencil" },
            { name: "delete", icon: "trash" },
            { name: "refresh", icon: "arrow-rotate-cw" }
        ],
        toolbarAction: function(e) {
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
    });
</script>
```

## Per-User Message Settings

The Chat component supports configuring different message display settings for the current user (author) and other participants (receivers) through the [`authorMessageSettings`](https://www.telerik.com/kendo-jquery-ui/documentation/api/ui/chat/configuration/authormessagesettings) and [`receiverMessageSettings`](https://www.telerik.com/kendo-jquery-ui/documentation/api/ui/chat/configuration/receivermessagesettings) options. These settings allow you to create asymmetric chat layouts, such as WhatsApp-style interfaces where the author's messages hide the avatar and username while receiver messages display both.

Each settings object supports the following properties:

| Property | Type | Description |
|---|---|---|
| `showAvatar` | `Boolean` | Whether to display the avatar image next to messages. |
| `showUsername` | `Boolean` | Whether to display the username label above messages. |
| `messageWidthMode` | `String` | Message width mode: `"standard"` or `"full"`. |
| `enableFileActions` | `Boolean` | Whether file actions are available for the user's messages. |
| `enableContextMenuActions` | `Boolean` | Whether the context menu is available for the user's messages. |
| `messageToolbarActions` | `Array` | Toolbar actions specific to the user's messages. |
| `messageActions` | `Array` | Context menu actions specific to the user's messages. |
| `messageContentTemplate` | `Function` | Content template override for the user's messages. |

### Configuring Avatar and Username Visibility

The following example demonstrates a WhatsApp-style layout where the author's messages hide the avatar and username, while receiver messages display both:

```dojo
<div id="chat"></div>

<script>
    $("#chat").kendoChat({
        height: 500,
        authorId: 1,
        authorMessageSettings: {
            showAvatar: false,
            showUsername: false
        },
        receiverMessageSettings: {
            showAvatar: true,
            showUsername: true,
            messageWidthMode: "full"
        },
        dataSource: {
            data: [
                {
                    id: 1, authorId: 1, authorName: "You",
                    authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/ANATR.jpg",
                    text: "Hey! Did you finish the design review?",
                    timestamp: new Date(2025, 7, 20, 14, 30), status: "seen"
                },
                {
                    id: 2, authorId: 2, authorName: "Emma",
                    authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/DUMON.jpg",
                    text: "Yes! I just sent the final mockups to the client.",
                    timestamp: new Date(2025, 7, 20, 14, 35)
                },
                {
                    id: 3, authorId: 1, authorName: "You",
                    authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/ANATR.jpg",
                    text: "That's amazing! Great work on the color palette choices.",
                    timestamp: new Date(2025, 7, 20, 14, 40), status: "delivered"
                }
            ]
        }
    });
</script>
```

### Per-User Toolbar Actions

You can configure different toolbar actions for author and receiver messages. For example, author messages may include a delete action while receiver messages offer a copy action:

```dojo
<div id="chat"></div>

<script>
    $("#chat").kendoChat({
        height: 500,
        authorId: 1,
        authorMessageSettings: {
            messageToolbarActions: [
                { name: "reply", icon: "undo" },
                { name: "delete", icon: "trash" }
            ]
        },
        receiverMessageSettings: {
            messageToolbarActions: [
                { name: "reply", icon: "undo" },
                { name: "copy", icon: "copy" }
            ]
        },
        dataSource: {
            data: [
                {
                    id: 1, authorId: 1, authorName: "Lora",
                    authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/ANATR.jpg",
                    text: "Can you send me the preview link?",
                    timestamp: new Date(2025, 7, 20, 14, 30)
                },
                {
                    id: 2, authorId: 2, authorName: "Emma",
                    authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/DUMON.jpg",
                    text: "Sure! Here it is: https://example.com/preview",
                    timestamp: new Date(2025, 7, 20, 14, 35)
                }
            ]
        },
        toolbarAction: function(e) {
            console.log("Toolbar action:", e.type);
        }
    });
</script>
```

## Message Styling

Visual customization options enable you to tailor message presentation to align with your application's design language and user experience requirements.

### Expandable Message Content

Long message content can be made collapsible to optimize screen real estate while maintaining access to full information. Users can toggle between expanded and collapsed states by clicking on messages, creating a cleaner interface for extensive conversations. Enable the [`allowMessageCollapse`](https://www.telerik.com/kendo-jquery-ui/documentation/api/ui/chat/configuration/allowmessagecollapse) option to allow the users to collapse the messages. 

```dojo
<div id="chat"></div>

<script>
    $("#chat").kendoChat({
        authorId: "currentUser",
        allowMessageCollapse: true,
        dataSource: [
            {
                id: 1,
                text: "Welcome to our customer support chat! I'm Sarah, and I'll be assisting you today with any questions or concerns you may have. How can I help make your experience better?",
                authorId: "support_agent",
                authorName: "Sarah Johnson",
                authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
                timestamp: new Date(2024, 11, 25, 9, 30)
            },
            {
                id: 2,
                text: "Hello Sarah! I placed an order last week but I haven't received any shipping confirmation yet. I'm getting a bit worried because it was supposed to be a gift for my daughter's birthday. Could you please help me track down what's happening with my order?",
                authorId: "currentUser",
                authorName: "John Smith",
                authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
                timestamp: new Date(2024, 11, 25, 9, 32)
            },
            {
                id: 3,
                text: "I completely understand your concern, John, and I'm sorry for the delay in communication. Let me look up your order details right away to see what's causing the holdup. Could you please provide me with your order number or the email address you used when placing the order?",
                authorId: "support_agent",
                authorName: "Sarah Johnson",
                authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
                timestamp: new Date(2024, 11, 25, 9, 33)
            }
        ]
    });
</script>
```

### Message Width Configuration

Message width behavior can be controlled through the `messageWidthMode` setting to optimize readability and visual hierarchy. Choose between adaptive sizing and full-width display based on your content strategy and design preferences.

```javascript
// Adaptive width sizing (default behavior)
$("#chat").kendoChat({
    authorId: "user001",
    messageWidthMode: "standard"
});

// Full container width utilization
$("#chat").kendoChat({
    authorId: "user001",
    messageWidthMode: "full"
});
```

The `standard` setting provides balanced spacing and readability, while `full` maximizes horizontal space utilization for detailed content display.

### File Attachment Layout

The `filesLayoutMode` option controls the arrangement of file attachments within messages. Available modes are `"vertical"` (stacked, default), `"horizontal"` (side-by-side with scrolling), and `"wrap"` (wrapping flow layout):

```javascript
$("#chat").kendoChat({
    authorId: "user001",
    filesLayoutMode: "vertical"
});
```

## Message Status

The Chat component supports displaying delivery status indicators for messages through the [`messageStatusSettings`](https://www.telerik.com/kendo-jquery-ui/documentation/api/ui/chat/configuration/messagestatussettings) option. You can configure custom icons, text labels, and CSS classes for each delivery state�`"sent"`, `"delivered"`, `"seen"`, and `"failed"`:

```dojo
<div id="chat"></div>

<script>
    $("#chat").kendoChat({
        authorId: 1,
        height: 500,
        messageStatusSettings: {
            sent: { icon: "check", text: "Sent" },
            delivered: { icon: "check-circle", text: "Delivered" },
            seen: { icon: "eye", text: "Seen", cssClass: "k-text-primary" },
            failed: { icon: "x-circle", text: "Failed", cssClass: "k-text-error" }
        },
        dataSource: {
            data: [
                {
                    id: 1, authorId: 1, authorName: "You",
                    text: "This message was sent.", timestamp: new Date(2025, 7, 15, 9, 0),
                    status: "sent"
                },
                {
                    id: 2, authorId: 1, authorName: "You",
                    text: "This message was delivered.", timestamp: new Date(2025, 7, 15, 9, 5),
                    status: "delivered"
                },
                {
                    id: 3, authorId: 1, authorName: "You",
                    text: "This message was seen.", timestamp: new Date(2025, 7, 15, 9, 10),
                    status: "seen"
                }
            ]
        }
    });
</script>
```

## Failed Messages and Retry

Messages can be marked as failed by setting the `failed` property to `true`. When a message is in a failed state, the Chat renders a retry button that, when clicked, fires the [`resendMessage`](https://www.telerik.com/kendo-jquery-ui/documentation/api/ui/chat/events/resendmessage) event. Use this event to re-attempt message delivery:

```dojo
<div id="chat"></div>

<script>
    var chat = $("#chat").kendoChat({
        authorId: 1,
        height: 500,
        dataSource: {
            data: [
                {
                    id: 1, authorId: 1, authorName: "You",
                    text: "This message failed to send � click retry to resend.",
                    timestamp: new Date(), failed: true
                }
            ]
        },
        resendMessage: function(e) {
            var sender = e.sender;
            sender.updateMessage(e.message, { failed: false, status: "sent" });

            setTimeout(function() {
                sender.updateMessage(e.message, { status: "delivered" });
            }, 1000);
        }
    }).data("kendoChat");
</script>
```

## Loading State

The Chat component provides a `loading()` method that toggles the send button between its default state and a loading/stop indicator. This is particularly useful for AI chat applications where generating responses takes time:

```javascript
var chat = $("#chat").data("kendoChat");

// Show loading state
chat.loading(true);

// Hide loading state
chat.loading(false);
```

## See Also 

* [Per-User Settings (Demo)](https://demos.telerik.com/kendo-ui/chat/per-user-settings)
* [JavaScript API Reference of the Chat](/api/ui/chat)
* [Chat Templates]({% slug templates_kendoui_chat %})
* [Chat Suggestions]({% slug suggestions_kendoui_chat %})
* [File Uploads and Media]({% slug media_kendoui_chat %})
* [Demo Page for the Chat](https://demos.telerik.com/kendo-ui/chat/index)
