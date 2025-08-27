---
title: Telerik Smart Extensions
description: "Getting Started with Telerik.AI.SmartComponents.Extensions"
slug: smart_ext_kendoui_grid
position: 5
---

# Getting Started with Telerik.AI.SmartComponents.Extensions

## Overview

The `Telerik.AI.SmartComponents.Extensions` library provides AI-powered functionality for grid operations, enabling natural language processing for filtering, sorting, grouping, and highlighting data. This library integrates seamlessly with Microsoft.Extensions.AI and Azure OpenAI to provide intelligent grid interactions.

## Prerequisites

- .NET 8.0 or later
- Microsoft.Extensions.AI package
- Azure OpenAI or OpenAI API access
- ASP.NET Core (for web API scenarios)

## Installation

Add the Telerik.AI.SmartComponents.Extensions package to your project:

```bash
dotnet add package Telerik.AI.SmartComponents.Extensions
```

Add required dependencies:

```bash
dotnet add package Microsoft.Extensions.AI
dotnet add package Azure.AI.OpenAI
```

## Configuration

### 1. Configure AI Services in Program.cs

```csharp
using Microsoft.Extensions.AI;
using Azure.AI.OpenAI;

var builder = WebApplication.CreateBuilder(args);

// Configure Azure OpenAI Chat Client
builder.Services.AddSingleton<IChatClient>(serviceProvider =>
{
    var configuration = serviceProvider.GetRequiredService<IConfiguration>();
    var endpoint = configuration["AI:AzureOpenAI:Endpoint"];
    var apiKey = configuration["AI:AzureOpenAI:Key"];
    var modelId = configuration["AI:AzureOpenAI:Chat:ModelId"];
    
    var client = new AzureOpenAIClient(new Uri(endpoint), new Azure.AzureKeyCredential(apiKey));
    return client.AsChatClient(modelId);
});

builder.Services.AddControllers();
var app = builder.Build();
```

### 2. Configure appsettings.json

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

## Basic Usage

### 1. Create a Grid Controller

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.AI;
using OpenAI.Chat;
using Telerik.AI.SmartComponents.Extensions;

[ApiController]
[Route("[controller]/[action]")]
public class GridController : Controller
{
    private readonly IChatClient _chatClient;

    public GridController(IChatClient chatClient)
    {
        _chatClient = chatClient;
    }

