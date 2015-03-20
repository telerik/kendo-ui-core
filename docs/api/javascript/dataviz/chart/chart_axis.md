---
title: ChartAxis
page_title: Methods of Kendo UI ChartAxis
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

#### Returns

`kendo.geometry.Rect|kendo.geometry.Arc` a rectangle or arc(for radar category and polar x axis) representing the slot.

#### Example - get axis slot
    var slot = axis.slot(1, 2);

