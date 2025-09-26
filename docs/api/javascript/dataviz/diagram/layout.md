---
title: Layout
res_type: api
---

# kendo.dataviz.diagram.Layout

Represents a grouping element that arranges its children.

## Constructor Parameters

### rect `kendo.dataviz.diagram.Rect`

The rectangle within which the children should be arranged


<div class="meta-api-description">
Specify the bounding box or rectangular area to constrain and control the placement and arrangement of child elements or nodes within a diagram or visual graph layout, setting the exact region where layout algorithms or custom positioning arrange shapes, define node boundaries inside the diagram’s coordinate space, restrict automatic or manual layout to a specific rectangle, and manage spatial constraints for child components during diagram rendering or organization.
</div>

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


<div class="meta-api-description">
Control and customize diagram arrangement and visual organization by specifying layout algorithms, node spacing, alignment preferences, connection routing methods, node ordering, and overall node and link placement during initialization. Enable configuration of layout behavior through parameters that dictate how elements are positioned and rendered, including spacing adjustments, alignment choices, directional flow, routing strategies, and arrangement styles to influence the visual structure and clarity of diagrams. Set and fine-tune layout options such as algorithm type, gap size, node alignment, link routing, and hierarchical or layered processes to optimize diagram presentation, readability, and flow control at construction time.
</div>

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


<div class="meta-api-description">
Control and configure how diagram or graphical layout content is aligned within its container during initialization, with options to position all items collectively to the start, center, or end of the layout area; set layout alignment to left, right, top, or bottom edges depending on flow direction, adjust content placement horizontally or vertically, enable precise positioning of nodes or elements within the container bounds, and customize how the overall group of layout items is arranged to improve visual structure and flow in diagrams or graphical interfaces.
</div>

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


<div class="meta-api-description">
Control and configure the positioning and alignment of nodes, shapes, or elements within a diagram or graphical layout along the alignment axis. Adjust how items are arranged horizontally or vertically relative to each other using alignment settings such as start, center, or end positioning to fine-tune layout flow. Enable precise control over group placement, spacing, and visual order when organizing diagram components or layout items, ensuring consistent alignment for improved clarity and design structure. Options to set item alignment during initialization allow developers to specify whether elements align to the beginning, middle, or end of the layout axis, supporting a range of layout strategies and customization needs.
</div>

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


<div class="meta-api-description">
Control horizontal alignment and distribution of elements in a diagram layout by configuring how space is allocated along the main axis, enabling you to set items to align at the beginning, center, or end of the container. This setting allows adjustment of spacing and positioning of child nodes within the layout, supporting common alignment preferences such as left, middle, or right justification to organize diagram components effectively. Easily set or modify alignment behavior to manage layout flow, spacing, and arrangement of nodes, ensuring consistent distribution and visual balance in diagram structures.
</div>

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


<div class="meta-api-description">
Adjust vertical spacing between multiple lines in diagram layouts by configuring line gaps, controlling the distance between wrapped or stacked text lines and elements, setting how close or spread out consecutive lines appear to manage readability and visual density, tuning spacing to influence node positioning, label arrangement, and overall layout compactness or openness when content spans several rows or wrapped lines.
</div>

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


<div class="meta-api-description">
Adjusting the gap between nodes and connectors in a diagram layout to increase or decrease space, controlling how tightly packed or spread out elements appear, setting distances for clearer visualization or compact arrangement, configuring layout element separation, customizing spacing to enhance readability or optimize space, defining horizontal and vertical intervals between diagram components, managing the proximity of diagram items to avoid overlap or create denser layouts, tuning distance parameters for layout aesthetics and clarity, controlling spacing during diagram setup to influence node and connector placement.
</div>

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


