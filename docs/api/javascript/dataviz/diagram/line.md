---
title: Line
res_type: api
---

# kendo.dataviz.diagram.Line

This represents a single, straight line.

## Configuration

### stroke `Object`

Defines the stroke configuration.


<div class="meta-api-description">
How do I customize the appearance of lines in Kendo UI Diagram? Configure the visual styling of connectors and lines by setting attributes like color, thickness, dash patterns, opacity, and stroke details to control how lines appear and render in diagrams or graphical components, enabling customization of line appearance, line weight, dashed or solid styles, transparency levels, and other decorative stroke features commonly used for enhancing connectors and diagram links.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            x: 100,
            y: 100,
            width: 100,
            height: 50
        }],
        connections: [{
            from: { x: 200, y: 125 },
            to: { x: 300, y: 125 },
            stroke: {
                color: "#ff6358",
                width: 3
            }
        }]
    });
    </script>

### stroke.color `String`

Defines the line color.


<div class="meta-api-description">
How do I change the color of lines in a Kendo UI diagram? Adjust, define, or customize the color of lines, connectors, or borders within diagrams and shapes using CSS color formats such as hex codes, rgb(), rgba(), or named colors to control visual styling, appearance, or theming of stroke outlines for diagram elements during setup or dynamically.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            x: 100,
            y: 100,
            width: 100,
            height: 50
        }],
        connections: [{
            from: { x: 200, y: 125 },
            to: { x: 300, y: 125 },
            stroke: {
                color: "#ff6358"
            }
        }]
    });
    </script>

### stroke.width `Number`

Defines the line width.


<div class="meta-api-description">
How do I set the thickness of lines in a Kendo UI diagram? Adjust the thickness, weight, or width of lines, strokes, or borders in diagrams, flowcharts, or graphical connections to configure how bold, thin, or visually prominent outlines, link paths, or shapes appear, controlling line rendering styles for emphasis, clarity, or aesthetic effects in visual elements.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            x: 100,
            y: 100,
            width: 100,
            height: 50
        }],
        connections: [{
            from: { x: 200, y: 125 },
            to: { x: 300, y: 125 },
            stroke: {
                width: 5
            }
        }]
    });
    </script>

### from `Object`

The first point of the line.


<div class="meta-api-description">
How do I set the starting point of a line in Kendo UI Diagram? Set or configure the starting point, initial coordinates, or anchor position of a line in a diagram, including specifying the first endpoint's x and y values, linking the line's origin to a shape's connector, controlling where a line begins when rendering or drawing diagrams, defining the initial attachment or reference point for connections, and establishing the line’s source position for flowcharts, graphs, or visual layouts.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        connections: [{
            from: { x: 100, y: 150 },
            to: { x: 300, y: 150 }
        }]
    });
    </script>

#### x `Number`

The X position of first point.

#### y `Number`

The Y position of first point.

### to `Object`

The second point of the line.


<div class="meta-api-description">
How to set the endpoint of a line segment in Kendo UI Diagram? Control, set, or retrieve the endpoint of a line segment within a diagram or graphical component by specifying the target position, coordinate, or element where the line connects. Configure the line’s destination point to determine its direction, length, and final placement, enabling precise connection between nodes, shapes, or diagram elements. Adjust, define, or link the line’s terminating coordinate or anchor to customize how lines connect or point to specific properties, objects, or diagram parts, supporting dynamic positioning and directional control in visual layouts.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        connections: [{
            from: { x: 100, y: 150 },
            to: { x: 300, y: 200 }
        }]
    });
    </script>

#### x `Number`

The X position of second point.

#### y `Number`

The Y position of second point.

## Fields

### drawingElement `kendo.drawing.Path`

The drawing element used to draw the line.


<div class="meta-api-description">
How do I customize the line rendering in Kendo UI Diagram using the drawingElement property? Retrieve or configure the graphical object responsible for rendering a line in diagrams, enabling customization of appearance through styling, geometry updates, dimension measurements, interaction handling, and event attachments on the visual element that visually represents or draws the line within diagram components.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        connections: [{
            from: { x: 100, y: 150 },
            to: { x: 300, y: 150 }
        }]
    });
    
    var diagram = $("#diagram").getKendoDiagram();
    var connection = diagram.connections[0];
    console.log("Drawing element:", connection.drawingElement);
    </script>

## Methods

### position
Sets the element position.


<div class="meta-api-description">
How to adjust the position of a line in Kendo UI diagram after initialization? Control or adjust the placement of a line within a diagram by setting its coordinates, repositioning or moving it dynamically after initialization, enabling precise alignment, layout updates, or visual repositioning programmatically. Enable developers to shift, relocate, or place line elements at specific positions within graphical layouts, supporting dynamic changes, coordinate settings, and visual flow control for diagrams or flowcharts. This method supports manipulation of a line’s rendered location, facilitating movement, adjustment, or realignment in response to interaction, data updates, or layout recalculations.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        connections: [{
            from: { x: 100, y: 150 },
            to: { x: 300, y: 150 }
        }]
    });
    
    var diagram = $("#diagram").getKendoDiagram();
    var connection = diagram.connections[0];
    
    // Set new position
    connection.position({ x: 50, y: 100 });
    </script>

#### Parameters

##### offset `kendo.dataviz.diagram.Point`
The origin of the element.

### visible
Gets or sets the visibility of the current element.


<div class="meta-api-description">
How do I show or hide lines in a Kendo UI diagram? Control, check, or modify the visibility and display state of diagram lines by toggling or setting whether a line is shown or hidden within a diagram, affecting its rendering, layout inclusion, selection, hit-testing responsiveness, and export presence; retrieve the current visibility status or update it dynamically to manage line appearance and interaction in diagrams, flowcharts, or graphical layouts.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        connections: [{
            from: { x: 100, y: 150 },
            to: { x: 300, y: 150 }
        }]
    });
    
    var diagram = $("#diagram").getKendoDiagram();
    var connection = diagram.connections[0];
    
    // Get current visibility
    var isVisible = connection.visible();
    console.log("Is visible:", isVisible);
    
    // Hide the connection
    connection.visible(false);
    
    // Show the connection again
    setTimeout(function() {
        connection.visible(true);
    }, 2000);
    </script>

#### Parameters

##### visible `Boolean`
The new visibility state.

#### Returns
`Boolean` True if the element is visible, false otherwise.
