---
title: Render Custom Plot Bands
page_title: Render Custom Plot Bands | Kendo UI Charts
description: "Learn how to create your own plot bands as a custom overlay in a Kendo UI Chart."
previous_url: /controls/charts/how-to/custom-plot-bands
slug: howto_rendercustomplotbands_charts
---

# Render Custom Plot Bands

You might need to create your own plot bands as a custom overlay.

To achieve this behavior, create custom elements in the [`render` event](/api/javascript/dataviz/ui/chart#events-render) to ensure they survive redraws. Note that you can extend the techniques shown here to create much more complex annotations as well.

For a list of all available drawing primitives, refer to the introductory article on the [Drawing API]({% slug overview_kendoui_drawingapi %}).

## In Column Charts

The example below demonstrates how to render a custom plot band in a Column Kendo UI Chart.

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

The example below demonstrates how to render a custom plot band in a Bar Kendo UI Chart.

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

Other articles and how-to examples on the Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
* [How to Handle Right Click in Charts]({% slug howto_handlerightclick_charts %})
* [How to Place Text in the Center of Donut Charts]({% slug howto_placetextinthecentre_donutcharts %})
* [How to Set Different Marker Types for Grouped Line Charts]({% slug howto_setdifrerentmarkers_forgroupedlinecharts_charts %})
* [How to Use Linear Gradient As Background in Bars]({% slug howto_uselineargradient_inbars_charts %})

For more runnable examples on Kendo UI Charts, browse the [**How To** documentation folder]({% slug howto_createdynamicplotbands_charts %}).
