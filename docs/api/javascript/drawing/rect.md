---
title: Rect
page_title: API reference for Kendo UI Drawing API Rect
res_type: api
---

# kendo.drawing.Rect : kendo.drawing.Element

Draws a rectangle with set geometry, fill and stroke.

#### Example - creating a rect

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry).stroke("red", 1);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

## Constructor Parameters

### geometry `kendo.geometry.Rect`
The geometric object that defines the rectangle origin and size.


<div class="meta-api-description">
How do I set the initial position and size of a rectangle in Kendo UI's drawing API? Set or configure the initial position and size of a rectangle by specifying coordinates and dimensions, including origin points and width and height values, to control the bounds, layout, and placement of the shape during creation or drawing operations. Define geometric properties such as the x and y origin, overall size, bounding box, or frame dimensions to establish the rectangle's spatial parameters, initialize layout constraints, or manage shape positioning through geometry input. Enable precise setup of rectangular area coordinates and measurement when instantiating shapes, controlling visual boundaries, spatial layout, or graphical composition by supplying detailed geometric configuration for defining origin and extent.
</div>

#### Example - creating a rect

    <div id="surface"></div>
    <script>
      // Import the Drawing API namespaces
      var geom = kendo.geometry;
      var draw = kendo.drawing;

      var rectGeom = new geom.Rect([5, 5], [200, 100]);

      var rectangle = new draw.Rect(rectGeom, {
        fill: {
          color: "#33ccff"
        }
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(rectangle);
    </script>

### options `Object`
The configuration options.


<div class="meta-api-description">
How do I customize a rectangle's appearance when creating it with Kendo UI Drawing API? Set up initial size, position, styling, and configuration parameters when creating a rectangular drawing shape by passing an options object during construction; customize appearance, layout coordinates, dimensions, visual styles, and other startup properties to control how the rectangle renders and behaves from the moment it is instantiated, enabling flexible setup of default attributes and appearance settings for vector shape creation.
</div>

#### Example - creating a rect

    <div id="surface"></div>
    <script>
      // Import the Drawing API namespaces
      var geom = kendo.geometry;
      var draw = kendo.drawing;

      var rectGeom = new geom.Rect([5, 5], [200, 100]);

      var rectangle = new draw.Rect(rectGeom, {
        fill: {
          color: "#33ccff"
        }
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(rectangle);
    </script>

## Configuration

### clip `kendo.drawing.Path`
The element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element#configuration-clip)


<div class="meta-api-description">
How do I set a custom clipping path for a rectangle in Kendo UI drawing? Control, define, or set a clipping path to mask, crop, or restrict the visible region of a rectangle or drawing area by specifying custom shape boundaries, trim or hide content rendered outside designated paths, enable clipping or masking of graphical elements to control which portions appear visible, configure element clipping for precise rendering restrictions, and manage visibility edges of rectangular shapes within drawing components or graphical elements.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        // Create a rect
        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("blue");

        // Create a clipping path
        var clipPath = new draw.Path().moveTo(10, 10).lineTo(90, 10).lineTo(90, 90).lineTo(10, 90).close();

        // Apply the clipping path
        rect.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### cursor `String`
The element cursor.
Inherited from [Element.cursor](/api/javascript/drawing/element#configuration-cursor)


<div class="meta-api-description">
How to set custom cursor styles for drawing rectangles in Kendo UI? Control and customize the mouse pointer appearance over a drawable rectangular area by setting the interactive cursor style, such as pointer, move, default, or any CSS cursor type, to indicate different interaction modes during drawing, dragging, hovering, or selection within the drawing interface, enabling clear visual feedback for user actions and precise cursor behavior configuration on the rectangular drawing region.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry, {
            fill: { color: "red" },
            cursor: "pointer"
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### fill `kendo.drawing.FillOptions`
The fill options of the shape.


<div class="meta-api-description">
How to set the fill style for a rectangle in Kendo UI Drawing API? Set or adjust the fill style, color, opacity level, gradient shading, image overlay, or pattern design for a rectangle shape within a drawing or graphic component, enabling control over the visual background, paint, texture, or fill effect applied to the shape's interior area, including specifying solid colors, semi-transparent fills, linear or radial gradients, custom image fills, or repeating patterns to customize and style the shape’s appearance in rendering or graphic layouts.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry, {
            fill: {
                color: "#ff6600",
                opacity: 0.8
            }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### opacity `Number`
The element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element#configuration-opacity)


<div class="meta-api-description">
How to set transparency level for a shape in Kendo UI DrawingRect? Adjust the transparency level or alpha of a shape or rectangle within a drawing area by setting its opacity value, controlling how visible or see-through the rendered shape appears; configure translucency, blending, fade effects, or partial visibility using a numeric opacity factor typically ranging between fully transparent and fully opaque to customize visual transparency and layering for graphics, UI elements, or design components.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry, {
            fill: { color: "blue" },
            opacity: 0.5
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### stroke `kendo.drawing.StrokeOptions`
The stroke options of the shape.


<div class="meta-api-description">
How do I customize the border of a rectangular shape in Kendo UI for jQuery Drawing API? Set, customize, or control the outline appearance of a rectangular shape’s border including stroke color, thickness, dash patterns, transparency, and other style attributes to define how the rectangle edge is visually rendered or highlighted in drawings, shapes, or UI components. Adjust the border stroke to enable solid, dashed, dotted, or custom stroke styles, manage border visibility and opacity, and fine-tune the thickness for precise visual effects and styling consistent with design or drawing requirements.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry, {
            stroke: {
                color: "green",
                width: 3,
                opacity: 0.9
            }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### tooltip `kendo.drawing.TooltipOptions`
The tooltip options of the shape.


<div class="meta-api-description">
How to customize tooltip for rectangle shapes in Kendo UI drawing tools? Customize and control the tooltip text, appearance, template, position, visibility triggers, delay timings, and show or hide behavior for rectangle shapes in drawing tools, enabling configuration of content display, dynamic templates, placement options like top or bottom, mouse or focus activation, automatic hide delays, and full control over when and how tooltips appear on shapes within graphics or diagramming components.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry, {
            fill: { color: "purple" },
            tooltip: {
                content: "This is a rectangle"
            }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### transform `kendo.geometry.Transformation`
The transformation to apply to this element.
Inherited from [Element.transform](/api/javascript/drawing/element#configuration-transform)


<div class="meta-api-description">
How do I control the position and rotation of a drawing rectangle in Kendo UI for jQuery? Control and modify the position, rotation, size scaling, and skewing of a rectangular drawing area by applying transformation matrices or lists to adjust its coordinate space. Enable movement, rotation angles, resizing, distortion, or complex combined transforms on a drawing rectangle by setting or configuring the transformation properties affecting its rendering and layout. Adjust translation coordinates, apply rotation degrees, scale factors, or skew parameters to dynamically reshape or reposition the graphical rectangle within its container or canvas. Customize or animate the spatial orientation and scale of a drawing box by defining transformation sequences or matrix operations to control how the shape is transformed visually and spatially.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry, {
            fill: { color: "orange" }
        });

        // Apply rotation transformation
        var transform = geom.transform().rotate(45, [50, 50]);
        rect.transform(transform);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### visible `Boolean`
A flag, indicating if the element is visible.
Inherited from [Element.visible](/api/javascript/drawing/element#configuration-visible)


<div class="meta-api-description">
How do I show or hide a graphical rectangle in Kendo UI's drawingapi? Control the display or concealment of the rectangular drawing element by enabling or disabling its visibility, allowing you to toggle the shape’s presence on the canvas, show or hide graphical rectangles, and manage whether the shape is rendered or excluded from rendering and user interaction such as hit-testing. Adjust visibility settings to configure rendering behavior, manage UI element display states, toggle graphical overlays, enable or disable hit detection on the rectangle, and control whether the shape participates in input events or rendering cycles by setting its visibility to true or false.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry, {
            fill: { color: "red" },
            visible: false
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);

        // Make it visible after 2 seconds
        setTimeout(function() {
            rect.visible(true);
        }, 2000);
    </script>

## Methods

### bbox
Returns the bounding box of the element with transformations applied.
Inherited from [Element.bbox](/api/javascript/drawing/element#methods-bbox)


<div class="meta-api-description">
How do I get the exact position and size of a rotated rectangle in Kendo UI's drawing space? Retrieve or calculate the precise axis-aligned bounding box of a transformed rectangle, including its position and dimensions after applying all transformations such as translation, rotation, scaling, and inherited parent transformations; this method outputs the adjusted coordinates and size values (x, y, width, height) within the drawing space, enabling developers to determine the exact spatial boundaries, collision areas, or layout constraints of graphic elements regardless of their current orientation or scale, supporting use cases like hit-testing, layout calculation, rendering optimization, or geometric queries.
</div>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with transformations applied.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([50, 50], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("blue");

        // Get the bounding box
        var bbox = rect.bbox();
        console.log("Bounding box:", bbox.topLeft(), bbox.size);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>


### clip
Gets or sets the element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element#methods-clip)


<div class="meta-api-description">
How to set a new clipping path for a Kendo UI drawing rectangle? control, configure, or retrieve the clipping region or mask of a rectangular drawing area, including setting a new clipping path or obtaining the current mask shape; enable or update the visible area by applying clipping boundaries, manage the visible portion through clip paths, manipulate or query the clipped region of a drawable rectangle, adjust or read the masking shape to restrict rendering, and customize how content is visually constrained within rectangular drawing elements using clipping masks or paths.
</div>

#### Parameters

##### clip `kendo.drawing.Path`
The element clipping path.

#### Returns
`kendo.drawing.Path` The current element clipping path.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("red");

        // Create and set a clipping path
        var clipPath = new draw.Path().moveTo(20, 20).lineTo(80, 20).lineTo(80, 80).lineTo(20, 80).close();
        rect.clip(clipPath);

        // Get the current clipping path
        var currentClip = rect.clip();
        console.log("Current clip path:", currentClip);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>


### clippedBBox
Returns the bounding box of the element with clipping and transformations applied.
Inherited from [Element.clippedBBox](/api/javascript/drawing/element#methods-clippedBBox)


<div class="meta-api-description">
How do I get the actual visible bounding box coordinates of a drawn element in Kendo UI for jQuery after applying all clipping regions? Retrieve the precise visible bounding box coordinates of a drawn element after applying all clipping regions, masks, and transformations like scaling, rotation, or translation to accurately measure layout dimensions, detect overlaps or collisions, and export or analyze the element’s final rendered position and size within the drawing or graphics context. This method enables calculation of the element's adjusted bounding rectangle considering all visual modifiers, enabling tasks such as layout validation, hit-testing, spatial queries, or exporting clipped geometry coordinates from complex drawings or vector graphic components.
</div>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with clipping transformations applied.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([50, 50], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("blue");

        // Apply clipping
        var clipPath = new draw.Path().moveTo(60, 60).lineTo(120, 60).lineTo(120, 120).lineTo(60, 120).close();
        rect.clip(clipPath);

        // Get the clipped bounding box
        var clippedBBox = rect.clippedBBox();
        console.log("Clipped bounding box:", clippedBBox.topLeft(), clippedBBox.size);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### containsPoint
Returns true if the shape contains the specified point.


<div class="meta-api-description">
How to check if a point lies within a rectangular shape in Kendo UI for jQuery drawingapi? Check whether a specific coordinate or point lies within the boundaries of a rectangular shape to enable hit testing, pointer collision detection, spatial queries, or interaction handling with shapes; this includes determining if a screen position, mouse click, touch point, or coordinate intersects, overlaps, or is contained inside the rectangle area for interactive graphics, UI element hit areas, or collision logic in drawing or canvas components.
</div>

#### Parameters

##### point `kendo.geometry.Point`
The point that should be checked.

#### Returns
`Boolean` value indicating if the shape contains the point.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([50, 50], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("green");

        // Check if points are inside the rectangle
        var point1 = new geom.Point(75, 75); // Inside
        var point2 = new geom.Point(25, 25); // Outside

        console.log("Point 1 inside:", rect.containsPoint(point1)); // true
        console.log("Point 2 inside:", rect.containsPoint(point2)); // false

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### geometry
Gets or sets the rectangle geometry.


<div class="meta-api-description">
How do I adjust the rectangle boundaries in Kendo UI Drawing Rect? Configure or retrieve rectangular boundaries, rectangle size, position, or dimensions programmatically by accessing or updating the geometry of a drawing rectangle shape. Control, read, or set the rectangle’s coordinates and bounds for layout adjustments, rendering updates, spatial calculations, or collision detection by manipulating the rectangle area or geometry data. Enable getting or setting the rectangle frame, bounding box, or geometric properties to dynamically modify the placement and size of rectangular drawing elements within your code.
</div>

#### Parameters

##### value `kendo.geometry.Rect`
The new geometry to use.

#### Returns
`kendo.geometry.Rect` The current rectangle geometry.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("purple");

        // Get current geometry
        var currentGeom = rect.geometry();
        console.log("Current geometry:", currentGeom.topLeft(), currentGeom.size);

        // Set new geometry
        var newGeometry = new geom.Rect([50, 50], [150, 75]);
        rect.geometry(newGeometry);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>


### fill
Sets the shape [fill](/api/javascript/drawing/rect#configuration-fill).


<div class="meta-api-description">
How do I change the fill color of a rectangle in a Kendo UI drawing context? Configure or update the fill style of a rectangle shape within a drawing context by applying solid colors, gradient transitions, image textures, or repeating pattern fills to modify its visual appearance dynamically; this method enables control over shape coloring, enables runtime changes to fills, supports various fill configurations, and allows setting or replacing backgrounds of rectangular drawing elements for customization, styling, or theming purposes.
</div>

#### Parameters

##### color `String`
The [fill color](/api/javascript/drawing/fill-options#fields-color) to set.

##### opacity `Number` *optional*
The [fill opacity](/api/javascript/drawing/fill-options#fields-opacity) to set.

#### Returns
`kendo.drawing.Rect` The current instance to allow chaining.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry);

        // Set fill color and opacity
        rect.fill("red", 0.7);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>


### opacity
Gets or sets the element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element#methods-opacity)

If set, the stroke and fill opacity will be multiplied by the element opacity.


<div class="meta-api-description">
How do I set the transparency level of a Kendo UI drawing element using the DrawingRect.opacity method? Adjust, configure, or retrieve the transparency level of a graphical element by setting or getting its opacity value, typically as a decimal between zero and one, affecting both fill and stroke visibility uniformly. Control how translucent or solid the shape appears in drawing operations, enabling dynamic updates to element alpha or transparency for layering, fading, or visual effects. Use this property to modulate element see-through intensity, toggle visibility fade, or fine-tune the overall element transparency, reflecting changes immediately or querying current opacity state. Manage and query the alpha blend factor for graphical components to create overlays, highlight effects, or subtle visibility adjustments in vector graphics.
</div>

#### Parameters

##### opacity `Number`
The element opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`Number` The current element opacity.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("blue");

        // Set opacity
        rect.opacity(0.6);

        // Get current opacity
        var currentOpacity = rect.opacity();
        console.log("Current opacity:", currentOpacity);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>


### stroke
Sets the shape [stroke](/api/javascript/drawing/rect#configuration-stroke).


<div class="meta-api-description">
How do I change the outline color of a Kendo UI drawing rectangle? Adjust, update, or configure the outline, border, or edge styling of a rectangular drawing shape by setting stroke properties like color, thickness, dash patterns, opacity, and other stroke attributes dynamically after creation, enabling developers to control and customize shape borders, outlines, and line styles programmatically through methods that apply new stroke settings instantly for visual customization and design adjustments.
</div>

#### Parameters

##### color `String`
The [stroke color](/api/javascript/drawing/stroke-options#fields-color) to set.

##### width `Number` *optional*
The [stroke width](/api/javascript/drawing/stroke-options#fields-width) to set.

##### opacity `Number` *optional*
The [stroke opacity](/api/javascript/drawing/stroke-options#fields-opacity) to set.

#### Returns
`kendo.drawing.Rect` The current instance to allow chaining.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("yellow");

        // Set stroke color, width, and opacity
        rect.stroke("black", 3, 0.8);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>


### transform
Gets or sets the transformation of the element.
Inherited from [Element.transform](/api/javascript/drawing/element#methods-transform)


<div class="meta-api-description">
How do I apply a rotation to a Kendo UI drawing rectangle using its transform method? Accessing or modifying the transformation matrix, affine transform, or coordinate system of a drawing element to control its scale, rotation, translation, position, or skew for rendering and interaction purposes, enabling retrieval of the current transformation state or applying a new transform to change how the drawing rectangle is displayed or manipulated within the drawing component or graphical interface.
</div>

#### Parameters

##### transform `kendo.geometry.Transformation`
The transformation to apply to the element.

#### Returns
`kendo.geometry.Transformation` The current transformation on the element.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([50, 50], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("cyan");

        // Apply scale and rotation transformation
        var transform = geom.transform().scale(1.5, 1.5).rotate(30, [100, 100]);
        rect.transform(transform);

        // Get current transformation
        var currentTransform = rect.transform();
        console.log("Current transformation:", currentTransform);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>


### visible
Gets or sets the visibility of the element.
Inherited from [Element.visible](/api/javascript/drawing/element#methods-visible)


<div class="meta-api-description">
How do I make a rectangle visible in Kendo UI drawing? Control or check the display status of a rectangle shape within the drawing interface by setting or retrieving its visibility state, enabling toggling between visible and hidden modes, managing rendering presence, responding to user interaction availability, conditionally showing or hiding graphical elements, configuring display flags, and querying if the shape is currently rendered on screen or concealed in the drawing context.
</div>

#### Parameters

##### visible `Boolean`
A flag indicating if the element should be visible.

#### Returns
`Boolean` true if the element is visible; false otherwise.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("magenta");

        // Set visibility
        rect.visible(true);

        // Get current visibility
        var isVisible = rect.visible();
        console.log("Is visible:", isVisible);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);

        // Toggle visibility after 2 seconds
        setTimeout(function() {
            rect.visible(!rect.visible());
        }, 2000);
    </script>
