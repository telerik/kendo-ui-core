---
title: Custom AI Column
description: "Learn how to integrate the InlineAIPrompt component in the Telerik UI for Grid to interact with your data using natural language prompts."
components: ["grid"]
slug: custom_ai_column_core_grid
position: 2
---


# Custom AI Column

The Telerik UI Grid can be enhanced with a custom AI-powered column that provides personalized insights, summaries, and explanations for individual rows. By integrating the InlineAIPrompt component into a custom column, users can interact with AI directly from each row, asking questions and receiving contextual responses.

> The example in this article uses a Telerik-hosted AI service for demonstration purposes only. For production applications, implement your own AI service tailored to your domain, data, and business requirements.


## 1. Set Up the Grid 

Start by defining your Grid and its columns, including a column for AI assistance and a column to display the AI-generated info.

```HtmlHelper
@(Html.Kendo().Grid<PatientRecord>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Template(
            Html.Kendo().Template()
                .AddHtml("<div class='ai-tool-cell'>")
                .AddComponent(btn => btn.Button()
                    .Name("ai-btn_${data.Id}")
                    .Icon("sparkles")
                    .FillMode(ButtonFillMode.Flat)
                    .Rounded(Rounded.Medium)
                    .Size(ComponentSize.Small)
                    .Events(ev => ev.Click("onAiClick"))
                )
                .AddComponent(ai => ai.InlineAIPrompt()
                    .Name("inlineAi_${data.Id}")
                    .Placeholder("Type your prompt here...")
                    .SpeechToText(true)
                    .Readonly(false)
                    .Popup(p => p.Width(462))
                    .Service(s => s.Url("https://demos.telerik.com/service/v2/ai/completion"))
                    .SystemPrompt("systemPromptHandler")
                    .Commands(commands =>
                    {
                        commands.Add().Id("summarize")
                            .Text("Summarize")
                            .Prompt("summarizeHandler");

                        commands.Add().Id("recommendations")
                            .Text("Recommendations")
                            .Prompt("recommendationsHandler");

                        commands.Add().Id("analyse-condition")
                            .Text("Analyse Condition")
                            .Prompt("analyseHandler");
                    })
                    .OutputActions(actions =>
                    {
                        actions.Copy();
                        actions.Custom()
                            .Text("Insert")
                            .Command("insert")
                            .Icon("insert-bottom")
                            .ThemeColor(ThemeColor.Primary)
                            .Title("Insert content");
                        actions.Discard();
                    })
                    .Events(ev => ev.OutputAction("onOutputAction"))
                )
                .AddHtml("</div>")
        )
        .Title("AI")
        .Width(60);

        columns.Bound(p => p.AiAssistedInfo)
            .Title("AI Assisted Info")
            .ClientTemplate("#= AiAssistedInfo ? AiAssistedInfo : '<em>No AI assistance yet</em>' #")
            .Width(250);

        columns.Bound(p => p.PatientName).Title("Patient Name").Width(150);
        columns.Bound(p => p.Diagnosis).Title("Diagnosis").Width(180);
        columns.Bound(p => p.TreatmentPlanStatus)
            .Title("Treatment Plan Status")
            .ClientTemplate("<span class='treatment-chip'></span>")
            .Width(180);
        columns.Bound(p => p.Medications).Title("Medication Count").Width(120);
        columns.Bound(p => p.RiskIndicators).Title("Risk Indicators").Width(160);
        columns.Bound(p => p.RecentLabResults)
            .Title("Recent Lab Results")
            .ClientTemplate("#= formatLabResults(RecentLabResults) #")
            .Width(220);
    })
    .Pageable()
    .Scrollable()
    .HtmlAttributes(new { style = "height:550px;" })
    .DataSource(ds => ds.Ajax()
        .Read(r => r.Action("Patients_Read", "Grid"))
        .PageSize(15)
        .Model(m =>
        {
            m.Id(x => x.Id);
            m.Field("AiAssistedInfo", typeof(string));
        })
    )
    .Events(e => e.DataBound("onGridDataBound"))
)
```
{% if site.core %}
```TagHelper
<kendo-grid name="grid" height="550" on-data-bound="onGridDataBound">
    <datasource type="DataSourceTagHelperType.Ajax" page-size="15">
        <transport>
            <read url="@Url.Action("Patients_Read", "Grid")" />
        </transport>
        <schema>
            <model id="Id">
                <fields>
                    <field name="AiAssistedInfo" type="string"></field>
                </fields>
            </model>
        </schema>
    </datasource>

    <columns>
        <column title="AI" width="60" template="<button class='ai-tool'></button>" />
        <column field="AiAssistedInfo" title="AI Assisted Info" width="250"
                template="#= AiAssistedInfo ? AiAssistedInfo : '<em>No AI assistance yet</em>' #" />
        <column field="PatientName" title="Patient Name" width="150" />
        <column field="Diagnosis" title="Diagnosis" width="180" />
        <column field="TreatmentPlanStatus" title="Treatment Plan Status" width="180"
                template="<span class='treatment-chip'></span>" />
        <column field="Medications" title="Medication Count" width="120" />
        <column field="RiskIndicators" title="Risk Indicators" width="160" />
        <column field="RecentLabResults" title="Recent Lab Results" width="220"
                template="#= formatLabResults(RecentLabResults) #" />
    </columns>

    <pageable enabled="true" />
    <scrollable enabled="true" />
</kendo-grid>
```
{% endif %}

## 2. Add the AI Button and InlineAIPrompt to Each Row

