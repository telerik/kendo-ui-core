---
title: Use Linear Gradient As Background in Bars
page_title: Use Linear Gradient As Background in Bars | Kendo UI Charts
description: "Learn how to use linear gradients as background in bars when working with the Kendo UI Charts."
slug: howto_uselineargradient_inbars_charts
---

# Use Linear Gradient As Background in Bars

The example below demonstrates how to use the Linear Gradient as a background in bars when working with Kendo UI Charts.

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

Other articles and how-to examples on Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Create Dynamic Plot Bands]({% slug howto_createdynamicplotbands_charts %})
* [How to Create Stock Charts in AngularJS]({% slug howto_createstockcharts_angularjs %})
* [How to Create Timeline Using Range Bars]({% slug howto_createtimeline_usingrangebars_charts %})
* [How to Customize Chart Themes]({% slug howto_customizechartthemes_charts %})
* [How to Display Checkboxes Next to Legend Items]({% slug howto_displaycheckboxes_nexttolegenditems_charts %})
* [How to Display Time on Value Axis]({% slug howto_displaytimeonvalueaxis_charts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
* [How to Explode Clicked Segment in Pie Charts]({% slug howto_explodeclickedsegment_piecharts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
* [How to Handle Right Click in Charts]({% slug howto_handlerightclick_charts %})
* [How to Place Text in the Center of Donut Charts]({% slug howto_placetextinthecentre_donutcharts %})
* [How to Render Custom Plot Bands]({% slug howto_rendercustomplotbands_charts %})
* [How to Set Different Marker Types for Grouped Line Charts]({% slug howto_setdifrerentmarkers_forgroupedlinecharts_charts %})
* [How to Shorten Chart Labels]({% slug howto_shortenchartlabels_charts %})
* [How to Show Message When Chart Has No Data]({% slug howto_showemptymessage_whencharthasnodata_charts %})
* [How to Show Overlay While Loading]({% slug howto_showoverlaywhileloading_charts %})
* [How to Show Tooltip on seriesClick]({% slug howto_tooltiponseriesclick_charts %})
* [How to Show Total for Stacked Series]({% slug howto_showtotalstacked_charts %})
* [How to Sort Categories in Grouped Charts]({% slug howto_sortcategorisinagroupedchart_charts %})
* [How to Use Fixed Bar Size]({% slug howto_usefixedbarsize_charts %})
* [How to Use Hyperlinks in Axes Labels]({% slug howto_usehyperlinks_inaxislabels_charts %})

For more runnable examples on Kendo UI Charts, browse the [how-to articles]({% slug howto_createdynamicplotbands_charts %}).
