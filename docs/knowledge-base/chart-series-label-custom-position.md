---
title: Show Series Label in the Top Left Corner of the Kendo UI Column Chart
description: Learn how to set custom position of the Series Labels in the Kendo UI Column Chart.
type: how-to
page_title: Show Series Label in Custom Position | Kendo UI Chart
slug: chart-series-label-custom-position
position: 
tags: column, custom, position, label, chart, top left, corner, series.labels, series
ticketid: 1455103
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2020.1.219</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Chart for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description
How can I show the Series Label in the top left corner of the Kendo UI Column Chart?

## Solution
In order to show the [Series Labels](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.labels) in the top left corner of the Kendo UI Column Chart Series, use the [series.labels.visual](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.labels.visual) function:

```javascript
$("#chart").kendoChart({
  series: [{
    color: "#190663",
    labels: {
      visible: true,
      position: "center",
      visual: left,
      template: "Value: #: value #"
    },
    data: [1, 2]
  }]
});

function left(e) {
  var layout = new kendo.drawing.Layout(e.rect, {
    orientation: "vertical"
  });
  var text1 = new kendo.drawing.Text(e.text, [e.rect.origin.x, e.rect.origin.y], {
    fill: {
      color: "#fff"
    }});
  layout.append(text1);
  layout.reflow();
  return layout;
}
```
> Make sure to set the [series.labels.position](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.labels.position).

#### Example

```dojo
<div id="chart"></div>
<script>
  $("#chart").kendoChart({
    series: [{
      color: "#190663",
      labels: {
        visible: true,
        position: "center",
        visual: left,
        template: "Value: #: value #"
      },
      data: [1, 2]
    }]
  });

  function left(e) {
    var layout = new kendo.drawing.Layout(e.rect, {
      orientation: "vertical"
    });
    var text1 = new kendo.drawing.Text(e.text, [e.rect.origin.x, e.rect.origin.y], {
      fill: {
        color: "#fff"
      }});
    layout.append(text1);
    layout.reflow();
    return layout;
  }
</script>
```

## See Also
- [series.labels](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.labels)
- [series.labels.visual](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.labels.visual)
- [series.labels.position](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.labels.position)
