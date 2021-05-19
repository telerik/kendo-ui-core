---
title: Use Fixed Bar Size
page_title: Use Fixed Bar Size | Kendo UI Charts
description: "Learn how to use bars of a fixed size when working with the Kendo UI Charts."
previous_url: /controls/charts/how-to/fixed-bar-size
slug: howto_usefixedbarsize_charts
---

# Use Fixed Bar Size

You might need to set the size of the default drawing element of the bars to the same size.

The following example demonstrates how to use the [`series.visual`](/api/javascript/dataviz/ui/chart/configuration/series.visual) function to scale the default drawing element of the bars and achieve this behavior.

```dojo
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

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
