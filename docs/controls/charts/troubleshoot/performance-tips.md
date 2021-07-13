---
title: Performance Issues
page_title: jQuery Chart Documentation | Performance Issues
description: "Learn the tips and tricks for improving the performance of the Kendo UI widgets rendering data visualization."
previous_url: /dataviz/performance-tips
slug: tipsandtricks_kendouistyling
position: 2
---

# Performance Issues

This page provides tips and tricks on how to handle and improve the performance of the [Kendo UI Gauges, Charts, Barcodes, Diagrams, and Maps](https://demos.telerik.com/kendo-ui/).

## Using Canvas Rendering

Switching to Canvas rendering improves the performance of the widgets, especially on mobile devices, and facilitates the visualization of data by its fast update and lower resource usage. For more information on configuration settings, refer to the [`renderAs` API article](/api/dataviz/chart#configuration-renderAs).

> Kendo UI version 2016.2 and earlier do not support interactivity and do not fire events when rendering in Canvas.

```dojo
    <div id="chart"></div>
    <script>
        $(function() {
            $("#chart").kendoChart({
                renderAs: "canvas",
                series: [{
                    type: "column",
                    data: [1, 2, 3]
                }]
            });
        });
    </script>
```

### Using Inline Binding

When you use a DataSource binding, all data items are wrapped in [`Observable`](/api/javascript/data/observableobject) instances to track changes. Generally, such behavior is unnecessary for the Chart and might become an issue if you have a large number of data points&mdash;5,000 and more. In this case, you can use [inline binding]({% slug databinding_charts_widget %}).

```dojo
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        series: [{
            name: "Series 1",
            type: "column",
            data: [200, 450, 300, 125, 100]
        }, {
            name: "Series 2",
            type: "column",
            data: [210, null, 200, 100, null]
        }],
        categoryAxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri"]
        }
    });
    </script>
```

The following example demonstrates how to do inline binding with objects.

```dojo
    <div id="chart"></div>
    <script>
    var seriesData = [
        { day: "Mon", sales1: 200, sales2: 210 },
        { day: "Tue", sales1: 450 },
        { day: "Wed", sales1: 300, sales2: 200 },
        { day: "Thu", sales1: 125, sales2: 100 },
        { day: "Fri", sales1: 100 }
    ];

    $("#chart").kendoChart({
        series: [{
            name: "Series 1",
            type: "column",
            data: seriesData,
            field: "sales1"
        }, {
            name: "Series 2",
            type: "column",
            data: seriesData,
            field: "sales2"
        }],
        categoryAxis: {
            categoryField: "day"
        }
    });
    </script>
```

## Turning Off Animated Transitions

Animated transitions might slow down the browser especially if the page displays many active charts.

```dojo
    <div id="chart"></div>
    <script>
        $(function() {
            $("#chart").kendoChart({
                series: [{
                    type: "column",
                    data: [1, 2, 3]
                }],
                transitions: false
            });
        });
    </script>
```

The following example demonstrates how to disable only the initial animation.

```dojo
    <div id="chart"></div>
    <script>
      $(function() {
        var src = new kendo.data.ObservableArray([
            { value: 1 }, { value: 2 }
        ]);

        $("#chart").kendoChart({
          dataSource: {
               data: src
          },
          series: [{
              type: "column",
              field: "value"
          }]
        });

        var chart = $("#chart").data("kendoChart");
        chart.options.transitions = false;

        // Subsequent updates will not be animated.
        setTimeout(function() {
          src.push({ value: 3 });
        }, 2000);
      });
    </script>
```

## Disabling Gradients

Using solid fills instead of gradients noticeably improves the performance of the Chart.

```dojo
    <div id="chart"></div>
    <script>
        $(function() {
            $("#chart").kendoChart({
                seriesDefaults: {
                  overlay: {
                    gradient: null
                  }
                },
                series: [{
                    type: "column",
                    data: [1, 2, 3]
                }],
                transitions: false
            });
        });
    </script>
```

## Reducing the Number of Rendered Elements

When you have a lot of data points and categories, rendering all of them slows the Chart and makes it hard to read by the end user.

To improve both aspects, hide certain Chart elements, for example:

* Hide minor and major grid lines on the X axis where many categories exist
* Set a step for the category axis labels so only the n<sup>th</sup> label is rendered
* Use a shorter format string for date axis labels
* Entirely hide labels for series and/or axes

```dojo
    <div id="chart"></div>
    <script>
        $(function() {
            $("#chart").kendoChart({
               categoryAxis: {
                  minorGridLines: {visible: false},//hide unnecessary elements
                  majorGridLines: {visible: false},//hide unnecessary elements
                  labels: {
                    step: 60,//every hourly label so they don't overlap
                    rotation: 90,//rotate so they take up less horizontal space and also reduce overlap
                    //visible: false,//hide labels altogether, you can set that for the series/seriesDefaults as well
                    dateFormats: {
                      days: "HH:mm" //use shorter format for the labels
                    }
                  },
                  baseUnit: "minutes" //set up a date axis, choose an appropriate range for your data
                },
                transitions: false
            });
        });
    </script>
```

## See Also

* [Themes and Appearance of the Kendo UI Widgets]({% slug themesandappearnce_kendoui_desktopwidgets %})
* [Rendering Modes for Data Visualization]({% slug renderingmodesfor_datavisualization_kendouistyling %})
* [Common Issues in Kendo UI Charts]({% slug troubleshooting_chart_widget %})
* [Common Issues in Kendo UI]({% slug troubleshooting_common_issues_kendoui %})
* [Kendo UI JavaScript Errors]({% slug troubleshooting_javascript_errors_kendoui %})
