---
title: Arc
page_title: API reference for Kendo UI Drawing API Arc
res_type: api
---

# kendo.drawing.Arc : kendo.drawing.Element

Draws an arc with set geometry, fill and stroke.

#### Example - creating an arc

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 10,
            radiusY: 10,
            startAngle: 45,
            endAngle: 135
        });
        var arc = new draw.Arc(arcGeometry).stroke("red", 1);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
    </script>

## Constructor Parameters

### geometry `kendo.geometry.Arc`
The geometric object that defines the arc parameters.


<div class="meta-api-description">
Provide or set the geometric shape data, parameters, or path information required to define an arc’s shape, such as center point, radius values, start and end angles, or equivalent curve descriptors, for initializing or configuring arc drawing objects, enabling control over the arc’s geometry during construction or setup, including supplying precise arc dimensions and positioning details for rendering or programming arcs in graphics, UI components, or vector paths.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 20,
            radiusY: 30,
            startAngle: 0,
            endAngle: 90
        });
        var arc = new draw.Arc(arcGeometry);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
    </script>

### options `Object`
The configuration options.


<div class="meta-api-description">
Set or customize arc shape, size, stroke style, fill color, rotation angle, position coordinates, and other arc-specific parameters during creation by passing a configuration object when initializing drawing shapes, arcs, or paths in graphical components. Enable control over geometry, appearance, and placement of arcs through a flexible options object, allowing seamless setup of arc properties, styling, transformations, and layout in one step. Use this pattern to define arc dimensions, stroke width, fill patterns, rotation degrees, anchor points, and position vectors when instantiating or rendering curved shapes within canvas or vector drawing libraries.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 25,
            radiusY: 25,
            startAngle: 45,
            endAngle: 225
        });
        var arc = new draw.Arc(arcGeometry, {
            fill: { color: "blue" },
            stroke: { color: "red", width: 2 },
            opacity: 0.8
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
    </script>

## Configuration

### clip `kendo.drawing.Path`
The element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element/configuration/clip)


<div class="meta-api-description">
Control the visible portion of an arc shape by setting a clipping path or mask that restricts or crops the drawing area, enabling developers to constrain, trim, or hide parts of the arc during rendering. Configure or apply geometric masks, define custom clip regions, or use element-based clipping to shape the arc’s display, manage visibility boundaries, and selectively render segments by controlling how the arc is visually constrained or masked within its container.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 50,
            radiusY: 50,
            startAngle: 0,
            endAngle: 180
        });
        var arc = new draw.Arc(arcGeometry).stroke("red", 2);

        var clipPath = new draw.Path().moveTo(80, 80).lineTo(120, 80).lineTo(120, 120).lineTo(80, 120).close();
        arc.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
    </script>

### cursor `String`
The element cursor.
Inherited from [Element.cursor](/api/javascript/drawing/element/configuration/cursor)


