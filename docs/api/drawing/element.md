---
title: Element
page_title: API reference for Kendo UI Drawing API Element
res_type: api
---

# kendo.drawing.Element : kendo.Class

An abstract base class representing common members of all drawing elements.

## Constructor Parameters

### options `Object`
The configuration of this element.


<div class="meta-api-description">
How do I set initial settings for a Kendo UI drawing component using the options parameter? Set initial element settings such as appearance, geometry, identifiers, metadata, and nested configurations when creating or initializing graphical components, control default properties during element construction, customize element behavior and attributes at the start, define visual styles and structural parameters, provide configuration options to specify how elements are instantiated and rendered, control element defaults including layout, styling, identification, and metadata upon creation, adjust initial element parameters for drawing or rendering contexts, and pass structured initialization data to establish element features and nested settings for precise control during component setup.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var options = {
            opacity: 0.7,
            visible: true,
            transform: geom.transform().scale(1.5, 1.5)
        };

        var circle = new draw.Circle(new geom.Circle([100, 100], 50), options);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

## Configuration

### clip `kendo.drawing.Path`
The clipping path for this element.

The path instance will be monitored for changes.
It can be replaced by calling the [clip](/api/javascript/drawing/element/methods/clip) method.


<div class="meta-api-description">
How do I set a clipping path for a Kendo UI drawing element using jQuery? Control and customize the visible rendering area of a graphical element by setting or updating a clipping region, mask, or boundary shape that crops or confines the content display. Enable or assign a path, shape, or custom vector outline to restrict which parts of a drawing or component are shown, supporting dynamic changes and automatic updating of the visible area based on assigned masks or paths. Configure clipping masks, crop visible regions, programmatically adjust clipping paths, manage shape-based visibility constraints, and implement fine-grained control over rendered element appearance through shape clipping and path-based masking mechanisms.
</div>

