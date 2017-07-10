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

#### Returns

`Object` the object with the min and max values.


#### Example - get the axis minimum and maximum values
    var range = axis.range();
    var min = range.min;
    var max = range.max;

### slot

Returns a slot based on the specified from and to values.

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

#### Parameters

##### point `kendo.geometry.Point`

The surface point for which the value should be found.

#### Returns `String|Number|Date`

The value corresponding to the point.

#### Example - get axis value based on point
    var value = axis.value(new kendo.geometry.Point(100, 100));

### valueRange

Returns an object with the minimum and maximum point value associated with the axis.

#### Returns `Object`

The value corresponding to the point.

#### Example - get axis value range
    var range = axis.valueRange();
    var min = range.min;
    var max = range.max;
