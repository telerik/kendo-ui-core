---
title: Tooltip
page_title: Tooltip | Kendo UI Charts
description: "Learn how to configure the tooltip in Kendo UI Charts, make it visible, and set its properties depending on your preferences."
slug: tooltip_charts_widget
previous_url: /controls/charts/tooltip
position: 1
---

# Tooltip

The Kendo UI Charts can display details about the data point the mouse is currently hovering. The border of this tooltip matches the color of the series.

**Figure 1. Tooltip in a Kendo UI Chart widget**

![](/controls/charts/chart-tooltip.png)

## Configuration

The tooltip is not visible by default. You can enable it by setting the visible property of the tooltip object to `true`, as demonstrated below.

###### Example

    $("#chart").kendoChart({
        series: [{
            type: "bar",
            name: "United States",
            data: [67.96, 68.93, 75, 74, 78]
        }],
        categoryAxis: {
            categories: [2005, 2006, 2007, 2008, 2009]
        },
        tooltip: {
            visible: true
        }
    });

The tooltip can also be configured per-series.

###### Example

    series: [{
        type: "bar",
        name: "United States",
        data: [67.96, 68.93, 75, 74, 78],
        tooltip: {
          visible: true
        }
    }]

## Options

### Format Values

The point value can be formatted using the `format` property, as demonstrated in the example below.

###### Example

    tooltip: {
        visible: true,
        format: "Value: {0:N0}"
    }

The format string supports a subset of the syntax available in Java and C#. Here "N0" indicates that the value should be rounded to a whole number and should have a thousands separator.

> **Important**
>
> Points in categorical (XY) Kendo UI Charts have two values&mdash;{0} and {1} (X and Y).

### Templates

When you desire a higher level of flexibility, define the content of a tooltip via a Kendo UI template. The template provides access to all information associated with the point:

*   `value`&mdash;The point value. Value dimensions are available as properties, e.g. `value.x` and `value.y`.
*   `category`&mdash;The category name.
*   `series`&mdash;The data series.
*   `dataItem`&mdash;The original data item (when binding to dataSource).

###### Example

    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [{
             name: "Series 1",
             data: [200, 450, 300, 125]
         }],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         },
         tooltip: {
             visible: true,
             template: "${category} - ${value}"
         }
    });

## See Also

Other articles on Kendo UI Charts:

* [Overview of the Chart Widgets]({% slug overview_kendoui_charts_widget %})
* [Data Binding]({% slug databinding_charts_widget %})
* [Date Series]({% slug dateseries_charts_widget %})
* [Chart Notes]({% slug chartnotes_charts_widget %})
* [Title and Legend]({% slug titlelegend_features_charts %})
* [Appearance]({% slug appearance_charts_widget %})
* [Error Bars]({% slug errorbars_charts_widget %})
* [Data Series]({% slug seriestypeofcharts_widget %})
* [Types of Kendo UI Charts]({% slug areacharts_widget %})
* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
