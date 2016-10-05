---
title: Layout
---

# kendo.dataviz.diagram.Layout

Represents a grouping element that arranges its children.

## Constructor Parameters

### rect `kendo.dataviz.diagram.Rect`

The rectangle within which the children should be arranged

### options `Object`

The configuration options of the layout.

## Configuration

### alignContent `String` *(default: "start")*

Specifies the alignment of the content.

### alignItems `String` *(default: "start")*

Specifies the alignment of the items based on each other.

### justifyContent `String` *(default: "start")*

Specifies how should the content be justified.

### lineSpacing `Number` *(default: 0)*

Specifies the distance between the lines for wrapped layout.

### spacing `Number` *(default: 0)*

Specifies the distance between the elements.

### orientation `String` *(default: "horizontal")*

Specifies the layout orientation. The supported values are:

* "horizontal" - the elements are arranged horizontally
* "vertical" - the elements are arranged vertically

### wrap `Boolean` *(default: true)*

Specifies the behavior when the elements size exceeds the rectangle size. If set to true, the elements will be moved to the next "line". If set to false, the layout will be scaled so that the elements fit in the rectangle.

## Fields

### drawingElement `kendo.drawing.Layout`

The drawing element used to draw the layout.

## Methods

### append
Appends the given element to the group

#### Parameters

##### element `Object`
The element to append.

### clear
Removes all elements from the group.

### rect
Gets or sets the layout rectangle.

#### Parameters

##### rect `kendo.dataviz.diagram.Rect`
The layout rectangle.

#### Returns
`kendo.dataviz.diagram.Rect` The current rectangle.

### reflow
Arranges the elements based on the current options.

### remove
Removes the given element from the group

#### Parameters

##### element `Object`
The element to remove.

### visible
Gets or sets the visibility of the current element.

#### Parameters

##### visible `Boolean`
The new visibility state.

#### Returns
`Boolean` True if the element is visible, false otherwise.
