---
title: Preventing Legend Marker Display on Hover in Kendo UI Scatterline Chart
description: Learn how to ensure markers do not appear on hover in the legend when "markers visible" is set to false in Kendo UI Scatterline Chart.
type: how-to
page_title: Disable Legend Marker Hover in Scatterline Chart When Markers Are Hidden
meta_title: Disable Legend Marker Hover in Scatterline Chart When Markers Are Hidden
slug: disable-legend-marker-hover-scatterline-chart
tags: kendo-ui-for-jquery, chart, scatterline, legend, markers, highlight
res_type: kb
ticketid: 1641339
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>Kendo UI for jQuery Chart </td>
</tr>
<tr>
<td> Version </td>
<td>2025.3.825</td>
</tr>
</tbody>
</table>

## Description

I want to prevent the markers from appearing in the legend when hovering over it in a Kendo UI for jQuery [Scatterline Chart](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.type#seriesystypescatterline). Even though the markers are set to not be visible in the chart, they still appear when hovering over the legend.

This knowledge base article also answers the following questions:
- How to stop legend markers from appearing on hover in Scatterline Chart?
- How to hide legend markers when markers are set to invisible?
- How to configure legend hover behavior in Kendo UI Scatterline Chart?

## Solution

To ensure that markers do not appear on hover in the legend when [`markers.visible`](/api/javascript/dataviz/ui/chart/configuration/series.markers.visible) is set to `false`, set the [`legend.item.highlight.visible`](/api/javascript/dataviz/ui/chart/configuration/legend.item#legenditemhighlightvisible) configuration to `false`. This disables the highlight behavior of legend items.

### Configuration Example

```javascript
$("#chart").kendoChart({
  title: {
    text: "Charge current vs. charge time"
  },
  legend: {
    visible: true,
    item: {
      highlight: {
        visible: false // Disables markers on legend hover
      }
    }
  },
  seriesDefaults: {
    type: "scatterLine",
    style: "smooth",
    markers: { visible: false }, // Hides markers in the chart
    highlight: { visible: false } // Disables marker highlighting on hover
  },
  // Add other chart configurations here
});
```

### Live Demo

```dojo
 <div id="chart"></div>
      <script>
          $("#chart").kendoChart({
            title: {
              text: "Charge current vs. charge time"
            },
            legend: {
              visible: true,
              item: {
                highlight: {
                  visible: false
                }
              }
            },
            seriesDefaults: {
              type: "scatterLine",
              style: "smooth",
              markers: { visible: false },
              highlight: { visible: false }
            },
            series: [{
              name: "0.8C",
              data: [[10, 10], [15, 20], [20, 25], [32, 15], [43, 50], [55, 30], [60, 70], [70, 50], [90, 100]]
            }, {
              name: "1.6C",
              data: [[10, 40], [17, 50], [22, 70], [35, 60], [47, 95], [60, 100]]
            }, {
              name: "3.1C",
              data: [[10, 70], [13, 90], [25, 100]]
            }],
            xAxis: {
              max: 90,
              labels: {
                format: "{0}m"
              },
              title: {
                text: "Time"
              }
            },
            yAxis: {
              max: 100,
              labels: {
                format: "{0}%"
              },
              title: {
                text: "Charge"
              }
            },
            tooltip: {
              visible: true,
              format: "{1}% in {0} minutes"
            }
          });
      </script>
```

## See Also

- [Kendo UI for jQuery Chart Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/charts/overview)
- [Kendo UI Chart Legend API Configuration](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/chart/configuration/legend.item)
- [Kendo UI Scatterline Chart Series API Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/chart/configuration/series.type#seriesystypescatterline)
