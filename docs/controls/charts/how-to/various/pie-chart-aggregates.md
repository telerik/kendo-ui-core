---
title: Aggregate Pie Chart Data
page_title: Aggregate Pie Chart Data | Kendo UI Charts
description: "Learn how to aggregate data in Kendo UI Pie Charts."
previous_url: /controls/charts/how-to/pie-chart-aggregates
slug: howto_aggregatedata_piecharts
---

# Aggregate Pie Chart Data

In some scenarios, you might need to aggregate Pie Chart data and to override the sort order of the categories.

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
