---
title: Shape
res_type: api
---

# kendo.dataviz.diagram.Shape

The Shape object represents a visual node in the graph or diagram.

## Configuration

### id `String`

The unique identifier for a Shape.


<div class="meta-api-description">
How can I uniquely identify shapes in my Kendo UI diagram for programmatic referencing and manipulation? Assigning a unique identifier to individual shapes within diagrams facilitates precise referencing, selection, updating, and binding of specific graphical elements programmatically; controlling shape IDs enables developers to manage, query, search, or manipulate particular shapes reliably within collections, ensuring uniqueness and allowing targeted interactions, lookups, or modifications in complex diagrams or graphical data structures.
</div>

#### Example - creating a shape with id

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1
      });
      diagram.addShape(shape);
    </script>

### editable `Boolean|Object` *(default: true)*

Defines the shape editable options.


<div class="meta-api-description">
How to enable drag-and-drop functionality for shapes in a Kendo UI diagram? Control, enable, or disable various editing interactions on diagram shapes including drag-and-drop moving, resizing handles, rotation controls, text editing capabilities, connector handle adjustments, and available editing tools. Customize or fine-tune how users can modify shapes by configuring which manipulation actions are permitted, such as adjusting size, orientation, position, and label content. This setting governs shape editability during initialization or runtime, allowing developers to set permissions on shape transformations, interactive adjustments, and connector modifications to tailor the diagram editing experience. Manage shape modifications, including move, resize, rotate, edit text content, connection points, and the visibility or availability of editing features and toolsets.
</div>

#### Example - creating non-editable shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        editable: false
      });
      diagram.addShape(shape);
    </script>

### editable.connect `Boolean`

Specifies whether the connectors should appear on hover.


<div class="meta-api-description">
How do I enable interactive connection points in Kendo UI for jQuery diagram? Configure the ability to enable or disable visible interactive connection points, connector handles, or link anchors that appear on pointer hover or mouseover over shapes for quick creation, editing, or linking of connections within diagrams or graphical editors, allowing control over whether users can visually identify and create connections between shapes by showing or hiding connection hotspots or link points dynamically during interaction or editing stages.
</div>

#### Example - hiding shape connectors

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        editable: {
          connect: false
        }
      });
      diagram.addShape(shape);
    </script>

### path `String`

The path option of a Shape is a description of a custom geometry. The format follows the standard SVG format (https://www.w3.org/TR/SVG/paths.html#PathData "SVG Path data.").


<div class="meta-api-description">
How do I customize a shape's outline in Kendo UI for jQuery diagram using SVG path data strings? Define custom shape outlines by specifying SVG path data strings that include move, line, curve, and close commands such as M, L, C, Q, and Z to control the precise geometry of a shape. Configure, set, or customize vector paths using standard SVG path syntax to draw complex contours, bezier curves, straight lines, and shapes within your graphics or UI components. Enable direct manipulation or programmatic control of shape geometry by supplying path strings that describe detailed shapes and forms for rendering or hit-testing scenarios. Adjust or override default shapes by coding exact SVG path commands for tailored visual designs and geometrical structures.
</div>

#### Example - declaring a custom path for the shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        path: "m35.15,0 L84.85,0 L120,35.15 L120,84.85 L84.85,120 L35.15,120 L0,84.85 L0,35.15 z"
      });
      diagram.addShape(shape);
    </script>

### stroke `Object`

Defines the stroke configuration.


<div class="meta-api-description">
How to customize the outline of shapes in a Kendo UI diagram? Configure and customize the outline of shapes by setting stroke properties such as color, thickness, opacity, dash patterns, solid lines, and gradient effects to control how shape borders appear visually. Adjust the line style, width, transparency, and pattern for shape outlines to achieve desired border effects, including solid, dashed, dotted, or gradient strokes. Enable detailed control over the perimeter styling of geometric shapes by defining color fills around edges, line weights, opacity levels, and customized stroke patterns for precise visual presentation. Set and modify the border appearance of shapes through stroke options that influence line color, thickness, dash or solid line styles, transparency, and gradient transitions along shape edges.
</div>

#### Example - customizing the shape border

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        stroke: {
          color: "#8800cc",
          dashType: "dashDot"
        }
      });
      diagram.addShape(shape);
    </script>

### stroke.color `String`

Defines the color of the shape's stroke.


<div class="meta-api-description">
How do I set the color of the stroke in a Kendo UI diagram shape? Adjust, configure, or specify the outline or border color of shapes and diagram elements, controlling the visible stroke, line, or edge color to customize shape borders, line styling, and shape outlines for visual emphasis, design consistency, or highlighting within diagrams, flowcharts, or graphical representations.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Shape with Red Stroke"
            },
            stroke: {
                color: "red",
                width: 2
            }
        }]
    });
    </script>

### stroke.width `Number` *(default: 1)*

Defines the thickness or width of the shape's stroke.


<div class="meta-api-description">
How do I set the thickness of a shape's border in Kendo UI diagram? Adjusting the thickness, weight, or size of a shape’s border or outline line, controlling the numeric value that defines how thick or thin the edge or stroke appears around diagrams, shapes, or vector graphics. Developers often want to set, configure, or customize line width, stroke size, border thickness, or outline weight to influence visual emphasis, border clarity, or graphic styling in rendered components, diagrams, or shapes. This setting is used to define how bold, thin, or prominent the edges of shapes appear by specifying precise measurements typically in pixels or units, enabling customization of line borders for shapes, paths, and graphical outlines in UI elements.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Shape with Thick Stroke"
            },
            stroke: {
                color: "blue",
                width: 5
            }
        }]
    });
    </script>

### stroke.dashType `String`

The dash type of the shape.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash


<div class="meta-api-description">
How do I customize the stroke style of shapes in a Kendo UI diagram to use dashed lines? Control and customize the outline pattern of shapes by configuring stroke styles such as dashed lines, dotted lines, dash-dot combinations, or long dash sequences, enabling precise control over the stroke appearance for shapes, paths, or vector graphics, allowing adjustments to create dashed borders, dotted outlines, or patterned stroke effects, set stroke dash patterns for shapes, configure vector line styles with dashed or dotted strokes, and enable repeating dash and dot stroke effects to define the visual rhythm of shape borders and outlines in graphical interfaces or drawing applications.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Dashed Stroke"
            },
            stroke: {
                color: "green",
                width: 2,
                dashType: "dash"
            }
        }]
    });
    </script>
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### type `String` *(default: "rectangle")*

Specifies the type of the Shape using any of the built-in shape type.

* "rectangle": this is the default option, representing a SVG Rectangle
* "circle" : a SVG circle/ellipse


<div class="meta-api-description">
How do I change the shape type in Kendo UI for jQuery diagram? Control and configure the geometric form or basic outline of a shape within the diagram or graphics component by selecting predefined shape types or primitives such as rectangle, square, circle, ellipse, or other foundational SVG shapes; set or change the visual shape to render different geometric figures like polygons, ellipses, or rectangles, enabling customization of shape appearance, structure, or silhouette in diagrams, charts, or vector graphics; adjust or specify geometric primitive types to influence shape rendering behavior, allowing switching between common shapes for visualization, iconography, or UI elements.
</div>

#### Example - creating a circle shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        type: "circle"
      });
      diagram.addShape(shape);
    </script>

### x `Number` *(default: 0)*

Defines the x-coordinate of the shape when added to the diagram.


<div class="meta-api-description">
How to set the horizontal position of a shape in a Kendo UI diagram using the x property? Set or adjust the horizontal position, left-right placement, or x-axis coordinate of a shape within a diagram or graphical interface by specifying the x-value. Control, configure, reposition, or update the shape’s horizontal location programmatically or at initialization to move or place the shape accurately along the diagram’s coordinate system. Use this to define, change, align, or fine-tune the shape’s left-to-right placement in layouts, canvas positions, or coordinate-based drawing areas, enabling precise control over its horizontal positioning in visual representations.
</div>

#### Example - specifying shape horizontal position

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 200,
        fill: "#c0f0fc",
        type: "circle"
      });
      diagram.addShape(shape);
    </script>

### y `Number` *(default: 0)*

Defines the y-coordinate of the shape when added to the diagram.


<div class="meta-api-description">
How do I set the initial vertical position of a shape in a Kendo UI diagram? Set or adjust the vertical position or y-coordinate of a graphical shape within a diagram to control its initial placement from top to bottom, enabling precise tuning of vertical alignment, layout, or stacking order in a visual canvas, diagramming tool, or drawing environment. Use vertical positioning, move, shift, offset, or place shapes along the y-axis during component initialization or dynamic updates for layout design, spatial arrangement, coordinate control, or graphical user interface adjustments.
</div>

