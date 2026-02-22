---
title: Integrating Telerik UI Editor with an AI Service
description: "Learn how to enhance text dynamically using an AI backend with ASP.NET Core and Azure OpenAI."
type: how-to
page_title: Telerik UI Editor AI Integration for {{ site.product }}
slug: editor-ai-integration
tags: editor, ai, openai, azure, assistant, kendo-editor
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Editor</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2025.4.1111 version</td>
 </tr>
</table>

## Description

How can I integrate the Telerik UI Editor with an external AI service, such as Azure OpenAI, so that the selected text or full content can be enhanced through natural-language instructions?

## Solution

To integrate the Editor with an AI backend:

1. Add a custom AI button to the Editor toolbar.
2. Open a Kendo Window where the user can describe how they want the text to be improved.
3. Send the selected text and the instruction to an ASP.NET Core endpoint.
4. The AI service returns improved text, which is then inserted back into the Editor.

---

### View
- This section defines the Editor UI along with a custom AI button that opens a dialog for entering improvement instructions.
- It captures either the selected text or the full editor content and sends it to the AI service for enhancement.
- The view then reinserts the AI-generated refinement back into the Editor, replacing only the selected text when applicable.

```csharp
@{
    ViewData["Title"] = "Smart AI Editor";
}

<style>
    body {
        font-family: "Inter", sans-serif;
        background-color: #f4f7f9;
    }

    .container {
        max-width: 800px;
        margin: 0 auto;
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }

    h2 {
        text-align: center;
        font-weight: 600;
    }

    .ai-input {
        width: 100%;
        padding: 10px;
        border-radius: 6px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
        font-size: 14px;
    }

    .k-editor-toolbar .k-tool.aiEditorButton::before {
        content: "🤖";
        font-size: 20px;
        color: #5ce500;
    }

    .k-window {
        border: 3px solid #5ce500;
    }
</style>

<div class="container">
    <h2>Smart AI-Powered Editor</h2>

    <div class="editor-container">
        @(Html.Kendo().Editor()
                .Name("textEditor")
                .Tools(tools => tools
                    .Clear().Bold().Italic().Underline()
                    .InsertUnorderedList().InsertOrderedList()
                    .FontSize().ForeColor().BackColor()
                    .CustomButton(c => c.Name("aiEditorButton")
                    .Tooltip("Improve with AI")
                    .Exec("openAIWindow")
                    .Icon("none")
                    )
                )
                .Value("I am a Smart AI-Powered Editor")
                .HtmlAttributes(new { style = "width:100%; height:300px;" })
        )
    </div>

    @(Html.Kendo().Window()
        .Name("window")
        .Title("Smart AI Editor")
        .Visible(false)
        .Content(@<text>
        <h4>AI-Powered Refinement</h4>
        <p>Describe how you want AI to improve the text and click 'Refine with AI'.</p>

        <input type="text" id="aiInstruction" class="ai-input" placeholder="Describe what you want AI to do (e.g., 'Make it more professional')">

        @(Html.Kendo().Button()
                .Name("aiEditButton")
                .ThemeColor(ThemeColor.Success)
                .Content("Refine with AI")
                )
    </text>)
        .Width(600)
        .Position(p => p.Top(450).Left(650))
        .Actions(actions => actions.Pin().Minimize().Maximize().Close())
        .Events(e => e.Open("onWindowOpen").Close("onWindowClose"))
        )

</div>

<script>
    $(document).ready(function() {
        setTimeout(() => {
            var aiButton = $(".k-aiEditorButton");
            if (aiButton.length) {
                aiButton.find(".k-button-icon").html(`
                    <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="2" width="28" height="28" rx="6" fill="#5ce500"/>
                        <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="white" text-anchor="middle" alignment-baseline="middle">AI</text>
                    </svg>
                `);
            }
        }, 200);
    });

    function openAIWindow() {
        var window = $("#window").data("kendoWindow");
        window.open();
    }

    function onWindowOpen() {
        $(".k-aiEditorButton").hide();

        setTimeout(() => {
            $("#aiEditButton").kendoButton({
                themeColor: "success"
            });
        }, 100);
    }

    function onWindowClose() {
        $(".k-aiEditorButton").show();
    }

    $(document).on("click", "#aiEditButton", async function() {
        var editor = $("#textEditor").data("kendoEditor");
        var textContent = editor.value();
        var instruction = $("#aiInstruction").val().trim();
        var selection = editor.getSelection();
        var selectedText = selection ? selection.toString().trim() : "";

        if (!textContent.trim() || !instruction) {
            alert("Please enter text and an AI instruction!");
            return;
        }

        $("#aiEditButton").prop("disabled", true).text("Processing...");

        try {
            const response = await fetch("/api/smarteditor/edit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Text: selectedText ? selectedText : textContent,
                    Instruction: instruction
                })
            });

            if (!response.ok) {
                alert("Error processing request. Try again.");
                return;
            }

            const result = await response.json();
            let aiGeneratedText = result.Suggestions.trim();

            if (selectedText.length > 0) {
                editor.exec("inserthtml", { value: aiGeneratedText });
            } else {
                editor.value(aiGeneratedText);
            }
        } catch (error) {
            alert("Error communicating with AI.");
        } finally {
            $("#aiEditButton").prop("disabled", false).text("Refine with AI");
        }
    });
</script>
```

