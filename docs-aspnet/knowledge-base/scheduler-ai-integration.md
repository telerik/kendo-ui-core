---
title: Integrating Telerik UI Scheduler with an AI Service
description: "Learn how to generate scheduler events dynamically using an AI backend with ASP.NET Core and Azure OpenAI."
type: how-to
page_title: Telerik UI Scheduler AI Integration for {{ site.product }}
slug: scheduler-ai-integration
tags: scheduler, ai, openai, azure, assistant, kendo-scheduler
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Scheduler</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2025.4.1111 version</td>
 </tr>
</table>

## Description

How can I integrate the Telerik UI Scheduler with an external AI service, such as Azure OpenAI, so that scheduling instructions written in natural language are converted into Scheduler events?

## Solution

To integrate the Scheduler with an AI backend:

1. Add a text box where the user enters natural-language scheduling instructions.
2. Send the instructions to an ASP.NET Core endpoint (`/SmartScheduler/GenerateSchedule`).
3. Use an AI service to generate a JSON configuration describing:
   - the main date
   - the list of events with start/end times
4. Recreate the Scheduler instance on the client using the returned JSON.

---

### View
- This section defines the Scheduler UI along with the input area where users can type natural-language scheduling instructions.
- It also includes the client-side script that sends the instructions to the server and recreates the Scheduler based on the AI-generated configuration.
- The example demonstrates how AI-driven event creation integrates seamlessly into the existing Kendo Scheduler setup.

```csharp
<div style="margin-bottom: 10px; font-size: 14px; color: #bbb;">
    Try one of these examples:
    <ul id="schedulerExamples" style="margin-top: 5px; list-style: none; padding-left: 0;">
        <li style="color:#00ffe5;">• Add three meetings on December 10, 2025: design review at 10:00, sprint planning at 13:00, and QA sync at 16:00.</li>
        <li style="color:#00ffe5;">• Create a team event on December 15, 2025 from 09:00 to 17:00 titled Development Day.</li>
        <li style="color:#00ffe5;">• Schedule a recurring daily stand-up from December 1 to December 7, 2025 at 09:30.</li>
    </ul>
</div>

@(Html.Kendo().TextArea()
    .Name("schedulerInstructions")
    .Placeholder("Enter your scheduling instructions here...")
    .Rows(8)
    .Rounded(Rounded.Medium)
    .MaxLength(300)
    .HtmlAttributes(new {
        style="width:60%",
        required=true,
        data_required_msg="Please enter a description.",
        data_max_msg="Maximum length is 300 characters."
    })
)

<br /><br />

@(Html.Kendo().Button()
    .Name("generateSchedule")
    .ThemeColor(ThemeColor.Success)
    .Content("Generate Schedule")
)

<hr style="margin:20px 0; border-color:#333;" />

<div id="schedulerContainer">
    @(Html.Kendo().Scheduler<Telerik.Examples.Mvc.Models.TaskViewModel>()
        .Name("scheduler")
        .StartTime(6,30,0)
        .Height(600)
        .WorkWeekStart(1)
        .WorkWeekEnd(7)
        .Views(v => {
            v.DayView();
            v.WorkWeekView();
            v.WeekView();
            v.MonthView(m => m.Selected(true));
            v.AgendaView();
            v.TimelineView();
        })
        .Timezone("Etc/UTC")
        .DataSource(d => d
            .Model(m => {
                m.Id(f => f.TaskID);
                m.Field(f => f.Title).DefaultValue("No title");
                m.RecurrenceId(f => f.RecurrenceID);
            })
            .Read(r => r.Action("Read", "SchedulerServerFiltering"))
            .Create("Create", "SchedulerServerFiltering")
            .Update("Update", "SchedulerServerFiltering")
            .Destroy("Destroy", "SchedulerServerFiltering")
        )
    )
</div>

<script>
    $("#schedulerExamples li").css("cursor","pointer").on("click", function () {
        var t = $(this).text().trim().replace(/^•\s*/, "");
        $("#schedulerInstructions").data("kendoTextArea").value(t);
    });

    $("#generateSchedule").click(function () {
        var instructions = $("#schedulerInstructions").val();

        $.ajax({
            url: "/SmartScheduler/GenerateSchedule",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ instructions: instructions }),
            success: function (response) {
                if(response.config == "{}"){
                    alert("The AI Service is currently unavailable. Please check your configuration.");
                    return;
                }

                var schedulerConfig = JSON.parse(response.config);

                $("#scheduler").data("kendoScheduler").destroy();
                $("#scheduler").empty();

                $("#scheduler").kendoScheduler({
                    date: schedulerConfig.date || new Date(),
                    timezone: "Etc/UTC",
                    height: 600,
                    views: [
                        "day", "workWeek", "week", { type: "month", selected: true }, "agenda", "timeline"
                    ],
                    dataSource: {
                        data: schedulerConfig.events || []
                    }
                });
            },
            error: function (xhr) {
                console.error("Scheduler AI failed:", xhr.responseText);
                alert("The AI Service is currently unavailable. Please check your configuration.");
            }
        });
    });
</script>
```