#### Example - specifying shape vertical position

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        y: 200,
        fill: "#c0f0fc",
        type: "circle"
      });
      diagram.addShape(shape);
    </script>

### minWidth `Number` *(default: 20)*

Defines the minimum width the shape should have, i.e. it cannot be resized to a value smaller than the given one.


<div class="meta-api-description">
How to set minimum width for shapes in Kendo UI diagram? Control the smallest allowable width for shapes to prevent resizing below a set limit, ensuring consistent dimensions during interactive user resizing or programmatic adjustments, restricting shapes from becoming too narrow to maintain clear layouts, avoid overlapping elements, and enforce minimum size constraints for diagrams or graphical components, settable by defining a numeric minimum width to keep shape proportions within desired boundaries.
</div>

#### Example - specifying a minimum width for the shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        minWidth: 60
      });
      diagram.addShape(shape);
    </script>

### minHeight `Number` *(default: 20)*

Defines the minimum height the shape should have, i.e. it cannot be resized to a value smaller than the given one.


<div class="meta-api-description">
How do I set a minimum height for shapes in a Kendo UI diagram? Control the smallest height a shape can have within a diagram or graphical layout by setting a minimum height limit, preventing the shape from being resized smaller during user interaction or automated adjustments, enforcing size constraints, bounding dimensions to avoid layout collapse, maintaining consistent visual proportions, ensuring stable resizing behavior, and allowing configuration of height boundaries for shapes to support constraint-based design and responsive layouts.
</div>

#### Example - specifying a minimum height for the shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        minHeight: 60
      });
      diagram.addShape(shape);
    </script>

### width `Number` *(default: 100)*

Defines the width of the shape when added to the diagram.


<div class="meta-api-description">
How to set the width of a shape in Kendo UI Diagram? Adjust, configure, or set the horizontal dimension, size, or width of a graphical shape, controlling how wide it appears on canvas or diagram layouts; this affects the visual rendering, interactive hit areas, bounding box boundaries, and spatial arrangement of shapes when added or created programmatically. Manage shape width to influence layout design, spacing, clickable regions, collision detection, or visual proportions, with flexibility to define or update size properties during initialization, dynamic creation, or runtime adjustments.
</div>

#### Example - specifying width for the shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        width: 200
      });
      diagram.addShape(shape);
    </script>

### height `Number` *(default: 100)*

Defines the height of the shape when added to the diagram.


<div class="meta-api-description">
How do I set the initial height of shapes in a Kendo UI diagram? Adjust, specify, or control the vertical dimension, length, or height of diagram shapes by setting numeric values to configure the shape’s size along the vertical axis, enabling customization of the initial height or vertical scale of graphical elements in a component or canvas, useful for resizing, scaling, or defining layout proportions and vertical measurements in visual diagrams or graphical interfaces.
</div>

#### Example - specifying height for the shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        height: 60
      });
      diagram.addShape(shape);
    </script>

### fill `String|Object`

Defines the fill options of the shape.


<div class="meta-api-description">
How to change the fill color of shapes in Kendo UI Diagram? Control and customize how shapes are visually filled by specifying colors, gradients, patterns, images, opacity levels, transparency, and other fill styles to set or change the appearance of graphical shapes. Enable solid color fills, complex gradient transitions, pattern overlays, image textures, and dynamic fill configurations bound to data or state, allowing developers to style rendered shapes with precise fill options for vibrant, transparent, or patterned visuals. Adjust fill properties during initialization or runtime to manage fill effects, modify brightness or transparency, and implement advanced shape filling techniques in user interfaces, graphics rendering, and data visualization contexts.
</div>

#### Example - customizing shape background

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: {
          color: "#0000ff",
          opacity: 0.5
        },
        width: 200
      });
      diagram.addShape(shape);
    </script>

### fill.color `String`

Defines the fill color of the shape.


<div class="meta-api-description">
How do I set the fill color of a shape in a Kendo UI diagram? Control or configure the interior fill color of a diagram shape using common color formats such as hex codes, RGB or RGBA values, named CSS colors, or CSS variables to match design specifications, data-driven styles, theme requirements, or dynamic color changes. Enable setting the shape’s background color during initialization or runtime, customize fill appearance for visualization, styling consistency, or highlighting specific elements, and adjust the interior color to suit user interface design, branding, or interactive diagram rendering needs.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Colored Shape"
            },
            fill: {
                color: "#ff6600"
            }
        }]
    });
    </script>

### fill.opacity `Number` *(default: 1)*

Defines the fill opacity of the shape.


<div class="meta-api-description">
How to set transparency for shape fill in Kendo UI Diagram? Adjusting fill transparency or opacity for shapes inside diagrams or graphical components enables control over how solid or translucent the shape's interior color appears, influencing layering and visibility of underlying elements. Users often seek ways to set, configure, or modify the transparency level, alpha channel, or fill visibility of shapes, polygons, or graphical objects during creation or runtime to achieve effects like see-through fills, blending, or highlighting. Common queries involve controlling how much background or content underneath the shape is revealed, enabling partial opacity, or tweaking shape fill transparency parameters in visual design, rendering, or diagramming contexts. This ranges from setting fill alpha values, transparency controls, or blending options for shape interiors to customizing fill fade or translucency embedded in shape properties for diagrams and vector graphics.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Semi-transparent Shape"
            },
            fill: {
                color: "red",
                opacity: 0.5
            }
        }]
    });
    </script>

### fill.gradient `Object`

Defines the gradient fill of the shape.


<div class="meta-api-description">
How to configure gradient fills for shapes in Kendo UI Diagram? Set or customize smooth color transitions and gradient fills for shapes within diagrams by defining gradient types such as linear or radial, adjusting color stops and their positions, controlling gradient direction or angle, and managing opacity levels to achieve precise visual effects. Enable configuring complex multi-color gradients with customizable stops, angles, transparency, and fill styles to enhance shape appearance or styling in graphical components, diagrams, and vector illustrations. Control gradient fills to create visually appealing backgrounds or overlays for shapes, specifying properties that determine how colors blend and transition seamlessly across the shape's area. Adjust gradients programmatically or via configuration to achieve exact color blending, opacity control, and directional effects in diagram shapes or graphical elements.
</div>

#### Example - Creating a shape with gradient background

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: {
          gradient: {
            type: "radial",
            center: [0.5, 0.5],
            radius: 0.9,
            stops: [
              {
                offset: 0,
                color: "lightblue",
                opacity: 0.5
              }, {
                offset: 0.5,
                color: "purple",
                opacity: 0.8
              }
            ]
          }
        }
      });
      diagram.addShape(shape);
    </script>

### fill.gradient.type `String` *(default: "linear")*
The type of the gradient. Supported values are:

* linear
* radial


