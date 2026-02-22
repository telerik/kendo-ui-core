---
title: Suggestions
page_title: jQuery Chat Documentation - Suggestions
description: "Learn how to implement message suggestions and suggested actions in the Kendo UI for jQuery Chat component to provide quick response options for users."
components: ["chat"]
slug: suggestions_kendoui_chat
position: 6
---

# Quick Actions

The Kendo UI for jQuery Chat component provides two types of suggestion systems that enhance user interaction by offering quick response options: **Message Suggestions** and **Suggested Actions**. These features help streamline conversations by reducing typing effort and providing contextually relevant response options.

## Overview

The Chat component supports two distinct suggestion mechanisms:

* **Message Suggestions**—Global quick-reply options that appear below the message input area
* **Suggested Actions**—Contextual action buttons that appear with specific messages from bots or automated systems

Both suggestion types help improve user experience by providing pre-defined response options that users can select instead of typing manual responses.

## Message Suggestions

Message suggestions are persistent quick-reply options that appear below the chat input area. These suggestions remain visible throughout the conversation and provide users with commonly used responses or frequently asked questions.

### Basic Configuration

Configure message suggestions using the [`suggestions`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/suggestions) array in the Chat initialization:

```javascript
$("#chat").kendoChat({
    authorId: 1,
    suggestions: [
        { text: "Yes, please" },
        { text: "No, thanks" },
        { text: "Tell me more" },
        { text: "I need help" },
        { text: "Contact support" }
    ]
});
```

### Handling Suggestion Clicks

Implement the `suggestionClick` event to handle user interactions with message suggestions:

```dojo
    <div id="chat"></div>
    <script type="module">
        var chat = $("#chat").kendoChat({
            suggestions: [{ text: "Check Order Status" }, { text: "Cancel Order" }, { text: "Modify Order" }],
            dataSource: {
                data: [
                    {
                        id: 1,
                        authorId: 1,
                        authorName: "John Doe",
                        authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
                        authorImageAltText: "John's profile picture",
                        text: "How can I help you? ",
                        timestamp: new Date(2025, 6, 1),
                        isPinned: true
                    },
                ]
            },
            suggestionClick: function(e) {
                const suggestion = e.text;
                // Handle different suggestion types
                switch (suggestion) {
                    case 'Check Order Status':
                        console.log('Checking order status...');
                        break;
                    case 'Cancel Order':
                        console.log('Canceling order...');
                        break;
                    case 'Modify Order':
                        console.log('Modifying order...');
                        break;
                    default:
                        // Handle unknown suggestion
                        break;
                }
            },
        });
    </script>
```

### Custom Suggestion Templates

You can customize the appearance of suggestions using the [`suggestionTemplate`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/suggestionTemplate) :

```dojo
    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "What would you like to do today? Check out the custom suggestions below:",
            authorId: "assistant",
            authorName: "Virtual Assistant",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "I'd like to check the weather please.",
            authorId: "user",
            authorName: "User",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        suggestions: [
            { text: "Check Weather" },
            { text: "Set Reminder" },
            { text: "Play Music" },
            { text: "Get News" },
            { text: "Help" }
        ],
        suggestionsTemplate: function(suggestions) {
            let html = "<div class='custom-suggestions' ref-chat-suggestion-group>";
            for (let i = 0; i < suggestions.length; i++) {
                html += "<button class='custom-suggestion-btn k-suggestion'>" + suggestions[i].text + "</button>";
            }
            html += "</div>";
            return html;
        },
        authorId: "user",
        dataSource: messagesData
    });
    </script>
```


## Suggested Actions

Suggested actions are contextual buttons that appear with specific messages, typically from bots or automated systems. Unlike message suggestions, suggested actions are temporary and relate to the specific message they accompany.

### Adding Suggested Actions to Messages

Include suggested actions when posting messages using the [`suggestedActions`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/suggestedActions) property:

```dojo
        <div id="chat"></div>

        <script>
            var chat = $("#chat").kendoChat({    
                authorId: 1,            
                dataSource: {
                    data: [
                        {
                            id: 1,
                            authorId: 1,
                            authorName: "John Doe",
                            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
                            authorImageAltText: "John's profile picture",
                            text: "Hi! I need help with my order.",
                            timestamp: new Date(2025, 6, 1),
                            isPinned: true
                        },
                        {
                            id: 5,
                            authorId: 2,
                            authorName: "Jane Smith",
                            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/GOURL.jpg",
                            authorImageAltText: "Jane's profile picture",
                            text: "I will be happy to help you. Please let me know what would you like me to do?",
                            timestamp: new Date(2025, 6, 2),
                            suggestedActions: [{ text: "Check Order Status" }, { text: "Cancel Order" }, { text: "Modify the Order?" }]
                        }
                    ]
                },
            }).data("kendoChat");
        </script>
```


### Handling Suggested Action Clicks

Suggested actions automatically trigger the `sendMessage` event when clicked:

```dojo
    <div id="chat"></div>

    <script>
        var chat = $("#chat").kendoChat({                
            dataSource: {
                data: [
                    {
                        id: 1,
                        authorId: 1,
                        authorName: "John Doe",
                        authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
                        authorImageAltText: "John's profile picture",
                        text: "Hi! I need help with my order.",
                        timestamp: new Date(2025, 6, 1),
                        isPinned: true
                    },
                    {
                        id: 5,
                        authorId: 2,
                        authorName: "Jane Smith",
                        authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/GOURL.jpg",
                        authorImageAltText: "Jane's profile picture",
                        text: "I will be happy to help you. Please let me know what would you like me to do?",
                        timestamp: new Date(2025, 6, 2),
                        suggestedActions: [{ text: "Check Order Status" }, { text: "Cancel Order" }, { text: "Modify the Order?" }]
                    }
                ]
            },
            sendMessage: function(e) {
                console.log(e.message.text)
            }
        }).data("kendoChat");
    </script>
```

### Custom Suggested Actions Templates

You can customize the appearance of suggestions actions using the [`suggestiedActionTemplate`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/suggestionTemplate). The `k-suggestions` class must be applied to the individual suggestion elements. The wrapping element must have the `ref-chat-suggestion-group` attribute.

```dojo
    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "How would you like to proceed with your order?",
            authorId: "bot",
            authorName: "Order Bot",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0),
            suggestedActions: [
                { text: "Continue Shopping" },
                { text: "Checkout Now" },
                { text: "Save for Later" },
                { text: "Cancel Order" }
            ]
        }
    ];
    
    $("#chat").kendoChat({
        suggestedActionsTemplate: function(suggestions) {
            let html = "<div class='custom-actions' ref-chat-suggestion-group>";
            for (let i = 0; i < suggestions.length; i++) {
                html += "<button class='custom-action-btn k-suggestion'>" + suggestions[i].text + "</button>";
            }
            html += "</div>";
            return html;
        },
        authorId: "user",
        dataSource: messagesData
    });
    </script>
```


## See Also

* [Basic Usage of the Chat (Demo)](https://demos.telerik.com/kendo-ui/chat/index)
* [JavaScript API Reference of the Chat](/api/javascript/ui/chat)
* [Chat Overview]({% slug overview_kendoui_chat_widget %})
* [Chat Templates]({% slug templates_kendoui_chat %})
