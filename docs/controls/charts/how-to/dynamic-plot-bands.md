---
title: Dynamic plot bands
page_title: Dynamic plot bands
description: Dynamic plot bands
---

# Dynamic plot bands

The example below demonstrates how create dynamic plot bands for Kendo UI Chart.

#### Example:

```html
   <div id="chart"></div>
   <button>Change plot band</button>

    <script>
      $("#chart").kendoChart({
        categoryAxis: {
          type: "date",
          categories: [new Date("2014/01/01"), new Date("2014/01/02"), new Date("2014/01/31")],
          plotBands: [{
            from: new Date("2014/01/02"),
            to: new Date("2014/01/02"),
            color: "red"
          }]
        }
      });

      function showPlotBand(element, band) {
        var plotBands = [ band ];
        var axisNames = ["valueAxis", "xAxis", "categoryAxis"];
        var options = {};

        for (var i = 0; i < axisNames.length; i++) {
          options[axisNames[i]] = { plotBands: plotBands };
        }

        var chart = $(element).data("kendoChart");
        chart.setOptions(options);
      }

      $("button").click(function(){
        // shows a random plot band
        var start = new Date(2014, 0, 1 + Math.floor(Math.random() * 30));
        var end = new Date(start.getTime() + 1000 * 3600 * 24); // 24 hours after start

        showPlotBand("#chart", {
            from: start,
            to: end,
            color: "green"
        });
      });
    </script>
```