<div class="meta-api-description">
How do I choose between linear and radial gradients in Kendo UI diagram shapes? Control and customize the fill gradient style of shapes by choosing between linear gradients that create directional color transitions or radial gradients that produce circular color fades, enabling configuration of shape appearance through gradient types, fill styling, color blending modes, gradient direction settings, and options to set smooth or sharp gradient transitions for visual effects in diagrams, graphics, or UI components.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Linear Gradient"
            },
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0],
                    end: [1, 1],
                    stops: [
                        { offset: 0, color: "red" },
                        { offset: 1, color: "blue" }
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
How to adjust the center position of a radial gradient fill in Kendo UI diagram? Adjusting the focal point or center position of a radial gradient fill inside a vector shape or diagram by setting coordinates that define where the gradient radiates from, typically using a normalized [x, y] pair relative to the shape’s bounding box where (0,0) represents the top-left corner and (1,1) the bottom-right corner; enables customization of gradient origin, controlling light source placement, shading direction, and visual emphasis within the shape background or fill area, useful for configuring gradient alignment, positioning highlights or shadows, and fine-tuning the gradient effect’s central point for precise styling in graphic design or UI elements.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Radial Gradient"
            },
            fill: {
                gradient: {
                    type: "radial",
                    center: [0.5, 0.5],
                    radius: 0.8,
                    stops: [
                        { offset: 0, color: "yellow" },
                        { offset: 1, color: "orange" }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.radius `Number` *(default: 1)*
The radius of the radial gradient relative to the shape bounding box.


<div class="meta-api-description">
How do I adjust the size of a radial gradient within a shape in Kendo UI diagram? Adjust the radial gradient size inside a shape by setting how far the gradient extends relative to the shape’s dimensions, enabling you to scale, configure, control, or customize the radius of the gradient fill within the bounding box of diagram shapes for precise styling, gradient scaling, fill size adjustment, or visual effects control.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Small Gradient Radius"
            },
            fill: {
                gradient: {
                    type: "radial",
                    center: [0.5, 0.5],
                    radius: 0.3,
                    stops: [
                        { offset: 0, color: "white" },
                        { offset: 1, color: "black" }
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
How to set the starting position of a linear gradient fill in a Kendo UI diagram shape? Set or adjust the initial position of a linear gradient fill within a shape by specifying the starting coordinates relative to the shape’s bounding area, enabling control over where the gradient begins from top-left to bottom-right using normalized [x, y] values; this is useful for configuring, positioning, or aligning gradient effects precisely inside shapes, controlling gradient origin points, or customizing fill transitions in vector graphics and UI design.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Linear Gradient Start"
            },
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0],
                    end: [1, 0],
                    stops: [
                        { offset: 0, color: "green" },
                        { offset: 1, color: "lime" }
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
How to set the endpoint of a linear gradient fill in a Kendo UI diagram shape? Control and configure the endpoint of a linear gradient fill for a shape by specifying coordinates that determine where the gradient stops within the shape’s boundary, using normalized x and y values ranging from top-left (0,0) to bottom-right (1,1). Adjust, set, or customize the gradient vector’s terminal position to create smooth color transitions, modify shading direction, or control gradient endpoint placement in diagrams, shapes, or vector graphics. Enable precise gradient endpoint positioning using relative coordinates to influence gradient flow, blend zones, or color stops, perfect for styling shapes with linear color gradients in visual components or diagrammatic elements.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Diagonal Gradient"
            },
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0],
                    end: [1, 1],
                    stops: [
                        { offset: 0, color: "purple" },
                        { offset: 1, color: "pink" }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.stops `Array`
The array of gradient color stops.


<div class="meta-api-description">
How do I customize color transitions in a Kendo UI diagram shape's fill using gradient stops? Define and customize smooth color transitions by specifying an ordered list of gradient color points within a shape’s fill, controlling the precise position and color blend along the gradient range; use these color stops to adjust the flow, spacing, and intensity of gradient shading for advanced visual effects, enabling control over multiple colors, offsets, and the overall transition progression in fills or backgrounds.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Multi-Stop Gradient"
            },
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0],
                    end: [1, 0],
                    stops: [
                        { offset: 0, color: "red" },
                        { offset: 0.3, color: "yellow" },
                        { offset: 0.7, color: "green" },
                        { offset: 1, color: "blue" }
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
How do I adjust the position of color stops in a gradient fill within Kendo UI for jQuery's diagram component? Control and customize the precise positioning of color stops within a gradient fill by setting numeric offset values between 0 and 1 to define the exact location along the gradient axis, enabling fine-tuned placement of colors for smooth transitions in shape fills, gradient editing, color stop adjustments, and visual styling within diagram or vector graphics components.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Custom Offsets"
            },
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0],
                    end: [1, 0],
                    stops: [
                        { offset: 0, color: "black" },
                        { offset: 0.2, color: "gray" },
                        { offset: 0.8, color: "lightgray" },
                        { offset: 1, color: "white" }
                    ]
                }
            }
        }]
    });
    </script>

### fill.gradient.stops.color `String`
The color in any of the following formats.

| Format         | Description
|:---            |:---
| red            | [Basic](https://www.w3.org/TR/css3-color/#html4) or [Extended](https://www.w3.org/TR/css3-color/#svg-color) CSS Color name
| #ff0000        | Hex RGB value
| rgb(255, 0, 0) | RGB value

Specifying 'none', 'transparent' or '' (empty string) will clear the fill.


<div class="meta-api-description">
How do I set the color of a gradient stop in Kendo UI for jQuery diagram? Set or configure the color of a gradient stop within a shape’s fill using standard CSS color formats such as color names, hex codes, or rgb() values; options include specifying solid colors, transparent, none, or empty values to clear or disable the gradient stop color, supporting use cases for customizing shape fills with gradients, adjusting color transitions in diagram components, controlling visual styles with fill gradients, applying color stops in shapes, and managing gradient color points with flexible color inputs.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Color Stop Example"
            },
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0],
                    end: [1, 0],
                    stops: [
                        { offset: 0, color: "#ff0000" },
                        { offset: 0.5, color: "rgb(0, 255, 0)" },
                        { offset: 1, color: "blue" }
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
How do I adjust the opacity of individual gradient stops in a Kendo UI diagram? Control the transparency level or alpha value of specific color points within a gradient fill for shapes, adjusting each gradient stop’s opacity from fully transparent to fully opaque using decimal or fractional values to fine-tune the visual blending and layering effects in diagrams or graphics, enabling precise manipulation of color intensity, fade effects, alpha channels, or translucency at individual gradient positions in vector shapes and fill patterns.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Opacity Gradient"
            },
            fill: {
                gradient: {
                    type: "linear",
                    start: [0, 0],
                    end: [1, 0],
                    stops: [
                        { offset: 0, color: "red", opacity: 1 },
                        { offset: 0.5, color: "red", opacity: 0.5 },
                        { offset: 1, color: "red", opacity: 0 }
                    ]
                }
            }
        }]
    });
    </script>

### hover `Object`

Defines the hover configuration.


<div class="meta-api-description">
How can I customize hover effects in a Kendo UI Diagram? Control and customize how diagram elements respond when the pointer hovers over them, including configuring visual highlights, color changes, cursor styles, overlays, animations, and interactive feedback on mouse enter or leave events. Enable or set hover effects such as shape highlighting, pointer interaction styles, dynamic templates, or graphical overlays that activate on pointer movement. Manage individual shape hover states and behaviors during initialization or runtime to enhance user engagement, visual cues, and interaction responses within diagrams or graphical interfaces. Adjust or define hover-triggered animations, style changes, or visual signals that inform users about pointer presence and enable intuitive pointer-driven interactivity.
</div>

#### Example - customizing the shape hovered look

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        hover: {
          fill: {
            color: "#c0f08c"
          }
        }
      });
      diagram.addShape(shape);
    </script>

### hover.fill `String|Object`

Defines the hover fill options of the shape.


<div class="meta-api-description">
How to set hover fill style for shapes in Kendo UI Diagram? Configure and customize the fill style that appears on a shape or geometric object when a pointer or cursor moves over it, including setting hover-state visual feedback using solid colors, transparency levels, gradients, patterns, or images. Enable dynamic fill effects for mouseover or pointer hover interactions, adjust opacity and color changes on hover, set interactive UI feedback visuals for shapes, and control how shapes respond visually to pointer events by defining their hover fill appearance for improved user experience and interface design.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Hover over me"
            },
            hover: {
                fill: {
                    color: "yellow",
                    opacity: 0.8
                }
            }
        }]
    });
    </script>

### hover.fill.color `String`

Defines the hover fill color of the shape.


<div class="meta-api-description">
How to change the fill color of a shape in Kendo UI Diagram when it's hovered over? Control or configure the fill color that appears when hovering over or focusing on a diagram shape, enabling visual feedback on mouseover or pointer focus states. Customize, set, or specify the hover fill color using common color formats such as CSS color strings to highlight shapes dynamically during interaction. Enable pointer hover effects, dynamic fill color changes on mouse events, or visual cues for user interaction by adjusting the shape’s hover fill appearance in diagrams. This setup supports changing or animating shape fill colors on hover to improve UI responsiveness and interactivity in graphical interfaces or diagramming components.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Hover changes color"
            },
            fill: {
                color: "blue"
            },
            hover: {
                fill: {
                    color: "red"
                }
            }
        }]
    });
    </script>

### hover.fill.opacity `Number` *(default: 1)*

Defines the hover fill opacity of the shape.


<div class="meta-api-description">
How do I set the opacity of a diagram shape's fill color on hover in Kendo UI for jQuery? Adjust or configure the transparency level, alpha, or opacity of a diagram or shape's fill color when the mouse pointer hovers over it, enabling visual hover effects, highlight transparencies, fade-in or fade-out overlays, interactive shape emphasis, setting numeric opacity values between zero and one, controlling hover fill visibility, modifying fill alpha during user hover interactions, customizing shape appearance on mouseover, and specifying how translucent or opaque the fill should appear to enhance user interface responsiveness.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Hover changes opacity"
            },
            fill: {
                color: "green",
                opacity: 1
            },
            hover: {
                fill: {
                    color: "green",
                    opacity: 0.3
                }
            }
        }]
    });
    </script>

### connectors `Array`

Defines the connectors the shape owns.


