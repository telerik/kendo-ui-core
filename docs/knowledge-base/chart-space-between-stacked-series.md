---
title: Add Space Between the Stacked Series in the Kendo UI Column Chart
description: Learn how to separate the stacked series in the Kendo UI Column Chart by adding some space.
type: how-to
page_title: Insert Space After Every Series | Kendo UI Chart
slug: chart-space-between-stacked-series
position: 
tags: column, space, stack, white space, separate, chart, 100%, stacked, progressbar
ticketid: 1454711
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
How can I add space between the Stacked Series in the Kendo UI Column Chart?

## Solution
In order to add space between two series of a Stacked Column Chart, use the [series.visual](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.visual) property:

```javascript
$("#chart").kendoChart({
  series: [{ 
    stack: { 
      group: "a" 
    }, 
    data: [4], 
    visual: space
  }
})
function space(e) {
  var origin = e.rect.origin;
  var bottomRight = e.rect.bottomRight();
  var path = new kendo.drawing.Path({
    fill: {
      color: e.options.color
    },
    stroke: {
      color: e.options.color
    }
  })
  .moveTo(bottomRight.x, bottomRight.y)
  .lineTo(origin.x, bottomRight.y)
  .lineTo(origin.x, origin.y+5)
  .lineTo(bottomRight.x, origin.y+5)
  .close();
  return path;
}
```
#### Example

```dojo
<div id="example">
  <div class="demo-section k-content wide">
    <div id="chart"></div>
  </div>
  <script>
    function createChart() {
      $("#chart").kendoChart({
        title: {
            text: "Olympic Medals won by USA"
        },
        legend: {
            visible: false
        },
        seriesDefaults: {
            type: "column",
            stack: true
        },
        series: [{
            name: "Gold Medals",
            data: [40, 32, 34, 36, 45, 33, 34, 83, 36, 37, 44, 37, 35, 36, 46],
            color: "#f3ac32", 
            visual: space
        }, {
            name: "Silver Medals",
            data: [19, 25, 21, 26, 28, 31, 35, 60, 31, 34, 32, 24, 40, 38, 29],
            color: "#b8b8b8", 
            visual: space
        }, {
            name: "Bronze Medals",
            data: [17, 17, 16, 28, 34, 30, 25, 30, 27, 37, 25, 33, 26, 36, 29],
            color: "#bb6e36", 
            visual: space
        }],
        valueAxis: {
            max: 180,
            line: {
                visible: false
            },
            minorGridLines: {
                visible: true
            }
        },
        categoryAxis: {
            categories: [1952, 1956, 1960, 1964, 1968, 1972, 1976, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012],
            majorGridLines: {
                visible: false
            }
        },
        tooltip: {
            visible: true,
            template: "#= series.name #: #= value #"
        }
      });
    }
    
    function space(e) {
      var origin = e.rect.origin;
      var bottomRight = e.rect.bottomRight();
      var path = new kendo.drawing.Path({
        fill: {
          color: e.options.color
        },
        stroke: {
          color: e.options.color
        }
      })
      .moveTo(bottomRight.x, bottomRight.y)
      .lineTo(origin.x, bottomRight.y)
      .lineTo(origin.x, origin.y+5)
      .lineTo(bottomRight.x, origin.y+5)
      .close();
      return path;
    }
    $(document).ready(createChart);
    $(document).bind("kendo:skinChange", createChart);
  </script>
</div>
```

## See Also
- [series.visual](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.visual)
