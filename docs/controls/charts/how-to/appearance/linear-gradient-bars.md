---
title: Use Linear Gradient As Background in Bars
page_title: Use Linear Gradient As Background in Bars | Kendo UI Charts
description: "Learn how to use linear gradients as background in bars when working with the Kendo UI Charts."
previous_url: /controls/charts/how-to/linear-gradient-bars
slug: howto_uselineargradient_inbars_charts
---

# Use Linear Gradient As Background in Bars

Some projects might require the setting of custom backgrounds in Kendo UI Bar Charts.

The example below demonstrates how to use the Linear Gradient as such when working with Kendo UI Charts.

###### Example

```html
    <div id="chart" />
    <script>
      kendo.dataviz.Gradients.series1Gradient = {
        type: "linear",
        stops: [{
          offset: 0,
          color: "#ff4350",
          opacity: 0.5
        }, {
          offset: 1,
          color: "#ff9ea5"
        }]
      };

      kendo.dataviz.Gradients.series2Gradient = {
        type: "linear",
        stops: [{
          offset: 0,
          color: "#00acc1",
          opacity: 0.5
        }, {
          offset: 1,
          color: "#80deea"
        }]
      };

      kendo.dataviz.Gradients.series3Gradient = {
        type: "linear",
        stops: [{
          offset: 0,
          color: "#ffbf46",
          opacity: 0.5
        }, {
          offset: 1,
          color: "#ffd78c"
        }]
      };

      $("#chart").kendoChart({
        title: {
          text: "Site Visitors Stats \n /thousands/"
        },
        legend: {
          visible: false
        },
        seriesDefaults: {
          type: "column",

        },
        series: [{
          name: "Total Visits",
          data: [56000, 63000, 74000, 91000, 117000, 138000],
          overlay: {
            gradient: "series1Gradient",
            start: [0.5, 0],
            end: [0.5, 1]
          },
          border: {
            width: 0
          }
        }, {
          name: "Total Visits",
          data: [86000, 23000, 44000, 21000, 57000, 168000],
          overlay: {
            gradient: "series2Gradient",
            start: [0.5, 0],
            end: [0.5, 1]
          },
        }, {
          name: "Unique visitors",
          data: [52000, 34000, 23000, 48000, 67000, 83000],
          overlay: {
            gradient: "series3Gradient",
            start: [0.5, 0],
            end: [0.5, 1]
          },
        }],         
        categoryAxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          majorGridLines: {
            visible: false
          }
        },
        tooltip: {
          visible: true,
          template: "#= series.name #: #= value #"
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

For more runnable examples on Kendo UI Charts, browse the [**How To** documentation folder]({% slug howto_implementcolorcodedranges_inbars_charts %}).
