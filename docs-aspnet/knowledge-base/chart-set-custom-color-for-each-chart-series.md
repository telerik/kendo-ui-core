---
title: Set custom colors for the Chart series
description: "An example of how to set custom colors for each series of the {{ site.product }} Chart."
type: how-to
page_title: Set custom colors for the Chart series
slug: chart-set-custom-color-for-each-chart-series
tags: mvc, core, chart, custom, color, series
res_type: kb
component: chart
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.prodcut }} Chart</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.621 version</td>
 </tr>
</table>

## Description

How to set custom colors for each series of the {{ site.product }} Chart?

## Solution

1. Store the colors values in an array.
2. By using the [setOptions](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/methods/setoptions) method, set the colors for the series. 


```Index.cshtml
<div class="demo-section k-content wide">
    @(Html.Kendo().Chart()
        .Name("chart")
        .Title("Site Visitors Stats /thousands/")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Bottom)
        )
        .Transitions(true)
        .SeriesDefaults(seriesDefaults => seriesDefaults
            .Column()
        )
        .Series(series =>
        {
            series.Column(new double[] { 56000, 63000, 74000, 91000, 117000, 138000 }).Name("Total Visits");
            series.Column(new double[] { 52000, 34000, 23000, 48000, 67000, 83000 }).Name("Unique visitors");
            series.Column(new double[] { 68000, 40000, 45000, 22000, 11000, 6000 }).Name("Unique visitors");
        })
        .CategoryAxis(axis => axis
            .Categories("Jan", "Feb", "Mar", "Apr", "May", "Jun")
            .MajorGridLines(lines => lines.Visible(false))
        )
        .ValueAxis(axis => axis
            .Numeric()
            .Line(line => line.Visible(false))
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Format("{0}")
        )
    )
</div>
<div>
    @(Html.Kendo().ColorPicker()
        .Name("serieOne")
        .Buttons(false)
        .Preview(false)
        .Value("#ffffff")
        .Events(ev =>ev.Change("serieOne"))
	)
    @(Html.Kendo().ColorPicker()
        .Name("serieTwo")
        .Buttons(false)
        .Preview(false)
        .Value("#ffffff")
        .Events(ev => ev.Change("serieTwo"))
	)
    @(Html.Kendo().ColorPicker()
        .Name("serieThree")
        .TileSize(tile=>
        {
            tile.Height(19);
            tile.Width(34);
        })
        .Buttons(false)
        .Preview(false)
        .Value("#ffffff")
        .Events(ev => ev.Change("serieThree"))
	)
    @(Html.Kendo().Button()
        .Name("setColorBtn")
        .Content("Set colors")
        .Events(e=>e.Click("onClick"))
    )
</div>
```
```Script.js
    var seriesColors = []; //stores the colors from the color picker
    function isSeriesColorsExceeded(){ //asserts if more than 3 colors are pushed into the seriesColors variable
        if (seriesColors.length >= 3) {
            seriesColors = [];
        }
    }
    function serieOne(e) { //event handler for the first picker
        isSeriesColorsExceeded();
        seriesColors.push(e.value); //push the currently selected color into the global seriesColors variable
    }
    function serieTwo(e) { //event handler for the second picker
        isSeriesColorsExceeded();
        seriesColors.push(e.value);
    }
    function serieThree(e) {//event handler for the third picker
        isSeriesColorsExceeded();
        seriesColors.push(e.value);
    }
    function onClick() { //Set colors button
        var chart = $("#chart").data("kendoChart");
        chart.setOptions({ seriesColors: seriesColors }); //push the previously defined array with the color options
    }
```

For the complete implementation of the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/QckskMPP37Q360dl12) example.