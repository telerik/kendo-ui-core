---
title: Title and Subtitle
page_title: jQuery Chart Documentation - Title and Subtitle
description: "Get started with the jQuery Chart by Kendo UI and learn how to control its appearance, change its themes and manage its animated transitions."
previous_url: /controls/charts/title-legend
slug: title_features_charts
---

# Title

To configure the Chart title, use the [`title`](/api/javascript/dataviz/ui/chart/configuration/title) option.

By default, the Chart displays no title.

The following example demonstrates how to configure the title font and alignment.

    <div id="chart"></div>
      <script>
      $("#chart").kendoChart({
        title: {
          text: "Chart Title",
          font: "21px sans-serif",
          align: "left"
        },
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

## Title Position

To control the position of the title, use the [`position`](/api/javascript/dataviz/ui/chart/configuration/title#titleposition) options of the `title` property.

The following example demonstrates how to display the title at the bottom of the Chart:

    <div id="chart"></div>
      <script>
      $("#chart").kendoChart({
        title: {
          text: "Chart Title",
          font: "21px sans-serif",
          align: "left",
          position: "bottom"
        },
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

# Subtitle

The Kendo UI Chart supports configuring an additional subtitle via the [`subtitle`](/api/dataviz/chart/configuration/subtitle) option.

By default, the subtitle is displayed below the main title.

The following example demonstrates how to configure a subtitle:

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Main Title"
      },
      subtitle: {
        text: "Subtitle"
      },
      series: [{
        type: "column",
        errorLowField: "low",
        errorHighField: "high",
        data: [{value: 4.743, low: 4.5, high: 5}, {value: 7.295, low: 7, high: 8},
          {value: 6.376, low: 5, high: 6.5}]
      }]
    });
    </script>

## See Also

* [Using the API of the Chart (Demo)](https://demos.telerik.com/kendo-ui/chart-api/index)
* [JavaScript API Reference of the Chart](/api/javascript/dataviz/ui/chart)
