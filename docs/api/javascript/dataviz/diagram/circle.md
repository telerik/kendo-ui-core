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

### fill.gradient `Object`

Defines the gradient fill of the shape.

### fill.gradient.type `String` *(default: "linear")*
The type of the gradient. Supported values are:

* linear
* radial

Note that support for radial gradients in VML (IE8 and below) is limited.
Not all configurations are guaranteed to work.

### fill.gradient.center `Array`
The center of the radial gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

### fill.gradient.radius `Number` *(default: 1)*
The radius of the radial gradient relative to the shape bounding box.

### fill.gradient.start `Array`
The start point of the linear gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

### fill.gradient.end `Array`
The end point of the linear gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

### fill.gradient.stops `Array`
The array of gradient color stops.

### fill.gradient.stops.offset `Number`
The stop offset from the start of the element.
Ranges from 0 (start of gradient) to 1 (end of gradient).

### fill.gradient.stops.color `String`
The color in any of the following formats.

| Format         | Description
| ---            | --- | ---
| red            | [Basic](http://www.w3.org/TR/css3-color/#html4) or [Extended](http://www.w3.org/TR/css3-color/#svg-color) CSS Color name
| #ff0000        | Hex RGB value
| rgb(255, 0, 0) | RGB value

Specifying 'none', 'transparent' or '' (empty string) will clear the fill.

### fill.gradient.stops.opacity `Number`
The fill opacity.
Ranges from 0 (completely transparent) to 1 (completely opaque).

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

## Fields

### drawingElement `kendo.drawing.Circle`

The drawing element used to draw the circle.

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
