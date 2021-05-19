---
title: Expand Clickable Area of Points
page_title: Expand Clickable Area of Points | Kendo UI Charts
description: "Learn how to extend the clickable or touchable area of points in a Kendo UI Chart."
previous_url: /controls/charts/how-to/expand-clickable-area
slug: howto_extendclickableareaofpoints_charts
---

# Expand Clickable Area of Points

In some scenarios, the Kendo UI Charts produce series of points that are too small to be reliably clicked or touched.

It is possible to expand the active area by adding a transparent element as part of the [`visual`](/api/javascript/dataviz/ui/chart/configuration/series.visual) configuration.

The following example demonstrates how to achieve this behavior in a Bar Charts series.

```dojo
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

The following example demonstrates how to expand the clickable or touchable area of points in a line series.

```dojo
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

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
