---
title: Circle
page_title: API reference for methods and fields of Kendo UI Geometry Circle
---

# kendo.geometry.Circle

A circle with set center and radius.

## Example - Creating a circle
        <script>
            var geom = kendo.geometry;
            var center = new geom.Point(10, 10);
            var rect = new geom.Circle(center, 20);
        </script>

## Example - Creating a circle (short syntax)
        <script>
            var geom = kendo.geometry;
            var rect = new geom.Circle([10, 10], 20);
        </script>

## Fields

### center `kendo.geometry.Point`

The location of the circle center.


### radius `Number`

The radius of the circle.


## Methods

### bbox

Returns the bounding box of this circle after applying the
specified transformation matrix.

#### Parameters

##### matrix `kendo.geometry.Matrix`

Transformation matrix to apply.

#### Returns

`kendo.geometry.Rect` The bounding box after applying the transformation matrix.


### clone

Creates a new instance with the same center and radius.

#### Returns

`kendo.geometry.Circle` A new Circle instance with the same center and radius.


### equals

Compares this circle with another instance.

#### Parameters

##### other `kendo.geometry.Circle`

The circle to compare with.

#### Returns

`Boolean` true if the point coordinates match; false otherwise.


### getCenter

Gets the circle center location.

#### Returns

`kendo.geometry.Point` The location of the circle center.


### getRadius

Gets the circle radius.

#### Returns

`Number` The radius of the circle.


### pointAt

Gets the location of a point on the circle's circumference at a given angle.

#### Parameters

##### angle `Number`

Angle in decimal degrees. Measured in clockwise direction with 0 pointing "right".
Negative values or values greater than 360 will be normalized.

#### Returns

`kendo.geometry.Point` The point on the circle's circumference.


### setCenter

Sets the location of the circle center.

#### Parameters

##### value `kendo.geometry.Point|Array`

The new center Point or equivalent [x, y] array.

#### Returns

`kendo.geometry.Point` The location of the circle center.


### setRadius

Sets the circle radius.

#### Parameters

##### value `Number`

The new circle radius.

#### Returns

`kendo.geometry.Circle` The current circle instance.

