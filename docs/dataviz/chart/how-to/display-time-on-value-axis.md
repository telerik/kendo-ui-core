---
title: Display time on value axis
page_title: Display time on value axis
description: Demonstrates how to configure the value axis to display a timeline
---

# Display time on value axis

The valueAxis on categorical charts supports displaying only numbers.
It is possible to display date/time values by representing the dates as numeric values.

> Scatter charts support displaying dates on the xAxis and yAxis natively.

#### Example: Display dates on the value axis

```html
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          data: [new Date("2015/01/01 01:22").getTime(),
                 new Date("2015/01/01 02:24").getTime()]
        }],
        valueAxis: {
          labels: {
            template: "#= kendo.format('{0:HH:mm}', new Date(value)) #"
          },
          min: new Date("2015/01/01").getTime(),
          majorUnit: 20 * 60 * 1000 // 20 minutes step
        },
        tooltip: {
          visible: true,
          template: "#= kendo.format('{0:HH:mm}', new Date(value)) #"
        }
      });
    </script>
```
