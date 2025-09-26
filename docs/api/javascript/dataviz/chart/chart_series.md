---
title: ChartSeries
page_title: API reference for Kendo UI ChartSeries
res_type: api
---

# kendo.dataviz.ChartSeries

Represents a chart series.

## Methods

### data

Gets or sets the series data.


<div class="meta-api-description">
Accessing or modifying the data points displayed in a chart series can be done by retrieving the current dataset or updating it with new values to control what is rendered on the chart. This functionality supports reading the existing data used for plotting or dynamically setting a fresh collection of data items that define the series visualization. Developers might need to fetch the current series values for analysis or reset, change, or refresh the displayed data to reflect different metrics, feeds, or user input. This method enables programmatic data access and manipulation for fine-tuning, refreshing, or customizing the graphical representation of series points within charts.
</div>

#### Parameters

##### data `Array`

The series data to be set.

#### Returns

`Array` the current series data.

#### Example - get and set the series data
    var data = series.data();
    data.pop();

    series.data(data);

### findPoint

Finds a series [point](/api/javascript/dataviz/chart/chart_point). The method accepts a function which will be called for each point until the function returns `true`.


<div class="meta-api-description">
Search for a specific data point within a chart series by applying a custom condition or filter function, enabling you to scan through all points to identify one that matches criteria such as specific values, thresholds, or properties; set up a predicate or callback function to evaluate each point individually and return the first point that satisfies the logic, halting further search upon a successful match, useful for pinpointing data entries, filtering points based on dynamic conditions, or retrieving targeted chart elements efficiently within series data collections.
</div>

#### Parameters

##### callback `Function`

The function that will be called with the series points.

#### Returns

`kendo.dataviz.ChartPoint` the found point.

#### Example - find a series point with value equal to 1
    var point = series.findPoint(function(point) {
        return point.value === 1;
    });

### points

Gets or sets the series data.


<div class="meta-api-description">
Accessing and modifying data points in a chart series, retrieving current data arrays, updating or setting new collections of points programmatically, changing series data dynamically, getting or setting chart data programmatically after initialization, manipulating the series data for visual refresh, configuring data points for live updates, controlling data collections within a chart series, replacing series points with new datasets, extracting or assigning series data for rendering changes.
</div>

#### Parameters

##### filter `Function`

An optional function that can be used to filter the points.

#### Returns

`Array` the series points.

#### Example - get the series points
    var points = series.points();

### toggleHighlight

Toggles the highlight for the entire series or for specific [point(s)](/api/javascript/dataviz/chart/chart_point).


<div class="meta-api-description">
Control visual emphasis or highlighting for entire data series or specific points within a chart, enabling dynamic toggling of highlight states to programmatically set, enable, disable, or switch emphasis on series or individual data points, useful for interactive charts, user-driven highlighting, data point selection feedback, or conditional visual focus changes in chart components.
</div>

#### Parameters

##### show `Boolean`

A value indicating whether the highlight should be shown or hidden.

##### filter `Function|Array`

A function that will is used to filter the highlighted points or an Array holding the [point(s)](/api/javascript/dataviz/chart/chart_point) that should be highlighted.

#### Example - highlight the series points
    series.toggleHighlight(true);

#### Example - highlight the series points with value equal to 1
    series.toggleHighlight(true, function(point) {
        return point.value === 1;
    });

#### Example - highlight the first point
    var point = series.points()[0];
    series.toggleHighlight(true, point);

### toggleVisibility

Toggles the visibility for the entire series or for specific point(s).


<div class="meta-api-description">
Change or switch the display state of chart series or individual data points by enabling, disabling, showing, or hiding entire series or selected points within graphical charts, controlling visibility programmatically in response to user interactions, legend selections, dynamic data updates, or custom logic to manage which parts of a chart are visible or concealed at runtime, including toggling on and off series or points after chart initialization to reflect real-time changes or user preferences.
</div>

#### Parameters

##### show `Boolean`

A value indicating whether the series or the points should be shown or hidden.

##### filter `Function`

An optional function that is used to filter the points that should be shown or hidden. The function is passed the point `dataItem` as argument.

#### Example - hide the series
    series.toggleVisibility(false);

#### Example - hide the series points with dataItem value equal to 1
    series.toggleVisibility(false, function(dataItem) {
        return dataItem.value === 1;
    });