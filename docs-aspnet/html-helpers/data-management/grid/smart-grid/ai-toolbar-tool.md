---
title: AI Smart Box
description: "Learn how to use the AI Smart Box in the {{ site.framework }} Grid to provide unified search, semantic search, and AI-powered interactions in a single toolbar control."
slug: ai_toolbar_tool_core_grid
position: 3
components: ["grid"]
tag: new
---

# {{ site.framework }} Data Grid AI Smart Box

The [Grid]({% slug htmlhelpers_grid_aspnetcore_overview %}) AI Smart Box is a versatile toolbar tool that unifies search and AI capabilities in a single interface. It offers three distinct modes that you can enable independently or in combination to provide flexible data exploration for your users.

The AI Smart Box allows users to explore Grid data through traditional keyword search, semantic search that understands meaning and context, or AI-powered natural language commands.

For a runnable example demonstrating the Smart Box functionalities, refer to the [AI Smart Box Demo](https://demos.telerik.com/aspnet-core/grid/ai-smartbox).


## Implementation Steps

To configure the Grid's AI Smart Box:

1. Configure the Grid toolbar with the AI Smart Box tool:

```HtmlHelper AI Smart Box Razor
    @(
            Html.Kendo().Grid<EcommerceProduct>()
                    .Name("grid")
                    .ToolBar(toolbar => { toolbar.SmartBox(); })
                    .DataSource(ds => ds.Ajax().Read(r => r.Action("ECommerceProducts_Read", "Grid")))
    )
```
{% if site.core %}
```TagHelper AI Smart Box TagHelper
    @addTagHelper *, Kendo.Mvc
    <kendo-grid name="grid">
        <toolbar>
            <toolbar-button name="smartBox"></toolbar-button>
        </toolbar>
        <data-source>
            <transport>
                <read url="/Grid/ECommerceProducts_Read" />
            </transport>
        </data-source>
    </kendo-grid>
```
{% endif %}

2. Enable the modes you want to show in the AI Smart Box using the `SearchSettings`, `SemanticSearchSettings`, and `SiAssistantSettings` options:

```HtmlHelper
    @(
            Html.Kendo().Grid<EcommerceProduct>()
                    .Name("grid")
                    .ToolBar(toolbar => { toolbar.SmartBox(); })
                    .SmartBox(sb => sb
                            .SearchSettings(s => s.Enabled(true))
                            .SemanticSearchSettings(s => s.Enabled(true))
                            .AiAssistantSettings(a => a.Enabled(true)))
                    .DataSource(ds => ds.Ajax().Read(r => r.Action("ECommerceProducts_Read", "Grid")))
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <kendo-grid name="grid">
        <toolbar>
            <toolbar-button name="smartBox"></toolbar-button>
        </toolbar>
        <smart-box>
            <search-settings enabled="true" />
            <semantic-search-settings enabled="true" />
            <ai-assistant-settings enabled="true" />
        </smart-box>
        <data-source>
            <transport>
                <read url="/Grid/ECommerceProducts_Read" />
            </transport>
        </data-source>
    </kendo-grid>
```
{% endif %}

> Search mode applies filters automatically to the Grid DataSource. You can optionally handle the `search` eventto customize the default search behavior.


3. Configure the `Service.Url` property for AI Assistant mode to point to your AI service endpoint:

```HtmlHelper
    @(
         Html.Kendo().Grid<EcommerceProduct>()
                 .Name("grid")
                 .ToolBar(toolbar => { toolbar.SmartBox(); })
                 .SmartBox(sb => sb.Events(e => e.SemanticSearch("onSemanticSearch"))
                         .SearchSettings(s => s.Enabled(true))
                         .SemanticSearchSettings(ss => ss.Enabled(true))
                         .AiAssistantSettings(ai => ai
                             .Service(s => s.Url("https://demos.telerik.com/service/v2/ai/grid/smart-state")))
                 )
                 .DataSource(ds => ds.Ajax().Read(r => r.Action("ECommerceProducts_Read", "Grid")))
    )
```
{% if site.core %}
```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-grid name="grid">
            <toolbar>
                <toolbar-button name="smartBox"></toolbar-button>
            </toolbar>
            <smart-box>
                <semantic-search-settings enabled="true" />
                <search-settings enabled="true" />
                <ai-assistant-settings>
                    <service url="https://demos.telerik.com/service/v2/ai/grid/smart-state" />
                </ai-assistant-settings>
                <events on-semantic-search="onSemanticSearch" />
            </smart-box>
            <data-source>
                <transport>
                    <read url="/Grid/ECommerceProducts_Read" />
                </transport>
            </data-source>
        </kendo-grid>
```
{% endif %}

> The `Service.Url` defines the endpoint where your natural language queries will be processed. It should point to [your custom AI service](slug:smart_ext_core_grid) that can understand your domain-specific data and business logic. To explore the available integration scenarios, see [AI Assistant Tools Setup](slug:ai_assistant_tools_setup).

4. Handle the `SemanticSearch` event to implement your semantic search logic:

```HtmlHelper
    @(
    Html.Kendo().Grid<EcommerceProduct>()
            .Name("grid")
            .ToolBar(toolbar => { toolbar.SmartBox(); })
            .SmartBox(sb => sb.Events(e => e.SemanticSearch("onSemanticSearch"))
                    .SearchSettings(s => s.Enabled(true))
                    .SemanticSearchSettings(s => s.Enabled(true))
            )
    )
    <script>
            function onSemanticSearch(e) {
                    return performSemanticSearch(e.searchValue);
            }
    </script>
```
{% if site.core %}
```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-grid name="grid">
            <toolbar>
                <toolbar-button name="smartBox"></toolbar-button>
            </toolbar>
            <smart-box>
                <search-settings on-semantic-search="onSemanticSearch" enabled="true" />
                <semantic-search-settings enabled="true" />
            </smart-box>
            <data-source>
                <transport>
                    <read url="/Grid/ECommerceProducts_Read" />
                </transport>
            </data-source>
        </kendo-grid>

        <script>
                function onSemanticSearch(e) {
                        return performSemanticSearch(e.searchValue);
                }
        </script>
```
{% endif %}


## Available Modes

The AI Smart Box provides three modes that you can enable independently or in combination. Each mode serves different use cases and offers specific configuration options.

<TabStrip>
<TabStripTab title="Search Mode">

The Search mode is enabled by default in the AI Smart Box and provides traditional keyword-based filtering across Grid columns. As users type, the AI Smart Box generates filter expressions that match the search value against the Grid columns. Use the `SearchSettings` option to further tailor the Search mode to your specific needs.

By default, the Grid automatically applies the search filter to the DataSource. You can optionally handle the `Search` option to customize the search behavior.

```HtmlHelper
    @(
        Html.Kendo().Grid<EcommerceProduct>()
            .Name("grid")
            .ToolBar(toolbar => { toolbar.SmartBox(); })
            .Search(s => s.Fields(f => f.Field("name").Field("description").Field("category").Field("countryOfOrigin")))
            .SmartBox(sb => sb
                .SearchSettings(ss => ss.Enabled(true).History(true)))
    )
```
{% if site.core %}
```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-grid name="grid">
            <toolbar>
                <toolbar-button name="smartBox"></toolbar-button>
            </toolbar>
            <smart-box>
                <search-settings enabled="true" />
            </smart-box>
        </kendo-grid>

```
{% endif %}



> For more details about Search mode configuration, see the [Grid Searching]({% slug htmlhelpers_grid_aspnetcore_searchpanel %}) article.

</TabStripTab>
<TabStripTab title="Semantic Search Mode">

Configure the `SemanticSearchMode` option of the AI Smart Box to enable semantic search functionality that interprets user intent and matches related terms, synonyms, and contextual meanings. This intelligent matching is particularly valuable when users might not know the exact terminology used in your Grid data.

When users enter a search term, handle the `SemanticSearch` event to implement your semantic matching logic using vector embeddings or other techniques to find conceptually related content.

```HtmlHelper
    @(
        Html.Kendo().Grid<EcommerceProduct>()
            .Name("grid")
            .ToolBar(toolbar => { toolbar.SmartBox(); })
            .SmartBox(sb => sb.Events(e => e.SemanticSearch("onSemanticSearch"))
                .SemanticSearchSettings(s => s
                    .Enabled(true))
            )
    )
```
{% if site.core %}
```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-grid name="grid">
            <toolbar>
                <toolbar-button name="smartBox"></toolbar-button>
            </toolbar>
            <smart-box>
                <search-settings on-semantic-search="onSemanticSearch" enabled="true" />
                <semantic-search-settings enabled="true" />
            </smart-box>
        </kendo-grid>

```
{% endif %}

> For more information about implementing semantic search in the AI Smart Box, see the [Semantic Search](slug:smartbox_semantic_search_mode) article.

</TabStripTab>
<TabStripTab title="AI Assistant Mode">

Use the `AiAssistant` option to enable AI Assistant mode, which allows users to interact with the Grid data through natural language commands. Users can apply any supported Grid operation&mdash;including filtering, sorting, column management, data export, and row highlighting.

Configure the AI Assistant mode behavior through the configuration object. You can guide users with predefined prompts using the `PromptSuggestions` option and enable automatic communication with your custom AI service by setting the `Request.Url` option.

```HtmlHelper
    @(
        Html.Kendo().Grid<EcommerceProduct>()
            .Name("grid")
            .ToolBar(toolbar => { toolbar.SmartBox();})
            .SmartBox(sb => sb
                .AiAssistantSettings(a => a
                    .Enabled(true)
                    .Service(s => s.Url("https://demos.telerik.com/service/v2/ai/grid/smart-state"))
                    .PromptSuggestions(new[] {
                        "Show top customers by revenue",
                        "Filter active accounts",
                        "Group by region"
                    })))
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
      <toolbar>
        <toolbar-button name="smartBox"></toolbar-button>
      </toolbar>

      <smart-box>
        <ai-assistant-settings>
          <service url="https://demos.telerik.com/service/v2/ai/grid/smart-state" />
        </ai-assistant-settings>
      </smart-box>
    </kendo-grid>
```
{% endif %}

> For more information about configuring AI Assistant mode and available integration options, see the [AI Assistant Tools Setup](slug:ai_assistant_tools_setup) article. To understand how to set up your custom AI service, see the [AI Service Setup](slug:smart_ext_core_grid) article.

</TabStripTab>
</TabStrip>

## Setting the Active Mode

When you enable multiple modes in the AI Smart Box, users can choose their preferred interaction method by using the seamless mode-switching interface of the tool.

By default, the Search mode is initially selected when users open the AI Smart Box tool. You can customize this behavior and manually specify the mode that should be initially selected by using the `ActiveMode` option:

```Razor
@(
    Html.Kendo().Grid<EcommerceProduct>()
        .Name("grid")
        .ToolBar(toolbar => { toolbar.SmartBox(); })
        .SmartBox(sb => sb
            .ActiveMode("aiAssistant")
            .SearchSettings(s => s.Enabled(true))
            .SemanticSearchSettings(s => s.Enabled(true))
            .AiAssistantSettings(a => a.Enabled(true)
                .Service(s => s.Url("https://demos.telerik.com/service/v2/ai/grid/smart-state"))))
        .DataSource(ds => ds.Ajax().Read(r => r.Action("ECommerceProducts_Read", "Grid")))
)
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
      <smart-box active-mode="aiAssistant">
        <search-settings enabled="true" />
        <semantic-search-settings enabled="true" />
        <ai-assistant-settings>
          <service url="https://demos.telerik.com/service/v2/ai/grid/smart-state" />
        </ai-assistant-settings>
      </smart-box>
    </kendo-grid>
```
{% endif %}

## Customization Options

The AI Smart Box provides several customization options to tailor the appearance and behavior of the tool to your application's needs. You can configure [placeholder text](#placeholder-text), [query history settings](#query-history), and customize the appearance of [suggestions](#suggestion-template) and [history items](#history-item-template) using template directives.

### Placeholder Text

The AI Smart Box allows you to customize the placeholder text that appears in the input field for each mode.

You can define a global placeholder for all modes through the `Placeholder` option of the AI Smart Box tool:

```Razor
@(
    Html.Kendo().Grid<EcommerceProduct>()
        .Name("grid")
        .ToolBar(toolbar => { toolbar.SmartBox(); })
        .SmartBox(sb => sb.Placeholder("Search or ask..."))
)
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
      <toolbar>
        <toolbar-button name="smartBox"></toolbar-button>
      </toolbar>

      <smart-box placeholder="Search or ask..." />
```
{% endif %}

>tip To override the global placeholder for individual modes, set the `placeholder` property within the settings object of the respective AI Smart Box mode. For example, to customize the placeholder for the Semantic Search mode, see [Semantic Search Placeholder Text](slug:smartbox_semantic_search_mode#placeholder-text).

### Query History

The AI Smart Box maintains a history of recent queries for each enabled mode, allowing users to quickly reuse previous searches or commands.

You can configure global history behavior through the `History` option of the AI Smart Box tool, which applies to all modes unless a mode provides its own history settings. The default global history size is `5` queries, and the default timestamp format is `'HH:mm:ss'`.

```Razor
@(
    Html.Kendo().Grid<EcommerceProduct>()
        .Name("grid")
        .ToolBar(toolbar => { toolbar.SmartBox(); })
        .SmartBox(sb => sb.SearchSettings(s => s.Enabled(true).History(h => h.Size(5).TimestampFormat("h:mm a"))))
        .DataSource(ds => ds.Ajax().Read(r => r.Action("ECommerceProducts_Read", "Grid")))
)
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
      <toolbar>
        <toolbar-button name="smartBox"></toolbar-button>
      </toolbar>

      <smart-box>
        <search-settings enabled="true">
          <history size="5" timestamp-format="h:mm a" />
        </search-settings>
      </smart-box>
    </kendo-grid>
```
{% endif %}

>tip For mode-specific history configuration, set the `history` property within the settings object of the respective AI Smart Box mode. For example, to configure the history settings for the Semantic Search mode, see [Semantic Search Query History](slug:smartbox_semantic_search_mode#query-history).

### Suggestion Template

The AI Smart Box provides a `SuggestionTemplate` option to customize the appearance of prompt suggestions in AI Assistant mode. The template provides access to the `Suggestion` field, allowing you to add icons, styling, or additional markup.

```Razor
@(
    Html.Kendo().Grid<EcommerceProduct>()
        .Name("grid")
        .ToolBar(toolbar => { toolbar.SmartBox(); })
        .SmartBox(sb => sb
            .AiAssistantSettings(a => a
                .Enabled(true)
                .Service(s => s.Url("https://demos.telerik.com/service/v2/ai/grid/smart-state"))
                .PromptSuggestions(new[] {
                    "Show top customers by revenue",
                    "Filter active accounts",
                    "Group by region"
                })
                .SuggestionTemplate("<div class='custom-suggestion'><span class='k-icon k-i-sparkles'></span><span>#= suggestion #</span></div>")))
)
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
      <toolbar>
        <toolbar-button name="smartBox"></toolbar-button>
      </toolbar>

      <smart-box>
        <ai-assistant-settings>
          <service url="https://demos.telerik.com/service/v2/ai/grid/smart-state" />
          <prompt-suggestions>
            <suggestion>Show top customers by revenue</suggestion>
            <suggestion>Filter active accounts</suggestion>
            <suggestion>Group by region</suggestion>
          </prompt-suggestions>
          <suggestion-template>
            <div class='custom-suggestion'><span class='k-icon k-i-sparkles'></span><span>#= suggestion #</span></div>
          </suggestion-template>
        </ai-assistant-settings>
      </smart-box>
    </kendo-grid>
```
{% endif %}

### History Item Template

You can use the `HistoryItemTemplate` option to customize the content of history items and format how previous queries are displayed. This template applies to all modes that have history enabled and provides access to the `Text`, `Timestamp`, and `TimestampFormat` fields.

```Razor
@(
    Html.Kendo().Grid<EcommerceProduct>()
        .Name("grid")
        .ToolBar(toolbar => { toolbar.SmartBox(); })
        .SmartBox(sb => sb
            .AiAssistantSettings(a => a
                .Enabled(true)
                .Service(s => s.Url("https://demos.telerik.com/service/v2/ai/grid/smart-state"))
                .HistoryItemTemplate("<div class='custom-history-item'><span class='history-text'>#= text #</span><span class='history-time'>#= kendo.toString(timestamp, timestampFormat) #</span></div>")))
        .DataSource(ds => ds.Ajax().Read(r => r.Action("ECommerceProducts_Read", "Grid")))
)
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
      <toolbar>
        <toolbar-button name="smartBox"></toolbar-button>
      </toolbar>

      <smart-box>
        <ai-assistant-settings>
          <service url="https://demos.telerik.com/service/v2/ai/grid/smart-state" />
          <history-item-template>
            <div class='custom-history-item'>
                <span class='history-text'>#= text #</span>
                <span class='history-time'>#= kendo.toString(timestamp, timestampFormat) #</span>
            </div>
          </history-item-template>
        </ai-assistant-settings>
      </smart-box>
    </kendo-grid>
```
{% endif %}

## Suggested Links

* [Semantic Search Mode](slug:smartbox_semantic_search_mode)
* [Grid Searching]({% slug htmlhelpers_grid_aspnetcore_searchpanel %})
* [AI Assistant Tools Setup](slug:ai_assistant_tools_setup)
* [AI Service Setup](slug:smart_ext_core_grid)
* [Smart Grid Overview](slug:overview_smart_grid)
* [Grid Configuring the ToolBar]({% slug htmlhelpers_grid_aspnetcore_toolbar %})
* [API Reference of the Grid](/api/grid)
