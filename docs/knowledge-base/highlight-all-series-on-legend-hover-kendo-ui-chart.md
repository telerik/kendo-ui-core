---
title: Highlighting Series on Legend Item Hover in Grouped and Stacked Bar Chart
description: Learn how to highlight all series across groups in a Kendo UI Bar Chart when hovering over a legend item.
type: how-to
page_title: How to Highlight All Series in Grouped and Stacked Bar Chart on Legend Hover - Kendo UI Chart
slug: highlight-all-series-on-legend-hover-kendo-ui-chart
tags: kendo ui, chart, bar chart, legend, hover, highlight, grouped, stacked
res_type: kb
components: ["chart"]
ticketid: 723491
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Chart for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2020.3.915</td>
</tr>
</tbody>
</table>

## Description

When using a grouped and stacked Bar Chart, I want to highlight all series within all groups when hovering over an item in the legend. 

This KB article also answers the following questions:
- How to manually control the highlight of chart series on legend hover?
- How to implement custom highlighting for stacked and grouped charts in Kendo UI?
- How to use the `toggleHighlight()` method to highlight chart series?

## Solution

To highlight all series across groups in a Kendo UI Bar Chart when hovering over a legend item, prevent the Chart's internal highlighting logic and implement a custom highlight by using the [`toggleHighlight`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/methods/togglehighlight) method. This can be accomplished within the [`legendItemHover`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/events/legenditemhover) and [`legendItemLeave`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/events/legenditemleave) event handlers.

1. Handle the `legendItemHover` event to prevent the default highlighting logic and manually apply the highlight to the series matching the legend item's text.
2. Use the `legendItemLeave` event to remove the highlight from the series when the mouse leaves the legend item.

The following example demonstrates how to configure the event handlers:

```javascript
$("#chart").kendoChart({
    // Chart configuration...
    legendItemHover: function(e) {
        e.preventDefault(); // Prevent default highlight
        e.sender.toggleHighlight(true, e.text); // Apply custom highlight
    },
    legendItemLeave: function(e) {
        e.sender.toggleHighlight(false, e.text); // Remove custom highlight
    }
    // Additional chart configuration...
});
```

For a practical demonstration, refer to the below Dojo demo.
```dojo
 <div id="example">
        <div class="demo-section wide">
          <div id="chart"></div>
        </div>
        <script>
          function createChart() {
            $("#chart").kendoChart({
              title: {
                text: "World population by age group and sex"
              },
              legend: {
                visible: true
              },
              seriesDefaults: {
                type: "column",
                stack: {
                  type: "100%"
                }
              },
              series: [{
                name: "A",
                stack: {
                  group: "Company"
                },
                data: [10,5,15],
                highlight: {
                  visible: false
                },
              }, {
                name: "A",
                stack: {
                  group: "Mean"
                },
                data: [5,10,20],
                visibleInLegend: false
              }, {
                name: "B",
                stack: {
                  group: "Company"
                },
                data: [40,25,50]
              },{
                name: "B",
                stack: {
                  group: "Mean"
                },
                data: [50,10,15],
                visibleInLegend: false
              }, {
                name: "C",
                stack: {
                  group: "Company"
                },
                data: [30,35,5]
              }, {
                name: "C",
                stack: {
                  group: "Mean"
                },
                data: [40,25,35],
                visibleInLegend: false
              }, {
                name: "D",
                stack: {
                  group: "Company"
                },
                data: [20,35,30]
              }, {
                name: "D",
                stack: {
                  group: "Mean"
                },
                data: [5,55,30],
                visibleInLegend: false
              }],
              seriesColors: ["#02808B", "#02808B", "#37B1D4", "#37B1D4", "#41EDFC", "#41EDFC", "#81F3FD", "#81F3FD", "#C0F9FE", "#C0F9FE"],
              valueAxis: {
                line: {
                  visible: false
                }
              },
              categoryAxis: {
                categories: ["Total","Run","Invest"],
                majorGridLines: {
                  visible: false
                }
              },
              tooltip: {
                visible: true,
                template: "#= series.stack.group #s, age #= series.name #"
              },
              legendItemHover: function(e){
                e.preventDefault();
                  e.sender.toggleHighlight(true, e.text);
              },
              legendItemLeave: function(e) {
                e.sender.toggleHighlight(false, e.text);
              }
            });
          }

          $(document).ready(createChart);
          $(document).bind("kendo:skinChange", createChart);
        </script>
      </div>
```

## See Also

- [Chart Overview](https://docs.telerik.com/kendo-ui/controls/charts/chart/overview)
- [Chart toggleHighlight Method](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/methods/togglehighlight)
- [Chart legendItemHover Event](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/events/legenditemhover)
- [Kendo UI Dojo - Interactive Examples](https://dojo.telerik.com/)
