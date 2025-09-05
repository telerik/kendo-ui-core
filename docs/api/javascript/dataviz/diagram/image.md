---
title: Image
res_type: api
---

# kendo.dataviz.diagram.Image

Represents a bitmap image loaded from source URL.

## Configuration

### height `Number`

The height of the image.

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
