---
title: Maintain the Pan and Zoom State of the Chart on Rebind
page_title: Maintain the Pan and Zoom State of the Chart
description: "Learn how to maintain the axis range after rebinding a Kendo UI Chart."
previous_url: /controls/charts/how-to/maintain-pan-zoom-state, /controls/charts/how-to/state/maintain-pan-zoom-state
slug: howto_panandzoomrebind_charts
tags: chart, keep, pan, and, zoom, state, on, rebind
component: chart
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Chart for jQuery</td>
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

How can I store and load the axis range on pan-and-zoom in the Chart?

## Solution

Normally, the Kendo UI Chart resets the axis range after the data source fetches new data. If users pan or zoom the Chart, they will see the initial viewport after the new data is loaded.

The following example demonstrates how to store and load the axis range. Changes are detected in the [`drag`](/api/javascript/dataviz/ui/chart/events/drag) and [`zoom`](/api/javascript/dataviz/ui/chart/events/zoom) events. The axis range is restored in the [`databound` event](/api/javascript/dataviz/ui/chart/events/databound).

```dojo
    <button id="rebind">Rebind Chart</button>
    <div id="chart"></div>
    <script>
      // Sample data
      var data = [];
      for (var i = 0; i < 100; i++) {
        var val = Math.round(Math.random() * 10);
        data.push({
          category: "C" + i,
          value: val
        });
      }

      function createChart() {
        var axisMin = 0;
        var axisMax = 10;

        function updateRange(e) {
          var axis = e.sender.getAxis('axis')
          var range = axis.range()
          axisMin = range.min;
          axisMax = range.max;
        }

        function restoreRange(e) {
          e.sender.options.categoryAxis.min = axisMin;
          e.sender.options.categoryAxis.max = axisMax;
        }

        $("#chart").kendoChart({
          renderAs: "canvas",
          dataSource: {
            data: data
          },
          categoryAxis: {
            name: "axis",
            min: axisMin,
            max: axisMax,
            labels: {
              rotation: "auto"
            }
          },
          series: [{
            type: "column",
            field: "value",
            categoryField: "category"
          }],
          pannable: {
            lock: "y"
          },
          zoomable: {
            mousewheel: {
              lock: "y"
            },
            selection: {
              lock: "y"
            }
          },
          zoom: updateRange,
          drag: updateRange,
          dataBound: restoreRange
        });
      }

      $("#rebind").click(function() {
        $("#chart").data("kendoChart").dataSource.read();
      });

      $(document).ready(createChart);
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
