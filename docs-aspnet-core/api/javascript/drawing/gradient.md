---
title: Gradient
page_title: API reference for Kendo UI Drawing API Gradient
---

# kendo.drawing.Gradient : kendo.Class
An abstract base class representing common members of all drawing elements.

## Constructor Parameters

### options `Object`
The configuration of this Group.

## Configuration

### stops `Array`
The color stops of the gradient.
Can contain either plain objects or [GradientStop](gradient-stop) instances.

## Fields

### stops `Array`
The array of gradient color stops.
Contains [GradientStop](gradient-stop) instances.

### options `kendo.drawing.OptionsStore`
The configuration options of the gradient.

## Methods

### addStop
Adds a color stop to the gradient.

#### Parameters

##### offset `Number`
The stop offset from the start of the element.
Ranges from 0 (start of gradient) to 1 (end of gradient).

##### color `String`
The color in any of the following formats.

| Format         | Description
| ---            | --- | ---
| red            | [Basic](http://www.w3.org/TR/css3-color/#html4) or [Extended](http://www.w3.org/TR/css3-color/#svg-color) CSS Color name
| #ff0000        | Hex RGB value
| rgb(255, 0, 0) | RGB value

Specifying 'none', 'transparent' or '' (empty string) will clear the fill.

##### opacity `Number`
The fill opacity.
Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`kendo.drawing.GradientStop` The new gradient color stop.


### removeStop
Removes a color stop from the gradient.

#### Parameters

##### stop `kendo.drawing.GradientStop`
The gradient color stop to remove.

