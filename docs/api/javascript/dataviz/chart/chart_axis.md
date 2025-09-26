---
title: ChartAxis
page_title: Methods of Kendo UI ChartAxis
res_type: api
---

# kendo.dataviz.ChartAxis

Represents a chart axis.

## Methods

### range

Returns an object with the axis minimum and maximum values.


<div class="meta-api-description">
Retrieve or access the numeric span, minimum and maximum bounds, or value range of chart axes to programmatically get axis scaling limits, data extent, or coordinate boundaries; use this method for reading axis limits for synchronized multi-axis charts, setting dynamic annotations, adjusting graph scaling, or comparing data intervals without altering the chart display; obtain the axis numerical extents as numeric min and max values to analyze, align, calibrate, or control axis dimensions and ranges in chart rendering and visualization workflows.
</div>

#### Returns

`Object` the object with the min and max values.


#### Example - get the axis minimum and maximum values
    var range = axis.range();
    var min = range.min;
    var max = range.max;

### slot

Returns a slot based on the specified from and to values.


<div class="meta-api-description">
Determine the axis segment or coordinate range corresponding to a specific value interval by inputting start and end points to map numerical or categorical data intervals onto chart axis segments. This enables finding exact axis positions, aligning visual annotations, calculating layout slots, converting data ranges into axis coordinates, and dynamically controlling how value spans relate to chart segments for purposes such as positioning, highlighting regions, or synchronizing multiple chart elements along the axis.
</div>

#### Parameters

##### from `String|Number|Date`

The slot from value.

##### to `String|Number|Date` *optional*

The slot to value. If a to value is not specified, then the from value will be used.

##### limit `Boolean` *optional*

A boolean value indicating whether the slot should be limited to the current range. By default the range is limited.

#### Returns

`kendo.geometry.Rect|kendo.geometry.Arc` a rectangle or arc(for radar category and polar x axis) representing the slot.

#### Example - get axis slot
    var slot = axis.slot(1, 2);

### value

Returns the value corresponding to the passed surface point.


<div class="meta-api-description">
Convert screen coordinates or plot area points into corresponding data values along a chart axis by mapping input positions like mouse clicks, touch events, or tooltip locations to axis scales; this enables precise hit testing, data extraction from interactive events, custom annotations aligned with data units, and transforming visual coordinates into meaningful axis values while accounting for axis type, scaling, and transformations to accurately translate between surface pixels and underlying chart data.
</div>

#### Parameters

##### point `kendo.geometry.Point`

The surface point for which the value should be found.

#### Returns `String|Number|Date`

The value corresponding to the point.

#### Example - get axis value based on point
    var value = axis.value(new kendo.geometry.Point(100, 100));

### valueRange

Returns an object with the minimum and maximum point value associated with the axis.


<div class="meta-api-description">
Get or obtain the numeric minimum and maximum limits defining the range or scale of a chart axis, retrieve the current axis boundaries or extent, access the computed lower and upper values of an axis for scaling, fetching axis min/max for zoom controls or synchronization of multiple charts, extracting axis range data to align series or adjust visible scope, reading numeric boundaries for axis scaling, determining axis value limits for dynamic updates or user interactions, querying current axis scale span to harmonize chart elements or validate data bounds, obtaining axis min and max values for calculations involving chart layout or zooming, retrieving the axis numeric interval endpoints to analyze or programmatically modify visual data representation.
</div>

#### Returns `Object`

The value corresponding to the point.

#### Example - get axis value range
    var range = axis.valueRange();
    var min = range.min;
    var max = range.max;
