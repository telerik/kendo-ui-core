---
title: AI Service Setup
description: "Learn how to set up the Smart Extensions library to handle AI requests from Smart Grid and automatically generate Grid commands from natural language prompts."
slug: smart_ext_core_grid
position: 2
components: ["grid"]
---

# AI Service Setup

To enable AI-powered interaction in the [Smart Grid AI Assistant tools](slug:ai_assistant_tools_setup), you need a backend service that processes natural language prompts and returns executable Grid commands. The Smart Extensions library for .NET simplifies this by automatically handling the request/response format and command generation.

This article shows you how to build your own .NET backend service. You will learn how to:

  - Install the [`Telerik.AI.SmartComponents.Extensions`](https://www.nuget.org/packages/Telerik.AI.SmartComponents.Extensions) package
  - Configure your AI provider (Azure OpenAI, OpenAI, or local models)
  - Create an API endpoint that uses the library
  - Understand the commands the library generates

## How It Works

The AI Assistant tools send user prompts to your backend service, which must return the response in a specific format that the Grid understands. The [`Telerik.AI.SmartComponents.Extensions`](https://www.nuget.org/packages/Telerik.AI.SmartComponents.Extensions) package for .NET simplifies this process by handling the request/response formatting automatically.

The Smart Extensions library acts as a bridge between your AI model and the Grid. You provide the AI configuration (Azure OpenAI, OpenAI API, or local LLM credentials) and create an API endpoint, while the library handles all request/response formatting and command generation.

How the library processes requests:

1. Receives structured requests from the Grid containing the user's prompt and Grid column information.
2. Configures your AI model with Grid-specific function definitions using [tool calling](https://learn.microsoft.com/en-us/dotnet/ai/ichatclient#tool-calling). These function definitions enable the AI to understand available Grid capabilities and generate appropriate command responses.
3. Processes the AI response and extracts structured commands.
4. Returns formatted commands that the Grid applies automatically.

For example, when a user types "Show products with price over 100", the library processes this prompt and returns a structured filter command with the appropriate field, operator, and value that the Grid can apply.

## Prerequisites

Before you start, ensure you have:

- .NET 8.0 or later
- `Microsoft.Extensions.AI` package
- Azure OpenAI or OpenAI API access, or local LLM
- ASP.NET Core (for web API scenarios)

## Setup Steps

Follow these steps to set up the Smart Extensions library in your .NET application.

### Install Required Packages

Install the Smart Extensions library and the Microsoft AI abstractions:

```bash
dotnet add package Telerik.AI.SmartComponents.Extensions
dotnet add package Microsoft.Extensions.AI
```

Install your AI provider package. For Azure OpenAI:

```bash
dotnet add package Azure.AI.OpenAI
```

### Configure the AI Client

Add your AI provider credentials and configuration in the `appsettings.json` file. This example shows Azure OpenAI configuration:

```json
{
  "AI": {
    "AzureOpenAI": {
      "Endpoint": "https://your-openai-resource.openai.azure.com/",
      "Key": "your-api-key-here",
      "Chat": {
        "ModelId": "gpt-4"
      }
    }
  }
}
```

Register the AI chat client in your application by adding the following code to `Program.cs`:

```csharp
using Microsoft.Extensions.AI;
using Azure.AI.OpenAI;

var builder = WebApplication.CreateBuilder(args);

// Register the Azure OpenAI client.
builder.Services.AddSingleton(new AzureOpenAIClient(
    new Uri("YOUR_AZURE_OPENAI_ENDPOINT"),
    new AzureKeyCredential("YOUR_AZURE_OPENAI_CREDENTIAL")
));

// Register the Chat client with the specified model.
builder.Services.AddChatClient(services =>
    services.GetRequiredService<AzureOpenAIClient>()
        .GetChatClient("gpt-4o-mini").AsIChatClient()
);

builder.Services.AddControllers();
var app = builder.Build();
```

### Process Grid AI Requests

Create a controller that handles Grid AI requests. The Smart Extensions library provides two key methods:

- `AddGridChatTools()`&mdash;Configures the AI model with Grid-specific capabilities.
- `ExtractGridResponse()`&mdash;Extracts structured commands and messages from the AI response that the Grid can understand.

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.AI;
using Telerik.AI.SmartComponents.Extensions;

[ApiController]
[Route("[controller]/[action]")]
public class GridAIController : Controller
{
    private readonly IChatClient _chatClient;

    public GridAIController(IChatClient chatClient)
    {
        _chatClient = chatClient;
    }

    [HttpPost]
    [Route("/grid/smart-state")]
    public async Task<IActionResult> SmartState([FromBody] GridAIRequest request)
    {
        // Create chat options
        var options = new ChatOptions();

        // Add Grid-specific chat tools for AI processing
        options.AddGridChatTools(request.Columns);

        // Convert request contents to chat messages
        var conversationMessages = request.Contents
            .Select(m => new ChatMessage(ChatRole.User, m.Text))
            .ToList();

        // Process the request and obtain the AI response
        ChatResponse completion = await _chatClient.GetResponseAsync(conversationMessages, options);

        // Extract structured response from the AI response
        GridAIResponse response = completion.ExtractGridResponse();

        return Json(response);
    }
}
```

With this setup, the library automatically handles the following tasks:

- Interpreting the user's natural language prompts
- Generating appropriate Grid commands (filtering, sorting, etc.)
- Formatting the response correctly for the Grid

### Configure the Frontend

Now that your backend is ready, configure your {{ site.framework }} Grid to use this API endpoint. See [Smart Grid AI Assistant Tools Setup](slug:ai_assistant_tools_setup) for frontend setup options.

## Request and Response Format

The Smart Extensions library uses specific request and response structures when handling communication between the Grid and your backend service. This section documents both formats to help you understand the communication flow and explain how to work with them.

### Request Structure

The Grid sends a `GridAIRequest` object to your endpoint when using [automatic](slug:ai_assistant_tools_setup#automatic-integration) or [controlled integration](slug:ai_assistant_tools_setup#controlled-integration). For [manual integration](slug:ai_assistant_tools_setup#manual-integration), use the [`getAIRequest()`](slug:ai_assistant_tools_setup#getairequest) helper method to generate this request format.

```csharp Request format
public class GridAIRequest
{
    public string Role { get; set; }                      // Message sender (typically "user")
    public List<GridAIRequestContent> Contents { get; set; }  // User's natural language prompt
    public List<GridAIColumn> Columns { get; set; }       // Grid column definitions
}

public class GridAIRequestContent
{
    public string Type { get; set; }   // Content type (typically "text")
    public string Text { get; set; }   // The natural language prompt
}

public class GridAIColumn
{
    public string Id { get; set; }        // Unique column identifier
    public string Field { get; set; }     // Field name from your data model
    public string[]? Values { get; set; } // Optional predefined values for enum-like fields
}
```
```json Example request
{
  "Role": "user",
  "Contents": [
    {
      "Type": "text",
      "Text": "Show products with price over 100"
    }
  ],
  "Columns": [
    {
      "Id": "productName",
      "Field": "ProductName"
    },
    {
      "Id": "price",
      "Field": "Price"
    },
    {
      "Id": "status",
      "Field": "Status",
      "Values": ["Active", "Inactive", "Pending"]
    }
  ]
}
```

> Include the `Values` property for columns with predefined values (status, category, etc.) to help the AI generate more accurate filters. For more details, see [Provide Column Values](#provide-column-values) in the Best Practices section.

### Response Structure

When [processing the Grid request](#process-grid-ai-requests) using the `ExtractGridResponse()` method, a `GridAIResponse` object is generated with the following structure:

```csharp Response format
public class GridAIResponse
{
    public List<ICommand> Commands { get; set; }  // Grid operation commands
    public string? Message { get; set; }           // Optional status message
}
```
```json Example response
{
  "Commands": [
    {
      "Type": "GridFilterCommand",
      "Filter": {
        "Field": "Price",
        "Operator": "greaterthan",
        "Value": 100
      }
    }
  ],
  "Message": "Filtered products by price greater than 100"
}
```

> The `Commands` array contains command objects that tell the Grid which operations to apply. For a complete list of available command types, see the [Command Types](#toc-command-types) section below.

## Command Types

The library generates specific command types based on the user's prompt. The following tables list all available commands grouped by operation category:

<TabStrip>
<TabStripTab title="Data Operations">

| Command Type | Parameters |
|--------------|------------|
| `GridFilterCommand` | `Filter` with field, operator, and value |
| `GridSortCommand` | `Sort` with field and direction |
| `GridGroupCommand` | `Group` with field and direction |
| `GridPageCommand` | `Page` number |
| `GridPageSizeCommand` | `PageSize` value |

**Example:**

```json
{
  "Commands": [
    {
      "Type": "GridFilterCommand",
      "Filter": {
        "Field": "Price",
        "Operator": "greaterthan",
        "Value": 100
      }
    }
  ]
}
```

</TabStripTab>
<TabStripTab title="Column Operations">

| Command Type | Parameters |
|--------------|------------|
| `GridColumnShowCommand` | Column `Id` |
| `GridColumnHideCommand` | Column `Id` |
| `GridColumnLockCommand` | Column `Id` |
| `GridColumnUnlockCommand` | Column `Id` |
| `GridColumnResizeCommand` | Column `Id` and `Width` |
| `GridColumnReorderCommand` | Column `Id` and `Position` |

**Example:**

```json
{
  "Commands": [
    {
      "Type": "GridColumnHideCommand",
      "Id": "1"
    }
  ]
}
```

</TabStripTab>
<TabStripTab title="Highlighting and Selection">

| Command Type | Parameters |
|--------------|------------|
| `GridHighlightCommand` | `Highlight` with filters and cells |
| `GridSelectCommand` | `Select` with filters and cells |

**Example:**

```json
{
  "Commands": [
    {
      "Type": "GridHighlightCommand",
      "Highlight": {
        "Filters": [
          {
            "Field": "Status",
            "Operator": "equalto",
            "Value": "Active"
          }
        ]
      }
    }
  ]
}
```

</TabStripTab>
<TabStripTab title="Export">

| Command Type | Parameters |
|--------------|------------|
| `GridExportExcelCommand` | `FileName` |
| `GridExportPDFCommand` | `FileName` |
| `GridExportCSVCommand` | `FileName` |

**Example:**

```json
{
  "Commands": [
    {
      "Type": "GridExportExcelCommand",
      "FileName": "products.xlsx"
    }
  ]
}
```

</TabStripTab>
<TabStripTab title="Clear Operations">

| Command Type | Parameters |
|--------------|------------|
| `GridClearFilterCommand` | None |
| `GridClearSortCommand` | None |
| `GridClearGroupCommand` | None |
| `GridClearHighlightCommand` | None |
| `GridClearSelectCommand` | None |

**Example:**

```json
{
  "Commands": [
    {
      "Type": "GridClearFilterCommand"
    }
  ]
}
```

</TabStripTab>
</TabStrip>

## Sample Prompts

The Smart Extensions library interprets natural language prompts and converts them into Grid operations. The following examples demonstrate the types of prompts you can use:

**Data Operations**

```prompts
"Show products with price over 100"
"Sort by amount descending"
"Group by account type"
"Go to page 20"
"Clear filtering"
```

**Column Operations**

```prompts
"Hide the Age column"
"Lock the Name column"
"Resize the Name column to 200px"
"Move the Department column to position 1"
```

**Highlighting and Selection**

```prompts
"Highlight rows where status is Active"
"Select age cells where age is greater than 30"
"Clear selection"
```

**Export**

```prompts
"Export to Excel with file name 'employee_data'"
"Export to PDF"
```

## Best Practices

Follow these recommendations to optimize your Smart Extensions implementation and ensure reliable AI-powered Grid operations.

### Provide Column Values

When Grid columns have predefined values, include them in the column definitions before sending the request to your backend service. This helps the AI generate more accurate filters by understanding the available options for each field:

```js
const addColumnsValues = (columns) => {
  return columns.map((col) => {
    if (col.field === "Status") {
      return { ...col, values: ["Active", "Pending", "Completed"] };
    }
    if (col.field === "Region") {
      return { ...col, values: ["North America", "Europe", "Asia Pacific"] };
    }
    return col;
  });
};

// Use in your request
const requestBody = this.grid.getAIRequest(prompt);
requestBody.columns = addColumnsValues(requestBody.columns);
```


### Error Handling

Implement proper error handling to manage AI service failures and provide meaningful feedback to users. Wrap your AI processing logic in `try...catch` blocks to handle exceptions gracefully:

```csharp
try
{
    var completion = await _chatClient.GetResponseAsync(conversationMessages, options);
    var response = completion.ExtractGridResponse();
    return Json(response);
}
catch (Exception ex)
{
    return StatusCode(500, $"AI processing failed: {ex.Message}");
}
```

### Input Validation

Validate incoming requests before processing them to ensure all required data is present. This prevents unnecessary AI service calls and provides clear error messages to the client:

```csharp
if (request?.Columns == null || !request.Columns.Any())
{
    return BadRequest("Columns are required");
}

if (request.Contents == null || !request.Contents.Any())
{
    return BadRequest("Content is required");
}
```

## Testing

The library includes comprehensive test coverage. You can run tests to verify functionality:

```bash
cd tests
dotnet test
```

For integration testing with your specific data model, create test cases that verify if AI responses match the expected Grid operations.

## Troubleshooting

**Connection errors**
- Verify your AI service endpoint URL is correct.
- Check that your API key is valid and not expired.
- Ensure your application can reach the AI service.

**Model not found**
- Confirm the model ID is deployed in your Azure OpenAI resource.
- Check that the model name matches exactly.

**Token limit exceeded**
- Reduce the number of columns sent in requests.
- Limit the size of the `Values` arrays for columns.
- Consider using a model with higher token limits.

## See Also

* [Smart Grid AI Assistant Tools Setup](slug:ai_assistant_tools_setup)
* [Smart Grid Overview](slug:overview_smart_grid)
* [AI Toolbar Assistant](slug:ai_toolbar_tool_core_grid)
* [AI Chat Assistant](slug:ai_chat_assistant)
