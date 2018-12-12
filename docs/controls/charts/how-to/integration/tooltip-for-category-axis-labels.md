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

```dojo
<div id="chart"></div>
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
          // The original label visual
          var labelVisual = e.createVisual();

          // Set the drawing tooltip options
          // https://demos.telerik.com/kendo-ui/drawing/tooltip
          labelVisual.options.tooltip = {
            content: e.text
          };

          return labelVisual;
        }
      }
    }
  });
</script>

```

## See Also

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

For more runnable examples on Kendo UI Charts, browse the [**How To** documentation folder]({% slug howto_implementcolorcodedranges_inbars_charts %}).
