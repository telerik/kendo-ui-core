---
title: Search Panel
page_title: Search Panel
description: "Learn how to enable the searching functionality of the Telerik UI Grid for {{ site.framework }}."
components: ["grid"]
slug: htmlhelpers_grid_aspnetcore_searchpanel
previous_url: /helpers/html-helpers/grid/features/searching, /html-helpers/data-management/grid/features/searching
position: 13
---

# Search Panel

The Grid component has built-in search functionality that you can use through either the SmartBox Search mode or the Search Panel in the toolbar. Both options rely on Grid filtering to show only the relevant records.

## SmartBox Search

The Grid search functionality is available in the [AI Smart Box](slug:ai_toolbar_tool_core_grid). The Smart Box Search mode uses the same Grid `Search` configuration, including `Search.fields` and field operators.

To enable it, add the Smart Box tool to the Grid toolbar and configure the `SmartBox.SearchSettings` option.

```HtmlHelper
    @(Html.Kendo().Grid<CustomerViewModel>()
        .Name("grid")
        .ToolBar(toolbar => toolbar.SmartBox())
        .Search(search =>
        {
            search.Field(c => c.ContactName, "contains");
            search.Field(c => c.Age, "eq");
        })
        .SmartBox(sb => sb
            .ActiveMode(SmartBoxActiveMode.Search)
            .SearchSettings(s => s.Enabled(true))
        )
        ...
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid">
        <toolbar>
            <toolbar-button name="smartBox"></toolbar-button>
        </toolbar>
        <search fields-extended="@(new object[]
        {
            new { Name = "ContactName", Operator = "contains" },
            new { Name = "Age", Operator = "eq" }
        })">
        </search>
        <smart-box active-mode="SmartBoxActiveMode.Search">
            <search-settings enabled="true"></search-settings>
        </smart-box>
        ...
    </kendo-grid>
```
{% endif %}

For additional Smart Box search capabilities, such as Semantic Search mode, refer to [Semantic Search](slug:smartbox_semantic_search_mode).

## Search Panel

> Search Panel functionality is available as of [Kendo UI R3 2019](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-r3-2019) release.

### Getting Started

To enable the functionality, include the `Search` option in the toolbar configuration.

You can also customize which fields are searched when users enter a value in the search input.

```HtmlHelper
    @(Html.Kendo().Grid<CustomerViewModel>()
        .Name("grid")
        .ToolBar(t => t.Search())
        .Search(s =>
        {
            s.Field(c => c.ContactTitle);
        })
        ...
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid">
        <toolbar>
            <toolbar-button name="search"></toolbar-button>
        </toolbar>
        <search fields="@(new string[] { "ContactTitle" })"></search>
        ...
    </kendo-grid>
```
{% endif %}

## Specify the Filter Operator

As of Kendo UI 2021 R3 SP1, you can specify filter operators for each filter type. With this update, you can filter non-string types.

The following example demonstrates how to specify which fields to include in the search.

```HtmlHelper
    @(Html.Kendo().Grid<CustomerViewModel>()
        .Name("grid")
        .ToolBar(t => t.Search())
        .Search(s =>
        {
            s.Field(c => c.ContactName);
            s.Field(c => c.Age);
        })
        ...
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid">
        <toolbar>
            <toolbar-button name="search"></toolbar-button>
        </toolbar>
        <search fields="@(new string[] { "ContactName", "Age" })"></search>
        ...
    </kendo-grid>
```
{% endif %}

The following example demonstrates how to specify the operator for the field that will be used in the filter expression.

```HtmlHelper
    @(Html.Kendo().Grid<CustomerViewModel>()
        .Name("grid")
        .ToolBar(t => t.Search())
        .Search(s =>
        {
            s.Field(c => c.ContactName, "contains");
            s.Field(c => c.Age, "eq");
        })
        ...
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid">
        <toolbar>
            <toolbar-button name="search"></toolbar-button>
        </toolbar>
        <search fields-extended="@(new object[]
        {
            new { Name = "ContactName", Operator = "contains" },
            new { Name = "Age", Operator = "eq" }
        })">
        </search>
        ...
    </kendo-grid>
```
{% endif %}

## Known Limitations

* When filtering is enabled, the filter textboxes for all Grid columns will be populated with the value entered in the search textbox.

## See Also

* [Search Panel in the Telerik UI Grid (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/search-panel)
{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Server-Side API](/api/grid)
* [AI Smart Box](slug:ai_toolbar_tool_core_grid)
* [Smart Grid Overview](slug:overview_smart_grid)
* [Knowledge Base Section](/knowledge-base)
