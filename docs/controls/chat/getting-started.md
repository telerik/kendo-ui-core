---
title: Getting Started
page_title: jQuery Chat Documentation - Getting Started with the Chat
description: "Get started with the jQuery Chat by Kendo UI and learn how to create and initialize the component in a few easy steps."
components: ["chat"]
slug: getting_started_kendoui_chat_component
position: 2
---

# Getting Started with the Chat 

This guide demonstrates how to get up and running with the Kendo UI for jQuery Chat. You will learn how to initialize the component, configure data sources, add suggestions, set dimensions, configure header items, and handle context menu actions.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="chat"></div>
    <script>
        // Sample chat data
        let chatData = [
            {
                id: 1,
                text: "Welcome to our support chat! How can I help you today?",
                authorId: "support_agent",
                authorName: "Sarah Johnson",
                authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
                timestamp: new Date(2024, 11, 1, 10, 0),
                isPinned: true
            },
            {
                id: 2,
                text: "Hi! I have a question about your products.",
                authorId: "customer",
                authorName: "Alex Smith",
                authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
                timestamp: new Date(2024, 11, 1, 10, 2)
            },
            {
                id: 3,
                text: "I'd be happy to help! What specific product information do you need?",
                authorId: "support_agent",
                authorName: "Sarah Johnson",
                authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
                timestamp: new Date(2024, 11, 1, 10, 3)
            }
        ];

        $("#chat").kendoChat({
            // Set current user
            authorId: "customer",
            
            // Configure data source
            dataSource: {
                data: chatData
            },
            
            // Set component dimensions
            width: 600,
            height: 500,
            
            // Configure suggestions for quick replies
            suggestions: [
                { text: "Product Information" },
                { text: "Pricing Details" },
                { text: "Technical Support" },
                { text: "Contact Sales" },
                { text: "Thank you" }
            ],
            
            // Configure header toolbar
            headerItems: [
                {
                    type: "contentItem",
                    template: () => "<strong>Customer Support Chat</strong>"
                },
                {
                    type: "spacer"
                },
                {
                    type: "contentItem",
                    template: () => `${kendo.ui.icon('gear')}`
                }
            ],
            
            // Configure context menu actions
            messageActions: [
                { name: "reply", text: "Reply", icon: "undo" },
                { name: "copy", text: "Copy", icon: "copy" },
                { name: "pin", text: "Pin", icon: "pin" },
                { name: "forward", text: "Forward", icon: "share" },
                { name: "delete", text: "Delete", icon: "trash" }
            ],
            
            // Handle suggestion clicks
            suggestionClick: function(e) {
                console.log("Suggestion clicked:", e.text);
                
                // Simulate bot response based on suggestion
                setTimeout(() => {
                    let response = "";
                    switch(e.text) {
                        case "Product Information":
                            response = "Here's information about our products. What specific product are you interested in?";
                            break;
                        case "Pricing Details":
                            response = "I can help you with pricing. Which product or service would you like to know about?";
                            break;
                        case "Technical Support":
                            response = "I'll connect you with technical support. What issue are you experiencing?";
                            break;
                        case "Contact Sales":
                            response = "Let me connect you with our sales team. What are you looking to purchase?";
                            break;
                        default:
                            response = "Thank you for your interest! How else can I assist you?";
                    }
                    
                    this.postMessage({
                        text: response,
                        authorId: "support_agent",
                        authorName: "Sarah Johnson",
                        authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
                        timestamp: new Date()
                    });
                }, 1000);
            },
            
            // Handle context menu actions
            contextMenuAction: function(e) {
                console.log("Context action:", e.type, "on message:", e.message.text);
                
                switch(e.type) {
                    case "reply":
                        alert("Replying to: " + e.message.text.substring(0, 50) + "...");
                        break;
                    case "copy":
                        // In a real app, you would copy to clipboard
                        alert("Message copied to clipboard!");
                        break;
                    case "pin":
                        alert("Message pinned successfully!");
                        break;
                    case "forward":
                        alert("Forwarding message...");
                        break;
                    case "delete":
                        if (confirm("Are you sure you want to delete this message?")) {
                            this.removeMessage(e.message);
                        }
                        break;
                }
            },

            // Handle outgoing messages
            sendMessage: function(e) {
                // Set author information for new messages
                e.message.authorName = "Alex Smith";
                e.message.authorImageUrl = "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg";
                
                console.log("Message sent:", e.message.text);
                
                // Simulate auto-response
                setTimeout(() => {
                    this.postMessage({
                        text: "Thank you for your message. A support agent will respond shortly.",
                        authorId: "auto_reply",
                        authorName: "Auto Reply",
                        authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/BOTTM.jpg",
                        timestamp: new Date()
                    });
                }, 1500);
            }
        });
    </script>
```

## 1. Create a Div Element

First, create a `<div>` element on the page that will be used to initialize the Chat component.

```html
<div id="chat"></div>
```

## 2. Initialize the Chat

Initialize the Chat from the `<div>` element with basic configuration.

```
<div id="chat"></div>
<script>
    $("#chat").kendoChat({
        authorId: "user1"
    });
