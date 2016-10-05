---
title: GradientStop
page_title: API reference for Kendo UI Drawing API GradientStop
---

# kendo.drawing.GradientStop : kendo.Class
Represents a gradient color stop.

## Constructor Parameters

### options `Object`
The configuration of this GradientStop.

## Configuration

### offset `Number`
The stop offset from the start of the element.
Ranges from 0 (start of gradient) to 1 (end of gradient).

### color `String`
The color in any of the following formats.

| Format         | Description
| ---            | --- | ---
| red            | [Basic](http://www.w3.org/TR/css3-color/#html4) or [Extended](http://www.w3.org/TR/css3-color/#svg-color) CSS Color name
| #ff0000        | Hex RGB value
| rgb(255, 0, 0) | RGB value

Specifying 'none', 'transparent' or '' (empty string) will clear the fill.

### opacity `Number`
The fill opacity.
Ranges from 0 (completely transparent) to 1 (completely opaque).

## Fields

### options `kendo.drawing.OptionsStore`
The configuration options of the gradient stop.

