---
title: Render Custom Plot Bands
page_title: Render Custom Plot Bands | Kendo UI Charts
description: "Learn how to create your own plot bands as a custom overlay in a Kendo UI Chart."
slug: howto_rendercustomplotbands_charts
---

# Render Custom Plot Bands

The example below demonstrates how to create our own plot bands as a custom overlay. Create custom elements in the [`render` event](/api/javascript/dataviz/ui/chart#events-render) to ensure they survive redraws. Note that you can extend the techniques shown here to create much more complex annotations as well.

For a list of all available drawing primitives, refer to the [Drawing API article](/framework/drawing/overview).

## In Column Charts

The example below demonstrates how to render a custom plot band in a column Kendo UI Chart.

###### Example

```html
    <div id="chart" />
    <script>
      $("#chart").kendoChart({
        valueAxis: {
          name: "valueAxis",
          min: 0,
          max: 700
        },
        categoryAxis: {
          name: "categoryAxis"
        },
        series: [{
          type: "column",
          data: [500, 650]
        }],
        render: function(e) {
          // Locate value slot
          //
          // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/chart/chart_axis#methods-slot
          var valueAxis = e.sender.getAxis("valueAxis");
          var valueSlot = valueAxis.slot(650);

          // Locate right-most category slot
          //
          var categoryAxis = e.sender.getAxis("categoryAxis");
          var lastCategoryIndex = Math.max(1, categoryAxis.range().max);
          var minCategorySlot = categoryAxis.slot(0);
          var maxCategorySlot = categoryAxis.slot(lastCategoryIndex);

          // Render a line element
          //
          // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/drawing/text
          var line = new kendo.drawing.Path({
            stroke: {
              color: "red",
              width: 3
            }
          });
          line.moveTo(valueSlot.origin).lineTo([maxCategorySlot.origin.x, valueSlot.origin.y]);

          // Render a text element
          //
          // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/drawing/text
          var labelPos = [maxCategorySlot.origin.x - 50, valueSlot.origin.y - 20];
          var label = new kendo.drawing.Text("MAX", labelPos, {
            fill: {
              color: "red"
            },
            font: "14px sans"
          });

          var group = new kendo.drawing.Group();
          group.append(line, label);

          // Draw on chart surface
          //
          // http://docs.telerik.com/kendo-ui/framework/drawing/overview
          e.sender.surface.draw(group);
        }
      });
    </script>
```

## In Bar Charts

The example below demonstrates how to render a custom plot band in a bar Kendo UI Chart.

###### Example

```html
    <div id="chart" />
    <script>
      $("#chart").kendoChart({
        valueAxis: {
          name: "valueAxis",
          min: 0,
          max: 700
        },
        categoryAxis: {
          name: "categoryAxis"
        },
        series: [{
          type: "bar",
          data: [500, 650]
        }],
        render: function(e) {
          // Locate value slot
          //
          // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/chart/chart_axis#methods-slot
          var valueAxis = e.sender.getAxis("valueAxis");
          var valueSlot = valueAxis.slot(650);

          // Locate right-most category slot
          //
          var categoryAxis = e.sender.getAxis("categoryAxis");
          var lastCategoryIndex = Math.max(1, categoryAxis.range().max);
          var minCategorySlot = categoryAxis.slot(0);
          var maxCategorySlot = categoryAxis.slot(lastCategoryIndex);

          // Render a line element
          //
          // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/drawing/text
          var line = new kendo.drawing.Path({
            stroke: {
              color: "red",
              width: 3
            }
          });
          line.moveTo(valueSlot.origin).lineTo([valueSlot.origin.x, minCategorySlot.origin.y]);

          // Render a text element
          //
          // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/drawing/text
          var labelPos = [valueSlot.origin.x + 10, maxCategorySlot.origin.y - 30];
          var label = new kendo.drawing.Text("MAX", labelPos, {
            fill: {
              color: "red"
            },
            font: "14px sans"
          });

          var group = new kendo.drawing.Group();
          group.append(line, label);

          // Draw on chart surface
          //
          // http://docs.telerik.com/kendo-ui/framework/drawing/overview
          e.sender.surface.draw(group);
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
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
* [How to Explode Clicked Segment in Pie Charts]({% slug howto_explodeclickedsegment_piecharts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
* [How to Handle Right Click in Charts]({% slug howto_handlerightclick_charts %})
* [How to Implement Color-Coded Ranges in Bars]({% slug howto_implementcolorcodedranges_inbars_charts %})
* [How to Place Text in the Center of Donut Charts]({% slug howto_placetextinthecentre_donutcharts %})
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
