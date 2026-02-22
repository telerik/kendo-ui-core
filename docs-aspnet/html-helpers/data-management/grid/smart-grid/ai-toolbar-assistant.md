---
title: AI Toolbar Assistant
description: "Learn how to use the AI Assistant Toolbar Tool in the Telerik UI for Grid for {{ site.framework }} to interact with your data using natural language prompts."
components: ["grid"]
slug: ai_toolbar_assistant_core_grid
position: 6
---

# Core Data Grid AI Toolbar Assistant

The Telerik UI Grid provides a built-in AI Assistant toolbar tool that allows users to interact with the Grid using natural language prompts. Use this feature to enable your end users to perform complex data operations like sorting, filtering, grouping, and highlighting without having to use the specific UI controls.

The AI Assistant interprets user requests and automatically applies the corresponding Grid operations, making data exploration more intuitive and accessible. The toolbar integrates an [AIPrompt]({% slug htmlhelpers_overview_aiprompt %}) component that enables natural language interaction with your custom AI service.

## AI Assistant Tool Basic Setup

> The desired data operations ([`Filterable`](https://www.telerik.com/{{ site.platform }}/documentation/api/kendo.mvc.ui.fluent/gridbuilder#filterable), [`Sortable`](https://www.telerik.com/{{ site.platform }}/documentation/api/kendo.mvc.ui.fluent/gridbuilder#sortable), [`Groupable`](https://www.telerik.com/{{ site.platform }}/documentation/api/kendo.mvc.ui.fluent/gridbuilder#groupable)) must be enabled for the Grid, so that the AI Assistant can perform them on the Grid data.

To configure the Grid's AI Assistant toolbar tool:

1. Setup data binding in the Grid and enable the required data operations that the AI must control:

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

2. Enable the `AiAssistant()` tool in the [Grid's toolbar](slug:htmlhelpers_grid_aspnetcore_toolbar):

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

## AI Service Communication

The AI Toolbar Assistant supports three main integration approaches for connecting to your AI service:

- [Automatic Integration](slug:ai_assistant_tools_setup#automatic-integration)&mdash;The quickest approach where the Grid handles the communication with your AI service automatically.
- [Controlled Integration](slug:ai_assistant_tools_setup#controlled-integration)&mdash;Automatic AI service communication with request/response customization through event handlers.
- [Manual Integration](slug:ai_assistant_tools_setup#manual-integration)&mdash;Full control over AI service communication while using the built-in toolbar tool UI.

For detailed information about each integration approach, including code examples and best practices, see [Smart Grid AI Assistant Tools Setup](slug:ai_assistant_tools_setup).

## Customization Options

The AI Toolbar Assistant provides various configuration options to customize the experience based on your application requirements:

- [AIPrompt customization](#aiprompt-customization)
- [Window appearance](#window-appearance)

### AIPrompt Customization

The AI Toolbar Assistant utilizes the [AIPrompt](slug:htmlhelpers_overview_aiprompt) component internally to provide conversational interface. You can customize the AIPrompt interface and user interaction by using the `aiPromptSettings` property of the tool.

This property allows you to add [`promptSuggestions`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/ai.aiassistant.promptsuggestions) tailored to your specific use case that can guide users with examples of what your AI service can understand. Furthermore, the [`speechToTextButton`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/ai.aiassistant.speechtotext) setting provides voice input capabilities for enhancing accessibility in your application.

 ```HtmlHelper
     .AIAssistant(aiAsst => aiAsst
            .PromptSuggestions(new[]
            {
                "Sort by Amount descending and highlight only failed transactions",
                "Display 25 items per page",
                "Lock the Amount column",
                "Reorder Account Type to be first",
                "Export to PDF with file name 'report'"
            })
            .PromptTextArea(p => p.Rows(2).Resize(TextAreaResize.Auto).MaxRows(5))
        )
```
{% if site.core %}
```TagHelper
    <ai>
        <ai-assistant prompt-suggestions='new[] {
                     "Sort by Amount descending and highlight only failed transactions",
                     "Display 25 items per page",
                     "Lock the Amount column",
                     "Reorder Account Type to be first",
                     "Export to PDF with file name \"report\""
                 }'>
                 <prompt-text-area rows="2" max-rows="5" resize="TextAreaResize.Auto"></prompt-text-area>
        </ai-assistant>
    </ai>
```
{% endif %}

### Window Appearance

You can also customize the appearance of the [Window](slug:htmlhelpers_window_aspnetcore) component, where the AIPrompt of the toolbar tool is rendered.

To achieve this, use the `AiWindowSettings` property of the `kendoGridAIAssistantTool` directive, which allows you to control the positioning and visual appearance of the Window to match your application's design and requirements.

```HtmlHelper
    .AI(ai => ai
        .AIAssistantWindow(ws => ws.Width(558).Actions(a => a.Minimize().Close()))
    )
```
{% if site.core %}
```TagHelper
    <ai>
        <ai-assistant-window resizable="false" width="558" actions='new[] { "minimize", "close" }'></ai-assistant-window>
    </ai>
```
{% endif %}

## Suggested Links

* [Smart Grid AI Assistant Tools Setup](slug:ai_assistant_tools_setup)
* [AI Service Setup](slug:smart_ext_core_grid)
* [Smart Grid Overview](slug:overview_smart_grid)
* [Grid Configuring the ToolBar](slug:htmlhelpers_grid_aspnetcore_toolbar)
* [AIPrompt Overview](slug:htmlhelpers_overview_aiprompt)
