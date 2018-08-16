---
title: Configuring the Colors of the Radial Gauge Ranges
description: An example demonstrating how to change the style of the Kendo UI Radial Gauge's Range
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

How can I configure the colors and range of the Kendo UI Radial Gauge?

## Solution

The Kendo UI Radial Gauge can be styled to your preferences [using the scale.ranges](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/radialgauge/configuration/scale.ranges) property.  Once you have determined your ranges, [adjust the colors](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/radialgauge/configuration/scale.ranges#scale.ranges.color) for each range.
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

The following demonstrates a Kendo UI Radial Gauge which displays a series of ranges with unique colors:

```html
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

* [Kendo UI Radial Gauge - Scale Options Demo](https://demos.telerik.com/kendo-ui/radial-gauge/scale-options)
* [scale.ranges - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/radialgauge/configuration/scale.ranges)
* [scale.ranges.color - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/radialgauge/configuration/scale.ranges#scale.ranges.color)
