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


<div class="meta-api-description">
Configure initial settings for creating a multi-path component by specifying various options that control its behavior, appearance, event handling, path definitions, attribute assignments, and nested configurations during instantiation. Enable setting up complex path structures, customize component properties on creation, manage default event listeners, and adjust any supported parameters from the start to tailor how the multi-path element functions and looks. This setup allows initializing comprehensive configurations, including paths array, style attributes, event hooks, and nested option objects to ensure precise control over multi-path rendering and interaction at object construction.
</div>

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


<div class="meta-api-description">
Set or configure the clipping path or mask to restrict rendering and visible areas of drawn shapes or elements, control which parts of graphics or drawings are visible by defining boundaries or regions, enable masking effects, trim geometry visibility, constrain rendering within specific shapes or layered compositions, control clipping regions for complex drawings, clip content dynamically or statically, specify custom clipping shapes or paths to hide or show portions of visual elements, manage masked areas for rendering optimizations, and apply clipping to limit drawing output to designated regions.
</div>

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


<div class="meta-api-description">
Control or customize the mouse pointer appearance when hovering over a complex path or shape by configuring or setting any CSS cursor style such as pointer, move, crosshair, or custom cursor icons. Enable different cursor types for interactive vector graphics, shapes, or multi-segment elements to enhance user experience, signal draggable areas, clickable regions, or drawing tools. Adjust or override the default mouse cursor display on graphical components, paths, or elements to indicate various user actions, focus, or interaction modes within web applications or UI components supporting CSS cursor values.
</div>

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


<div class="meta-api-description">
Set or customize the interior painting, shading, or coloring of shapes and graphics by controlling fill styles like solid colors, transparency levels, gradient blends, pattern overlays, or image-based fills, enabling developers to define how shapes are visually filled or rendered inside components, shapes, or drawings with options to adjust opacity, gradient direction, or pattern repetition for precise visual appearance and graphical effects.
</div>

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


<div class="meta-api-description">
Adjust or configure the transparency level of vector shapes to make paths partially or fully see-through, enabling layered visual effects, emphasis on specific elements, or control over click and hit detection. Users can set opacity values to fade shapes, blend multiple paths, reduce visibility, or highlight parts of complex vector graphics by varying transparency and translucency settings on graphic elements. This includes controlling how transparent or opaque vector components appear for composition, overlay, and interactive rendering scenarios.
</div>

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


<div class="meta-api-description">
Control and customize the outline appearance of a multi-segment shape by setting stroke properties such as color, width, opacity, dash patterns, line joins, and caps to style and modify path borders, adjust the look of shape outlines, enable dashed or solid lines, manage thickness and transparency, configure border styling, and update the visual presentation of connected path segments.
</div>

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


<div class="meta-api-description">
Control and customize tooltip content, appearance, display triggers, positioning, visibility, and templates for interactive shapes within multipath components, enabling dynamic data binding, conditional show or hide behavior, hover or click activation, style adjustments, and precise placement to enhance user interaction and information display on complex shape elements.
</div>

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


<div class="meta-api-description">
Configure geometric transformations including translation, rotation, scaling, or custom transformation matrices on graphical elements to control positioning and orientation within a drawing or rendering context. Enable setting or adjusting coordinate transforms to manipulate element layout, apply spatial modifications, or define complex transforms for rendering, hit-testing, or interaction handling. Support initializing or updating element transformations in vector graphics, canvas, or drawing frameworks, allowing developers to translate, rotate, resize, or apply matrix operations to shapes and paths within visual components.
</div>

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


<div class="meta-api-description">
Toggle display or visibility of complex multi-segment shapes, enabling you to show or hide intricate paths or vector graphics within your rendering context without deleting or removing them. Control visibility states to manage whether detailed drawn elements are rendered or interactable, useful for conditional display, dynamic hiding, or layer management in graphical interfaces. Configure visibility flags, set shape presentation on or off, and control rendering presence for multi-segment shapes, ensuring flexible manipulation of graphical components without losing their place in the drawing or scene hierarchy.
</div>

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


<div class="meta-api-description">
Retrieve and manipulate collections of individual sub-path elements within a composite shape structure, enabling retrieval, iteration, addition, removal, or dynamic modification of path segments or components inside complex multi-segment graphics or drawings during execution or after setup.
</div>

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


<div class="meta-api-description">
Retrieve the precise bounding rectangle of a complex shape after applying all transformations such as translation, rotation, scaling, and matrix operations to determine the object's exact position and size for tasks like collision detection, hit testing, layout adjustments, clipping boundaries, or exporting graphical data, ensuring accurate axis-aligned box dimensions that reflect the final transformed geometry and support computations related to element boundaries, spatial queries, or graphical interactions.
</div>

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


<div class="meta-api-description">
Control and customize the visible rendering region of graphical elements by setting, updating, retrieving, or removing the clipping area or path that confines the drawing boundaries. Enable masking, restrict rendering to specific shapes, inspect current clipping configurations, adjust or clear clipped zones to manage which portions of graphical shapes or elements appear within the drawing context, and manipulate the clipping boundaries dynamically to hide or show selective parts of visual content. Configure, apply, or query clipping paths to precisely define the visible areas during rendering and shape composition.
</div>

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


