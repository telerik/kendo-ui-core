---
title: Highlight Clicked Line Chart Segments
description: An example on how to highlight the clicked line segment in the Kendo UI Line Chart.
type: how-to
page_title: Highlight Line on Click | Kendo UI Chart
slug: chart-line-highlight-clicked-segment
tags: chart, line, highlight, click, series
ticketid: 1152454
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2018.1 221</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Chart for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

How can I highlight the clicked line in the Kendo UI Line Chart?

## Solution

Handle the [`seriesClick`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/events/seriesclick) event&mdash;in the event handler, add a custom style class to the desired HTML elements.

```dojo
<style>
	.myClass {
		stroke: #08ffff;
		stroke-width: 4;
	}
</style>
<div id="example">
	<div class="demo-section k-content wide">
		<div id="chart" style="background: center no-repeat url('../content/shared/styles/world-map.png');"></div>
	</div>
	<script>
		function createChart() {
			$("#chart").kendoChart({
				title: {
					text: "Gross domestic product growth \n /GDP annual %/"
				},
				legend: {
					position: "bottom"
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
					},
					labels: {
						rotation: "auto"
					}
				},
				tooltip: {
					visible: true,
					format: "{0}%",
					template: "#= series.name #: #= value #"
				},
				seriesClick: function(e) {
					$(".myClass").removeClass("myClass");
					var color = $(e.element).attr("fill");
					var path = $(e.element).siblings().find("path[stroke='" + color + "']");
					path.addClass("myClass");
				}
			});
		}

		$(document).ready(createChart);
		$(document).bind("kendo:skinChange", createChart);
	</script>
</div>
```

## See Also

* [Explode Clicked Pie Chart Segments]({% slug howto_explodeclickedsegment_piecharts %})
* [Highlight Clicked Bar Chart Segments]({% slug chart-bar-highlight-clicked-segment %})
