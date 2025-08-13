---
title: Stacked Display Mode
page_title: Stacked Display Mode
description: "Learn how to enable and configure the Stacked Layout mode of the Telerik UI Grid component for {{ site.framework }}."
slug: htmlhelpers_grid_aspnetcore_stacked_layout
position: 27
---

# Stacked Display Mode

The Grid component in {{ site.framework }} supports a Stacked Layout mode that arranges multiple columns in a compact, card-like format. This layout is especially useful where horizontal space is limited (for example, on smaller screens) or when you want to present complex row content in a visually stacked arrangement.

When the Stacked Layout is enabled, the Grid displays its cells in a fixed-width grid arrangement, defined by a set of column widths.

## Enabling Stacked Layout

To activate the stacked layout mode:

1. Set the `DataLayoutMode()` option to `DataLayoutMode.Stacked`.
2. Configure the column widths through the `StackedLayoutSettings()` method by providing an array of values representing the widths of each stacked column.

```HtmlHelper
@(Html.Kendo().Grid<MyViewModel>()
    .Name("grid")
    .DataLayoutMode(DataLayoutMode.Stacked)
    .StackedLayoutSettings(s => s.Cols(320, 120, 120))
    // Grid configuration...
)
```
{% if site.core %}
```TagHelper
<kendo-grid name="grid" layout-mode="DataLayoutMode.Stacked">
    <stacked-layout-settings cols-array="new object[] { 320, 120, 120 }" />
    <!-- Grid configuration... -->
</kendo-grid>
```
{% endif %}

In this example:
- The first stacked column has a width of `320px`.
- The second stacked column has a width of `120px`.
- The third stacked column has a width of `120px`.

## Stacked Layout Settings

The `StackedLayoutSettings` configuration defines how cells are arranged in stacked columns.

| Setting | Description |
|---------|-------------|
| `.Cols(params int[] widths)` | Defines the number and width of stacked columns in pixels. |
| `cols-array` *(TagHelper)* | Accepts an array of values representing the widths of stacked columns. |

## Example

The example below demonstrates a Grid in Stacked Layout mode with template columns and widgets.

```HtmlHelper
@(Html.Kendo().Grid<ProductViewModel>()
    .Name("grid")
    .DataLayoutMode(DataLayoutMode.Stacked)
    .StackedLayoutSettings(s => s.Cols(320, 120, 120))
    .Columns(columns =>
    {
        columns.Bound(p => p.ProductName)
            .ClientTemplate(
                @"<div class='product-photo' style='background-image: url(" + Url.Content("~/images/#:data.ProductID#.jpg") + ");'></div>
                  <div class='product-name'>#: ProductName #</div>");
        columns.Bound(p => p.UnitPrice).Title("Price");
        columns.Bound(p => p.Discontinued).Title("In Stock")
            .ClientTemplate("<span class='badgeTemplate'></span>");
    })
    .Pageable()
    .Sortable()
    .Filterable()
    .AdaptiveMode(AdaptiveMode.Auto)
    .DataSource(ds => ds
        .Ajax()
        .Read("Read", "Grid")
    )
)
```
{% if site.core %}
```TagHelper
<kendo-grid name="grid" layout-mode="DataLayoutMode.Stacked" adaptive-mode="AdaptiveMode.Auto">
    <stacked-layout-settings cols-array="new object[] { 320, 120, 120 }" />
    <columns>
        <column field="ProductName" template="#=productNameTemplate(data)#" />
        <column field="UnitPrice" title="Price" />
        <column field="Discontinued" title="In Stock" template="<span class='badgeTemplate'></span>" />
    </columns>
    <datasource type="DataSourceTagHelperType.Ajax">
        <transport>
            <read url="@Url.Action("Read","Grid")"/>
        </transport>
    </datasource>
</kendo-grid>
```
{% endif %}

## Best Practices

- Balance widths &mdash; Ensure the total width suits your target screen sizes.
- Compact templates &mdash; Rows can become taller; keep item templates concise.
- Use with Adaptive Mode &mdash; Combine with `AdaptiveMode.Auto` for better small-screen UX.
- Test with real data &mdash; Verify widgets (badges, progress bars, etc.) render correctly in the allotted widths.

## See Also

* [Grid Stacked Display Mode (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/stacked-display-mode)
* [Server-Side API of the Grid](/api/grid)
{% if site.core %}
* [Server-Side TagHelper API of the Grid](/api/taghelpers/grid)
{% endif %}
