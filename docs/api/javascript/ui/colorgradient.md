---
title: ColorGradient
page_title: Configuration, methods and events of Kendo UI ColorGradient
res_type: api
---

# kendo.ui.ColorGradient

This is the HSV color selector, which is used by default in the `kendo.ui.FlatColorPicker`.

## Configuration

### opacity `Boolean` *(default: false)*

Specifies whether we should display the opacity slider to allow
selection of transparency.

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient({
      opacity: true
    });
    </script>

### contrastTool `Boolean|Object` *(default: false)*

Enables the contrast tool in the ColorGradient.

#### Example

    <div id="ColorGradient"></div>
    <script>
    $("#ColorGradient").kendoColorGradient({
      contrastTool: true
    });
    </script>

### contrastTool.backgroundColor `String|kendo.Color` *(default: '#ffffff')*

Sets the background color for the contrast tool in the ColorGradient.

#### Example

    <div id="ColorGradient"></div>
    <script>
    $("#ColorGradient").kendoColorGradient({
      contrastTool: {
        backgroundColor: "#ff0000"
      }
    });
    </script>

### format `String` *(default: "hex")*

Sets the default input format in the gradient input editor.

#### Example

    <div id="ColorGradient"></div>
    <script>
    $("#ColorGradient").kendoColorGradient({
      format: "rgb"
    });
    </script>

### formats `Array` *(default: ["hex", "rgb"])*

Sets the available input formats in the gradient input editor. Only "hex" and "rgb" are valid values.

#### Example

    <div id="ColorGradient"></div>
    <script>
    $("#ColorGradient").kendoColorGradient({
      format: "rgb",
      formats: ["rgb"]
    });
    </script>

### input `Boolean` *(default: true)*

Whether to render the input.

#### Example

    <div id="ColorGradient"></div>
    <script>
    $("#ColorGradient").kendoColorGradient({
      input: false
    });
    </script>

### value `String | kendo.Color` *(default: null)*

Specifies the initially selected color.

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient({
      value: "#b72bba"
    });
    </script>

### messages `Object`

Allows customization labels and messages in the ColorGradient.

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient({
      messages: {
        contrastRatio: "Contrast ratio",
        gradient: "Gradient view"
      }
    });
    </script>

### messages.contrastRatio `String` *(default: "Contrast ratio")*

Allows customization of the "Contrast ratio" text in the contrast tool.

### messages.fail `String` *(default: "Fail")*

Allows customization of the "Fail" text in the contrast tool.

### messages.pass  `String` *(default: "Pass")*

Allows customization of the "Pass" text in the contrast tool.

### messages.toggleFormat `String` *(default: "Toggle format")*

Allows customization of the toggle format button's title in the Gradient's input editor.

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

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient();
    var colorgradient = $("#colorgradient").data("kendoColorGradient");
    colorgradient.focus();
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

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient();
    var colorgradient = $("#colorgradient").data("kendoColorGradient");

    // set picker value
    colorgradient.value("#ccc");

    // get picker value
    var value = colorgradient.value();
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

#### Example

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient();
    var colorgradient = $("#colorgradient").data("kendoColorGradient");
    colorgradient.enable(false);
    </script>

## Events

### change

Triggers when a new color has been selected.

#### Event Data

##### e.value `String`

The value of the ColorGradient.

#### Example - subscribe to the "change" event during initialization

    <div id="colorgradient"></div>
    <script>
    $("#colorgradient").kendoColorGradient({
      change: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("The newly selected color is ", e.value);
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <div id="colorgradient"></div>
    <script>
    function picker_change(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("The newly selected color is ", e.value);
    }
    $("#colorgradient").kendoColorGradient();
    var colorgradient = $("#colorgradient").data("kendoColorGradient");
    colorgradient.bind("change", picker_change);
    </script>

[parseColor]: /api/javascript/kendo#parseColor
[Color]: /api/javascript/kendo#Color
