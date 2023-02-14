---
title: Aggregate Pie Chart Data
page_title: Aggregate Pie Chart Data
description: "Learn how to aggregate data in Kendo UI Pie Charts."
previous_url: /controls/charts/how-to/pie-chart-aggregates, /controls/charts/how-to/various/pie-chart-aggregates
slug: howto_aggregatedata_piecharts
tags: chart, aggregate, pie, data
component: chart
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Chart for jQuery</td>
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

How can I aggregate Pie Chart data and override the sort order of the Chart categories?

## Solution

The following example demonstrates how to achieve this behavior by using the [dataSource aggregates](/api/javascript/data/datasource/configuration/aggregate).

```dojo
    <div id="piechart"></div>
    <script>
      var data = [
        {
          "source": "Hydro",
          "percentage": 20,
        },
        {
          "source": "Hydro",
          "percentage": 20
        },
        {
          "source": "Solar",
          "percentage": 10
        },
        {
          "source": "Nuclear",
          "percentage": 30
        }
      ];

      var dataSource = new kendo.data.DataSource({
        data: data,
        group: {field: "source", aggregates: [{
          field: "percentage", aggregate: "sum"
        }]}
      });
      dataSource.read();

      $("#piechart").kendoChart({
        title: {
          text: "Population by State"
        },
        legend: {
          position: "bottom"
        },
        dataSource: getChartData(),
        series: [{
          type: "pie",
          field: "percentage",
          categoryField: "source",
          aggregate: "sum"
        }],
        tooltip: {
          visible: true,
          template: "${ category } - #:value# (#:percentage#%)"
        }
      });

      function getChartData() {
        var chartData = [];
        var view = dataSource.view();
        for(var idx = 0; idx < view.length; idx++) {
          chartData.push({
            source: view[idx].value,
            percentage: view[idx].aggregates.percentage.sum
          });
        }
        return chartData;
      }
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
