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


<div class="meta-api-description">
Accessing or modifying the visual elements container, drawing group, or rendering layer for an individual chart pane to customize or manipulate chart graphics, shapes, visuals, or elements within a chart area; configuring or querying the group responsible for displaying chart components to add overlays, change visual order, apply transformations, attach interaction handlers, or perform direct rendering tweaks and custom drawing operations after the chart initializes, enabling fine-grained control over chart pane visuals, graphical layering, event binding, and rendering behavior.
</div>

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


<div class="meta-api-description">
Access or configure the graphical container or drawing layer responsible for rendering the chart pane, enabling manipulation of the underlying vector graphics group used for display. Control or customize the visual representation by adding, removing, or transforming shapes, injecting custom drawing code, adjusting rendering layers, or hooking into export processes to alter output after initialization. This functionality supports dynamically modifying chart pane visuals, applying custom transformations, extending drawing logic, or programmatically customizing rendered elements in charts through direct access to the pane’s graphical group object.
</div>

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


<div class="meta-api-description">
Locate, retrieve, or access a chart axis by specifying its exact name within a chart container, enabling developers to search for axes by identifier or label for further manipulation. This method supports finding horizontal or vertical axes, axis components, or named axes to modify properties such as scale, range, labels, titles, formatting, or to add custom features, event handlers, or dynamic updates. Useful for querying and controlling particular axes when configuring charts programmatically, adjusting axis parameters individually, or integrating custom axis behavior based on axis names in data visualizations, graphs, or chart panes.
</div>

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


<div class="meta-api-description">
Access or retrieve all data series linked to a particular chart pane for purposes such as inspecting, iterating through, updating, or manipulating series data, visibility, style, or rendering behavior within that pane. Enable programmatic control to get, set, or modify multiple series associated with one chart section, allowing batch processing of series properties, toggling display states, adjusting appearance, or dynamically updating chart pane content and layout. This method supports querying series arrays, iterating over series collections, and managing series rendering settings tied to a specific chart pane context.
</div>

#### Returns

`Array` the array holding the pane series.

#### Example - get the pane series
    var series = pane.series();