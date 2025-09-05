---
title: Rect
res_type: api
---

# kendo.dataviz.diagram.Rect
Describes the width, height, and location of a rectangle.

## Configuration

### height `Number`
Sets the height of the rectangle.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "rect1",
            type: "rectangle",
            x: 50,
            y: 50,
            height: 100,
            width: 150
        }]
    });
    
    var diagram = $("#diagram").getKendoDiagram();
    var shape = diagram.getShapeById("rect1");
    var rect = new kendo.dataviz.diagram.Rect(50, 50, 150, 100);
    console.log("Rectangle height:", rect.height);
    </script>

### width `Number`
Sets the width of the rectangle.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "rect1",
            type: "rectangle",
            x: 50,
            y: 50,
            height: 100,
            width: 150
        }]
    });
    
    var diagram = $("#diagram").getKendoDiagram();
    var shape = diagram.getShapeById("rect1");
    var rect = new kendo.dataviz.diagram.Rect(50, 50, 150, 100);
    console.log("Rectangle width:", rect.width);
    </script>

### x `Number`
The x-coordinate of the top-left corner of the rectangle.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "rect1",
            type: "rectangle",
            x: 75,
            y: 50,
            height: 100,
            width: 150
        }]
    });
    
    var diagram = $("#diagram").getKendoDiagram();
    var shape = diagram.getShapeById("rect1");
    var rect = new kendo.dataviz.diagram.Rect(75, 50, 150, 100);
    console.log("Rectangle x-coordinate:", rect.x);
    </script>

### y `Number`
The y-coordinate of the top-left corner of the rectangle.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "rect1",
            type: "rectangle",
            x: 50,
            y: 75,
            height: 100,
            width: 150
        }]
    });
    
    var diagram = $("#diagram").getKendoDiagram();
    var shape = diagram.getShapeById("rect1");
    var rect = new kendo.dataviz.diagram.Rect(50, 75, 150, 100);
    console.log("Rectangle y-coordinate:", rect.y);
    </script>

## Methods

### position
Get or sets the element position.

#### Parameters

##### offset `kendo.dataviz.diagram.Point`
The origin of the element.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "rect1",
            type: "rectangle",
            x: 50,
            y: 50,
            height: 100,
            width: 150
        }]
    });
    
    var diagram = $("#diagram").getKendoDiagram();
    var shape = diagram.getShapeById("rect1");
    var rect = diagram.shapes[0];
    
    // Get current position
    var currentPosition = rect.position();
    console.log("Current position:", currentPosition);
    
    // Set new position
    var newPoint = new kendo.dataviz.diagram.Point(100, 100);
    rect.position(newPoint);
    console.log("New position set to:", rect.position());
    </script>


### rotate
Rotates the element with the specified parameters.

#### Parameters

##### angle `Number`
The angle of rotation in decimal degrees.
Measured in clockwise direction with 0 pointing "right".
Negative values or values greater than 360 will be normalized.

##### center `kendo.dataviz.diagram.Point`
The center of rotation.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "rect1",
            type: "rectangle",
            x: 50,
            y: 50,
            height: 100,
            width: 150
        }]
    });
    
    var diagram = $("#diagram").getKendoDiagram();
    var shape = diagram.getShapeById("rect1");
    var rect = diagram.shapes[0];
    
    // Create rotation center point
    var center = new kendo.dataviz.diagram.Point(125, 100);
    
    // Rotate the rectangle 45 degrees clockwise
    rect.rotate(45, center);
    console.log("Rectangle rotated 45 degrees around center point");
    
    // Rotate with negative angle (counter-clockwise)
    rect.rotate(-30, center);
    console.log("Rectangle rotated -30 degrees around center point");
    </script>


### visible
Gets or sets the visibility of the current element.

#### Parameters

##### visible `Boolean`
The new visibility state.

#### Returns
`Boolean` True if the element is visible, false otherwise.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "rect1",
            type: "rectangle",
            x: 50,
            y: 50,
            height: 100,
            width: 150
        }]
    });
    
    var diagram = $("#diagram").getKendoDiagram();
    var shape = diagram.getShapeById("rect1");
    var rect = diagram.shapes[0];
    
    // Get current visibility state
    var isVisible = rect.visible();
    console.log("Current visibility:", isVisible);
    
    // Hide the rectangle
    rect.visible(false);
    console.log("Rectangle hidden");
    
    // Show the rectangle again
    rect.visible(true);
    console.log("Rectangle visible again");
    </script>
