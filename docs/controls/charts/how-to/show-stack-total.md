---
title: Show Stack Total
page_title: Show Total Value for Stacked Column/Bar Series
description: Describes how to place a label with the stack total on top of column or bar series
---

# Show Total Value for Stacked Column/Bar Series

The example below demonstrates how to add a total label to the top-most series in the stack.

It works by iterating all series and building a template expression that sums up the values of the visible series.
This needs to be done initially, in the [dataBound event](/api/javascript/dataviz/ui/chart#events-dataBound),
and on each [legendItemClick](/api/javascript/dataviz/ui/chart#events-legendItemClick).

#### Example:

```html
    <div id="chart"></div>
    <script>
      $(function(){
        $("#chart").kendoChart({
          dataSource:{
            data:[{
              a: 22,
              b: 11,
              c: 33
            },{
              a: 2,
              b: 1,
              c: 3
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
            name: "c"
          }],
          categoryAxis: {
            field: "category"
          },
          legend: {
            visible: true,
            position: "bottom"
          },
          legendItemClick: function(e) {
            setTotalLabel(e.sender, e.seriesIndex);
          },
          dataBound: function(e) {
            setTotalLabel(e.sender);
          }
        })
      })

      function setTotalLabel(chart, toggledSeriesIndex) {
        var series = chart.options.series;
        var lastSeries = {};
        var fields = [];

        for (var i = 0; i < series.length; i++) {
          var visible = series[i].visible;

          // We're about to toggle the visibility of the clicked series
          if (i === toggledSeriesIndex) {
            visible = !visible;
          }

          if (visible) {
            fields.push("dataItem." + series[i].field);
            lastSeries = series[i];
          }

          // Clean-up existing labels
          series[i].labels = {};
        }

        lastSeries.labels = {
          visible: true,
          template: "#=" + fields.join("+") + "#"
        };
      }
    </script>
```
