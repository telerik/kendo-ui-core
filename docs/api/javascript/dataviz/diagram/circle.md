---
title: Circle
---

# kendo.dataviz.diagram.Circle

Represents a circle.

## Configuration

### fill `String|Object`

Defines the fill options of the circle.

### fill.color `String`

Defines the fill color of the circle.

### fill.opacity `Number` *(default: 1)*

Defines the fill opacity of the circle.

### stroke `Object`

Defines the stroke configuration.

### stroke.color `String`

Defines the stroke color of the circle.

### stroke.width `Number`

Defines the stroke width of the circle.

### center `Object`

The center of the circle.

#### x `Number`

The X position of the circle center.

#### y `Number`

The Y position of the circle center.

### radius `Number`

The radius of the circle.

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
