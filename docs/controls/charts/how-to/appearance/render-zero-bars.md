---
title: Render Element for Zero Bars
page_title: Render Element for Zero Bars | Kendo UI Charts
description: "Learn how to render an element for the bars with a zero value with the Kendo UI Charts."
previous_url: /controls/charts/how-to/render-zero-bars
slug: howto_renderzerobars_charts
---

# Render Element for Zero Bars

By default, bars with a zero value are not rendered because they have a zero size.

The following example demonstrates how to use the [`series.visual`](/api/javascript/dataviz/ui/chart/configuration/series.visual) function to render an element for zero bars.

###### Example

```dojo
    <div id="chart"></div>
    <script>
        var ZERO_BAR_SIZE = 2;

        $("#chart").kendoChart({
          seriesDefaults: {
            type: "column",
            visual: function(e) {
              var visual;
              if (e.value === 0) {
                e.rect.origin.y -= ZERO_BAR_SIZE;
                e.rect.size.height = ZERO_BAR_SIZE;

                visual = new kendo.drawing.Rect(e.rect, {
                  fill: {
                    color: e.options.color
                  },
                  stroke: null
                });
              } else {
                visual = e.createVisual();
              }

              return visual;
            }
          },
          series: [{
            data: [1, 0, 1]
          }, {
            data: [0, 1, 1]
          }]
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
