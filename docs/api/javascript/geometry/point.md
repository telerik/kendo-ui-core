---
title: Point
page_title: API reference for methods and fields of Kendo UI Geometry Point
---

# kendo.geometry.Point

A point representing a location (x, y) in two-dimensional coordinate space.

## Example - Creating a point
        <script>
            var geom = kendo.geometry;
            var point = new geom.Point(10, 20);
        </script>

## Constructor Parameters

### x `Number`

The x coordinate of the point.

### y `Number`

The y coordinate of the point.

## Fields

### x `Number`

The x coordinate of the point.


### y `Number`

The y coordinate of the point.

## Class methods

### create

Creates a Point instance from various parameters.

#### Parameters

##### x `Number|Array|kendo.geometry.Point`

Any of the following values:

* The x coordinate of the point.
* An array of x and y coordinates.
* An existing Point instance.

##### y `Number`

The y coordinate of the point.
Required only if the first argument is a number.

#### Returns

`kendo.geometry.Point` The new or supplied Point instance.

### min

Returns a new Point with the minimum x and y coordinates of all Point arguments.

#### Returns

`kendo.geometry.Point` A new Point instance.


### max

Returns a new Point with the maximum x and y coordinates of all Point arguments.

#### Returns

`kendo.geometry.Point` A new Point instance.


### minPoint

Returns a Point with the smallest representable coordinates.

#### Returns

`kendo.geometry.Point` A new Point instance with minimum coordinates.


### maxPoint

Returns a Point with the largest representable coordinates.

#### Returns

`kendo.geometry.Point` A new Point instance with maximum coordinates.


## Methods

### clone

Creates a new instance with the same coordinates.

#### Returns

`kendo.geometry.Point` A new Point instance with the same coordinates.


### distanceTo

Calculates the distance to another point.

#### Parameters

##### point `kendo.geometry.Point`

The point to calculate the distance to.

#### Returns

`Number` The straight line distance to the given point.


### equals

Compares this point with another instance.

#### Parameters

##### other `kendo.geometry.Point`

The point to compare with.

#### Returns

`Boolean` true if the point coordinates match; false otherwise.


### getX

Gets the x coordinate value.

#### Returns

`Number` The current x coordinate value.


### getY

Gets the y coordinate value.

#### Returns

`Number` The current y coordinate value.


### move

Moves the point to the specified x and y coordinates.

#### Parameters

##### x `Number`

The new X coordinate.

##### y `Number`

The new Y coordinate.

#### Returns

`kendo.geometry.Point` The current point instance.


### rotate

Rotates the point around the given center.

#### Parameters

##### angle `Number`

Angle in decimal degrees. Measured in clockwise direction with 0 pointing "right".
Negative values or values greater than 360 will be normalized.

##### center `kendo.geometry.Point|Array` *(default: [0, 0])*

The rotation center. Can be a Point instance or an [x, y] array.

#### Returns

`kendo.geometry.Point` The current Point instance.


### round

Rounds the point coordinates to the specified number of fractional digits.

#### Parameters

##### digits `Number`

Number of fractional digits.

#### Returns

`kendo.geometry.Point` The current Point instance.

### scale

Scales the point coordinates along the x and y axis.

#### Parameters

##### scaleX `Number`

The x scale multiplier.

##### scaleY `Number`

The y scale multiplier.

#### Returns

`kendo.geometry.Point` The current point instance.


### scaleCopy

Scales the point coordinates on a copy of the current point.
The callee coordinates will remain unchanged.

#### Parameters

##### scaleX `Number`

The x scale multiplier.

##### scaleY `Number`

The y scale multiplier.

#### Returns

`kendo.geometry.Point` The new Point instance.


### setX

Sets the x coordinate to a new value.

#### Parameters

##### value `Number`

The new x coordinate value.

#### Returns

`kendo.geometry.Point` The current Point instance.


### setY

Sets the y coordinate to a new value.

#### Parameters

##### value `Number`

The new y coordinate value.

#### Returns

`kendo.geometry.Point` The current Point instance.


### toArray

Returns the point coordinates as an [x, y] array.

#### Parameters

##### digits `Number`

(Optional) Number of fractional digits.

#### Returns

`Array` An array representation of the point, e.g. [10, 20]


### toString

Formats the point value to a string.

#### Parameters

##### digits `Number`

(Optional) Number of fractional digits.

##### separator `String` *(default: " ")*

The separator to place between coordinates.

#### Returns

`String` A string representation of the point, e.g. "10 20".


### transform

Applies a transformation to the point coordinates.
The current coordinates will be overriden.

#### Parameters

##### tansformation `kendo.geometry.Transformation`

The transformation to apply.

#### Returns

`kendo.geometry.Point` The current Point instance.


### transformCopy

Applies a transformation on a copy of the current point.
The callee coordinates will remain unchanged.

#### Parameters

##### tansformation `kendo.geometry.Transformation`

The transformation to apply.

#### Returns

`kendo.geometry.Point` The new Point instance.


### translate

Translates the point along the x and y axis.

#### Parameters

##### dx `Number`

The distance to move along the X axis.

##### dy `Number`

The distance to move along the Y axis.

#### Returns

`kendo.geometry.Point` The current point instance.

### translateWith

Translates the point by using a Point instance as a vector of translation.

#### Parameters

##### vector `kendo.geometry.Point|Array`

The vector of translation. Can be either a Point instance or an [x, y] array.

#### Returns

`kendo.geometry.Point` The current point instance.