<div class="meta-api-description">
How to customize connection points on diagram shapes in Kendo UI for jQuery? Configure, set, or customize connection points on diagram shapes by specifying arrays of connector definitions including unique identifiers, spatial coordinates, and link-specific options to control how shapes attach, connect, or route relationships and links within diagrams and flowcharts. Enable precise control over where lines or connectors anchor to shapes, manage multiple connection spots, define connection behavior, modify connector locations, and adjust properties that influence how diagram elements link, interact, or connect dynamically during editing or automated layout processes. Whether adding, removing, repositioning, or defining connection constraints, this property supports detailed management of shape attachment points crucial for building, customizing, or manipulating complex network visualizations, data flows, or graphical relationship mappings.
</div>

#### Example - customizing the shape connectors

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        connectors: [
          {
            name: "top"
          },
          {
            name: "Upstream",
            position: function(shp) {
              return shp._transformPoint(shp.bounds().bottomRight());
            }
          }]
      });
      diagram.addShape(shape);
    </script>

### connectors.name `String`

The connector name. Predefined names include:

* "top" - top connector.
* "right" - right connector.
* "bottom" - bottom connector.
* "bottomRight" - bottom right connector.
* "left" - left connector.
* "auto" - auto connector.


<div class="meta-api-description">
How do I set up named connectors on Kendo UI for jQuery diagram shapes using a specific connector identifier? Configure and assign predefined connector identifiers on diagram shapes to reference, attach, or manage connection points programmatically, enabling precise linking, binding, or querying of connector positions by name. Use standard connector labels such as top, right, bottom, bottomRight, left, or auto to set, identify, or update anchor points for connections in diagrams, supporting tasks like connecting nodes, retrieving connector coordinates, establishing link anchors, or controlling connection attachments by specific connector location names. This facilitates setting and querying named connectors to manage shape connection logic, dynamic linking, and positioning within diagrammatic interfaces.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Shape with Named Connectors"
            },
            connectors: [
                { name: "top" },
                { name: "right" },
                { name: "bottom" },
                { name: "left" }
            ]
        }]
    });
    </script>

### connectors.position `Function`

The function that positions the connector.


<div class="meta-api-description">
How do I programmatically control the position of connector points on a Kendo UI diagram shape? Control and customize the placement and alignment of connector points on diagram shapes by defining functions or logic that specify precise anchor coordinates, dynamic offsets, or positioning rules during rendering; adjust, override, or set how connectors attach to shapes with programmatic control over connector geometry, enabling flexible, fine-tuned connection placement for shapes in diagrams with custom positioning strategies, alignment tweaks, and dynamic adjustments to connection points.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Custom Positioned Connectors"
            },
            connectors: [{
                position: function(shape) {
                    return new kendo.dataviz.diagram.Point(
                        shape.bounds().center().x,
                        shape.bounds().y
                    );
                }
            }]
        }]
    });
    </script>

### rotation `Object`

The shape rotation settings.


<div class="meta-api-description">
How do I adjust the rotation of a diagram shape in Kendo UI for jQuery? Adjust, set, or configure the orientation and angular rotation of a diagram shape by specifying rotation angle and pivot point or transform origin to control how the shape is visually rotated and rendered within a diagram or canvas environment. Enable precise control over the shape’s direction, tilt, or spin during initialization or dynamic rendering, allowing users to manipulate the shape’s rotational alignment, transform origin, and angle to achieve desired visual positioning and alignment within graphical interfaces, flowcharts, or vector-based diagrams.
</div>

#### Example - creating a rotated shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 40,
        y: 40,
        fill: "#c0f0fc",
        rotation: {
          angle: 45
        }
      });
      diagram.addShape(shape);
    </script>

### rotation.angle `Number` *(default: 0)*

The rotation angle.


<div class="meta-api-description">
How do I rotate shapes in Kendo UI diagram by specifying a numeric angle? Adjust or configure the orientation of a diagram shape by specifying the numeric rotation angle to rotate, spin, turn, or align the shape as needed; control the angular position or transform of shapes within diagrams, enabling precise rotation settings to change how shapes face or are displayed, including tilting or spinning shapes by degrees for layout, alignment, or visual arrangement purposes.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Rotated Shape"
            },
            rotation: {
                angle: 45
            }
        }]
    });
    </script>

### content `Object`

Defines the shapes content settings.


<div class="meta-api-description">
How to display custom content inside Kendo UI diagram shapes? Configure and control the internal content displayed within diagram shapes by setting text, HTML markup, templates, localized strings, or data-driven values to render dynamic labels, images, icons, or custom embedded elements inside shapes; enable customization of what appears inside graphical nodes by specifying static or data-bound content, supporting flexible templating, internationalization keys, and rich media integration for diagram rendering and initialization.
</div>

#### Example - customizing the shape content

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 40,
        y: 40,
        fill: "#c0f0fc",
        content: {
          align: "bottom center",
          text: "State 1",
          color: "#cc3388",
          fontFamily: "Segoe UI",
          fontWeight: "bold",
          fontSize: 18,
          fontStyle: "italic"
        }
      });
      diagram.addShape(shape);
    </script>

### content.align `String`

The alignment of the text inside the shape. You can do combinations between "top", "middle" and "bottom" for vertical align and "right", "center" and "left" for horizontal align. For example, "top right", "middle left", "bottom center", and so on.


<div class="meta-api-description">
How do I align text in Kendo UI diagram shapes using the align property? Control and configure text alignment inside shapes by setting vertical positioning options such as top, middle, or bottom combined with horizontal alignment choices like left, center, or right to precisely position content within diagram shapes. Enable or set how text anchors or aligns horizontally and vertically inside graphical elements, adjusting label placement for top right, middle left, bottom center, or any combined orientations to customize text layout inside shapes. This applies to adjusting, configuring, or aligning content text within shape boundaries in diagrams or graphical UI elements by specifying compound vertical and horizontal alignment keywords for precise control.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            width: 150,
            height: 100,
            content: {
                text: "Right Aligned Text",
                align: "middle right"
            }
        }]
    });
    </script>

### content.color `String`

The color of the shape content text.


<div class="meta-api-description">
How to change the color of text inside a diagram shape in Kendo UI for jQuery? Adjust or configure the text color inside a diagram shape by specifying CSS color values such as hex codes, RGB, RGBA, or named colors, enabling control over shape content appearance, styling, theming, or customization of text hues within graphical shapes for visual clarity, contrast, or branding consistency in diagramming interfaces.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Red Text",
                color: "red"
            }
        }]
    });
    </script>

### content.fontFamily `String`

The font family of the shape content text.


<div class="meta-api-description">
How do I set the font family for text in a Kendo UI diagram shape? Control and customize the font type, typeface, or font family used for text content within diagram shapes, enabling setting or specifying preferred fonts, including fallback options like Arial, Helvetica, or sans-serif, to adjust typography styling, font appearance, and ensure consistent text rendering inside shapes for diagrams, flowcharts, or graphical components in applications.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Arial Font",
                fontFamily: "Arial, sans-serif"
            }
        }]
    });
    </script>

### content.fontSize `Number`

The font size of the shape content text.


<div class="meta-api-description">
How do I adjust font size within a Kendo UI diagram shape? Adjust the text size within a shape or graphical container by setting font size parameters that influence how large or small the content text appears, impacting text layout, wrapping behavior, scaling properties, and visual emphasis inside shapes or UI components. Developers often seek ways to configure font dimensions for labels, captions, or textual elements embedded in shapes to improve readability, design consistency, and adaptive scaling across different screen sizes or dynamic content scenarios. Enabling customization of text scaling and appearance inside shapes helps control user interface presentation, manage overflow or wrapping of content text, and ensure the typography fits specific design requirements or responsive layouts.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Large Text",
                fontSize: 18
            }
        }]
    });
    </script>

### content.fontStyle `String`

The font style of the shape content text.


<div class="meta-api-description">
How do I set the font style for text within Kendo UI diagram shapes? Set or customize the font style of text within diagram shapes, enabling options like normal, italic, or oblique styles to control the appearance, emphasis, and rendering of textual content inside graphical components. Adjust, enable, or modify text styling to affect layout, font rendering, visual emphasis, and interaction behavior such as hit-testing, with support depending on available fonts and browser capabilities. Control how shape text is displayed, styled, and measured for precise visual design and user interface presentation in diagrams or graphical shapes.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Italic Text",
                fontStyle: "italic"
            }
        }]
    });
    </script>

### content.fontWeight `String`

The font weight of the shape content text.


