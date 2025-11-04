---
title: Image
res_type: api
---

# kendo.dataviz.diagram.Image

Represents a bitmap image loaded from source URL.

## Configuration

### height `Number`

The height of the image.


<div class="meta-api-description">
How do I set the height of a diagram image in Kendo UI? Adjust or specify the vertical size, image height, or picture dimension of a diagram or visual component to control how tall the image appears when rendered, influencing layout, scaling, display height, pixel height, and overall vertical spacing for diagrams, flowcharts, or graphical elements in a user interface.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "image",
            x: 100,
            y: 100,
            source: "https://demos.telerik.com/kendo-ui/content/dataviz/diagram/people/liam.png",
            height: 100,
            width: 100
        }]
    });
    </script>

### width `Number`

The width of the image.


<div class="meta-api-description">
How do I set the width of an image within a Kendo UI diagram? Control and adjust the horizontal size or width dimension of images within diagram layouts to manage spacing, scale visuals, resize pictures, set image boundaries, fine-tune image proportions, constrain image width for responsive design, customize image fitting inside diagram shapes, configure visual element sizing, and optimize image placement for anchors and connection paths.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "image",
            x: 100,
            y: 100,
            source: "https://demos.telerik.com/kendo-ui/content/dataviz/diagram/people/liam.png",
            height: 100,
            width: 100
        }]
    });
    </script>

### x `Number`

The X position of the top-left corner of the element.


<div class="meta-api-description">
How do I adjust the horizontal position of an image in a Kendo UI Diagram? Adjust the horizontal position or X coordinate of an image or visual element within a diagram, canvas, or graphical layout by specifying its left-edge placement to control or reposition the element’s top-left corner along the X-axis, enabling precise alignment, movement, or configuration of the image’s left boundary within the diagram workspace or rendering area.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "image",
            x: 150,
            y: 100,
            source: "https://demos.telerik.com/kendo-ui/content/dataviz/diagram/people/liam.png",
            height: 100,
            width: 100
        }]
    });
    </script>

### y `Number`

The Y position of the top-left corner of the element.


<div class="meta-api-description">
How do I set the vertical position of an image in a Kendo UI diagram? Control or configure the vertical placement, top-to-bottom position, or Y coordinate of an image within a diagram or graphical layout, enabling precise movement, alignment, repositioning, or adjustment of the element’s top-left corner for custom layouts, element stacking, spatial arrangement, or dynamic interface designs that require setting vertical offsets, coordinates, or positions within diagrams and visual components.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "image",
            x: 100,
            y: 200,
            source: "https://demos.telerik.com/kendo-ui/content/dataviz/diagram/people/liam.png",
            height: 100,
            width: 100
        }]
    });
    </script>

### source `String`

The source URL of the image.


<div class="meta-api-description">
How do I change the image source in a Kendo UI Diagram component? Set, configure, or update the image URL or path that defines which picture an image shape in a diagram will display, including absolute or relative links, enabling dynamic binding, image source changes, and controlling the visual content loaded within diagram components for customized or programmatic image rendering.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "image",
            x: 100,
            y: 100,
            source: "https://demos.telerik.com/kendo-ui/content/dataviz/diagram/people/liam.png",
            height: 100,
            width: 100
        }]
    });
    </script>

## Fields

### drawingElement `kendo.drawing.Image`

The drawing element used to draw the image.


<div class="meta-api-description">
How to access and customize the graphical object rendering an image in a Kendo UI diagram? Access, modify, customize, or replace the underlying graphical object responsible for rendering an image within a diagram or canvas, enabling direct control over its visual appearance, transformations, animations, styles, event handling, and interactions with the drawing primitive that displays the image content as part of vector graphics or diagram rendering workflows.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "image",
            x: 100,
            y: 100,
            source: "https://demos.telerik.com/kendo-ui/content/dataviz/diagram/people/liam.png",
            height: 100,
            width: 100
        }]
    });
    
    var diagram = $("#diagram").getKendoDiagram();
    var imageShape = diagram.shapes[0];
    console.log("Drawing element:", imageShape.drawingElement);
    </script>

## Methods

### position
Get or sets the element position.


<div class="meta-api-description">
How do I set the position of an image in a Kendo UI diagram? Retrieve or modify the coordinates or placement of an image within a diagram to control its exact location, adjust alignment, update layout positioning, move or animate the image element programmatically, set or get its spatial properties, reposition images interactively or via code, access current image location data, and manage the image’s position dynamically for layout adjustments or animation effects in diagrams.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "image",
            x: 100,
            y: 100,
            source: "https://demos.telerik.com/kendo-ui/content/dataviz/diagram/people/liam.png",
            height: 100,
            width: 100
        }]
    });
    
    var diagram = $("#diagram").getKendoDiagram();
    var imageShape = diagram.shapes[0];
    
    // Get current position
    var currentPosition = imageShape.position();
    console.log("Current position:", currentPosition);
    
    // Set new position
    imageShape.position({x: 200, y: 150});
    </script>

#### Parameters

##### offset `kendo.dataviz.diagram.Point`
The origin of the element.


### rotate
Rotates the element with the specified parameters.


<div class="meta-api-description">
How do I rotate a diagram image in Kendo UI for jQuery? Rotate or turn a diagram image element programmatically by specifying the rotation angle, controlling the pivot point or center of rotation, and optionally animating the rotation transformation to change orientation dynamically. Configure image rotation to update or set the direction of the diagram element in response to code logic, user interactions, touch gestures, or animation sequences, enabling flexible adjustment of visual presentation, orientation alignment, and interactive transformations within graphical interfaces or diagramming tools.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "image",
            x: 100,
            y: 100,
            source: "https://demos.telerik.com/kendo-ui/content/dataviz/diagram/people/liam.png",
            height: 100,
            width: 100
        }]
    });
    
    var diagram = $("#diagram").getKendoDiagram();
    var imageShape = diagram.shapes[0];
    
    // Rotate the image by 45 degrees around its center
    var center = {x: 150, y: 140}; // Center of the image
    imageShape.rotate(45, center);
    </script>

#### Parameters

##### angle `Number`
The angle of rotation in decimal degrees.
Measured in clockwise direction with 0 pointing "right".
Negative values or values greater than 360 will be normalized.

##### center `kendo.dataviz.diagram.Point`
The center of rotation.


### visible
Gets or sets the visibility of the current element.


<div class="meta-api-description">
How can I hide an image in my Kendo UI Diagram using jQuery? Control, set, query, or toggle the visibility state of image elements within a diagram, enabling you to programmatically show or hide images, determine if they are currently visible with true or false responses, dynamically update rendering based on visibility changes, bind visibility to events or conditions, and manage display preferences in diagrams through visibility settings or boolean flags.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [{
            type: "image",
            x: 100,
            y: 100,
            source: "https://demos.telerik.com/kendo-ui/content/dataviz/diagram/people/liam.png",
            height: 100,
            width: 100
        }]
    });
    
    var diagram = $("#diagram").getKendoDiagram();
    var imageShape = diagram.shapes[0];
    
    // Get current visibility
    var isVisible = imageShape.visible();
    console.log("Is visible:", isVisible);
    
    // Hide the image
    imageShape.visible(false);
    
    // Show the image again
    setTimeout(() => {
        imageShape.visible(true);
    }, 2000);
    </script>

#### Parameters

##### visible `Boolean`
The new visibility state.

#### Returns
`Boolean` True if the element is visible, false otherwise.
