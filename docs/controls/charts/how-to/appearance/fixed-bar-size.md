---
title: Use Fixed Bar Size
page_title: Use Fixed Bar Size | Kendo UI Charts
description: "Learn how to use bars of a fixed size when working with the Kendo UI Charts."
previous_url: /controls/charts/how-to/fixed-bar-size
slug: howto_usefixedbarsize_charts
---

# Use Fixed Bar Size

You might need to set the size of the default drawing element of the bars to the same size.

The example below demonstrates how to use the [`series.visual`](/api/javascript/dataviz/ui/chart#configuration-series.visual) function to scale the default drawing element of the bars and achieve this behavior.

###### Example

```html
    <div id="chart"></div>
    <script>
      var BAR_SIZE = 10;
      $("#chart").kendoChart({
        series: [{
          type: "bar",
          data: [1, 2],
          visual: function(e) {
            //create the default visual
            var visual = e.createVisual();        
            //scale it so that it has the predefined size
            visual.transform(kendo.geometry.transform().scale(1, BAR_SIZE / e.rect.size.height, e.rect.center() ));
            return visual;
          }
        }]            
      });
    </script>
    </div>
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
