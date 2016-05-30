---
title: Draw on Scatter Plots Surface
page_title: Draw on Scatter Plots Surface | Kendo UI Charts
description: "Learn how to draw freely on the surface of a Kendo UI Chart with scatter series."
slug: howto_drawonscatterplotssurface_charts
---

# Draw on Scatter Plots Surface

The example below demonstrates how to draw freely on the surface of a Kendo UI Chart with scatter series.

First, draw a rectangle with gradient fill on a scatter plot at specified coordinates. Create custom elements in the [`render` event](/api/javascript/dataviz/ui/chart#events-render) to ensure they survive redraws.

For a list of all available drawing primitives, refer to the [Drawing API article](/framework/drawing/overview).

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

Other articles and how-to examples on Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Create Dynamic Plot Bands]({% slug howto_createdynamicplotbands_charts %})
* [How to Create Stock Charts in AngularJS]({% slug howto_createstockcharts_angularjs %})
* [How to Create Timeline Using Range Bars]({% slug howto_createtimeline_usingrangebars_charts %})
* [How to Customize Chart Themes]({% slug howto_customizechartthemes_charts %})
* [How to Display Checkboxes Next to Legend Items]({% slug howto_displaycheckboxes_nexttolegenditems_charts %})
* [How to Display Time on Value Axis]({% slug howto_displaytimeonvalueaxis_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
* [How to Explode Clicked Segment in Pie Charts]({% slug howto_explodeclickedsegment_piecharts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
* [How to Handle Right Click in Charts]({% slug howto_handlerightclick_charts %})
* [How to Implement Color-Coded Ranges in Bars]({% slug howto_implementcolorcodedranges_inbars_charts %})
* [How to Place Text in the Center of Donut Charts]({% slug howto_placetextinthecentre_donutcharts %})
* [How to Render Custom Plot Bands]({% slug howto_rendercustomplotbands_charts %})
* [How to Set Different Marker Types for Grouped Line Charts]({% slug howto_setdifrerentmarkers_forgroupedlinecharts_charts %})
* [How to Shorten Chart Labels]({% slug howto_shortenchartlabels_charts %})
* [How to Show Message When Chart Has No Data]({% slug howto_showemptymessage_whencharthasnodata_charts %})
* [How to Show Overlay While Loading]({% slug howto_showoverlaywhileloading_charts %})
* [How to Show Tooltip on seriesClick]({% slug howto_tooltiponseriesclick_charts %})
* [How to Show Total for Stacked Series]({% slug howto_showtotalstacked_charts %})
* [How to Sort Categories in Grouped Charts]({% slug howto_sortcategorisinagroupedchart_charts %})
* [How to Use Fixed Bar Size]({% slug howto_usefixedbarsize_charts %})
* [How to Use Hyperlinks in Axes Labels]({% slug howto_usehyperlinks_inaxislabels_charts %})
* [How to Use Linear Gradient As Background in Bars]({% slug howto_uselineargradient_inbars_charts %})

For more runnable examples on Kendo UI Charts, browse the [how-to articles]({% slug howto_createdynamicplotbands_charts %}).