<div class="meta-api-description">
How to set font weight for diagram labels in Kendo UI? Adjust, configure, or set the text thickness, boldness, or weight of content inside graphical shapes or diagram labels using numeric values like 400 or 700, or keyword options such as normal, bold, or bolder; control text emphasis, font heaviness, label prominence, and readability within shape components by modifying font weight properties to customize appearance, styling, and visual hierarchy in diagrams, charts, or UI elements.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Bold Text",
                fontWeight: "bold"
            }
        }]
    });
    </script>

### content.text `String`

The text displayed in the shape.


<div class="meta-api-description">
How to dynamically update shape labels in a Kendo UI diagram? Set, update, or control the text content displayed inside diagram shapes, including labels, captions, or dynamic values that change at runtime, enabling you to configure or modify visible shape text through initial settings, data bindings, or API calls for real-time text updates within graphical elements.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Hello World!"
            }
        }]
    });
    </script>

### selectable `Boolean` *(default: true)*

Specifies if the shape can be selected.


<div class="meta-api-description">
How do I disable selection for specific shapes in Kendo UI Diagram? Control whether a shape can be chosen, clicked, or highlighted by users or code by enabling or disabling selection functionality, configuring interactive selection behavior for shapes in diagrams, toggling the ability to select or ignore specific shapes during user clicks, drag selections, or programmatic commands, and managing inclusion or exclusion in selection sets for editing, moving, or applying actions based on selection state.
</div>

#### Example - disabling selection for shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 40,
        y: 40,
        fill: "#c0f0fc",
        selectable: false
      });
      diagram.addShape(shape);
    </script>

### visual `Function`

A function returning a visual element to render for this shape.


<div class="meta-api-description">
How to customize the visual appearance of shapes in a Kendo UI Diagram? Control and customize the rendering of a shape by providing a function that returns a custom visual element, enabling the creation of tailored DOM, SVG, or drawing objects to override default graphics, adjust appearance programmatically, define unique visuals, implement custom rendering logic, modify shapes dynamically, and set bespoke graphical representations for interactive or styled components.
</div>

#### Example - creating a custom shape visual

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;

      function shapeVisual(data) {
        var g = new kendo.dataviz.diagram.Group({
          autoSize: true
        });
        var r = new kendo.dataviz.diagram.Circle({
          width : 100,
          height: 60,
          fill: "LimeGreen"
        });
        g.append(r);
        var fn = new kendo.dataviz.diagram.TextBlock({
          text: "State 1",
          fontSize: 16,
          x: 25,
          y: 20
        });
        g.append(fn);

        return g;
      }

      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 40,
        y: 40,
        fill: "#c0f0fc",
        visual: shapeVisual
      });
      diagram.addShape(shape);
    </script>

### connectorDefaults `Object`

Defines default options for the shape connectors.


<div class="meta-api-description">
How to configure default connection settings for connectors in Kendo UI diagram? Configure and control default connection settings, styles, endpoints, routing, and interaction behaviors for connectors linked to shapes in diagrams, enabling centralized management of connector appearance, positioning, connection points, and behavioral properties like drag-and-drop or snapping, so developers can set global linking rules, endpoint styles, routing algorithms, connector colors, line types, interaction modes, and default anchor points consistently without repetitive per-connector adjustments.
</div>

#### Example - customizing the shape connectors default settings

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;

      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 40,
        y: 40,
        fill: "#c0f0fc",
        connectorDefaults: {
          width: 10,
          height: 10,
          fill: {
            color: "blue",
            opacity: 0.5
          },
          stroke: {
            width: 2,
            color: "lightgreen"
          },
          hover: {
            fill: {
              color: "yellow"
            },
            stroke: {
              color: "lightgreen"
            }
          }
        }
      });
      diagram.addShape(shape);
    </script>

### connectorDefaults.width `Number` *(default: 8)*

Defines the width of the shape connectors.


<div class="meta-api-description">
How do I adjust the default thickness of connectors in a Kendo UI diagram? Adjust the default thickness, line width, or stroke size of connectors and links between shapes to control how thick or thin connector lines appear in diagrams, graphs, or flowcharts. Configure, set, or customize connector stroke width to influence visual rendering, hit detection, spacing, and layout of connected shapes, enabling precise control over connector appearance and interaction in graphical interfaces or diagramming tools.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Wide Connectors"
            },
            connectorDefaults: {
                width: 15
            }
        }]
    });
    </script>

### connectorDefaults.height `Number` *(default: 8)*

Defines the height of the shape connectors.


<div class="meta-api-description">
How do I adjust the thickness of connector lines in a Kendo UI diagram? Adjust or configure the vertical dimension, height, size, or thickness of connector lines, handles, or ports between shapes in diagrams or flowcharts, controlling how tall or spaced connectors appear for linking nodes, enabling customization of connector visuals, spacing, layout alignment, and interactive link points across diagram elements.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Tall Connectors"
            },
            connectorDefaults: {
                height: 12
            }
        }]
    });
    </script>

### connectorDefaults.hover `Object`

Defines the hover configuration of the shape connectors.


<div class="meta-api-description">
How can I customize the hover effect on connectors in a Kendo UI diagram? Configure and customize the visual appearance and interactive behavior of diagram connectors when a mouse pointer hovers over them, adjusting styles such as stroke color, fill color, opacity, width, cursor type, and tooltip display to create dynamic, responsive hover effects on shape connectors within diagrams. Enable hover state control for connecting lines or paths, set visual feedback for mouseover interactions on links or edges, and define uniform hover styling and interactivity for all connectors to improve usability and clarity in diagram editing, visualization, or user interface scenarios.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Hover Connectors"
            },
            connectorDefaults: {
                hover: {
                    fill: {
                        color: "yellow"
                    },
                    stroke: {
                        color: "red",
                        width: 2
                    }
                }
            }
        }]
    });
    </script>

### connectorDefaults.hover.fill `String|Object`

Defines the hover fill options of the shape connectors.


<div class="meta-api-description">
How do I customize the fill color of connectors in a Kendo UI diagram when they're hovered over? Control and customize the visual appearance of connectors when hovered over with a pointer by setting the fill color, opacity, and highlight effects that define connector hover states in diagrams or flowcharts; configure interactive styling to enable dynamic, responsive feedback on connector elements during mouseover or pointer events, adjusting hover fill for improved visual emphasis, user interaction, and UI/UX clarity in graphical components that render shapes and connection lines, suitable for setting default highlight colors and transparency levels to enhance diagram readability and user guidance.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Connector Fill Hover"
            },
            connectorDefaults: {
                hover: {
                    fill: {
                        color: "orange",
                        opacity: 0.7
                    }
                }
            }
        }]
    });
    </script>

### connectorDefaults.hover.fill.color `String`

Defines the hover fill color of the shape connectors.


<div class="meta-api-description">
How to change hover color of connectors in Kendo UI diagram? Customize the fill color that appears when hovering over connectors in diagram shapes, enabling control over connector highlight effects, mouse-over styles, hover state coloring, interactive connector visual feedback, and dynamic color changes on pointer focus. Adjust or set the connector fill color triggered by hover events to enhance user interaction visibility, highlight connector paths, or apply custom hover color schemes for better diagram clarity and user experience in graphical interfaces.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Hover Fill Color"
            },
            connectorDefaults: {
                hover: {
                    fill: {
                        color: "cyan"
                    }
                }
            }
        }]
    });
    </script>

### connectorDefaults.hover.fill.opacity `Number` *(default: 1)*

Defines the hover fill opacity of the shape connectors.


<div class="meta-api-description">
How to set opacity of hovered connectors in Kendo UI diagram? Control the transparency level and fill opacity of diagram shape connectors when hovered over by the pointer, enabling customization of hover effects, visual feedback, highlight intensity, and connector appearance on mouseover or pointer interaction. Adjust or set connector hover fill transparency, fade, opacity values, or alpha to enhance UI responsiveness, clarity, and visual distinction for connected elements during hover states within diagrams or flowcharts.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Hover Fill Opacity"
            },
            connectorDefaults: {
                hover: {
                    fill: {
                        color: "purple",
                        opacity: 0.4
                    }
                }
            }
        }]
    });
    </script>

### connectorDefaults.hover.stroke `String|Object`

Defines the hover stroke options of the shape connectors.


<div class="meta-api-description">
How to change the appearance of connector lines in Kendo UI diagrams when hovered? Control and customize the appearance of connector lines when hovered in diagrams by setting the stroke color, thickness, dash pattern, and transparency for visual feedback on mouse hover or focus. Enable configuring hover styles for connectors including stroke color changes, line width adjustments, dash types like dashed or solid lines, and opacity levels to enhance interactive diagram elements and improve user interface clarity during pointer interactions. Adjust hover stroke styling to highlight connectors dynamically on mouseover events or touch hover states in graphical workflows and shape linking scenarios.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Hover Stroke"
            },
            connectorDefaults: {
                hover: {
                    stroke: {
                        color: "red",
                        width: 3,
                        dashType: "dash"
                    }
                }
            }
        }]
    });
    </script>

