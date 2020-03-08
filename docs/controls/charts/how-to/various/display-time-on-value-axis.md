---
title: Display Time on Value Axis
page_title: Display Time on Value Axis | Kendo UI Charts
description: "Learn how to display time on the value axis of categorical Kendo UI Charts."
previous_url: /controls/charts/how-to/display-time-on-value-axis
slug: howto_displaytimeonvalueaxis_charts
---

# Display Time on Value Axis

The `valueAxis` on categorical Kendo UI Charts supports the display of numbers only.

However, it is possible to render date and time values by representing the dates as numeric values.

> Kendo UI Scatter Charts support the display of dates on the `xAxis` and `yAxis` natively.

The following example demonstrates how to display time on the value axis of categorical Kendo UI Charts.

```dojo
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

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