<div class="meta-api-description">
Calculate or retrieve the visible bounding box of a shape after all transformations like rotation, scaling, translation, and clipping are applied by computing the axis-aligned rectangle that fully contains the rendered outlines; this enables precise collision detection, hit testing, layout adjustments, export cropping, and visual boundary calculations for complex multi-path graphics, shapes, or elements that have clipping regions and multiple transform operations influencing their final displayed size and position.
</div>

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


<div class="meta-api-description">
Terminate or seal the current drawing segment by linking its endpoint back to the start point to form a closed shape, enabling the creation of filled or stroked polygons and precise hit detection; the operation completes one path portion so that further drawing commands initiate a new sub-path, supporting tasks like closing shapes, finalizing contours, ending paths, sealing polygons, or wrapping sub-paths for rendering and interaction purposes.
</div>

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


<div class="meta-api-description">
Check if a given coordinate or point is inside or overlaps with a complex shape or path for hit detection, collision checking, containment tests, or interactive responses in drawing or graphics applications; detect mouse clicks, touch inputs, or pointer events within intricate shapes, polygons, or irregular areas using point-in-path detection, spatial queries, or intersection tests to enable interaction logic, input handling, or area validation in canvas, vector graphics, or UI rendering environments.
</div>

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


<div class="meta-api-description">
Draw or extend complex smooth curves by creating cubic Bézier segments with two control points and an endpoint, enabling precise path shaping and curved line manipulation; adjust curve smoothness, customize control handles, generate flowing multi-segment paths, implement detailed vector shapes, and simulate quadratic Bézier curves by setting both control points identically while controlling curve geometry for advanced path drawing, interpolation, and shape design.
</div>

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


<div class="meta-api-description">
Configure the fill style, color, pattern, gradient, or transparency for complex shapes composed of multiple paths, controlling how the shape’s interior is rendered and displayed. Enable or modify solid fills, linear or radial gradients, image patterns, or adjust opacity and fill rules to customize the appearance of intricate vector shapes with layered contours. Set or update fill options dynamically for multi-segment paths to achieve desired visual effects, styling, or thematic coloring in vector graphics and UI elements.
</div>

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


<div class="meta-api-description">
Create or extend vector paths by drawing a straight line segment from the current point to specific absolute coordinates within a drawing or graphics context; this enables precise control over shape construction by connecting points directly using provided (x, y) positions in the component’s coordinate system. Techniques for adding line segments include setting exact endpoints, linking path points, and integrating with other path commands like move, arc, or curve to define custom shapes, outlines, polygons, or graphical paths for stroking and filling in vector-based drawing or canvas scenarios.
</div>

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


<div class="meta-api-description">
Set or reposition the starting point of a vector path by defining absolute coordinates to initiate a new sub-path or reset existing segments; control the beginning of shape drawing by moving the cursor without creating visible lines or curves, enabling precise placement of following path commands such as lineTo or curveTo. Adjust or configure the initial point for complex path constructions, start fresh segments, reposition path cursor locations, define move operations in vector graphics, and manage how drawing sequences begin in path-building workflows.
</div>

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


<div class="meta-api-description">
Control, configure, or retrieve the overall transparency level of complex path-based shapes by adjusting their global opacity, managing how see-through or solid multi-segment graphical elements appear, including the combined effect on stroke and fill visibility; this enables setting, modifying, or querying the translucency degree of vector paths to achieve various visual effects such as fading, blending, or highlighting shapes, and supports scenarios where you need to manipulate the element’s alpha channel to influence its entire rendering transparency consistently across all sub-paths.
</div>

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


<div class="meta-api-description">
Set or adjust the outline style, border appearance, or edge stroke of complex shapes and multi-segment paths by configuring stroke properties such as color, thickness, dash patterns, opacity, and line styles. Control or update path borders dynamically, customize shape outlines programmatically, manage multi-path stroke attributes, and bind or modify stroke visuals on the fly for drawing components requiring precise or dynamic border effects, including dashed lines, solid strokes, or transparent edges.
</div>

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


<div class="meta-api-description">
Retrieve or modify the geometric transformation of a multipath shape by accessing or setting its transformation matrix, including operations like translation, rotation, scaling, skewing, or applying custom affine transforms; configure, update, or replace the element’s current transform to control its position, orientation, and size within the coordinate space, supporting queries for the existing transform state or applying new transformation parameters programmatically.
</div>

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


<div class="meta-api-description">
Control or query the display state of individual paths within drawing components by toggling visibility on or off, enabling showing, hiding, or dynamically updating rendering of shapes through boolean flags or status checks, managing whether elements are visible, hidden, displayed, rendered, or interactable within vector graphics or canvas environments, supporting programmatic adjustments to rendering layers, element presence, or user interface feedback related to path visibility, allowing developers to enable or disable visual representation and interaction of specific graphical paths in code.
</div>

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