### connectorDefaults.hover.stroke.color `String` *(default: "Black")*

Defines the hover stroke color.


<div class="meta-api-description">
How do I change the color of connector outlines when hovering over connectors in a Kendo UI diagram? Set or customize the color of connector outlines or borders when hovering or mouseover on connectors in diagrams, flowcharts, or graphical links. Control, configure, or change the highlight, stroke, or border color applied to connectors during hover states for better visual feedback, using any valid CSS color format such as hex, RGB, or named colors. Enable or adjust hover effects on connectors to improve UI clarity by specifying the connector outline color that appears on mouse interaction or pointer focus within diagramming, graph rendering, or interactive flow components.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Hover Stroke Color"
            },
            connectorDefaults: {
                hover: {
                    stroke: {
                        color: "magenta"
                    }
                }
            }
        }]
    });
    </script>

### connectorDefaults.hover.stroke.dashType `String`

The hover stroke dash type.


<div class="meta-api-description">
How to customize dash pattern for connector lines when hovered in a Kendo UI diagram? Control and customize the dash pattern, stroke style, and outline appearance of connector lines when hovered or focused in diagrams or flowcharts, including setting dashed, dotted, or solid line styles that define how connector edges visually respond on mouse hover, pointer interaction, or UI highlight; configure and enable different stroke dash types to adjust connector hover feedback, emphasizing interaction states and enhancing visual cues by varying dash sequences, patterns, and line decorations during user interaction or dynamic UI updates.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Hover Dash Type"
            },
            connectorDefaults: {
                hover: {
                    stroke: {
                        color: "green",
                        dashType: "dot"
                    }
                }
            }
        }]
    });
    </script>

### connectorDefaults.hover.stroke.width `Number` *(default: 1)*

Defines the thickness or width of the shape connectors stroke on hover.


<div class="meta-api-description">
How do I adjust the stroke width of connectors in a Kendo UI diagram when hovering over them? Control and customize the thickness or stroke width of connectors in a diagram when a user hovers over them by setting numeric values to adjust the visual emphasis, highlight, or boldness of connector lines during hover states, enabling enhanced focus, clarity, or styling changes for connectors on mouse-over or pointer interaction in flowcharts, graphs, or shape link visualizations.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Hover Stroke Width"
            },
            connectorDefaults: {
                hover: {
                    stroke: {
                        color: "blue",
                        width: 4
                    }
                }
            }
        }]
    });
    </script>

### connectorDefaults.fill `String|Object`

Defines the fill options of the shape connectors.


<div class="meta-api-description">
How to set default fill color for connectors in Kendo UI diagram? Adjust and customize the default fill color, opacity, gradients, or patterns applied to connectors between shapes in diagrams, enabling control over connector visual styles by setting global fill properties that can be overridden on a per-connector or per-shape basis; configure, enable, or modify connector fills to define how lines or paths connecting diagram elements appear, including solid colors, transparent or semi-transparent fills, gradient effects, or patterned designs for consistent or specific connector presentation in graphical interfaces.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Connector Fill"
            },
            connectorDefaults: {
                fill: {
                    color: "lightblue",
                    opacity: 0.8
                }
            }
        }]
    });
    </script>

### connectorDefaults.fill.color `String`

Defines the fill color of the shape connectors.


<div class="meta-api-description">
How do I set the default fill color for connectors in a Kendo UI diagram? Set or configure the default fill color for connectors in diagrams, controlling the appearance and styling of connector elements by specifying color values like CSS strings, enabling consistent theme alignment, customizable connector backgrounds, and visual customization of connection lines or links between shapes to match design requirements or user preferences.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Connector Fill Color"
            },
            connectorDefaults: {
                fill: {
                    color: "gold"
                }
            }
        }]
    });
    </script>

### connectorDefaults.fill.opacity `Number` *(default: 1)*

Defines the fill opacity of the shape connectors.


<div class="meta-api-description">
How to set opacity for shape connectors' fill color in a Kendo UI diagram? Adjust or configure the transparency, opacity level, or alpha value for shape connectors’ fill color to control their visibility, emphasis, or styling in diagrams or graphical interfaces. Enable setting how see-through or solid the fill of connectors appears, modulating connector appearance for clarity, highlighting, subtlety, or background blending. Manage connector fill translucency to influence visual prominence, coverage, or layering effects within shape connections, allowing customization of connector aesthetics through transparency adjustments.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Connector Fill Opacity"
            },
            connectorDefaults: {
                fill: {
                    color: "red",
                    opacity: 0.6
                }
            }
        }]
    });
    </script>

### connectorDefaults.stroke `String|Object`

Defines the stroke options of the shape connectors.


<div class="meta-api-description">
How do I customize the appearance of connector lines in a Kendo UI diagram? Configure and customize connector line appearance by setting stroke attributes like color, thickness, dash or solid patterns, opacity, and style to control how connectors between shapes are rendered in diagrams or flowcharts. Enable consistent connector visuals, modify line styling, adjust connector border properties, and control connector outlines with options for stroke color, width, transparency levels, and dash styles during diagram setup or runtime. Ideal for tasks such as styling connector lines, defining line aesthetics, fine-tuning connector borders, or ensuring uniform connector line presentation across graphical shapes and nodes.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Connector Stroke"
            },
            connectorDefaults: {
                stroke: {
                    color: "navy",
                    width: 2,
                    dashType: "dashDot"
                }
            }
        }]
    });
    </script>

### connectorDefaults.stroke.color `String` *(default: "Black")*

Defines the stroke color.


<div class="meta-api-description">
How do I set the default color of shape connectors in a Kendo UI Diagram? Set or configure the default line color, stroke hue, or connector border color for shape connectors in diagram visuals, including options for hex, RGB, or named CSS colors to customize connector appearance, control connector line styling, define default stroke shades, enable setting connector outline colors, specify the initial connector stroke color for shapes, adjust or customize connector link colors, and manage connector line coloring for diagrams and graphic shapes.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Connector Stroke Color"
            },
            connectorDefaults: {
                stroke: {
                    color: "brown"
                }
            }
        }]
    });
    </script>

### connectorDefaults.stroke.dashType `String`

The stroke dash type.


<div class="meta-api-description">
How to customize dash styles for default connector outlines in Kendo UI diagram? Customize the connector line style by configuring stroke patterns such as solid, dashed, or dotted to define how connector outlines appear by default in diagrams, enabling control over line dash styles, stroke dash types, dash patterns, and connector border visuals when setting up or styling diagram connections and link appearances.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Connector Dash Type"
            },
            connectorDefaults: {
                stroke: {
                    color: "teal",
                    dashType: "longDash"
                }
            }
        }]
    });
    </script>

### connectorDefaults.stroke.width `Number` *(default: 1)*

Defines the thickness or width of the shape connectors stroke.


<div class="meta-api-description">
How do I set the default stroke width of connector lines in a Kendo UI Diagram? Adjusting the thickness, weight, or stroke size of connector lines between shapes in diagrams, controlling line width or boldness for connectors, setting or customizing the connector stroke thickness, configuring how thick or thin connection lines appear, modifying or tuning connector line weight for visual clarity or emphasis, enabling line thickness adjustments on connectors linking shapes, defining default or initial line width for diagram connectors, managing the width of connector edges for shapes, fine-tuning connector stroke size to emphasize or deemphasize connections, and setting connector border or outline thickness for improved diagram readability.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Connector Stroke Width"
            },
            connectorDefaults: {
                stroke: {
                    color: "maroon",
                    width: 3
                }
            }
        }]
    });
    </script>

## Fields

### connectors `Array`

The connectors defined on this shape.


<div class="meta-api-description">
How do I configure connection points on Kendo UI diagram shapes using the connectors property? Manage and control the attachment points or connection nodes on diagram shapes by accessing, configuring, adding, removing, or updating the set of connection points available on each shape object. This includes inspecting or iterating through the connectors to define where links, lines, or relationships anchor or connect to shapes within diagrams, enabling flexible customization of connection spots, anchor positions, and linking behavior for graphical objects in flowcharts, network diagrams, or visual models.
</div>

#### Example - accessing the shape connectors

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;
      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 20,
        y: 20,
        fill: "#c0f0fc",
        connectors: [
          {
            name: "top"
          },
          {
            name: "Upstream",
            position: function(shp) {
              return shp._transformPoint(shp.bounds().bottomRight());
            }
          }]
      });
      diagram.addShape(shape);

      var connectors = shape.connectors;
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Shape has " + connectors.length + " connectors.");
    </script>

