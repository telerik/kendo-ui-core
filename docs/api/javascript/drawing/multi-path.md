---
title: MultiPath
page_title: API reference for methods and fields of Kendo UI DataViz Drawing MultiPath
res_type: api
---

# kendo.drawing.MultiPath : kendo.drawing.Element

Draws a composite path consisting of multiple sub-paths.
Using composite paths is more efficient than drawing the paths individually.

The interface of MultiPath mirrors that of [Path](/api/javascript/drawing/multi-path/fields/paths),
but each moveTo command starts a new sub-path.

#### Example - drawing a multi-path

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

#### Example - creating a multi-path with options
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var multiPath = new draw.MultiPath({
            fill: {
                color: "red",
                opacity: 0.5
            },
            stroke: {
                color: "blue",
                width: 2
            }
        });

        multiPath.moveTo(50, 50).lineTo(150, 50).lineTo(100, 150).close();

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

## Configuration

### clip `kendo.drawing.Path`
The element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element#configuration-clip)

#### Example - setting clip path in configuration
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        // Create a clipping path
        var clipPath = new draw.Path()
            .moveTo(50, 50).lineTo(200, 50).lineTo(200, 200).lineTo(50, 200).close();

        var multiPath = new draw.MultiPath({
            clip: clipPath,
            fill: { color: "red" }
        });

        multiPath.moveTo(0, 0).lineTo(300, 0).lineTo(300, 300).lineTo(0, 300).close();

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

