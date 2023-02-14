---
title: Show Chart Labels over Nested Donuts
page_title: Show Chart Labels over Nested Donuts
description: "Learn how to show labels over nested rings of a Kendo UI Donut Chart."
previous_url: /controls/charts/how-to/show-labels-for-inner-ring-donut, /controls/charts/how-to/appearance/show-labels-for-inner-ring-donut
slug: howto_showlabelsovernesteddonuts_charts
tags: chart, show, labels, over, nested, donuts
component: chart
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Chart for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I display the Chart labels over its nested rings?

## Solution

The following example demonstrates how to configure such behavior.

```dojo
    <base href="https://demos.telerik.com/kendo-ui/donut-charts/index">

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

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