<div class="meta-api-description">
Set or configure the layout direction to control how nodes and elements flow within a diagram, arranging them either side-by-side for horizontal flows or stacked top-to-bottom for vertical flows. Adjust the orientation to influence visual hierarchy, element alignment, and navigation within your graph or chart, enabling customization of node positioning, directionality, and diagram flow. Whether you want to switch between horizontal and vertical layout modes, control how connected items are displayed, or manage the overall direction of your diagram’s structure, this setting governs the axis along which elements are organized and rendered.
</div>

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


<div class="meta-api-description">
Set or control how diagram elements are arranged when their total size exceeds the available layout area, choosing between wrapping content onto new rows or columns to prevent overflow or scaling elements down to fit within the fixed layout rectangle; configure whether to enable line wrapping for flow layouts or maintain a scaled, compressed arrangement to keep all items inside the initial bounds, managing element placement during diagram initialization to handle overflow, layout constraints, and visual organization of nodes or components within a confined space.
</div>

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


<div class="meta-api-description">
Control or customize the visual rendering component or primitive that generates the diagram layout, enabling inspection, modification, or replacement of the base drawing surface or element responsible for displaying the layout graphics. Configure, update, or swap the underlying graphical element used during diagram rendering to influence how the layout is drawn, alter appearance, or integrate custom visuals and post-initialization adjustments for dynamic or programmatic control of the rendered diagram display.
</div>

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


<div class="meta-api-description">
Add or attach a node, shape, or element to an existing group within a diagram, enabling grouping updates, nesting, and hierarchical organization by appending new items to a group's children list; this process modifies the diagram’s structure and layout dynamically, supporting tasks such as nesting elements, expanding groups with additional components, controlling group membership, and managing relationships between parent groups and their child nodes or shapes for layout rendering and diagram updates.
</div>

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


<div class="meta-api-description">
Remove or delete all child elements within a diagram layout group, including shapes, connections, and nested items, to reset or empty the group's contents while keeping the group container intact; commonly used to clear, reset, or purge elements before adding new ones, updating layouts, or dynamically managing group contents during diagram editing, reconfiguration, or programmatic manipulation.
</div>

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


<div class="meta-api-description">
Retrieve or update the layout boundaries, bounding box, or rectangular area that controls the positioning, size, and arrangement of nodes and connectors within a diagram or graphical layout. Configure, set, get, specify, adjust, or modify the diagram’s layout rectangle to control how elements are sized and positioned during layout calculations, including changing the spatial limits, bounds, or area that define the layout region. Access the current rectangular layout frame or provide new dimensions to redefine the layout space and influence node and connector arrangement.
</div>

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


<div class="meta-api-description">
Adjust, update, or refresh the arrangement and positioning of diagram nodes and connectors dynamically after modifications or configuration changes to ensure the diagram accurately reflects the latest structure and layout settings. Trigger layout recalculation, element repositioning, connector rerouting, and automatic alignment whenever nodes, links, or layout parameters are altered, enabling developers to programmatically reorganize or optimize diagram visuals, enforce consistent spacing, and maintain coherence in graphical representations after any update or data change.
</div>

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


<div class="meta-api-description">
Remove or detach an individual node or element from a group or parent container within a diagramming structure, enabling dynamic reparenting, updating grouping relationships, modifying node hierarchies, or restructuring diagram elements during runtime. This method supports operations like ungrouping specific components, adjusting group memberships, controlling child elements within composite nodes, and managing the diagram's layout by excluding certain items from their current group context to reflect changes in grouping, nesting, or hierarchy.
</div>

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


<div class="meta-api-description">
Check or change whether a layout element in a diagram, such as shapes, nodes, or connections, is shown or hidden by toggling visibility status dynamically or during layout processing. Retrieve the current display state of diagram components or update their presence by enabling, disabling, showing, hiding, or setting visibility flags for elements within diagrams at runtime or configuration time. Control the display of diagram parts with methods that get or set visibility, allowing for conditional rendering, visibility toggling, or layout-driven show/hide behavior on individual or grouped diagram nodes and connections.
</div>

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
