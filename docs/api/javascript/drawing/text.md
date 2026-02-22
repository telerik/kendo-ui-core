---
title: Text
page_title: API reference for methods and fields of Kendo UI Drawing Text
res_type: api
---

# kendo.drawing.Text : kendo.drawing.Element

Draws a single line of text at the given position.

#### Example - creating a text
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Foo", position);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

## Constructor Parameters

### content `String`
The content of the text. Special characters are not supported.


<div class="meta-api-description">
How do I set default plain text in Kendo UI drawingapi? Specify or configure the initial visible plain text string used during creation or setup of a graphic or drawing text element, controlling what static text appears by default without formatting, markup, or special symbols; set or pass unformatted text content at construction time to define displayed captions, labels, or messages within visual components, ensuring simple text rendering for user interface elements, annotations, or graphical text objects in code initialization or component instantiation processes.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Hello World", position);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

### position `kendo.geometry.Point`
The position of the text upper left corner.


<div class="meta-api-description">
How do I specify the exact coordinates for the upper-left corner of text in Kendo UI? Configure the initial placement of text by specifying the exact coordinates for the upper-left corner, enabling precise control over the text’s position within its container or drawing area. Adjust, set, or define the starting location of textual elements when creating or initializing text components, controlling alignment and spatial arrangement by providing coordinate values to determine where the text is rendered on screen or within a user interface. Specify origin points, control text layout, and manage positioning to align text accurately relative to parent elements or canvases.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(50, 30);
        var text = new draw.Text("Positioned text", position);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

