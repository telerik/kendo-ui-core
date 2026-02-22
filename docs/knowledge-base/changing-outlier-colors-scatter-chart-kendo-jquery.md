---
title: Setting Different Colors for Outliers in Scatter Chart
description: Learn how to set a different color for outliers in a Kendo UI for jQuery Scatter Chart based on specific conditions.
type: how-to
page_title: Changing Outlier Colors in Kendo UI for jQuery Scatter Chart
meta_title: Changing Outlier Colors in Kendo UI for jQuery Scatter Chart
slug: changing-outlier-colors-scatter-chart-kendo-jquery
tags: chart,kendo ui for jquery,scatter,outliers,series,color
res_type: kb
components: ["chart"]
ticketid: 1642200
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> Kendo UI for jQuery Chart </td>
</tr>
<tr>
<td> Version </td>
<td> 2025.3.825 </td>
</tr>
</tbody>
</table>

## Description

I want to set a different color for outliers in a Scatter Chart using Kendo UI for jQuery. The goal is to highlight extremes or values that deviate from the concentration of the majority of data points.

This knowledge base article also answers the following questions:
- How do I highlight outliers in Kendo UI for jQuery Scatter Chart?
- How can I assign conditional colors to data points in Scatter Chart?
- How do I customize the appearance of extreme values in Scatter Chart?

## Solution

To set a different color for the outliers in a Kendo UI for jQuery Scatter Chart, use a function in the [`series.color`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/chart/configuration/series.color) property. This function allows you to conditionally apply colors to data points based on their values.

### Example

Here is an example of how to conditionally set different colors for outliers:

```javascript
$("#chart").kendoChart({
  series: [{
    type: "scatter",
    name: "January 2008",
    data: [
      [16.4, 5.4], [21.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2],
      [10.9, 7.4], [10.9, 0], [10.9, 8.2], [16.4, 0], [16.4, 1.8], [13.6, 0.3],
      [13.6, 0], [29.9, 0], [27.1, 2.3], [16.4, 0], [13.6, 3.7]
    ],
    color: function(point) {
      // Set outlier color based on the condition
      if (point.dataItem[1] > 10) {
        return "navy"; // Outlier color
      } else {
        return "green"; // Normal point color
      }
    }
  }]
});
```

This example assigns the color `navy` to points with values greater than `10` on the y-axis, treating them as outliers. Other points are assigned the color `green`. You can adjust the condition and colors based on your specific requirements.

### Live Demo

Test the example above in the following Dojo.
```dojo
<div id="chart"></div>
      <script>
          $("#chart").kendoChart({
            title: {
              text: "Rainfall - Wind Speed"
            },
            legend: {
              position: "bottom"
            },
            seriesDefaults: {
              type: "scatter"
            },
            series: [{
              name: "January 2008",
              color: function(point) {
                if (point.dataItem[1] > 10) {
                  return "navy";
                } else { return "green" }
              },
              data: [
                [16.4, 5.4], [21.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2], [10.9, 7.4], [10.9, 0], [10.9, 8.2], [16.4, 0], [16.4, 1.8], [13.6, 0.3], [13.6, 0], [29.9, 0], [27.1, 2.3], [16.4, 0], [13.6, 3.7], [10.9, 5.2], [16.4, 6.5], [10.9, 0], [24.5, 7.1], [10.9, 0], [8.1, 4.7], [19, 0], [21.7, 1.8], [27.1, 0], [24.5, 0], [27.1, 0], [29.9, 1.5], [27.1, 0.8], [22.1, 2]],
            },{
              name: "January 2009",
              //color: "navy",
              color: function(point) {
                if (point.dataItem[1] > 10) {
                  return "navy";
                } else { return "green" }
              },
              data: [
                [6.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4], [3.6, 12.2], [1.9, 14.4], [1.9, 9], [1.9, 13.2], [1.4, 7], [6.4, 8.8], [3.6, 4.3], [1.6, 10], [9.9, 2], [7.1, 15], [1.4, 0], [3.6, 13.7], [1.9, 15.2], [6.4, 16.5], [0.9, 10], [4.5, 17.1], [10.9, 10], [0.1, 14.7], [9, 10], [2.7, 11.8], [2.1, 10], [2.5, 10], [27.1, 10], [2.9, 11.5], [7.1, 10.8], [2.1, 12]]
            },{
              name: "January 2010",
              //color: "green",
              color: function(point) {
                if (point.dataItem[1] > 10) {
                  return "navy";
                } else { return "green" }
              },
              data: [
                [21.7, 3], [13.6, 3.5], [13.6, 3], [29.9, 3], [21.7, 20], [19, 2], [10.9, 3], [28, 4], [27.1, 0.3], [16.4, 4], [13.6, 0], [19, 5], [16.4, 3], [24.5, 3], [32.6, 3], [27.1, 4], [13.6, 6], [13.6, 8], [13.6, 5], [10.9, 4], [16.4, 0], [32.6, 10.3], [21.7, 20.8], [24.5, 0.8], [16.4, 0], [21.7, 6.9], [13.6, 7.7], [16.4, 0], [8.1, 0], [16.4, 0], [16.4, 0]]
            }],
            xAxis: {
              max: 35,
              title: {
                text: "Wind Speed [km/h]"
              },
              crosshair: {
                visible: true,
                tooltip: {
                  visible: true,
                  format: "n1"
                }
              }
            },
            yAxis: {
              min: -5,
              max: 25,
              title: {
                text: "Rainfall [mm]"
              },
              axisCrossingValue: -5,
              crosshair: {
                visible: true,
                tooltip: {
                  visible: true,
                  format: "n1"
                }
              }
            }
          });
      </script>
```

## See Also

- [Kendo UI for jQuery Chart Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/charts/overview)
- [Series Color API Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/chart/configuration/series.color)
- [Additional Scatter Chart Customization](https://www.telerik.com/kendo-jquery-ui/documentation/controls/charts/chart-types/scatter-charts)
