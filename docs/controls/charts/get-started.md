---
title: Getting Started
page_title: jQuery Chart Documentation - Getting Started with the Chart
description: "Get started with the jQuery Chart by Kendo UI and learn how to create, initialize, and enable the widget."
slug: getting_started_kendoui_chart_widget
position: 1
---

# Getting Started with the Chart

This guide demonstrates how to get up and running with the Kendo UI for jQuery Chart.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        title: {
          text: "Gross domestic product growth /GDP annual %/"
        },
        legend: {
          position: "top"
        },
        series: [{
          name: "India",
          type: "column",
          data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855],
          color: "red"
        },{
          name: "Germany",
          type: "column",
          data: [1.010, 1.375, 1.161, 1.684, 3.7, 3.269, 1.083, 5.127, 3.690, 2.995],
          color: "blue"
        },{
          name: "World",
          type: "line",
          data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, 2.245, 4.339, 2.727],
          color: "green"
        }],
        valueAxis: {
          labels: {
            format: "{0}%"
          }
        },
        categoryAxis: {
          categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011]
        },
        tooltip: {
          visible: true,
          template: "#= series.name #: #= value #%"
        }
      });
    </script>
```

## 1. Create a div Element

First, create an empty `<div>` element that you will use to initialize the widget.

```html
<div id="chart"></div>
```

## 2. Initialize the Chart 

In this step, you will initialize the Chart from the `<div>` element.

```html
<div id="chart"></div>

<script>
    $("#chart").kendoChart();
</script>
```

## 3. Add the Series Configuration

Once the basic initialization is completed, you can start adding additional configurations to the Chart. The first and most important configuration is the [`series`](/api/javascript/dataviz/ui/chart/configuration/series).

You can combine several different [Chart types]({% slug overview_charttypes_charts %}) by configuring multiple [`series.types`](/api/javascript/dataviz/ui/chart/configuration/series.type) in the same widget configuration.

```html
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          name: "India", // Provide a name for the series.
          type: "column", // Specify the series type.
          data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855], // Provide data points for the series.
          color: "red" // Provide a color for the series(optional).
        },{
          name: "Germany",
          type: "column",
          data: [1.010, 1.375, 1.161, 1.684, 3.7, 3.269, 1.083, 5.127, 3.690, 2.995],
          color: "blue"
        },{
          name: "World",
          type: "line", // Specify a different series type.
          data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, 2.245, 4.339, 2.727],
          color: "green"
        }]
      });
    </script>
```

## 4. Add the CategoryAxis Configuration

The [`categoryAxis`](/api/javascript/dataviz/ui/chart/configuration/categoryaxis) enables you to provide category names for each data point in the `series`.

```html
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          name: "India",
          type: "column",
          data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855],
          color: "red"
        },{
          name: "Germany",
          type: "column",
          data: [1.010, 1.375, 1.161, 1.684, 3.7, 3.269, 1.083, 5.127, 3.690, 2.995],
          color: "blue"
        },{
          name: "World",
          type: "line",
          data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, 2.245, 4.339, 2.727],
          color: "green"
        }],
        categoryAxis: {
          categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011]
        }
      });
    </script>
```

## 5. Add the Title Configuration

The [`title`](/api/javascript/dataviz/ui/chart/configuration/title#title) configuration enables you to render a text that will appear outside of the Chart.

```html
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        title: {
          text: "Gross domestic product growth /GDP annual %/"
        },
        series: [{
          name: "India",
          type: "column",
          data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855],
          color: "red"
        },{
          name: "Germany",
          type: "column",
          data: [1.010, 1.375, 1.161, 1.684, 3.7, 3.269, 1.083, 5.127, 3.690, 2.995],
          color: "blue"
        },{
          name: "World",
          type: "line",
          data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, 2.245, 4.339, 2.727],
          color: "green"
        }],
        categoryAxis: {
          categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011]
        }
      });
    </script>
```

## 6. Add the Legend Configuration

The [`legend`](/api/javascript/dataviz/ui/chart/configuration/legend) configuration renders each `series.name` alongside the `series.color`.

```html
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        title: {
          text: "Gross domestic product growth /GDP annual %/"
        },
        legend: {
          position: "top"
        },
        series: [{
          name: "India",
          type: "column",
          data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855],
          color: "red"
        },{
          name: "Germany",
          type: "column",
          data: [1.010, 1.375, 1.161, 1.684, 3.7, 3.269, 1.083, 5.127, 3.690, 2.995],
          color: "blue"
        },{
          name: "World",
          type: "line",
          data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, 2.245, 4.339, 2.727],
          color: "green"
        }],
        categoryAxis: {
          categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011]
        }
      });
    </script>
```

## 7. Add Labels to the Value Axis

The [`valueAxis.labels`](/api/javascript/dataviz/ui/chart/configuration/valueaxis.labels) configuration enables you to change the appearance of the labels on the value axis.

```html
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        title: {
          text: "Gross domestic product growth /GDP annual %/"
        },
        legend: {
          position: "top"
        },
        series: [{
          name: "India",
          type: "column",
          data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855],
          color: "red"
        },{
          name: "Germany",
          type: "column",
          data: [1.010, 1.375, 1.161, 1.684, 3.7, 3.269, 1.083, 5.127, 3.690, 2.995],
          color: "blue"
        },{
          name: "World",
          type: "line",
          data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, 2.245, 4.339, 2.727],
          color: "green"
        }],
        categoryAxis: {
          categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011]
        },
        valueAxis: {
          labels: {
            format: "{0}%"
          }
        }
      });
    </script>
```

## 8. Add the Tooltip Configuration

The Chart [`tooltip`](/api/javascript/dataviz/ui/chart/configuration/tooltip#tooltip) is displayed when you hover over a series' data point. You can configure the text displayed in the tooltip by specifying a [`template`](/api/javascript/dataviz/ui/chart/configuration/tooltip#tooltiptemplate).

```html
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        title: {
          text: "Gross domestic product growth /GDP annual %/"
        },
        legend: {
          position: "top"
        },
        series: [{
          name: "India",
          type: "column",
          data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855],
          color: "red"
        },{
          name: "Germany",
          type: "column",
          data: [1.010, 1.375, 1.161, 1.684, 3.7, 3.269, 1.083, 5.127, 3.690, 2.995],
          color: "blue"
        },{
          name: "World",
          type: "line",
          data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, 2.245, 4.339, 2.727],
          color: "green"
        }],
        categoryAxis: {
          categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011]
        },
        valueAxis: {
          labels: {
            format: "{0}%"
          }
        },
        tooltip: {
          visible: true,
          template: "#= series.name #: #= value #%"
        }
      });
    </script>
```

## Next Steps 

* [Referencing Existing Widget Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the Chart](https://demos.telerik.com/kendo-ui/chart/index)

## See Also 

* [JavaScript API Reference of the Chart](/api/javascript/ui/chart)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>