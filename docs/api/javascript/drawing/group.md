---
title: Group
page_title: API reference for Kendo UI Drawing API Group
res_type: api
---

# kendo.drawing.Group : kendo.drawing.Element

Represents a set of drawing elements, possibly including other groups.

#### Example - creating a group

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group();

        var pathA = new draw.Path().moveTo(0, 0).lineTo(100, 100);
        var pathB = new draw.Path().moveTo(0, 100).lineTo(100, 0);

        group.append(pathA, pathB);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

## Constructor Parameters

### options `Object`
The configuration of this Group.


<div class="meta-api-description">
How do I customize the appearance of a Kendo UI DrawingGroup? Configure group settings, appearance, layout, behavior, and initialization parameters when creating or instantiating a drawing group by passing a configuration object. Enable or set custom options to control the group's visual style, arrangement, interactions, and default properties upon construction. Specify initialization parameters to adjust group behavior and presentation during the creation phase, including layout strategies, styling preferences, enabled features, and other setup controls for grouped drawing elements.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group({
            opacity: 0.8,
            visible: true,
            transform: kendo.geometry.transform().translate(50, 50)
        });

        var pathA = new draw.Path().moveTo(0, 0).lineTo(100, 100);
        var pathB = new draw.Path().moveTo(0, 100).lineTo(100, 0);

        group.append(pathA, pathB);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

## Configuration

### clip `kendo.drawing.Path`
The group clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element#configuration-clip)


<div class="meta-api-description">
How do I restrict the rendering area of child drawings in a Kendo UI DrawingGroup? Control and configure the clipping region or mask for a group of drawing elements by defining a clipping path using geometric shapes or custom paths that restrict or crop the rendering area of all child drawings in the group. Enable setting, adjusting, or modifying clip boundaries to limit visible content, create complex masked visuals, or enforce area constraints on multiple drawing components simultaneously for fine-grained control over how grouped graphics are rendered and displayed within specified shapes or regions.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group();

        var pathA = new draw.Path().moveTo(0, 0).lineTo(100, 100);
        var pathB = new draw.Path().moveTo(0, 100).lineTo(100, 0);
        group.append(pathA, pathB);

        var clipPath = new draw.Path()
            .moveTo(25, 25)
            .lineTo(75, 25)
            .lineTo(75, 75)
            .lineTo(25, 75)
            .close();

        group.clip = clipPath;

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