<div class="meta-api-description">
Control or customize the mouse pointer style when hovering over the arc by specifying CSS cursor values like pointer, move, default, crosshair, or text to indicate interactive elements, drag actions, selection, or default behavior on the DrawingArc component or similar UI elements, enabling visual feedback through cursor changes for better user experience and precise control of pointer appearance in graphical interfaces.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 30,
            radiusY: 30,
            startAngle: 0,
            endAngle: 270
        });
        var arc = new draw.Arc(arcGeometry, {
            stroke: { color: "blue", width: 3 },
            cursor: "pointer"
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
    </script>

### fill `kendo.drawing.FillOptions`
The fill options of the shape.


<div class="meta-api-description">
Set and customize the fill style of an arc shape by specifying colors, gradients, opacity levels, patterns, or image textures to control how the arc is visually painted or rendered. Adjust fill properties to enable solid colors, multi-color gradients, transparent overlays, or image-based fills, allowing precise control over appearance, styling, and rendering effects for arcs in graphical components. Enable configuration of fill attributes to tailor the arc’s color blending, shading, and transparency for diverse visual presentation needs.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 40,
            radiusY: 25,
            startAngle: 45,
            endAngle: 315
        });
        var arc = new draw.Arc(arcGeometry, {
            fill: {
                color: "green",
                opacity: 0.7
            }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
    </script>

### opacity `Number`
The element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element/configuration/opacity)


<div class="meta-api-description">
Adjust or retrieve the transparency level, alpha value, or translucency of an arc shape within a drawing or graphic component to make the arc more or less visible, enable semi-transparent or faded effects, configure opacity settings for layered visuals, control the arc’s see-through intensity, and manage how strongly the arc blends with backgrounds or other elements.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 35,
            radiusY: 35,
            startAngle: 0,
            endAngle: 180
        });
        var arc = new draw.Arc(arcGeometry, {
            fill: { color: "purple" },
            stroke: { color: "orange", width: 2 },
            opacity: 0.5
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
    </script>

### stroke `kendo.drawing.StrokeOptions`
The stroke options of the shape.


<div class="meta-api-description">
Set or configure the outline styling of an arc shape by adjusting stroke attributes such as color, thickness, transparency, dash patterns, line end caps, corner joins, and miter limits to control how the border of a curved arc segment appears when rendering or drawing vector graphics, enabling precise customization of the arc’s edge appearance, line decoration, and visual emphasis in graphic or UI designs.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 30,
            radiusY: 40,
            startAngle: 90,
            endAngle: 270
        });
        var arc = new draw.Arc(arcGeometry, {
            stroke: {
                color: "darkblue",
                width: 4,
                opacity: 0.8,
                dashType: "dash"
            }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
    </script>

### tooltip `kendo.drawing.TooltipOptions`
The tooltip options of the shape.


<div class="meta-api-description">
Customize interactive hover text, touch hints, and focus tooltips for circular or curved shape visuals by configuring content, appearance, position, visibility, delays, event triggers, and styling options. Control how additional information is displayed on mouse hover, tap, or keyboard focus for arcs or circular segments using flexible tooltip settings including templates, dynamic content, show and hide behaviors, timing controls, and event handlers. Enable or set tooltip content formatting and interaction behavior during initialization to enhance user experience with contextual popups that respond to different user inputs and device interactions on curved graphical elements.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 25,
            radiusY: 35,
            startAngle: 0,
            endAngle: 120
        });
        var arc = new draw.Arc(arcGeometry, {
            stroke: { color: "teal", width: 3 },
            tooltip: {
                content: "Arc Shape",
                position: "top"
            }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
    </script>

### transform `kendo.geometry.Transformation`
The transformation to apply to this element.
Inherited from [Element.transform](/api/javascript/drawing/element/configuration/transform)


<div class="meta-api-description">
Adjust the position, rotation, scale, or any custom geometric transformation of an arc shape by configuring translation, rotation angles, scaling factors, or applying complex matrix transformations to modify its appearance, placement, and orientation within the drawing context. Enable dynamic shape manipulation, control layout adjustments, customize visual effects, and seamlessly transform the arc element to fit various design requirements or animation states by setting transformation parameters such as move, rotate, resize, or combined transforms.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 20,
            radiusY: 30,
            startAngle: 0,
            endAngle: 180
        });
        var transform = geom.transform().rotate(45, [100, 100]).scale(1.5, 1.2);
        var arc = new draw.Arc(arcGeometry, {
            stroke: { color: "red", width: 2 },
            transform: transform
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
    </script>

### visible `Boolean`
A flag, indicating if the element is visible.
Inherited from [Element.visible](/api/javascript/drawing/element/configuration/visible)


<div class="meta-api-description">
Toggle, enable, or disable the display and rendering of the arc shape within the drawing interface by setting visibility states that control whether the arc is shown, hidden, or excluded from layout calculations and hit detection. Adjust visibility flags to manage rendering performance, user interaction responses, element display conditions, and conditional drawing logic, allowing control over whether the arc participates in visual output, event handling, and layout flow within a graphical component or UI element hierarchy.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 25,
            radiusY: 25,
            startAngle: 0,
            endAngle: 270
        });
        var arc = new draw.Arc(arcGeometry, {
            stroke: { color: "blue", width: 2 },
            visible: true
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        // Toggle visibility
        setTimeout(() => {
            arc.visible(false);
        }, 2000);
    </script>

## Methods

### bbox
Returns the bounding box of the element with transformations applied.
Inherited from [Element.bbox](/api/javascript/drawing/element/methods/bbox)


<div class="meta-api-description">
Calculate or get the bounding box of an arc shape after all transformations like scaling, rotation, and translation are applied, enabling measurement, collision detection, alignment, or layout tasks based on the transformed rectangular bounds. Retrieve the axis-aligned box that encloses the arc's visible area in the current coordinate system, useful for hit-testing, layout adjustments, or determining overlap and spatial relationships after any geometric modifications. Access or compute the transformed bounding rectangle to control positioning, detect intersections, or align related shapes and elements with precision relative to the arc’s final rendered size and orientation.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 40,
            radiusY: 30,
            startAngle: 0,
            endAngle: 180
        });
        var arc = new draw.Arc(arcGeometry).stroke("green", 2);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        var bbox = arc.bbox();
        console.log("Bounding box:", bbox);
    </script>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with transformations applied.


