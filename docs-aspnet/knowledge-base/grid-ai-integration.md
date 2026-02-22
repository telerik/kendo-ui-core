---
title: Integrating Telerik UI Grid with Smart AI Extensions
description: "Learn how to analyze, filter, and sort Telerik UI Grid data using the built-in AI Assistant powered by Telerik Smart Extensions."
type: how-to
page_title: Telerik UI Grid AI Integration with Smart Extensions for {{ site.product }}
slug: grid-ai-integration
tags: grid, ai, smart-extensions, assistant, azure-openai
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2025.4.1111 version</td>
 </tr>
</table>

## Description

How can I integrate the Telerik UI Grid with AI-powered natural language operations such as filtering and sorting **without implementing a custom AI pipeline**, by using the built-in **Telerik Smart Extensions**?

This article demonstrates how to enable AI-assisted Grid interactions using the `Telerik.AI.SmartComponents.Extensions` package and the Grid’s native **AI Assistant**.

> For a complete overview of the Smart Extensions architecture and setup, see  
> [Telerik Smart Extensions]({% slug smart_ext_core_grid %})

---

## Solution Overview

With Telerik Smart Extensions, the Grid can natively:

- Accept natural-language instructions
- Convert them into structured Grid operations
- Apply filtering and sorting automatically
- Avoid sending full datasets to the AI model
- Use secure, tool-based AI execution

The integration consists of:

1. Enabling the Grid AI Assistant
2. Sending column metadata to the AI service
3. Letting Smart Extensions interpret AI responses
4. Automatically applying Grid state changes

---

## Grid View Configuration

The Grid below enables the AI Assistant directly from the toolbar.  
No custom JavaScript parsing or manual OpenAI calls are required.

```csharp
@{
    ViewData["Title"] = "AI Grid Insights";
}

<h2>Sales Data Grid + AI Insights</h2>

@(Html.Kendo().Grid<SaleRecord>()
    .Name("salesGrid")
    .ToolBar(t =>
    {
        t.AIAssistant();
        t.Spacer();
        t.Custom()
            .Name("resetChanges")
            .Text("Reset changes")
            .IconClass("k-icon k-i-arrow-rotate-ccw");
    })
    .Columns(columns =>
    {
        columns.Bound(c => c.Id).Width(80);
        columns.Bound(c => c.SalesPerson);
        columns.Bound(c => c.Region);
        columns.Bound(c => c.UnitsSold);
        columns.Bound(c => c.Total);
        columns.Bound(c => c.Month);
    })
    .Scrollable(s => s.Height("300px"))
    .Sortable()
    .Filterable()
    .DataSource(ds => ds.Ajax()
        .Model(m => m.Id(x => x.Id))
        .Read(read => read.Url("/SmartGrid/GetSales"))
    )
    .AI(ai => ai
        .Service("/SmartGrid/Analyze")
        .AIAssistant(aiAsst => aiAsst
            .PromptSuggestions(new[]
            {
                "Sort the grid by Total descending.",
                "Filter to only show data from July.",
                "Show only rows where Units Sold is greater than 130."
            })
            .PromptTextArea(p =>
                p.Rows(2)
                 .Resize(TextAreaResize.Auto)
                 .MaxRows(5)
            )
        )
        .AIAssistantWindow(ws =>
            ws.Width(558)
              .Actions(a => a.Minimize().Close())
        )
    )
)
```

---

## Controller Implementation

The controller receives a `GridAIRequest`, executes the AI tools, and returns a structured `GridAIResponse`.  
The Grid applies the response automatically.

```csharp
[HttpPost]
public async Task<IActionResult> Analyze([FromBody] GridAIRequest request)
{
    var options = new ChatOptions();
    options.AddGridChatTools(request.Columns);

    var messages = request.Contents
        .Select(m => new Microsoft.Extensions.AI.ChatMessage(
            ChatRole.User, m.Text))
        .ToList();

    if (_chatClient == null)
    {
        return StatusCode(500, "Chat service is not available.");
    }

    ChatResponse completion =
        await _chatClient.GetResponseAsync(messages, options);

    GridAIResponse response =
        completion.ExtractGridResponse();

    return new ContentResult
    {
        Content = System.Text.Json.JsonSerializer.Serialize(
            response,
            new System.Text.Json.JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            }),
        ContentType = "application/json"
    };
}
```

---

## Supported Natural Language Commands

The Grid AI Assistant supports:

### Filtering
- `Show only July data`
- `Units Sold greater than 130`
- `SalesPerson is Alice`

### Sorting
- `Sort by Total descending`
- `Order by Units Sold ascending`

### Combined Queries
- `Show July data sorted by Total`
- `Filter West region and sort by Units Sold`

---

### Runnable Example

A fully runnable example of this integration is available in [the official Telerik UI for ASP.NET Core examples repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc)