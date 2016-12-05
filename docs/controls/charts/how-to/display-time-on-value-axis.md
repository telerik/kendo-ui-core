---
title: Display Time on Value Axis
page_title: Display Time on Value Axis | Kendo UI Charts
description: "Learn how to display time on the value axis of categorical Kendo UI Charts."
slug: howto_displaytimeonvalueaxis_charts
---

# Display Time on Value Axis

The `valueAxis` on categorical Kendo UI Charts supports the display of numbers only.

However, it is possible to render date and time values by representing the dates as numeric values.

> **Important**
>
> Kendo UI Scatter Charts support the display of dates on the `xAxis` and `yAxis` natively.

The example below demonstrates how to display time on the value axis of categorical Kendo UI Charts.

###### Example

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

## See Also

Other articles and how-to examples on the Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
* [How to Handle Right Click in Charts]({% slug howto_handlerightclick_charts %})
* [How to Place Text in the Center of Donut Charts]({% slug howto_placetextinthecentre_donutcharts %})
* [How to Render Custom Plot Bands]({% slug howto_rendercustomplotbands_charts %})
* [How to Set Different Marker Types for Grouped Line Charts]({% slug howto_setdifrerentmarkers_forgroupedlinecharts_charts %})
* [How to Use Linear Gradient As Background in Bars]({% slug howto_uselineargradient_inbars_charts %})

For more runnable examples on Kendo UI Charts, browse the [**How To** documentation folder]({% slug howto_createdynamicplotbands_charts %}).
