---
title: Line
res_type: api
---

# kendo.dataviz.diagram.Line

This represents a single, straight line.

## Configuration

### stroke `Object`

Defines the stroke configuration.

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
