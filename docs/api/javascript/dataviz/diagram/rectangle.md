---
title: Rectangle
res_type: api
---

# kendo.dataviz.diagram.Rectangle

Represents a rectangle.

## Configuration

### fill `String|Object`

Defines the fill options of the rectangle.


<div class="meta-api-description">
How do I change the background color of a rectangle in Kendo UI Diagram? Set or customize the interior fill of a rectangular shape by configuring solid colors, gradients, patterns, textures, images, or opacity levels to control the background appearance inside the shape, enabling visual styling, background customization, and fill effects for graphics, drawings, or UI components.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                color: "#ff6358",
                opacity: 0.8
            }
        }]
    });
    </script>

### fill.color `String`

Defines the fill color of the rectangle.


<div class="meta-api-description">
How do I set the fill color of a rectangle in Kendo UI diagram? Customize and control a rectangle’s internal fill appearance by specifying its color using various formats such as hex codes, RGB, RGBA, or named CSS colors to define the shape’s background or interior styling; configure, set, or change the fill color during creation or runtime to style, paint, or theme the shape’s inside area, enabling customization of opacity, brightness, and hues to achieve desired visual effects within vector graphics or UI elements.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                color: "#0099ff"
            }
        }]
    });
    </script>

### fill.opacity `Number` *(default: 1)*

Defines the fill opacity of the rectangle.


<div class="meta-api-description">
How do I set opacity for a rectangle's fill color in Kendo UI diagram? Adjust and configure the transparency level, opacity, or alpha of a rectangle’s fill color to make it fully opaque, semi-transparent, or completely transparent, enabling control over the visual fill fade, translucency, alpha channel, and color intensity for design styling, layering effects, and user interface customization.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                color: "#ff6358",
                opacity: 0.5
            }
        }]
    });
    </script>

### fill.gradient `Object`

Defines the gradient fill of the shape.


