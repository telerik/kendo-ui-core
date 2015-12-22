---
title: Group
page_title: API reference for Kendo UI Drawing API Group
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

## Configuration

### clip `kendo.drawing.Path`
The group clipping path.
Inherited from [Element.clip](element#configuration-clip)

### cursor `String`
The group cursor.
Inherited from [Element.cursor](element#configuration-cursor)

### opacity `Number`
The group opacity.
Inherited from [Element.opacity](element#configuration-opacity)

The opacity of any child groups and elements will be multiplied by this value.

### pdf `kendo.drawing.PDFOptions`
Page options to apply during PDF export.

### transform `kendo.geometry.Transformation`
The transformation to apply to this group and its children.
Inherited from [Element.transform](element#configuration-transform)

### visible `Boolean`
A flag, indicating if the group and its children are visible.
Inherited from [Element.visible](element#configuration-visible)

## Fields

### children `Array`
The children of this group.

## Methods

### append
Appends the specified element as a last child of the group.

#### Parameters

##### element `kendo.drawing.Element`
The element to append. Multiple parameters are accepted.


### clear
Removes all child elements from the group.


### clip
Gets or sets the group clipping path.
Inherited from [Element.clip](element#methods-clip)

#### Parameters

##### clip `kendo.drawing.Path`
The group clipping path.

#### Returns
`kendo.drawing.Path` The current group clipping path.


### clippedBBox
Returns the bounding box of the element with clipping and transformations applied.
Inherited from [Element.clippedBBox](element#methods-clippedBBox)

#### Returns
`kendo.geometry.Rect` The bounding box of the element with clipping transformations applied.


### insert
Inserts an element at the specified position.

#### Parameters

##### position `Number`
The position to insert the element at. Existing children beyond this position will be shifted right.

##### element `kendo.drawing.Element`
The element to insert.


### opacity
Gets or sets the group opacity.
Inherited from [Element.opacity](element#methods-opacity)

The opacity of any child groups and elements will be multiplied by this value.

#### Parameters

##### opacity `Number`
The group opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`Number` The current group opacity.


### remove
Removes the specified element from the group.

#### Parameters

##### element `kendo.drawing.Element`
The element to remove.


### removeAt
Removes the child element at the specified position.

#### Parameters

##### index `Number`
The index at which the element currently resides.


### visible
Gets or sets the visibility of the element.

#### Parameters

##### visible `Boolean`
A flag indicating if the element should be visible.

#### Returns
`Boolean` true if the element is visible; false otherwise.

