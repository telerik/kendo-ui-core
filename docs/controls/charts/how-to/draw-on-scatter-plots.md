---
title: Draw on the chart surface of scatter plots
page_title: Draw on the chart surface of scatter plots
description: Draw custom shapes on the surface of scatter plots
---

# Draw on the chart surface of scatter plots

The example below demonstrates how to draw freely on the surface of a Kendo UI Chart with scatter series.

We'll draw a rectangle with gradient fill on a scatter plot at specified coordinates.
Custom elements should be created in the [render event](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart#events-render)
to ensure they survive redraws.

For a list of all available drawing primitives see [Drawing API](http://docs.telerik.com/kendo-ui/framework/drawing/overview).

#### Example:

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