<div class="meta-api-description">
How do I configure a radial gradient fill for rectangles in Kendo UI diagram? Configure and control the gradient fill for rectangular shapes by setting color stops, gradient styles such as linear or radial, and directions to customize backgrounds, create smooth color transitions, adjust visual effects, apply multi-color fills, and enhance UI elements with precise gradient parameters that enable dynamic styling and detailed appearance modifications.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0],
                    end: [1, 1],
                    stops: [
                        { offset: 0, color: "#ff6358" },
                        { offset: 1, color: "#ffd246" }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.type `String` *(default: "linear")*
The type of the gradient. Supported values are:

* linear
* radial


<div class="meta-api-description">
How to customize gradient fill style for rectangles in Kendo UI diagram? Control and customize the shape and style of color transitions for rectangular fills in drawing components by configuring the gradient pattern, allowing you to select between smooth linear gradients that blend colors along a straight path or radial gradients that radiate colors outward in a circular fashion. Enable, set, or switch gradient fill styles to achieve various visual effects like linear color blending, directional shading, circular color flows, or smooth radial fades within shapes. Adjust gradient types to refine how colors transition inside rectangles, whether you want linear color interpolation or a circular gradient spread for backgrounds, UI elements, or vector graphics.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "radial",
                    center: [0.5, 0.5],
                    radius: 0.8,
                    stops: [
                        { offset: 0, color: "#ff6358" },
                        { offset: 1, color: "#ffd246" }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.center `Array`
The center of the radial gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.


<div class="meta-api-description">
How to center a radial gradient within a rectangular shape in Kendo UI for jQuery? Adjust or configure the focal point, origin, or center position of a radial gradient within a rectangular shape by specifying coordinates that define where the gradient radiates from; this setting controls the gradient’s midpoint or focus inside the rectangle using relative [x, y] values aligned to the shape’s bounds, enabling customization of gradient direction, offset, or alignment such as centering, shifting toward edges, or repositioning the color spread origin for effects like spotlighting, highlighting, or directional light within the rectangle area.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "radial",
                    center: [0.3, 0.3],
                    radius: 0.7,
                    stops: [
                        { offset: 0, color: "#ff6358" },
                        { offset: 1, color: "#ffd246" }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.radius `Number` *(default: 1)*
The radius of the radial gradient relative to the shape bounding box.


<div class="meta-api-description">
How do I adjust the radial gradient radius in Kendo UI for jQuery diagram rectangle fill? Adjust the size and scale of a radial gradient inside a rectangular shape by controlling the gradient’s radius relative to the shape’s dimensions, enabling customization of how far the color transition spreads from the center outward. Configure, set, or modify the radial gradient radius to proportionally expand or contract the gradient effect within the rectangle’s bounds, affecting the visual intensity and coverage of the gradient fill. Fine-tune, control, or customize the gradient’s radial spread for diagram elements or UI shapes to achieve precise color blending and aesthetic effects based on relative sizing parameters.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "radial",
                    center: [0.5, 0.5],
                    radius: 0.3,
                    stops: [
                        { offset: 0, color: "#ff6358" },
                        { offset: 1, color: "#ffd246" }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.start `Array`
The start point of the linear gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.


<div class="meta-api-description">
How do I adjust the starting point of a linear gradient fill in a Kendo UI diagram rectangle? Adjust or define the initial position or starting point of a linear gradient fill inside a rectangular shape by specifying normalized coordinates ranging from top-left to bottom-right, enabling control over gradient angle, direction, and the origin of color transitions within the shape's bounds, useful for configuring gradient orientation, customizing color blending start, setting fill patterns, controlling shading flow, or modifying gradient vector origins for visual effects on rectangles.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0.5],
                    end: [1, 0.5],
                    stops: [
                        { offset: 0, color: "#ff6358" },
                        { offset: 1, color: "#ffd246" }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.end `Array`
The end point of the linear gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.


<div class="meta-api-description">
How do I set the endpoint coordinates of a linear gradient fill in a Kendo UI diagram rectangle? Control and configure the endpoint coordinates of a linear gradient fill on a rectangular shape, setting where the gradient stops using relative positions within the rectangle’s bounds such as [x, y] values ranging from top-left to bottom-right. Adjust or define the finish location of gradient color transitions in rectangular components, customize gradient direction and blending stop points, set precise vector coordinates for gradient termination, and enable fine-tuned gradient endpoint positioning to influence shading effects, color distribution, and visual styling inside rectangle shapes with normalized coordinate inputs.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0],
                    end: [1, 0],
                    stops: [
                        { offset: 0, color: "#ff6358" },
                        { offset: 1, color: "#ffd246" }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.stops `Array`
The array of gradient color stops.


<div class="meta-api-description">
How do I specify multiple gradient color stops for a rectangle in Kendo UI diagram? Control and customize smooth color transitions for rectangular shapes by specifying multiple gradient color stops including position offsets, colors, and opacity levels to create complex, multi-color fills; adjust, configure, and fine-tune gradient progressions for rectangle backgrounds or fills, enabling developers to set precise color blending points, linear or radial gradient stops, and transparent gradients within shapes for visually appealing UI elements.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0],
                    end: [1, 1],
                    stops: [
                        { offset: 0, color: "#ff6358", opacity: 1 },
                        { offset: 0.5, color: "#ffd246", opacity: 0.8 },
                        { offset: 1, color: "#28b4c8", opacity: 0.6 }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.stops.offset `Number`
The stop offset from the start of the element.
Ranges from 0 (start of gradient) to 1 (end of gradient).


<div class="meta-api-description">
How do I control the position of color stops in a rectangle's gradient fill using Kendo UI for jQuery? Adjust or set the precise location of a color stop within a rectangle's gradient fill by controlling its normalized position along the gradient vector, using values between 0 and 1 to define exact start-to-end placement; customize gradient transitions, configure color stop offsets, control color blending points, fine-tune gradient stops, specify gradient stop positions, manipulate gradient progression, enable precise gradient color placement, and set color stop distribution for smooth or sharp gradients in graphical shape fills.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0],
                    end: [1, 0],
                    stops: [
                        { offset: 0, color: "#ff6358" },
                        { offset: 0.3, color: "#ffd246" },
                        { offset: 0.7, color: "#28b4c8" },
                        { offset: 1, color: "#78d237" }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.stops.color `String`
The color in any of the following formats.

| Format         | Description
| ---            | --- | ---
| red            | [Basic](https://www.w3.org/TR/css3-color/#html4) or [Extended](https://www.w3.org/TR/css3-color/#svg-color) CSS Color name
| #ff0000        | Hex RGB value
| rgb(255, 0, 0) | RGB value

Specifying 'none', 'transparent' or '' (empty string) will clear the fill.


<div class="meta-api-description">
How do I control the color of individual gradient stops in a rectangle's fill using Kendo UI for jQuery? Control and customize the color of individual gradient stops within a rectangle’s fill on drawing surfaces, supporting input of colors using CSS named colors, hex codes like #rrggbb, RGB functional notation, or clearing colors with none, transparent, or empty values to remove the fill. Adjust, set, define, or configure specific gradient stop colors for shapes, enabling fine-tuned multi-stop gradients with flexible color formats in styling, design, or vector graphic contexts. Easily specify precise color points in gradients by using common web color formats or reset stops to transparent for layered or complex visual effects on rectangular shapes.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0],
                    end: [1, 0],
                    stops: [
                        { offset: 0, color: "red" },
                        { offset: 0.5, color: "#ff0000" },
                        { offset: 1, color: "rgb(255, 0, 0)" }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.stops.opacity `Number`
The fill opacity.
Ranges from 0 (completely transparent) to 1 (completely opaque).


<div class="meta-api-description">
How do I set the opacity of individual color stops in a gradient fill for shapes using Kendo UI diagram? Adjust the transparency level or alpha value of individual color stops within a gradient fill for shapes or drawings, enabling control over how see-through or solid each point in the gradient appears, with settings ranging from fully invisible to completely opaque; useful for fine-tuning visual blending, layering effects, fade transitions, partial transparency, and dynamic opacity adjustments in graphical components or drawing contexts.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0],
                    end: [1, 0],
                    stops: [
                        { offset: 0, color: "#ff6358", opacity: 1 },
                        { offset: 0.5, color: "#ffd246", opacity: 0.7 },
                        { offset: 1, color: "#28b4c8", opacity: 0.3 }
                    ]
                }
            }
        }]
    });
    </script>

