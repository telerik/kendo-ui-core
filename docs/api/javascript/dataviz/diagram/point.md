---
title: Point
res_type: api
---

# kendo.dataviz.diagram.Point

Represents a point in two-dimensional space.

## Constructor Parameters

### x `Number`

The x coordinate of the point.

#### Example

    <div id="diagram"></div>
    <script>
    // Create a point with x coordinate of 100
    var point = new kendo.dataviz.diagram.Point(100, 50);
    console.log("X coordinate:", point.x); // Output: 100
    
    // Use the point in a diagram
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "shape1",
            x: point.x,
            y: point.y,
            width: 100,
            height: 50,
            type: "rectangle"
        }]
    });
    </script>

### y `Number`

The y coordinate of the point.

#### Example

    <div id="diagram"></div>
    <script>
    // Create a point with y coordinate of 200
    var point = new kendo.dataviz.diagram.Point(75, 200);
    console.log("Y coordinate:", point.y); // Output: 200
    
    // Use the point to position a shape vertically
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "shape1",
            x: point.x,
            y: point.y, // Positioned at y=200
            width: 80,
            height: 40,
            type: "circle"
        }]
    });
    </script>

## Fields

### x `Number`

The x coordinate of the point.

#### Example

    <div id="diagram"></div>
    <script>
    // Access and modify the x coordinate of a point
    var point = new kendo.dataviz.diagram.Point(150, 100);
    console.log("Initial x:", point.x); // Output: 150
    
    // Modify the x coordinate
    point.x = 250;
    console.log("Modified x:", point.x); // Output: 250
    
    // Use the modified point in a diagram
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "shape1",
            x: point.x,
            y: point.y,
            width: 60,
            height: 60,
            type: "rectangle"
        }]
    });
    </script>

### y `Number`

The y coordinate of the point.

#### Example

    <div id="diagram"></div>
    <script>
    // Access and modify the y coordinate of a point
    var point = new kendo.dataviz.diagram.Point(80, 120);
    console.log("Initial y:", point.y); // Output: 120
    
    // Modify the y coordinate
    point.y = 300;
    console.log("Modified y:", point.y); // Output: 300
    
    // Use the modified point to reposition a shape
    $("#diagram").kendoDiagram({
        shapes: [{
            id: "shape1",
            x: point.x,
            y: point.y, // Now positioned at y=300
            width: 90,
            height: 45,
            type: "rectangle"
        }]
    });
    </script>
