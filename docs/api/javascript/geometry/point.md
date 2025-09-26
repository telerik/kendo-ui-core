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


<div class="meta-api-description">
Set or configure the horizontal position, x coordinate, or X-axis value of a geometric point during creation, initialization, or instantiation for use in layout arrangement, rendering placement, hit testing, spatial calculations, or coordinate system positioning; define, assign, specify, or provide the numeric horizontal location of a point within 2D space to control geometry points precisely along the horizontal axis.
</div>

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(15, 25);
    console.log("x coordinate:", point.x); // outputs: x coordinate: 15
    </script>

### y `Number`

The y coordinate of the point.


<div class="meta-api-description">
Set or configure the vertical position, vertical coordinate, or Y-axis value of a point when creating or positioning shapes within a drawing or graphic layout, enabling precise control over vertical alignment, placement, or transformation of points in 2D coordinate systems, canvases, or drawing components. This parameter is used to specify, adjust, or control how high or low a point appears in a graphical context by defining its Y value during shape construction or manipulation.
</div>

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(15, 25);
    console.log("y coordinate:", point.y); // outputs: y coordinate: 25
    </script>

## Fields

### x `Number`

The x coordinate of the point.


<div class="meta-api-description">
Control, access, or modify the horizontal position, x coordinate, or left-right placement of a point within graphical shapes, drawings, or geometric computations, enabling developers to get, set, or update the point’s horizontal value for accurate rendering, layout adjustments, spatial calculations, or positioning in 2D graphics and vector-based designs.
</div>

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(10, 20);
    console.log(point.x); // outputs: 10
    </script>

### y `Number`

The y coordinate of the point.


<div class="meta-api-description">
Set or retrieve the vertical position or Y coordinate of a point within graphical shapes or drawings, control the point's placement along the vertical axis, adjust or access the Y value in coordinate geometry for precise layout, manipulate the height or depth positioning on a canvas or shape, define or read the up-and-down location in 2D drawing components, modify or query vertical point data when configuring points in shapes or graphics, update the vertical coordinate for alignment or animation, get or set the Y axis value to control positioning within visual elements.
</div>

#### Example

    <script>
    var geom = kendo.geometry;
    var point = new geom.Point(10, 20);
    console.log(point.y); // outputs: 20
    </script>

## Class Methods

### create

Creates a Point instance from various parameters.


<div class="meta-api-description">
Generate or construct point objects from different input formats including separate x and y coordinates, coordinate pairs or arrays, objects with x and y properties, or other point-like structures, producing normalized point instances suitable for drawing, rendering, or graphical calculations. Enable flexible creation or conversion of diverse coordinate representations into consistent point data for geometry processing, spatial calculations, or canvas operations. Configure, instantiate, or transform various coordinate inputs into uniform point entities optimized for graphics applications.
</div>

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


<div class="meta-api-description">
Calculate or obtain the point with the minimum x and y coordinates from multiple points, extracting the smallest horizontal and vertical values to generate a new position representing either the top-left corner, the minimal bounding coordinate, or the clamped intersection of coordinate sets; this operation supports merging points, determining boundary limits, combining coordinate data, setting positional constraints, or identifying the lowest coordinate pair from various inputs.
</div>

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


<div class="meta-api-description">
Calculate the top-right or maximum coordinate point by comparing multiple points to find the highest x and y values combined, generating a new point representing the upper-right boundary without altering the original points; useful for determining bounding boxes, maximum extents, or limits when working with sets of coordinates, positions, or shapes in graphical or spatial computations where you need to aggregate or combine points to find the farthest right and top location across various coordinate inputs.
</div>

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


<div class="meta-api-description">
Calculate or retrieve the coordinate with the lowest x and y values from a geometry set to find the top-left corner, minimum bounds, smallest extent, or minimal coordinate point useful for bounding boxes, collision checks, layout positioning, normalization, or spatial calculations by identifying the minimal coordinate point from a collection of points or geometries.
</div>

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


