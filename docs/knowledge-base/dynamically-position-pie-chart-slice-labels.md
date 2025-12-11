---
title: Adjusting Pie Chart Slice Labels Dynamically
description: Learn how to set different positions for Pie Chart labels dynamically based on the slice size.
type: how-to
page_title: Dynamically Position Pie Chart Slice Labels in Kendo UI for jQuery
meta_title: Dynamically Position Pie Chart Slice Labels in Kendo UI for jQuery
slug: dynamically-position-pie-chart-slice-labels
tags: kendo-ui-for-jquery,chart,labels,series.labels.visual,pie-chart
res_type: kb
components: ["chart"]
ticketid: 1641371
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>
Kendo UI for jQuery Chart
</td>
</tr>
<tr>
<td> Version </td>
<td> Current </td>
</tr>
</tbody>
</table>

## Description

I want to control the position of Pie Chart slice labels dynamically based on the size of the slice. Smaller slices tend to crowd the labels outside the chart, while larger slices can fit labels inside. I need a method to hide labels or adjust their position to ensure better visualization.

This knowledge base article also answers the following questions:
- How can I adjust Pie Chart slice labels dynamically?
- How do I hide labels for smaller Pie Chart slices?
- Can I change label position inside or outside the slice in Kendo UI for jQuery Pie Chart?

## Solution

To adjust the label position dynamically based on the slice size, utilize the [`series.labels.visual`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.labels.visual) property. This allows creating custom visuals for the labels.

### Example Implementation

The following example demonstrates how to position labels dynamically for Pie Chart slices:

```dojo
<div id="chart" style="background: center no-repeat url('https://demos.telerik.com/kendo-ui/content/shared/styles/world-map.png');"></div>
      <script>
        function createChart() {
          $("#chart").kendoChart({
            title: {
              position: "bottom",
              text: "Share of Internet Population Growth, 2007 - 2012"
            },
            legend: {
              visible: false
            },
            chartArea: {
              background: ""
            },
            seriesDefaults: {
              labels: {
                visible: true,
                position: "center",
                background: "transparent",
                //template: "#= category #: \n #= value#%"
                visual: function(e) {
                if (e.dataItem.value < 2){
                  var x = e.rect.origin.x + e.rect.size.width + 40;
                  var y = e.rect.origin.y + (e.rect.size.height - 90)/2;
                  return new kendo.drawing.Text(e.text, [x, y], {
                    fill: {
                      color: "black",                             
                    }
                  });
                } else {
                  return e.createVisual();
                }
              },
              }
            },
            seriesColors: ["red", "green", "orange", "purple", "yellow", "pink", "white"],
            series: [{
              type: "pie",
              startAngle: 150,
              data: [{
                category: "Asia",
                value: 53.8,
              },{
                category: "Europe",
                value: 16.1,
              },{
                category: "Latin America",
                value: 11.3,
              },{
                category: "Africa",
                value: 9.6,
              },{
                category: "Middle East",
                value: 5.2,
              },{
                category: "North America",
                value: 3.6,
              },{
                category: "Australia",
                value: 1.9,
              }]
            }],
            tooltip: {
              visible: true,
              format: "{0}%"
            }
          });
        }

        $(document).ready(createChart);
        $(document).bind("kendo:skinChange", createChart);
      </script>
```

### Explanation:
1. Use [`series.labels.visual`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.labels.visual) to define a custom visual function.
2. Check the value of the slice (`e.dataItem.value`) to set custom label positions for smaller slices.
3. For larger slices, use the default `createVisual()` method.

## See Also

- [Kendo UI for jQuery Chart Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/charts/overview)
- [Series Labels Visual API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.labels.visual)
- [Kendo Drawing Text API](https://docs.telerik.com/kendo-ui/api/javascript/drawing/text)
- [Pie Chart Overview](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.type#series.type)
