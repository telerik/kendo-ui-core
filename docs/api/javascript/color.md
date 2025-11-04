---
title: Color
page_title: API Reference for Kendo Color
description: Documentation how to get started with the kendo.Color object. Find examples and guidelines for methods, fields and events of kendo.Color.
res_type: api
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
255) or as [HSV](https://en.wikipedia.org/wiki/HSL_and_HSV).  They all
support transparency via the last argument, a float between 0 and 1.  If
missing it will default to 1 (fully opaque).

If you are not certain which representation is used internally for a
particular color object, you can convert it to the one you need using one of
the methods below.

## Methods

### diff

Computes the relative luminance between two colors.


<div class="meta-api-description">
How do I calculate the contrast ratio between two colors in Kendo UI using the `Color.diff()` method? Calculate and compare the brightness difference or contrast ratio between two colors to evaluate visual accessibility, assess relative luminance, determine color contrast compliance with standards like WCAG, measure lightness disparities, and enable programmatic checks for sufficient contrast in UI design or color schemes. This function supports inputting any two colors to return a numeric value representing the luminance gap, useful for ensuring readability, controlling color visibility, validating design contrast requirements, or dynamically comparing color brightness levels in applications.
</div>

#### Returns

`Number` The relative luminance.

#### Example

    <script>
    var red = kendo.parseColor("#ff0000");

    var crimson = kendo.parseColor("#dc143c");
    var pink = kendo.parseColor("#ffc0cb");
    var white = kendo.parseColor("#ffffff");

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(red.diff(crimson)); // logs 17.118
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(red.diff(pink));    // logs 115.459
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(red.diff(white));   // logs 153.042
    </script>

### equals

Compares two color objects for equality.


<div class="meta-api-description">
How do I check if two color objects in Kendo UI have the same value? Check if two color objects are the same by comparing their color values, determine color equality for matching or filtering colors, identify duplicates in color collections, verify if colors have changed, or validate that two color instances represent identical hues using equality comparison methods for colors.
</div>

#### Returns

`Boolean` returns `true` if the two colors are the same. Otherwise, `false`

#### Example

    <script>
    var red = kendo.Color.fromRGB(1,0,0);
    var green = kendo.Color.fromRGB(0,1,0);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(red.equals(green)); // logs false

    var opaqueRed = kendo.Color.fromBytes(255,0,0,1);
	/* The result can be observed in the DevTools(F12) console of the browser. */
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


<div class="meta-api-description">
How to convert RGB color values to HSV in Kendo UI? Convert any color to its hue-saturation-value-alpha (HSVA) format to access or extract hue degrees, saturation ratios, brightness levels, and transparency values for tasks like color adjustments, dynamic UI components, color picker integration, visual effects, or color space transformations. Enable retrieving and manipulating color properties as numeric values or objects for use in styling, comparisons, blending, or graphical controls without altering the original color data. Whether you need HSV conversion for design tools, theme customization, or programmatic color analysis, this method provides precise HSVA components formatted for flexible usage and color workflow integration.
</div>

#### Returns
`Object` An object with h, s, v and a fields.

#### Example

    <script>
    var color = kendo.parseColor("#ff0000");
    var hsvColor = color.toHSV();
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(hsvColor); // logs {h: 0, s: 1, v: 1, a: 1}
    </script>

### toRGB

Returns the color in RGB representation.  The result has the following
properties:

- `r` -- red component as floating point between 0 and 1
- `g` -- green component
- `b` -- blue component
- `a` -- alpha

This does not modify the current object, it creates a new one instead.


<div class="meta-api-description">
How do I extract red, green, blue, and alpha channel values from a Kendo UI color object? Convert a color value to its numeric red, green, blue, and alpha components represented as floating-point numbers between 0 and 1, enabling extraction of explicit RGBA channels from any color object for tasks like color manipulation, filtering, or blending; retrieve individual channel intensities in a structured format without altering the original color, useful for converting colors into numeric arrays, accessing transparency levels, or preparing color data for graphics processing and shader inputs.
</div>

#### Returns

`Object` An object with r, g, b and a fields.

#### Example

    <script>
    var color = kendo.parseColor("#ff0000");
    var rgbColor = color.toRGB();
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(rgbColor); // logs {r: 1, g: 0, b: 0, a: 1}
    </script>

### toBytes

Returns the color in "Bytes" representation.  It has the same properties as
RGB, but `r`, `g` and `b` are integers between 0 and 255 instead of floats.

This does not modify the current object, it creates a new one instead.


<div class="meta-api-description">
How do I convert a floating-point RGB color to an integer-based byte format in Kendo UI? Transform a floating-point RGB color representation into an integer-based format with red, green, and blue channels scaled from 0 to 255, enabling conversion between decimal color values and byte-level color components, extracting color values as integer RGB objects for image processing, graphics manipulation, or serialization tasks, generating new color objects with integer RGB channels without altering the original color data, and facilitating workflows requiring precise integer color channel handling or byte array creation from color objects.
</div>

#### Returns
`Object` An object with r, g and b fields.

#### Example

    <script>
    var color = kendo.parseColor("#ff0000");
    var bytesColor = color.toBytes();
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(bytesColor); // logs {r: 255, g: 0, b: 0, a: 1}
    </script>

### toHex

Returns a string in `"FF0000"` form (without a leading `#`).


<div class="meta-api-description">
How to convert a color in Kendo UI to a six-character hex string? Convert color values into compact six-character hexadecimal strings commonly used in CSS styling, color serialization, or color comparison tasks without the leading '#' symbol. Generate hex codes for colors to enable easy transmission, storage, or matching of color data in formats like "FF0000" for red. Transform color representations into standard hex format for use in web design, data exchange, and string-based color operations, supporting tasks like formatting, encoding, or comparing color objects in hex notation.
</div>

#### Returns

`String` The color in hex notation.

#### Example

    <script>
    var color = kendo.parseColor("#ff0000");
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(color.toHex()); // logs "ff0000"
    </script>

### toCss

Like `toHex`, but includes a leading `#`.


<div class="meta-api-description">
How do I convert a Kendo UI color object to a hexadecimal string for use in CSS styles? Generate a hexadecimal color string prefixed with a hash symbol for use in CSS styles, convert color objects to web-compatible hex codes, obtain CSS-ready color values from color instances, produce strings formatted for CSS color properties, enable converting color data into standard #RRGGBB format for style assignments, set colors in HTML or stylesheet contexts using hex notation, translate color representations to CSS hex strings, create web-friendly color strings from color instances, output color codes for use in inline styles or CSS files, and format colors as hash-prefixed hexadecimal strings compatible with CSS color specifications.
</div>

#### Returns

`String` The color in CSS notation.

#### Example

    <script>
    var color = kendo.parseColor("#ff0000");
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(color.toCss()); // logs "#ff0000"
    </script>

### toCssRgba

Returns the color in RGBA notation (includes the opacity).


<div class="meta-api-description">
How to convert a color object to RGBA string in Kendo UI for jQuery? Convert a color object to a CSS-ready RGBA string representation that includes red, green, blue, and alpha transparency components, enabling seamless integration into inline styles, CSS rules, canvas rendering, or dynamic style updates; generate the "rgba(r,g,b,a)" format for assigning colors with opacity, serializing color values for stylesheets, or applying precise transparency in web design and graphics contexts.
</div>

#### Returns

`String` The color in RGBA notation.

#### Example

    <script>
    var color = kendo.parseColor("#ff0000");
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(color.toCssRgba()); // logs "rgba(255, 0, 0, 1)"
    
    var transparentColor = kendo.Color.fromRGB(1, 0, 0, 0.5);
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(transparentColor.toCssRgba()); // logs "rgba(255, 0, 0, 0.5)"
    </script>

### toDisplay

Returns the color in the best notation supported by the current browser.  In
IE < 9 this returns the `#FF0000` form; in all other browsers it returns the
RGBA form.


<div class="meta-api-description">
How can I convert Kendo UI color objects to compatible CSS color strings for different browsers? Convert color objects to browser-compatible CSS color strings, automatically choosing the optimal format such as legacy hex codes like #FF0000 for older browsers or modern RGBA strings for enhanced color precision and transparency support, enabling developers to retrieve display-ready CSS color values adaptable to different browser environments and rendering capabilities.
</div>

#### Returns

`String` The color in the best notation supported by the current browser.

#### Example

    <script>
    var color = kendo.parseColor("#ff0000");
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(color.toDisplay()); // logs "rgba(255, 0, 0, 1)" in modern browsers
    </script>


## Fields

### r `Number`

The red channel of the color, in the range from 0 to 1.


<div class="meta-api-description">
How to set red intensity in a color component with Kendo UI for jQuery? Adjust, set, or retrieve the red channel intensity in a color component using a normalized value between 0 and 1; customize or manipulate the amount of red for color blending, RGBA color adjustments, fine-tuning hues, or dynamic color transformations by reading or updating this red intensity value within color objects.
</div>

#### Example

    <script>
    var color = kendo.parseColor("#ff0000");
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(color.r); // logs 1
    
    var greenColor = kendo.parseColor("#00ff00");
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(greenColor.r); // logs 0
    </script>

### g `Number`

The green channel of the color, in the range from 0 to 1.


<div class="meta-api-description">
How to adjust green intensity in an RGBA color value using Kendo UI? Control or retrieve the green color intensity in a color value by setting or reading the green channel, typically represented as a normalized value between 0 and 1, where 0 means no green and 1 means full green intensity. Adjust or configure the green component in RGBA colors for fine-tuning color blending, shading, or color correction in graphic, UI, or rendering contexts. Modify the green channel alongside red, blue, and alpha channels to achieve precise color manipulation, saturation control, or color composition in applications, shaders, or color transformations.
</div>

#### Example

    <script>
    var color = kendo.parseColor("#00ff00");
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(color.g); // logs 1
    
    var redColor = kendo.parseColor("#ff0000");
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(redColor.g); // logs 0
    </script>

### b `Number`

The blue channel of the color, in the range from 0 to 1.


<div class="meta-api-description">
How do I access or modify the blue color intensity in a Kendo UI color object? Access or modify the blue color intensity component in a color object, enabling retrieval, adjustment, or comparison of the blue channel value within RGB color models using normalized floating-point numbers from zero to one. Control blue saturation or brightness, set precise RGB blue levels, read current blue intensity for color manipulation, or configure color blending and rendering based on the blue channel value. This supports tasks like dynamic color adjustments, color matching, and fine-tuning blue shades in gradients or digital graphics workflows.
</div>

#### Example

    <script>
    var color = kendo.parseColor("#0000ff");
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(color.b); // logs 1
    
    var redColor = kendo.parseColor("#ff0000");
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(redColor.b); // logs 0
    </script>


## Static Methods

### fromRGB

Creates a new color object from the rgba channels in the 0..1 range.


<div class="meta-api-description">
How can I create a color in Kendo UI with specific red, green, blue, and alpha values? Generate or define colors by specifying red, green, blue, and alpha channels using normalized values between 0 and 1 for precise color creation, conversion, or manipulation. Configure colors from fractional RGBa components to programmatically set or update hues, tints, transparency levels, and opacity with fine-grained control over color channels in normalized form. Enable color construction, blending, or dynamic color adjustments by inputting normalized floating-point values for red, green, blue, and alpha, useful for color computations, transformations, or UI theming. Use normalized channel values to create color instances that support real-time color changes, shading calculations, and compositing with precise alpha transparency handling.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(color.toCss()); // logs "#ff0000"

    color = kendo.Color.fromRGB(0,1,0,1);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(color.toCssRgba()); // logs "rgba(0, 255, 0, 1)"
    </script>

### fromHSV

Creates a new color object from the hsva channels in the 0..1 range.


<div class="meta-api-description">
How can I create custom colors with transparency using HSV values in Kendo UI for jQuery? Generate or instantiate colors by specifying hue, saturation, value, and alpha using normalized values between 0 and 1, enabling precise control over color creation from HSVA channels for custom color manipulation, dynamic color generation, and runtime color adjustments with transparency and vividness settings.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(color.toCss()); // logs "#804140"

    color = kendo.Color.fromHSV(.5,1,.5,1);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(color.toCssRgba()); // logs "rgba(128, 1, 0, 1)"
    </script>

### fromBytes

Creates a new color object from the rgba channels in the 0..255 range.


<div class="meta-api-description">
How do I convert byte arrays to a usable color object in Kendo UI for jQuery? Generate or build a color using separate red, green, blue, and alpha channel values expressed as integers from 0 to 255, enabling conversion from byte arrays, image data, network streams, or binary inputs into a usable color object; configure or set color components based on raw RGBA bytes to represent transparency and color intensity accurately for UI elements, graphical rendering, or color manipulation tasks where byte-level color data is provided or needs decoding.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(color.toCss()); // logs "#0000ff"

    color = kendo.Color.fromBytes(255,255,0,.5);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(color.toCssRgba()); // logs "rgba(255, 255, 0, 0.5)"
    </script>
