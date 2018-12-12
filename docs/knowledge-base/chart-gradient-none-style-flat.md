---
title: Remove Gradient Effect
description: An example on how to remove the gradient effect of a Kendo UI Chart series for a two-dimensional style.
type: how-to
page_title: Implement Two-Dimensional Series Style | Kendo UI Chart
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

Some Kendo UI themes default to displaying a slight gradient in their Charts. To remove that effect from a graph like the [Bar chart](https://demos.telerik.com/kendo-ui/bar-charts/index), set the [`series.overlay.gradient`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.overlay#series.overlay.gradient) property to `none`.

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

If the Kendo UI Chart contains more than one series, use the [`seriesDefaults.overlay.gradient`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/seriesdefaults.overlay#seriesDefaults.overlay.gradient) property to remove all gradients with a single setting.

The following example demonstrates how to render the bars in the Kendo UI Chart in a flat appearance.

```dojo
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

## See Also

* [Basic Usage Demo of the Kendo UI Bar Chart](https://demos.telerik.com/kendo-ui/bar-charts/index)
* [API Reference of series.overlay.gradient](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.overlay#series.overlay.gradient)
