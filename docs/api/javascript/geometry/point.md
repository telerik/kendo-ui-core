---
title: Point
page_title: API reference for methods and fields of Kendo UI Geometry Point
res_type: api
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

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(15, 25);
    console.log("x coordinate:", point.x); // outputs: x coordinate: 15
    </script>

### y `Number`

The y coordinate of the point.

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(15, 25);
    console.log("y coordinate:", point.y); // outputs: y coordinate: 25
    </script>

## Fields

### x `Number`

The x coordinate of the point.

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(10, 20);
    console.log(point.x); // outputs: 10
    </script>

### y `Number`

The y coordinate of the point.

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(10, 20);
    console.log(point.y); // outputs: 20
    </script>

## Class Methods

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

#### Example

    <script>
    var geom = kendo.geometry;
    
    // Create from coordinates
    var point1 = geom.Point.create(10, 20);
    console.log(point1.toString()); // outputs: "10 20"
    
    // Create from array
    var point2 = geom.Point.create([30, 40]);
    console.log(point2.toString()); // outputs: "30 40"
    
    // Create from existing Point
    var point3 = geom.Point.create(point1);
    console.log(point3.toString()); // outputs: "10 20"
    </script>

### min

Returns a new Point with the minimum x and y coordinates of all Point arguments.

#### Returns

`kendo.geometry.Point` A new Point instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var point1 = new geom.Point(10, 20);
    var point2 = new geom.Point(5, 30);
    var point3 = new geom.Point(15, 10);
    
    var minPoint = geom.Point.min(point1, point2, point3);
    console.log(minPoint.toString()); // outputs: "5 10"
    </script>

### max

Returns a new Point with the maximum x and y coordinates of all Point arguments.

#### Returns

`kendo.geometry.Point` A new Point instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var point1 = new geom.Point(10, 20);
    var point2 = new geom.Point(5, 30);
    var point3 = new geom.Point(15, 10);
    
    var maxPoint = geom.Point.max(point1, point2, point3);
    console.log(maxPoint.toString()); // outputs: "15 30"
    </script>

### minPoint

Returns the Point with minimum x and y coordinates.

#### Returns

`kendo.geometry.Point` The Point with minimum x and y coordinates.

#### Example

    <script>
    var geom = kendo.geometry;
    var point1 = new geom.Point(10, 20);
    var point2 = new geom.Point(5, 30);
    var point3 = new geom.Point(15, 10);
    
    var minPoint = geom.Point.minPoint(point1, point2, point3);
    console.log(minPoint.toString()); // outputs: "5 10"
    </script>

### maxPoint

Returns the Point with maximum x and y coordinates.

#### Returns

`kendo.geometry.Point` The Point with maximum x and y coordinates.

#### Example

    <script>
    var geom = kendo.geometry;
    var point1 = new geom.Point(10, 20);
    var point2 = new geom.Point(5, 30);
    var point3 = new geom.Point(15, 10);
    
    var maxPoint = geom.Point.maxPoint(point1, point2, point3);
    console.log(maxPoint.toString()); // outputs: "15 30"
    </script>

## Methods

### clone

Creates a new instance with the same coordinates.

#### Returns

`kendo.geometry.Point` A new Point instance with the same coordinates.

#### Example

    <script>
    var geom = kendo.geometry;
    var originalPoint = new geom.Point(10, 20);
    var clonedPoint = originalPoint.clone();
    
    console.log(originalPoint.toString()); // outputs: "10 20"
    console.log(clonedPoint.toString()); // outputs: "10 20"
    console.log(originalPoint === clonedPoint); // outputs: false
    </script>

### distanceTo

Calculates the distance to another point.

#### Parameters

##### point `kendo.geometry.Point`

The point to calculate the distance to.

#### Returns

`Number` The straight line distance to the given point.

#### Example

    <script>
    var geom = kendo.geometry;
    var point1 = new geom.Point(0, 0);
    var point2 = new geom.Point(3, 4);
    
    var distance = point1.distanceTo(point2);
    console.log(distance); // outputs: 5 (Pythagorean theorem: sqrt(3² + 4²))
    </script>

### equals

Compares this point with another instance.

#### Parameters

##### other `kendo.geometry.Point`

The point to compare with.

#### Returns

`Boolean` true if the point coordinates match; false otherwise.

#### Example

    <script>
    var geom = kendo.geometry;
    var point1 = new geom.Point(10, 20);
    var point2 = new geom.Point(10, 20);
    var point3 = new geom.Point(15, 25);
    
    console.log(point1.equals(point2)); // outputs: true
    console.log(point1.equals(point3)); // outputs: false
    </script>

### getX

Gets the x coordinate value.

#### Returns

`Number` The current x coordinate value.

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(10, 20);
    
    var xValue = point.getX();
    console.log("X coordinate:", xValue); // outputs: X coordinate: 10
    </script>

### getY

Gets the y coordinate value.

#### Returns

`Number` The current y coordinate value.

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(10, 20);
    
    var yValue = point.getY();
    console.log("Y coordinate:", yValue); // outputs: Y coordinate: 20
    </script>

### move

Moves the point to the specified x and y coordinates.

#### Parameters

##### x `Number`

The new X coordinate.

##### y `Number`

The new Y coordinate.

#### Returns

`kendo.geometry.Point` The current point instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(10, 20);
    
    console.log("Before move:", point.toString()); // outputs: "10 20"
    point.move(50, 60);
    console.log("After move:", point.toString()); // outputs: "50 60"
    </script>

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

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(10, 0);
    var center = new geom.Point(0, 0);
    
    console.log("Before rotation:", point.toString()); // outputs: "10 0"
    point.rotate(90, center);
    console.log("After 90° rotation:", point.toString()); // outputs: "0 10"
    </script>

