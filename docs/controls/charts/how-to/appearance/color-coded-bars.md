---
title: Implement Color-Coded Ranges in Bars
page_title: Implement Color-Coded Ranges in Bars | Kendo UI Charts
description: "Learn how to implement color-coded ranges in bars when working with the Kendo UI Charts."
previous_url: /controls/charts/how-to/color-coded-bars
slug: howto_implementcolorcodedranges_inbars_charts
---

# Implement Color-Coded Ranges in Bars

Color ranges can be used to convey additional information&mdash;for example, value composition.

This behavior is usually achieved through stacked bar series. However, if you need to convey more flexibility, consider the following Chart.

**Figure 1. Color ranges in a Kendo UI Chart**

![Color-coded ranges](/controls/charts/how-to/images/color-coded-bars.png)

To implement this functionality, define a [`series.visual`](/api/javascript/dataviz/ui/chart#configuration-series.visual) that draws the ranges dynamically. Note that the visual remains in use until the next [`render` event](/api/javascript/dataviz/ui/chart#events-render). This allows you to update it asynchronously or in real-time.

The example below demonstrates how to implement color-coded ranges (stripes) in bars when working with Kendo UI Charts.

###### Example

```html
    <div id="chart" />
    <script>
      var WIDTH = 5;
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      $("#chart").kendoChart({
        series: [{
          type: "bar",
          data: [10, 20, 30],
          // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart#configuration-series.visual
          visual: function(e) {
            // http://docs.telerik.com/kendo-ui/api/javascript/geometry/rect
            var left = e.rect.topLeft();
            var right = e.rect.topRight();
            var bottom = e.rect.bottomLeft();

            // http://docs.telerik.com/kendo-ui/api/javascript/drawing/group
            var group = new draw.Group();

            for (var x = left.x; x < right.x; x += WIDTH) {
              var rect = new geom.Rect([x, left.y], [WIDTH, e.rect.height()])

              // http://docs.telerik.com/kendo-ui/api/javascript/drawing/path
              var value = Math.random();
              var path = draw.Path.fromRect(rect, {
                fill: {
                  color: value > 0.5 ? "green" : "lightgreen"
                },
                stroke: null,

                // Custom field
                value: value
              });

              group.append(path);
            }

            return group;
          }
        }]
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
