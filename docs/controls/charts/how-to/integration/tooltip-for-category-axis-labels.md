---
title: Use Drawing API to Show Custom Tooltip for categoryAxis Labels
page_title: Use Drawing API to Show Custom Tooltip for categoryAxis Labels | Kendo UI Charts
description: "Learn how to show tooltips for the categoryAxis labels."
previous_url: /controls/charts/how-to/tooltip-for-category-axis-labels
slug: howto_showtooltipforaxislabels_charts
---

# Use Drawing API to Show Custom Tooltip for categoryAxis Labels

It is possible for you to display a tooltip for `categoryAxis` labels through the [drawing API]({% slug overview_kendoui_drawingapi %}).

The example below demonstrates how to achieve this behavior. Note that the tooltip is displayed when hovering a `categoryAxis` label.

###### Example

```html
<div id="chart"></div>
<div class="customTooltip">CustomTooltip</div>
<script>
  $("#chart").kendoChart({
    series: [{
      data: [{
        value: 1
      }, {
        value: 2
      }, {
        value: 3
      }]
    }],
    categoryAxis: {
      categories: ["Cat 1", "Cat 2", "Cat 3"],
      labels: {
        visual: function (e) {
          // The actual label
          var labelVisual = e.createVisual();
          var bbox = labelVisual.bbox();

          // An invisible rectangle to serve as a hot zone
          var sink = kendo.drawing.Path.fromRect(bbox, {
            stroke: null,
            fill: {
              color: "#fff",
              opacity: 0
            }
          });

          // Maintain reference for event handlers
          sink.tooltipText = e.text;

          var visual = new kendo.drawing.Group();
          visual.append(labelVisual, sink);
          return visual;
        }
      }
    },

    render: function(e) {
      var tooltip = $(".customTooltip");
      e.sender.surface.bind("mouseenter", function(e) {
        if (e.element.tooltipText) {
          var pos = e.element.bbox().getOrigin();
          tooltip.html(e.element.tooltipText)
                 .css({ left: pos.x, top: pos.y + 30 })
                 .show();
        }
      });
      e.sender.surface.bind("mouseleave", function(e) {
        if (e.element.tooltipText) {
          tooltip.hide();
        }
      });
    }
  });
</script>
<style>
  .customTooltip {
    position:absolute;
    display: none;
    color: #fff;
    font-size: 20px Arial, sans-serif;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    background: green;
    width: 200px;
    height: 20px;
  }
</style>
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
