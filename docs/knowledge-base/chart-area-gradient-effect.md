---
title: Apply Gradient Effect on Area Chart
description: An example on how to apply a gradient color effect to the Kendo UI Area Chart.
type: how-to
page_title: Apply Gradient Color | Kendo UI Chart
slug: chart-area-gradient-effect
tags: chart, area, gradient, effect, color
ticketid: 1158735
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

How can I apply a gradient color effect on the Kendo UI Area Chart?

## Solution

1. Use an external gradient.
1. Use the [`series.color`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.color) configuration to set the external gradient.

```dojo
<div style="height: 0">
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0" style="visibility: hidden">
	<defs>
		<linearGradient id="svg-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
		<stop offset="0%" style="stop-color:#3bafda; stop-opacity:0.95" />
		<stop offset="100%" style="stop-color:#3bafda; stop-opacity:0.05" />
		</linearGradient>
	</defs>
	</svg>
</div>

<div id="example">
	<div id="chart"></div>

	<script>
	function createChart() {
		$("#chart").kendoChart({
		title: {
			text: "Gross domestic product growth \n /GDP annual %/"
		},
		legend: {
			position: "bottom"
		},
		seriesDefaults: {
			type: "area",
			area: {
			line: {
				style: "smooth"
			}
			}
		},
		series: [{
			name: "India",
			data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855],
			color: "url(#svg-gradient)"
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
			background: "green",
			format: "{0}%",
			template: "#= series.name #: #= value #"
		}
		});
	}

	$(document).ready(createChart);
	</script>
</div>
```