### dataItem `Object`

The data item that this shape is bound to, if any.


<div class="meta-api-description">
How to access data for a specific diagram shape in Kendo UI? Accessing or modifying the underlying data model linked to a diagram shape, connecting the visual element to its original data source for synchronization, editing, custom rendering, hit-testing, or data binding purposes, enabling retrieval or updates of the associated data object to control how shape properties reflect dynamic information and interact with user interface events or state changes within diagramming or visualization frameworks.
</div>

#### Example - getting the Diaram shape data item

    <div id="diagram"></div>
    <script>
      var shapesDataSource = {
        data: [
          { id: 1, JobTitle: "Job 1", Color: "red" },
          { id: 2, JobTitle: "Job 2", Color: "blue" },
          { id: 3, JobTitle: "Job 3", Color: "green" }
        ]
      };

      var connectionsDataSource = {
        data: [
          { id: 1, from: 1, to: 2},
          { id: 2, from: 1, to: 3},
        ]
      };

      var diagram = $("#diagram").kendoDiagram({
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        layout: {
          type: "tree"
        },
        shapeDefaults: {
          content: {
            template: "#= dataItem.JobTitle #"
          }
        }
      }).getKendoDiagram();

	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(diagram.shapes[0].dataItem);
    </script>

### shapeVisual `Object`

The visual element representing the shape.

This is either the result returned from
[shape.visual](/api/javascript/dataviz/ui/diagram/configuration/shapedefaults.visual)
or a [predefined type](/api/javascript/dataviz/ui/diagram/configuration/shapes.type).


<div class="meta-api-description">
How do I customize the visual rendering of shapes in a Kendo UI diagram? Accessing and customizing the visual rendering of diagram shapes, retrieving or modifying the graphical element representing a shape, inspecting or replacing the shape’s visual component, controlling or manipulating the rendered appearance of shapes in diagrams, handling the visual representation object tied to shape elements, enabling dynamic updates or styling changes to shape graphics, configuring shape visuals programmatically, working with the shape’s rendered output or display object, managing the graphical layer of diagram shapes, and obtaining the visual node or element linked to shape rendering.
</div>

#### Example - accessing the shape visual element

    <div id="diagram"></div>
    <script>
      var shapesDataSource = {
        data: [
          { id: 1, JobTitle: "Job 1", Color: "red" },
          { id: 2, JobTitle: "Job 2", Color: "blue" },
          { id: 3, JobTitle: "Job 3", Color: "green" }
        ]
      };

      var connectionsDataSource = {
        data: [
          { id: 1, from: 1, to: 2},
          { id: 2, from: 1, to: 3},
        ]
      };

      var diagram = $("#diagram").kendoDiagram({
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        layout: {
          type: "tree"
        },
        shapeDefaults: {
          content: {
            template: "#= dataItem.JobTitle #"
          }
        }
      }).getKendoDiagram();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(diagram.shapes[0].shapeVisual);
    </script>

### visual `kendo.dataviz.diagram.Group`

A container for the [shapeVisual](/api/javascript/dataviz/diagram/shape#fields-shapeVisual) element.

Positioning and transformations are applied on this container.


<div class="meta-api-description">
How do I customize the visual appearance of shapes in a Kendo UI diagram? Control and customize the rendered shape visuals within diagram or graphical components by manipulating the DOM or SVG container element responsible for displaying shapes. Enable precise adjustments to positioning, translation, rotation, scaling, and transformation effects on shape visuals by accessing or modifying this container. Configure, update, or replace graphical elements dynamically to influence layout rendering, attach event handlers, apply custom styling or animations, and implement advanced rendering logic in interactive diagramming or vector graphic interfaces. This field works as the central reference point for customizing how shapes appear and behave within rendering frameworks, supporting a wide range of shape visualization, transformation, and event-handling scenarios.
</div>

#### Example - accessing the shape visual container

    <div id="diagram"></div>
    <script>
      var shapesDataSource = {
        data: [
          { id: 1, JobTitle: "Job 1", Color: "red" },
          { id: 2, JobTitle: "Job 2", Color: "blue" },
          { id: 3, JobTitle: "Job 3", Color: "green" }
        ]
      };

      var connectionsDataSource = {
        data: [
          { id: 1, from: 1, to: 2},
          { id: 2, from: 1, to: 3},
        ]
      };

      var diagram = $("#diagram").kendoDiagram({
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        layout: {
          type: "tree"
        },
        shapeDefaults: {
          content: {
            template: "#= dataItem.JobTitle #"
          }
        }
      }).getKendoDiagram();

      diagram.shapes[0].visual.children[1].drawingElement.fill("yellow");
    </script>

## Methods

### position

Get or set method returning the current global position or sets the position specified.


<div class="meta-api-description">
How do I set the position of an element in a Kendo UI Diagram? Retrieve or set the global coordinates of a graphical object to read its current location or precisely move, position, place, or update its absolute placement on the canvas or interface by providing coordinates or position data; control shape movement, adjust x and y values, query current spatial placement, or define new global positioning for transformation and layout purposes.
</div>

#### Parameters

##### point `kendo.dataviz.diagram.Point`

Either the location to set or if no parameter given returns the current location.

#### Example - changing the shape position

    <div id="diagram"></div>
    <script>
      var shapesDataSource = {
        data: [
          { id: 1, JobTitle: "Job 1", Color: "red" },
          { id: 2, JobTitle: "Job 2", Color: "blue" },
          { id: 3, JobTitle: "Job 3", Color: "green" }
        ]
      };

      var connectionsDataSource = {
        data: [
          { id: 1, from: 1, to: 2},
          { id: 2, from: 1, to: 3},
        ]
      };

      var diagram = $("#diagram").kendoDiagram({
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        layout: {
          type: "tree"
        },
        shapeDefaults: {
          content: {
            template: "#= dataItem.JobTitle #"
          }
        }
      }).getKendoDiagram();

      diagram.shapes[0].position(new kendo.dataviz.diagram.Point(20, 20));
    </script>

### clone

Returns a clone (with a different id) of the shape.


<div class="meta-api-description">
How do I duplicate a diagram shape in Kendo UI for jQuery using its clone method? Duplicate or replicate a diagram shape by generating an independent copy with a unique identifier to preserve the original’s identity; enable copying nodes or shapes for editing, styling, moving, or creating templates and layouts; configure cloning to programmatically produce modified shape instances that can be freely manipulated without affecting the source element, supporting scenarios involving shape duplication, deep copying, and shape-based template generation.
</div>

#### Returns

`kendo.dataviz.diagram.Shape` A clone of the current shape.

#### Example - cloning a shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;

      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 40,
        y: 40,
        fill: "#c0f0fc",
        connectorDefaults: {
          width: 10,
          height: 10,
          fill: {
            color: "blue",
            opacity: 0.5
          },
          stroke: {
            width: 2,
            color: "lightgreen"
          },
          hover: {
            fill: {
              color: "yellow"
            },
            stroke: {
              color: "lightgreen"
            }
          }
        }
      });
      var shape2 = shape.clone();
      diagram.addShape(shape);
      diagram.addShape(shape2);
      shape2.position(new kendo.dataviz.diagram.Point(150, 150));
    </script>

### connections

Returns the connections attached to the shape. You can optionally specify to return only the incoming or outgoing connections.


<div class="meta-api-description">
How do I retrieve all incoming connections to a shape in a Kendo UI diagram? Access, retrieve, or list the links, edges, or relationships attached to a diagram shape, enabling filtering by connection direction such as incoming or outgoing edges, inspecting connected nodes, enumerating linked elements, traversing relationship paths, or managing and updating groups of connections related to a specific diagram component.
</div>

#### Parameters

##### type `String`

If not parameter specified all connections are returned, if "in" then only the incoming (i.e. towards the shape) are returned, if "out" the only the outgoing (i.e. away from the shape) are returned.

#### Example - accessing the connections originating from a given shape

    <div id="diagram"></div>
    <script>
      var shapesDataSource = {
        data: [
          { id: 1, JobTitle: "Job 1", Color: "red" },
          { id: 2, JobTitle: "Job 2", Color: "blue" },
          { id: 3, JobTitle: "Job 3", Color: "green" }
        ]
      };

      var connectionsDataSource = {
        data: [
          { id: 1, from: 1, to: 2},
          { id: 2, from: 1, to: 3},
        ]
      };

      var diagram = $("#diagram").kendoDiagram({
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        layout: {
          type: "tree"
        },
        shapeDefaults: {
          content: {
            template: "#= dataItem.JobTitle #"
          }
        }
      }).getKendoDiagram();

      var outConnections = diagram.shapes[0].connections("out");
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(outConnections);
    </script>

