---
title: Color
page_title: API Reference for Kendo Color
description: Documentation how to get started with the kendo.Color object. Find examples and guidelines for methods, fields and events of kendo.Color.
---

# kendo.Color

These objects can be used to manipulate colors.  You cannot instantiate a
`Color` object directly, instead you should use `kendo.parseColor` or one of
the functions below:

    var red = kendo.Color.fromRGB(1, 0, 0, 1);
    var blue = kendo.Color.fromBytes(0, 0, 255, 1);
    var green = kendo.Color.fromHSV(120, 1, 1, 1);

We support three color representations: as RGB (where the values are float
numbers between 0 and 1), as Bytes (where values are integers between 0 and
255) or as [HSV](http://en.wikipedia.org/wiki/HSL_and_HSV).  They all
support transparency via the last argument, a float between 0 and 1.  If
missing it will default to 1 (fully opaque).

If you are not certain which representation is used internally for a
particular color object, you can convert it to the one you need using one of
the methods below.

## Methods

### diff

Computes the relative luminance between two colors.

#### Returns

`Number` The relative luminance.

#### Example

    <script>
    var red = kendo.parseColor("#ff0000");

    var crimson = kendo.parseColor("#dc143c");
    var pink = kendo.parseColor("#ffc0cb");
    var white = kendo.parseColor("#ffffff");

    console.log(red.diff(crimson)); // logs 17.118
    console.log(red.diff(pink));    // logs 115.459
    console.log(red.diff(white));   // logs 153.042
    </script>

### equals

Compares two color objects for equality.

#### Returns

`Boolean` returns `true` if the two colors are the same. Otherwise, `false`

#### Example

    <script>
    var red = kendo.Color.fromRGB(1,0,0);
    var green = kendo.Color.fromRGB(0,1,0);
    console.log(red.equals(green)); // logs false

    var opaqueRed = kendo.Color.fromBytes(255,0,0,1);
    console.log(red.equals(opaqueRed)); // logs true
    </script>

### toHSV

Returns the color in HSV representation.  As HSV object, it has the
following properties:

- `h` -- hue, an integer between 0 and 360
- `s` -- saturation, floating point between 0 and 1
- `v` -- value, floating point between 0 and 1
- `a` -- alpha, floating point between 0 and 1

This does not modify the current object, it creates a new one instead.

#### Returns
`Object` An object with h, s, v and a fields.

### toRGB

Returns the color in RGB representation.  The result has the following
properties:

- `r` -- red component as floating point between 0 and 1
- `g` -- green component
- `b` -- blue component
- `a` -- alpha

This does not modify the current object, it creates a new one instead.

#### Returns

`Object` An object with r, g, b and a fields.

### toBytes

Returns the color in "Bytes" representation.  It has the same properties as
RGB, but `r`, `g` and `b` are integers between 0 and 255 instead of floats.

This does not modify the current object, it creates a new one instead.

#### Returns
`Object` An object with r, g and b fields.

### toHex

Returns a string in `"FF0000"` form (without a leading `#`).

#### Returns

`String` The color in hex notation.

### toCss

Like `toHex`, but includes a leading `#`.

#### Returns

`String` The color in CSS notation.

### toCssRgba

Returns the color in RGBA notation (includes the opacity).

#### Returns

`String` The color in RGBA notation.

### toDisplay

Returns the color in the best notation supported by the current browser.  In
IE < 9 this returns the `#FF0000` form; in all other browsers it returns the
RGBA form.

#### Returns

`String` The color in the best notation supported by the current browser.


## Fields

### r `Number`

The red channel of the color, in the range from 0 to 1.

### g `Number`

The green channel of the color, in the range from 0 to 1.

### b `Number`

The blue channel of the color, in the range from 0 to 1.


## Static Methods

### fromRGB

Creates a new color object from the rgba channels in the 0..1 range.

#### Parameters

##### red `Number`

The red channel of the color, in the range from 0 to 1.

##### green `Number`

The green channel of the color, in the range from 0 to 1.

##### blue `Number`

The blue channel of the color, in the range from 0 to 1.

##### alpha `Number` *(optional)*

The alpha channel of the color, in the range from 0 to 1. Defaults to 1 when omitted.

#### Returns

`kendo.Color` A new object that represents the color with the passed color coordinates

#### Example - get the level of the node

    <script>
    var color = kendo.Color.fromRGB(1,0,0);
    console.log(color.toCss()); // logs "#ff0000"

    color = kendo.Color.fromRGB(0,1,0,1);
    console.log(color.toCssRgba()); // logs "rgba(0, 255, 0, 1)"
    </script>

### fromHSV

Creates a new color object from the hsva channels in the 0..1 range.

#### Parameters

##### hue `Number`

The hue channel of the color, in the range from 0 to 1.

##### saturation `Number`

The saturation channel of the color, in the range from 0 to 1.

##### value `Number`

The value channel of the color, in the range from 0 to 1.

##### alpha `Number` *(optional)*

The alpha channel of the color, in the range from 0 to 1. Defaults to 1 when omitted.

#### Returns

`kendo.Color` A new object that represents the color with the passed color coordinates

#### Example - get the level of the node

    <script>
    var color = kendo.Color.fromHSV(1,.5,.5);
    console.log(color.toCss()); // logs "#804140"

    color = kendo.Color.fromHSV(.5,1,.5,1);
    console.log(color.toCssRgba()); // logs "rgba(128, 1, 0, 1)"
    </script>

### fromBytes

Creates a new color object from the rgba channels in the 0..255 range.

#### Parameters

##### red `Number`

The red channel of the color, in the range from 0 to 255.

##### green `Number`

The green channel of the color, in the range from 0 to 255.

##### blue `Number`

The blue channel of the color, in the range from 0 to 255.

##### alpha `Number` *(optional)*

The alpha channel of the color, in the range from 0 to 1. Defaults to 1 when omitted.

#### Returns

`kendo.Color` A new object that represents the color with the passed color coordinates

#### Example - get the level of the node

    <script>
    var color = kendo.Color.fromBytes(0,0,255);
    console.log(color.toCss()); // logs "#0000ff"

    color = kendo.Color.fromBytes(255,255,0,.5);
    console.log(color.toCssRgba()); // logs "rgba(255, 255, 0, 0.5)"
    </script>
