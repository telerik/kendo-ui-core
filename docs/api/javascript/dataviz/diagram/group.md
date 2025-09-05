---
title: Group
res_type: api
---

# kendo.dataviz.diagram.Group

This represents an invisible, grouping element with visual children. Groups can be nested to form a hierarchy.

## Configuration

### x `Number`

The X position of the top-left corner of the group.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [
            { id: "1", type: "rectangle", x: 100, y: 100 },
            { id: "2", type: "rectangle", x: 200, y: 100 }
        ]
    });
    
    var diagram = $("#diagram").getKendoDiagram();
    var shape1 = diagram.getShapeById("1");
    var shape2 = diagram.getShapeById("2");
    
    // Create a group and set its x position
    var group = new kendo.dataviz.diagram.Group();
    group.x = 150;
    group.append(shape1.visual);
    group.append(shape2.visual);
    
    console.log("Group x position:", group.x);
    </script>

### y `Number`

The Y position of the top-left corner of the group.

#### Example

    <div id="diagram"></div>
    <script>
    var shape1 = new kendo.dataviz.diagram.Rectangle({
        x: 50,
        y: 50,
        width: 100,
        height: 50,
        fill: {
            color: "#6EB5FF"
        }
    });

    var shape2 = new kendo.dataviz.diagram.Rectangle({
        x: 200,
        y: 50,
        width: 100,
        height: 50,
        fill: {
            color: "#FFB74E"
        }
    });

    var group = new kendo.dataviz.diagram.Group();
    group.append(shape1);
    group.append(shape2);
    
    var drawingElement = group.drawingElement;
    console.log("Drawing element type:", drawingElement.nodeType);
    console.log("Drawing element children:", drawingElement.children.length);
    </script>

## Fields

### drawingElement `kendo.drawing.Group`

The drawing element used to draw the group.

#### Example

    <div id="diagram"></div>
    <script>
    var shape1 = new kendo.dataviz.diagram.Rectangle({
        x: 50,
        y: 50,
        width: 100,
        height: 50,
        fill: {
            color: "#6EB5FF"
        }
    });

    var shape2 = new kendo.dataviz.diagram.Rectangle({
        x: 200,
        y: 50,
        width: 100,
        height: 50,
        fill: {
            color: "#FFB74E"
        }
    });

    var group = new kendo.dataviz.diagram.Group();
    group.append(shape1);
    group.append(shape2);
    
    var drawingElement = group.drawingElement;
    console.log("Drawing element type:", drawingElement.nodeType);
    console.log("Drawing element children:", drawingElement.children.length);
    </script>

## Methods

### append
Appends the given element to the group

#### Parameters

##### element `Object`
The element to append.

#### Example

    <div id="diagram"></div>
    <script>
    var shape1 = new kendo.dataviz.diagram.Rectangle({
        x: 50,
        y: 50,
        width: 100,
        height: 50,
        fill: {
            color: "#6EB5FF"
        }
    });

    var shape2 = new kendo.dataviz.diagram.Rectangle({
        x: 200,
        y: 50,
        width: 100,
        height: 50,
        fill: {
            color: "#FFB74E"
        }
    });

    var group = new kendo.dataviz.diagram.Group();
    group.append(shape1);
    group.append(shape2);
    
    var drawingElement = group.drawingElement;
    console.log("Drawing element type:", drawingElement.nodeType);
    console.log("Drawing element children:", drawingElement.children.length);
    </script>

### clear
Removes all elements from the group.

#### Example

    <div id="diagram"></div>
    <script>
    var shape1 = new kendo.dataviz.diagram.Rectangle({
        x: 50,
        y: 50,
        width: 100,
        height: 50,
        fill: {
            color: "#6EB5FF"
        }
    });

    var shape2 = new kendo.dataviz.diagram.Rectangle({
        x: 200,
        y: 50,
        width: 100,
        height: 50,
        fill: {
            color: "#FFB74E"
        }
    });

    var group = new kendo.dataviz.diagram.Group();
    group.append(shape1);
    group.append(shape2);
    
    var drawingElement = group.drawingElement;
    console.log("Drawing element type:", drawingElement.nodeType);
    console.log("Drawing element children:", drawingElement.children.length);

    group.clear();

    console.log("After clear group children are:", group.children.length);
    </script>

### remove
Removes the given element from the group

#### Parameters

##### element `Object`
The element to remove.

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
        shapes: [
            { id: "1", type: "rectangle", x: 100, y: 100 },
            { id: "2", type: "rectangle", x: 200, y: 100 },
            { id: "3", type: "circle", x: 150, y: 200 }
        ]
    });
    
    var diagram = $("#diagram").getKendoDiagram();
    var shape1 = diagram.getShapeById("1");
    var shape2 = diagram.getShapeById("2");
    var shape3 = diagram.getShapeById("3");
    
    // Create a group and add elements
    var group = new kendo.dataviz.diagram.Group();
    group.append(shape1.visual);
    group.append(shape2.visual);
    group.append(shape3.visual);
    
    console.log("Before remove - children count:", group.children.length);
    
    // Remove a specific element from the group
    group.remove(shape2.visual);
    
    console.log("After remove - children count:", group.children.length);
    </script>


### position
Get or sets the element position.

#### Parameters

##### offset `kendo.dataviz.diagram.Point`
The origin of the element.

#### Example

    <div id="diagram"></div>
    <script>
     var shape1 = new kendo.dataviz.diagram.Rectangle({
        x: 50,
        y: 50,
        width: 100,
        height: 50,
        fill: {
            color: "#6EB5FF"
        }
    });

    var group = new kendo.dataviz.diagram.Group();
    group.append(shape1);
    
    var drawingElement = group.drawingElement;
    console.log("Drawing element type:", drawingElement.nodeType);

     var currentPosition = group.position();
    console.log("Current position:", currentPosition);
    
    var newPosition = new kendo.dataviz.diagram.Point(300, 250);
    group.position(newPosition);
    console.log("New position:", group.position());
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
    var shape1 = new kendo.dataviz.diagram.Rectangle({
        x: 50,
        y: 50,
        width: 100,
        height: 50,
        fill: {
            color: "#6EB5FF"
        }
    });

    var group = new kendo.dataviz.diagram.Group();
    group.append(shape1);
    
    var rotationCenter = new kendo.dataviz.diagram.Point(150, 150);
    
    group.rotate(45, rotationCenter);
    console.log("Group rotated 45 degrees around center:", rotationCenter);
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
    var shape1 = new kendo.dataviz.diagram.Rectangle({
        x: 50,
        y: 50,
        width: 100,
        height: 50,
        fill: {
            color: "#6EB5FF"
        }
    });

    var group = new kendo.dataviz.diagram.Group();
    group.append(shape1);
    
    var isVisible = group.visible();
    console.log("Current visibility:", isVisible);
    
    group.visible(false);
    console.log("Group visible:", group.visible());

    group.visible(true);
    console.log("Group visible:", group.visible());
    </script>