<div class="meta-api-description">
Retrieve the point with the highest x and y coordinates by calculating the maximum values across all points in the shape or geometry, enabling you to determine the extreme upper-right boundary or largest coordinate for layout, bounding box calculations, spatial analysis, or positioning tasks. This function identifies the farthest point along both horizontal and vertical axes, useful for controlling geometry bounds, setting layout limits, defining maximum extents, or extracting the top-right corner coordinate from complex shapes or collections of points.
</div>

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


<div class="meta-api-description">
Create an exact duplicate of a coordinate point with the same x and y values to copy, replicate, or clone positions for independent modifications, transformations, translations, or comparisons without affecting the original point. This enables developers to generate new instances of geometry points for scenarios requiring separate editing, coordinate manipulation, or spatial operations while preserving the original data. The method supports use cases like duplicating drawing points, cloning locations for adjustments, or managing multiple versions of coordinates independently.
</div>

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


<div class="meta-api-description">
Calculate or determine the straight-line distance, Euclidean distance, or spatial gap between one geometric point and another coordinate pair or point object for measuring proximity, spacing, or distance in drawing and geometric computations, enabling distance calculation, geometric measurements, nearest neighbor finding, coordinate distance evaluation, or spatial analysis within coordinate units.
</div>

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


<div class="meta-api-description">
Check if two spatial points share identical coordinates, compare point positions for equality, validate or match geometry locations by assessing coordinate pairs, verify if one point overlaps or equals another in a drawing or graphical context, test for coordinate equivalence, determine whether points are the same exact location, confirm if two points align precisely, compare coordinate values for positional sameness, or use coordinate comparison to identify matching spots in geometric layouts.
</div>

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


<div class="meta-api-description">
Retrieve the horizontal coordinate or x value of a point’s position to determine its left-right placement, enable precise alignment, calculate transformations, perform hit testing, measure geometry layouts, extract numeric x-position data, or adjust rendering and serialization based on a point’s location in 2D space.
</div>

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


<div class="meta-api-description">
Retrieve the vertical position, y coordinate, or height value of a point in a geometric shape or drawing object by accessing or extracting its numeric vertical component, get the second coordinate representing elevation or north-south position, obtain the y-axis value, or query the spatial point’s vertical location for layout, rendering, mapping, or graphical computations where reading or using the point’s vertical numeric data is required after the point instance or geometry object exists.
</div>

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


<div class="meta-api-description">
Adjusting or updating a point's position by setting new x and y coordinates, translating or relocating a point within a drawing or graphic surface, controlling or changing the spatial location of a point in coordinate space, repositioning a geometric point element interactively or programmatically, moving a point’s internal coordinates to new values to reflect changes in layout or design, configuring point placement by shifting coordinates to desired locations, modifying the position of a drawing element by assigning fresh x and y values, enabling coordinate-based repositioning of points in graphics or mapping contexts, recalculating and applying new spatial positions for points within 2D canvas environments, and dynamically translating points to updated coordinates for visual or programmatic adjustments.
</div>

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


<div class="meta-api-description">
Rotate a two-dimensional coordinate or point around a chosen pivot or center by a specified angle to compute new positions for rendering, transforming shapes, rotating paths, performing geometric calculations, or adjusting coordinates for hit-testing and interaction. This operation enables setting rotation angles, enabling coordinate transformations, applying rotational math to points in drawing contexts, adjusting positions dynamically, and controlling orientation in 2D space for graphics, UI elements, or computational geometry tasks.
</div>

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


<div class="meta-api-description">
Round or adjust coordinate precision for points by configuring the number of decimal places in point coordinates, control or normalize geometry coordinates for comparison, serialization, display, or drawing purposes, set fractional digit precision for coordinates to reduce noise or improve consistency when working with spatial data points, enable rounding of point coordinate values to a defined decimal accuracy, and format geometry points by limiting coordinate decimals to streamline data processing, rendering, or equality checks.
</div>

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


