---
title: Pie chart aggregates
page_title: Pie chart aggregates
description: Pie chart aggregates
---

# Pie chart aggregates

The example below demonstrates how to aggregate data in pie charts via the [dataSource aggregates](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-aggregate).

#### Example - Overriding the categories sort order

```html
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