</script>
```

## 3. Configure Data Source

Add a [`dataSource`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/datasource) to populate the chat with existing messages. The data source can contain message history and conversation data.

```
<div id="chat"></div>
<script>
    let chatMessages = [
        {
            id: 1,
            text: "Hello! Welcome to our chat.",
            authorId: "agent",
            authorName: "Support Agent",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2024, 11, 1, 10, 0)
        },
        {
            id: 2,
            text: "Hi there! Thanks for the welcome.",
            authorId: "user1",
            authorName: "Customer",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2024, 11, 1, 10, 1)
        }
    ];

    $("#chat").kendoChat({
        authorId: "user1",
        dataSource: {
            data: chatMessages
        }
    });
</script>
```

## 4. Add Message Suggestions

Configure quick-reply [`suggestions`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/suggestions) that appear below the message input for common responses.

```
<div id="chat"></div>
<script>
    $("#chat").kendoChat({
        authorId: "user1",
        suggestions: [
            { text: "Yes, please" },
            { text: "No, thanks" },
            { text: "Tell me more" },
            { text: "I need help" },
            { text: "Contact support" }
        ],
        suggestionClick: function(e) {
            console.log("User selected:", e.text);
            
            // Simulate response
            setTimeout(() => {
                this.postMessage({
                    text: "Thanks for selecting '" + e.text + "'. How can I help you further?",
                    authorId: "agent",
                    authorName: "Support Agent",
                    timestamp: new Date()
                });
            }, 500);
        }
    });
</script>
```

## 5. Set Component Dimensions

Configure the [`width`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/width) and [`height`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/height) of the Chat component to fit your layout requirements.

```
<div id="chat"></div>
<script>
    $("#chat").kendoChat({
        authorId: "user1",
        width: 500,
        height: 400,
        dataSource: {
            data: [{
                id: 1,
                text: "This chat has custom dimensions: 500px width and 400px height.",
                authorId: "system",
                authorName: "System",
                timestamp: new Date()
            }]
        }
    });
</script>
```

## 6. Configure Header Toolbar

Use the [`headerItems`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/headerItems) configuration option to customize the Chat header appearance and functionality.

```
<div id="chat"></div>
<script>
    $("#chat").kendoChat({
        authorId: "user1",
        headerItems: [
                {
                    type: "contentItem",
                    template: () => "<strong>Customer Support Chat</strong>"
                },
                {
                    type: "spacer"
                },
                {
                    type: "contentItem",
                    template: () => `${kendo.ui.icon('gear')}`
                }
        ]
    });
</script>
```

## 7. Configure Context Menu Actions

The Chat component provides and option to customize and set up context menu actions that appear when users right-click on messages. Utilize the [`messageActions`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/messageactions) configuration option and configure the actions that will appear in the messages context menu.

```
<div id="chat"></div>
<script>
    $("#chat").kendoChat({
        authorId: "user1",
        messageActions: [
            { name: "reply", text: "Reply", icon: "undo" },
            { name: "copy", text: "Copy", icon: "copy" },
            { name: "pin", text: "Pin", icon: "pin" },
            { name: "delete", text: "Delete", icon: "trash" }
        ],
        dataSource: {
            data: [{
                id: 1,
                text: "Right-click this message to see the context menu actions.",
                authorId: "agent",
                authorName: "Agent",
                timestamp: new Date()
            }]
        },
        contextMenuAction: function(e) {
            console.log("Context menu action:", e.type);
            
            switch(e.type) {
                case "reply":
                    alert("Replying to: " + e.message.text);
                    break;
                case "copy":
                    alert("Message copied!");
                    break;
                case "pin":
                    alert("Message pinned!");
                    break;
                case "delete":
                    if (confirm("Delete this message?")) {
                        this.removeMessage(e.message);
                    }
                    break;
            }
        }
    });
</script>
```

## 8. Handle Message Events

Implement event handlers for sending messages and user interactions.

```dojo
<div id="chat"></div>
<script>
    $("#chat").kendoChat({
        authorId: "customer",
        sendMessage: function(e) {
            // Set author info for outgoing messages
            e.message.authorName = "Customer";
            e.message.authorImageUrl = "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg";
            
            console.log("Message sent:", e.message.text);
            
            // Auto-response simulation
            setTimeout(() => {
                this.postMessage({
                    text: "Thank you for your message: '" + e.message.text + "'",
                    authorId: "bot",
                    authorName: "Chat Bot",
                    authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
                    timestamp: new Date()
                });
            }, 1000);
        }
    });
</script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery Chat](https://demos.telerik.com/kendo-ui/chat/index)

## See Also 

* [JavaScript API Reference of the Chat](/api/javascript/ui/chat)
* [Chat Templates]({% slug templates_kendoui_chat %})
* [Chat Suggestions]({% slug suggestions_kendoui_chat %})
* [Demo Page for the Chat](https://demos.telerik.com/kendo-ui/chat/index)

