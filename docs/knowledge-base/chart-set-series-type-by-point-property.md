---
title: Set Different Chart Series Types According to the DataItem Property
description: An example on how to set different types of the Kendo UI Chart series for different points according to the DataItem property.
type: how-to
page_title: Set Different Series Types According to DataItem | Kendo UI Chart for jQuery
slug: chart-set-series-type-by-point-property
tags: chart, series, type, dataitem, property, set
ticketid: 1155950
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Charts for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I dynamically set the Chart series type after the data was bound and depending on a specific property of the points?

## Solution

Use the grouping capabilities of the Chart while setting the series `type` on the `dataBound` event.

```dojo
<div id="example">
  <div class="demo-section k-content wide">
    <div id="chart"></div>
  </div>
  <script>
    function createChart() {
      var data = [{
          value: 1,
          name: 'Bid',
          category: new Date(2018, 0, 1)
        },
        {
          value: 2,
          name: 'Offer',
          category: new Date(2018, 0, 1)
        },
        {
          value: 3,
          name: 'Volume',
          category: new Date(2018, 0, 1)
        },
        {
          value: 4,
          name: 'Bid',
          category: new Date(2018, 1, 1)
        },
        {
          value: 5,
          name: 'Offer',
          category: new Date(2018, 1, 1)
        },
        {
          value: 6,
          name: 'Volume',
          category: new Date(2018, 1, 1)
        }
      ];

      $("#chart").kendoChart({
        dataSource: {
          data: data,
          group: {
            field: "name"
          }
        },
        series: [{
          field: "value",
          categoryField: "category"
        }],
        valueAxis: [{}, {
          name: 'columnAxis'
        }],
        categoryAxis: {
          axisCrossingValue: [0, Number.MAX_VALUE]
        },
        dataBound: function() {
          var series = this.options.series;
          for (var idx = 0; idx < series.length; idx++) {
            var options = series[idx];
            if (options.name === "Volume") {
              options.type = 'column';
              options.axis = 'columnAxis';
            } else {
              options.type = 'line';
            }
          }
        }
      });
    }

    $(document).ready(createChart);
    $(document).bind("kendo:skinChange", createChart);
  </script>
</div>
```

## See Also

* [API Reference of the dataBound Event](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/events/databound)
* [Demo on Binding to Grouped Data Chart](https://demos.telerik.com/kendo-ui/line-charts/grouped-data)