### getConnector

Fetches a (default or custom) Connector defined on the Shape by its name.


<div class="meta-api-description">
How to access a connector in Kendo UI diagram by its name? Access, retrieve, or fetch a connector by its name or identifier from a graphical shape or diagram element, enabling developers to obtain default or custom connectors associated with shapes for inspection, configuration, or modification. This method supports scenarios like reading connector coordinates, controlling connection points, adjusting connector properties, and managing connection routing or bindings programmatically within diagram or flowchart environments. Use cases include querying connectors to update link anchors, setting connector attributes dynamically, enabling precise connection handling between nodes, or integrating connection logic in visualization tools and diagram editors.
</div>

#### Parameters

##### name `String`

The name of the connector to get from the shape.

#### Example - getting the shape top connector

    <div id="diagram"></div>
    <script>
      var shapesDataSource = {
        data: [
          { id: 1, JobTitle: "Job 1", Color: "red" },
          { id: 2, JobTitle: "Job 2", Color: "blue" },
          { id: 3, JobTitle: "Job 3", Color: "green" }
        ]
      };

      var connectionsDataSource = {
        data: [
          { id: 1, from: 1, to: 2},
          { id: 2, from: 1, to: 3},
        ]
      };

      var diagram = $("#diagram").kendoDiagram({
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        layout: {
          type: "tree"
        },
        shapeDefaults: {
          content: {
            template: "#= dataItem.JobTitle #"
          }
        }
      }).getKendoDiagram();

      var connectorTop = diagram.shapes[0].getConnector("top");
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(connectorTop);
    </script>

### getPosition

Returns the middle positions of the sides of the bounds or the center of the shape's bounds. This method is useful when defining custom connectors where a position function relative to the shape's coordinate system is required.


<div class="meta-api-description">
How to calculate connector placement positions for shapes in Kendo UI diagram? Retrieve coordinates for connector placement by obtaining the central positions along the edges or the exact center of a shape's bounding box to calculate anchor points, midpoints, or connection positions; useful for configuring connector routing, defining custom anchor locations, accessing shape side centers, or setting precise connector origins within the shape’s coordinate system for flexible layout and diagram connections.
</div>

#### Parameters

##### side `String`

One of the four sides of a bound; "left", "right", "top", "bottom". If none specified the center of the shape's bounds will be returned.

#### Example - getting the position of the top side of the shape

    <div id="diagram"></div>
    <script>
      var shapesDataSource = {
        data: [
          { id: 1, JobTitle: "Job 1", Color: "red" },
          { id: 2, JobTitle: "Job 2", Color: "blue" },
          { id: 3, JobTitle: "Job 3", Color: "green" }
        ]
      };

      var connectionsDataSource = {
        data: [
          { id: 1, from: 1, to: 2},
          { id: 2, from: 1, to: 3},
        ]
      };

      var diagram = $("#diagram").kendoDiagram({
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        layout: {
          type: "tree"
        },
        shapeDefaults: {
          content: {
            template: "#= dataItem.JobTitle #"
          }
        }
      }).getKendoDiagram();

      var position = diagram.shapes[0].getPosition("top");
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(position);
    </script>

### redraw

Renders the shape with the given options. It redefines the options and redraws the shape accordingly.


<div class="meta-api-description">
How do I update a visual shape in a Kendo UI diagram after changing its settings? Update or refresh a visual shape inside a diagram, reconfiguring its appearance by applying new settings, options, or parameters dynamically, enabling immediate re-rendering or repainting to reflect changes such as style adjustments, layout modifications, or property updates without recreating the shape from scratch, supporting actions like force redraw, shape modification, live update, and real-time shape refresh within graphical or diagramming interfaces.
</div>

#### Parameters

##### options `Object`
The object containing a subset of options to change. Follows the same structure as the [configuration](#configuration).

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "1",
            content: {
                text: "Original Shape"
            },
            fill: {
                color: "blue"
            }
        }],
        dataBound: function(e) {
          setTimeout(function () {
                 var shape = e.sender.shapes[0];
                 // Redraw shape with new options
                 shape.redraw({
                     fill: {
                         color: "red"
                     },
                     content: {
                         text: "Redrawn Shape"
                     }
                 });
          }, 2000);
        }
    });
    </script>

##### Example - Redraw shape with new options

    <div id="diagram"></div>
    <script>
        $("#diagram").kendoDiagram({
          dataSource: {
              data: [{ "items": [{ items: [{}] }] }],
              schema: { model: { children: "items" } }
          },
          layout: {
              type: "tree"
          },
          dataBound: function(e) {
              e.sender.shapes[0].redraw({
                  fill: {
                      color: "green"
                  }
              });
          }
        });
    </script>

### redrawVisual

Redraws the shape visual element and its content


<div class="meta-api-description">
How do I force Kendo UI diagram shapes to update after modifying their geometry? Refresh or force update of a shape’s displayed rendering in diagrams or graphical interfaces after modifications to geometry, styling, layout, or nested elements, including triggering immediate re-renders, repainting visuals, updating visual DOM content, redrawing graphics, and ensuring the latest appearance reflects changes without delay in rendered shapes or diagram components.
</div>

#### Example - redrawing the shape visual element

    <div id="diagram"></div>
    <script>
      var shapesDataSource = {
        data: [
          { id: 1, JobTitle: "Job 1", Color: "red" },
          { id: 2, JobTitle: "Job 2", Color: "blue" },
          { id: 3, JobTitle: "Job 3", Color: "green" }
        ]
      };

      var connectionsDataSource = {
        data: [
          { id: 1, from: 1, to: 2},
          { id: 2, from: 1, to: 3},
        ]
      };

      var diagram = $("#diagram").kendoDiagram({
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        layout: {
          type: "tree"
        },
        shapeDefaults: {
          content: {
            template: "#= dataItem.JobTitle #"
          }
        }
      }).getKendoDiagram();

      diagram.shapes[0].options.content.template = "Root";
      diagram.shapes[0].redrawVisual();
    </script>

### select

Selects or deselects the shape.


<div class="meta-api-description">
How can I programmatically select or deselect a shape in my Kendo UI diagram? Control toggling, enabling, disabling, or updating a shape’s selection state within a diagram or graphical interface by programmatically including or excluding the shape from the current selection set, managing which shapes are actively selected or deselected, dynamically adjusting selection status, modifying selection membership, and interacting with the collection of selected shapes through direct calls to change selection behavior on individual shape elements.
</div>

#### Parameters

##### value `Boolean`

Use 'true' to select the shape or 'false' to deselect it.

#### Example - selecting the shape

    <div id="diagram"></div>
    <script>
      var Shape = kendo.dataviz.diagram.Shape;

      $("#diagram").kendoDiagram();
      var diagram = $("#diagram").data("kendoDiagram");

      var shape = new Shape({
        id: 1,
        x: 40,
        y: 40,
        fill: "#c0f0fc",
        connectorDefaults: {
          width: 10,
          height: 10,
          fill: {
            color: "blue",
            opacity: 0.5
          },
          stroke: {
            width: 2,
            color: "lightgreen"
          },
          hover: {
            fill: {
              color: "yellow"
            },
            stroke: {
              color: "lightgreen"
            }
          }
        }
      });
      diagram.addShape(shape);

      shape.select(true);
    </script>

### visible

Gets or sets the shape visible state.


<div class="meta-api-description">
How to toggle visibility of a diagram shape in Kendo UI? Control or query whether a diagram shape is displayed or hidden by checking or setting its visibility state with true or false values, enabling you to determine if an element is shown, toggle visibility on or off, manage shape rendering dynamically, and retrieve the current visibility status for conditional logic, UI updates, or interaction handling in diagrams and graphical components.
</div>

#### Parameters

##### visible `Boolean` *optional*
Indicates whether the shape should be visible in the Diagram. If skipped, the method will return the current visible state of the shape.

#### Example

    <button id="hideBtn">Hide Shape 2</button>
    <div id="diagram"></div>
    <script>
      $("#hideBtn").on("click", function(e){
        var diagram = $("#diagram").getKendoDiagram();
        var shape = diagram.shapes[1];
        shape.visible(false);
      });
      $("#diagram").kendoDiagram({
        shapes:[
          {
            id:"1",
            content:{
              text: "State 1"
            },
            x: 20,
            y: 20
          },
          {
            id:"2",
            content: {
              text: "State 2"
            },
            x: 160,
            y: 20
          }
        ],
        connections:[
          {
            from: "1",
            to: "2"
          }
        ]
      });
    </script>
