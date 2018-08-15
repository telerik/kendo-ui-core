---
title: Removing Gradient Effect
description: An example demonstrating how to remove the gradient effect of a Kendo UI Chart's series for a two dimensional style
type: how-to
page_title: Implementing Two Dimensional Series Style | Kendo UI Chart
slug: chart-gradient-none-style-flat
tags: chart, gradient, none, style, flat
ticketid: 1170343
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Chart for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2018.2.620</td>
 </tr>
</table>

## Description

How can I remove the emboss effect from a Kendo UI Bar Chart?

## Solution

Some Kendo UI Themes default to displaying a slight gradient in their Charts; in order to remove it from a graph like the [Bar chart](https://demos.telerik.com/kendo-ui/bar-charts/index), configure the [series.overlay.gradient](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.overlay#series.overlay.gradient) property to **none**:
```
$("#chart").kendoChart({
  series: [ {
    overlay: {
      gradient: "none"
    }
  }]
  ...
});
```

The following demonstrates a Kendo UI Bar Chart which displays the bars in a flat appearance:

```html
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [ {
          type: "bar",
          overlay: {
            gradient: "none"
          },

          data: [ 1, 2, 3]
        }]
      });
    </script>
```

## Notes
If the Kendo UI Chart contains more than one series, consider using the [seriesDefaults.overlay.gradient property](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/seriesdefaults.overlay#seriesDefaults.overlay.gradient) to remove all gradients with one setting.


## See Also

* [Kendo UI Bar Chart - Basic Usage Demo](https://demos.telerik.com/kendo-ui/bar-charts/index)
* [series.overlay.gradient - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.overlay#series.overlay.gradient)
