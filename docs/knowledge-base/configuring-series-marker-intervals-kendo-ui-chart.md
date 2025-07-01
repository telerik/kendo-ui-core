---
title: Configuring Series Marker Intervals in Kendo UI Chart
description: Learn how to show markers at specific intervals on a series in Kendo UI Chart.
type: how-to
page_title: Show Markers at Specific Intervals in Kendo UI Chart Series
slug: configuring-series-marker-intervals-kendo-ui-chart
tags: kendo-ui-chart,series-markers,marker-intervals,visible-function
res_type: kb
ticketid: 1689932
---

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® Chart</td>
</tr>
<tr>
<td>Version</td>
<td>2025.2.520</td>
</tr>
</tbody>
</table>

## Description

I want to display markers on my Kendo UI Chart series at specific intervals, such as every n-th point. While the default configuration allows enabling or disabling markers, I need a way to toggle their visibility based on the point index.

This knowledge base article also answers the following questions:
- How to show markers every second point in Kendo UI Chart?
- How to configure series markers dynamically in Kendo UI Chart?
- Is it possible to apply conditional logic for Kendo UI Chart markers?

## Solution

To show markers at specific intervals, use the [`markers.visible`](/api/javascript/dataviz/ui/chart/configuration/series.markers.visible) property. This property accepts a function that controls the visibility of markers based on the index of the data point.

Below is an example of how to display markers for every second data point:

```javascript
$("#chart").kendoChart({
  series: [
    {
      type: "line",
      markers: {
        visible: function(e) {
          // Show markers for every second data point (e.index % 2 === 0)
          return e.index % 2 === 0;
        },
        background: "green", // Specify marker background color
        size: 30, // Define marker size
      },
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Series data points
    },
  ],
});
```

### Key Points:
1. The `markers.visible` function receives an `e` parameter containing the data point's index (e.index).
2. Use conditional logic within the function to determine marker visibility.
3. Customize marker appearance using properties like `background` and `size`.

For a live demonstration, refer to the example below.

```dojo
<div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [
          {
            type: "line",
            markers: {
              visible: function(e) {
                return e.index % 2 ? false : true;
              },
              background: "green",
              size: 30,
              // interval: 2  // <-- show every second data point? Do we have some configuration available to do this?
            },
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          }
        ]
      });
    </script>
```

## See Also

- [Kendo UI Chart Series Markers API Documentation](/api/javascript/dataviz/ui/chart/configuration/series.markers.visible)
- [Kendo UI Chart Overview](/controls/charts/overview)
