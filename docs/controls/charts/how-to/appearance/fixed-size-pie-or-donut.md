---
title: Create Fixed-Size Pie or Donut Charts
page_title: Create Fixed-Size Pie or Donut Charts | Kendo UI Charts
description: "Learn how to create fixed-size Pie or Donut Kendo UI Charts."
previous_url: /controls/charts/how-to/fixed-size-pie-or-donut
slug: howto_fixedsizepiedonut_charts
---

# Create Fixed-Size Pie or Donut Charts

Normally, the plot area size is determined by the free space left by other Chart elements such as the title, the legend, and others. This means that it is hard to produce Pie or Donut Charts that have the same diameter.

To work around this issue, remove the legend from the normal element flow by setting the [legend position](/api/javascript/dataviz/ui/chart#configuration-legend.position) to `"custom"`.

To make room for the legend, set a fixed `plotArea.height` for all charts and position it by using the [`offsetX`/`offsetY`](/api/javascript/dataviz/ui/chart#configuration-legend.offsetX) configuration options.

The example below demonstrates how to store and load the axis range. The changes are detected in the [`drag`](/api/javascript/dataviz/ui/chart#events-drag) and [`zoom`](/api/javascript/dataviz/ui/chart#events-zoom) events. The axis range is restored in the [`dataBound` event](/api/javascript/dataviz/ui/chart#events-dataBound).

###### Example

```html
    <style>
        .k-chart {
            width: 300px;
            height: 300px;
            float: left;
        }
    </style>
    <div id="chart-1"></div>
    <div id="chart-2"></div>
    <script>
        $(function() {
            var CONTAINER_SIZE = 300;
            var LEGEND_SIZE = 50;
            var LEGEND_OFFSET = CONTAINER_SIZE - LEGEND_SIZE;

            var legend = {
                position: "custom",
                orientation: "horizontal",
                offsetY: LEGEND_OFFSET
            };

            var plotArea = {
                height: LEGEND_OFFSET
            };

            $("#chart-1").kendoChart({
              legend: legend,
              plotArea: plotArea,
              seriesDefaults: {
                type: "donut"
              },
              series: [{
                name: "2011",
                data: [{
                  category: "Asia",
                  value: 30.8,
                  color: "#9de219"
                },{
                  category: "Europe",
                  value: 21.1,
                  color: "#90cc38"
                },{
                  category: "Latin America",
                  value: 16.3,
                  color: "#068c35"
                },{
                  category: "Africa",
                  value: 17.6,
                  color: "#006634"
                },{
                  category: "Middle East",
                  value: 9.2,
                  color: "#004d38"
                },{
                  category: "North America",
                  value: 4.6,
                  color: "#033939"
                }]
              }]
            });

            $("#chart-2").kendoChart({
              legend: legend,
              plotArea: plotArea,
              seriesDefaults: {
                type: "donut"
              },
              series: [{
                name: "2011",
                data: [{
                  category: "Foo Foo Foo Foo Foo Foo Foo Foo",
                  value: 21.1,
                  color: "#90cc38"
                },{
                  category: "Bar Bar Bar Bar Bar Bar Bar Bar",
                  value: 16.3,
                  color: "#068c35"
                },{
                  category: "Baz Baz Baz Baz Baz Baz Baz Baz",
                  value: 17.6,
                  color: "#006634"
                }]
              }]
            });
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
* [How to Set Different Marker Types for Grouped Line Charts]({% slug howto_setdifrerentmarkers_forgroupedlinecharts_charts %})
* [How to Use Linear Gradient As Background in Bars]({% slug howto_uselineargradient_inbars_charts %})

For more runnable examples on Kendo UI Charts, browse the [**How To** documentation folder]({% slug howto_createdynamicplotbands_charts %}).
