---
title: Render an External Legend in the Chart
page_title: Render External Legend in Charts
description: "Learn how to render the Kendo UI Charts legend items as HTML elements outside of the chart."
previous_url: /controls/charts/how-to/external-legend, /controls/charts/how-to/appearance/external-legend
slug: howto_externallegend_charts
tags: chart, render, external, legends
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

How can I render the legend outside the Kendo UI Chart?

## Solution

The following example demonstrates how to achieve this behavior by using HTML.

```dojo
    <style>       
      .legend-item
      {
        font: 12px sans-serif;  
        margin: 2px;
        cursor:pointer;  
      }
      .legend-item .legend-marker
      {
        display:inline-block;
        width:8px;
        height:8px;
      }
    </style>
    <script id="legendItemTemplate" type="text/kendo">
    <span class="legend-item" data-bind="events: {mouseenter: onMouseEnter, mouseleave: onMouseLeave, click: onClick}" >
        <span class="legend-marker" data-bind="style:{background: markerColor}">
      </span>
        <span>
            #:name#
      </span>
      </span>
    </script>
    <div data-bind="source:series" data-template="legendItemTemplate" id="legend">       
    </div>
    <div id='chart'></div>  

    <script>
      function createChart(selector) {
        $(selector).kendoChart({
          title: {
            text: "Gross domestic product growth /GDP annual %/"
          },
          legend: {
            visible: false
          },
          chartArea: {
            background: ""
          },
          seriesDefaults: {
            type: "line",
            style: "smooth"
          },
          series: [{
            name: "India",
            data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
          }, {
            name: "World",
            data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
          }, {
            name: "Russian Federation",
            data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]
          }, {
            name: "Haiti",
            data: [-0.253, 0.362, -3.519, 1.799, 2.252, 3.343, 0.843, 2.877, -5.416, 5.590]
          }],
          valueAxis: {
            labels: {
              format: "{0}%"
            },
            line: {
              visible: false
            },
            axisCrossingValue: -10
          },
          categoryAxis: {
            categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            majorGridLines: {
              visible: false
            }
          },
          tooltip: {
            visible: true,
            format: "{0}%",
            template: "#= series.name #: #= value #"
          }
        });
      }

      $(document).ready(function () {
        createChart("#chart");

        var chart = $("#chart").data("kendoChart");

        var viewModel = kendo.observable({
          series: chart.options.series,
          onMouseEnter: function (e) {
            var name = e.data.name;
            var series = chart.findSeriesByName(name);
            series.toggleHighlight(true);
          },
          onMouseLeave: function (e) {
            var name = e.data.name;
            var series = chart.findSeriesByName(name);
            series.toggleHighlight(false);
          },
          onClick: function (e) {
            var name = e.data.name;
            var series = chart.findSeriesByName(name);

            if(e.data.visible){
              series.toggleVisibility(false);
            }
            else{
              series.toggleVisibility(true);
            }

            e.data.set("visible", !e.data.visible);
          },
          markerColor: function(e) {
            return e.get("visible") ? e.color : "grey";
          }
        });

        kendo.bind($("#legend"), viewModel);

      });

    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