### height `Number`

Sets the height of the rectangle.


<div class="meta-api-description">
How do I set the height of a rectangular shape in a Kendo UI diagram? Adjust, set, or modify the vertical dimension, size, or height of rectangular shapes or components in layouts, user interfaces, or graphics by controlling how tall an element appears. This covers tasks such as resizing, scaling height, configuring vertical measurements, animating or binding vertical properties, and programmatically changing or controlling the component’s vertical extent for design, UI adjustments, or dynamic transformations.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 150,
            fill: {
                color: "#ff6358"
            }
        }]
    });
    </script>

### stroke `Object`

Defines the stroke configuration.


<div class="meta-api-description">
How do I customize the border styling of a rectangular shape in Kendo UI for jQuery diagram component? Control and customize the outline or border styling of a rectangular shape by setting properties that adjust the color, thickness, transparency, dash styles, and corner joins or end caps of the shape’s edge. Enable or configure the rectangle’s border appearance to match design needs by specifying stroke color, width, opacity levels, dash patterns such as solid or dashed lines, and the type of line joins or caps to create smooth or sharp edges. Adjust the visual presentation of rectangle outlines through settings affecting stroke attributes, outline patterns, and border styling options for enhanced shape rendering and design customization.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                color: "#ff6358"
            },
            stroke: {
                color: "#0099ff",
                width: 3
            }
        }]
    });
    </script>

### stroke.color `String`

Defines the line color of the rectangle.


<div class="meta-api-description">
How to set border color of rectangle in Kendo UI diagram? Control and customize the border color of rectangles by specifying any CSS-compatible color value to define the stroke or outline hue, allowing developers to adjust the shape's edge appearance for theming, highlighting, styling, or visual differentiation purposes, including setting line color, border tint, outline shade, or stroke hue to match design requirements or user interface color schemes.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                color: "#ff6358"
            },
            stroke: {
                color: "#28b4c8"
            }
        }]
    });
    </script>

### stroke.width `Number`

Defines the stroke width of the rectangle.


