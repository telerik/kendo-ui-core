---
title: Image
page_title: API reference for Kendo UI Drawing API Image
res_type: api
---

# kendo.drawing.Image : kendo.drawing.Element

Draws a bitmap image with a given source URL into the specified [rectangle](/api/javascript/geometry/rect).

#### Example - draw an image

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect(
            [10, 10],  // Position of the top left corner
            [249, 240] // Size of the rectangle
        );
        var image = new draw.Image("https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png", rect);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);
    </script>

## Constructor Parameters

### src `String`
The source URL of the image.


<div class="meta-api-description">
Specify or configure the image source path, URL, or data URI when creating or initializing a drawing or graphic element, enabling the component to load, fetch, or embed an image from local files, remote servers, data streams, or inline base64 strings. Control and set the initial visual content by providing a direct reference to an image resource, whether that is an external link, filesystem location, or encoded data, facilitating image rendering, display, or manipulation within a graphical context or drawing component constructor.
</div>

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([10, 10], [200, 150]);
        var image = new draw.Image("https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png", rect);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);
    </script>

### rect `kendo.geometry.Rect`
A rectangle defining the position and size of the image.


<div class="meta-api-description">
Set or configure the position and size of an image within a drawing area by defining a rectangular boundary using coordinates and dimensions, controlling where the image appears and how large it is rendered; adjust placement using x and y values, specify width and height to scale, or provide a rectangle or geometry object to precisely align and size images inside drawing components or canvas spaces, enabling customization of image layout, spatial arrangement, bounding boxes, and coordinate-based sizing options for visuals within graphical interfaces.
</div>

#### Example

    <div id="surface" style="width: 300px; height: 200px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([50, 30], [200, 120]);
        var image = new draw.Image("https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png", rect);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);
    </script>

## Configuration

### clip `kendo.drawing.Path`
The element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element#configuration-clip)


<div class="meta-api-description">
Set or configure the visible area of an image or drawing by applying clipping shapes, masks, or paths such as rectangles, SVG paths, or custom geometry to crop, cut out, or restrict rendering regions. Control or enable image masking, clipping regions, or path-based cropping to define which parts of a visual element are shown or hidden, allowing precise control over image visibility, masking effects, and graphical boundaries. Use path-based clipping to shape images dynamically, mask unwanted areas, or apply custom silhouette outlines to drawings or graphical elements.
</div>

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([10, 10], [200, 150]);
        var image = new draw.Image("https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png", rect);
        
        var clipPath = new draw.Path();
        clipPath.moveTo(60, 60).lineTo(160, 60).lineTo(160, 160).lineTo(60, 160).close();
        image.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);
    </script>

### cursor `String`
The element cursor.
Inherited from [Element.cursor](/api/javascript/drawing/element#configuration-cursor)


<div class="meta-api-description">
Configure and customize the mouse pointer appearance when hovering over graphical or image-based elements, enabling control over cursor styles such as pointer, move, default, crosshair, text, wait, or custom CSS cursor values to enhance user interaction and visual feedback within drawing or image display components. Enable setting, changing, or overriding cursor behavior on images or vector graphics, specifying how the mouse cursor looks during mouse-over events for improved UX and responsive design. Adjust cursor indicators to match interaction modes, user actions, or application states, supporting various pointer effects and stylistic cursor controls on rendered image elements.
</div>

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([10, 10], [200, 150]);
        var image = new draw.Image("https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png", rect);
        image.cursor = "pointer";

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);
    </script>

### opacity `Number`
The element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element#configuration-opacity)


<div class="meta-api-description">
Adjust the transparency level, alpha channel, or opacity value for image elements within drawing or graphic components to control how visible, translucent, or see-through the picture appears; configure fading effects, set transparency intensity, or blend images by modifying the opacity property to make images fully opaque, partially transparent, or nearly invisible, enabling visual layering, subtle shading, or highlighting in UI elements and graphics rendering scenarios.
</div>

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([10, 10], [200, 150]);
        var image = new draw.Image("https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png", rect);
        image.opacity = 0.5;

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);
    </script>

### tooltip `kendo.drawing.TooltipOptions`
The tooltip options of the shape.


<div class="meta-api-description">
Control and customize hover and focus information for image shapes within a drawing by setting tooltip content, defining custom templates, adjusting placement options, managing visibility states, and specifying triggers for showing or hiding tooltips. Enable flexible configuration to display contextual help, descriptive text, or interactive elements when users hover over or focus on images within graphical components, supporting diverse use cases like accessibility hints, detailed annotations, dynamic information popups, or on-demand guidance linked to visual elements in drawings and graphics interfaces.
</div>

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([10, 10], [200, 150]);
        var image = new draw.Image("https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png", rect);
        image.tooltip = {
            content: "Beautiful Tenerife landscape"
        };

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);
    </script>

