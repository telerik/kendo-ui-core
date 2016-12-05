---
title: Handle Right Click in Charts
page_title: Handle Right Click in Charts | Kendo UI Charts
description: "Learn how to handle the right click in Kendo UI Charts."
previous_url: /controls/charts/how-to/handle-chart-right-click
slug: howto_handlerightclick_charts
---

# Handle Right Click in Charts

The example below demonstrates how to handle the right click in Kendo UI Charts.

###### Example

```html
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
          $("#chart").getKendoChart()._click(e);
          	alert("Right clicked!");
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
* [How to Place Text in the Center of Donut Charts]({% slug howto_placetextinthecentre_donutcharts %})
* [How to Render Custom Plot Bands]({% slug howto_rendercustomplotbands_charts %})
* [How to Set Different Marker Types for Grouped Line Charts]({% slug howto_setdifrerentmarkers_forgroupedlinecharts_charts %})
* [How to Use Linear Gradient As Background in Bars]({% slug howto_uselineargradient_inbars_charts %})

For more runnable examples on Kendo UI Charts, browse the [**How To** documentation folder]({% slug howto_createdynamicplotbands_charts %}).
