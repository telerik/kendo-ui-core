---
title: Expand Clickable Area of Points
page_title: Expand Clickable Area of Points | Kendo UI Charts
description: "Learn how to extend the clickable or touchable area of points in a Kendo UI Chart."
previous_url: /controls/charts/how-to/expand-clickable-area
slug: howto_extendclickableareaofpoints_charts
---

# Expand Clickable Area of Points

In some scenarios, the Kendo UI Charts produce series of points that are too small to be reliably clicked or touched.

It is possible to expand the active area by adding a transparent element as part of the [`visual`](/api/javascript/dataviz/ui/chart#configuration-series.visual) configuration.

The example below demonstrates how to achieve this behavior in a Bar Charts series.

###### Example

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

The example below demonstrates how to expand the clickable or touchable area of points in a line series.

###### Example

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

## See Also

Other articles and how-to examples on the Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
* [How to Handle Right Click in Charts]({% slug howto_handlerightclick_charts %})
* [How to Place Text in the Center of Donut Charts]({% slug howto_placetextinthecentre_donutcharts %})
* [How to Render Custom Plot Bands]({% slug howto_rendercustomplotbands_charts %})
* [How to Set Different Marker Types for Grouped Line Charts]({% slug howto_setdifrerentmarkers_forgroupedlinecharts_charts %})
* [How to Use Linear Gradient As Background in Bars]({% slug howto_uselineargradient_inbars_charts %})

For more runnable examples on Kendo UI Charts, browse the [**How To** documentation folder]({% slug howto_createdynamicplotbands_charts %}).