<div class="meta-api-description">
Adjust or transform a point's position by resizing its coordinates along horizontal and vertical axes, enabling uniform or non-uniform scaling effects such as zooming, stretching, shrinking, or geometric transformations. Configure scale factors to multiply the x and y values for precise control over spatial adjustments, coordinate manipulation, resizing operations, or dynamic scaling in graphical computations, map coordinates manipulation, or geometry transformations within applications that require flexible scaling of 2D points.
</div>

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


<div class="meta-api-description">
Create a scaled duplicate of a point’s coordinates without altering the original location by generating a new point with multiplied x and y values based on a scale factor, enabling non-destructive transformations, cloning, resizing, vector scaling, coordinate adjustments, and manipulation in graphics, drawing, or geometric computations while preserving the initial point data for safe reuse and comparison.
</div>

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


<div class="meta-api-description">
Adjust, update, or modify the horizontal position or x-coordinate of a point object in geometry by setting a new numeric value, enabling control over the point’s location on the x-axis for dynamic geometry updates, repositioning, coordinate manipulation, or recalculations in spatial operations, map rendering, graphical transformations, or any scenario requiring programmatic control over the point’s horizontal placement within a coordinate system.
</div>

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


<div class="meta-api-description">
Update, modify, or change the vertical coordinate of a point by setting its y value to a new number, enabling repositioning or adjusting the location along the y-axis within geometric structures. This functionality supports dynamic geometry manipulation, coordinate editing, and spatial data updates by directly altering the y position of a point in place, suitable for interactive mapping, coordinate systems, geometry transformations, and programmatic location adjustments.
</div>

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


<div class="meta-api-description">
Convert or extract point coordinates into a numeric array or tuple for use in calculations, data serialization, JSON formatting, API parameters, or mathematical operations, enabling easy access to the x and y values as a simple ordered pair or list for spatial data processing, geometry manipulation, coordinate transformations, vector math, or passing concise numeric representations of points between functions and services.
</div>

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


<div class="meta-api-description">
Convert a geometric point's coordinates into a human-readable string format for display, logging, debugging, serialization, or output purposes, enabling easy visualization and textual representation of coordinate data, formatting point values to a concise string form that can be used in UI elements, console logs, or data export scenarios where a simple, clear depiction of location or position is required.
</div>

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


<div class="meta-api-description">
Adjusting a point's location by applying geometric changes such as rotation, scaling, translation, or custom matrix transformations, this method modifies the coordinates directly, enabling users to reposition, rotate, resize, or transform points within drawings and graphics by overwriting existing coordinates with the new calculated values in place.
</div>

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


<div class="meta-api-description">
Generate a new point with applied transformations such as rotation, scaling, or translation without altering the original coordinates, enabling immutable coordinate manipulation, functional-style operations on points, cloning and transforming points safely for drawing or graphics calculations, obtaining transformed copies to preserve original data integrity, applying matrix transformations to a duplicate point for coordinate adjustments, performing non-destructive geometric transformations for rendering or spatial computations, creating modified point instances that reflect transformation results while keeping source points unchanged, and handling coordinate transformations in a way that supports pure functions and avoids side effects.
</div>

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


<div class="meta-api-description">
Shift or move a point's position by applying horizontal and vertical offsets, adjust the x and y coordinates to reposition shapes or graphical elements, translate points to new locations using specified delta values, apply coordinate transformations for points in vector graphics or geometry contexts, control point displacement along axes for path manipulation and drawing adjustments, set or update point positions by adding x and y increments, enable coordinate translation for repositioning geometric points in 2D space, modify point placement relative to original coordinates for shape transformations and layout changes.
</div>

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


<div class="meta-api-description">
Shift or move a point by applying a translation vector defined by another point’s X and Y coordinates to reposition geometric points, adjust coordinates, translate locations, perform 2D spatial transformations, offset points by given horizontal and vertical amounts, update point positions based on vector input, control point displacement using coordinate offsets, and manipulate geometric shapes through point translation with flexible vector-based movement.
</div>

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

