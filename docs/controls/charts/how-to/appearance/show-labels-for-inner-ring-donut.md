---
title: Show Labels over Nested Donuts
page_title: Show Labels over Nested Donuts | Kendo UI Charts
description: "Learn how to show labels over nested rings of a Kendo UI Donut Chart."
previous_url: /controls/charts/how-to/show-labels-for-inner-ring-donut
slug: howto_showlabelsovernesteddonuts_charts
---

# Show Labels over Nested Donuts

The Kendo UI Donut Chart provides an option to display the labels over its nested rings.

The example below demonstrates how to configure such behavior.

###### Example

```html
    <base href="http://demos.telerik.com/kendo-ui/donut-charts/index">

    <div id="example">
      <div class="demo-section k-content wide">
        <div id="chart" style="background: center no-repeat url('../content/shared/styles/world-map.png');"></div>
      </div>
      <script>
        function createChart() {
          $("#chart").kendoChart({
            title: {
              position: "bottom",
              text: "Share of Internet Population Growth"
            },
            legend: {
              visible: false
            },
            chartArea: {
              background: ""
            },
            seriesDefaults: {
              type: "donut",
              labels: {          
                visible: true,
                font: "12px Arial",
                background: "transparent"
              }
            },
            series: [{
              name: "2011",
              data: [{
                category: "Asia",
                value: 30.8,
                color: "#9de219"
              },{
                category: "Europe",
                value: 21.1,
                color: "#90cc38"
              },{
                category: "Latin America",
                value: 16.3,
                color: "#068c35"
              },{
                category: "Africa",
                value: 17.6,
                color: "#006634"
              },{
                category: "Middle East",
                value: 9.2,
                color: "#004d38"
              },{
                category: "North America",
                value: 4.6,
                color: "#033939"
              }]
            }, {
              name: "2012",
              data: [{
                category: "Asia",
                value: 53.8,
                color: "#9de219"
              },{
                category: "Europe",
                value: 16.1,
                color: "#90cc38"
              },{
                category: "Latin America",
                value: 11.3,
                color: "#068c35"
              },{
                category: "Africa",
                value: 9.6,
                color: "#006634"
              },{
                category: "Middle East",
                value: 5.2,
                color: "#004d38"
              },{
                category: "North America",
                value: 3.6,
                color: "#033939"
              }],
              labels: {
                visible: true,
                background: "transparent",
                template: "#= category #: \n #= value#%"
              }
            }],
            tooltip: {
              visible: true,
              template: "#= category # (#= series.name #): #= value #%"
            }
          });
        }
        $(document).ready(createChart);
        $(document).bind("kendo:skinChange", createChart);
      </script>
    </div>
```

## See Also

Other articles and how-to examples on the Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
* [How to Handle Right Click in Charts]({% slug howto_handlerightclick_charts %})
* [How to Place Text in the Center of Donut Charts]({% slug howto_placetextinthecentre_donutcharts %})
* [How to Render Custom Plot Bands]({% slug howto_rendercustomplotbands_charts %})
* [How to Set Different Marker Types for Grouped Line Charts]({% slug howto_setdifrerentmarkers_forgroupedlinecharts_charts %})
* [How to Use Linear Gradient As Background in Bars]({% slug howto_uselineargradient_inbars_charts %})

For more runnable examples on Kendo UI Charts, browse the [**How To** documentation folder]({% slug howto_createdynamicplotbands_charts %}).
