---
title: Overview
page_title: jQuery Charts Documentation | TreeMap Overview
description: "Get started with the jQuery TreeMap by Kendo UI and learn how to create a Kendo UI TreeMap widget and explore its major features."
slug: overview_treemap_widget
position: 1
---

# TreeMap Overview

The TreeMap displays hierarchical data in a traditional tree structure.

TreeMaps also support different rendering types such us Squarified, Vertical, and Horizontal (slice and dice algorithm).

* [Demo page for the TreeMap](https://demos.telerik.com/kendo-ui/treemap/index)

## Basic Configuration

The following example demonstrates how to define a TreeMap by using a selector within `$(document).ready()`.

    $(document).ready(function() {
        $("#treeMap").kendoTreeMap();
    });

The TreeMap applies various colors to its `leaf` items&mdash;the items that have no children. To set the colors, the TreeMap uses the following algorithms:

* If the colors, or the color ranges, are defined with the [`colors`](/api/javascript/dataviz/ui/treemap/configuration/colors) configuration option, the TreeMap uses one color or range of colors for all sibling `leaf` items. The next color or range of colors are used for the next collection of sibling leaf items. When all colors or ranges have been used, the TreeMap starts over from the first one.
* If the colors are defined in the dataSource and a [`colorField`](/api/javascript/dataviz/ui/treemap/configuration/colorfield) is set, the TreeMap applies the colors from the data.

You can also combine the two methods&mdash;in this case, the colors from the dataSource take precedence and the TreeMap uses the colors from the `colors` setting only for items which have no defined color in the data.

To set different colors to sibling `leaf` items without having the colors in the data, use the [`itemCreated`](/api/javascript/dataviz/ui/treemap/events/itemcreated) or the [`dataBound`](/api/javascript/dataviz/ui/treemap/events/databound) event of the TreeMap.

## Functionality and Features

The TreeMap provides options for [binding it to data]({% slug databinding_treemap_widget %}).

## Referencing Existing Instances

You can refer an existing TreeMap instance by using [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference is established, use the [TreeMap API](/api/javascript/dataviz/ui/treemap) to control its behavior.

    var treeMap = $("#treeMap").data("kendoTreeMap");

## See Also

* [Basic Usage of the TreeMap (Demo)](https://demos.telerik.com/kendo-ui/treemap/index)
* [JavaScript API Reference of the TreeMap](/api/javascript/dataviz/ui/treemap)
