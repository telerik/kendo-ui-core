---
title: Overview
page_title: Telerik UI TileLayout component for {{ site.framework }} Overview 
description: "Learn the basics when working with the Telerik UI TileLayout component for {{ site.framework }}."
slug: htmlhelpers_aspnet_tilelayout_overview
position: 0
---

# {{ site.framework }} TileLayout Overview

{% if site.core %}
The Telerik UI TileLayout TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI TileLayout widget.
{% else %}
The Telerik UI TileLayout HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI TileLayout widget.
{% endif %}

The TileLayout widget allows you to configure a two-dimensional grid-based sandbox surface to display content in tiles which can be dragged around and rearranged to create any modern page design.

The component is based on the [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) (with all its features) which covers the majority of cases and uses additional JavaScript logic to provide resizing, reordering, and templates customizations.

* [Demo page for the TileLayout HtmlHelper](https://demos.telerik.com/{{ site.platform }}/tilelayout/index)
{% if site.core %}
* [Demo page for the TileLayout TagHelper](https://demos.telerik.com/{{ site.platform }}/tilelayout/tag-helper) 
{% endif %}

## Initializing the TileLayout

To initialize the TileLayout, specify the number of [`Columns()`](/api/kendo.mvc.ui.fluent/tilelayoutbuilder#columnssystemdouble) at root level and use the [`RowSpan()`](/api/kendo.mvc.ui.fluent/tilelayoutcontainerbuilder#rowspansystemdouble) and [`ColSpan()`](/api/kendo.mvc.ui.fluent/tilelayoutcontainerbuilder#colspansystemdouble) of the containers to position the content in the available grid space.

The example below will render a grid with two columns which can be resized both vertically and horizontally.


```HtmlHelper
    @(Html.Kendo().TileLayout()
        .Name("tilelayout")
        .Columns(2)
        .RowsHeight("285px")
        .ColumnsWidth("285px")
        .Containers(c => {
            c.Add().Header(h => h.Text("Header One")).BodyTemplate("Body Text One").ColSpan(1).RowSpan(1);
            c.Add().Header(h => h.Text("Header Two")).BodyTemplate("Body Text Two").ColSpan(1).RowSpan(1);
            c.Add().Header(h => h.Text("Header Three")).BodyTemplate("Body Text Three").ColSpan(2).RowSpan(1);
        })
        .Reorderable(true)
        .Resizable(true)
    )
```
{% if site.core %}
```TagHelper
        <kendo-tilelayout name="tilelayout" columns="2" resizable="true" reorderable="true" columns-width="300px" rows-height="300px">
            <containers>
                <container body-template="Template One" col-span="1" row-span="1">
                    <container-header text="One" />
                </container>
                <container body-template="Template Two" col-span="1" row-span="1">
                    <container-header text="Two" />
                </container>
                <container body-template="Template Three" col-span="2" row-span="1">
                    <container-header text="Three" />
                </container>
            </containers>
        </kendo-tilelayout>
```
{% endif %}

## Grid Layout Configuration 

The Telerik UI TileLayout for {{ site.framework }} available grid space is defined by using the [`Columns()`](/api/kendo.mvc.ui.fluent/tilelayoutbuilder#columnssystemdouble) method. The number of rows in which the tiles will be displayed will automatically adjust. The columns and rows have a default width of `1fr` which can be modified by using the [`ColumnsWidth()`](/api/kendo.mvc.ui.fluent/tilelayoutbuilder#columnswidthsystemstring) and [`RowsHeight()`](/api/kendo.mvc.ui.fluent/tilelayoutbuilder#rowsheightsystemstring) methods.

> The `RowsHeight()` and `ColumnsWidth()` methods parameter value sets the maximum height/width the rows or columns of the widget will stretch to. Dependent on resizing, content and user interactions with the layout, they may be less than the set value.

## Tile Layout Configuration

Each tile can fit within multiple rows and columns. The space that the tile takes up is determined by its container's [`RowSpan()`](/api/kendo.mvc.ui.fluent/tilelayoutcontainerbuilder#rowspansystemdouble) and [`ColSpan()`](/api/kendo.mvc.ui.fluent/tilelayoutcontainerbuilder#colspansystemdouble). For more information about the containers and their configurable properties, see the [containers]({% slug htmlhelpers_aspnet_tilelayout_containers %}) article.

## Gaps

The grid lines between the rows and columns can be configured by specifying the [`Gap.Columns`](/api/kendo.mvc.ui.fluent/tilelayoutgapsettingsbuilder#columnssystemdouble) for the vertical space between the tiles and the [`Gap.Rows`](/api/kendo.mvc.ui.fluent/tilelayoutgapsettingsbuilder#rowssystemdouble) for the horizontal spacing.

```HtmlHelper
    .Gap(g=>g.Columns(10).Rows(10))
```
{% if site.core %}
```TagHelper
    <kendo-tilelayout name="tilelayout" columns="2" resizable="true" reorderable="true" columns-width="300px" rows-height="300px">
            <gap rows="10" columns="10" />
```
{% endif %}

These properties are also known as the gutters between the rows/columns.

## Functionality and Features

| Feature | Description |
|---------|-------------|
| [Reordering]({% slug htmlhelpers_aspnet_tilelayout_reordering %}) | You can enable the reordering feature to drag and drop the tile containers. |
| [Resizing]({% slug htmlhelpers_aspnet_tilelayout_resizing %}) | The TileLayout allows you to resize its containers. |
| [Containers]({% slug htmlhelpers_aspnet_tilelayout_containers %}) | You can specify the appearance of the containers. |
| [Add or Remove Tiles]({% slug htmlhelpers_aspnet_tilelayout_add_remove %}) | You can add or remove tiles dynamically. |
| [Events]({% slug tilelayout_events %}) | The TileLayout allows you to handle its events and implement any custom logic. |
| [Keyboard Navigation]({% slug keynav_aspnetcore_tilelayout %}) | The component delivers keyboard shortcuts for faster navigation. |

## Known Limitations

Currently, the component is not supported in Internet Explorer as the browser does not support gutters.

## Next Steps

* [Getting Started with the TileLayout]({% slug tilelayout_getting_started %})
* [Basic Usage of the TileLayout HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tilelayout/index)
{% if site.core %}
* [Basic Usage of the TileLayout TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/tilelayout/taghelper)
{% endif %}

## See Also

* [Using the Events of the TileLayout for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tilelayout/events)
* [Knowledge Base Section](/knowledge-base)
