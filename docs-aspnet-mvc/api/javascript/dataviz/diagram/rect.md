---
title: Rect
---

# kendo.dataviz.diagram.Rect
Describes the width, height, and location of a rectangle.

## Configuration

### height `Number`
Sets the height of the rectangle.

### width `Number`
Sets the width of the rectangle.

### x `Number`
The x-coordinate of the top-left corner of the rectangle.

### y `Number`
The y-coordinate of the top-left corner of the rectangle.

## Methods

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
