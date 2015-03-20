---
title: Size
page_title: API reference for methods and fields of Kendo UI Geometry Size
---

# kendo.geometry.Size

Represents the width and height of an entity.

## Example - Creating a size
        <script>
            var geom = kendo.geometry;
            var size = new geom.Size(10, 20);
        </script>

## Fields

### width `Number`

The horizontal size.


### height `Number`

The vertical size.

## Class methods

### create

Creates a Size instance from various parameters.

#### Parameters

##### width `Number|Array|kendo.geometry.Size`

Any of the following values:

* The width value.
* An array of width and height values.
* An existing Size instance.

##### height `Number`

The height value. Required only if the first argument is a number.

#### Returns

`kendo.geometry.Size` The new or supplied Size instance.


## Methods

### clone

Creates a new instance with the same width and height.

#### Returns

`kendo.geometry.Size` A new Size instance with the same coordinates.


### equals

Compares this Size with another instance.

#### Parameters

##### other `kendo.geometry.Size`

The Size to compare with.

#### Returns

`Boolean` true if the size members match; false otherwise.


### getWidth

Gets the width value.

#### Returns

`Number` The current width value.


### getHeight

Gets the height value.

#### Returns

`Number` The current height value.


### setWidth

Sets the width to a new value.

#### Parameters

##### value `Number`

The new width value.

#### Returns

`kendo.geometry.Size` The current Size instance.


### setHeight

Sets the height to a new value.

#### Parameters

##### value `Number`

The new height value.

#### Returns

`kendo.geometry.Size` The current Size instance.

