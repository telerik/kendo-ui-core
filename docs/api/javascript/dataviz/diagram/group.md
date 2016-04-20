---
title: Group
---

# kendo.dataviz.diagram.Group

This represents an invisible, grouping element with visual children. Groups can be nested to form a hierarchy.

## Configuration

### x `Number`

The X position of the top-left corner of the group.

### y `Number`

The Y position of the top-left corner of the group.

## Fields

### drawingElement `kendo.drawing.Group`

The drawing element used to draw the group.

## Methods

### append
Appends the given element to the group

#### Parameters

##### element `Object`
The element to append.

### clear
Removes all elements from the group.

### remove
Removes the given element from the group

#### Parameters

##### element `Object`
The element to remove.


### position
Get or sets the element position.

#### Parameters

##### offset `kendo.dataviz.diagram.Point`
The origin of the element.


### rotate
Rotates the element with the specified parameters.

#### Parameters

##### angle `Number`
The angle of rotation in decimal degrees.
Measured in clockwise direction with 0 pointing "right".
Negative values or values greater than 360 will be normalized.

##### center `kendo.dataviz.diagram.Point`
The center of rotation.


### visible
Gets or sets the visibility of the current element.

#### Parameters

##### visible `Boolean`
The new visibility state.

#### Returns
`Boolean` True if the element is visible, false otherwise.
