---
title: Bar Charts
page_title: Bar Charts | Kendo UI Charts
description: "Learn how to set the properties of Kendo UI Bar Charts."
slug: bartypeofcharts_widget
---

# Bar Charts

The [Kendo UI Bar Chart widget](http://demos.telerik.com/kendo-ui/bar-charts/index) displays data via horizontal or vertical bars whose lengths vary according to their value. Bar Charts are suitable for displaying a comparison between several sets of data. For example, for showing a summary of unique and total site visitors over a certain period of time.

## Configuration

### Column Chart

The [Kendo UI Column Chart](http://demos.telerik.com/kendo-ui/bar-charts/column) is the default chart rendered if a `_type_` is not specified, as demonstrated below.

###### Example

    $("#chart").kendoChart({
        title: {
            text: "Kendo Chart Example"
        },
        series: [ {
            name: "Example Series",
            data: [200, 450, 300, 125]
        } ],
        categoryAxis:{
            categories: [ 2000, 2001, 2002, 2003 ]
        }
    });

**Figure 1. A sample Column Chart with categories**

![Column Chart with categories](/controls/charts/chart-column-categories.png)

### Bar Chart

Setting the `type` property on the `series` object to `"bar"` renders horizontal bars, as demonstrated in the example below.

###### Example

    $("#chart").kendoChart({
        title: {
            text: "Kendo Chart Example"
        },
        series: [ {
            type: "bar",
            name: "Example Series",
            data: [200, 450, 300, 125]
        } ],
        categoryAxis:{
            categories: [ 2000, 2001, 2002, 2003 ]
        }
    });

**Figure 2. A sample Bar Chart**

![Bar Chart](/controls/charts/chart-types/chart-bar.png)

## See Also

Other articles on Kendo UI Charts and chart types:

* [Chart Overview]({% slug overview_kendoui_charts_widget %})
* [Data Series Charts]({% slug seriestypeofcharts_widget %})
* [Area Charts]({% slug areacharts_widget %})
* [Bubble Charts]({% slug bubblecharts_widget %})
* [Funnel Charts]({% slug funnelcharts_widget %})
* [Line Charts]({% slug linetypeoscharts_widget %})
* [Pie Charts]({% slug pietypecharts_widget %})
* [Scatter Charts]({% slug scattercharts_widget %})
* [Sparklines]({% slug overview_kendoui_sparklinescharts %})
* [Stock Charts]({% slug overview_kendoui_stockcharts %})
* [TreeMap]({% slug overview_treemap_widget %})
* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