    [HttpPost]
    [Route("/grid/smart-state")]
    public async Task<IActionResult> SmartState([FromBody] GridAIRequest request)
    {
        // Create chat completion options
        var options = new ChatCompletionOptions();
        
        // Add grid-specific chat tools for AI processing
        ChatTools.AddGridChatTools(
            request.Columns.Select(x => new GridAIColumn { 
                Field = x.Field, 
                Values = x.Values 
            }).ToList(), 
            options
        );

        // Convert request contents to chat messages
        var conversationMessages = request.Contents
            .Select(m => new UserChatMessage(m.Text))
            .ToList();

        // Get the chat service and process the request
        var chatService = _chatClient.GetService<ChatClient>();
        var completion = await chatService.CompleteChatAsync(conversationMessages, options);
        
        // Extract grid options from AI response
        var gridOptions = completion.ToolCalls.ExtractGridOptions();
        
        return Json(gridOptions);
    }
}
```

### 2. Define Your Data Model

```csharp
public class Employee
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
    public string Department { get; set; }
    public decimal Salary { get; set; }
    public string City { get; set; }
    public string Gender { get; set; }
}
```

### 3. Create Grid AI Request

```csharp
var request = new GridAIRequest
{
    Columns = new List<GridAIColumn>
    {
        new() { Field = "FirstName" },
        new() { Field = "LastName" },
        new() { Field = "Age" },
        new() { Field = "Department", Values = new[] { "IT", "HR", "Finance", "Marketing" } },
        new() { Field = "Salary" },
        new() { Field = "City", Values = new[] { "New York", "London", "Paris", "Tokyo" } },
        new() { Field = "Gender", Values = new[] { "Male", "Female" } }
    },
    Contents = new List<GridAIRequestContent>
    {
        new() { Type = "text", Text = "Show me all employees in IT department" }
    }
};
```

## Advanced Features

### 1. Filtering Operations

The library supports various natural language filtering queries:

```csharp
// Example queries that work with the AI:
"Show me employees older than 30"
"Filter people in IT department"
"Get employees whose name starts with J"
"Show me men with salary greater than 60000"
```

### 2. Sorting Operations

```csharp
// Natural language sorting examples:
"Sort by age descending"
"Order by salary ascending"
"Sort by department, then by name"
```

### 3. Grouping Operations

```csharp
// Grouping examples:
"Group by department"
"Group by city, then by age"
"Group employees by gender descending"
```

### 4. Highlighting Operations

```csharp
// Highlighting examples:
"Highlight employees whose name starts with A"
"Mark salary cells of people older than 30"
"Highlight lastname cells of IT employees"
```

## Working with Grid Responses

The AI service returns a `GridAIResponse` object containing the processed operations:

```csharp
public async Task<GridAIResponse> ProcessGridRequest(GridAIRequest request)
{
    var options = new ChatCompletionOptions();
    ChatTools.AddGridChatTools(request.Columns, options);
    
    var messages = request.Contents.Select(m => new UserChatMessage(m.Text)).ToList();
    var completion = await _chatClient.CompleteChatAsync(messages, options);
    
    var response = completion.ToolCalls.ExtractGridOptions();
    
    // The response contains:
    // - response.Filter: Composite filter conditions
    // - response.Sort: Array of sort descriptors
    // - response.Group: Array of group descriptors  
    // - response.Highlight: Array of highlight descriptors
    // - response.Messages: Status/info messages
    
    return response;
}
```

## Filter Types

The library supports various filter operators:

- `equalto`: Exact match
- `contains`: Contains substring
- `startswith`: Starts with text
- `endswith`: Ends with text
- `greaterthan`: Greater than (numeric)
- `lessthan`: Less than (numeric)
- `greaterthanorequal`: Greater than or equal
- `lessthanorequal`: Less than or equal

## Best Practices

### 1. Column Configuration

When the options for the column are of Enum type provide meaningful column values to help the AI understand your data:

```csharp
new GridAIColumn 
{ 
    Field = "Status", 
    // only when only a set of values are used
    Values = new[] { "Active", "Inactive", "Pending" } 
}
```

### 2. Error Handling

```csharp
try
{
    var completion = await chatService.CompleteChatAsync(messages, options);
    var response = completion.ToolCalls.ExtractGridOptions();
    return Json(response);
}
catch (Exception ex)
{
    return StatusCode(500, $"AI processing failed: {ex.Message}");
}
```

### 3. Input Validation

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

For integration testing with your specific data model, create test cases that verify AI responses match expected grid operations.

## Example Client Usage

### JavaScript/TypeScript Frontend

```typescript
interface GridAIRequest {
  columns: GridAIColumn[];
  contents: GridAIRequestContent[];
  role?: string;
}

interface GridAIColumn {
  field: string;
  values: string[];
}

interface GridAIRequestContent {
  $type: string;
  text: string;
}

async function processGridQuery(query: string, columns: GridAIColumn[]) {
  const request: GridAIRequest = {
    columns: columns,
    contents: [{ $type: "text", text: query }],
    role: "user"
  };

  const response = await fetch('/grid/smart-state', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request)
  });

  return await response.json();
}

// Usage
const columns = [
  { field: "Name", values: ["John", "Jane", "Bob"] },
  { field: "Age", values: ["25", "30", "35"] },
  { field: "Department", values: ["IT", "HR", "Finance"] }
];

const result = await processGridQuery("Show me IT employees", columns);
```

## Troubleshooting

### Common Issues

1. **Invalid URI Format**: Ensure your Azure OpenAI endpoint is correctly formatted in configuration
2. **API Key Issues**: Verify your API key has proper permissions and is not expired
3. **Model Availability**: Ensure the specified model ID is deployed in your Azure OpenAI resource
4. **Token Limits**: Be mindful of token limits when processing large datasets

