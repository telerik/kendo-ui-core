---
title: Highlight Clicked Bar Chart Segments
description: An example on how to highlight the clicked bar segment in the Kendo UI Bar Chart.
type: how-to
page_title: Highlight Bar on Click | Kendo UI Chart
slug: chart-bar-highlight-clicked-segment
tags: chart, bar, highlight, click, series
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

How can I highlight the clicked bar in the Kendo UI Bar Chart?

## Solution

Handle the [`seriesClick`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/events/seriesclick) event&mdash;in the event handler, add a custom style class to the desired HTML elements.

```dojo
<style>
	.myClass {
		stroke: #b40524;
		fill: #08ffff;
		stroke-width: 3;
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
					text: "Site Visitors Stats \n /thousands/"
				},
				legend: {
					visible: false
				},
				seriesDefaults: {
					type: "bar"
				},
				series: [{
					name: "Total Visits",
					data: [56000, 63000, 74000, 91000, 117000, 138000]
				}, {
					name: "Unique visitors",
					data: [52000, 34000, 23000, 48000, 67000, 83000]
				}],
				valueAxis: {
					max: 140000,
					line: {
						visible: false
					},
					minorGridLines: {
						visible: true
					},
					labels: {
						rotation: "auto"
					}
				},
				categoryAxis: {
					categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
					majorGridLines: {
						visible: false
					}
				},
				tooltip: {
					visible: true,
					template: "#= series.name #: #= value #"
				},
				seriesClick: function(e) {
					$(".myClass").removeClass("myClass");
					$(e.element).siblings().addClass("myClass");
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
* [Highlight Clicked Line Chart Segments]({% slug chart-line-highlight-clicked-segment %})
