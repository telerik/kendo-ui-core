---
title: Semantic Search
description: "Learn how to use Semantic Search mode in the AI Smart Box to enable semantic search that interprets user intent and matches related terms and contextual meanings."
slug: smartbox_semantic_search_mode
position: 8
components: ["grid"]
tag: new
---

# {{ site.framework }} Data Grid Semantic Search

The Semantic Search mode of the [AI Smart Box](slug:ai_toolbar_tool_core_grid) interprets user intent and matches related terms, synonyms, and contextual meanings rather than exact keywords. When users enter a search term, your implementation uses semantic matching techniques to return filter criteria that capture semantically related content.


## Semantic Search Implementation

The Semantic Search mode requires an implementation that analyzes query meaning and returns semantically relevant results. Unlike traditional keyword matching that looks for exact text, your semantic search implementation must analyze the intent behind user queries and recognize when different words express the same concept.

Generally, such capabilities rely on machine learning models that understand language patterns and conceptual relationships through natural language processing (NLP) techniques.

The typical workflow is:

1. User enters a search query in natural language.
2. The `SemanticSearch` event of the AI Smart Box fires with the query text.
3. You process the query using your chosen semantic matching technique.
4. Your implementation returns filter criteria based on semantic matching.
5. You apply the filters to the Grid data.

>tip The demo above uses a third-party transformer model to generate vector embeddings that understand semantic relationships in the data. Other approaches include large language models (LLMs), entity recognition, synonym expansion, or hybrid methods that combine multiple techniques.

To implement Semantic Search in the AI Smart Box tool:

1. Add the AI Smart Box tool to your Grid toolbar with Semantic Search mode enabled:

```cshtml
    @(
        Html.Kendo().Grid<EcommerceProduct>()
            .Name("grid")
            .ToolBar(toolbar => { toolbar.SmartBox(); })
            .SmartBox(sb => sb.SemanticSearchSettings(s => s.Enabled(true)))
            .DataSource(ds => ds.Ajax().Read(r => r.Action("ECommerceProducts_Read", "Grid")))
    )
```

{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <kendo-grid name="grid">
        <toolbars>
            <smart-box></smart-box>
        </toolbars>
        <smart-box>
            <semantic-search-settings enabled="true"></semantic-search-settings>
        </smart-box>
    </kendo-grid>
```
{% endif %}

2. Configure additional Semantic Search mode settings if needed:

```cshtml
@(
    Html.Kendo().Grid<EcommerceProduct>()
        .Name("grid")
        .ToolBar(toolbar => { toolbar.SmartBox(); })
        .SmartBox(sb => sb.SemanticSearchSettings(s => s.Enabled(true).History(true)))
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
        <semantic-search-settings enabled="true">
            <history enabled="true" />
        </semantic-search-settings>
    </smart-box>
</kendo-grid>
```
{% endif %}

3. Handle the `SemanticSearch` event to implement your semantic search logic:

```cshtml
@(
    Html.Kendo().Grid<EcommerceProduct>()
        .Name("grid")
        .ToolBar(toolbar => { toolbar.SmartBox(); })
        .SmartBox(sb => sb.Events(e => e.SemanticSearch("onSemanticSearch"))
            .SemanticSearchSettings(s => s
                .Enabled(true)
                .History(true)))
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
            <semantic-search-settings enabled="true" on-semantic-search="onSemanticSearch" />
        </smart-box>
    </kendo-grid>
```
{% endif %}

4. Create a separate service to encapsulate the semantic matching mechanism. In the demo, the `SemanticSearchService` loads the transformer model, converts text into vector embeddings, and provides the cosine similarity calculation to compare vectors.

## Configuration Options

The Semantic Search mode provides the following configuration options to customize its behavior:

* [Typing Delay](#typing-delay)&mdash;Set the debounce time before triggering the search.
* [Placeholder Text](#placeholder-text)&mdash;Provide guidance text in the search input field.
* [Query History](#query-history)&mdash;Enable users to access and reuse previous search queries.

### Typing Delay

You can use the `delay` property to control how long the AI Smart Box waits after the user stops typing before triggering the search. Since the semantic search logic may take time to process, consider using a longer delay to avoid triggering too many searches as users type. The default value is `700` milliseconds.

```cshtml
    @(
        Html.Kendo().Grid<EcommerceProduct>()
            .Name("grid")
            .ToolBar(toolbar => { toolbar.SmartBox(); })
            .SmartBox(sb => sb
                .SemanticSearchSettings(s => s.Delay(300)))
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
            <semantic-search-settings delay="300" />
        </smart-box>
    </kendo-grid>
```
{% endif %}

### Placeholder Text

The `placeholder` property allows you to customize the placeholder text that appears in the AI Smart Box when Semantic Search mode is active. The placeholder text should communicate that this mode understands natural language and concepts, not just exact keywords.

```cshtml
@(
    Html.Kendo().Grid<EcommerceProduct>()
        .Name("grid")
        .ToolBar(toolbar => { toolbar.SmartBox(); })
        .SmartBox(sb => sb
            .SemanticSearchSettings(s => s.Placeholder("Describe what you need...")))
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
        <semantic-search-settings placeholder="Describe what you need..." />
    </smart-box>
</kendo-grid>
```
{% endif %}

### Query History

The `history` property configures query history specifically for Semantic Search mode, allowing users to access and reuse previous searches. The default history size is `5` queries, and the default timestamp format is `'HH:mm:ss'`.

```cshtml
    @(
        Html.Kendo().Grid<EcommerceProduct>()
            .Name("grid")
            .ToolBar(toolbar => { toolbar.SmartBox(); })
            .SmartBox(sb => sb
                .SemanticSearchSettings(s => s.History(true))
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
        <semantic-search-settings>
            <history enabled="true" />
        </semantic-search-settings>
    </smart-box>
</kendo-grid>
```
{% endif %}

## Suggested Links

* [AI Smart Box](slug:ai_toolbar_tool_core_grid)
* [Grid Searching]({% slug htmlhelpers_grid_aspnetcore_searchpanel %})
* [AI Assistant Tools Setup](slug:ai_assistant_tools_setup)
* [Smart Grid Overview](slug:overview_smart_grid)
* [Grid Configuring the ToolBar]({% slug htmlhelpers_grid_aspnetcore_toolbar %})
* [API Reference of the Grid](/api/grid)
