---
title: ColorPalette
page_title: Configuration, methods and events of Kendo UI ColorPalette
res_type: api
---

# kendo.ui.ColorPalette

This is the widget used by the color picker to display the simple,
web-safe, or a custom color palette.  You can use it independently if
you need such a widget directly in the page somewhere, rather than in
a drop-down.

## Configuration

### palette `String|Array` *(default: "basic")*

Specifies the color palette to display.
It can be a string with comma-separated colors in hex representation, an array of [`kendo.Color` object](/api/javascript/color) objects or of strings that [parseColor](/api/javascript/kendo#parseColor) understands.  As a shortcut, you can pass "basic" to get the simple palette (this is the default) or "websafe" to get the Web-safe palette.


<div class="meta-api-description">
How to customize the color options in Kendo UI ColorPalette component? Set and customize the set of colors shown in the color picker by specifying color values in various formats such as comma-separated hexadecimal codes, arrays of color objects, or string representations compatible with standard color parsing methods; you can also quickly select predefined palettes like basic or web-safe color collections, control which color options are available for selection, and configure how color data is supplied and interpreted for flexible, dynamic color selection scenarios in design and UI components.
</div>

#### Example - use "websafe" palette

    <div id="palette"></div>
    <script>
    $("#palette").kendoColorPalette({
      palette: "websafe"
    });
    </script>

#### Example - use list of colors

    <div id="palette"></div>
    <script>
    $("#palette").kendoColorPalette({
      palette: [ "#000", "#333", "#666", "#999", "#ccc", "#fff" ],
      columns: 6
    });
    </script>

### columns `Number` *(default: 10)*

The number of columns to display.  When you use the "websafe" palette, this will automatically default to 18.


<div class="meta-api-description">
How do I change the number of columns in a Kendo UI ColorPalette? Customize the number of color swatches shown in each row to control the grid layout, visual density, and wrapping behavior in a color selection interface. Adjust how many columns appear to organize color options horizontally, set rows by changing the column count, enable tighter or broader spacing of swatches, and configure grid width for palettes including standard web-safe colors or custom sets. Manage swatch arrangement and responsive visual presentation by specifying grid column counts to optimize user interface and ease of color browsing or picking tasks.
</div>

#### Example - wrap list of colors on two rows with 3 columns

    <div id="palette"></div>
    <script>
    $("#palette").kendoColorPalette({
      palette: [ "#000", "#333", "#666", "#999", "#ccc", "#fff" ],
      columns: 3
    });
    </script>

### size `String`*(default: undefined)*

Sets a value controlling size of the component. When `undefined` (the default), the theme controls the default size. Can also be set to the following string values:

- "small"
- "medium"
- "large"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How to adjust swatch dimensions in Kendo UI ColorPalette? Adjust or configure swatch dimensions and spacing for color palettes to customize tile sizes in various user interface layouts, enabling control over how compact or spacious the color selection appears; set fixed numeric sizes or predefined options like small, medium, large, or no swatches to fit different design needs, responsive layouts, or UI density preferences, allowing developers to tailor color picker components for optimal visual arrangement and usability across diverse screen sizes and style requirements.
</div>

#### Example

    <div id="colorpalette"></div>
    <script>
    $("#colorpalette").kendoColorPalette({
      size: "small"
    });
    </script>


### tileSize `Number | Object` *(default: 14)*

The size of a color cell.


<div class="meta-api-description">
How do I adjust the size of individual color swatches in a Kendo UI ColorPalette? Adjust the size of individual color swatches or tiles by specifying their width and height in pixels, controlling how large each color cell appears in the palette grid and influencing the touch target area for easier interaction. Configure the pixel dimensions of color blocks to customize layout density, spacing between colors, visual scale of the palette, and usability on different screen sizes or input methods. Set or modify swatch dimensions to optimize the appearance and accessibility of color options, making the palette more compact, spacious, larger for touch devices, or tailored to design preferences and interface responsiveness.
</div>

#### Example

    <div id="palette"></div>
    <script>
    $("#palette").kendoColorPalette({
      palette: "basic",
      tileSize: 32
    });
    </script>

### tileSize.width `Number` *(default: 14)*

The width of the color cell.


<div class="meta-api-description">
How do I set the width of each color swatch in a Kendo UI ColorPalette? Adjust, configure, or set the width dimension of individual color tiles or cells within a color palette to control layout spacing, alignment, or visual sizing of palette entries, allowing precise measurement in pixels or numeric units for customizing how wide each color swatch appears in grid layouts, user interface components, color pickers, or design tools where color selection cells need consistent or tailored width sizing for improved UI arrangement, responsive design, and pixel-perfect alignment across varying screen sizes or user preferences.
</div>

#### Example

    <div id="palette"></div>
    <script>
    $("#palette").kendoColorPalette({
      palette: "basic",
      tileSize: { width: 40 }
    });
    </script>

### tileSize.height `Number` *(default: 14)*

The height of the color cell.


<div class="meta-api-description">
How do I adjust the height of individual color tiles in a Kendo UI ColorPalette? Set or customize the vertical height dimension of individual color tiles or swatches within a color palette grid to adjust the size, spacing, and layout density of color cells for UI elements or design tools. Control the height measurement to fine-tune how tall each swatch appears, influencing the overall color arrangement, visual balance, and compactness for color selection interfaces, palette rendering, or swatch display customization. Enable adjustment of cell height to optimize vertical spacing and tile sizing for improved color visualization, grid alignment, or design consistency across color picker widgets and palettes.
</div>

#### Example

    <div id="palette"></div>
    <script>
    $("#palette").kendoColorPalette({
      palette: "basic",
      tileSize: { height: 40 }
    });
    </script>

### value `String | Color` *(default: null)*

Specifies the initially selected color.


<div class="meta-api-description">
How do I preselect a color in Kendo UI ColorPalette? Set or configure the initially selected color in a color selection component by specifying a color value, string, or code to preselect a color when the palette loads, enabling synchronization, presetting, restoring previous user choices, binding default or saved colors, and controlling initial color state during component initialization or data-driven updates.
</div>

#### Example

    <div id="palette"></div>
    <script>
    $("#palette").kendoColorPalette({
      palette: "basic",
      value: "#fff"
    });
    </script>

## Methods

### value `String | Color`*(default: null)*

Get or set the selected color. If no argument is given, this returns the currently selected color as a string in format `#FFFFFF`.

If one argument is given, it selects the new color and updates the UI. The argument can be a string in **hex**, **rgb** or **rgba** format, or a [`kendo.Color` object](/api/javascript/color) object.

> This method does not trigger the "change" event.


<div class="meta-api-description">
How do I update the currently selected color in Kendo UI ColorPalette without triggering a change event? Set, get, or update the currently selected color in the palette by retrieving or assigning color values using various formats such as hex codes, rgb, rgba strings, or specialized color objects without triggering change events; access the current color selection as a string like #FFFFFF, modify the color programmatically, configure the color picker’s value dynamically, read or set the active color, control color updates silently, and manage color states for UI elements through flexible input types supporting hex, rgb, rgba, or color objects.
</div>

#### Parameters

##### color `String` *(optional)*

#### Returns

`String` the string representation of the current color.

#### Example

    <div id="palette"></div>
    <script>
    $("#palette").kendoColorPalette();
    var palette = $("#palette").data("kendoColorPalette");

    // set palette value
    palette.value("#ccc");

    // get palette value
    var value = palette.value();
    </script>

### color

Get or set the selected color. If no argument is given, this returns the currently selected color as a [`kendo.Color` object](/api/javascript/color).


<div class="meta-api-description">
How can I dynamically change the selected color on a Kendo UI ColorPalette? retrieve or update the chosen color on a color picker or palette, get the current selected color as an object, set or change the color programmatically, access or modify the active color value, dynamically control color selection in code, read the present color state, apply a new color choice, fetch the currently selected shade, assign color values through functions or methods, manipulate color properties within the interface or component.
</div>

#### Parameters

##### color `kendo.Color` *(optional)*

The color that should be set as the current value

#### Returns

`kendo.Color` the current value

#### Example

    <div id="colorpalette"></div>
    <script>
    $("#colorpalette").kendoColorPalette();
    var colorpalette = $("#colorpalette").data("kendoColorPalette");

    // set the selected color
    colorpalette.color(kendo.Color.fromBytes(255, 0, 0));

    // get the selected color
    var selectedColor = colorpalette.color();
    console.log("Selected color:", selectedColor.toHex());
    </script>

### enable

Enables or disables the widget.


<div class="meta-api-description">
How do I enable user input for the Kendo UI color palette in my jQuery application? Control, toggle, or set the interactive state of a color selection interface at runtime, enabling or disabling user input for choosing or modifying colors dynamically within an application or UI component. Adjust whether users can interact with, pick, change, or manipulate colors programmatically by activating or deactivating the color picker’s responsiveness, including turning on or off its input capabilities and controlling accessibility to color customization features on demand. This functionality supports scenarios for enabling, disabling, locking, or unlocking user control over color adjustments, configuring color palette interactivity after initialization through method calls that govern input and selection permissions.
</div>

#### Parameters

##### enable `Boolean` *(optional)*

Whether the widget should be enabled (`true`) or disabled (`false`). If not specified, the method will enable the widget.

#### Example - disable the color palette

    <div id="palette"></div>
    <script>
    $("#palette").kendoColorPalette();
    var palette = $("#palette").data("kendoColorPalette");
    palette.enable(false);
    </script>

## Events

### change

Triggers when a new color has been changed.


<div class="meta-api-description">
How do I detect when a user selects a new color in Kendo UI ColorPalette? Detect when a user selects or modifies a color choice by triggering an event that fires immediately after a color update, enabling developers to capture changes, run handlers for color selection, react to color pick actions, synchronize UI elements, update data bindings, apply dynamic styling, handle color input events, capture user color adjustments, listen for color selection changes, and implement custom responses or persistence whenever the chosen color changes in real time.
</div>

#### Example - subscribe to the "change" event during initialization

    <div id="palette"></div>
    <script>
    $("#palette").kendoColorPalette({
      change: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("The newly selected color is ", e.value);
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <div id="palette"></div>
    <script>
    function palette_change(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("The newly selected color is ", e.value);
    }
    $("#palette").kendoColorPalette();
    var palette = $("#palette").data("kendoColorPalette");
    palette.bind("change", palette_change);
    </script>

[Color]: /api/javascript/kendo#Color
