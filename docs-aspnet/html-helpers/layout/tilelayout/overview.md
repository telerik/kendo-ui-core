---
title: Overview
page_title: Telerik UI TileLayout component for {{ site.framework }} Overview 
description: "Get started with the {{ site.framework }} TileLayout and learn about its features and how to initialize the component."
slug: htmlhelpers_aspnet_tilelayout_overview
position: 1
---

# {{ site.framework }} TileLayout Overview

{% if site.core %}
The Telerik UI TileLayout TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI TileLayout widget.
{% else %}
The Telerik UI TileLayout HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI TileLayout widget.
{% endif %}

The TileLayout widget allows you configure a two-dimensional grid-based sandbox surface to display content in tiles which can be dragged around and rearranged to create any modern page design.

It is based on the [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)(with all its features) which covers the majority of cases and uses additional JavaScript logic to provide resizing, reordering and templates customizations.

* [Demo page for the TileLayout HtmlHelper](https://demos.telerik.com/{{ site.platform }}/tilelayout/index)
{% if site.core %}
* [Demo page for the TileLayout TagHelper](https://demos.telerik.com/{{ site.platform }}/tilelayout/taghelper) 
{% endif %}

## Initializing the Tile Layout

To initialize the Tile Layout, specify the number of [`Columns()`](/api/Kendo.Mvc.UI.Fluent/TileLayoutBuilder#columnssystemdouble) at root level and use the [`RowSpan()`](/api/Kendo.Mvc.UI.Fluent/TileLayoutContainerBuilder#rowspansystemdouble) and [`ColSpan()`](/api/Kendo.Mvc.UI.Fluent/TileLayoutContainerBuilder#colspansystemdouble) of the containers to position the content in the available grid space.

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

The Telerik UI TileLayout for {{ site.framework }} available grid space is defined by using the [`Columns()`](/api/Kendo.Mvc.UI.Fluent/TileLayoutBuilder#columnssystemdouble) method. The number of rows in which the tiles will be displayed will automatically adjust. The columns and rows have a default width of `1fr` which can be modified by using the [`ColumnsWidth()`](/api/Kendo.Mvc.UI.Fluent/TileLayoutBuilder#columnswidthsystemstring) and [`RowsHeight()`](/api/Kendo.Mvc.UI.Fluent/TileLayoutBuilder#rowsheightsystemstring) methods.

> The `RowsHeight()` and `ColumnsWidth()` methods parameter value sets the maximum height/width the rows or columns of the widget will stretch to. Dependent on resizing, content and user interactions with the layout, they may be less than the set value.

## Tile Layout configuration

Each tile can span across several rows and columns. The space that the tile takes up is determined by its container [`RowSpan()`](/api/Kendo.Mvc.UI.Fluent/TileLayoutContainerBuilder#rowspansystemdouble) and [`ColSpan()`](/api/Kendo.Mvc.UI.Fluent/TileLayoutContainerBuilder#colspansystemdouble). For more information about the containers and their configurable properties, see the [containers]({% slug htmlhelpers_aspnet_tilelayout_containers %}) article.

## Gaps

The grid lines between the rows and columns can be configured by specifying the [`Gap.Columns`](/api/Kendo.Mvc.UI.Fluent/TileLayoutGapSettingsBuilder#columnssystemdouble) for the vertical space between the tiles and the [`Gap.Rows`](/api/Kendo.Mvc.UI.Fluent/TileLayoutGapSettingsBuilder#rowssystemdouble) for the horizontal spacing.

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

## Referencing Existing Instances

To get a reference to an existing TileLayout instance:

1. Use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method.
1. Once a reference is established, use the [TileLayout API](https://docs.telerik.com/kendo-ui/api/javascript/ui/tilelayout) to control its behavior.

        var tilelayout = $("#tilelayout").data("kendoTileLayout");

## Functionality and Features

* [Resizing]({% slug htmlhelpers_aspnet_tilelayout_resizing %})
* [Reordering]({% slug htmlhelpers_aspnet_tilelayout_reordering %})
* [Containers]({% slug htmlhelpers_aspnet_tilelayout_containers %})

## Known Limitations

Currently, the component is not supported in Internet Explorer as the browser does not support gutters.

## See Also

* [Basic Usage of the Tile Layout HtmlHelper (Demo)](https://demos.telerik.com/{{ site.platform }}/tilelayout/index)
{% if site.core %}
* [Basic Usage of the Tile Layout TagHelper(Demo)](https://demos.telerik.com/{{ site.platform }}/tilelayout/index)
{% endif %}
* [API Reference of the TileLayout](/api/tilelayout)