Use a custom template for the AI column to render a button. When the button is clicked, initialize and display an InlineAIPrompt for that row.

```javascript
        function onGridDataBound(e) {
            var grid = this;
            grid.table.find("tr").each(function () {
                var dataItem = grid.dataItem(this);
                if (!dataItem) return;

                var themeColor = "base";
                var icon = "user";
                if (dataItem.TreatmentPlanStatus) {
                    if (dataItem.TreatmentPlanStatus === "Active") {
                        icon = "pills-solid"; themeColor = "info";
                    } else if (dataItem.TreatmentPlanStatus === "Under Evaluation") {
                        icon = "calculator"; themeColor = "base";
                    } else if (dataItem.TreatmentPlanStatus === "Adjusting") {
                        icon = "chart-line-stacked100"; themeColor = "base";
                    } else if (dataItem.TreatmentPlanStatus === "Stable") {
                        icon = "arrows-no-change"; themeColor = "success";
                    } else {
                        icon = "wallet-solid"; themeColor = "error";
                    }
                    $(this).find(".treatment-chip").kendoChip({
                        label: dataItem.TreatmentPlanStatus,
                        icon: icon,
                        themeColor: themeColor,
                        size: "large"
                    });
                }
            });
        }
```

## 3. Handle AI Output Actions

Configure output actions so users can copy, insert, or discard the AI-generated content. 

In the example, `Insert` is a custom action. When the `Insert` action is triggered, you can update the corresponding row's "AI Assisted Info" field and refresh the Grid.

```
        function onOutputAction(e) {
            if (e.action === "insert") {
                var row = e.sender.element.closest("tr");
                var grid = $("#grid").data("kendoGrid");
                var dataItem = grid.dataItem(row);

                dataItem.set("AiAssistedInfo", e.content);
                grid.refresh();
            }
        }
```

## 4. Customize the InlineAIPrompt

You can further customize the InlineAIPrompt with additional commands, output actions, popup settings, and speech-to-text support as needed for your scenario.

```HtmlHelper
                .AddComponent(ai => ai.InlineAIPrompt()
                    .Name("inlineAi_${data.Id}")
                    .Placeholder("Type your prompt here...")
                    .SpeechToText(true)
                    .Readonly(false)
                    .Popup(p => p.Width(462))
                    .Service(s => s.Url("https://demos.telerik.com/service/v2/ai/completion"))
                    .SystemPrompt("systemPromptHandler")
                    .Commands(commands =>
                    {
                        commands.Add().Id("summarize")
                            .Text("Summarize")
                            .Prompt("summarizeHandler");

                        commands.Add().Id("recommendations")
                            .Text("Recommendations")
                            .Prompt("recommendationsHandler");

                        commands.Add().Id("analyse-condition")
                            .Text("Analyse Condition")
                            .Prompt("analyseHandler");
                    })
                    .OutputActions(actions =>
                    {
                        actions.Copy();
                        actions.Custom()
                            .Text("Insert")
                            .Command("insert")
                            .Icon("insert-bottom")
                            .ThemeColor(ThemeColor.Primary)
                            .Title("Insert content");
                        actions.Discard();
                    })
                    .Events(ev => ev.OutputAction("onOutputAction"))
                )
```
{% if site.core %}
```TagHelper
                var inline = $('#inline').kendoInlineAIPrompt({
                    systemPrompt: (context, prompt) => `${prompt}: ${JSON.stringify(dataItem)}`,
                    placeholder: "Type your prompt here...",
                    commands: [
                        {
                          id: "summarize",
                          text: "Summarize",
                          prompt: () => `Summarize the following data: ${JSON.stringify(dataItem)}\nRespond with an answer in 1-2 sentences.`
                        },
                        {
                          id: "recommendations",
                          text: "Recommendations",
                          prompt: () => `Provide recommendations based on the following data: ${JSON.stringify(dataItem)}\nRespond with an answer in 1-2 sentences.`
                        },
                        {
                          id: "analyse-condition",
                          text: "Analyse Condition",
                          prompt: () => `Analyze condition based on the following data: ${JSON.stringify(dataItem)}\nRespond with an answer in 1-2 sentences.`
                        }
                    ],
                    outputActions: [
                        'copy',
                        {
                            id: 'insert',
                            command: 'insert',
                            text: 'Insert',
                            icon: 'insert-bottom',
                            themeColor: 'primary',
                            title: 'Insert content'
                        },
                        'discard'
                    ],
                    outputAction: function(e) {
                        if (e.action === "insert") {
                            var grid = $("#grid").data("kendoGrid");
                            var currentRow = e.sender.element.closest('tr');

                            $('#inline').data('kendoInlineAIPrompt').destroy();
                            $('#inline').remove();

                            var dataItem = grid.dataItem(currentRow);
                            dataItem.set("AiAssistedInfo", e.content); 
                            grid.refresh();
                        }
                    },
                    popup: {
                        width: "462px",
                        placeholder: "Ask for AI assistance about this record",
                        position: "bottom right"
                    },
                    speechToText: true,
                    readonly: false,
                    service: {
                        url: "https://demos.telerik.com/service/v2/ai/completion",
                    },
                }).data("kendoInlineAIPrompt");
```
{% endif %}

## Suggested Links

* [Grid AI Assistant - Custom Column (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/ai-custom-column)
* [Telerik Grid Overview Documentation](https://www.telerik.com/{{ site.platform }}/documentation/html-helpers/data-management/grid/overview)
