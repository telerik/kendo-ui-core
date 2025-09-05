---
title: Layout
res_type: api
---

# kendo.dataviz.diagram.Layout

Represents a grouping element that arranges its children.

## Constructor Parameters

### rect `kendo.dataviz.diagram.Rect`

The rectangle within which the children should be arranged

#### Example

    <div id="diagram"></div>
    <script>
    var diagram = kendo.dataviz.diagram;
    var rect = new diagram.Rect(0, 0, 200, 300);
    var layout = new diagram.Layout(rect, {
        orientation: "vertical",
        spacing: 10
    });
    console.log(layout.rect());
    </script>

### options `Object`

The configuration options of the layout.

#### Example

    <div id="diagram"></div>
    <script>
    var diagram = kendo.dataviz.diagram;
    var rect = new diagram.Rect(0, 0, 300, 200);
    var options = {
        orientation: "horizontal",
        alignContent: "center",
        alignItems: "center",
        spacing: 15,
        wrap: true
    };
    var layout = new diagram.Layout(rect, options);
    console.log("Layout configured with options:", options);
    </script>

## Configuration

### alignContent `String` *(default: "start")*

Specifies the alignment of the content.

Possible values are:

* "start"
* "center"
* "end"

#### Example

    <div id="diagram"></div>
    <script>
    var diagram = kendo.dataviz.diagram;
    var rect = new diagram.Rect(0, 0, 400, 300);
    var layout = new diagram.Layout(rect, {
        alignContent: "center",
        orientation: "horizontal",
        wrap: true
    });
    console.log("Content aligned to center");
    </script>

### alignItems `String` *(default: "start")*

Specifies the alignment of the items based on each other.

Possible values are:

* "start"
* "center"
* "end"

#### Example

    <div id="diagram"></div>
    <script>
    var diagram = kendo.dataviz.diagram;
    var rect = new diagram.Rect(0, 0, 300, 200);
    var layout = new diagram.Layout(rect, {
        alignItems: "end",
        orientation: "vertical",
        spacing: 10
    });
    console.log("Items aligned to end");
    </script>

### justifyContent `String` *(default: "start")*

Specifies how should the content be justified.

Possible values are:

* "start"
* "center"
* "end"

#### Example

    <div id="diagram"></div>
    <script>
    var diagram = kendo.dataviz.diagram;
    var rect = new diagram.Rect(0, 0, 400, 250);
    var layout = new diagram.Layout(rect, {
        justifyContent: "center",
        orientation: "horizontal",
        spacing: 20
    });
    console.log("Content justified to center");
    </script>

### lineSpacing `Number` *(default: 0)*

Specifies the distance between the lines for wrapped layout.

#### Example

    <div id="diagram"></div>
    <script>
    var diagram = kendo.dataviz.diagram;
    var rect = new diagram.Rect(0, 0, 200, 300);
    var layout = new diagram.Layout(rect, {
        orientation: "horizontal",
        wrap: true,
        lineSpacing: 25,
        spacing: 10
    });
    console.log("Line spacing set to 25px");
    </script>

### spacing `Number` *(default: 0)*

Specifies the distance between the elements.

#### Example

    <div id="diagram"></div>
    <script>
    var diagram = kendo.dataviz.diagram;
    var rect = new diagram.Rect(0, 0, 300, 200);
    var layout = new diagram.Layout(rect, {
        orientation: "vertical",
        spacing: 15
    });
    console.log("Element spacing set to 15px");
    </script>

### orientation `String` *(default: "horizontal")*

Specifies the layout orientation. The supported values are:

* "horizontal" - the elements are arranged horizontally
* "vertical" - the elements are arranged vertically

#### Example

    <div id="diagram"></div>
    <script>
    var diagram = kendo.dataviz.diagram;
    var rect = new diagram.Rect(0, 0, 300, 400);
    var layout = new diagram.Layout(rect, {
        orientation: "vertical",
        spacing: 10,
        alignItems: "center"
    });
    console.log("Layout orientation set to vertical");
    </script>

### wrap `Boolean` *(default: true)*

Specifies the behavior when the elements size exceeds the rectangle size. If set to true, the elements will be moved to the next "line". If set to false, the layout will be scaled so that the elements fit in the rectangle.

#### Example

    <div id="diagram"></div>
    <script>
    var diagram = kendo.dataviz.diagram;
    var rect = new diagram.Rect(0, 0, 200, 200);
    var layout = new diagram.Layout(rect, {
        orientation: "horizontal",
        wrap: false,
        spacing: 5
    });
    console.log("Layout wrap set to false - elements will be scaled");
    </script>

