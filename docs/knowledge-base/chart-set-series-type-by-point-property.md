---
title: Set Different Chart Series Types According to DataItem Property
description: An example on how to set different types of series for different points according to a DataItem property
type: how-to
page_title: Set Different Chart Series Types According to DataItem Property
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

I'm working on an application that uses the Kendo UI Charts and would like to dinamically set the series type, after the data has been bound, depending on a specific property of the points.

## Solution

The described functionality can be implemented by taking advantage of the grouping capabilities of the Kendo UI Charts while setting the series `type` on the `dataBound` event:

```html
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

* [dataBound event API Reference.](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/events/databound)
* [Binding to grouped data Chart Demo.](https://demos.telerik.com/kendo-ui/line-charts/grouped-data)
