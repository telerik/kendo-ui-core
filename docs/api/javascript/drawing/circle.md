---
title: Circle
page_title: API reference for Kendo UI Drawing API Circle
res_type: api
---

# kendo.drawing.Circle : kendo.drawing.Element

Draws a circle with set geometry, fill and stroke.

#### Example - creating a circle
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 20);
        var circle = new draw.Circle(circleGeometry).stroke("red", 1);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

## Constructor Parameters

### geometry `kendo.geometry.Circle`
The geometric object that defines the circle center and radius.


<div class="meta-api-description">
Set or provide the geometric definition specifying the circle's center point and radius to control the position, size, and shape of the circle during creation or rendering. Configure the initial spatial parameters defining circle geometry for layout, drawing, or visualization purposes. Enable precise control over circle center coordinates and radius as input when instantiating or constructing a circle element for consistent placement, scaling, or interactive manipulation. Supply or define the core circle shape attributes upfront to influence how the component calculates and displays the circular area based on radius and center point data.
</div>

#### Example - creating a circle
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 20);
        var circle = new draw.Circle(circleGeometry).stroke("red", 1);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### options `Object`
The configuration options.


<div class="meta-api-description">
Configure circle shape settings during creation by specifying appearance attributes, styling parameters, visual customization options, and behavior controls within the initialization input or constructor argument. Customize circle element properties such as radius, color, stroke, fill, opacity, and interaction features at the time of instantiation to tailor drawing component circles with precise layout, style, and functional details. Enable or adjust circle configuration dynamically via options provided when building or setting up a shape to influence rendering, event handling, and display characteristics immediately upon construction.
</div>

#### Example - Log in the console the circle options object
    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var circleGeometry = new geom.Circle([100, 100], 20);
      var circle = new draw.Circle(circleGeometry).stroke("red", 1);
      //press f!2 to open the console to see the logged options
      console.log(circle.options)

      var surface = draw.Surface.create($("#surface"));
      surface.draw(circle);
    </script>

## Configuration

### clip `kendo.drawing.Path`
The element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element/configuration/clip)


<div class="meta-api-description">
Control or configure shape masking, cropping, and boundary constraints on circular drawings by defining clipping paths or masks that limit the visible rendering area. Enable or set complex clip shapes, paths, or region references to restrict drawing to custom boundaries, trim visuals, create intersection-based visibility, or mask certain parts of circle elements. Adjust clipping regions for the circle shape to achieve partial renders, masks, or intricate crop effects, supporting user scenarios involving visible area limitation, shape intersection, and constrained rendering on circular graphical objects.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        // Create a circle
        var circleGeometry = new geom.Circle([100, 100], 50);
        var circle = new draw.Circle(circleGeometry).stroke("red", 2).fill("lightblue");

        // Create a clipping path (rectangle)
        var clipPath = new draw.Path()
            .moveTo(75, 75)
            .lineTo(125, 75)
            .lineTo(125, 125)
            .lineTo(75, 125)
            .close();

        // Apply the clipping path to the circle
        circle.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### cursor `String`
The element cursor.
Inherited from [Element.cursor](/api/javascript/drawing/element/configuration/cursor)


