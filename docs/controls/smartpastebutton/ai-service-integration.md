---
title: AI Service Integration
page_title: jQuery SmartPasteButton Documentation - AI Service Integration
description: "Learn how to integrate AI services with the Kendo UI for jQuery SmartPasteButton to process clipboard content and extract structured data."
components: ["smartpastebutton"]
slug: ai_service_integration_kendoui_smartpastebutton_widget
position: 3
---

# AI Service Integration

The SmartPasteButton integrates with AI services to process clipboard content and extract structured data for form population. This article demonstrates how to configure and implement AI service integration.

## Service Configuration

Configure the AI service endpoint using the `service` option. You can use the Telerik demo service for testing:

```html
<form id="employeeForm">
    <div>
        <label for="firstName">First Name:</label>
        <input id="firstName" name="firstName" type="text" />
    </div>
    <div>
        <label for="lastName">Last Name:</label>
        <input id="lastName" name="lastName" type="text" />
    </div>
    <div>
        <label for="email">Email:</label>
        <input id="email" name="email" type="email" />
    </div>
    <button id="smartPasteButton" type="button">Smart Paste</button>
</form>

<script>
$("#smartPasteButton").kendoSmartPasteButton({
    service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste"
});
</script>
```

For production use, configure your own AI service endpoint:

```html
<script>
$("#smartPasteButton").kendoSmartPasteButton({
    service: {
        url: "https://your-ai-service.com/api/smartpaste",
        method: "POST",
        headers: {
            "Authorization": "Bearer your-api-key",
            "Content-Type": "application/json"
        }
    }
});
</script>
```

## Request Format

The SmartPasteButton sends a POST request with the following structure:

```json
{
    "clipboardContent": "John Smith, Software Engineer at Acme Corp, john.smith@acme.com, (555) 123-4567",
    "formFields": [
        {
            "field": "firstName",
            "type": "string",
            "description": "First name"
        },
        {
            "field": "lastName", 
            "type": "string",
            "description": "Last name"
        },
        {
            "field": "email",
            "type": "string", 
            "description": "Email address"
        },
        {
            "field": "phone",
            "type": "string",
            "description": "Phone number"
        }
    ]
}
```

## Response Format

The AI service should return a JSON response with field values:

```json
{
    "firstName": "John",
    "lastName": "Smith", 
    "email": "john.smith@acme.com",
    "phone": "(555) 123-4567"
}
```

## .NET Core Implementation Example

For .NET Core applications, you can use the `Telerik.AI.SmartComponents.Extensions` library:

```csharp
using Microsoft.Extensions.AI;
using Microsoft.AspNetCore.Mvc;
using Telerik.AI.SmartComponents.Extensions;

[ApiController]
[Route("api/[controller]")]
public class SmartPasteController : ControllerBase
{
    private readonly IChatClient _chatClient;

    public SmartPasteController(IChatClient chatClient)
    {
        _chatClient = chatClient;
    }

    [HttpPost]
    public async Task<IActionResult> ProcessSmartPaste([FromBody] SmartPasteRequest request)
    {
        try
        {
            var chatMessages = request.GetChatMessages();
            var response = await _chatClient.CompleteAsync(chatMessages);
            var smartPasteResponse = response.ExtractSmartPasteResponse();
            
            return Ok(smartPasteResponse.FieldValues);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}
```

## Error Handling

Handle service errors using the `error` event:

```html
<script>
$("#smartPasteButton").kendoSmartPasteButton({
    service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste",
    error: function(e) {
        console.error("AI service error:", e.error);
        alert("Failed to process clipboard content: " + e.error);
    }
});
</script>
```

## Request Lifecycle Events

Monitor the AI request lifecycle using events:

```html
<script>
$("#smartPasteButton").kendoSmartPasteButton({
    service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste",
    requestStart: function(e) {
        console.log("AI request started");
        // Show loading indicator
    },
    requestEnd: function(e) {
        console.log("AI request completed");
        // Hide loading indicator
    },
    error: function(e) {
        console.error("AI request failed:", e.error);
    }
});
</script>
```

## See Also

* [SmartPasteButton Events]({% slug events_kendoui_smartpastebutton_widget %})
* [Getting Started with the SmartPasteButton]({% slug getting_started_kendoui_smartpastebutton_widget %})
* [JavaScript API Reference of the SmartPasteButton](/api/javascript/ui/smartpastebutton)
* [Knowledge Base Section](/knowledge-base)