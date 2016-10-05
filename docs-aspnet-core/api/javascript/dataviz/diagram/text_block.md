---
title: TextBlock
---

# kendo.dataviz.diagram.TextBlock

A non-wrapping text element with optional background.

## Configuration

### color `String`

The text color of the text block.

### fontFamily `String`

The font family of the text block.

### fontSize `Number`

The font size of the text block.

### fontStyle `String`

The font style of the text block.

### fontWeight `String`

The font weight of the text block.

### height `Number`

The height of the text block.

### text `String`

The content of the text block.

### width `Number`

The width of the text block.

### x `Number`

The X position of the top-left corner of the text block.

### y `Number`

The Y position of the top-left corner of the text block.

## Fields

### drawingElement `kendo.drawing.Text`

The drawing element used to draw the text.

## Methods

### content
Gets or sets the text block content.

#### Parameters

##### content `String`
The new text content.

#### Returns
`String` the current text content.


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
