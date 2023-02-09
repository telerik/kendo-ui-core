---
title: Include Negative Values in the Total in Stacked Column Chart
description: "Learn how to include negative values in the label's total of a Stacked Column Chart"
type: how-to
page_title: Include Negative Values in the Total in Stacked Column Chart's labels - Kendo UI Chart for jQuery
slug: include-negative-values-in-stacked-chart
tags: chart, stacked, negative, include, labels
res_type: kb
ticketid: 1580716
component: chart
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Column Chart for jQuery</td>
 </tr>
</table>

## Description

How can I include the negative values in the label's total of a Stacked Column Chart?

## Solution

Use the [`series.labels.template`](/api/javascript/dataviz/ui/chart/configuration/series.labels.template) function to calculate and return the desired result.

```dojo
    <div id="chart"></div>
    <script>
      $(function(){
        $("#chart").kendoChart({
          dataSource:{
            data:[{
              a: -11,
              b: 1,
              c: 11
            },{
              a: 1,
              b: -1,
              c: -1
            }]
          },
          seriesDefaults: {
            type: "column",
            stack: true
          },
          series: [{
            field: "a",
            name: "a"
          },{
            field: "b",
            name: "b"
          },{
            field: "c",
            name: "c",
            labels: {
              template: function(data) {
                var seriesData = data.dataItem
                return seriesData.a + seriesData.b + seriesData.c
              },
              visible: true
            }
          }]
        });
      });
    </script>
```

## See Also

* [Kendo UI Chart API Reference](/api/javascript/dataviz/ui/chart)
* [Themes and Appearance of the Kendo UI Widgets]({% slug themesandappearnce_kendoui_desktopwidgets %})
* [Common Issues in Kendo UI Charts]({% slug troubleshooting_chart_widget %})
* [Common Issues in Kendo UI]({% slug troubleshooting_common_issues_kendoui %})
* [Kendo UI JavaScript Errors]({% slug troubleshooting_javascript_errors_kendoui %})
