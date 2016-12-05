---
title: Draw on Scatter Plots Surface
page_title: Draw on Scatter Plots Surface | Kendo UI Charts
description: "Learn how to draw freely on the surface of a Kendo UI Chart with scatter series."
previous_url: /controls/charts/how-to/draw-on-scatter-plots
slug: howto_drawonscatterplotssurface_charts
---

# Draw on Scatter Plots Surface

The Kendo UI Chart with scatter series provides an option for you to freely draw on its surface.

To achieve this behavior:

1. Draw a rectangle with gradient fill on a scatter plot at specified coordinates.
2. Create custom elements in the [`render` event](/api/javascript/dataviz/ui/chart#events-render) to ensure they survive redraws.

For a list of all available drawing primitives, refer to the introductory article on the [Drawing API]({% slug overview_kendoui_drawingapi %}).

The example below demonstrates how to draw freely on the Scatter plot surface.

###### Example

```html
    <div id="chart" />
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var gradient = new draw.LinearGradient({
        start: [ 0, 0 ], // Bottom left
        end: [ 0, 1 ],   // Top left
        stops: [{
          offset: 0,
          color: "#f00",
          opacity: 0
        }, {
          offset: 1,
          color: "#f00",
          opacity: 1
        }]
      });

      $("#chart").kendoChart({
        series: [{
          type: "scatter",
          data: [[1, 1], [-100, -100]]
        }],
        xAxis: {
          name: "xAxis"
        },
        yAxis: {
          name: "yAxis"
        },
        render: function(e) {
            var chart = e.sender;
            var xAxis = chart.getAxis("xAxis");
            var yAxis = chart.getAxis("yAxis");
            var xSlot = xAxis.slot(-80, -20);
            var ySlot = yAxis.slot(-20, -80);

            var rect = new geom.Rect([
              // Origin X, Y
              xSlot.origin.x, ySlot.origin.y
            ], [
              // Width, height
              xSlot.width(), ySlot.height()
            ]);

            var path = draw.Path.fromRect(rect, {
              stroke: null,
              fill: gradient
            });

            chart.surface.draw(path);
        }
      });
    </script>
```

## See Also

Other articles and how-to examples on the Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
* [How to Handle Right Click in Charts]({% slug howto_handlerightclick_charts %})
* [How to Place Text in the Center of Donut Charts]({% slug howto_placetextinthecentre_donutcharts %})
* [How to Render Custom Plot Bands]({% slug howto_rendercustomplotbands_charts %})
* [How to Set Different Marker Types for Grouped Line Charts]({% slug howto_setdifrerentmarkers_forgroupedlinecharts_charts %})
* [How to Use Linear Gradient As Background in Bars]({% slug howto_uselineargradient_inbars_charts %})

For more runnable examples on Kendo UI Charts, browse the [**How To** documentation folder]({% slug howto_createdynamicplotbands_charts %}).