---

### Controller
- The controller receives the user's instructions, invokes the AI service, and returns a JSON response that represents the Scheduler configuration.
- It acts as a bridge between the client-side script and the AI backend, ensuring reliable request handling and error management.
- This separation keeps the Scheduler responsive while delegating all interpretation logic to the AI service.


```csharp
public class SmartSchedulerController : Controller
{
    private readonly AiService _aiService;
    private readonly ILogger<SmartSchedulerController> _logger;

    public SmartSchedulerController(AiService aiService, ILogger<SmartSchedulerController> logger)
    {
        _aiService = aiService;
        _logger = logger;
    }

    [HttpPost]
    [Route("SmartScheduler/GenerateSchedule")]
    public async Task<IActionResult> GenerateSchedule([FromBody] SchedulerRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Instructions))
            return BadRequest("Instructions cannot be empty.");

        try
        {
            var config = await _aiService.GenerateSchedulerConfigAsync(request.Instructions);
            return Json(new { config });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Scheduler generation error");
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpGet]
    public IActionResult SmartScheduler()
    {
        return View();
    }
}

public class SchedulerRequest
{
    public string Instructions { get; set; }
}
```

---

### AI Service
- The AI service communicates directly with Azure OpenAI and generates the Scheduler configuration from natural-language instructions.
- It returns strictly formatted JSON so the client-side Scheduler can be recreated without additional transformations.
- This section encapsulates the AI interaction, keeping the main application logic clean and maintainable.

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

    public async Task<string> GenerateSchedulerConfigAsync(string instructions)
    {
        var url = $"{_endpoint}openai/deployments/{_deployment}/chat/completions?api-version=2024-02-15-preview";

        var systemPrompt = @"
                               Return ONLY valid JSON for a Kendo UI Scheduler.
                               The JSON object MUST contain:
                               {
                                 ""date"": ""2025-01-10T00:00:00Z"",
                                 ""events"": [
                                     {
                                       ""id"": 1,
                                       ""title"": ""Design Review"",
                                       ""start"": ""2025-01-10T10:00:00Z"",
                                       ""end"": ""2025-01-10T11:00:00Z""
                                     }
                                 ]
                               }
                               RULES:
                               - Convert all dates into ISO UTC strings.
                               - The 'events' array must contain the tasks created or modified.
                               - Do NOT include Kendo configuration like views or transport.
                               ";

        var payload = new
        {
            messages = new[]
            {
                new { role = "system", content = systemPrompt },
                new { role = "user", content = instructions }
            },
            temperature = 0.2,
            max_tokens = 600
        };

        var raw = await SendAsync(url, payload);
        if (string.IsNullOrWhiteSpace(raw)) return "{}";

        string config = raw.Trim();

        int start = config.IndexOf("{");
        int end = config.LastIndexOf("}");
        if (start >= 0 && end > start)
            config = config.Substring(start, end - start + 1);

        try { JObject.Parse(config); return config; }
        catch
        {
            config = config.Replace(",]", "]").Replace(",}", "}");
            try { JObject.Parse(config); return config; }
            catch { return "{}"; }
        }
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
