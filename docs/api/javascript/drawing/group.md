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

