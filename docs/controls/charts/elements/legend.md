---
title: Legend
page_title: jQuery Chart Documentation - Legend
description: "Get started with the jQuery Chart by Kendo UI and learn how to control its appearance, change its themes and manage its animated transitions."
slug: legend_features_charts
---

# Legend

The Chart legend displays the name of the configured data series.

> * Series without a specified name will not display legend items.
> * To render a legend item for the Pie, Donut and Funnel series, provide the items with a [`categoryField`](/api/javascript/dataviz/ui/chart/configuration/series.categoryfield).

To customize the legend, use the [`legend`](/api/javascript/dataviz/ui/chart/configuration/legend) configuration option.

The following example demonstrates how to configure the position and orientation of the Chart legend.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        name: "Fibonacci",
        type: "column",
        data: [1, 2, 3, 5]
      }, {
        name: "Squares",
        type: "column",
        data: [0, 1, 4, 9]
      }],
      legend: {
        position: "bottom",
        orientation: "horizontal"
      }
    });
    </script>

## Hiding the Legend

If you set the series names, the Chart displays a default legend.

The following example demonstrates how to hide the legend by using its [`visible`](/api/javascript/dataviz/ui/chart/configuration/legend.visible) property.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        name: "Fibonacci",
        type: "column",
        data: [1, 2, 3, 5]
      }, {
        name: "Squares",
        type: "column",
        data: [0, 1, 4, 9]
      }],
      legend: {
        visible: false
      }
    });
    </script>

## Hiding a Series from the Legend
To exclude series from the legend, set their [`visibleInLegend`](/api/javascript/dataviz/ui/chart/configuration/series.visibleinlegend) option to `false`.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        name: "Fibonacci",
        type: "column",
        data: [1, 2, 3, 5]
      }, {
        name: "Squares",
        type: "column",
        data: [0, 1, 4, 9],
        visibleInLegend: false
      }]
    });
    </script>

## Customizing the Position

To control the position of the legend, use any of the following supported `position` values:
* `"top"`
* `"bottom"`
* `"left"`
* `"right"`
* `"custom"`

It is possible to remove the legend from the flow and to absolutely position it by setting the position to `custom` and configuring the `offsetX` and `offsetY` options.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        name: "Fibonacci",
        type: "column",
        data: [1, 2, 3, 5]
      }, {
        name: "Squares",
        type: "column",
        data: [0, 1, 4, 9]
      }],
      legend: {
        position: "custom",
        offsetX: 40,
        offsetY: 25
      }
    });
    </script>


## Setting a Title

The Chart legend section can be configured to hold a title with customizable layout and content.
To define a title, provide a [`title`](/api/javascript/dataviz/ui/chart/configuration/legend.title) object to the legend configuration.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        name: "Fibonacci",
        type: "column",
        data: [1, 2, 3, 5]
      }, {
        name: "Squares",
        type: "column",
        data: [0, 1, 4, 9]
      }],
      legend: {
        title: {
          text: "Series"
        }
      }
    });
    </script>


## See Also

* [Using the API of the Chart (Demo)](https://demos.telerik.com/kendo-ui/chart-api/index)
* [JavaScript API Reference of the Chart](/api/javascript/dataviz/ui/chart)
