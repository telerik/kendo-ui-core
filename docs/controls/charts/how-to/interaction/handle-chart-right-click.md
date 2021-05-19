---
title: Handle Right Click in Charts
page_title: Handle Right Click in Charts | Kendo UI Charts
description: "Learn how to handle the right click in Kendo UI Charts."
previous_url: /controls/charts/how-to/handle-chart-right-click
slug: howto_handlerightclick_charts
---

# Handle Right Click in Charts

The following example demonstrates how to handle the right click in Kendo UI Charts.

```dojo
    <div id="chart"></div>
    <script>
       $("#chart").kendoChart({
          title: {
            text: "Gross domestic product growth /GDP annual %/"
          },
          legend: {
            position: "top"
          },
          seriesDefaults: {
            type: "column"
          },
          series: [{          
            name: "World",
            data: [1, 2, 3, 4, 5]
          }],         
          categoryAxis: {
            categories: [2002, 2003, 2004, 2005, 2006]
          }
        });

        $("#chart").on("contextmenu", function(e) {
          e.preventDefault();        
          	alert("Right clicked!");
        });
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
