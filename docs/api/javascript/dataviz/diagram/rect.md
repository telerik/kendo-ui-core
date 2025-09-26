---
title: Rect
res_type: api
---

# kendo.dataviz.diagram.Rect
Describes the width, height, and location of a rectangle.

## Configuration

### height `Number`
Sets the height of the rectangle.


<div class="meta-api-description">
Set or adjust the vertical size, height, or top-to-bottom dimension of a rectangle shape within a diagram or graphical layout, specifying or controlling how tall the shape appears, affects rendering scale, positioning, alignment, and layout measurements. Use this property to define or modify the shape’s vertical extent, bounding box height, or height attribute when initializing or updating graphical elements, controlling layout spacing and visual proportions in diagrams or interfaces.
</div>

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


<div class="meta-api-description">
Adjust, set, or configure the horizontal size, width, or breadth of a rectangle shape within a diagram or graphical layout to control shape dimensions, spacing, alignment, and rendering size. Manage the rectangle’s horizontal measurement to influence positioning, resizing, layout consistency, visual scaling, or component initialization, enabling precise shape sizing for design, interface arrangement, or graphical display purposes.
</div>

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


<div class="meta-api-description">
Control or adjust the horizontal position of a rectangle within a diagram by setting or retrieving its x-coordinate, which defines the left edge's placement on the canvas. This numeric value enables precise placement, movement, alignment, or animation of shapes along the horizontal axis, allowing developers to configure initial positions or dynamically update the rectangle’s left boundary during runtime for layout adjustments, drag-and-drop functionality, or coordinate-based positioning within graphical diagrams and UI elements.
</div>

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


<div class="meta-api-description">
Set or adjust the vertical position of a rectangle within a diagram by controlling its y-coordinate or top edge placement, enabling precise vertical alignment, movement, or animation of shapes along the diagram's vertical axis using numeric values. Whether you need to move, position, offset, shift, or arrange rectangles up and down inside the diagram's coordinate framework, this setting governs vertical placement and enables dynamic control over rectangle height positioning, vertical layout adjustments, or coordinate-based vertical transformations.
</div>

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


<div class="meta-api-description">
Retrieve or update the location and size of a rectangular shape within a diagram by accessing or modifying its bounding box coordinates, including x and y positions as well as width and height dimensions. Enable repositioning or resizing of diagram elements by setting new coordinates or dimensions, or obtain the current placement and scale of these rectangular components to adjust layouts, handle drag-and-drop movements, dynamically control shapes’ properties, or synchronize visual elements. This method supports reading the current bounds or programmatically moving and scaling rectangles within diagram interfaces, supporting flexible spatial manipulation and precise control of shape sizes and positions.
</div>

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


<div class="meta-api-description">
Rotate or adjust the angle, orientation, or rotation transform of a rectangular diagram element dynamically or programmatically; set, apply, or update the element’s rotation state at runtime for design alignment, user interaction adjustments, layout modifications, or visual transformation of shapes; control the geometric rotation to modify the diagram's rectangle appearance instantly based on specified degrees, radians, or rotation parameters to change element direction or angle within a graphical interface.
</div>

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


<div class="meta-api-description">
Control, check, or modify whether a rectangular shape in a diagram is displayed or hidden by setting or retrieving its visibility status; this functionality lets developers programmatically toggle the display of rectangles, query their current visible state, enable or disable rendering of specific diagram elements, manage shape appearance dynamically, and conditionally show or hide shapes using boolean toggles or visibility flags.
</div>

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
