---
title: Chart Stops Responding After Multiple Pan and Zoom Gestures on Mobile Devices
description: On mobile browsers, the Chart will eventually freeze and stop responding to touch gestures after multiple zooms and/or pans.
type: troubleshooting
page_title: SVG-Rendered Chart Stops Responding After Multiple Pan and Zoom Gestures
slug: chart-stops-responding-on-mobile-devices
tags: chart, mobile, svg-rendering
ticketid: 1129220
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Chart for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>iOS, Android</td>
 </tr>
</table>


## Description
After continuously panning and zooming a Chart, using default SVG rendering on mobile devices, it stops responding to pan and zoom gestures.

## Cause
The issue comes from the fact that the Chart re-renders its SVG elements on pan and zoom actions, thus breaking the touch event sequence. 

## Solution
There are no known solutions for a Chart using SVG rendering.

## Suggested Workarounds
Use [canvas rendering](/api/javascript/dataviz/ui/chart#configuration-renderAs). When using a canvas, the Chart element is not re-rendered on refresh.

```html
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