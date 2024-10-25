---
title: Tile Containers
page_title: The Telerik UI TileLayout component for {{ site.framework }} Documentation - TileLayout Containers
description: "Learn how to define the content and headers of the The Telerik UI TileLayout component for {{ site.framework }} containers."
slug: htmlhelpers_aspnet_tilelayout_containers
position: 4
---

# Layout Containers

The Telerik UI TileLayout for {{ site.framework }} component tiles are configured by using the [`Containers`](/api/kendo.mvc.ui.fluent/tilelayoutbuilder#containerssystemactionkendomvcuifluenttilelayoutcontainerfactory) configurator. 

## Dimensions

Each tile can span across several rows and columns. The space that the tile takes up is determined by its container [`RowSpan()`](/api/kendo.mvc.ui.fluent/tilelayoutcontainerbuilder#rowspansystemdouble) and [`ColSpan()`](/api/kendo.mvc.ui.fluent/tilelayoutcontainerbuilder#colspansystemdouble).

## Headers

The tiles can be configured with our without headers. 

> Headers are required if using the `Reorderable()` functionality of the widget.

The headers render their content via the [`Header.Text()`](/api/kendo.mvc.ui.fluent/tilelayoutcontainerheadersettingsbuilder#textsystemstring) which is plain text or by utilizing a [`Header.Template()`](/api/kendo.mvc.ui.fluent/tilelayoutcontainerheadersettingsbuilder#templatesystemstring) or [`Header.TemplateId()`](/api/kendo.mvc.ui.fluent/tilelayoutcontainerheadersettingsbuilder#templateidsystemstring).

## Body content

The main tile content is rendered from the [`BodyTemplate()`](/api/kendo.mvc.ui.fluent/tilelayoutcontainerbuilder#bodytemplatesystemstring) that can also be plain text or a complex template with widgets in it. for complex widgets, the [`BodyTemplateId()`](/api/kendo.mvc.ui.fluent/tilelayoutcontainerbuilder#bodytemplateidsystemstring) might be more suitable.

> When using widgets inside the template, their `ToClientTemplate()` method needs to be called.

## Container Styles

The TileLayout exposes an object that allows you to override the following styles:

```
    var tileLayoutStyles = {
        wrapper: "k-widget k-tilelayout",
        item: "k-tilelayout-item k-card",
        itemHeader: "k-tilelayout-item-header k-card-header",
        itemHeaderTitle: "k-card-title",
        itemBody: "k-tilelayout-item-body k-card-body",
        reorderHint: "k-layout-item-hint k-layout-item-hint-reorder",
        resizeHint: "k-layout-item-hint k-layout-item-hint-resize"
    };
```

To override any of the classes, add your own or remove some, insert the new definition before the widget is initialized:

```
    kendo.ui.TileLayout.styles.item = "k-tilelayout-item k-card my-own-class";
```

## See Also

* [Overview of the Tile Layout (Demo)](https://demos.telerik.com/kendo-ui/tilelayout/index)
* [API Reference of the Tile Layout](/api/tilelayout)
* [Resizing]({% slug htmlhelpers_aspnet_tilelayout_resizing %})
* [Reordering]({% slug htmlhelpers_aspnet_tilelayout_reordering %})
