---
title: ChartSeries
page_title: API reference for Kendo UI ChartSeries
---

# kendo.dataviz.ChartSeries

Represents a chart series.

## Methods

### data

Gets or sets the series data.

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

#### Parameters

##### filter `Function`

An optional function that can be used to filter the points.

#### Returns

`Array` the series points.

#### Example - get the series points
    var points = series.points();

### toggleHighlight

Toggles the highlight for the entire series or for specific [point(s)](/api/javascript/dataviz/chart/chart_point).

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