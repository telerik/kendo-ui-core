---
title: Integrating Telerik UI Chat with an AI Service
description: "Learn how to connect the Telerik UI Chat component to an AI backend using ASP.NET Core and Azure OpenAI."
type: how-to
page_title: Telerik UI Chat AI Integration for {{ site.product }}
slug: chat-ai-integration
tags: chat, ai, openai, azure, assistant, messages, kendochat
res_type: kb
components: ["general"]
component: chat
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Chat</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2025.4.1111 version</td>
 </tr>
</table>

## Description

How can I integrate the Telerik UI Chat component with an external AI service, such as Azure OpenAI, so that user messages are sent to the AI backend and the assistant's response is posted back into the Chat widget?

## Solution

To integrate Telerik UI Chat with an AI backend:

1. Configure the Chat component and handle the SendMessage event in the View.
2. Send the user's text to an ASP.NET Core endpoint (/Ai/Ask).
3. Use a backend service (AiService) to call Azure OpenAI and return the generated response.
4. Post the AI assistant response back into the Chat widget.

### View Configuration

The Chat component is configured with a SendMessage event handler that captures each user message as it is submitted. The handler sends the message text to the server-side AI endpoint using `fetch()`, then posts the AI-generated response back into the Chat widget as a new message from the assistant. The `SkipSanitization(true)` option allows the component to display AI-generated text without additional HTML filtering, while the layout settings ensure a consistent and centered presentation within the page.


```
<div class="k-d-flex k-justify-content-center main-container">
@(Html.Kendo().Chat()
    .Name("aiChat")
    .SkipSanitization(true)
    .Width("400px")
    .Height("600px")
    .MessageWidthMode(MessageWidthMode.Full)
    .Messages(m => m.Placeholder("Ask the AI..."))
    .Events(e => e.SendMessage("onSendMessage"))
)
</div>

<script>
    async function onSendMessage(e) {

        e.message.authorName = "John Smith";
        const chat = $("#aiChat").data("kendoChat");
        const response = await fetch('/Ai/Ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: e.message.text })
        });
        const data = await response.json();

        chat.postMessage({
            authorId: 'ai-assistant',
            authorName: 'AI Assistant',
            text: data.answer,
            id: kendo.guid(),
            timestamp: new Date()
        });
    }
</script>
```

### AI Controller

The AI controller exposes a POST endpoint that receives the user's prompt, forwards it to the AiService for processing, and returns the generated response as JSON. It encapsulates all communication with the AI backend while providing structured error handling to ensure reliable integration with the Chat component.

```
using Microsoft.AspNetCore.Mvc;
using TelerikAspNetCoreApp4.Models;
using TelerikAspNetCoreApp4.Services;

namespace TelerikAspNetCoreApp4.Controllers
{
    public class AiController : Controller
    {
        private readonly AiService _ai;
        public AiController(AiService ai) { _ai = ai; }

        [HttpPost]
        public async Task<IActionResult> Ask([FromBody] AiPrompt req)
        {
            try
            {
                var result = await _ai.ProcessAsync(req.Prompt);
                return Json(new { answer = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }
    }
}
```

### AI Service (Azure OpenAI)

The AiService encapsulates all communication with Azure OpenAI, providing a clean abstraction layer between the application and the external AI provider. It constructs the request payload, sends it to the specified Azure OpenAI deployment, and extracts the assistant’s generated response from the API result. By isolating the integration logic in a dedicated service, the application remains modular, testable, and easy to extend with custom prompts, additional context, or different AI backends in the future.

```
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace TelerikAspNetCoreApp4.Services
{
    public class AiService
    {
        private readonly HttpClient _http;
        private readonly string _apiKey;
        private readonly string _endpoint;
        private readonly string _deployment;

        public AiService(IConfiguration config)
        {
            _http = new HttpClient();
            _apiKey = config["OpenAI:ApiKey"];
            _endpoint = config["OpenAI:Endpoint"];
            _deployment = config["OpenAI:DeploymentName"];
        }

        public async Task<string> ProcessAsync(string prompt)
        {
            var url = $"{_endpoint}openai/deployments/{_deployment}/chat/completions?api-version=2024-02-15-preview";
            var payload = new
            {
                messages = new[]
                {
                    new { role = "system", content = "You are a helpful assistant." },
                    new { role = "user", content = prompt }
                },
                temperature = 0.3,
                max_tokens = 1500
            };

            _http.DefaultRequestHeaders.Clear();
            _http.DefaultRequestHeaders.Add("api-key", _apiKey);

            var content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
            var response = await _http.PostAsync(url, content);
            var text = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
                return $"Azure OpenAI API error: {response.StatusCode}";

            var json = JObject.Parse(text);
            return json["choices"]?[0]?["message"]?["content"]?.ToString()?.Trim() ?? "";
        }
    }
}
```

### Register the Service in Program.cs

Registering the AiService in the dependency injection container allows the application to resolve it automatically in controllers that rely on it for processing AI requests.

```
builder.Services.AddTransient<AiService>();
```

### AppSettings 

These configuration values define the connection details for the Azure OpenAI deployment, enabling the AiService to securely access the API without hardcoding sensitive information in the source code.

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=Samples;Trusted_Connection=True;ConnectRetryCount=0"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "OpenAI": {
    "UseAzure": true,
    //"ApiKey": "your-api-key",
    "ApiKey": "",
    //"Endpoint": "your-end-point",
    "Endpoint": "your-end-point",
    //"DeploymentName": "your-deployment-name",
    "DeploymentName": "your-deployment-name"
  },
  "AllowedHosts": "*"
}
```

### Runnable Example

A fully runnable example of this integration is available in [the official Telerik UI for ASP.NET Core examples repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc)