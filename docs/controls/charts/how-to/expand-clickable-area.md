---
title: Extend the clickable area of points
page_title: Extend the clickable area of series points
description: Demonstrates how to extend the click (touch) area of series points
---

# Extend the clickable area of series points

In some scenarios the chart can produce series points that are too small to reliably click or touch.

It is possible to extend the active area by adding a transparent element as part of the
[visual](/api/javascript/dataviz/ui/chart#configuration-series.visual).

The examples below demonstrates how to do this for bar and line series.

### See Also

* [kendo.drawing.Element.transform](http://docs.telerik.com/kendo-ui/api/javascript/drawing/element#configuration-transform)
* [kendo.geometry.transformation.scale](http://docs.telerik.com/kendo-ui/api/javascript/geometry/transformation#methods-scale)

#### Example: Extend the click (touch) area of bar series
```html
    <div id="chart"></div>
    <div id="log">Click on the area next to a point...</div>
    <script>
      $("#chart").kendoChart({
        series: [{
          type: "column",
          data: [1, 2, 3],
          visual: function(e) {
            var marker = e.createVisual();
            var group = new kendo.drawing.Group();

            // A transparent rectangle that serves as a touch zone
            var touch = kendo.drawing.Path.fromRect(e.rect, {
              transform: kendo.geometry.transform()
              .scale(1.5, 2, e.rect.center()),

              // Comment the following line to see it
              stroke: null,

              fill: {
                color: "#fff",
                opacity: 0
              }
            });

            group.append(touch, marker);
            return group;
          },
          tooltip: {
            visible: true
          }
        }],
        seriesClick: function(e) {
          $("#log").text("Clicked " + e.value);
        }
      });
    </script>
```

#### Example: Extend the click (touch) area of line series
```html
    <div id="chart"></div>
    <div id="log">Click on the area next to a point...</div>
    <script>
      $("#chart").kendoChart({
        series: [{
          type: "line",
          data: [1, 2, 3],
          markers: {
              visual: function(e) {
                var marker = e.createVisual();
                var group = new kendo.drawing.Group();

                // A transparent rectangle that serves as a touch zone
                var touch = kendo.drawing.Path.fromRect(e.rect, {
                  transform: kendo.geometry.transform()
                  .scale(10, 10, e.rect.center()),

                  // Comment the following line to see it
                  stroke: null,

                  fill: {
                    color: "#fff",
                    opacity: 0
                  }
                });

                group.append(touch, marker);
                return group;
              }
          },
          tooltip: {
            visible: true
          }
        }],
        seriesClick: function(e) {
          $("#log").text("Clicked " + e.value);
        }
      });
    </script>
```
