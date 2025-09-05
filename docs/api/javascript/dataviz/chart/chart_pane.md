---
title: ChartPane
page_title: API reference for Kendo UI ChartPane
res_type: api
---

# kendo.dataviz.ChartPane

Represents a chart pane.

## Fields

### chartsVisual `kendo.drawing.Group`

The group holding the charts drawing elements.

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        series: [{
            data: [1, 2, 3, 4, 5]
        }],
        render: function(e) {
            var chart = e.sender;
            var pane = chart.options.panes[0];
            var chartsVisual = pane.chartsVisual;
            console.log("Charts visual group:", chartsVisual);
        }
    });
    </script>

### visual `kendo.drawing.Group`

The drawing group used to draw the pane.

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        series: [{
            data: [1, 2, 3, 4, 5]
        }],
        render: function(e) {
            var chart = e.sender;
            var pane = chart.options.panes[0];
            var visual = pane.visual;
            console.log("Pane visual group:", visual);
        }
    });
    </script>

## Methods

### findAxisByName

Returns an [axis](/api/javascript/dataviz/chart/chart_axis) from the pane with the specified name.

#### Parameters

##### name `String`

The axis name.

#### Returns

`kendo.dataviz.ChartAxis` The chart axis.

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        series: [{
            data: [1, 2, 3, 4, 5]
        }],
        valueAxis: {
            name: "primaryAxis"
        },
        render: function(e) {
            var chart = e.sender;
            var axis = chart.findAxisByName("primaryAxis");
            console.log("Found axis:", axis);
        }
    });
    </script>

### series

Returns an array with the pane [series](/api/javascript/dataviz/chart/chart_series).

#### Returns

`Array` the array holding the pane series.

#### Example - get the pane series
    var series = pane.series();