---
title: Group
res_type: api
---

# kendo.dataviz.diagram.Group

This represents an invisible, grouping element with visual children. Groups can be nested to form a hierarchy.

## Configuration

### x `Number`

The X position of the top-left corner of the group.


<div class="meta-api-description">
How do I set or get the left position of a diagram group in Kendo UI for jQuery? Adjusting or retrieving the horizontal placement, left coordinate, or X-axis position of a diagram group within a canvas or coordinate system, enabling precise control over group alignment, movement, layout, and spatial arrangement by setting or getting the leftmost or top-left horizontal point for positioning elements side-by-side or controlling the group's exact horizontal offset.
</div>

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


<div class="meta-api-description">
How do I set the vertical position of grouped elements in a Kendo UI Diagram? Set, control, or retrieve the vertical position coordinate that determines the top-left alignment or placement of a grouped element within a diagram's coordinate system, enabling precise movement, vertical positioning, offsetting, layout adjustments, or alignment of grouped components by specifying or reading their top edge’s Y-axis value during initialization or dynamic updates.
</div>

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


<div class="meta-api-description">
How can I access and modify the graphical object of a group in Kendo UI Diagram? Access and modify the underlying graphical object or visual element representing a group within a diagram, enabling inspection of rendering attributes, adjustment of shape geometry, customization of visual appearance, and attachment of event listeners or handlers to respond to user interactions or update visuals dynamically. This capability supports tasks like reading or altering the low-level drawing structure, configuring how groups are displayed and behave in the graphical interface, controlling rendering details, or integrating custom interaction logic with the group's visual representation in diagrams or graphical layouts.
</div>

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


<div class="meta-api-description">
How do I add new shapes to an existing group in a Kendo UI diagram? Add or insert elements such as shapes, connections, or nested groups into an existing group, attaching new items to a group's children or collection to dynamically modify, expand, or build diagram structures, control group content updates, enable hierarchical organization within diagrams, adjust group membership by including additional components, and manage diagram elements within grouped containers for rendering, composition, or layout purposes.
</div>

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


<div class="meta-api-description">
How to reset group members programmatically in Kendo UI diagram? Empty all child elements inside a group container, remove every member from a group, clear or reset group contents, delete all elements in a diagram group, flush a group to prepare for new items, reset group members programmatically, remove included nodes or shapes from a container, clear group elements for updating or restructuring, empty group contents before adding or moving elements in a diagram, reset diagram groups to an empty state.
</div>

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


<div class="meta-api-description">
How do I remove an item from a collection within a Kendo UI Diagram? detach a child element from a container or grouping, remove an item from a collection within a diagram, exclude a specific child node from a parent group, update group membership by deleting or eliminating one child, disassociate an element so it no longer appears within group layouts or renders as part of a composite, modify hierarchical structures by extracting a component, control visual grouping by removing specific children, handle dynamic group content by deleting members, unlink elements from parent containers, adjust diagram structures by removing children elements.
</div>

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


<div class="meta-api-description">
How do I change the position of a group in a Kendo UI Diagram? Retrieve or update the coordinates or location of a group within a diagram, enabling you to get the current position or set new coordinates to move, align, reposition, or place grouped elements dynamically inside a diagram component. This can be used to programmatically control, configure, or adjust the layout, spatial arrangement, or placement of grouped nodes or elements, facilitating automatic movement, manual repositioning, coordinate reading, or alignment for diagram structures, flowcharts, or visual representations.
</div>

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


<div class="meta-api-description">
How to rotate grouped items in Kendo UI diagram with animation? Rotate or spin a collection of grouped items or elements within a diagram or graphical interface by specifying rotation angles and pivot points, with options to apply smooth animation effects during the transform update and control the rotation state of the group dynamically; commonly used to adjust orientation, realign components, animate group movements, or manipulate grouped shapes and objects by setting rotation degrees, pivot positions, and enabling or disabling animated transitions in interactive graphics, UI design, or visualization tools.
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


<div class="meta-api-description">
How to control visibility of diagram groups in Kendo UI for jQuery? Control element display status by querying or modifying visibility states to show, hide, toggle, enable, or disable diagram groups or their child components dynamically; retrieve current visibility as a boolean to conditionally render elements, apply programmatic visibility management for grouped items, and update rendering in response to visibility changes, supporting use cases like interactive UI adjustments, conditional display logic, and bulk visibility updates of grouped visual elements.
</div>

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
