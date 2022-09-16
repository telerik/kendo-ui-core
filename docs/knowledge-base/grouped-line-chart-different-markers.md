---
title: Set Marker Types for Grouped Line Charts
page_title: Set Marker Types for Grouped Line Charts
description: "Learn how to set different marker types to each series in a grouped Kendo UI Line Chart."
previous_url: /controls/charts/how-to/grouped-line-chart-different-markers, /controls/charts/how-to/appearance/grouped-line-chart-different-markers
slug: howto_setdifrerentmarkers_forgroupedlinecharts_charts
tags: chart, set, marker, type, grouped, line
component: chart
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Chart for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I set different marker types to each series in a Kendo UI Line Chart?

## Solution

The following example demonstrates how to achieve this behavior.

```dojo
    <div id="chart"></div>
    <script>
        var data = [{
        "date": "12/30/2011",
        "close": 405,
        "volume": 6414369,
        "open": 403.51,
        "high": 406.28,
        "low": 403.49,
        "symbol": "2. AAPL"
    },{
        "date": "11/30/2011",
        "close": 382.2,
        "volume": 14464710,
        "open": 381.29,
        "high": 382.276,
        "low": 378.3,
        "symbol": "2. AAPL"
    },{
        "date": "10/31/2011",
        "close": 404.78,
        "volume": 13762250,
        "open": 402.42,
        "high": 409.33,
        "low": 401.05,
        "symbol": "2. AAPL"
    },{
        "date": "12/30/2011",
        "close": 173.1,
        "volume": 4279069,
        "open": 173.36,
        "high": 175.17,
        "low": 172.49,
        "symbol": "3. AMZN"
    },{
        "date": "11/30/2011",
        "close": 192.29,
        "volume": 7700490,
        "open": 194.76,
        "high": 195.3,
        "low": 188.75,
        "symbol": "3. AMZN"
    },{
        "date": "10/31/2011",
        "close": 213.51,
        "volume": 7336799,
        "open": 215.79,
        "high": 218.89,
        "low": 213.04,
        "symbol": "3. AMZN"
    },{
        "date": "12/30/2011",
        "close": 645.9,
        "volume": 1780941,
        "open": 642.02,
        "high": 646.76,
        "low": 642.02,
        "symbol": "1. GOOG"
    },{
        "date": "11/30/2011",
        "close": 599.39,
        "volume": 3390173,
        "open": 597.95,
        "high": 599.51,
        "low": 592.09,
        "symbol": "1. GOOG"
    },{
        "date": "10/31/2011",
        "close": 592.64,
        "volume": 2557538,
        "open": 595.09,
        "high": 599.69,
        "low": 591.67,
        "symbol": "1. GOOG"
    }];

    var stocksDataSource = new kendo.data.DataSource({
      data: data,
      group: {
        field: "symbol"
      },
      sort: {
        field: "date",
        dir: "asc"
      },
      schema: {
        model: {
          fields: {
            date: {
              type: "date"
            }
          }
        }
      }
    });

    $("#chart").kendoChart({
      title: { text: "Stock Prices" },
      dataSource: stocksDataSource,
      series: [{
        type: "line",
        field: "close",
        name: "#= group.value # (close)",
        markers: {
        	visible: true
        }
      }],
      legend: {
        position: "bottom"
      },          
      categoryAxis: {
        field: "date",
        labels: {
          format: "MMM"
        }
      },
      dataBound: onDB
    });

    function onDB(e) {
      var chart = e.sender,
          options = chart.options,
          series = options.series;

      series[0].markers.type = "triangle";
      series[1].markers.type = "cross";
      series[2].markers.type = "square";
    }
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
