---
title: Overview
page_title: Overview | Kendo UI TreeMap  
description: "Learn how to create a Kendo UI TreeMap widget and explore its major features."
slug: overview_treemap_widget
position: 1
---

# TreeMap Overview

The [Kendo UI TreeMap widget](http://demos.telerik.com/kendo-ui/treemap/index) displays hierarchical data in a traditional tree structure. It also support different rendering types such us Squarified, Vertical and Horizontal(slise and dice algorithm).

## Getting Started

### Initialize TreeMap

The example below demonstrates how to initialize the TreeMap widget by using a selector within `$(document).ready()`.

###### Example

    $(document).ready(function() {
        $("#treeMap").kendoTreeMap();
    });

## Data Binding

### Bind to Local Data

The example below demonstrates how to create the TreeMap container.

###### Example

    <div id="treeMap"></div>

Initialize the TreeMap and bind it in the way demonstrated below.

###### Example

    $(document).ready(function() {
        $("#treeMap").kendoTreeMap({
            dataSource: {
                data: [{
                    name: "foo",
                    value: 1
                }]
            },
            valueField: "value",
            textField: "name"
        })
    });

### Bind to Remote Data

For detailed information on how to bind the Kendo UI TreeMap to different service end-points, refer to the [hierarchical Data Source API article](/api/framework/hierarchicaldatasource).

### Colors

The TreeMap applies various colors to its `leaf` items. These are the items that have no children.

The following algorithms are used:

* If the colors, or the color ranges, are defined via the [`colors`](/api/javascript/dataviz/ui/treemap#configuration-colors) configuration option, the TreeMap uses one color or range of colors for all sibling `leaf` items. The next color or range of colors are used for the next collection of sibling leaf items. When all colors or ranges have been used, the TreeMap starts over from the first one.
* If the colors are defined in the dataSource and a [`colorField`](/api/javascript/dataviz/ui/treemap#configuration-colorField) is set, the TreeMap applies the colors from the data.

The two methods can be combined. In this case, colors from the dataSource take precedence, and the TreeMap only uses the colors from the `colors` setting for items, which have no color defined in the data.

To set different colors to sibling `leaf` items without having the colors in the data, use the [`itemCreated`](/api/javascript/dataviz/ui/treemap#events-itemCreated) or the [`dataBound`](/api/javascript/dataviz/ui/treemap#events-dataBound) event of the TreeMap.

## Reference

### Existing Instances

You can refer an existing TreeMap widget via [jQuery.data()](http://api.jquery.com/jQuery.data/). Once a reference has been established, use the [TreeMap API](/api/javascript/dataviz/ui/treemap) to control its behavior.

###### Example

    var treeMap = $("#treeMap").data("kendoTreeMap");

## See Also

Other articles on Kendo UI Charts and chart types:

* [Overview of the Chart Widgets]({% slug overview_kendoui_charts_widget %})
* [Data Series Charts]({% slug seriestypeofcharts_widget %})
* [Area Charts]({% slug areacharts_widget %})
* [Bar Charts]({% slug bartypeofcharts_widget %})
* [Bubble Charts]({% slug bubblecharts_widget %})
* [Funnel Charts]({% slug funnelcharts_widget %})
* [Line Charts]({% slug linetypeoscharts_widget %})
* [Pie Charts]({% slug pietypecharts_widget %})
* [Scatter Charts]({% slug scattercharts_widget %})
* [Sparklines]({% slug overview_kendoui_sparklinescharts %})
* [Stock Charts]({% slug overview_kendoui_stockcharts %})
* [TreeMap JavaScript API Reference](/api/javascript/dataviz/ui/treemap)
