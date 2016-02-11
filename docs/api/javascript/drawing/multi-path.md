---
title: MultiPath
page_title: API reference for methods and fields of Kendo UI DataViz Drawing MultiPath
---

# kendo.drawing.MultiPath : kendo.drawing.Element
Draws a composite path consisting of multiple sub-paths.
Using composite paths is more efficient than drawing the paths individually.

The interface of MultiPath mirrors that of [Path](path),
but each moveTo command starts a new sub-path.

#### Example - drawng a multi-path
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var multiPath = new draw.MultiPath()
            .moveTo(100, 200).curveTo([100, 100], [250, 100], [250, 200]).close()
            .moveTo(150, 150).lineTo(200, 150).close();

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

## Constructor Parameters

### options `Object`
The configuration options.

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

### paths `Array`
A collection of sub-[paths](path).

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
Closes the current sub-path by linking its current end point with its start point.

#### Example - Draw a closed sub-path
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var multiPath = new draw.MultiPath()
            .moveTo(100, 200).curveTo([100, 100], [250, 100], [250, 200]);

        // The following commands are interchangable
        multiPath.close();
        multiPath.lineTo(100, 200);

        // Draw the next sub-path
        multiPath.moveTo(150, 150).lineTo(200, 150).close();

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

#### Returns
`kendo.drawing.MultiPath` The current instance to allow chaining.


### curveTo
Draws a cubic Bézier curve (with two control points).

A quadratic Bézier curve (with one control point) can be plotted by making the control point equal.

#### Example - Draw a curved sub-path
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var multiPath = new draw.MultiPath()
            .moveTo(100, 200).curveTo([100, 100], [250, 100], [250, 200]).close()
            .moveTo(150, 150).lineTo(200, 150).close();

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

#### Parameters

##### controlOut `Array|kendo.geometry.Point`
The first control point for the curve.

##### controlIn `Array|kendo.geometry.Point`
The second control point for the curve.

##### endPoint `Array|kendo.geometry.Point`
The curve end point.

#### Returns
`kendo.drawing.MultiPath` The current instance to allow chaining.


### fill
Sets the shape [fill](#configuration-fill).

#### Parameters

##### color `String`
The [fill color](fill-options#fields-color) to set.

##### opacity `Number` *optional*
The [fill opacity](fill-options#fields-opacity) to set.

#### Returns
`kendo.drawing.MultiPath` The current instance to allow chaining.


### lineTo
Draws a straight line to the specified absolute coordinates.

#### Example - Draw a straight sub-path
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var multiPath = new draw.MultiPath()
            .moveTo(100, 200);

        // The following commands are interchangeable
        multiPath.lineTo(200, 200);
        multiPath.lineTo([200, 200]);
        multiPath.lineTo(new geom.Point(200, 200));

        multiPath.moveTo(150, 150).lineTo(200, 150).close();

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

#### Parameters

##### x `Number|Array|kendo.geometry.Point`
The line end X coordinate or a Point/Array with X and Y coordinates.

##### y `Number` *optional*
The line end Y coordinate.

Optional if the first parameter is a Point/Array.

#### Returns
`kendo.drawing.MultiPath` The current instance to allow chaining.


### moveTo
Creates a new sub-path or clears all segments and moves the starting point to the specified absolute coordinates.

#### Example - Set the sub-path start coordinates
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var multiPath = new draw.MultiPath();

        // The following commands are interchangeable
        multiPath.moveTo(100, 200);
        multiPath.moveTo([100, 200]);
        multiPath.moveTo(new geom.Point(100, 200));

        multiPath.lineTo(200, 200).close();
        multiPath.moveTo(150, 150).lineTo(200, 150).close();

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

#### Parameters

##### x `Number|Array|kendo.geometry.Point`
The starting X coordinate or a Point/Array with X and Y coordinates.

##### y `Number` *optional*
The starting Y coordinate.

Optional if the first parameter is a Point/Array.

#### Returns
`kendo.drawing.MultiPath` The current instance to allow chaining.


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
`kendo.drawing.MultiPath` The current instance to allow chaining.


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