## Fields

### drawingElement `kendo.drawing.Layout`

The drawing element used to draw the layout.

#### Example

    <div id="diagram"></div>
    <script>
    var diagram = kendo.dataviz.diagram;
    var rect = new diagram.Rect(0, 0, 300, 200);
    var layout = new diagram.Layout(rect, {
        orientation: "horizontal"
    });
    var drawingElement = layout.drawingElement;
    console.log("Drawing element:", drawingElement);
    console.log("Drawing element type:", drawingElement.constructor.name);
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
    var diagram = kendo.dataviz.diagram;
    var rect = new diagram.Rect(0, 0, 300, 200);
    var layout = new diagram.Layout(rect, {
        orientation: "horizontal",
        spacing: 10
    });
    
    // Create elements to append
    var circle = new diagram.Circle({ radius: 30 });
    var rectangle = new diagram.Rectangle({ width: 50, height: 30 });
    
    layout.append(circle);
    layout.append(rectangle);
    console.log("Elements appended to layout");
    </script>

### clear
Removes all elements from the group.

#### Example

    <div id="diagram"></div>
    <script>
    var diagram = kendo.dataviz.diagram;
    var rect = new diagram.Rect(0, 0, 300, 200);
    var layout = new diagram.Layout(rect, {
        orientation: "horizontal"
    });
    
    // Add some elements
    layout.append(new diagram.Circle({ radius: 20 }));
    layout.append(new diagram.Rectangle({ width: 40, height: 20 }));
    
    // Clear all elements
    layout.clear();
    console.log("All elements removed from layout");
    </script>

### rect
Gets or sets the layout rectangle.

#### Parameters

##### rect `kendo.dataviz.diagram.Rect`
The layout rectangle.

#### Returns
`kendo.dataviz.diagram.Rect` The current rectangle.

#### Example

    <div id="diagram"></div>
    <script>
    var diagram = kendo.dataviz.diagram;
    var initialRect = new diagram.Rect(0, 0, 200, 150);
    var layout = new diagram.Layout(initialRect, {
        orientation: "horizontal"
    });
    
    // Get current rectangle
    var currentRect = layout.rect();
    console.log("Current rectangle:", currentRect);
    
    // Set new rectangle
    var newRect = new diagram.Rect(50, 50, 300, 250);
    layout.rect(newRect);
    console.log("Updated rectangle:", layout.rect());
    </script>

### reflow
Arranges the elements based on the current options.

#### Example

    <div id="diagram"></div>
    <script>
    var diagram = kendo.dataviz.diagram;
    var rect = new diagram.Rect(0, 0, 300, 200);
    var layout = new diagram.Layout(rect, {
        orientation: "horizontal",
        spacing: 10,
        alignItems: "center"
    });
    
    // Add elements
    layout.append(new diagram.Circle({ radius: 25 }));
    layout.append(new diagram.Rectangle({ width: 50, height: 30 }));
    
    // Reflow to arrange elements based on current options
    layout.reflow();
    console.log("Layout reflowed - elements rearranged");
    </script>

### remove
Removes the given element from the group

#### Parameters

##### element `Object`
The element to remove.

#### Example

    <div id="diagram"></div>
    <script>
    var diagram = kendo.dataviz.diagram;
    var rect = new diagram.Rect(0, 0, 300, 200);
    var layout = new diagram.Layout(rect, {
        orientation: "horizontal",
        spacing: 10
    });
    
    // Create and add elements
    var circle = new diagram.Circle({ radius: 25 });
    var rectangle = new diagram.Rectangle({ width: 50, height: 30 });
    layout.append(circle);
    layout.append(rectangle);
    
    // Remove the circle element
    layout.remove(circle);
    console.log("Circle element removed from layout");
    </script>

### visible
Gets or sets the visibility of the current element.

#### Parameters

##### visible `Boolean`
The new visibility state.

#### Returns

#### Example

    <div id="diagram"></div>
    <script>
    var diagram = kendo.dataviz.diagram;
    var rect = new diagram.Rect(0, 0, 300, 200);
    var layout = new diagram.Layout(rect, {
        orientation: "horizontal"
    });
    
    // Get current visibility
    var isVisible = layout.visible();
    console.log("Current visibility:", isVisible);
    
    // Set visibility to false
    layout.visible(false);
    console.log("Layout hidden");
    
    // Set visibility to true
    layout.visible(true);
    console.log("Layout visible");
    </script>
`Boolean` True if the element is visible, false otherwise.
