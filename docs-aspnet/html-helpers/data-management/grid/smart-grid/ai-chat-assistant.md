---
title: AI Chat Assistant
description: "Learn how to implement an AI Chat Assistant for the {{ site.framework }} Grid that enables natural language interactions to perform data operations through conversational commands."
slug: ai_chat_assistant
position: 4
tag: new
components: ["grid"]
---

# {{ site.framework }} Data Grid AI Chat Assistant

The {{ site.framework }} Grid can be enhanced with an AI-powered chat assistant that allows users to interact with Grid data using natural language commands.

By integrating the Kendo UI `Chat` component with the Grid's AI helpers (for example `getAIRequest()` and `handleAIResponse()`), you can create an intuitive conversational interface where users perform [supported Smart Grid operations](slug:ai_toolbar_tool_core_grid#supported-operations) through simple text commands instead of navigating multiple UI controls.

The following example demonstrates how to implement an AI Chat Assistant that enables users to manage Grid data through natural language commands. Click the **AI Grid** button in the Grid toolbar to open the Chat panel and try inserting a prompt to interact with the data.

For a full runnable example demonstrating integration betweeh {{ site.framework }} Grid and Chat please refer to the [AI Chat Assitant Demo](https://demos.telerik.com/aspnet-core/grid/ai-chat-integration)


## Implementation Steps

To implement an AI Chat Assistant for your Grid, follow the steps below:

1. Add placeholders for the Grid and Chat; render the Grid with the HtmlHelper or TagHelper and initialize the `kendoChat` on the client.

  ```csharp Razor
    @(
      Html.Kendo().Grid<EcommerceProduct>()
        .Name("grid")
        .ToolBar(toolbar => { toolbar
            .Template(@<text><button id="ai-grid-button" class="ai-chat-button">AI Grid</button></text>); })
        .DataSource(ds => ds.Ajax().Read(r => r.Action("ECommerceProducts_Read", "Grid")).PageSize(20))
    )

    <div id="chat"></div>
  ```

{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <kendo-grid name="grid">
      <toolbars>
        <toolbar>
          <template>
            <button id="ai-grid-button" class="ai-chat-button">AI Grid</button>
          </template>
        </toolbar>
      </toolbars>
      <data-source type="aspnetmvc-ajax">
        <read action="ECommerceProducts_Read" controller="Grid" />
      </data-source>
    </kendo-grid>

    <div id="chat"></div>
```
{% endif %}


2. Initialize the Grid with the features you want to expose to the AI (sortable, filterable, groupable, pageable) and add an AI toolbar button that opens the Chat drawer:

```csharp Razor
    @(
        Html.Kendo().Grid<EcommerceProduct>()
            .Name("grid")
            .ToolBar(toolbar => { toolbar.Template(@<text><button id="ai-grid-button" class="ai-chat-button">AI Grid</button></text>); })
            .Sortable()
            .Filterable()
            .Groupable()
            .Pageable()
            .Columns(columns => { /* ...columns... */ })
            .DataSource(ds => ds.Ajax().Read(r => r.Action("ECommerceProducts_Read", "Grid")).PageSize(20))
    )
```

3. Handle user input in the Chat by generating an AI request with the Grid helper `getAIRequest()` and sending it to your AI endpoint. When the response arrives, apply changes with `handleAIResponse()` and render messages into the Chat:

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

4. Initialize `kendoChat` with `sendMessage` wired to your handler and optional `suggestions` to guide users:

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

5. When your AI response includes user-facing messages or command descriptions, render them in the Chat and use `handleAIResponse()` to apply the returned commands (sorting, filtering, grouping, paging, column management, selection, highlighting, export).

```javascript
    // Example: show AI reply and apply grid changes
    chat.postMessage({ authorId: "ai-assistant", text: "Processing..." });
    // after AJAX success:
    chat.updateMessage(message, { isTyping: false, text: allMessages });
    grid.handleAIResponse(response);
```

For a full runnable example demonstrating integration between the {{ site.framework }} Grid and Chat please refer to the [AI Chat Assitant Demo](https://demos.telerik.com/kendo-ui/grid/ai-chat-integration)

## Suggested Links

* [Smart Grid AI Toolbar Assistant](slug:ai_toolbar_tool_core_grid)
* [AI Service Manual Integration](slug:ai_toolbar_tool_core_grid#manual-integration)
* [Smart Extensions](slug:smart_ext_core_grid)
* [Chat Overview](slug:htmlhelpers_chat_aspnetcore)
* [API Index of the Grid](/api/grid)
* [API Reference of the Chat](/api/chat)