<div class="meta-api-description">
How do I set the stroke width of a rectangle in Kendo UI for jQuery? Adjust or configure the thickness, weight, or width of a rectangle's outline, border, or stroke by setting or updating the line thickness to control the visual prominence, edge boldness, or border size of rectangular shapes dynamically during initialization or at runtime. Control the stroke or border width to emphasize edges, customize visual styles, or modify outline dimensions in UI components that render rectangular frames or shapes.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                color: "#ff6358"
            },
            stroke: {
                color: "#0099ff",
                width: 5
            }
        }]
    });
    </script>

### width `Number`

Sets the width of the rectangle.


<div class="meta-api-description">
How do I adjust the width of a rectangle in Kendo UI diagram? Adjust the horizontal dimension, set the rectangle’s width, modify or configure the shape's size along the x-axis, control visual and layout width, define or change the rectangle’s breadth, programmatically resize or scale the rectangle’s horizontal length, manage and customize shape width for consistent sizing, control the geometric width parameter in drawing or rendering contexts, dynamically update the horizontal measurement of rectangle elements.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 300,
            height: 100,
            fill: {
                color: "#ff6358"
            }
        }]
    });
    </script>

### x `Number`

The X position of the top-left corner of the rectangle.


<div class="meta-api-description">
How do I set the horizontal position of a rectangle in Kendo UI diagram? Set, get, or adjust the horizontal position, placement, or alignment of a rectangular shape by specifying its left edge coordinate within the diagram or canvas space, enabling precise control over layout, spacing, or movement along the X-axis using numeric values that represent diagram or graphical units for positioning and alignment tasks.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 50,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                color: "#ff6358"
            }
        }]
    });
    </script>

### y `Number`

The Y position of the top-left corner of the rectangle.


<div class="meta-api-description">
How do I set the vertical position of shapes in a Kendo UI diagram? Adjust vertical placement, set or control the top coordinate, specify the Y position of shapes or rectangles within the drawing area, align or move elements vertically by configuring their top-left corner along the Y axis, position graphical components precisely up or down, define vertical offset or spacing for shapes, and manage initial vertical coordinates during rendering or layout setup.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 50,
            width: 200,
            height: 100,
            fill: {
                color: "#ff6358"
            }
        }]
    });
    </script>

## Fields

### drawingElement `kendo.drawing.Path`

The drawing element used to draw the rectangle.


<div class="meta-api-description">
How do I access and modify the drawing element of a rectangle in Kendo UI for jQuery diagram? Access or control the graphical element rendering a rectangle shape within a diagram or canvas, enabling retrieval or modification of the underlying drawing primitive, adjusting visual attributes, applying transformations, configuring event listeners, or customizing rendering behavior dynamically; this interaction is essential for developers looking to manipulate the rectangle’s visual representation, respond to user inputs, or programmatically update the shape’s appearance and properties after initialization.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    var diagram = $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                color: "#ff6358"
            }
        }]
    }).getKendoDiagram();
    
    var rectangle = diagram.shapes[0];
    var element = rectangle.drawingElement;
    console.log("Drawing element:", element);
    </script>

## Methods

### visible

Gets or sets the visibility of the current element.


<div class="meta-api-description">
How do I toggle visibility of a rectangle shape in a Kendo UI diagram? Control or check whether a rectangle shape is shown or hidden within a diagram or graphical interface by enabling visibility toggling, querying the current visibility state, setting visibility to true or false, toggling display on or off, managing rendering status, showing or hiding elements programmatically, and retrieving boolean visibility flags to determine if a shape is visible or invisible in dynamic visual components.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    var diagram = $("#diagram").kendoDiagram({
        shapes: [{
            type: "rectangle",
            x: 100,
            y: 100,
            width: 200,
            height: 100,
            fill: {
                color: "#ff6358"
            }
        }]
    }).getKendoDiagram();
    
    var rectangle = diagram.shapes[0];
    
    // Hide the rectangle
    rectangle.visible(false);
    console.log("Visibility:", rectangle.visible());
    
    // Show the rectangle again
    rectangle.visible(true);
    console.log("Visibility:", rectangle.visible());
    </script>

#### Parameters

##### visible `Boolean`

The new visibility state.

#### Returns

`Boolean` True if the element is visible, false otherwise.
