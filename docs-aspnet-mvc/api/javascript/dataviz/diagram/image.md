---
title: Image
---

# kendo.dataviz.diagram.Image

Represents a bitmap image loaded from source URL.

## Configuration

### height `Number`

The height of the image.

### width `Number`

The width of the image.

### x `Number`

The X position of the top-left corner of the element.

### y `Number`

The Y position of the top-left corner of the element.

### source `String`

The source URL of the image.

## Fields

### drawingElement `kendo.drawing.Image`

The drawing element used to draw the image.

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
