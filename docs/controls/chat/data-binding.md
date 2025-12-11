---
title: Data Binding
page_title: jQuery Chat Documentation - Data Binding
description: "Learn how to bind data to the Kendo UI for jQuery Chat component using standard arrays and custom data models."
components: ["chat"]
slug: databinding_kendoui_chat
position: 2
---

# Data Binding

The Kendo UI for jQuery Chat component provides flexible data binding capabilities that allow you to display message collections from various data sources. This article demonstrates how to connect your Chat component to different data formats, manage message collections, and implement custom data models for your chat applications.

The Chat component is ideal for building customer support interfaces, AI-powered chatbots, and real-time messaging applications. Understanding proper data binding techniques ensures optimal performance and user experience.

## Standard Data Binding

The Chat component binds to data through the [`dataSource`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/datasource) configuration option, which accepts an array of message objects or a Kendo UI DataSource instance. Each message object contains properties that define the message content, author information, timestamp, and visual presentation.

The standard message format includes essential properties for displaying chat conversations:

```javascript
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
    ]
});
```


## See Also

* [Data Binding Chat (Demo)](https://demos.telerik.com/kendo-ui/chat/data-binding)
* [JavaScript API Reference of the Chat](/api/javascript/ui/chat)
* [Chat Overview]({% slug overview_kendoui_chat_widget %})