### cursor `String`
The group cursor.
Inherited from [Element.cursor](/api/javascript/drawing/element#configuration-cursor)


<div class="meta-api-description">
How to change cursor style when hovering over drawing elements in Kendo UI for jQuery? Control the mouse pointer appearance when hovering over drawing elements by setting the cursor style to any valid CSS cursor value such as pointer, move, default, none, or custom styles, enabling you to customize user interaction feedback, change cursor icons for specific graphics or drawable areas, set hover effects, configure interactive cursor changes within drawable groups, adjust cursor behavior in drawing contexts, and manage pointer visuals when users navigate or interact with graphic group elements.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group({
            cursor: "pointer"
        });

        var pathA = new draw.Path().moveTo(0, 0).lineTo(100, 100);
        var pathB = new draw.Path().moveTo(0, 100).lineTo(100, 0);

        group.append(pathA, pathB);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

### opacity `Number`
The group opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element#configuration-opacity)

The opacity of any child groups and elements will be multiplied by this value.


<div class="meta-api-description">
How to set opacity for multiple drawings in Kendo UI? Adjust the transparency, translucency, or alpha level of a group of visual elements by setting the group’s overall opacity to fade or blend all contained drawings simultaneously. Control group-wide fade effects, composite layers with varying transparency, and combine child element opacities multiplicatively to manage collective visibility, enabling developers to set, configure, or modify the blend strength, lightness, or see-through intensity of the entire drawing collection as a single adjustable parameter for consistent group-level transparency.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group({
            opacity: 0.5
        });

        var pathA = new draw.Path().moveTo(0, 0).lineTo(100, 100);
        var pathB = new draw.Path().moveTo(0, 100).lineTo(100, 0);

        group.append(pathA, pathB);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

### pdf `kendo.drawing.PDFOptions`
Page options to apply during PDF export.


<div class="meta-api-description">
How to customize PDF export settings for Kendo UI drawing components? Set and customize PDF export settings including page dimensions, orientation options like portrait or landscape, margin sizes, scaling factors, page layout configurations, and adding or adjusting headers and footers when rendering drawing or graphics components to PDF format; control how pages appear, print, and are structured in the exported PDF document by defining layout and printing preferences during initialization or export processes.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group({
            pdf: {
                margin: { top: 10, left: 10, bottom: 10, right: 10 }
            }
        });

        var pathA = new draw.Path().moveTo(0, 0).lineTo(100, 100);
        var pathB = new draw.Path().moveTo(0, 100).lineTo(100, 0);

        group.append(pathA, pathB);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

### tooltip `kendo.drawing.TooltipOptions`
The tooltip options of the shape.


<div class="meta-api-description">
How to customize tooltip content for shapes in a Kendo UI DrawingGroup? Set, customize, and control tooltip content, appearance, placement, styling, templates, visibility, and behavior for shapes within a drawing or graphic component, enabling developers to configure hover text, popups, help labels, info boxes, and interactive tooltip display options including positioning and formatting to enhance user interaction and provide contextual information on graphical elements.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group({
            tooltip: {
                content: "This is a group of paths"
            }
        });

        var pathA = new draw.Path().moveTo(0, 0).lineTo(100, 100);
        var pathB = new draw.Path().moveTo(0, 100).lineTo(100, 0);

        group.append(pathA, pathB);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

### transform `kendo.geometry.Transformation`
The transformation to apply to this group and its children.
Inherited from [Element.transform](/api/javascript/drawing/element#configuration-transform)


<div class="meta-api-description">
How to apply geometric transformations to a group of drawings in Kendo UI for jQuery? Control and configure geometric transformations such as translation, rotation, scaling, skewing, or complex matrix operations applied to a group of drawings and all nested child elements, enabling developers to adjust positioning, orientation, size, and coordinate systems consistently across composed graphics, manipulate visual layouts dynamically, combine multiple transform effects, and seamlessly apply composite transformations for precise rendering and design adjustments within hierarchical graphic structures.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group({
            transform: kendo.geometry.transform().rotate(45, [50, 50])
        });

        var pathA = new draw.Path().moveTo(0, 0).lineTo(100, 100);
        var pathB = new draw.Path().moveTo(0, 100).lineTo(100, 0);

        group.append(pathA, pathB);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

### visible `Boolean`
A flag, indicating if the group and its children are visible.
Inherited from [Element.visible](/api/javascript/drawing/element#configuration-visible)


<div class="meta-api-description">
How do I toggle visibility of all elements in a Kendo UI DrawingGroup? Control the display status of a collection of graphical elements by toggling visibility on or off for the entire group and all nested items, enabling show, hide, enable, disable, or toggle functions that affect the parent and its children simultaneously, controlling rendering, display, and visibility states through a boolean flag that determines if the group with its descendant components is visible or hidden within the drawing or graphical component hierarchy.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group({
            visible: false
        });

        var pathA = new draw.Path().moveTo(0, 0).lineTo(100, 100);
        var pathB = new draw.Path().moveTo(0, 100).lineTo(100, 0);

        group.append(pathA, pathB);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
        
        // The group will not be visible
        console.log("Group visibility:", group.visible);
    </script>

## Fields

### children `Array`
The children of this group.


<div class="meta-api-description">
How do I access and manipulate the child drawing elements within a Kendo UI DrawingGroup? Control and access the collection of nested drawing elements within a composite graphic object, enabling operations such as iterating over child items, adding new components, removing existing nodes, modifying contained drawings, traversing hierarchical structures, inspecting individual drawing children, configuring group contents dynamically, managing embedded graphics, and manipulating grouped visual elements as a mutable set for flexible rendering workflows.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group();

        var pathA = new draw.Path().moveTo(0, 0).lineTo(100, 100);
        var pathB = new draw.Path().moveTo(0, 100).lineTo(100, 0);

        group.append(pathA, pathB);

        console.log("Number of children:", group.children.length);
        console.log("First child:", group.children[0]);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

## Methods

### append
Appends the specified element as a last child of the group.


<div class="meta-api-description">
How do I add a new drawing to an existing DrawingGroup in Kendo UI for jQuery? Add or insert a new child element to the end of a collection of drawings or visual elements, extend a group by placing another drawing or graphic object as the last item in a sequence, maintain rendering order while including additional visual components, control and expand drawing layers by appending elements ensuring they are rendered after existing ones, modify or build composite graphics by adding items at the tail end of a drawing group or hierarchy, enable dynamic insertion of drawings or visuals at the end of a container, set or update a drawing collection by adding an element as the final child, manage drawing stacks by appending new elements to preserve order and layering in graphics rendering workflows.
</div>

#### Parameters

##### element `kendo.drawing.Element`
The element to append. Multiple parameters are accepted.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group();

        var pathA = new draw.Path().moveTo(0, 0).lineTo(100, 100);
        var pathB = new draw.Path().moveTo(0, 100).lineTo(100, 0);
        var circle = new draw.Circle(new kendo.geometry.Circle([50, 50], 25));

        group.append(pathA, pathB);
        group.append(circle);

        console.log("Group has " + group.children.length + " children");

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

### clear
Removes all child elements from the group.


<div class="meta-api-description">
How do I clear existing drawings from a Kendo UI DrawingGroup? Remove all shapes, graphics, or child elements from a drawing container or group to reset its contents, clear existing drawings, erase or wipe canvas elements, empty the current drawing collection, reset visual elements dynamically during runtime, delete all nested components without destroying the parent container, refresh or prepare the group for new shapes or graphics, clear existing nodes before adding new content, enable reuse of the drawing group by removing prior elements, and control or manage drawing contents programmatically.
</div>

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group();

        var pathA = new draw.Path().moveTo(0, 0).lineTo(100, 100);
        var pathB = new draw.Path().moveTo(0, 100).lineTo(100, 0);

        group.append(pathA, pathB);
        console.log("Children before clear:", group.children.length);

        group.clear();
        console.log("Children after clear:", group.children.length);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

### clip
Gets or sets the group clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element#methods-clip)


<div class="meta-api-description">
How to set a clipping path on a group of drawings in Kendo UI for jQuery? Retrieve or set a clipping path or mask on a group of drawings to control or restrict visible rendering within a specific shape or geometry, enabling the application, adjustment, or removal of clipping boundaries after creation for grouped graphic elements. Configure clipping regions, apply custom masks, modify or access current clip shapes, constrain drawing output to defined geometries, and manage group-level rendering limits with flexible clip setting and retrieval methods.
</div>

#### Parameters

##### clip `kendo.drawing.Path`
The group clipping path.

#### Returns
`kendo.drawing.Path` The current group clipping path.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group();

        var pathA = new draw.Path().moveTo(0, 0).lineTo(100, 100);
        var pathB = new draw.Path().moveTo(0, 100).lineTo(100, 0);
        group.append(pathA, pathB);

        var clipPath = new draw.Path()
            .moveTo(25, 25)
            .lineTo(75, 25)
            .lineTo(75, 75)
            .lineTo(25, 75)
            .close();

        group.clip(clipPath);
        console.log("Current clip path:", group.clip());

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

### clippedBBox
Returns the bounding box of the element with clipping and transformations applied.
Inherited from [Element.clippedBBox](/api/javascript/drawing/element#methods-clippedBBox)


<div class="meta-api-description">
How to get the visible bounding box of a graphic element in Kendo UI after applying all transformations? Retrieve or calculate the axis-aligned bounding rectangle representing the visible area of a drawing or graphic element after applying all geometric transformations such as translation, scaling, rotation, and any clipping or masking effects; useful for determining final rendered bounds for layout adjustments, hit test regions, redraw optimizations, or exporting exact visible extents, enabling developers to accurately control and query how visual content is confined and displayed on screen or in graphics pipelines under combined transforms and clip paths.
</div>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with clipping transformations applied.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group();

        var pathA = new draw.Path().moveTo(0, 0).lineTo(100, 100);
        var pathB = new draw.Path().moveTo(0, 100).lineTo(100, 0);
        group.append(pathA, pathB);

        var bbox = group.clippedBBox();
        console.log("Clipped bounding box:", bbox);
        console.log("Width:", bbox.size.width, "Height:", bbox.size.height);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

### containsPoint
Returns true if the shape contains the specified point.


<div class="meta-api-description">
How do I check if a point is inside a Kendo UI drawing group? Determine if a specific coordinate or point is inside the boundaries, geometry, or shape area of a drawing group for tasks such as hit-testing, detecting clicks or user interactions on visual elements, verifying point containment within vector shapes, enabling selection or collision detection, and spatial queries against complex drawing components where one needs to confirm if a location lies within the rendered graphical group region.
</div>

#### Parameters

##### point `kendo.geometry.Point`
The point that should be checked.

#### Returns
`Boolean` value indicating if the shape contains the point.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group();

        var rect = new draw.Rect(new kendo.geometry.Rect([10, 10], [80, 80]));
        group.append(rect);

        var point = new kendo.geometry.Point(50, 50);
        var contains = group.containsPoint(point);
        console.log("Group contains point (50, 50):", contains);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

### insert
Inserts an element at the specified position.


<div class="meta-api-description">
How do I insert new shapes at a specific position in a DrawingGroup to control their z-order? Insert or add graphical elements, shapes, or drawing objects at a specific position within a collection to control layering, z-order, and rendering sequence in a group of drawings. Enable precise placement of items by index in a collection of visual elements, manage the order of shapes or groups for correct display and interaction, and adjust the stacking or layering of primitives and child drawings for hit-testing and rendering accuracy. Configure the position of new drawing objects within an existing set to ensure they appear and behave exactly where intended in complex visual hierarchies.
</div>

#### Parameters

##### position `Number`
The position to insert the element at. Existing children beyond this position will be shifted right.

##### element `kendo.drawing.Element`
The element to insert.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group();

        var pathA = new draw.Path().moveTo(0, 0).lineTo(100, 100);
        var pathB = new draw.Path().moveTo(0, 100).lineTo(100, 0);
        group.append(pathA, pathB);

        var circle = new draw.Circle(new kendo.geometry.Circle([50, 50], 25));
        group.insert(1, circle);

        console.log("Children count after insert:", group.children.length);
        console.log("Element at position 1:", group.children[1]);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

### opacity
Gets or sets the group opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element#methods-opacity)

The opacity of any child groups and elements will be multiplied by this value.


<div class="meta-api-description">
How do I adjust the opacity of multiple drawings in a Kendo UI drawing group? Adjust, set, or retrieve the transparency level of a collection of drawing elements by controlling group opacity, including configuring or modifying overall translucency for nested or child components, managing alpha or fade effects at the group level, enabling dynamic or programmatic changes to visibility intensity, scaling combined opacity values for grouped visual elements, and applying consistent transparency adjustments across all contained shapes or drawings.
</div>

#### Parameters

##### opacity `Number`
The group opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`Number` The current group opacity.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group();

        var pathA = new draw.Path().moveTo(0, 0).lineTo(100, 100);
        var pathB = new draw.Path().moveTo(0, 100).lineTo(100, 0);
        group.append(pathA, pathB);

        group.opacity(0.5);
        console.log("Current opacity:", group.opacity());

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

### remove
Removes the specified element from the group.


<div class="meta-api-description">
How do I dynamically remove shapes from a grouped drawing in Kendo UI for jQuery? Eliminate or detach specific elements from a collection of grouped drawings or shapes, enabling dynamic updates to the group's composition, layout, and scene structure; control which items remain part of the grouping so they stop participating in collective transformations, rendering processes, or visual updates by removing or excluding child components from the set, helping manage, modify, or reconfigure drawing hierarchies and grouped visual elements effectively.
</div>

#### Parameters

##### element `kendo.drawing.Element`
The element to remove.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group();

        var pathA = new draw.Path().moveTo(0, 0).lineTo(100, 100);
        var pathB = new draw.Path().moveTo(0, 100).lineTo(100, 0);
        group.append(pathA, pathB);

        console.log("Children before remove:", group.children.length);
        group.remove(pathA);
        console.log("Children after remove:", group.children.length);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

### removeAt
Removes the child element at the specified position.


<div class="meta-api-description">
How to remove a specific drawing from a Kendo UI DrawingGroup collection by its index? Delete or remove a child element from a collection by specifying its position or index within a group of drawings or layered graphics. This enables controlling or managing elements by removing them from a list, array, or collection using a zero-based index, helping to reorder, prune, or update the children or components of a composite graphic or drawing container programmatically. Support scenarios where you need to discard, remove at a specific position, update rendering by deleting an element by index, or manipulate graphical element collections dynamically through indexed removal operations.
</div>

#### Parameters

##### index `Number`
The index at which the element currently resides.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group();

        var pathA = new draw.Path().moveTo(0, 0).lineTo(100, 100);
        var pathB = new draw.Path().moveTo(0, 100).lineTo(100, 0);
        var circle = new draw.Circle(new kendo.geometry.Circle([50, 50], 25));
        group.append(pathA, pathB, circle);

        console.log("Children before removeAt:", group.children.length);
        group.removeAt(1); // Remove pathB
        console.log("Children after removeAt:", group.children.length);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

### visible
Gets or sets the visibility of the element.


<div class="meta-api-description">
How do I show or hide a drawing group in Kendo UI for jQuery? Control and query the visibility state of a graphical group within a drawing, enabling toggling of rendering, hit testing, and event participation; check if a drawing group is currently shown or hidden, set visibility to true or false to display or conceal the element in user interfaces, configure whether the group is visible for interaction or fully transparent to hit detection, dynamically enable or disable visual representation and input response of grouped graphics, and adjust rendering behavior programmatically to manage display and event handling.
</div>

#### Parameters

##### visible `Boolean`
A flag indicating if the element should be visible.

#### Returns
`Boolean` true if the element is visible; false otherwise.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var group = new draw.Group();

        var pathA = new draw.Path().moveTo(0, 0).lineTo(100, 100);
        var pathB = new draw.Path().moveTo(0, 100).lineTo(100, 0);
        group.append(pathA, pathB);

        console.log("Initial visibility:", group.visible());
        group.visible(false);
        console.log("After setting visible to false:", group.visible());

        var surface = draw.Surface.create($("#surface"));
        surface.draw(group);
    </script>

