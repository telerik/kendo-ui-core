---
title: Create Dynamic Plot Bands
page_title: Create Dynamic Plot Bands | Kendo UI Charts
description: "Learn how to create dynamic plot bands for Kendo UI Charts."
previous_url: /controls/charts/how-to/dynamic-plot-bands
slug: howto_createdynamicplotbands_charts
---

# Create Dynamic Plot Bands

You might need to highlight data in a Kendo UI Chart by using dynamic plot bands.

The example below demonstrates how to achieve this behavior.

###### Example

```html
   <div id="chart"></div>
   <button>Change plot band</button>

    <script>
      $("#chart").kendoChart({
        categoryAxis: {
          type: "date",
          categories: [new Date("2014/01/01"), new Date("2014/01/02"), new Date("2014/01/31")],
          plotBands: [{
            from: new Date("2014/01/02"),
            to: new Date("2014/01/02"),
            color: "red"
          }]
        }
      });

      function showPlotBand(element, band) {
        var plotBands = [ band ];
        var axisNames = ["valueAxis", "xAxis", "categoryAxis"];
        var options = {};

        for (var i = 0; i < axisNames.length; i++) {
          options[axisNames[i]] = { plotBands: plotBands };
        }

        var chart = $(element).data("kendoChart");
        chart.setOptions(options);
      }

      $("button").click(function(){
        // shows a random plot band
        var start = new Date(2014, 0, 1 + Math.floor(Math.random() * 30));
        var end = new Date(start.getTime() + 1000 * 3600 * 24); // 24 hours after start

        showPlotBand("#chart", {
            from: start,
            to: end,
            color: "green"
        });
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
* [How to Render Custom Plot Bands]({% slug howto_rendercustomplotbands_charts %})
* [How to Set Different Marker Types for Grouped Line Charts]({% slug howto_setdifrerentmarkers_forgroupedlinecharts_charts %})
* [How to Use Linear Gradient As Background in Bars]({% slug howto_uselineargradient_inbars_charts %})

For more runnable examples on Kendo UI Charts, browse the [**How To** documentation folder]({% slug howto_implementcolorcodedranges_inbars_charts %}).