### round

Rounds the point coordinates to the specified number of fractional digits.

#### Parameters

##### digits `Number`

Number of fractional digits.

#### Returns

`kendo.geometry.Point` The current Point instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(10.12345, 20.67890);
    
    console.log("Before rounding:", point.toString()); // outputs: "10.12345 20.6789"
    point.round(2);
    console.log("After rounding to 2 digits:", point.toString()); // outputs: "10.12 20.68"
    </script>

### scale

Scales the point coordinates along the x and y axis.

#### Parameters

##### scaleX `Number`

The x scale multiplier.

##### scaleY `Number`

The y scale multiplier.

#### Returns

`kendo.geometry.Point` The current point instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(10, 20);
    
    console.log("Before scaling:", point.toString()); // outputs: "10 20"
    point.scale(2, 1.5);
    console.log("After scaling:", point.toString()); // outputs: "20 30"
    </script>

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

#### Example

    <script>
    var geom = kendo.geometry;
    var originalPoint = new geom.Point(10, 20);
    
    console.log("Original point:", originalPoint.toString()); // outputs: "10 20"
    var scaledCopy = originalPoint.scaleCopy(2, 1.5);
    console.log("Scaled copy:", scaledCopy.toString()); // outputs: "20 30"
    console.log("Original unchanged:", originalPoint.toString()); // outputs: "10 20"
    </script>

### setX

Sets the x coordinate to a new value.

#### Parameters

##### value `Number`

The new x coordinate value.

#### Returns

`kendo.geometry.Point` The current Point instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(10, 20);
    
    console.log("Before setX:", point.toString()); // outputs: "10 20"
    point.setX(50);
    console.log("After setX:", point.toString()); // outputs: "50 20"
    </script>

### setY

Sets the y coordinate to a new value.

#### Parameters

##### value `Number`

The new y coordinate value.

#### Returns

`kendo.geometry.Point` The current Point instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(10, 20);
    
    console.log("Before setY:", point.toString()); // outputs: "10 20"
    point.setY(60);
    console.log("After setY:", point.toString()); // outputs: "10 60"
    </script>

### toArray

Returns the point coordinates as an [x, y] array.

#### Parameters

##### digits `Number`

(Optional) Number of fractional digits.

#### Returns

`Array` An array representation of the point, e.g. [10, 20]

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(10.12345, 20.67890);
    
    var arrayDefault = point.toArray();
    console.log(arrayDefault); // outputs: [10.12345, 20.6789]
    
    var arrayRounded = point.toArray(2);
    console.log(arrayRounded); // outputs: [10.12, 20.68]
    </script>

### toString

Formats the point value to a string.

#### Parameters

##### digits `Number`

(Optional) Number of fractional digits.

##### separator `String` *(default: " ")*

The separator to place between coordinates.

#### Returns

`String` A string representation of the point, e.g. "10 20".

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(10.12345, 20.67890);
    
    var stringDefault = point.toString();
    console.log(stringDefault); // outputs: "10.12345 20.6789"
    
    var stringRounded = point.toString(2);
    console.log(stringRounded); // outputs: "10.12 20.68"
    
    var stringCustomSeparator = point.toString(2, ",");
    console.log(stringCustomSeparator); // outputs: "10.12,20.68"
    </script>

### transform

Applies a transformation to the point coordinates.
The current coordinates will be overriden.

#### Parameters

##### tansformation `kendo.geometry.Transformation`

The transformation to apply.

#### Returns

`kendo.geometry.Point` The current Point instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(10, 20);
    var transformation = new geom.Transformation();
    transformation.scale(2, 2);
    
    console.log("Before transform:", point.toString()); // outputs: "10 20"
    point.transform(transformation);
    console.log("After transform:", point.toString()); // outputs: "20 40"
    </script>

### transformCopy

Applies a transformation on a copy of the current point.
The callee coordinates will remain unchanged.

#### Parameters

##### tansformation `kendo.geometry.Transformation`

The transformation to apply.

#### Returns

`kendo.geometry.Point` The new Point instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var originalPoint = new geom.Point(10, 20);
    var transformation = new geom.Transformation();
    transformation.scale(2, 2);
    
    console.log("Original point:", originalPoint.toString()); // outputs: "10 20"
    var transformedCopy = originalPoint.transformCopy(transformation);
    console.log("Transformed copy:", transformedCopy.toString()); // outputs: "20 40"
    console.log("Original unchanged:", originalPoint.toString()); // outputs: "10 20"
    </script>

### translate

Translates the point along the x and y axis.

#### Parameters

##### dx `Number`

The distance to move along the X axis.

##### dy `Number`

The distance to move along the Y axis.

#### Returns

`kendo.geometry.Point` The current point instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(10, 20);
    
    console.log("Before translate:", point.toString()); // outputs: "10 20"
    point.translate(5, 10);
    console.log("After translate:", point.toString()); // outputs: "15 30"
    </script>

### translateWith

Translates the point by using a Point instance as a vector of translation.

#### Parameters

##### vector `kendo.geometry.Point|Array`

The vector of translation. Can be either a Point instance or an [x, y] array.

#### Returns

`kendo.geometry.Point` The current point instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(10, 20);
    var vector = new geom.Point(5, 10);
    
    console.log("Before translateWith:", point.toString()); // outputs: "10 20"
    point.translateWith(vector);
    console.log("After translateWith:", point.toString()); // outputs: "15 30"
    
    // Using array as vector
    point.translateWith([2, 3]);
    console.log("After translateWith array:", point.toString()); // outputs: "17 33"
    </script>

