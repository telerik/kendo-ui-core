---
title: Expand Clickable Area of Points
page_title: Expand Clickable Area of Points | Kendo UI Charts
description: "Learn how to extend the clickable or touchable area of points in a Kendo UI Chart."
slug: howto_extendclickableareaofpoints_charts
---

# Expand Clickable Area of Points

In some scenarios Kendo UI Charts produce series of points that are too small to be reliably clicked or touched. It is possible to expand the active area by adding a transparent element as part of the [`visual`](/api/javascript/dataviz/ui/chart#configuration-series.visual).

The example below demonstrates how to expand the clickable or touchable area of points in a bar series.

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

Other articles and how-to examples on Kendo UI Charts:

* [`kendo.drawing.Element.transform`](/api/javascript/drawing/element#configuration-transform)
* [`kendo.geometry.transformation.scale`](/api/javascript/geometry/transformation#methods-scale)
* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Create Dynamic Plot Bands]({% slug howto_createdynamicplotbands_charts %})
* [How to Create Stock Charts in AngularJS]({% slug howto_createstockcharts_angularjs %})
* [How to Create Timeline Using Range Bars]({% slug howto_createtimeline_usingrangebars_charts %})
* [How to Customize Chart Themes]({% slug howto_customizechartthemes_charts %})
* [How to Display Checkboxes Next to Legend Items]({% slug howto_displaycheckboxes_nexttolegenditems_charts %})
* [How to Display Time on Value Axis]({% slug howto_displaytimeonvalueaxis_charts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
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