#### Example - setting clipping path on an element
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var clipPath = new draw.Path();
        clipPath.moveTo(0, 0).lineTo(100, 100).lineTo(100, 0).close();

        var circle = new draw.Circle(new geom.Circle([100, 100], 80), {
            clip: clipPath,
            stroke: { color: "red", width: 1 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### cursor `String`
The element [CSS cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor).

Applicable to an SVG output.


<div class="meta-api-description">
How do I change the cursor appearance in an SVG drawing with Kendo UI for jQuery? Control and customize the mouse pointer appearance over SVG elements in interactive drawings by specifying CSS cursor styles such as pointer, move, crosshair, or custom URLs, enabling configuration of cursor visuals for hover effects, drag operations, selection indicators, or user interaction feedback within SVG graphics rendered in the drawing interface.
</div>

#### Example - set hand cursor on an element
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circle = new draw.Circle(new geom.Circle([100, 100], 80), {
            cursor: "pointer",
            stroke: { color: "red", width: 1 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### opacity `Number`
The element opacity.


<div class="meta-api-description">
How do I set the opacity of an element in Kendo UI for jQuery? Adjust transparency, set visual opacity, control element translucency, configure alpha blending, change fading level, set opacity value for partial or full transparency, enable see-through effect, apply transparency settings at initialization, control how much the element shows beneath or over backgrounds, manage element visibility strength, customize element transparency for layering and blending in drawings or graphics.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circle = new draw.Circle(new geom.Circle([100, 100], 50), {
            opacity: 0.3,
            fill: { color: "blue" }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### transform `kendo.geometry.Transformation`
The transformation to apply to this element.


<div class="meta-api-description">
How can I apply multiple transformations to an element in a Kendo UI drawing? Adjust, modify, or configure geometric transformations like translation, rotation, scaling, skewing, or complex matrix-based affine transforms to control an element’s position, orientation, size, and shape in a drawing or graphical component. Enable flexible manipulation of shapes by setting transformations for moving, turning, resizing, slanting, or combining multiple transform effects to achieve precise control over how an element renders spatially within the graphic or interface. Apply composite or individual transforms to fine-tune the visual arrangement, coordinates, or perspective of graphical elements using a variety of transformation techniques commonly needed in rendering, animation, or UI positioning scenarios.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new draw.Rect(new geom.Rect([50, 50], [100, 50]), {
            transform: geom.transform().rotate(45, [100, 75]),
            fill: { color: "green" }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### visible `Boolean`
A flag, indicating if the element is visible.


<div class="meta-api-description">
How do I toggle visibility of a Kendo UI element using the visible property? control display or visibility of a UI element by enabling or disabling its on-screen presence using a true or false flag; toggle element visibility state for showing or hiding components dynamically, configure visibility settings during setup or initialization, manage whether an interface item is rendered or hidden, adjust display states programmatically to show, conceal, or hide an element based on user actions or application logic, set or change visibility properties to control element appearance or disappearance in the user interface environment.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var visibleCircle = new draw.Circle(new geom.Circle([75, 75], 40), {
            visible: true,
            fill: { color: "red" }
        });

        var hiddenCircle = new draw.Circle(new geom.Circle([125, 75], 40), {
            visible: false,
            fill: { color: "blue" }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(visibleCircle);
        surface.draw(hiddenCircle);
    </script>

## Fields

### options `kendo.drawing.OptionsStore`
The configuration options of the drawing element.


<div class="meta-api-description">
How do I access and change the runtime settings of a drawing element in Kendo UI for jQuery? Accessing or modifying a drawing element’s runtime settings, configuration parameters, or attributes such as geometry, transformations, styles, and custom metadata to inspect, update, control, or serialize the element’s behavior and appearance within a graphical or drawing component environment, including retrieving and programmatically changing these properties dynamically after initialization for customization, interactive editing, manipulation, or configuration purposes.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circle = new draw.Circle(new geom.Circle([100, 100], 50), {
            fill: { color: "purple" },
            opacity: 0.8
        });

        console.log("Element options:", circle.options);
        console.log("Fill color:", circle.options.fill.color);
        console.log("Opacity:", circle.options.opacity);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### parent `kendo.drawing.Group`
The parent group element, if any.


<div class="meta-api-description">
How do I get the parent element of a Kendo UI drawing? Access and retrieve the immediate parent container or group of a drawing or UI element to navigate upwards in the element hierarchy, enabling inspection, modification, or traversal of parent components, groups, or containers; configure or query the parent group element for structure adjustments, attribute changes, or relationship analysis within nested elements to support dynamic layout management, element grouping, or hierarchical manipulation workflows after initialization.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var group = new draw.Group();
        var circle = new draw.Circle(new geom.Circle([100, 100], 50), {
            fill: { color: "orange" }
        });

        group.append(circle);

        console.log("Circle parent:", circle.parent);
        console.log("Is parent a Group?", circle.parent instanceof draw.Group);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

## Methods

### bbox
Returns the bounding box of the element with transformations applied.


<div class="meta-api-description">
How do I get the transformed bounding box of an element in Kendo UI for jQuery? Calculate or obtain the bounding rectangle of a graphical element after all transformations such as translation, rotation, scaling, and other matrix operations have been applied, enabling precise measurement of the element’s position and size in its local coordinate system for tasks like layout arrangement, collision detection, hit testing, viewport fitting, or exporting visual boundaries. Use to find numeric coordinates and dimensions that reflect the element’s final transformed state, accommodating complex shape adjustments and ensuring accurate spatial calculations regardless of the transformation sequence.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new draw.Rect(new geom.Rect([50, 50], [100, 60]), {
            fill: { color: "cyan" },
            transform: geom.transform().scale(1.5, 1.5)
        });

        var bbox = rect.bbox();
        console.log("Bounding box:", bbox);
        console.log("Origin:", bbox.origin);
        console.log("Size:", bbox.size);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with transformations applied.


### clip
Gets or sets the element clipping path.


<div class="meta-api-description">
How do I control which parts of my Kendo UI drawing element are visible using the clip method? Manage the visibility of specific areas within a drawing or graphic element by configuring or retrieving its clipping boundary or mask, allowing you to set, update, or remove the visible region through a clipping path method. This functionality lets you control which portions of an element are displayed by defining or adjusting the clip shape, enabling fine-grained masking, visibility trimming, or path-based cropping on graphical components, accessed and modified after element creation to tailor visual output or apply dynamic visibility constraints.
</div>

#### Example - setting clipping path on an element
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circle = new draw.Circle(new geom.Circle([100, 100], 80), {
            stroke: { color: "red", width: 1 }
        });

        var clipPath = new draw.Path();
        clipPath.moveTo(0, 0).lineTo(100, 100).lineTo(100, 0).close();

        circle.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

#### Example - clear clipping path
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var clipPath = new draw.Path();
        clipPath.moveTo(0, 0).lineTo(100, 100).lineTo(100, 0).close();

        var circle = new draw.Circle(new geom.Circle([80, 80], 60), {
          clip: clipPath,
          stroke: { color: "red", width: 1 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        setTimeout(function() {
                circle.clip(null);
        }, 2000);
    </script>

#### Parameters

##### clip `kendo.drawing.Path`
The element clipping path.

#### Returns
`kendo.drawing.Path` The current element clipping path.


### clippedBBox
Returns the bounding box of the element with clipping and transformations applied.

This is the rectangle that will fit around the actual rendered element.


<div class="meta-api-description">
How do I get the actual visible dimensions of an element in Kendo UI after transformations? Retrieve the visible rendered bounding rectangle of an element after all transformations such as scaling, rotation, translation, and any clipping regions have been applied, providing the precise on-screen bounds or fit area for the displayed content, useful for layout calculations, collision detection, hit-testing, or obtaining the actual visible dimensions rather than raw untransformed bounds.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var clipPath = new draw.Path();
        clipPath.moveTo(50, 50).lineTo(150, 50).lineTo(150, 100).lineTo(50, 100).close();

        var circle = new draw.Circle(new geom.Circle([100, 100], 60), {
            clip: clipPath,
            fill: { color: "red" }
        });

        var clippedBBox = circle.clippedBBox();
        var bbox = circle.bbox();

        console.log("Regular bounding box:", bbox);
        console.log("Clipped bounding box:", clippedBBox);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with clipping and transformations applied.

### containsPoint
Returns true if the shape contains the specified point.


<div class="meta-api-description">
How to check if a point is inside a Kendo UI drawing element? Check if a specific x,y coordinate or pointer location is inside a graphical shape, perform hit testing to detect mouse or touch interactions within a drawing element, determine if a point lies within an element’s area for collision detection or spatial queries, verify whether a given position intersects or overlaps with the element’s geometry, enable point-in-shape tests, and control detection of user input or coordinates falling inside the rendered boundaries of a graphical object.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circle = new draw.Circle(new geom.Circle([100, 100], 50), {
            fill: { color: "lightblue" }
        });

        var pointInside = new geom.Point(100, 100);
        var pointOutside = new geom.Point(200, 200);

        console.log("Point (100,100) inside circle:", circle.containsPoint(pointInside));
        console.log("Point (200,200) inside circle:", circle.containsPoint(pointOutside));

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

#### Parameters

##### point `kendo.geometry.Point`
The point that should be checked.

#### Returns
`Boolean` value indicating if the shape contains the point.

### opacity
Gets or sets the element opacity.


<div class="meta-api-description">
How do I set the transparency of an element using Kendo UI for jQuery? Control or retrieve the transparency level of a visual element by accessing or modifying its opacity value, enabling adjustments to how see-through or solid the element appears in rendering. This method supports reading the current transparency state or setting a new opacity level to dynamically change an element’s visual clarity, allowing developers to configure, update, enable, set, or query the transparency/alpha/translucency of drawing or UI elements for effects like fading, layering, or visibility toggling in graphics and interfaces.
</div>

#### Example - setting opacity on an element
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path();
        path.moveTo(0, 0).lineTo(100, 100);
        path.opacity(0.5);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Parameters

##### opacity `Number`
The element opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`Number` The current element opacity.


### transform
Gets or sets the transformation of the element.


<div class="meta-api-description">
How do I set up rotation and scaling for an element in Kendo UI using the transform method? Configure or retrieve an element's geometric transformation including translation, rotation, scaling, or complex matrix-based composite transforms to control visual layout and rendering within drawing components. Manage or query current transform states to adjust positioning, orientation, size, or combined spatial transformations, enabling dynamic updates to element appearance, layout arrangement, and graphical manipulation through setting or obtaining transform values or matrices. This supports use cases involving element movement, rotation angles, resizing, or applying advanced affine transformations for precise graphical control and interactive rendering updates.
</div>

#### Example - setting transformation on an element
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var path = new draw.Path();
        path.moveTo(0, 0).lineTo(100, 100);

        path.transform(geom.transform().scale(2, 1));

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Parameters

##### transform `kendo.geometry.Transformation`
The transformation to apply to the element.

#### Returns
`kendo.geometry.Transformation` The current transformation on the element.


### visible
Gets or sets the visibility of the element.


<div class="meta-api-description">
How can I toggle the visibility of an element in Kendo UI using the visible method? Retrieve or modify whether a drawing or UI element is shown or hidden by reading or setting its visibility state, toggle display on or off, control rendering and interaction, check if an element is currently visible or invisible, programmatically enable or disable visibility, set visibility flags or boolean states to manage user interface components, query the display status to determine if an object is rendered or hidden from view, dynamically show or hide elements based on application logic, and adjust visibility to affect user interaction and component presentation within a drawing or graphical interface.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circle = new draw.Circle(new geom.Circle([100, 100], 50), {
            fill: { color: "yellow" }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        console.log("Initial visibility:", circle.visible());

        // Hide the element after 2 seconds
        setTimeout(function() {
            circle.visible(false);
            console.log("Visibility after hiding:", circle.visible());
        }, 2000);

        // Show it again after 4 seconds
        setTimeout(function() {
            circle.visible(true);
            console.log("Visibility after showing:", circle.visible());
        }, 4000);
    </script>

#### Parameters

##### visible `Boolean`
A flag indicating if the element should be visible.

#### Returns
`Boolean` true if the element is visible; false otherwise.