### options `Object`
Represents an object containing the configuration options. All of the options are available in [Configuration](/api/javascript/drawing/text#configuration).


<div class="meta-api-description">
How do I customize the appearance of text in Kendo UI for jQuery drawingapi? Set text content, position, style, appearance, formatting, and behavior when creating or initializing a text drawing element, including configuring font, color, alignment, wrapping, and other display properties to control how text is rendered and behaves within a graphical context. Adjust all relevant text attributes at the time of instantiation for precise control over layout, style, content, and interaction, enabling customization of visual text elements and their dynamic properties upon creation.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Styled Text", position, {
            font: "bold 16px Arial",
            fill: { color: "blue" },
            stroke: { color: "red", width: 1 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

## Configuration

### clip `kendo.drawing.Path`
The element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element#configuration-clip)


<div class="meta-api-description">
How do I mask text overflow with Kendo UI's drawingapi clip property? Set or adjust the clipping boundary for text rendering to define how text overflows are trimmed or masked by specifying a clipping path or shape that constrains the visible area of text elements, enabling control over text visibility within custom or predefined regions, cropping text output to fit within specific contours or shapes, and managing how text is visually confined or clipped during display or drawing operations.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(20, 20);
        var text = new draw.Text("Clipped Text", position, {
            font: "20px Arial"
        });

        var clipPath = draw.Path.fromRect(new geom.Rect([25, 25], [80, 30]));
        text.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

### cursor `String`
The element cursor.
Inherited from [Element.cursor](/api/javascript/drawing/element#configuration-cursor)


<div class="meta-api-description">
How can I change the cursor shape when hovering over a text element in Kendo UI? Customize and configure the mouse pointer appearance when hovering over text elements by setting different cursor styles such as pointer, move, text, or any valid CSS cursor value to indicate interactivity, text selection, dragging, or other user interface states. Enable control over hover cursor behavior for text content, adjusting the visual feedback to match user expectations or design requirements, including changing the cursor icon, enabling custom pointer shapes, or indicating editable or draggable text regions through style settings inherited from general element cursor controls.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Clickable text", position, {
            cursor: "pointer",
            fill: { color: "blue" }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

### fill `kendo.drawing.FillOptions`
The fill options of the text.


<div class="meta-api-description">
How to customize text color fill in Kendo UI drawingapi using solid colors? Configure text color fill using solid colors, gradients, patterns, or opacity settings to customize text appearance in drawing or rendering contexts. Set or adjust how text is visually filled or colored, control fill styles for text rendering, apply various fill effects including transparent or patterned fills, and manage text color rendering for graphical elements. This allows developers to enable precise color customization, gradient fills, patterned fills, or opacity levels when drawing text in graphics or canvas components.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Filled text", position, {
            font: "18px Arial",
            fill: {
                color: "green",
                opacity: 0.8
            }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

### font `String`
The font to use for rendering the text.
Accepts the standard [CSS font syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/font#Syntax).

Examples of valid font values:
* Size and family: "2em 'Open Sans', sans-serif"
* Style, size and family: "italic 2em 'Open Sans', sans-serif"


<div class="meta-api-description">
How do I customize the font used in Kendo UI drawingapi elements? Control and configure the text rendering font by specifying font-family, font-style, font-weight, and font-size using standard CSS font syntax to customize appearance, enable italic or bold styles, adjust sizing units like em or px, combine multiple font families for fallback, set typographic styles for drawing or UI elements, and define precise font settings for text display in components supporting CSS font declarations and flexible text formatting.
</div>

#### Example - setting the font for a text

    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var position = new geom.Point(10, 10);
      var text = new draw.Text("Foo", position, {
        font: "italic 18px 'Open Sans', sans-serif"
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(text);
    </script>

### opacity `Number`
The element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element#configuration-opacity)


<div class="meta-api-description">
How to set transparency level for text elements in Kendo UI drawingapi? Adjust the transparency level or alpha of text elements by setting numerical opacity values ranging from fully invisible zero to fully visible one, enabling fine control over text visibility, translucency, fade effects, layering, or blending with backgrounds. Configure text transparency dynamically or statically to create subtle visual emphasis or soft fades, control element intensity, or produce semi-transparent text overlays. Use opacity to modulate text clarity and presence within user interfaces, applications, or graphics, adapting visibility in response to animation, state changes, or design requirements.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Semi-transparent text", position, {
            font: "16px Arial",
            fill: { color: "red" },
            opacity: 0.5
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

### stroke `kendo.drawing.StrokeOptions`
The [stroke options](/api/javascript/drawing/stroke-options/) of the text.


<div class="meta-api-description">
How do I customize the outline of text in Kendo UI for jQuery? Configure and customize text outlines by setting properties that control the color, thickness, dash patterns, opacity, and style of the stroke around characters, including options for line joins and end caps to achieve precise text border effects, outline rendering, or decorative text strokes for emphasis, highlighting, or improved visibility in text components.
</div>

#### Example - set the stroke option of the Text

    <div id="container"></div>
    <script>
        var svg = kendo.drawing.Surface.create($("#container"), { type: "svg" });
        var text = new kendo.drawing.Text("Some Text", [100, 100], {
            stroke: {
                color: '#E4141B',
                dashType: "dash"
            }
        })
        svg.draw(text);
    </script>

### tooltip `kendo.drawing.TooltipOptions`
The tooltip options of the shape.


<div class="meta-api-description">
How to customize the tooltip display in Kendo UI drawing shapes? Control and customize the display of contextual tooltips for text within drawing shapes by configuring options such as content, position, trigger events, display delay, styling, and templates to manage how and when informational popups appear on hover or focus over text elements. Enable tooltip visibility settings, adjust placement relative to text, define custom HTML or text content for tooltips, specify interaction triggers like click or hover, fine-tune delay timings for showing or hiding tooltips, and apply styling for appearance and formatting to enhance user interface feedback and clarity around textual annotations in graphic components.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Hover me", position, {
            font: "16px Arial",
            tooltip: {
                content: "This is a tooltip for the text"
            }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

### transform `kendo.geometry.Transformation`
The transformation to apply to this element.
Inherited from [Element.transform](/api/javascript/drawing/element#configuration-transform)


<div class="meta-api-description">
How to rotate text in Kendo UI for jQuery dynamically? Control text appearance by configuring geometric transformations such as positioning, rotating, scaling, or skewing text elements dynamically or during initialization. This includes setting custom transform matrices or transformation objects to adjust text orientation, size, tilt, and placement within user interfaces. Enable text manipulation through translation, rotation angles, scaling factors, or skew adjustments to achieve effects like text rotation, resizing, skewing, or translations inline with design requirements or interactive behaviors in components. Adjust text rendering with flexible transform settings to apply affine transformations, combine multiple transforms, or override default layouts for precise visual control and responsive design integration.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(50, 50);
        var text = new draw.Text("Rotated text", position, {
            font: "16px Arial",
            transform: geom.transform().rotate(45, [50, 50])
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

### visible `Boolean`
A flag, indicating if the element is visible.
Inherited from [Element.visible](/api/javascript/drawing/element#configuration-visible)


<div class="meta-api-description">
How do I control the visibility of text in Kendo UI for jQuery drawingapi? Manage display and rendering of text components by toggling their visibility state, enabling or disabling the element’s presence in the user interface and layout calculations. Configure initial rendering behavior, show or hide text dynamically, control whether text is drawn or excluded from the page flow, and ensure elements participate or skip layout processing based on visibility flags. Optimize interface presentation by conditionally displaying textual content, setting visibility parameters to control whether text nodes are active in rendering pipelines and layout engines.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Toggle visibility", position, {
            font: "16px Arial",
            visible: false
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);

        setTimeout(function() {
            text.visible(true);
        }, 2000);
    </script>

## Methods

### bbox
Returns the bounding box of the element with transformations applied.
Inherited from [Element.bbox](/api/javascript/drawing/element#methods-bbox)


<div class="meta-api-description">
How do I get the actual position of a scaled and rotated text element in Kendo UI for jQuery? Retrieve the calculated bounding rectangle of a text element after applying all transformations like scaling, rotation, and translation to determine its exact position and dimensions for tasks such as layout arrangement, collision detection, hit-testing, or dynamic positioning. Obtain the transformed bounding box coordinates including x, y, width, and height to measure the visible area of text after visual effects or CSS transforms, enabling precise control over alignment, overlap checks, spatial queries, or interactive element interactions within rendered graphics or UI components.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Sample text", position, {
            font: "16px Arial"
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);

        var bbox = text.bbox();
        console.log("Text bounding box:", bbox);
    </script>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with transformations applied.


### clip
Gets or sets the element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element#methods-clip)


<div class="meta-api-description">
How do I set a clipping path for text elements in Kendo UI? Set, get, or update a clipping path for text elements by attaching, modifying, or removing shapes that mask or restrict text rendering, including SVG clip paths or custom drawing paths, to control visible text regions, enable text masking effects, define text boundaries, or apply clipping shapes for text visualization and manipulation.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("This text will be clipped", position, {
            font: "18px Arial"
        });

        var clipPath = draw.Path.fromRect(new geom.Rect([15, 15], [60, 20]));
        text.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
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
How do I get the visible bounds of an element after applying clipping masks and transformations in Kendo UI for jQuery? Calculate or retrieve the visible bounding box of an element after all clipping masks, clip paths, and transformation effects like scaling, rotation, and translation have been applied to determine the precise on-screen area for hit-testing, collision detection, layout adjustment, alignment, or measuring visible content dimensions within a drawing or graphical interface. This method helps compute the final clipped and transformed rectangular bounds to accurately handle element visibility, interaction zones, or spatial calculations when elements are modified by masks, transformations, or clipping effects.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Clipped text", position, {
            font: "16px Arial"
        });

        var clipPath = draw.Path.fromRect(new geom.Rect([15, 15], [50, 20]));
        text.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);

        var clippedBBox = text.clippedBBox();
        console.log("Clipped bounding box:", clippedBBox);
    </script>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with clipping transformations applied.

### containsPoint
Returns true if the shape contains the specified point.


<div class="meta-api-description">
How to check if a point is inside a Kendo UI text element? Determine if a specific coordinate or point lies within the boundaries of a text element rendered in a drawing or canvas context by performing hit testing or spatial containment checks, enabling detection of whether the given position intersects, overlaps, or falls inside the visible text shape for purposes such as pointer event handling, mouse or touch interaction, collision detection, region querying, or spatial indexing in graphical interfaces.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(50, 50);
        var text = new draw.Text("Click to test", position, {
            font: "16px Arial"
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);

        $("#surface").click(function(e) {
            var offset = $(this).offset();
            var point = new geom.Point(e.pageX - offset.left, e.pageY - offset.top);
            var contains = text.containsPoint(point);
            console.log("Text contains point:", contains);
        });
    </script>

#### Parameters

##### point `kendo.geometry.Point`
The point that should be checked.

#### Returns
`Boolean` value indicating if the shape contains the point.

### content
Gets or sets the text content.


<div class="meta-api-description">
How can I dynamically update the displayed text in a Kendo UI for jQuery drawingapi? Accessing, retrieving, setting, or updating the visible text string of a text element dynamically, including reading the current content, changing the displayed text programmatically, modifying or replacing the existing string shown in the UI, controlling the text value at runtime, getting the current string content without arguments, or assigning a new string to override what is displayed.
</div>

#### Example - change content
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("", position);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);

        setInterval(function() {
            text.content(kendo.toString(new Date(), "T"));
        }, 1000);
    </script>

#### Parameters

##### value `String`
The new text content to set.

#### Returns
`String` The current content of the text.


### fill
Sets the text [fill](/api/javascript/drawing/text#configuration-fill).


<div class="meta-api-description">
How do I change the fill color of text elements dynamically in Kendo UI for jQuery? Change, set, update, or configure the color, gradient, or pattern used to fill text elements dynamically at runtime, enabling control over text appearance, styling, and visual effects such as solid colors, multi-color gradients, or textured patterns for text components and shapes. Adjust text fill properties flexibly after text creation to apply custom fill styles, modify text color fills on the fly, or switch between different fill configurations to enhance UI design and text rendering aesthetics.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Dynamic fill", position, {
            font: "18px Arial"
        });

        text.fill("purple", 0.7);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

#### Parameters

##### color `String`
The [fill color](/api/javascript/drawing/fill-options#fields-color) to set.

##### opacity `Number` *optional*
The [fill opacity](/api/javascript/drawing/fill-options#fields-opacity) to set.

#### Returns
`kendo.drawing.Text` The current instance to allow chaining.


### opacity
Gets or sets the element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element#methods-opacity)

If set, the stroke and fill opacity will be multiplied by the element opacity.


<div class="meta-api-description">
How do I change the opacity of text in Kendo UI for jQuery? Adjust, set, or retrieve the transparency level of text elements to create fade effects, animate visibility changes, or control element opacity precisely; modify overall alpha values influencing stroke and fill transparency collectively, enabling smooth transitions, reveal effects, or gradual disappearance by configuring opacity settings on text components with inherited inheritance from base element properties.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Fading text", position, {
            font: "18px Arial",
            fill: { color: "blue" }
        });

        text.opacity(0.3);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

#### Parameters

##### opacity `Number`
The element opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`Number` The current element opacity.


### position
Gets or sets the position of the text upper left corner.


<div class="meta-api-description">
How to set the position of a text element in Kendo UI drawingapi? Get or set the coordinates of the top-left corner of a text element within a drawing or canvas environment, enabling precise control over text placement by specifying or retrieving position values as a point object or separate x and y numbers; this functionality supports retrieving current location data, updating text layout by moving it to new specified positions, aligning text within graphical interfaces, and managing text element coordinates for dynamic or programmatic positioning tasks.
</div>

#### Example - change position
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Foo", position);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);

        setTimeout(function() {
            text.position([20, 20]);
        }, 1000);
    </script>

#### Parameters

##### value `kendo.geometry.Point`
The new position of the text upper left corner.

#### Returns
`kendo.geometry.Point` The current position of the text upper left corner.


### stroke
Sets the text [stroke](/api/javascript/drawing/text#configuration-stroke).


<div class="meta-api-description">
How to dynamically change the outline color of text in a Kendo UI drawing element? Control and modify the outline or border applied around text renderings in a drawing element, enabling dynamic updates to the text’s stroke appearance such as thickness, color, style, and pattern after the initial setup. Configure or adjust the text edge effects, including enabling or changing the stroke settings linked to predefined stroke configurations, to influence how text boundaries are drawn for emphasis, clarity, or stylistic purposes on graphic drawing components. This covers scenarios where developers want to set or update the text outline properties programmatically, apply different stroke designs, or switch stroke attributes during runtime for text elements in visual renderings.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Outlined text", position, {
            font: "20px Arial",
            fill: { color: "white" }
        });

        text.stroke("black", 2, 1);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

#### Parameters

##### color `String`
The [stroke color](/api/javascript/drawing/stroke-options#fields-color) to set.

##### width `Number` *optional*
The [stroke width](/api/javascript/drawing/stroke-options#fields-width) to set.

##### opacity `Number` *optional*
The [stroke opacity](/api/javascript/drawing/stroke-options#fields-opacity) to set.

#### Returns
`kendo.drawing.Text` The current instance to allow chaining.


### transform
Gets or sets the transformation of the element.
Inherited from [Element.transform](/api/javascript/drawing/element#methods-transform)


<div class="meta-api-description">
How to apply scaling transformation to Kendo UI text elements? Control or retrieve the geometric transformations applied to text elements, enabling you to set or get translations, rotations, scalings, and skews to modify position, orientation, size, or shape within drawing components. Configure or update transformation matrices or parameters dynamically on text objects, apply affine transformations such as move, spin, resize, tilt, or distort text elements through methods that manipulate their spatial properties after initialization. Manage or adjust transform states, customize text layout via geometric changes, and handle transformation inheritance or composition to achieve precise visual adjustments and animations.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(80, 80);
        var text = new draw.Text("Scaled text", position, {
            font: "16px Arial"
        });

        var transformation = geom.transform().scale(1.5, 1.5);
        text.transform(transformation);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
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
How to toggle visibility of text element in Kendo UI for jQuery using the drawingapi? Control whether a text element is displayed or hidden during runtime, enabling dynamic toggling of visibility to show, hide, or check if the text is currently rendered, visible on screen, participates in layout flow, and responds to hit testing. Adjust visibility state programmatically by setting true or false to enable or disable text rendering, or retrieve the current visible state without changing it, supporting conditional UI updates, interactive displays, or layout management. Manage text presence in the visual output and interaction layers by querying or modifying its visibility status seamlessly.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Now you see me", position, {
            font: "16px Arial"
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);

        setTimeout(function() {
            text.visible(false);
            console.log("Text is now hidden");
        }, 2000);

        setTimeout(function() {
            text.visible(true);
            console.log("Text is now visible again");
        }, 4000);
    </script>

#### Parameters

##### visible `Boolean`
A flag indicating if the element should be visible.

#### Returns
`Boolean` true if the element is visible; false otherwise.