### clip
Gets or sets the element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element/methods/clip)


<div class="meta-api-description">
Configure, retrieve, or modify the clipping path applied to an arc or shape within drawing components, enabling you to control visibility, apply mask effects, set or update clip boundaries, constrain rendering areas, manage element masks, and handle complex shape clipping through methods that get or set the clipping element associated with the arc. This includes use cases like masking parts of an arc, controlling which portions are visible, dynamically changing clip regions, or attaching clip shapes to customize the rendering area of arcs or graphical elements.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 50,
            radiusY: 35,
            startAngle: 45,
            endAngle: 225
        });
        var arc = new draw.Arc(arcGeometry).stroke("purple", 3);

        // Create a clipping path
        var clipPath = new draw.Path().moveTo(75, 75).lineTo(125, 75).lineTo(125, 125).lineTo(75, 125).close();
        
        // Set the clipping path
        arc.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        // Get the current clipping path
        var currentClip = arc.clip();
        console.log("Current clip path:", currentClip);
    </script>

#### Parameters

##### clip `kendo.drawing.Path`
The element clipping path.

#### Returns
`kendo.drawing.Path` The current element clipping path.


### clippedBBox
Returns the bounding box of the element with clipping and transformations applied.
Inherited from [Element.clippedBBox](/api/javascript/drawing/element/methods/clippedbbox)


<div class="meta-api-description">
Calculate the visible bounding box of an arc shape after applying all current clipping paths, transformations, and scaling to obtain precise coordinates for layout adjustments, collision detection, hit-testing, or graphical export. Retrieve the clipped and transformed bounding rectangle representing the actual displayed area of the arc element, factoring in all parent or element-specific masks and transformations to enable accurate spatial calculations, intersection checks, or rendering boundaries. This method supports querying the exact on-screen or rendered bounds of curved segments after any clipping or coordinate changes have been applied.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 40,
            radiusY: 40,
            startAngle: 0,
            endAngle: 270
        });
        var arc = new draw.Arc(arcGeometry).stroke("red", 2);

        // Apply clipping
        var clipPath = new draw.Path().moveTo(80, 80).lineTo(120, 80).lineTo(120, 120).lineTo(80, 120).close();
        arc.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        var clippedBBox = arc.clippedBBox();
        console.log("Clipped bounding box:", clippedBBox);
    </script>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with clipping transformations applied.

### containsPoint
Returns true if the shape contains the specified point.


<div class="meta-api-description">
Check if a specific coordinate, point, or position lies within an arc shape for purposes like hit detection, mouse input handling, collision detection, spatial containment, interaction testing, click or drag event recognition, or area inclusion verification. This functionality helps determine whether a given x,y location falls inside a curved segment for user interface interactions, graphical event triggers, or spatial queries involving arcs. Whether enabling mouse event hit-testing, detecting pointer overlap, verifying point inclusion in curved shapes, or managing interactive area boundaries, this method allows control over geometric containment within arc boundaries.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 30,
            radiusY: 30,
            startAngle: 0,
            endAngle: 180
        });
        var arc = new draw.Arc(arcGeometry).stroke("blue", 4);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        // Test if arc contains specific points
        var point1 = new geom.Point(100, 85);
        var point2 = new geom.Point(150, 100);
        
        console.log("Point (100, 85) inside arc:", arc.containsPoint(point1));
        console.log("Point (150, 100) inside arc:", arc.containsPoint(point2));
    </script>

