---
title: Rectangle
---

# kendo.dataviz.diagram.Rectangle

Represents a rectangle.

## Configuration

### fill `String|Object`

Defines the fill options of the rectangle.

### fill.color `String`

Defines the fill color of the rectangle.

### fill.opacity `Number` *(default: 1)*

Defines the fill opacity of the rectangle.

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

### height `Number`

Sets the height of the rectangle.

### stroke `Object`

Defines the stroke configuration.

### stroke.color `String`

Defines the line color of the rectangle.

### stroke.width `Number`

Defines the stroke width of the rectangle.

### width `Number`

Sets the width of the rectangle.

### x `Number`

The X position of the top-left corner of the rectangle.

### y `Number`

The Y position of the top-left corner of the rectangle.

## Fields

### drawingElement `kendo.drawing.Path`

The drawing element used to draw the rectangle.

## Methods

### visible

Gets or sets the visibilty of the current element.

#### Parameters

##### visible `Boolean`

The new visibility state.

#### Returns

`Boolean` True if the element is visible, false otherwise.
