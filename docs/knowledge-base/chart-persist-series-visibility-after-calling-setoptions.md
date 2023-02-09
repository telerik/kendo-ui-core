---
title: Persist Series Visibility After Changing the Chart Options
page_title: Persist Series Visibility After Changing the Chart Options - Kendo UI Chart for jQuery
description: "An example demonstrating how to persist the series visibility after the setOptions method is called."
type: how-to
slug: chart-persist-series-visibility-after-calling-setoptions
tags: chart, series, visible, visibility, persist, setoptions, options, togglevisibility, toggle
ticketid: 1549189
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2021.3.1207</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® Chart for jQuery</td>
	</tr>
</table>

## Description

I set the [`persistSeriesVisibility`](/api/javascript/dataviz/ui/chart/configuration/persistseriesvisibility) configuration to `true`, however the series visibility changes when I call the [`setOptions`](/api/javascript/dataviz/ui/chart/methods/setoptions) method. How can I persist the current state of the series visibility?

## Solution

1. Save the current configuration of the series.
1. Call the `setOptions` method to update the Chart.
1. Obtain a reference to the updated configuration of the series.
1. Loop through the series and programmatically call the [`toggleVisibility`](/api/javascript/dataviz/chart/chart_series/methods/togglevisibility) method to update the visibility status of the series.

```dojo
<h3>To test the functionality, click on one of the series in the Chart Legend to the right. The series will become
    invisible. Click on the SetOptions button to update the title of the Chart without affecting the visibility.</h3>
<button id=set>Call SetOptions</button>
<div id="chart"></div>
<script>
    $("#chart").kendoChart({
        persistSeriesVisibility: true,
        dataSource: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }],
        series: [
            { name: "Series 1", field: "value" },
            { name: "Series 2", field: "value" }
        ]
    });

    $("#set").on("click", function () {
        var chart = $("#chart").getKendoChart();

        // Save the current state of the series.
        let oldSeries = chart.options.series;
        // Call setOptions to update the Chart configuration.
        chart.setOptions({ title: "Added Chart Title" });
        // Get a reference to the updated series.
        let currentSeries = chart.options.series;

        // Update the visibility status of each series.
        currentSeries.forEach(function (x, i) {
            chart.findSeriesByIndex(i).toggleVisibility(oldSeries[i].visible);
        });
    });
</script>
```