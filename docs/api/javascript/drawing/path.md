---
title: Path
page_title: API reference for Kendo UI Drawing API Path
---

# kendo.drawing.Path : kendo.drawing.Element
Draws a path consisting of linear or cubic Bézier curve segments.

#### Example - draw a path
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path()
            .moveTo(100, 200)
            .curveTo([100, 100], [250, 100], [250, 200])
            .lineTo(100, 200);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

## Constructor Parameters

### options `Object`
The configuration options.

## Class methods

### fromPoints
Create a straight path from the given points.

#### Parameters

##### points `Array`
Array of [kendo.geometry.Point](../geometry/point) objects or [x, y] arrays.

#### Returns
`kendo.drawing.Path` The newly constructed path.


### fromRect
Create a straight path from the given rectangle.

#### Parameters

##### rect `kendo.geometry.Rect`
The source rectangle to trace.

#### Returns
`kendo.drawing.Path` The newly constructed path.


### parse

Parses a path encoded in [SVG Path Data format](http://www.w3.org/TR/SVG/paths.html#PathData).

#### Example - Parse an SVG path
    <div id="container"></div>
    <script>
        var draw = kendo.drawing;
        var surface = draw.Surface.create($("#container"));

        var svgPath = "M 60,5.5 C 54.204,5.5 49.5,10.204 49.5,16 C 49.5,20.823785 52.753189,24.8962 57.1875,26.125 L 57.1875,30.1875 L 42.28125,30.1875 L 42.28125,35.125 L 57.1875,35.125 L 55.40625,100.3125 L 54.5,100.15625 L 47.46875,98.71875 L 40.8125,96.53125 L 34.78125,93.03125 L 29.1875,88.625 L 33.0625,84.75 L 17.46875,72.34375 L 21.03125,96.78125 L 26.34375,91.8125 L 30.28125,95.5 L 35.78125,100.03125 L 41.75,103.625 L 48.40625,105.875 L 55.40625,107.40625 L 56.125,114.84375 L 63.1875,114.84375 L 63.90625,107.78125 L 69.9375,106.625 L 76.65625,104.4375 L 82.90625,101.03125 L 88.5,96.6875 L 93.6875,91.8125 L 99,97.125 L 102.53125,72.34375 L 86.59375,85.09375 L 90.84375,89 L 89.71875,89.78125 L 83.8125,93.78125 L 77.59375,97.0625 L 70.875,99.1875 L 63.90625,100.6875 L 62.84375,35.125 L 77.75,35.125 L 77.75,30.1875 L 62.5,29.8125 L 62.5,26.1875 C 67.091818,25.066065 70.5,20.935656 70.5,16 C 70.5,10.204 65.796,5.5 60,5.5 z M 60,11 C 62.76,11 65,13.24 65,16 C 65,18.76 62.76,21 60,21 C 57.24,21 55,18.76 55,16 C 55,13.24 57.24,11 60,11 z";
        var path = draw.Path.parse(svgPath, {
            stroke: {
                color: "red",
                width: 1
            }
        });

        surface.draw(path);
    </script>

#### Parameters

##### svgPath `String`
The path encoded in [SVG Path Data format](http://www.w3.org/TR/SVG/paths.html#PathData).

##### options `Object` *optional*
The [configuration](#configuration) options for the path.

#### Returns
`kendo.drawing.Path` A path matching the supplied SVG data.

## Configuration

### clip `kendo.drawing.Path`
The element clipping path.
Inherited from [Element.clip](element#configuration-clip)

### cursor `String`
The element cursor.
Inherited from [Element.cursor](element#configuration-cursor)

### fill `kendo.drawing.FillOptions`
The fill options of the shape.

### opacity `Number`
The element opacity.
Inherited from [Element.opacity](element#configuration-opacity)

### stroke `kendo.drawing.StrokeOptions`
The stroke options of the shape.

### transform `kendo.geometry.Transformation`
The transformation to apply to this element.
Inherited from [Element.transform](element#configuration-transform)

### visible `Boolean`
A flag, indicating if the element is visible.
Inherited from [Element.visible](element#configuration-visible)

## Fields

### segments `Array`
A collection of the path [segments](segment).

## Methods

### bbox
Returns the bounding box of the element with transformations applied.
Inherited from [Element.bbox](element#methods-bbox)

#### Returns
`kendo.geometry.Rect` The bounding box of the element with transformations applied.


### clip
Gets or sets the element clipping path.
Inherited from [Element.clip](element#methods-clip)

#### Parameters

##### clip `kendo.drawing.Path`
The element clipping path.

#### Returns
`kendo.drawing.Path` The current element clipping path.


### clippedBBox
Returns the bounding box of the element with clipping and transformations applied.
Inherited from [Element.clippedBBox](element#methods-clippedBBox)

#### Returns
`kendo.geometry.Rect` The bounding box of the element with clipping transformations applied.


### close
Closes the path by linking the current end point with the start point.

#### Example - Draw a closed path
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path()
            .moveTo(100, 200)
            .curveTo([100, 100], [250, 100], [250, 200]);

        // The following commands are interchangable
        path.close();
        path.lineTo(100, 200);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Returns
`kendo.drawing.Path` The current instance to allow chaining.


### curveTo
Draws a cubic Bézier curve (with two control points).

A quadratic Bézier curve (with one control point) can be plotted by making the control point equal.

#### Example - Draw a curved path
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path()
            .moveTo(100, 200)
            .curveTo([100, 100], [250, 100], [250, 200])
            .lineTo(100, 200);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Parameters

##### controlOut `Array|kendo.geometry.Point`
The first control point for the curve.

##### controlIn `Array|kendo.geometry.Point`
The second control point for the curve.

##### endPoint `Array|kendo.geometry.Point`
The curve end point.

#### Returns
`kendo.drawing.Path` The current instance to allow chaining.


### fill
Sets the shape [fill](#configuration-fill).

#### Parameters

##### color `String`
The [fill color](fill-options#fields-color) to set.

##### opacity `Number` *optional*
The [fill opacity](fill-options#fields-opacity) to set.

#### Returns
`kendo.drawing.Path` The current instance to allow chaining.


### lineTo
Draws a straight line to the specified absolute coordinates.

#### Example - Draw a straight path
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var path = new draw.Path()
            .moveTo(100, 200);

        // The following commands are interchangeable
        path.lineTo(200, 200);
        path.lineTo([200, 200]);
        path.lineTo(new geom.Point(200, 200));

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Parameters

##### x `Number|Array|kendo.geometry.Point`
The line end X coordinate or a Point/Array with X and Y coordinates.

##### y `Number` *optional*
The line end Y coordinate.

Optional if the first parameter is a Point/Array.

#### Returns
`kendo.drawing.Path` The current instance to allow chaining.


### moveTo
Clears all existing segments and moves the starting point to the specified absolute coordinates.

#### Example - Set the path start coordinates
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var path = new draw.Path();

        // The following commands are interchangeable
        path.moveTo(100, 200);
        path.moveTo([100, 200]);
        path.moveTo(new geom.Point(100, 200));

        path.lineTo(200, 200);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Parameters

##### x `Number|Array|kendo.geometry.Point`
The starting X coordinate or a Point/Array with X and Y coordinates.

##### y `Number` *optional*
The starting Y coordinate.

Optional if the first parameter is a Point/Array.

#### Returns
`kendo.drawing.Path` The current instance to allow chaining.


### opacity
Gets or sets the element opacity.
Inherited from [Element.opacity](element#methods-opacity)

If set, the stroke and fill opacity will be multiplied by the element opacity.

#### Parameters

##### opacity `Number`
The element opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`Number` The current element opacity.


### stroke
Sets the shape [stroke](#configuration-stroke).

#### Parameters

##### color `String`
The [stroke color](stroke-options#fields-color) to set.

##### width `Number` *optional*
The [stroke width](stroke-options#fields-width) to set.

##### opacity `Number` *optional*
The [stroke opacity](stroke-options#fields-opacity) to set.

#### Returns
`kendo.drawing.Path` The current instance to allow chaining.


### transform
Gets or sets the transformation of the element.
Inherited from [Element.transform](element#methods-transform)

#### Parameters

##### transform `kendo.geometry.Transformation`
The transformation to apply to the element.

#### Returns
`kendo.geometry.Transformation` The current transformation on the element.


### visible
Gets or sets the visibility of the element.
Inherited from [Element.visible](element#methods-visible)

#### Parameters

##### visible `Boolean`
A flag indicating if the element should be visible.

#### Returns
`Boolean` true if the element is visible; false otherwise.
