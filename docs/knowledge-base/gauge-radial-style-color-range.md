---
title: Configure the Colors of RadialGauge Ranges
description: An example on how to change the styles of the Kendo UI RadialGauge range.
type: how-to
page_title: Customize the Range Colors | Kendo UI Radial Gauge
slug: gauge-radial-style-color-range
tags: gauge, radial, style, color, range
ticketid: 1110105
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Radial Gauge for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2018.2.620</td>
 </tr>
</table>

## Description

How can I configure the colors and range of the Kendo UI RadialGauge?

## Solution

1. Determine the ranges by using the [`scale.ranges`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/radialgauge/configuration/scale.ranges) property of the RadialGauge.
1. [Adjust the colors](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/radialgauge/configuration/scale.ranges#scale.ranges.color) for each range.

```
          $("#gauge").kendoRadialGauge({
            scale: {
              ...
              ranges: [
                {
                  from: 0,
                  to: 6,
                  color: "green"
                }, {
                  from: 6,
                  to: 8,
                  color: "yellow"
                }, {
                  from: 8,
                  to: 10,
                  color: "red"
                }
              ]
            }
          });
```

The following example demonstrates how to set the RadialGauge to display a series of ranges with unique colors.

```dojo
    <div id="gauge"></div>

    <script>

      $(document).ready(function() {

        $("#gauge").kendoRadialGauge({

          pointer: {
            value: 0,
          },

          scale: {
            minorUnit: .25,
            startAngle: -30,
            endAngle: 210,
            max: 10,
            labels: {
              position: "inside"
            },
            ranges: [
              {
                from: 0,
                to: 6,
                color: "green"
              }, {
                from: 6,
                to: 8,
                color: "yellow"
              }, {
                from: 8,
                to: 10,
                color: "red"
              }
            ]
          }
        });
      });

    </script>

    <style>
      #gauge {
        width: 330px;
        height: 330px;
        margin: 0 auto 0;
      }
    </style>


```

## See Also

* [Scale Options Demo of the Kendo UI RadialGauge](https://demos.telerik.com/kendo-ui/radial-gauge/scale-options)
* [API Reference of scale.ranges](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/radialgauge/configuration/scale.ranges)
* [API Reference of scale.ranges.color](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/radialgauge/configuration/scale.ranges#scale.ranges.color)
