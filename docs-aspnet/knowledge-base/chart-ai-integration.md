---
title: Integrating Telerik UI Chart with an AI Service
description: "Learn how to generate fully configured Kendo UI Charts using an AI backend in ASP.NET Core and Azure OpenAI."
type: how-to
page_title: Telerik UI Chart AI Integration for {{ site.product }}
slug: chart-ai-integration
tags: chart, ai, openai, azure, assistant, kendo-chart
res_type: kb
component: chart
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Chart</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2025.4.1111 version</td>
 </tr>
</table>

## Description

How can I integrate the Telerik UI Chart with an external AI service, such as Azure OpenAI, so that natural-language instructions can generate a fully configured chart?

## Solution

To integrate the Chart with an AI backend:

1. Provide an input area where users can describe the chart they want to generate.
2. Send the user instructions to an ASP.NET Core endpoint.
3. Use an AI service to generate a complete Kendo UI Chart JSON configuration.
4. Apply styling and color enhancements.
5. Initialize the final chart on the client.

---

### View
- This section defines the UI where users enter natural-language instructions describing the chart they want to generate.
- It sends the instructions to the AI endpoint and rebuilds the chart using the returned JSON configuration.
- The view enhances the chart visually by applying consistent colors, typography, and dark-theme elements.

```csharp
<div style="margin-bottom: 10px; font-size: 14px; color: #bbb;">
    Try one of these examples:
    <ul id="exampleList" style="margin-top: 5px; list-style: none; padding-left: 0;">
        <li style="color: #00ffe5;">
            • Generate a Kendo UI Bar Chart showing the latest global smartphone vendor market share using data from https://www.statista.com/statistics/271496/global-market-share-held-by-smartphone-vendors/.
        </li>
        <li style="color: #00ffe5;">
            • Create a Kendo UI Line Chart showing historical unemployment rate in the European Union from https://tradingeconomics.com/european-union/unemployment-rate.
        </li>
        <li style="color: #00ffe5;">
            • Generate a Kendo UI Pie Chart using the latest Global browser market share data from https://gs.statcounter.com/browser-market-share. Only use desktop and mobile combined.
        </li>
    </ul>
</div>

@(Html.Kendo().TextArea()
    .Name("chartInstructions")
    .Placeholder("Enter your chart instructions here...")
    .Rows(10)
    .Rounded(Rounded.Medium)
    .MaxLength(200)
    .HtmlAttributes(new
    {
        style = "width: 60%",
        required = true,
        data_required_msg = "Please enter a text.",
        data_max_msg = "Enter value between 1 and 200"
    })
)

<br />
<br />

@(Html.Kendo().Button()
    .Name("generateChart")
    .ThemeColor(ThemeColor.Success)
    .Content("Generate Chart")
)

<div id="chartContainer">
    <div id="smartChart"></div>
</div>

<script>
    $("#exampleList li").css("cursor", "pointer").on("click", function () {
        var text = $(this).text().trim().replace(/^•\s*/, "");
        $("#chartInstructions").data("kendoTextArea").value(text);
    });

    $("#generateChart").click(function() {
        var instructions = $("#chartInstructions").val();

        $.ajax({
            url: "/SmartChart/GenerateChart",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ instructions: instructions }),
            success: function(response) {
                if(response.config == "{}"){
                    alert("The AI Service is currently unavailable. Please check your configuration.");
                    return;
                }
                var chartConfig = JSON.parse(response.config);

                const electricColors = [
                    "#5ce500",
                    "#00ffe5",
                    "#ff00cc",
                    "#ffd700",
                    "#ff6600",
                    "#8000ff",
                    "#00ff44",
                    "#00aaff"
                ];

                if (Array.isArray(chartConfig.series)) {
                    for (var i = 0; i < chartConfig.series.length; i++) {
                        var series = chartConfig.series[i];

                        if (series.type === "pie" && Array.isArray(series.data)) {
                            for (var j = 0; j < series.data.length; j++) {
                                series.data[j].color = electricColors[j % electricColors.length];
                            }
                        } else {
                            series.color = electricColors[i % electricColors.length];
                        }
                    }
                }

                chartConfig.title = chartConfig.title || {};
                chartConfig.title.color = "#00ffe5";
                chartConfig.title.font = "bold 18px 'Segoe UI', sans-serif";

                chartConfig.legend = chartConfig.legend || {};
                chartConfig.legend.labels = {
                    color: "#ffffff",
                    font: "14px 'Segoe UI'"
                };

                chartConfig.categoryAxis = chartConfig.categoryAxis || {};
                chartConfig.categoryAxis.labels = {
                    color: "#ffffff",
                    font: "13px 'Segoe UI'"
                };
                chartConfig.categoryAxis.line = { color: "#00ffe5" };
                chartConfig.categoryAxis.majorGridLines = { color: "#333333" };

                chartConfig.valueAxis = chartConfig.valueAxis || {};
                chartConfig.valueAxis.labels = {
                    color: "#ffffff",
                    font: "13px 'Segoe UI'"
                };
                chartConfig.valueAxis.line = { color: "#ff00cc" };
                chartConfig.valueAxis.majorGridLines = { color: "#333333" };

                chartConfig.background = "#121212";

                $("#smartChart").empty().kendoChart(chartConfig);
            },
            error: function(xhr) {
                console.error("Request failed:", xhr.responseText);
                alert("The AI Service is currently unavailable. Please check your configuration.");
            }
        });
    });
</script>

<style>
    .k-chart-legend-item[aria-checked="false"] text {
        fill: #777 !important;
    }
</style>
```