### transform `kendo.geometry.Transformation`
The transformation to apply to this element.
Inherited from [Element.transform](/api/javascript/drawing/element#configuration-transform)


<div class="meta-api-description">
Control and customize geometric adjustments such as translation, rotation, scaling, and skewing of an image element before rendering by configuring transformation parameters or applying transformation matrices. Enable image manipulation including repositioning, resizing, rotation angles, distortion effects, affine transformations, or coordinate changes on visual elements, allowing dynamic adjustment of how images are presented and drawn within the graphical interface or layout. Set or modify transformation settings to achieve desired visual effects, control the spatial arrangement, or perform complex image transformations in workflows involving image rendering, scaling operations, rotation control, and skew management.
</div>

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
        <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([10, 10], [150, 100]);
        var image = new draw.Image("https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png", rect);
        
        image.transform(geom.transform().rotate(30, [85, 60]));

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);
    </script>

### visible `Boolean`
A flag, indicating if the element is visible.
Inherited from [Element.visible](/api/javascript/drawing/element#configuration-visible)


<div class="meta-api-description">
Set or toggle the rendering and display state of an image or drawing element to show or hide it, control its visibility on screen, enable or disable it for user interactions or pointer events, manage display presence dynamically by switching visibility flags, and configure whether the visual content participates in input events or remains hidden without affecting layout.
</div>

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([10, 10], [200, 150]);
        var image = new draw.Image("https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png", rect);
        image.visible = false; // Image will not be visible

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);
        
        setTimeout(function() {
            image.visible = true; // Make image visible after 2 seconds
        }, 2000);
    </script>

## Methods

### bbox
Returns the bounding box of the element with transformations applied.
Inherited from [Element.bbox](/api/javascript/drawing/element#methods-bbox)


<div class="meta-api-description">
Retrieve or calculate the exact bounding rectangle or bounds of an image after applying transformations like scaling, rotation, or translation to support hit-testing, layout adjustments, collision detection, clipping regions, exporting image dimensions, or determining spatial positioning. Access or configure how to get the transformed bounding box coordinates, bounding area, or frame of an image element for precise measurement and interaction, including use cases involving transformed image geometry, layout flow constraints, visual clipping, or coordinate system adjustments.
</div>

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([10, 10], [200, 150]);
        var image = new draw.Image("https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png", rect);
        
        var bbox = image.bbox();
        console.log("Bounding box:", bbox.origin.x, bbox.origin.y, bbox.size.width, bbox.size.height);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);
    </script>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with transformations applied.


### clip
Gets or sets the element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element#methods-clip)


<div class="meta-api-description">
Configure, assign, or retrieve the clipping path or mask that controls how an image or drawing is visually constrained and partially rendered within a graphical element, enabling dynamic updates to clipping regions for precise control over visible sections, removal of unwanted areas, shape-based masking, and customizable render boundaries. This includes setting or getting the clip shape, path, or geometry to mask or crop images or drawings dynamically during runtime, allowing flexible masking, clipping, or region restriction in graphical rendering contexts.
</div>

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([10, 10], [200, 150]);
        var image = new draw.Image("https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png", rect);
        
        var clipPath = new draw.Path();
        clipPath.moveTo(50, 50).lineTo(150, 50).lineTo(150, 150).lineTo(50, 150).close();
        
        image.clip(clipPath);
        console.log("Clip path set:", image.clip());

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);
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
Retrieve the axis-aligned bounding box of a graphic element after applying clipping paths and all transformations such as scaling, rotation, translation, or complex matrix operations, useful for hit-testing, detecting collisions, layout calculations, positioning elements, exporting graphics with accurate bounds, intersection detection, and determining visible clipped regions of images or drawings after transform adjustments.
</div>

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([10, 10], [200, 150]);
        var image = new draw.Image("https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png", rect);
        
        var clipPath = new draw.Path();
        clipPath.moveTo(50, 50).lineTo(150, 50).lineTo(150, 150).lineTo(50, 150).close();
        image.clip(clipPath);
        
        var clippedBBox = image.clippedBBox();
        console.log("Clipped bounding box:", clippedBBox);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);
    </script>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with clipping transformations applied.

### containsPoint
Returns true if the shape contains the specified point.


