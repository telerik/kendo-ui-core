---
title: Use Drawing API to Show Custom Tooltip for categoryAxis Labels
page_title: Use Drawing API to Show Custom Tooltip for categoryAxis Labels | Kendo UI Charts
description: "Learn how to show tooltips for the categoryAxis labels."
previous_url: /controls/charts/how-to/tooltip-for-category-axis-labels
slug: howto_showtooltipforaxislabels_charts
---

# Use Drawing API to Show Custom Tooltip for categoryAxis Labels

It is possible for you to display a tooltip for `categoryAxis` labels through the [Drawing library]({% slug overview_kendoui_drawingapi %}).

The following example demonstrates how to achieve this behavior. Note that the tooltip is displayed when hovering a `categoryAxis` label.

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