---

### Controller
- The controller receives natural-language chart instructions and forwards them to the AI service.
- It returns a JSON configuration that can be fed directly into a Kendo UI Chart instance.
- This separation keeps the AI responsibilities cleanly isolated while allowing the chart to regenerate instantly.

```csharp
public class SmartChartController : Controller
{
    private readonly AiService _chartService;
    private readonly ILogger<SmartChartController> _logger;

    public SmartChartController(AiService chartService, ILogger<SmartChartController> logger)
    {
        _chartService = chartService;
        _logger = logger;
    }

    [HttpPost]
    [Route("SmartChart/GenerateChart")]
    public async Task<IActionResult> GenerateChart([FromBody] ChartRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Instructions))
            return BadRequest("Instructions cannot be empty.");

        try
        {
            var chartConfig = await _chartService.GenerateChartConfigAsync(request.Instructions);
            return Json(new { config = chartConfig });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating chart");
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpGet]
    public IActionResult SmartChart()
    {
        return View();
    }
}

public class ChartRequest
{
    public string Instructions { get; set; }
}
```

---

### AI Service
- The AI service receives the chart instructions and returns only valid JSON for use in a Kendo UI Chart.
- It ensures the structure is clean and correct so the chart can be instantiated without modifications.
- This section contains only the methods required for generating chart configurations.

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

    public async Task<string> GenerateChartConfigAsync(string instructions)
    {
        var url = $"{_endpoint}openai/deployments/{_deployment}/chat/completions?api-version=
2024-02-15-preview";
        var payload = new
        {
            messages = new[]
            {
                new { role = "system", content = "Return ONLY valid JSON for a Kendo UI Chart." },
                new { role = "user", content = $"Generate a Kendo UI Chart JSON configuration. Instructions: {instructions}" }
            },
            temperature = 0.2,
            max_tokens = 600
        };

        var raw = await SendAsync(url, payload);
        if (string.IsNullOrWhiteSpace(raw)) return "{}";

        string config = raw.Trim();

        int start = config.IndexOf('{');
        int end = config.LastIndexOf('}');
        if (start >= 0 && end > start)
            config = config.Substring(start, end - start + 1);

        try
        {
            JObject.Parse(config);
            return config;
        }
        catch
        {
            config = config.Replace(",]", "]").Replace(",}", "}");
            try
            {
                JObject.Parse(config);
                return config;
            }
            catch
            {
                return "{}";
            }
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

A fully runnable example of this integration is available in  
[the official Telerik UI for ASP.NET Core examples repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc)