<div class="meta-api-description">
Check whether a specific coordinate or point intersects, hits, lies inside, or overlaps with an image shape within a drawing component, enabling precise hit-testing, click detection, pointer event handling, collision detection, or touch recognition by determining if the point falls within the bounds or area of the image, allowing developers to configure event responses or spatial queries based on coordinate inputs relative to the visual image element.
</div>

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([50, 50], [150, 100]);
        var image = new draw.Image("https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png", rect);
        
        var point1 = new geom.Point(100, 80);
        var point2 = new geom.Point(250, 200);
        
        console.log("Point 1 in image:", image.containsPoint(point1)); // Should return true
        console.log("Point 2 in image:", image.containsPoint(point2)); // Should return false

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);
    </script>

#### Parameters

##### point `kendo.geometry.Point`
The point that should be checked.

#### Returns
`Boolean` value indicating if the shape contains the point.

### opacity
Gets or sets the element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element#methods-opacity)


<div class="meta-api-description">
Set, change, or retrieve the transparency level, alpha value, or visual opacity of a drawing image or graphical element within a drawing component, enabling developers to control, adjust, or query how see-through or solid the image appears, manipulate fading effects, overlay transparency, graphical blending, or rendering visibility dynamically in code, fine-tune opacity for UI elements, and programmatically modify image transparency settings to achieve desired visual effects.
</div>

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([10, 10], [200, 150]);
        var image = new draw.Image("https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png", rect);
        
        console.log("Initial opacity:", image.opacity()); // Default is 1
        image.opacity(0.3);
        console.log("New opacity:", image.opacity());

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);
    </script>

#### Parameters

##### opacity `Number`
The element opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns

`Number` The current element opacity.


### src
Gets or sets the image source URL.


<div class="meta-api-description">
Retrieve or specify the source URL for an image used in a drawing or graphic component, enabling loading, updating, or changing the image content dynamically by setting or getting the image path, picture link, or resource location; supports querying the current image source or assigning a new URL string to control which image is displayed in the drawing context, facilitating flexible image management and integration within visual elements.
</div>

#### Example - changing the image source

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect(
            [10, 10],  // Position of the top left corner
            [240, 240] // Size of the rectangle
        );
        var image = new draw.Image("https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png", rect);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);

        setTimeout(function() {
            image.src("https://goo.gl/10IzfV");
        }, 1000);
    </script>

#### Parameters

##### value `String`
The new source URL.

#### Returns

`String` The current image source URL.


### rect
Gets or sets the rectangle defines the image position and size.


<div class="meta-api-description">
Accessing or modifying the bounding rectangle of an image within a drawing context to retrieve or update its position and size dynamically, enabling developers to control image layout by getting current coordinates and dimensions or setting new ones to move or resize the image at runtime, adjusting the displayed area's rectangle parameters programmatically after initialization for precise placement, scaling, or repositioning tasks.
</div>

#### Example - resizing the image

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect(
            [10, 10],  // Position of the top left corner
            [240, 240] // Size of the rectangle
        );
        var image = new draw.Image("https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png", rect);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);

        setTimeout(function() {
            image.rect().setSize([120, 120]);
        }, 1000);
    </script>

#### Parameters

##### value `kendo.geometry.Rect`
The new image rectangle.

#### Returns

`kendo.geometry.Rect` The current image rectangle.


### transform
Gets or sets the transformation of the element.
Inherited from [Element.transform](/api/javascript/drawing/element#methods-transform)


<div class="meta-api-description">
control or modify the visual transformation of an image element by applying rotation, scaling, translation, or custom matrix transformations; retrieve the current image transform state or set new transformation parameters to adjust the displayed orientation, size, position, or skew of the drawing; configure image manipulation dynamically to rotate images by degrees, scale them up or down, move them across the canvas, or combine multiple transform operations for complex visual effects in graphics rendering or UI design environments
</div>

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([50, 50], [100, 80]);
        var image = new draw.Image("https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png", rect);
        
        var transform = geom.transform().rotate(45, [100, 90]).scale(1.2, 1.2);
        image.transform(transform);
        console.log("Transform applied:", image.transform());

        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);
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
Control or check whether an image or drawing element is displayed, hidden, or visible within a graphical interface or component, enabling toggling visibility states, querying if an image is currently shown or concealed, setting display options programmatically, managing rendering visibility, and adjusting element presence dynamically during runtime or user interaction.
</div>

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([10, 10], [200, 150]);
        var image = new draw.Image("https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png", rect);
        
        console.log("Initial visibility:", image.visible()); // Default is true
        
        var surface = draw.Surface.create($("#surface"));
        surface.draw(image);
        
        setTimeout(function() {
            image.visible(false);
            console.log("Visibility after hiding:", image.visible());
        }, 1000);
        
        setTimeout(function() {
            image.visible(true);
            console.log("Visibility after showing:", image.visible());
        }, 2000);
    </script>

#### Parameters

##### visible `Boolean`
A flag indicating if the element should be visible.

#### Returns

`Boolean` true if the element is visible; false otherwise.
