---
title: Integrating Telerik UI Grid with an AI Service
description: "Learn how to analyze grid data dynamically using an AI backend with ASP.NET Core and Azure OpenAI."
type: how-to
page_title: Telerik UI Grid AI Integration for {{ site.product }}
slug: grid-ai-integration
tags: grid, ai, openai, azure, assistant, kendo-grid
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

How can I integrate the Telerik UI Grid with an external AI service, such as Azure OpenAI, so that natural-language questions about the displayed data can be analyzed and executed automatically?

## Solution

To integrate the Grid with an AI backend:

1. Display the data in a standard Kendo UI Grid.
2. Capture the user's natural-language question and send it to an AI endpoint.
3. Provide the AI with the full grid dataset in JSON format.
4. The AI returns either:
   - a natural-language insight, or
   - a structured JSON command for sorting or filtering
5. Apply the result to the Grid on the client side.

---

### View
- This section defines the Grid UI and provides a text area where users can ask questions about the displayed data.
- It includes suggestion prompts and client-side logic that submits the question along with the grid’s data to the AI endpoint.
- Based on the AI result, the view applies sorting, filtering, or displays natural-language insights.

```csharp
@{
    ViewData["Title"] = "AI Grid Insights";
}

<h2>Sales Data Grid + AI Insights</h2>

@(Html.Kendo().Grid<SaleRecord>()
    .Name("salesGrid")
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
    .DataSource(ds => ds.Ajax()
        .Read(read => read.Url("/SmartGrid/GetSales"))
    )
    .Sortable()
    .Filterable()
)

<div class="k-mt-4" style="color: #ffffff;">
    <label for="instructionBox" class="k-label">Ask AI about the data:</label>

    <ul style="margin-top: 5px; list-style: disc; padding-left: 20px; font-size: 14px; color: #00ffe5;">
        <li class="ai-suggestion">Which salesperson has the highest total sales?</li>
        <li class="ai-suggestion">What is the average units sold per region?</li>
        <li class="ai-suggestion">Show the month with the lowest performance.</li>
        <li class="ai-suggestion">Sort the grid by Total descending</li>
        <li class="ai-suggestion">Filter to only show data from July</li>
        <li class="ai-suggestion">Show only rows where Units Sold is greater than 130</li>
        <li class="ai-suggestion">What is the total revenue by month?</li>
        <li class="ai-suggestion">How many units did Alice sell in total?</li>
    </ul>

    @(Html.Kendo().TextArea()
        .Name("instructionBox")
        .Placeholder("e.g. Which region had the lowest total?")
        .Rows(4)
        .HtmlAttributes(new { style = "width:100%; background-color:#1f1f1f; color:white;", @class = "k-textbox" })
        )

    <div class="k-mt-2">
        @(Html.Kendo().Button()
                .Name("analyzeButton")
                .Content("Analyze")
                .ThemeColor(ThemeColor.Success)
                .HtmlAttributes(new { onclick = "analyzeGrid()" })
                )
    </div>
</div>

<div id="aiResponse" class="k-mt-4">
    <strong>AI Response:</strong>
    <div id="aiText" style="margin-top:10px;"></div>
</div>

@section scripts {
    <script>
        $(document).on("click", ".ai-suggestion", function () {
            const text = $(this).text().trim();
            $("#instructionBox").data("kendoTextArea").value(text);
        });

        async function analyzeGrid() {
            const grid = $("#salesGrid").data("kendoGrid");
            const allData = grid.dataSource.view().map(item => item.toJSON());
            const instructions = $("#instructionBox").val();

            if (!instructions.trim()) {
                alert("Please enter a question or instruction for the AI.");
                return;
            }

            $("#aiText").html("<em>Thinking...</em>");

            const response = await fetch('/SmartGrid/Analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    instructions: instructions,
                    gridJson: JSON.stringify(allData)
                })
            });

            const result = await response.json();

            try {
                const json = JSON.parse(result.result);

                if (json.action === "filter") {
                    grid.dataSource.filter({
                        field: json.field,
                        operator: json.operator,
                        value: json.value
                    });
                    $("#aiText").html(`<strong>Applied filter:</strong> ${json.field} ${json.operator} ${json.value}`);
                } else if (json.action === "sort") {
                    grid.dataSource.sort({
                        field: json.field,
                        dir: json.dir
                    });
                    $("#aiText").html(`<strong>Sorted by:</strong> ${json.field} (${json.dir})`);
                } else {
                    $("#aiText").text(result.result);
                }
            } catch {
                $("#aiText").text(result.result);
            }
        }
    </script>
}

<style>
    textarea.k-textbox,
    .k-input {
        background-color: #1f1f1f;
        color: #ffffff;
        border-color: #444;
    }

        textarea.k-textbox::placeholder {
            color: #888888;
        }

    #aiResponse {
        background-color: #1f1f1f;
        border: 1px solid #444;
        padding: 1em;
        border-radius: 6px;
        margin-top: 1em;
        color: #00ffe5;
        font-size: 14px;
    }

        #aiResponse strong {
            display: block;
            margin-bottom: 6px;
            color: #ffffff;
            font-weight: 600;
            font-size: 15px;
        }

    #aiText {
        white-space: pre-line;
    }
</style>
```

---

### Controller
- The controller provides the sales data to the Grid and exposes the endpoint used for AI analysis.
- It packages the user’s question and the dataset into a request sent to the AI service.
- The endpoint returns either a natural-language insight or a structured JSON command that the client uses to update the Grid.

