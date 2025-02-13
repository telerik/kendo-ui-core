---
title: Integration with Microsoft.Extensions.AI
page_title: Integration with Microsoft.Extensions.AI
description: "Learn more about integrating the Telerik UI for {{ site.framework }} components with Microsoft.Extensions.AI"
slug: integration_microsoft_extensions_ai
position: 11
---

# Integration with Microsoft.Extensions.AI

The [AIPrompt component]({% slug htmlhelpers_overview_aiprompt %}) incorporates the <a href="https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai?view=net-9.0-pp" target="_blank">`Microsoft.Extensions.AI` package</a> to simplify your AI model integration, provide flexibility and allows you to easily use and test various AI providers.

Other components will support similar integration in future versions of {{ site.product_short }}.

## Integration

To integrate the <a href="https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai?view=net-9.0-pp" target="_blank">`Microsoft.Extensions.AI`</a> library with your AIPrompt component, register an <a href="https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai.ichatclient?view=net-9.0-pp" target="_blank">`IChatClient`</a> service and configure it according to the model you are using. The AIPrompt is designed to automatically use the registered `IChatClient`.

{% if site.core %}
`Microsoft.Extensions.AI` provides a simple integration with various models where the configuration slightly differs depending on the model. The example below shows usage of <a href="https://www.nuget.org/packages/Azure.AI.OpenAI" target="_blank">Azure OpenAI</a> and you may <a href="https://devblogs.microsoft.com/dotnet/introducing-microsoft-extensions-ai-preview/#chat" target="_blank">explore some other examples with different models in this post</a>.

```Program.cs
    // Add services to the container.

    // Register the Azure OpenAI client.
    builder.Services.AddSingleton(new AzureOpenAIClient(
        new Uri("YOUR_AZURE_OPENAI_ENDPOINT"),
        new AzureKeyCredential("YOUR_AZURE_OPENAI_CREDENTIAL")
    ));

    // Register the Chat client with the specified model.
    builder.Services.AddChatClient(services => 
        services.GetRequiredService<AzureOpenAIClient>()
            .AsChatClient("gpt-4o-mini")
    );
```
```Controller
    using KendoCoreService.Filters;
    using Microsoft.AspNetCore.Components.Forms;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.AI;
    using SharpToken;

    public class LLMController : Controller
    {
        private readonly IChatClient _chatClient;

        public LLMController(IChatClient chatClient)
        {
            _chatClient = chatClient;
        }

        [HttpPost]
        [ServiceFilter(typeof(ApiKeyAuthFilter))]
        public async Task<IActionResult> AIChatCompletion([FromBody] IList<ChatMessage> messages)
        {
            var options = new ChatOptions
            {
                MaxOutputTokens = 500,
                Temperature = 0.7f
            };

            ValidateMessagesLength(messages);

            var hasSystemPrompt = messages.Any(x => x.Role == ChatRole.System);

            if (!hasSystemPrompt)
            {
                messages.Prepend(new ChatMessage(ChatRole.System, DefaultSystemPrompt));
            }

            var response = await _chatClient.CompleteAsync(messages, options);

            return Json(response);
        }

        private void ValidateMessagesLength(IList<ChatMessage> messages)
        {
            var tokenizer = GptEncoding.GetEncoding("cl100k_base");

            foreach (var message in messages)
            {
                var tokens = tokenizer.Encode(message.Text);

                if (tokens.Count > 1000) 
                {
                    var truncatedTokens = tokens.Take(1000).ToList();
                    message.Text = tokenizer.Decode(truncatedTokens);
                }
            }
        }
    }
```

For the complete `IChatClient` example, refer to the <a href="https://github.com/telerik/kendo-ui-demos-service/blob/master/core/KendoCoreService/Controllers/LLMController.cs" target="_blank">`kendo-ui-demos-service` GitHub repository</a>.
{% else %}
`Microsoft.Extensions.AI` provides a simple integration with various models where the configuration slightly differs depending on the model. You may <a href="https://devblogs.microsoft.com/dotnet/introducing-microsoft-extensions-ai-preview/#chat" target="_blank">explore examples with different models in this post</a>.
{% endif %}

## See Also 

* [AIPrompt for {{ site.framework }} Overview (Documentation)]({% slug htmlhelpers_overview_aiprompt %})
* [Binding AIPrompt for {{ site.framework }} to a remote AI service (Demo)](https://demos.telerik.com/{{ site.platform }}/aiprompt/aicompletionservice)
* [Microsoft.Extensions.AI](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai?view=net-9.0-pp)
* [Introducing Microsoft.Extensions.AI Preview – Unified AI Building Blocks for .NET](https://devblogs.microsoft.com/dotnet/introducing-microsoft-extensions-ai-preview/)