---

### Controller
- The controller handles incoming text-improvement requests and forwards them to the AI service.
- It returns the refined content to the client so the view can update the Editor accordingly.
- This design keeps the Editor lightweight and delegates all refinement logic to the AI service.

```csharp
public class SmartEditorController : Controller
{
    private readonly AiService _smartEditorService;

    public SmartEditorController(AiService smartEditorService)
    {
        _smartEditorService = smartEditorService;
    }

    public IActionResult SmartEditor()
    {
        return View();
    }

    [HttpPost]
    [Route("api/smarteditor/edit")]
    public async Task<IActionResult> EditText([FromBody] EditRequest request)
    {
        if (string.IsNullOrEmpty(request.Text) || string.IsNullOrEmpty(request.Instruction))
            return BadRequest("Both text and instruction are required.");

        var revisedText = await _smartEditorService.EditTextAsync(request.Text, request.Instruction);
        return Ok(new { Suggestions = revisedText });
    }
}

public class EditRequest
{
    public string Text { get; set; }
    public string Instruction { get; set; }
}
```

---

### AI Service
- The AI service receives both the selected text and the improvement instruction, enabling targeted refinement.
- It returns the enhanced HTML content, which the Editor inserts directly without additional formatting.
- This section isolates AI logic to maintain a clean controller and view structure.

```csharp
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

    private async Task<string> SendAsync(string url, object payload)
    {
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

    public async Task<string> EditTextAsync(string text, string instruction)
    {
        var url = $"{_endpoint}openai/deployments/{_deployment}/chat/completions?api-version=2024-02-15-preview";
        var payload = new
        {
            messages = new[]
            {
                new
                {
                    role = "system",
                    content =
                        "You are an AI text editor. Modify the text ONLY according to the user's instruction while preserving existing formatting. " +
                        "Return only valid HTML with inline styles when formatting is requested."
                },
                new
                {
                    role = "user",
                    content =
                        $"Modify this text:\n\n{text}\n\nInstruction: {instruction}"
                }
            },
            temperature = 0.3,
            max_tokens = 500
        };

        return await SendAsync(url, payload);
    }
}
```

---

### Register the Service in Program.cs

Registering the AiService in the dependency injection container allows the application to resolve it automatically in controllers that rely on it for processing AI requests.

```csharp
builder.Services.AddTransient<AiService>();
```

---

### AppSettings

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

---

### Runnable Example

A fully runnable example of this integration is available in [the official Telerik UI for ASP.NET Core examples repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc)