```csharp
public class SmartGridController : Controller
{
    private readonly AiService _smartGridService;

    public SmartGridController(AiService smartGridService)
    {
        _smartGridService = smartGridService;
    }

    public IActionResult SmartGrid()
    {
        return View();
    }

    [HttpPost]
    public IActionResult GetSales([DataSourceRequest] DataSourceRequest request)
    {
        return Json(GetFullSalesData().ToDataSourceResult(request));
    }

    [HttpPost]
    public async Task<IActionResult> Analyze([FromBody] GridAnalysisRequest request)
    {
        var result = await _smartGridService.AnalyzeGridDataAsync(request.Instructions, request.GridJson);
        return Json(new { result });
    }

    private List<SaleRecord> GetFullSalesData()
    {
        return new List<SaleRecord>
        {
            new SaleRecord { Id = 1, SalesPerson = "Alice", Region = "North", UnitsSold = 120, Total = 24000, Month = "January" },
            new SaleRecord { Id = 2, SalesPerson = "Bob", Region = "South", UnitsSold = 80, Total = 16000, Month = "January" },
            new SaleRecord { Id = 3, SalesPerson = "Charlie", Region = "West", UnitsSold = 150, Total = 30000, Month = "February" },
            new SaleRecord { Id = 4, SalesPerson = "Alice", Region = "North", UnitsSold = 130, Total = 26000, Month = "February" },
            new SaleRecord { Id = 5, SalesPerson = "Bob", Region = "South", UnitsSold = 90, Total = 18000, Month = "March" },
            new SaleRecord { Id = 6, SalesPerson = "Charlie", Region = "West", UnitsSold = 170, Total = 34000, Month = "March" },
            new SaleRecord { Id = 7, SalesPerson = "Alice", Region = "East", UnitsSold = 100, Total = 20000, Month = "April" },
            new SaleRecord { Id = 8, SalesPerson = "David", Region = "South", UnitsSold = 75, Total = 15000, Month = "April" },
            new SaleRecord { Id = 9, SalesPerson = "Eva", Region = "North", UnitsSold = 110, Total = 22000, Month = "May" },
            new SaleRecord { Id = 10, SalesPerson = "Bob", Region = "South", UnitsSold = 95, Total = 19000, Month = "May" },
            new SaleRecord { Id = 11, SalesPerson = "Charlie", Region = "West", UnitsSold = 160, Total = 32000, Month = "June" },
            new SaleRecord { Id = 12, SalesPerson = "Alice", Region = "East", UnitsSold = 115, Total = 23000, Month = "June" },
            new SaleRecord { Id = 13, SalesPerson = "David", Region = "North", UnitsSold = 105, Total = 21000, Month = "July" },
            new SaleRecord { Id = 14, SalesPerson = "Eva", Region = "West", UnitsSold = 135, Total = 27000, Month = "July" },
            new SaleRecord { Id = 15, SalesPerson = "Alice", Region = "East", UnitsSold = 125, Total = 25000, Month = "August" },
            new SaleRecord { Id = 16, SalesPerson = "Charlie", Region = "South", UnitsSold = 140, Total = 28000, Month = "August" },
            new SaleRecord { Id = 17, SalesPerson = "David", Region = "North", UnitsSold = 100, Total = 20000, Month = "September" },
            new SaleRecord { Id = 18, SalesPerson = "Bob", Region = "West", UnitsSold = 155, Total = 31000, Month = "September" },
            new SaleRecord { Id = 19, SalesPerson = "Eva", Region = "South", UnitsSold = 85, Total = 17000, Month = "October" },
            new SaleRecord { Id = 20, SalesPerson = "Charlie", Region = "East", UnitsSold = 145, Total = 29000, Month = "October" }
        };
    }

    public class GridAnalysisRequest
    {
        public string Instructions { get; set; }
        public string GridJson { get; set; }
    }
}
```

---

### AI Service
- The AI service receives both the user's question and the full dataset, enabling accurate analysis.
- It returns either a natural-language summary or a structured JSON command for sorting or filtering.
- This section isolates the AI logic so the controller and view remain clean and maintainable.

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

    public async Task<string> AnalyzeGridDataAsync(string instructions, string gridDataJson)
    {
        var systemPrompt = @"
                        You are an AI assistant analyzing Kendo UI Grid data.
                        
                        You ALWAYS receive:
                        1) The full raw data (JSON array)
                        2) A user question
                        
                        RULES:
                        1. If the user explicitly asks for filtering or sorting:
                           Return ONLY a JSON object such as:
                           { ""action"": ""filter"", ""field"": ""Month"", ""operator"": ""eq"", ""value"": ""July"" }
                           or:
                           { ""action"": ""sort"", ""field"": ""Total"", ""dir"": ""desc"" }
                        
                        2. For ALL OTHER QUESTIONS:
                           Return a short natural language answer using ONLY the supplied data.
                        
                        No code, no markdown, no explanations.
                        ";

        var url = $"{_endpoint}openai/deployments/{_deployment}/chat/completions?api-version=2024-02-15-preview";
        var payload = new
        {
            messages = new[]
            {
                new { role = "system", content = systemPrompt },
                new { role = "user", content = $"Grid Data:\n{gridDataJson}" },
                new { role = "user", content = $"Question:\n{instructions}" }
            },
            temperature = 0.3,
            max_tokens = 1500
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
