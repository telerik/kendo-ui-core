---
title: AI Chat Assistant
description: "Learn how to implement an AI Chat Assistant for the Kendo UI for jQuery Grid that enables natural language interactions to perform data operations through conversational commands."
slug: ai_chat_assistant
position: 4
tag: new
components: ["grid"]
---

# Kendo UI for jQuery Data Grid AI Chat Assistant

The Kendo UI for jQuery Grid can be enhanced with an AI-powered chat assistant that allows users to interact with Grid data using natural language commands.

By integrating the Kendo UI `Chat` component with the Grid's AI helpers (for example `getAIRequest()` and `handleAIResponse()`), you can create an intuitive conversational interface where users perform [supported Smart Grid operations](slug:ai_toolbar_tool_kendoui_grid#supported-operations) through simple text commands instead of navigating multiple UI controls.

The following example demonstrates how to implement an AI Chat Assistant that enables users to manage Grid data through natural language commands. Click the **AI Grid** button in the Grid toolbar to open the Chat panel and try inserting a prompt to interact with the data.

For a full runnable example demonstrating integration betweeh Kendo UI for jQuery Grid and Chat please refer to the [AI Chat Assitant Demo](https://demos.telerik.com/kendo-ui/grid/ai-chat-integration).


## Implementation Steps

To implement an AI Chat Assistant for your Grid, follow the steps below:

1. Include Kendo UI for jQuery and the required scripts/styles, and add a placeholder for the Grid and Chat:

    ```html
    <!-- Include Kendo styles and scripts -->
    <link href="https://kendo.cdn.telerik.com/themes/12.3.0/default/default-main.css" rel="stylesheet" />
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <script src="js/kendo.all.min.js"></script>

    <!-- Grid and Chat placeholders -->
    <div id="grid"></div>
    <div id="chat"></div>
    ```

1. Initialize the Grid with the features you want to expose to the AI (sortable, filterable, groupable, pageable) and add an AI toolbar button that opens the Chat drawer:

    ```javascript
    $(document).ready(function() {
      $("#grid").kendoGrid({
        dataSource: {
          data: customerOrders,
          pageSize: 20
        },
        toolbar: [
          { template: '<button id="ai-grid-button" class="ai-chat-button">AI Grid</button>' }
        ],
        sortable: true,
        filterable: true,
        groupable: true,
        pageable: true,
        columns: [ /* ...columns... */ ]
      });
    });
    ```

1. Handle user input in the Chat by generating an AI request with the Grid helper `getAIRequest()` and sending it to your AI endpoint. When the response arrives, apply changes with `handleAIResponse()` and render messages into the Chat:

    ```javascript
    function handleSendMessage(e) {
      var grid = $("#grid").data("kendoGrid");
      var prompt = e.message.text.toLowerCase().trim();
      var aiRequest = grid.getAIRequest(prompt);

      $.ajax({
        url: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(aiRequest),
        success: function(response) {
          // Post AI messages into the chat UI (demo concatenates command messages)
          grid.handleAIResponse(response);
        },
        error: function() {
          // handle error
        }
      });
    }
    ```

1. Initialize `kendoChat` with `sendMessage` wired to your handler and optional `suggestions` to guide users:

    ```javascript
    var chat = $("#chat").kendoChat({
      authorId: "123",
      height: 630,
      suggestions: [
        { id: "sort_bookings", text: "Sort by Bookings descending" },
        { id: "group_sales_person", text: "Group by Sales Person" }
      ],
      sendMessage: handleSendMessage
    }).data("kendoChat");
    ```

1. When your AI response includes user-facing messages or command descriptions, render them in the Chat and use `handleAIResponse()` to apply the returned commands (sorting, filtering, grouping, paging, column management, selection, highlighting, export).

    ```javascript
    // Example: show AI reply and apply grid changes
    chat.postMessage({ authorId: "ai-assistant", text: "Processing..." });
    // after AJAX success:
    chat.updateMessage(message, { isTyping: false, text: allMessages });
    grid.handleAIResponse(response);
    ```


## Suggested Links

* [Smart Grid AI Toolbar Assistant](slug:ai_toolbar_tool_kendoui_grid)
* [AI Service Manual Integration](slug:ai_toolbar_tool_kendoui_grid#manual-integration)
* [Smart Extensions](slug:smart_ext_kendoui_grid)
* [Chat Overview](slug:overview_kendoui_chat_widget)
* [Grid Overview](slug:overview_kendoui_grid_widget)
* [API Reference of the Chat](/api/chat)