#### Parameters

##### point `kendo.geometry.Point`
The point that should be checked.

#### Returns
`Boolean` value indicating if the shape contains the point.

### geometry
Gets or sets the arc geometry.


<div class="meta-api-description">
Configure, retrieve, or update the shape and structure of arcs by accessing or setting their geometric data, including paths, radii, angles, and control points to control how arcs are drawn and rendered; manipulate arc geometry to customize arc paths, adjust curvature, modify arc segments, serialize shape data, bind dynamic arc parameters, programmatically change arc forms, or query the current arc configuration for interactive or data-driven visualizations.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 25,
            radiusY: 25,
            startAngle: 0,
            endAngle: 90
        });
        var arc = new draw.Arc(arcGeometry).stroke("orange", 3);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        // Get current geometry
        var currentGeometry = arc.geometry();
        console.log("Current geometry:", currentGeometry);

        // Set new geometry
        setTimeout(() => {
            var newGeometry = new geom.Arc([100, 100], {
                radiusX: 40,
                radiusY: 30,
                startAngle: 45,
                endAngle: 315
            });
            arc.geometry(newGeometry);
        }, 2000);
    </script>

#### Parameters

##### value `kendo.geometry.Arc`
The new geometry to use.

#### Returns
`kendo.geometry.Arc` The current arc geometry.


### fill
Sets the shape [fill](/api/javascript/drawing/arc/configuration/fill).


<div class="meta-api-description">
Set or update the color fill, gradient, or opacity of an arc shape within a drawing or graphics component by providing a fill configuration or color value; configure the arc's visual appearance, control its fill style, apply solid colors or gradients, adjust transparency levels, and refresh the arc rendering dynamically to customize its look, enabling precise control over the arc’s fill properties for user interface design, data visualization, or graphic rendering purposes.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 35,
            radiusY: 25,
            startAngle: 0,
            endAngle: 180
        });
        var arc = new draw.Arc(arcGeometry);

        // Set fill color and opacity
        arc.fill("lightblue", 0.7);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        // Change fill after 2 seconds
        setTimeout(() => {
            arc.fill("pink", 0.5);
        }, 2000);
    </script>

#### Parameters

##### color `String`
The [fill color](/api/javascript/drawing/fill-options/fields/color) to set.

##### opacity `Number` *optional*
The [fill opacity](/api/javascript/drawing/fill-options/fields/opacity) to set.

#### Returns
`kendo.drawing.Arc` The current instance to allow chaining.


### opacity
Gets or sets the element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element/methods/opacity)

If set, the stroke and fill opacity will be multiplied by the element opacity.


<div class="meta-api-description">
Control or retrieve the transparency level of an arc shape by setting or getting its opacity value, adjusting how see-through the stroke and fill appear by scaling their visibility proportionally, enabling fine-tuned transparency effects, blending, or layering. Modify the arc’s overall translucency to achieve partial visibility, fade effects, or overlay combinations in graphics, drawings, and visual components by configuring the transparency factor that influences both the stroke line and fill color intensity, allowing dynamic or static changes to the arc’s opacity for styling or compositing purposes.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 30,
            radiusY: 30,
            startAngle: 0,
            endAngle: 270
        });
        var arc = new draw.Arc(arcGeometry)
            .fill("red")
            .stroke("blue", 2);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        // Get current opacity
        console.log("Current opacity:", arc.opacity());

        // Set new opacity
        arc.opacity(0.3);

        // Get updated opacity
        console.log("Updated opacity:", arc.opacity());
    </script>

#### Parameters

##### opacity `Number`
The element opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`Number` The current element opacity.


