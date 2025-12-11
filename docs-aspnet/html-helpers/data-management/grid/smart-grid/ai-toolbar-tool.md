---
title: AI Toolbar Assistant
description: "Learn how to use the AI Assistant Toolbar Tool in the Telerik UI for Grid for {{ site.framework }} to interact with your data using natural language prompts."
components: ["grid"]
slug: ai_toolbar_tool_core_grid
position: 1
---

#  Core Data Grid AI Toolbar Assistant

The Telerik UI Grid provides a built-in AI Assistant toolbar tool that allows users to interact with the Grid using natural language prompts. Use this feature to enable your end users to perform complex data operations like sorting, filtering, grouping, and highlighting without having to use the specific UI controls.

The AI Assistant interprets user requests and automatically applies the corresponding Grid operations, making data exploration more intuitive and accessible. The toolbar integrates an [AIPrompt]({% slug htmlhelpers_overview_aiprompt %}) component that enables natural language interaction with your custom AI service.

## AI Assistant Tool Basic Set Up

> The desired data operations ([`Filterable`](https://www.telerik.com/{{ site.platform }}/documentation/api/kendo.mvc.ui.fluent/gridbuilder#filterable), [`Sortable`](https://www.telerik.com/{{ site.platform }}/documentation/api/kendo.mvc.ui.fluent/gridbuilder#sortable), [`Groupable`](https://www.telerik.com/{{ site.platform }}/documentation/api/kendo.mvc.ui.fluent/gridbuilder#groupable)) must be enabled for the Grid, so that the AI Assistant can perform them on the Grid data.

To configure the Grid's AI Assistant toolbar tool:

1. Set up data binding in the Grid and enable the required data operations that the AI must control:

    ```HtmlHelper
    @(Html.Kendo().Grid<PatientRecord>()
      .Name("grid")
      .Filterable()
      .Groupable()
      .Sortable()
      ... // Additional configuration options.
    )
    ```
    {% if site.core %}
    ```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
        <filterable enabled="true"/>
        <groupable enabled="true"/>
        <sortable enabled="true"/>
        <!-- Additional configuration options. -->
    </kendo-grid>
    ```
    {% endif %}

2. Enable the `AiAssistant()` tool in the [Grid's toolbar](slug://htmlhelpers_grid_aspnetcore_toolbar):

    ```HtmlHelper
    @(Html.Kendo().Grid<PatientRecord>()
      .Name("grid")   
      .ToolBar(t =>
      {
            t.AIAssistant();
      })
      ... // Additional configuration options.
    )
    ```
    {% if site.core %}
    ```TagHelper
    <kendo-grid name="grid">
        <toolbar>
            <toolbar-button name="aiAssistant"></toolbar-button>
        </toolbar>
        <!-- Additional configuration options. -->
    </kendo-grid>
    ```
    {% endif %}

3. Configure the `Service` option to point to the AI service endpoint:

    ```HtmlHelper
    @(Html.Kendo().Grid<PatientRecord>()
      .Name("grid")   
      .AI(ai => ai
          .Service("https://demos.telerik.com/service/v2/ai/grid/smart-state")
      )
      ... // Additional configuration options.
    )
    ```
    {% if site.core %}
    ```TagHelper
    <kendo-grid name="grid">
      <ai>
          <service url="https://demos.telerik.com/service/v2/ai/grid/smart-state" />
      </ai>
      <!-- Additional configuration options. -->
    </kendo-grid>
    ```
    {% endif %}

The AI service defines the endpoint where your natural language queries will be processed. It must point to your custom AI service that can understand your domain-specific data and business logic.

### Row Highlighting

One of the key features of the AI Assistant toolbar tool is the ability to visually highlight Grid rows based on natural language prompts. When users enter prompts containing the word **highlight**, the Grid automatically processes the request and applies visual highlighting to the matching data.

The highlighting functionality enables users to quickly identify and visualize data patterns without having to manually configure filters or complex search criteria. The AI service interprets the natural language request and determines which rows must be highlighted based on the specified conditions.

Common highlighting use cases include:

- Conditional highlighting&mdash;**Highlight rows where age is above 60** will visually emphasize all rows meeting that criteria.
- Date-based highlighting&mdash;**Highlight all admissions after July 15th, 2024** will mark rows with dates matching the condition.
- Status-based highlighting&mdash;**Highlight rows with critical patients** will emphasize rows based on status values.
- Numeric range highlighting&mdash;**Highlight risk scores between 30% and 50%** will highlight rows within the specified range.
- Clear highlighting&mdash;**Clear highlighting** will remove all applied highlighting effects.

Users can combine highlighting with other data operations like filtering, sorting, and grouping.

## AI Service Integration

The AI Assistant toolbar tool supports two main integration approaches depending on how you want to handle AI service communication:

- [Automatic integration](#automatic-integration)
- [Manual integration](#manual-integration)

### Automatic Integration

In the automatic approach, the AI Assistant toolbar tool handles all communication with your AI service internally through HTTP requests. You simply need to configure the AI service property to point to your custom AI service endpoint.

The following example demonstrates a Grid with AI Assistant functionality that processes natural language requests for data operations:

```HtmlHelper
@(Html.Kendo().Grid<PatientRecord>()
    .Name("grid")
    .Columns(c =>
    {
        c.Bound(p => p.PatientName).Title("Patient Name").Width(180);
        c.Bound(p => p.Age).Title("Age").Width(80);
        c.Bound(p => p.ConditionSeverity)
            .Title("Condition Severity")
            .Width(160)
            .ClientTemplate("<span class='condition-badge'></span>");
        c.Bound(p => p.Department).Title("Department").Width(180);
        c.Bound(p => p.Status)
            .Title("Status")
            .Width(180)
            .ClientTemplate("<span class='status-chip'></span>");
        c.Bound(p => p.AdmissionDate).Title("Admission Date").Width(140).Format("{0:dd-MM-yy}");
        c.Bound(p => p.RiskScore)
            .Title("Risk Score")
            .ClientTemplate("<div class='progressbar'></div>");
    })
    .ToolBar(t =>
    {
        t.AIAssistant();
        t.Spacer();
        t.Custom().Name("resetChanges").Text("Reset changes").IconClass("k-icon k-i-arrow-rotate-ccw");
    })
    .AI(ai => ai
        .Service("https://demos.telerik.com/service/v2/ai/grid/smart-state")
        .AIAssistant(a => a.PromptSuggestions(new[]
        {
            "Highlight age cells above 60",
            "Mark all rows with critical care admissions after 15th of July 2024",
            "Highlight rows with patients over 65 still under treatment",
            "Highlight rows with patients not in Emergency department",
            "Highlight rows with risk score between 30% and 50%",
            "Clear highlighting"
        }))
        .AIAssistantWindow(ws => ws.Width(500).Height(460))
    )
    .Pageable()
    .Sortable()
    .Filterable()
    .Scrollable(s => s.Height(600))
    .HtmlAttributes(new { style = "height:600px;" })
    .DataSource(ds => ds.Ajax()
        .Read(r => r.Action("Patients_Read", "Grid"))
        .PageSize(20)
        .Model(m => m.Id(x => x.Id))
    )
    .Events(e => e.DataBound("onGridDataBound"))
)
```
{% if site.core %}
```TagHelper
<kendo-grid name="grid" height="550" on-data-bound="onGridDataBound">
    <datasource type="DataSourceTagHelperType.Ajax" page-size="10">
        <transport>
            <read url="@Url.Action("Finance_Read", "Grid")" />
        </transport>
        <schema>
            <model id="Id"></model>
        </schema>
    </datasource>

    <columns>
        <column field="CustomerName" title="Customer Name" min-resizable-width="120" />

        <column field="Amount" title="Amount" width="140" format="{0:n}"
                template="# var cls = 'k-text-right'; if (Amount < 0) { cls = 'k-text-right k-font-weight-bold'; } #
                          <div class='#= cls #'>#= kendo.toString(Amount, 'n') #</div>" />

        <column field="Fee" title="Fee" width="80" format="{0:n}"
                template="<div class='k-text-right'>#= kendo.toString(Fee, 'n') #</div>" />

        <column field="Currency" title="Currency" width="100" />

        <column field="Status" title="Status" width="120"
                template="<span class='status-chip'></span>" />

        <column field="TransType" title="Trans Type" width="140" />

        <column field="AccountType" title="Account Type" width="120"
                template="<span class='account-chip'></span>" />

        <column field="TransDate" title="Trans Date" width="120" format="{0:dd-MM-yy}" />
        <column field="Description" title="Description" width="180" />
        <column field="Region" title="Region" width="100" />
    </columns>

    <toolbar>
        <toolbar-button name="aiAssistant"></toolbar-button>
        <toolbar-button name="spacer" type="spacer" />
        <toolbar-button name="resetChanges"
                        text="Reset changes"
                        icon-class="k-icon k-i-arrow-rotate-ccw">
        </toolbar-button>
    </toolbar>

    <sortable enabled="true" allow-unsort="true" show-indexes="true" mode="mixed" />
    <filterable enabled="true" />
    <groupable enabled="true" />
    <pageable enabled="true" />
    <scrollable enabled="true" />

    <ai>
        <service url="https://demos.telerik.com/service/v2/ai/grid/smart-state" />
        <ai-assistant prompt-suggestions='new[] {
                              "Sort by Amount descending",
                              "Group by account type",
                              "Show only failed transactions",
                              "Filter where currency is USD",
                              "Display withdrawals over 800 after 15th September 2024",
                              "Clear filtering",
                              "Clear grouping"
                          }'>
        </ai-assistant>
        <ai-assistant-window width="558"></ai-assistant-window>
    </ai>

</kendo-grid>
```
{% endif %}

With automatic integration, the Grid is configured to work directly with your AI service. If the service returns the correct descriptors, the Grid can automatically interpret and apply the requested operations, enabling seamless setup and usage without additional manual configuration.

The examples below represent sample responses for the basic data operations:

- Filtering&mdash;Accepts an object with filter conditions and logic operators.

  ```JSON
  {
    "filter": {
      "logic": "and",
      "filters": [
        {
          "field": "Currency",
          "operator": "eq",
          "value": "USD"
        }
      ]
    },
    "messages": [
      "Filtered by the field Currency with the value equal to USD"
    ]
  }
  ```

- Sorting&mdash;Accepts an array of objects specifying field names and sort directions.

  ```JSON
  {
    "sort": [
      {
        "field": "Amount",
        "dir": "desc"
      }
    ],
    "messages": [
      "Sorted by the field Amount in descending order."
    ]
  }
  ```

- Grouping&mdash;Accepts an array of objects defining the fields to group by.

  ```JSON
  {
    "group": [
      {
        "field": "AccountType",
        "dir": "desc"
      }
    ],
    "messages": [
      "Grouped by the field AccountType in descending order."
    ]
  }
  ```

### Manual Integration

For full control over the AI interaction, you can manually integrate your AI service by handling the `PromptRequest` event of the tool. This allows you to perform entirely custom requests to your AI service while using the UI that the AI Assistant provides.

The `PromptRequest` event provides useful information that you can use in your custom AI service integration. The `requestData` field of the event contains the user's prompt, Grid column information, and HTTP request settings, while `isRetry` indicates whether this is a retry attempt. 

When the response from the service is received, you can utilize the `PromptResponse` event and handle the returned data.

In the AI Assistant configuration, you can handle all events provided by the integrated AIPrompt component. 

These event details allow you to implement fully customized AI service communication while maintaining access to the Grid context and user input.

## Customization Options

The AI Assistant toolbar tool provides various configuration options to customize the experience based on your application requirements:

- [AIPrompt customization](#aiprompt-customization)
- [Window appearance](#window-appearance)

### AIPrompt Customization

The AI Assistant toolbar tool utilizes the AIPrompt component internally to provide a conversational interface. You can customize the AIPrompt interface and user interaction by using the AI Assistant property of the tool.

This property allows you to add PromptSuggestions tailored to your specific use case that can guide users with examples of what your AI service can understand. Furthermore, the `SpeechToTextButton` setting provides voice input capabilities for enhancing accessibility in your application.

```HtmlHelper
    .AI(ai => ai
        .Service("https://demos.telerik.com/service/v2/ai/grid/smart-state")
        .AIAssistant(a => a.PromptSuggestions(new[]
        {
            "Highlight age cells above 60",
            "Mark all rows with critical care admissions after 15th of July 2024",
            "Highlight rows with patients over 65 still under treatment",
            "Highlight rows with patients not in Emergency department",
            "Highlight rows with risk score between 30% and 50%",
            "Clear highlighting"
        }))
    )
```
{% if site.core %}
```TagHelper
  <ai>
      <service url="https://demos.telerik.com/service/v2/ai/grid/smart-state" />
      <ai-assistant prompt-suggestions='new[] {
          "Sort by Amount descending",
          "Group by account type",
          "Show only failed transactions",
          "Filter where currency is USD",
          "Display withdrawals over 800 after 15th September 2024",
          "Clear filtering",
          "Clear grouping"
      }'>
      </ai-assistant>
  </ai>
```
{% endif %}

### Window Appearance

You can also customize the appearance of the [Window](https://www.telerik.com/{{ site.platform }}/documentation/html-helpers/layout/window/overview) component, in which the AIPrompt of the toolbar tool is rendered. 

To achieve this, use the `AIAssistantWindow` property, which allows you to control the positioning and visual appearance of the Window to match your application's design and requirements.

```HtmlHelper
.AI(ai => ai
    .Service("https://demos.telerik.com/service/v2/ai/grid/smart-state")
    .AIAssistantWindow(ws => ws.Width(500).Height(460))
)
```
{% if site.core %}
```TagHelper
<ai>
    <service url="https://demos.telerik.com/service/v2/ai/grid/smart-state" />
    <ai-assistant-window width="500" height="460"></ai-assistant-window>
</ai>
```
{% endif %}

## Suggested Links

{% if site.core %}
* [ASP.NET Core Grid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [AI Toolbar Assistant of the Grid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/ai-toolbar)
* [AI Row Highlighting by the Grid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/ai-toolbar-highlight)
* [AIPrompt Overview Documentation](https://www.telerik.com/{{ site.platform }}/documentation/html-helpers/conversational-ui/aiprompt/overview)
* [Server-Side API](/api/grid)
