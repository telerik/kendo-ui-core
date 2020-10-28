---
title: Tooltip
page_title: jQuery Chart Documentation | Tooltip
description: "Get started with the jQuery Chart by Kendo UI and learn how to configure its tooltip, make it visible, and set its properties depending on your preferences."
slug: tooltip_charts_widget
previous_url: /controls/charts/tooltip
---

# Tooltip

The Kendo UI Chart enables you to display details about the data point over which the mouse is currently hovering.

The border of this tooltip matches the color of the series.

![The Chart tooltip](../chart-tooltip.png)

## Getting Started

By default, the tooltip of the Chart is not visible. You can enable it by setting the visible property of the tooltip object to `true`.

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

The tooltip can also be configured per series.

    series: [{
        type: "bar",
        name: "United States",
        data: [67.96, 68.93, 75, 74, 78],
        tooltip: {
          visible: true
        }
    }]

## Using Format Values

To format the point value, use the `Format` property. In the following example, `N0` indicates that the value will be rounded to a whole number and will have a thousands separator. For more information on the number and date formats in Kendo UI, refer to the articles about [number formatting](/framework/globalization/numberformatting) and [date formatting](/framework/globalization/dateformatting).

> Points in categorical (XY) Charts have two values&mdash;`{0}` and `{1}` (X and Y).

    tooltip: {
        visible: true,
        format: "Value: {0:N0}"
    }

## Using Templates

To provide better flexibility, define the content of a tooltip through a template.

The template provides access to all information associated with the point:

* `value`&mdash;The point value. Value dimensions are available as properties, for example, `value.x` and `value.y`.
* `category`&mdash;The category name.
* `series`&mdash;The data series.
* (When binding to a data source) `dataItem`&mdash;The original data item.

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

* [Using the API of the Chart (Demo)](https://demos.telerik.com/kendo-ui/chart-api/index)
* [JavaScript API Reference of the Chart](/api/javascript/dataviz/ui/chart)