### stroke
Sets the shape [stroke](/api/javascript/drawing/arc/configuration/stroke).


<div class="meta-api-description">
Configure or change the outline appearance of an arc shape by adjusting its stroke properties such as color, thickness, dash patterns, styles, and other border attributes. Enable customization of arc borders with flexible stroke settings to define line width, solid or dashed lines, border color, and various stroke effects. Control the arc’s edge visuals through stroke options that influence how the outline looks, including opacity, dash arrays, and stroke caps, suitable for styling arcs in drawings or vector graphics. Adjust or update the arc boundary appearance effectively by setting stroke attributes to achieve precise control over arc contours, line decorations, and their presentation in graphical applications.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 25,
            radiusY: 35,
            startAngle: 45,
            endAngle: 270
        });
        var arc = new draw.Arc(arcGeometry);

        // Set stroke color, width, and opacity
        arc.stroke("darkgreen", 4, 0.8);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        // Change stroke after 2 seconds
        setTimeout(() => {
            arc.stroke("red", 2, 1);
        }, 2000);
    </script>

#### Parameters

##### color `String`
The [stroke color](/api/javascript/drawing/stroke-options/fields/color) to set.

##### width `Number` *optional*
The [stroke width](/api/javascript/drawing/stroke-options/fields/width) to set.

##### opacity `Number` *optional*
The [stroke opacity](/api/javascript/drawing/stroke-options/fields/opacity) to set.

#### Returns
`kendo.drawing.Arc` The current instance to allow chaining.


### transform
Gets or sets the transformation of the element.
Inherited from [Element.transform](/api/javascript/drawing/element/methods/transform)


<div class="meta-api-description">
Control or query the position, rotation, scaling, and overall transformation of a drawing arc element by retrieving its current transform state or applying new transformations such as translate, rotate, scale, or combinations thereof. Enable setting or reading the geometric manipulation of the arc component within a drawing, including adjusting its orientation, size, and placement dynamically through transform operations. This supports configuring, updating, or extracting transformation data for precise control over visual layout and spatial adjustments in vector graphics or drawing contexts.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 20,
            radiusY: 30,
            startAngle: 0,
            endAngle: 180
        });
        var arc = new draw.Arc(arcGeometry).stroke("purple", 2);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        // Get current transformation
        console.log("Current transform:", arc.transform());

        // Apply transformation
        var transform = geom.transform().rotate(45, [100, 100]).scale(1.5, 1.2);
        arc.transform(transform);

        // Get updated transformation
        console.log("Updated transform:", arc.transform());
    </script>

#### Parameters

##### transform `kendo.geometry.Transformation`
The transformation to apply to the element.

#### Returns
`kendo.geometry.Transformation` The current transformation on the element.


### visible
Gets or sets the visibility of the element.
Inherited from [Element.visible](/api/javascript/drawing/element/methods/visible)


<div class="meta-api-description">
Control the display state of an arc shape by configuring its visibility status during runtime, enabling retrieval of whether the arc is currently shown or hidden, as well as setting it to be visible, invisible, or toggled between states. Adjust or query the rendering and interaction availability of the arc element dynamically, using visibility controls such as show, hide, toggle, or check for visibility, to manage presentation and user interface behavior. This covers use cases related to displaying or concealing graphical arc components programmatically in a drawing or animation context.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 25,
            radiusY: 25,
            startAngle: 0,
            endAngle: 270
        });
        var arc = new draw.Arc(arcGeometry).stroke("teal", 3);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        // Get current visibility
        console.log("Is visible:", arc.visible());

        // Hide the arc after 2 seconds
        setTimeout(() => {
            arc.visible(false);
            console.log("Arc hidden, visible:", arc.visible());
        }, 2000);

        // Show the arc again after 4 seconds
        setTimeout(() => {
            arc.visible(true);
            console.log("Arc shown, visible:", arc.visible());
        }, 4000);
    </script>

#### Parameters

##### visible `Boolean`
A flag indicating if the element should be visible.

#### Returns
`Boolean` true if the element is visible; false otherwise.
