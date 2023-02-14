---
title: FlatColorPicker
page_title: Configuration, methods and events of Kendo UI FlatColorPicker
res_type: api
---

# kendo.ui.FlatColorPicker

A standalone color editor with color palette and color gradient views.

## Configuration

### opacity `Boolean` *(default: false)*

Specifies whether we should display the opacity slider to allow
selection of transparency.

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      opacity: true
    });
    </script>

### buttons `Boolean` *(default: false)*

Specifies whether the widget should display the Apply / Cancel buttons.

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      buttons: true
    });
    </script>

### columns `Number`

The number of columns to show in the palette. Also defines the width of the FlatColorPicker.

#### Example - wrap list of colors on two rows with 3 columns

    <input id="flatcolorpicker" type="color" />
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      palette: [ "#000", "#333", "#666", "#999", "#ccc", "#fff" ],
      columns: 3
    });
    </script>

### contrastTool `Boolean|Object` *(default: false)*

Enables the contrast tool in the ColorGradient.

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      contrastTool: true
    });
    </script>

### contrastTool.backgroundColor `String|kendo.Color` *(default: '#ffffff')*

Sets the background color for the contrast tool in the ColorGradient.

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      contrastTool: {
        backgroundColor: "#ff0000"
      }
    });
    </script>

### clearButton `Boolean` *(default: false)*
Specifies whether the widget should display the 'Clear color' button.

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      clearButton: true
    });
    </script>

### format `String` *(default: "hex")*

Sets the default input format in the gradient input editor.

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      format: "rgb"
    });
    </script>

### formats `Array` *(default: ["hex", "rgb"])*

Sets the available input formats in the gradient input editor. Only "hex" and "rgb" are valid values.

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      format: "rgb",
      formats: ["rgb"]
    });
    </script>


### input `Boolean` *(default: true)*

Whether to render the input in ColorGradient component.

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      input: false
    });
    </script>

### value `String | kendo.Color` *(default: null)*

Specifies the initially selected color.

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      value: "#b72bba"
    });
    </script>

### view `String` *(default: "gradient")*

The initially selected view in the FlatColorPicker.

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#colorpicker").kendoFlatColorPicker({
      view: "palette"
    });
    </script>

### views `Array` *(default: [ "gradient", "palette" ])*

The available views in the FlatColorPicker. Valid values are "gradient" and "palette".

#### Example

    <div id="flatcolorpicker"></div>
    <script>
    $("#colorpicker").kendoFlatColorPicker({
      view: "palette",
      views: ["palette"]
    });
    </script>

### preview `Boolean` *(default: true)*

Specifies whether a selected and previous color are displayed for color comparison. with autoupdate set to true both selected and previous colors will be updated.

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      preview: false
    });
    </script>

### autoupdate `Boolean` *(default: true)*

Specifies whether the UI should be updated while the user is typing in
the input field, whenever a valid color can be parsed.  If you pass
`false` for this, the widget will update only when ENTER is pressed.

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      autoupdate: false
    });
    </script>

### palette `String|Array` *(default: null)*

Specifies the color palette to display.

#### Example - use "websafe" palette

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      palette: "websafe",
      columns: 18
    });
    </script>

#### Example - use list of colors

    <div id="flatcolorpicker"></div>
    <script>
    $("#flatcolorpicker").kendoFlatColorPicker({
      palette: [ "#000", "#333", "#666", "#999", "#ccc", "#fff" ],
      columns: 6
    });
    </script>

### messages `Object`

Allows customization of "Apply" / "Cancel" labels.

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      buttons: true,
      messages: {
        apply: "Update",
        cancel: "Discard"
      }
    });
    </script>

### messages.apply `String`

Allows customization of "Apply" label.

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      buttons: true,
      messages: {
        apply: "Update"
      }
    });
    </script>

### messages.cancel `String`

Allows customization of "Cancel" label.

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      buttons: true,
      messages: {
        cancel: "Discard"
      }
    });
    </script>

### messages.clearColor `String` *(default: "Clear color")*

Allows customization of the Clear Color button label.

### messages.contrastRatio `String` *(default: "Contrast ratio")*

Allows customization of the "Contrast ratio" text in the contrast tool.

### messages.fail `String` *(default: "Fail")*

Allows customization of the "Fail" text in the contrast tool.

### messages.pass  `String` *(default: "Pass")*

Allows customization of the "Pass" text in the contrast tool.

### messages.gradient `String` *(default: "Gradient view")*

Allows customization of the Gradient view button.

### messages.palette `String` *(default: "Palette view")*

Allows customization of the Palette view button.

### messages.toggleFormat `String` *(default: "Toggle format")*

Allows customization of the toggle format button's aria-label in the Gradient's input editor.

### messages.red `String` *(default: "Red")*

Allows customization of the rgb's red input's aria-label in the Gradient's input editor.

### messages.green `String` *(default: "Green")*

Allows customization of the rgb's green input's aria-label in the Gradient's input editor.

### messages.blue `String` *(default: "Blue")*

Allows customization of the rgb's blue input's aria-label in the Gradient's input editor.

### messages.alpha `String` *(default: "Alpha")*

Allows customization of the rgb's alpha input's aria-label in the Gradient's input editor.

### messages.hex `String` *(default: "HEX")*

Allows customization of the hex input's aria-label in the Gradient's input editor.

## Methods

### focus

Focuses the widget.

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker();
    var flatpicker = $("#flatpicker").data("kendoFlatColorPicker");
    flatpicker.focus();
    </script>

### value `String|kendo.Color` *(default: null)*

Get or set the selected color. If no argument is given, this returns the
currently selected color as a string in format #FFFFFF when the `opacity`
option is off, or rgba(255, 255, 255, 1) when `opacity` is requested.

If one argument is given, it selects the new color and updates the UI.  The
argument can be a string in hex, rgb or rgba format, or a [Color][] object.
This does not trigger the "change" event.

#### Parameters

##### color `String` *(optional)*

#### Returns

`String` the string representation of the current color.

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker();
    var flatpicker = $("#flatpicker").data("kendoFlatColorPicker");

    // set picker value
    flatpicker.value("#ccc");

    // get picker value
    var value = flatpicker.value();
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

#### Example - disable the flat color picker

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker();
    var flatpicker = $("#flatpicker").data("kendoFlatColorPicker");
    flatpicker.enable(false);
    </script>

## Events

### change

Triggers when a new color has been selected.

#### Event Data

##### e.value `String`

The value of the FlatColorPicker.

#### Example - subscribe to the "change" event during initialization

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      change: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("The newly selected color is ", e.value);
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <div id="flatpicker"></div>
    <script>
    function picker_change(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("The newly selected color is ", e.value);
    }
    $("#flatpicker").kendoFlatColorPicker();
    var flatpicker = $("#flatpicker").data("kendoFlatColorPicker");
    flatpicker.bind("change", picker_change);
    </script>

[parseColor]: /api/javascript/kendo#parseColor
[Color]: /api/javascript/kendo#Color
