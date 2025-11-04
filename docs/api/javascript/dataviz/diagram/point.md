---
title: Point
res_type: api
---

# kendo.dataviz.diagram.Point

Represents a point in two-dimensional space.

## Constructor Parameters

### x `Number`

The x coordinate of the point.


<div class="meta-api-description">
How do I set the initial horizontal position of a diagram point in Kendo UI? Specify or set the initial horizontal coordinate for a diagram point during creation by providing a numeric x-value that determines the point’s placement or movement along the x-axis, enabling control over the point’s left-to-right positioning, alignment, or offset when constructing or configuring diagram elements, shapes, nodes, or visual components that require precise horizontal layout adjustments.
</div>

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


<div class="meta-api-description">
How do I set the vertical coordinate of a point in a Kendo UI diagram? Set or configure the vertical coordinate or y-position of a diagram point, specifying the point’s placement along the vertical axis during creation or initialization. Control or define the y-value to influence layout arrangement, connector routing, and precise rendering of points in visual diagrams, graphs, or node-link structures. Adjust the vertical positioning to affect alignment, spacing, or distribution of points in diagrammatic representations, ensuring accurate vertical placement for spatial calculations, layout algorithms, or graphical interface designs.
</div>

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


<div class="meta-api-description">
How to set the x-coordinate of a point in a Kendo UI diagram? Configure, retrieve, or adjust the horizontal position value of a point within a diagram, enabling precise control over its x-coordinate for layout calculations, placement, alignment, movement, or spatial positioning. This numeric horizontal coordinate supports operations like setting the left-to-right location, updating point coordinates dynamically, computing geometry, and managing diagrammatic structures by defining or reading the exact horizontal axis value. Use cases include manipulating point positions for rendering, layout algorithms, coordinate transformations, and responsive repositioning along the x-axis.
</div>

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


<div class="meta-api-description">
How to adjust the vertical position of a point in a Kendo UI diagram? Set or adjust the vertical position, height, or Y-coordinate of a point within a diagram or coordinate system to control alignment, placement, or spatial calculations. Enable precise vertical movement, positioning, or offset by specifying numeric values for the point’s vertical axis, supporting tasks like layout adjustment, coordinate mapping, or graphical transformations. Use this to configure or modify the point’s vertical dimension for alignment, layout design, positioning logic, or dynamic coordinate updates in diagrams, charts, or graphical representations.
</div>

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