### cursor `String`
The element cursor.
Inherited from [Element.cursor](/api/javascript/drawing/element#configuration-cursor)

#### Example - setting cursor in configuration
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var multiPath = new draw.MultiPath({
            cursor: "pointer",
            fill: { color: "blue" }
        });

        multiPath.moveTo(50, 50).lineTo(200, 50).lineTo(125, 150).close();

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

### fill `kendo.drawing.FillOptions`
The fill options of the shape.

#### Example - setting fill options in configuration
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var multiPath = new draw.MultiPath({
            fill: {
                color: "green",
                opacity: 0.7
            }
        });

        multiPath.moveTo(50, 50).lineTo(200, 50).lineTo(200, 150).lineTo(50, 150).close()
                 .moveTo(75, 75).lineTo(175, 75).lineTo(175, 125).lineTo(75, 125).close();

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

### opacity `Number`
The element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element#configuration-opacity)

#### Example - setting opacity in configuration
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var multiPath = new draw.MultiPath({
            opacity: 0.3,
            fill: { color: "red" },
            stroke: { color: "black", width: 2 }
        });

        multiPath.moveTo(50, 50).lineTo(200, 50).lineTo(200, 200).lineTo(50, 200).close()
                 .moveTo(100, 100).lineTo(150, 100).lineTo(150, 150).lineTo(100, 150).close();

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

### stroke `kendo.drawing.StrokeOptions`
The stroke options of the shape.

#### Example - setting stroke options in configuration
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var multiPath = new draw.MultiPath({
            stroke: {
                color: "purple",
                width: 3,
                dashType: "dash"
            },
            fill: { color: "lightblue" }
        });

        multiPath.moveTo(50, 50).lineTo(200, 50).lineTo(200, 150).lineTo(50, 150).close()
                 .moveTo(75, 75).lineTo(175, 75).lineTo(125, 125).close();

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

### tooltip `kendo.drawing.TooltipOptions`
The tooltip options of the shape.

#### Example - setting tooltip in configuration
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var multiPath = new draw.MultiPath({
            tooltip: {
                content: "This is a multi-path shape"
            },
            fill: { color: "orange" }
        });

        multiPath.moveTo(50, 50).lineTo(200, 50).lineTo(125, 150).close()
                 .moveTo(75, 75).lineTo(175, 75).lineTo(125, 100).close();

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

### transform `kendo.geometry.Transformation`
The transformation to apply to this element.
Inherited from [Element.transform](/api/javascript/drawing/element#configuration-transform)

#### Example - setting transform in configuration
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var multiPath = new draw.MultiPath({
            transform: geom.transform().rotate(45, [125, 125]),
            fill: { color: "cyan" }
        });

        multiPath.moveTo(50, 50).lineTo(200, 50).lineTo(200, 200).lineTo(50, 200).close()
                 .moveTo(100, 100).lineTo(150, 100).lineTo(150, 150).lineTo(100, 150).close();

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

### visible `Boolean`
A flag, indicating if the element is visible.
Inherited from [Element.visible](/api/javascript/drawing/element#configuration-visible)

#### Example - setting visibility in configuration
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var multiPath1 = new draw.MultiPath({
            visible: true,
            fill: { color: "red" }
        });
        multiPath1.moveTo(50, 50).lineTo(150, 50).lineTo(100, 100).close();

        var multiPath2 = new draw.MultiPath({
            visible: false,
            fill: { color: "blue" }
        });
        multiPath2.moveTo(150, 150).lineTo(200, 150).lineTo(175, 200).close();

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath1);
        surface.draw(multiPath2); // This won't be visible
    </script>

## Fields

### paths `Array`
A collection of sub-[paths](/api/javascript/drawing/path).

#### Example - accessing the paths field
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var multiPath = new draw.MultiPath()
            .moveTo(50, 50).lineTo(150, 50).lineTo(100, 100).close()
            .moveTo(100, 150).lineTo(200, 150).lineTo(150, 200).close();

        // Access the paths collection
        console.log("Number of sub-paths: " + multiPath.paths.length);
        
        // Modify individual paths
        if (multiPath.paths.length > 0) {
            multiPath.paths[0].stroke({ color: "red", width: 2 });
        }

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

## Methods

### bbox
Returns the bounding box of the element with transformations applied.
Inherited from [Element.bbox](/api/javascript/drawing/element#methods-bbox)

#### Example - getting the bounding box
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var multiPath = new draw.MultiPath()
            .moveTo(50, 50).lineTo(150, 50).lineTo(100, 100).close()
            .moveTo(100, 150).lineTo(200, 150).lineTo(150, 200).close();

        var bbox = multiPath.bbox();
        console.log("Bounding box: " + bbox.toString());

        // Draw the bounding box for visualization
        var bboxRect = new draw.Rect(new kendo.geometry.Rect(bbox.origin, bbox.size), {
            stroke: { color: "red", width: 1, dashType: "dash" },
            fill: null
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
        surface.draw(bboxRect);
    </script>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with transformations applied.


### clip
Gets or sets the element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element#methods-clip)

#### Example - setting and getting clip path
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var multiPath = new draw.MultiPath()
            .moveTo(0, 0).lineTo(300, 0).lineTo(300, 300).lineTo(0, 300).close();

        // Create and set a circular clipping path
        var clipPath = new draw.Path()
            .moveTo(125, 50).arc(50, 125, 75, 0, 360, true).close();

        multiPath.clip(clipPath);
        multiPath.fill("blue");

        // Get the current clip path
        var currentClip = multiPath.clip();
        console.log("Clip path set: " + (currentClip !== null));

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

#### Parameters

##### clip `kendo.drawing.Path`
The element clipping path.

#### Returns
`kendo.drawing.Path` The current element clipping path.


### clippedBBox
Returns the bounding box of the element with clipping and transformations applied.
Inherited from [Element.clippedBBox](/api/javascript/drawing/element#methods-clippedBBox)

#### Example - getting the clipped bounding box
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var multiPath = new draw.MultiPath()
            .moveTo(0, 0).lineTo(300, 0).lineTo(300, 300).lineTo(0, 300).close();

        // Create a clipping path
        var clipPath = new draw.Path()
            .moveTo(50, 50).lineTo(200, 50).lineTo(200, 200).lineTo(50, 200).close();

        multiPath.clip(clipPath);
        multiPath.fill("green");

        var bbox = multiPath.bbox();
        var clippedBBox = multiPath.clippedBBox();
        
        console.log("Original bbox: " + bbox.toString());
        console.log("Clipped bbox: " + clippedBBox.toString());

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

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

### containsPoint
Returns true if the shape contains the specified point.

#### Example - checking if point is contained in multi-path
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var multiPath = new draw.MultiPath()
            .moveTo(50, 50).lineTo(150, 50).lineTo(100, 100).close()
            .moveTo(100, 150).lineTo(200, 150).lineTo(150, 200).close();

        multiPath.fill("lightblue");

        var testPoint1 = new geom.Point(75, 65);  // Inside first triangle
        var testPoint2 = new geom.Point(125, 125); // Outside both triangles
        var testPoint3 = new geom.Point(150, 175); // Inside second triangle

        console.log("Point (75, 65) contained: " + multiPath.containsPoint(testPoint1));
        console.log("Point (125, 125) contained: " + multiPath.containsPoint(testPoint2));
        console.log("Point (150, 175) contained: " + multiPath.containsPoint(testPoint3));

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

#### Parameters

##### point `kendo.geometry.Point`
The point that should be checked.

#### Returns
`Boolean` value indicating if the shape contains the point.

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
Sets the shape [fill](/api/javascript/drawing/multi-path#configuration-fill).

#### Example - setting fill with the fill method
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var multiPath = new draw.MultiPath()
            .moveTo(50, 50).lineTo(150, 50).lineTo(100, 100).close()
            .moveTo(100, 150).lineTo(200, 150).lineTo(150, 200).close();

        // Set fill color and opacity
        multiPath.fill("red", 0.7);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

#### Parameters

##### color `String`
The [fill color](/api/javascript/drawing/fill-options#fields-color) to set.

##### opacity `Number` *optional*
The [fill opacity](/api/javascript/drawing/fill-options#fields-opacity) to set.

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
Inherited from [Element.opacity](/api/javascript/drawing/element#methods-opacity)

If set, the stroke and fill opacity will be multiplied by the element opacity.

#### Example - setting and getting opacity
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var multiPath = new draw.MultiPath()
            .moveTo(50, 50).lineTo(150, 50).lineTo(100, 100).close()
            .moveTo(100, 150).lineTo(200, 150).lineTo(150, 200).close();

        multiPath.fill("blue").stroke("red", 2);

        // Set opacity to 50%
        multiPath.opacity(0.5);
        
        // Get current opacity
        console.log("Current opacity: " + multiPath.opacity());

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

#### Parameters

##### opacity `Number`
The element opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`Number` The current element opacity.


### stroke
Sets the shape [stroke](/api/javascript/drawing/multi-path#configuration-stroke).

#### Example - setting stroke with the stroke method
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var multiPath = new draw.MultiPath()
            .moveTo(50, 50).lineTo(150, 50).lineTo(100, 100).close()
            .moveTo(100, 150).lineTo(200, 150).lineTo(150, 200).close();

        // Set stroke color, width, and opacity
        multiPath.stroke("purple", 3, 0.8);
        multiPath.fill("yellow");

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

#### Parameters

##### color `String`
The [stroke color](/api/javascript/drawing/stroke-options#fields-color) to set.

##### width `Number` *optional*
The [stroke width](/api/javascript/drawing/stroke-options#fields-width) to set.

##### opacity `Number` *optional*
The [stroke opacity](/api/javascript/drawing/stroke-options#fields-opacity) to set.

#### Returns
`kendo.drawing.MultiPath` The current instance to allow chaining.


### transform
Gets or sets the transformation of the element.
Inherited from [Element.transform](/api/javascript/drawing/element#methods-transform)

#### Example - setting and getting transformation
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var multiPath = new draw.MultiPath()
            .moveTo(50, 50).lineTo(150, 50).lineTo(100, 100).close()
            .moveTo(100, 150).lineTo(200, 150).lineTo(150, 200).close();

        multiPath.fill("orange");

        // Apply rotation transformation
        var transformation = geom.transform().rotate(30, [125, 125]);
        multiPath.transform(transformation);

        // Get current transformation
        var currentTransform = multiPath.transform();
        console.log("Transform applied: " + (currentTransform !== null));

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);
    </script>

#### Parameters

##### transform `kendo.geometry.Transformation`
The transformation to apply to the element.

#### Returns
`kendo.geometry.Transformation` The current transformation on the element.


### visible
Gets or sets the visibility of the element.
Inherited from [Element.visible](/api/javascript/drawing/element#methods-visible)

#### Example - setting and getting visibility
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var multiPath = new draw.MultiPath()
            .moveTo(50, 50).lineTo(150, 50).lineTo(100, 100).close()
            .moveTo(100, 150).lineTo(200, 150).lineTo(150, 200).close();

        multiPath.fill("teal");

        var surface = draw.Surface.create($("#surface"));
        surface.draw(multiPath);

        // Make it invisible after 2 seconds
        setTimeout(function() {
            multiPath.visible(false);
            console.log("Visibility: " + multiPath.visible());
        }, 2000);

        // Make it visible again after 4 seconds
        setTimeout(function() {
            multiPath.visible(true);
            console.log("Visibility: " + multiPath.visible());
        }, 4000);
    </script>

#### Parameters

##### visible `Boolean`
A flag indicating if the element should be visible.

#### Returns
`Boolean` true if the element is visible; false otherwise.