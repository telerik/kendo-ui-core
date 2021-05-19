---
title: Chart Stops Responding on Mobile Devices after Multiple Pan and Zoom Gestures
page_title: SVG-Rendered Chart Stops Responding on Mobile after Multiple Pan and Zoom Gestures
description: On mobile browsers, the Chart eventually freezes and stops responding to touch gestures after multiple zooms and pans.
type: troubleshooting
slug: chart-cannot-pan-and-zoom-continuously-on-mobile
tags: chart, mobile, svg-rendering
ticketid: 1129220
res_type: kb
component: charts
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Chart</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>iOS, Android</td>
 </tr>
</table>

## Description

After continuously panning and zooming a Chart, which uses the default SVG rendering on mobile devices, it stops responding to pan and zoom gestures.

## Cause

The Chart re-renders its SVG elements when the pan and zoom actions are executed which breaks the `touch` event sequence.

## Suggested Workarounds

Kendo UI does not provide a built-in solution for avoiding this behavior. However, you can still work around the issue by using [canvas rendering](/api/javascript/dataviz/ui/chart/configuration/renderas) which does not re-render the Chart element on refreshing the page.

```dojo
    <div id="chart"></div>
    <script>
      // Generate sample data
      var data = [];
      var step = Math.PI / 4;
      for (var x = -50; x < 50; x += step) {
        data.push({ x: x, y: Math.sin(x) });
      }

      function createChart() {
        $("#chart").kendoChart({
          renderAs: "canvas",
          dataSource: {
            data: data
          },
          xAxis: {
            min: -2,
            max: 2,
            labels: {
              format: "{0:n1}"
            }
          },
          yAxis: {
            labels: {
              format: "{0:n2}"
            }
          },
          series: [{
            type: "scatterLine",
            xField: "x",
            yField: "y",
            style: "smooth",
            markers: {
              visible: false
            }
          }],
          pannable: true,
          zoomable: true
        });
      }

      $(document).ready(createChart);
    </script>
```

## See Also

* [Rendering Modes for Data Visualization]({% slug renderingmodesfor_datavisualization_kendouistyling %})
