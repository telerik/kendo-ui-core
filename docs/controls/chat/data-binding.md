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

## Render Long Conversations with Endless Scrolling

Use the [`scrollMode`](/api/javascript/ui/chat#configuration-scrollMode) option together with a `kendo.data.DataSource` that defines the batch size through `pageSize`. When `scrollMode` is set to `"endless"`, the Chat renders only the latest `dataSource.pageSize()` messages on initial load. Scrolling near the top loads older batches, and scrolling near the bottom while a historical batch is active loads newer batches. The floating scroll-to-bottom button returns the view to the latest batch.

With local data, the Chat can still render the batch that contains a pinned or replied-to message when that message falls outside the current batch. With server-paged data sources, off-batch reference navigation depends on the final remote endless contract described after the example.

```dojo
    <div id="chat"></div>
    <script>
        var messages = [];

        for (var i = 1; i <= 48; i++) {
            var isCustomer = i % 2 === 0;

            messages.push({
                id: i,
                authorId: isCustomer ? "customer" : "agent",
                authorName: isCustomer ? "Jordan Miles" : "Warehouse Support",
                authorImageUrl: isCustomer ? "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg" : "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
                text: isCustomer ? "I am checking the shipping timeline for order 98145 update " + i + "." : "Order 98145 update " + i + " is available in the shipment timeline.",
                timestamp: new Date(2026, 0, 5, 9, i)
            });
        }

        messages[6].isPinned = true;
        messages[6].text = "Order 98145 left the regional warehouse at 10:14 AM and is scheduled for next-day delivery.";
        messages[44].replyToId = messages[6].id;
        messages[44].text = "Can you confirm whether the regional warehouse update still shows next-day delivery?";

        var dataSource = new kendo.data.DataSource({
            data: messages,
            pageSize: 12
        });

        $("#chat").kendoChat({
            authorId: "customer",
            dataSource: dataSource,
            height: 520,
            scrollMode: "endless"
        });
    </script>
```

This example opens with the latest 12 messages because the bound DataSource is configured with `pageSize: 12`. Scroll upward to load older history, click the pinned banner or the reply reference in the latest batch to load the batch that contains the referenced message, and use the floating button to return to the latest messages.

### Use endless scrolling with a server-paged data source

The Chat also supports endless scrolling with a server-paged Kendo UI DataSource. In that setup, endless mode uses a Chat-specific server contract instead of generic page-based paging semantics:

- Set `serverPaging: true`, configure `schema.total`, and set the endless batch size through `dataSource.pageSize()`.
- The startup latest request sends `pageSize` and `intent: "latest"` and omits `startIndex` and `endIndex`.
- Older and newer history requests send explicit `startIndex`, `endIndex`, and `pageSize` values. `startIndex` is zero-based and inclusive, `endIndex` is exclusive, and the latest window is the one where `endIndex === total`.
- Jump requests send `targetMessageId` and `pageSize`, and the server chooses the returned frame.
- Default DataSource paging parameters such as `page`, `skip`, and `take` may still appear on the wire and must be ignored by the endless endpoint.
- Provide [`pinnedMessages`](/api/javascript/ui/chat#configuration-pinnedMessages) to render pinned banners for targets that are outside the current remote window. The last item in the array wins for the banner, and partial items are allowed when they contain enough data to identify the target and render the banner.
- Provide [`referenceResolver`](/api/javascript/ui/chat#configuration-referenceResolver) for off-batch reply previews. The resolver receives `{ value, success, error }` and must return enough data to identify the target and render the reply preview.
- Remote endless mode does not support `autoBind: false`, manual `dataSource.read()`, or manual `dataSource.fetch()`.

> Warning: Every remote endless response must return `total`, `startIndex`, and `endIndex`, and the returned item count must equal `endIndex - startIndex`.

```javascript
var messages = [];

 for (var i = 1; i <= 40; i++) {
     messages.push({
         id: i,
         authorId: i % 2 === 0 ? "user1" : "user2",
         authorName: i % 2 === 0 ? "Nina" : "Sam",
         text: "Message " + i,
         timestamp: new Date(2026, 0, 12, 9, i)
     });
 }

var archiveById = {
     12: {
         id: 12,
         authorId: "warehouse-support",
         authorName: "Warehouse Support",
         text: "Order 98145 left the regional warehouse at 10:14 AM and is scheduled for next-day delivery.",
         timestamp: new Date(2026, 0, 5, 10, 14)
     }
};

var dataSource = new kendo.data.DataSource({
    data: messages,
    pageSize: 10
});

$("#chat").kendoChat({
    authorId: "customer",
    dataSource: dataSource,
    height: 520,
    scrollMode: "endless",
    pinnedMessages: [{
        id: 12,
        authorName: "Warehouse Support",
        text: "Order 98145 left the regional warehouse at 10:14 AM and is scheduled for next-day delivery.",
        isPinned: true
    }],
    referenceResolver: function(options) {
        var resolvedItems = options.value.map(function(id) {
            return archiveById[id];
        }).filter(Boolean);

        options.success(resolvedItems);
    }
});
```


## See Also

* [Data Binding Chat (Demo)](https://demos.telerik.com/kendo-ui/chat/data-binding)
* [Chat API Reference: scrollMode](/api/javascript/ui/chat#configuration-scrollMode)
* [Chat API Reference: pageSize](/api/javascript/ui/chat#configuration-pageSize)
* [Chat API Reference: pinnedMessages](/api/javascript/ui/chat#configuration-pinnedMessages)
* [Chat API Reference: referenceResolver](/api/javascript/ui/chat#configuration-referenceResolver)
* [Chat API Reference: referencedMessageClick](/api/javascript/ui/chat#events-referencedMessageClick)
* [JavaScript API Reference of the Chat](/api/javascript/ui/chat)
* [Chat Overview]({% slug overview_kendoui_chat_widget %})