<div class="meta-api-description">
Control and customize the appearance of the mouse pointer when hovering over or interacting with circular shapes in drawing or canvas components by specifying any valid CSS cursor style, enabling developers to change the pointer icon to common states like pointer, crosshair, grab, move, or custom cursor styles for enhanced user interaction and visual feedback on circle elements within graphical interfaces.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry, {
            cursor: "pointer",
            fill: { color: "lightgreen" },
            stroke: { color: "darkgreen", width: 2 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### fill `kendo.drawing.FillOptions`
The fill options of the shape.


<div class="meta-api-description">
Configure and customize the fill appearance of a circle shape including solid colors, gradients, patterns, opacity levels, image fills, and other fill styles to control the interior rendering and visual presentation of circular shapes in drawing or graphics components, enabling developers to set, change, or enable various fill options such as color strings, gradient stops, transparency, textures, or image sources to achieve the desired look and visual effects for circles in vector graphics, canvas, or UI elements.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 40);
        var circle = new draw.Circle(circleGeometry, {
            fill: {
                color: "orange",
                opacity: 0.7
            },
            stroke: { color: "darkorange", width: 3 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### opacity `Number`
The element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element/configuration/opacity)


<div class="meta-api-description">
Adjust the transparency level, alpha value, or visual opacity of a circle shape for rendering effects, enabling control over how see-through, translucent, or fully opaque the circle appears in graphics or UI. Set or configure the alpha channel intensity, fade the circle for layering or highlighting, and manipulate the visibility or blending of the circular element in custom drawings, animations, or user interface components. Modify the circle's transparency to achieve desired visual emphasis, background blending, or subtlety in design, using standard opacity semantics consistent with base elements supporting alpha transparency, translucency, and rendering behavior.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 35);
        var circle = new draw.Circle(circleGeometry, {
            opacity: 0.5,
            fill: { color: "purple" },
            stroke: { color: "darkpurple", width: 2 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### stroke `kendo.drawing.StrokeOptions`
The stroke options of the shape.


<div class="meta-api-description">
Customize the circle's border by setting stroke options including color, thickness, transparency, dash styles, and other outline attributes to control the circle’s edge appearance, border styling, line patterns, stroke opacity, and width for precise rendering, enabling developers to adjust how the circle's outline looks in drawings, shapes, or vector graphic components.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry, {
            stroke: {
                color: "blue",
                width: 4,
                opacity: 0.8,
                dashType: "dash"
            },
            fill: { color: "lightblue" }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### tooltip `kendo.drawing.TooltipOptions`
The tooltip options of the shape.


<div class="meta-api-description">
Control and customize tooltip content, display behavior, positioning, formatting, templates, and event handling for circle shapes in drawing components, enabling you to set visibility triggers, update tooltip text dynamically, configure show and hide callbacks, adjust placement relative to the shape, and tailor appearance or interactivity for circle tooltips during initialization or runtime.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry, {
            tooltip: {
                content: "This is a circle tooltip",
                position: "top"
            },
            fill: { color: "yellow" },
            stroke: { color: "orange", width: 2 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### transform `kendo.geometry.Transformation`
The transformation to apply to this element.
Inherited from [Element.transform](/api/javascript/drawing/element/configuration/transform)


<div class="meta-api-description">
Control the geometric transformation of a circle shape by configuring translation, rotation, scaling, shearing, or applying a custom transformation matrix to adjust position, orientation, size, or skew during rendering. Enable dynamic manipulation of the circle’s spatial properties through transformation settings such as translate, rotate, scale, or shear, or use matrix input for complex composite transformations, supporting initialization and runtime updates for flexible visual adjustments and animation effects related to circle placement and shape modification.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 25);
        var transform = geom.transform()
            .rotate(45, [100, 100])
            .scale(1.5, 1.5, [100, 100]);

        var circle = new draw.Circle(circleGeometry, {
            transform: transform,
            fill: { color: "pink" },
            stroke: { color: "red", width: 2 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### visible `Boolean`
A flag, indicating if the element is visible.
Inherited from [Element.visible](/api/javascript/drawing/element/configuration/visible)


<div class="meta-api-description">
Control the visibility and rendering of a circle shape within a drawing or graphics component by toggling its display on or off. Enable or disable whether the circle appears on the canvas, set visibility flags to show or hide the shape dynamically, manage rendering states for graphical elements, and configure display settings that determine if the circle is drawn or remains hidden in the user interface. Adjust visibility attributes to control drawing presence, visibility toggling, and graphical element rendering behavior in visual components or custom shapes.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry, {
            visible: false,
            fill: { color: "cyan" },
            stroke: { color: "darkcyan", width: 2 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        // Make circle visible after 2 seconds
        setTimeout(() => {
            circle.visible(true);
        }, 2000);
    </script>

## Methods

### bbox
Returns the bounding box of the element with transformations applied.
Inherited from [Element.bbox](/api/javascript/drawing/element/methods/bbox)


<div class="meta-api-description">
Retrieve the bounding box or enclosing rectangle for a transformed circle shape including all applied changes like translation, rotation, scaling, skewing, and other geometric transformations to get the exact axis-aligned coordinates for layout, collision detection, hit-testing, or exporting precise geometry boundaries after transformations are applied. This method provides the calculated outer bounds of the transformed circle element to help with spatial calculations, overlap checks, rendering adjustments, and accurate frame or container sizing in graphical or UI contexts.
</div>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with transformations applied.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry).stroke("green", 2);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        // Get the bounding box
        var bbox = circle.bbox();
        console.log("Bounding box:", bbox);
        console.log("Top-left:", bbox.topLeft());
        console.log("Bottom-right:", bbox.bottomRight());
    </script>


### clip
Gets or sets the element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element/methods/clip)


<div class="meta-api-description">
Configure or retrieve the clipping region or mask applied to a circular drawing element to control which parts of the shape are visible or hidden when rendered, enabling setting, updating, or querying the clip area with custom SVG clipPath elements or other graphic masks for precise visibility control, boundary definitions, masking effects, and element visibility in vector graphics or drawing contexts.
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

        var circleGeometry = new geom.Circle([100, 100], 40);
        var circle = new draw.Circle(circleGeometry).stroke("blue", 2).fill("lightblue");

        // Create a clipping path
        var clipPath = new draw.Path()
            .moveTo(80, 80)
            .lineTo(120, 80)
            .lineTo(120, 120)
            .lineTo(80, 120)
            .close();

        // Set the clipping path
        circle.clip(clipPath);

        // Get the current clipping path
        var currentClip = circle.clip();
        console.log("Current clip path:", currentClip);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>


### clippedBBox
Returns the bounding box of the element with clipping and transformations applied.
Inherited from [Element.clippedBBox](/api/javascript/drawing/element/methods/clippedbbox)


<div class="meta-api-description">
Calculate or retrieve the visible bounding rectangle or box of a circle shape after applying all transformations like scale, rotation, translation, or custom matrix transforms and any clipping masks or paths, enabling precise measurement, layout positioning, collision detection, hit testing, or exporting accurate element boundaries in drawing or graphics workflows.
</div>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with clipping transformations applied.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 40);
        var circle = new draw.Circle(circleGeometry).stroke("red", 2).fill("pink");

        // Create a clipping path
        var clipPath = new draw.Path()
            .moveTo(80, 80)
            .lineTo(120, 80)
            .lineTo(120, 120)
            .lineTo(80, 120)
            .close();

        circle.clip(clipPath);

        // Get the clipped bounding box
        var clippedBBox = circle.clippedBBox();
        console.log("Clipped bounding box:", clippedBBox);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### containsPoint
Returns true if the shape contains the specified point.


<div class="meta-api-description">
Check if a given coordinate, position, or point lies within a circular shape, detect if a click, tap, touch, pointer location, or collision intersects the circle area, determine inclusion of specific x and y values inside circle boundaries, perform hit testing or collision detection on circular drawings or shapes, verify whether input events fall inside or outside the circle region for interactive elements, and enable accurate response to user interactions like clicks, drags, touches, or collision overlaps by testing point containment within a circle.
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

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry).stroke("purple", 2).fill("lavender");

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        // Test if points are inside the circle
        var point1 = new geom.Point(100, 100); // Center point
        var point2 = new geom.Point(120, 120); // Outside point

        console.log("Point (100,100) inside circle:", circle.containsPoint(point1));
        console.log("Point (120,120) inside circle:", circle.containsPoint(point2));
    </script>

### geometry
Gets or sets the circle geometry.


<div class="meta-api-description">
Retrieve or set the circle’s geometric data to inspect, modify, or update its shape programmatically, including configuring radius, center coordinates, boundary definitions, or geometric parameters used for rendering, collision detection, hit-testing, transformation, and serialization within the drawing component. Access current shape properties or assign new geometry objects to adjust the circle form dynamically, control spatial characteristics, and enable precise manipulation of the circle’s outline, size, and position through code.
</div>

#### Parameters

##### value `kendo.geometry.Circle`
The new geometry to use.

#### Returns
`kendo.geometry.Circle` The current circle geometry.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 25);
        var circle = new draw.Circle(circleGeometry).stroke("orange", 2).fill("lightyellow");

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        // Get current geometry
        var currentGeometry = circle.geometry();
        console.log("Current geometry:", currentGeometry);

        // Set new geometry after 2 seconds
        setTimeout(() => {
            var newGeometry = new geom.Circle([120, 120], 35);
            circle.geometry(newGeometry);
        }, 2000);
    </script>


### fill
Sets the shape [fill](/api/javascript/drawing/circle/configuration/fill).


<div class="meta-api-description">
Set or update a circle shape’s fill style by applying solid colors, gradients, opacity levels, patterns, or image fills to customize the visual appearance dynamically. Configure and control circle fill properties with options for gradient stops, transparency, color formats, and texture overlays to achieve various design effects in real time. Enable dynamic fill changes on circular shapes for visual styling, color updates, gradient transitions, or pattern fills during runtime to match UI themes or animations.
</div>

#### Parameters

##### color `String`
The [fill color](/api/javascript/drawing/fill-options/fields/color) to set.

##### opacity `Number` *optional*
The [fill opacity](/api/javascript/drawing/fill-options/fields/opacity) to set.

#### Returns
`kendo.drawing.Circle` The current instance to allow chaining.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry).stroke("black", 2);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        // Set fill color and opacity using the fill method
        circle.fill("teal", 0.6);

        // Chain multiple operations
        setTimeout(() => {
            circle.fill("gold", 0.8).stroke("darkgoldenrod", 3);
        }, 2000);
    </script>


### opacity
Gets or sets the element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element/methods/opacity)

If set, the stroke and fill opacity will be multiplied by the element opacity.


<div class="meta-api-description">
Adjust or retrieve the transparency level of a circular drawing element by configuring its opacity or alpha value to make the shape more transparent or fully opaque, with the ability to programmatically control visual clarity and see-through effects, affecting both stroke and fill visibility by modulating their opacity intensity; useful for developers seeking to set, modify, or animate transparency, blending levels, or alpha channels for circle graphics in various rendering or UI scenarios.
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

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry)
            .stroke("navy", 2)
            .fill("skyblue");

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        // Get current opacity
        console.log("Current opacity:", circle.opacity());

        // Set new opacity
        circle.opacity(0.5);
        console.log("New opacity:", circle.opacity());
    </script>


### stroke
Sets the shape [stroke](/api/javascript/drawing/circle/configuration/stroke).


<div class="meta-api-description">
Modify or update the outline style of a circle shape dynamically by configuring stroke color, thickness, opacity, dash patterns, line caps, joins, and other border attributes to customize the circle's border appearance in real-time, enabling developers to set or change the circle’s border look, style, or shape outline instantly with detailed control over stroke properties, including solid or dashed lines and transparency adjustments.
</div>

#### Parameters

##### color `String`
The [stroke color](/api/javascript/drawing/stroke-options/fields/color) to set.

##### width `Number` *optional*
The [stroke width](/api/javascript/drawing/stroke-options/fields/width) to set.

##### opacity `Number` *optional*
The [stroke opacity](/api/javascript/drawing/stroke-options/fields/opacity) to set.

#### Returns
`kendo.drawing.Circle` The current instance to allow chaining.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry).fill("lightcoral");

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        // Set stroke properties using the stroke method
        circle.stroke("darkred", 4, 0.8);

        // Chain stroke with other methods
        setTimeout(() => {
            circle.stroke("blue", 2).fill("lightblue", 0.6);
        }, 2000);
    </script>


### transform
Gets or sets the transformation of the element.
Inherited from [Element.transform](/api/javascript/drawing/element/methods/transform)


<div class="meta-api-description">
Accessing or modifying the geometric transformations such as translation, rotation, scaling, or applying a custom transformation matrix on a graphic element is done by setting or retrieving its transform state; developers often seek to control or read the current spatial adjustments, update positioning, orient the shape differently, scale it dynamically, or override with explicit transformation matrices for precise rendering effects or animations, involving commands to get current transformation details or to apply new transform values programmatically to change the display or interaction behavior of visual components.
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

        var circleGeometry = new geom.Circle([100, 100], 25);
        var circle = new draw.Circle(circleGeometry)
            .stroke("green", 2)
            .fill("lightgreen");

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        // Create and apply transformation
        var transform = geom.transform()
            .rotate(45, [100, 100])
            .scale(1.5, 1.5, [100, 100]);

        circle.transform(transform);

        // Get current transformation
        var currentTransform = circle.transform();
        console.log("Current transformation:", currentTransform);
    </script>


### visible
Gets or sets the visibility of the element.
Inherited from [Element.visible](/api/javascript/drawing/element/methods/visible)


<div class="meta-api-description">
Control the visibility state of a circle shape within a drawing or graphics component by retrieving, toggling, enabling, disabling, showing, or hiding its display on the screen, programmatically managing whether the circle element is rendered or not, adjusting visibility settings, and dynamically setting or querying if the circle is visible in the current view or UI layer to modify rendering behavior and user interface appearance during runtime.
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

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry)
            .stroke("maroon", 2)
            .fill("mistyrose");

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        // Check initial visibility
        console.log("Initial visibility:", circle.visible());

        // Toggle visibility every 2 seconds
        setInterval(() => {
            var currentVisibility = circle.visible();
            circle.visible(!currentVisibility);
            console.log("Visibility changed to:", circle.visible());
        }, 2000);
    </script>
