---
title: Place Text in Donut Chart Center
page_title: Place Text in Donut Chart Center | Kendo UI Charts
description: "Learn how to place some text in the center of a Kendo UI Donut Chart."
slug: howto_placetextinthecentre_donutcharts
---

# Place Text in Donut Chart Center

To display some text in the center of a Kendo UI Donut Chart, use the [`render` event](/api/javascript/dataviz/ui/chart#events-render) to plot Text and other Shapes. First of all, you must locate the center point. The [`series.visual`](/api/javascript/dataviz/ui/chart#configuration-series.visual) provides this information.

The example below demonstrates how to place some text in the center of a Kendo UI Donut Chart.

###### Example

```html
    <div id="chart"></div>
    <script>
      function createChart() {
        var center;
        var radius;

        $("#chart").kendoChart({
          title: {
            position: "bottom",
            text: "Share of Internet Population Growth, 2007 - 2012"
          },
          legend: {
            visible: false
          },
          chartArea: {
            background: ""
          },
          series: [{
            type: "donut",
            startAngle: 150,
            visual: function(e) {
              // Obtain parameters for the segments
              // Will run many times, but that's not an issue
              center = e.center;
              radius = e.radius;

              // Create default visual
              return e.createVisual();
            },
            data: [{
              category: "Asia",
              value: 53.8,
              color: "#9de219"
            },{
              category: "Europe",
              value: 16.1,
              color: "#90cc38"
            },{
              category: "Latin America",
              value: 11.3,
              color: "#068c35"
            },{
              category: "Africa",
              value: 9.6,
              color: "#006634"
            },{
              category: "Middle East",
              value: 5.2,
              color: "#004d38"
            },{
              category: "North America",
              value: 3.6,
              color: "#033939"
            }]
          }],
          tooltip: {
            visible: true,
            format: "{0}%"
          },
          render: function(e) {
            var draw = kendo.drawing;
            var geom = kendo.geometry;
            var chart = e.sender;

            // The center and radius are populated by now.
            // We can ask a circle geometry to calculate the bounding rectangle for us.
            //
            // http://docs.telerik.com/kendo-ui/api/javascript/geometry/circle#methods-bbox
            var circleGeometry = new geom.Circle(center, radius);
            var bbox = circleGeometry.bbox();

            // Render the text
            //
            // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/drawing/text
            var text = new draw.Text("Foo & Bar", [0, 0], {
              font: "18px Verdana,Arial,sans-serif"
            });

            // Align the text in the bounding box
            //
            // http://docs.telerik.com/kendo-ui/api/javascript/drawing#methods-align
            // http://docs.telerik.com/kendo-ui/api/javascript/drawing#methods-vAlign
            draw.align([text], bbox, "center");
            draw.vAlign([text], bbox, "center");

            // Draw it on the Chart drawing surface
            e.sender.surface.draw(text);
          }
        });
      }

      $(document).ready(createChart);
    </script>
```


As an alternative, we can position an overlay using CSS:

#### Example - Overlay Donut Chart

```html
    <div class="donut-wrapper">
      <div id="chart" class="donut-chart"></div>
      <div class="inner-content"></div>
    </div>

    <script>
    $(document).ready(function() {
       var data = [{
          category: "Asia",
          value: 3.6,
          color: "#a2ccef"
        },{
          category: "Europe",
          value: 2.4,
          color: "#eeeeef"
        }]

        var ds = new kendo.data.DataSource({
          data: data
        });

        $("#chart").kendoChart({
          title: {
            visible: false
          },
          dataSource: ds,
          legend: {
            visible: false
          },
          chartArea: {
            background: ""
          },
          seriesDefaults: {
            type: "donut",
            startAngle: 90,
            holeSize: 120,
          },
          series: [{
            name: "2011",
            field: "value"
          }],
          tooltip: {
            visible: true,
            template: "#= category # (#= series.name #): #= value #%"
          }
        });

        var text = "Custom Text"
        $(".inner-content").text(text);
    });
    </script>

    <style>
      .donut-wrapper {
        position: relative;
        width: 280px;
        height: 280px;
        background-color: #3f3f3f;
      }

      /* The width and height of the chart must be equal to the width and height of the .donut-wrapper in order to be horizontally and vertically centered  */
      .donut-chart {
        width: 280px;
        height: 280px;
      }

      .inner-content {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        margin-top: -50px;
        margin-left: -50px;
        font-size: 16px;
        line-height: 100px;
        vertical-align: middle;
        text-align: center;
        color: #a2ccef;
      }
    </style>
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
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
* [How to Explode Clicked Segment in Pie Charts]({% slug howto_explodeclickedsegment_piecharts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
* [How to Handle Right Click in Charts]({% slug howto_handlerightclick_charts %})
* [How to Implement Color-Coded Ranges in Bars]({% slug howto_implementcolorcodedranges_inbars_charts %})
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
