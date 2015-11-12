---
title: ColorPalette
page_title: Configuration, methods and events of Kendo UI ColorPalette
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

#### Example - wrap list of colors on two rows with 3 columns

    <div id="palette"></div>
    <script>
    $("#palette").kendoColorPalette({
      palette: [ "#000", "#333", "#666", "#999", "#ccc", "#fff" ],
      columns: 3
    });
    </script>

### tileSize `Number | Object` *(default: 14)*

The size of a color cell.

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

#### Parameters

##### color `kendo.Color` *(optional)*

The color that should be set as the current value

#### Returns

`kendo.Color` the current value

### enable

Enables or disables the widget.

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

#### Example - subscribe to the "change" event during initialization

    <div id="palette"></div>
    <script>
    $("#palette").kendoColorPalette({
      change: function(e) {
        console.log("The newly selected color is ", e.value);
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <div id="palette"></div>
    <script>
    function palette_change(e) {
      console.log("The newly selected color is ", e.value);
    }
    $("#palette").kendoColorPalette();
    var palette = $("#palette").data("kendoColorPalette");
    palette.bind("change", palette_change);
    </script>

[Color]: /api/javascript/kendo#Color
