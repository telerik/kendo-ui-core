---
title: ColorPicker
page_title: Configuration, methods and events of Kendo UI ColorPicker
res_type: api
component: color-picker
---

# kendo.ui.ColorPicker

A drop-down color picker widget.

This widget can be used as a replacement for the browser's built-in color
picker widget - `<input type="color">` in HTML5.  It can be
instantiated from such an element and by default it will replace it in
the DOM.

## Configuration

### buttons `Boolean` *(default: true)*

Specifies whether the widget should display the Apply / Cancel buttons.

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        buttons: false
      })
    </script>

### contrastTool `Boolean|Object` *(default: false)*

Enables the contrast tool in the ColorGradient.

#### Example

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      contrastTool: true
    });
    </script>

### contrastTool.backgroundColor `String|kendo.Color` *(default: '#ffffff')*

Sets the background color for the contrast tool in the ColorGradient.

#### Example

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      contrastTool: {
        backgroundColor: "#ff0000"
      }
    });
    </script>

### clearButton `Boolean` *(default: false)*
Specifies whether the widget should display the 'Clear color' button.

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        clearButton: true
      });
    </script>

### closeOnSelect `Boolean` *(default: false)*

Specifies whether selection of a color in the palette view closes the popup. Applied only when buttons are set to false and the currently selected view is palette.

#### Example

    <input id="colorpicker" type="color" />
    <script>
      $("#colorpicker").kendoColorPicker({
        buttons: false,
        view: "palette",
        views: ["palette"],
        closeOnSelect: true
      });
    </script>

### columns `Number`

The number of columns to show in the color dropdown when a [`pallete`](/api/javascript/ui/colorpicker#configuration-palette) is specified.
This is automatically initialized for the "basic" and "websafe" palettes.
If you use a custom palette then you can set this to some value that makes sense for your colors.

#### Example - wrap list of colors on two rows with 3 columns

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      palette: [ "#000", "#333", "#666", "#999", "#ccc", "#fff" ],
      columns: 3
    });
    </script>


### format `String` *(default: "hex")*

Sets the default input format in the gradient input editor.

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      format: "rgb"
    });
    </script>

### formats `Array` *(default: ["hex", "rgb"])*

Sets the available input formats in the gradient input editor. Only "hex" and "rgb" are valid values.

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      format: "rgb",
      formats: ["rgb"]
    });
    </script>

### fillMode `String`*(default: "solid")*

Sets a value controlling how the color is applied. Can also be set to the following string values:

- "solid"
- "flat"
- "outline"
- "none"

#### Example - sets the fillMode

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      fillMode: "outline"
    });
    </script>

### input `Boolean` *(default: true)*

Whether to render the input in the ColorGradient component.

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      input: false
    });
    </script>

### tileSize `Number|Object` *(default: 14)*

The size of a color cell.

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      palette: "basic",
      tileSize: 32
    });
    </script>

### tileSize.width `Number` *(default: 14)*

The width of the color cell.

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      palette: "basic",
      tileSize: { width: 40 }
    });
    </script>

### tileSize.height `Number` *(default: 14)*

The height of the color cell.

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      palette: "basic",
      tileSize: { height: 40 }
    });
    </script>

### messages `Object`

Allows localization of the strings that are used in the widget.

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      messages: {
        apply: "Update",
        cancel: "Discard"
      }
    })
    </script>

### messages.apply `String` *(default: "Apply")*

Allows customization of the "Apply" button text.

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      messages: {
        apply: "Update"
      }
    })
    </script>

### messages.cancel `String` *(default: "Cancel")*

Allows customization of the "Cancel" button text.

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      messages: {
        cancel: "Discard"
      }
    })
    </script>

### messages.clearColor `String` *(default: "Clear color")*

Allows customization of the Clear Color button label.

### messages.previewInput `String`

Overrides the messages.hex property. Legacy option.

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      messages: {
        previewInput: "Edit Color"
      }
    })
    </script>

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

### palette `String|Array` *(default: null)*

When a non-null `palette` argument is supplied, the drop-down will be
a simple color picker that lists the colors. The following are supported:

- "basic" -- displays 20 basic colors

- "websafe" -- display the "web-safe" color palette

- otherwise, pass a string with colors in HEX representation separated with
  commas, or an array of colors, and it will display that palette instead.
  If you pass an array it can contain strings supported by [parseColor][] or
  [Color][] objects.

#### Example - use "websafe" palette

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      palette: "websafe"
    });
    </script>

#### Example - use list of colors

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      palette: [ "#000", "#333", "#666", "#999", "#ccc", "#fff" ],
      columns: 6
    });
    </script>

### opacity `Boolean` *(default: false)*

Only for the HSV selector.  If `true`, the widget will display the opacity slider.
Note that currently in HTML5 the `<input type="color">` does not support opacity.

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      opacity: true
    });
    </script>

### preview `Boolean` *(default: true)*

Displays the color preview element and the previously selected color for comparison. With buttons set to false, both elements will update at the same time.

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      preview: false
    });
    </script>

### rounded `String` *(default: 'medium')*

Sets a value controlling the border radius. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "full"
- "none"

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      rounded: "full"
    });
    </script>

### toolIcon `String` *(default: null)*

A CSS class name to display an icon in the color picker button.  If
specified, the HTML for the element will look like this:

    <span class="k-tool-icon ${toolIcon}">
      <span class="k-selected-color"></span>
    </span>

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      toolIcon: "k-foreColor"
    });
    </script>

### value `String|kendo.Color` *(default: null)*

The initially selected color.
Note that when initializing the widget from an `<input>` element, the initial color will be decided by the field instead.

#### Example

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      value: "#b72bba"
    });
    </script>

### view `String` *(default: "gradient")*

The initially selected view in the FlatColorPicker.

#### Example

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      view: "palette"
    });
    </script>

### views `Array` *(default: [ "gradient", "palette" ])*

The available views in the FlatColorPicker. Valid values are "gradient" and "palette".

#### Example

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      view: "palette",
      views: ["palette"]
    });
    </script>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"

#### Example

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      size: "small"
    });
    </script>


## Methods

### close

Closes the popup.

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");
    colorpicker.open();

    setTimeout(function() {
        colorpicker.close();
    }, 1000);
    </script>

### open

Opens the popup element with the color selector.

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");
    colorpicker.open();
    </script>

### toggle

Toggles the popup.

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");
    colorpicker.toggle();
    </script>

### value `String|kendo.Color` *(default: null)*

Get or set the selected color. If no argument is given, this returns the
currently selected color as a string in format #FFFFFF when the `opacity`
option is off, or rgba(255, 255, 255, 1) when `opacity` is requested.

If one argument is given, it selects the new color and updates the UI.  The
argument can be a string in **hex**, **rgb** or **rgba** format, or a [Color][] object.
This does not trigger the "change" event.

#### Parameters

##### color `String` *(optional)*

#### Returns

`String` the string representation of the current color.

#### Example

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");

    // set picker value
    colorpicker.value("#ccc");

    // get picker value
    var value = colorpicker.value();
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

#### Example - disable the color picker

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");
    colorpicker.enable(false);
    </script>

### setBackgroundColor

sets a new background color for the contrast tool.

#### Parameters

##### color `String|kendo.Color`

The new background color.

#### Example

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      contrastTool: {
        backgroundColor: "#ffffff"
      }
    });

    var colorpicker = $("#colorpicker").data("kendoColorPicker");
    colorpicker.setBackgroundColor("#ff0000");
    </script>

## Events

### change

Fires when a color was selected, either by clicking on it (in the
simple picker), by clicking ENTER or by pressing "Apply" in the HSV
picker.

#### Event Data

##### e.value `String`

The value of the colorpicker.

#### Example - subscribe to the "change" event during initialization

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      change: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("The picked color is ", e.value);
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <div id="colorpicker"></div>
    <script>
    function picker_change(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("The picked color is ", e.value);
    }
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");
    colorpicker.bind("change", picker_change);
    </script>

### select

Fires as a new color is displayed in the drop-down picker.  This is
not necessarily the "final" value; for example this event triggers
when the sliders in the HSV selector are dragged, but then pressing
ESC would cancel the selection and the color will revert to the
original value.

##### e.value `String`

The value of the colorpicker.

#### Example - subscribe to the "select" event during initialization

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      select: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("The selected color is ", e.value);
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <div id="colorpicker"></div>
    <script>
    function picker_select(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("The selected color is ", e.value);
    }
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");
    colorpicker.bind("select", picker_select);
    </script>

### open

Fires when the picker popup is opening.

#### Example - subscribe to the "open" event during initialization

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      open: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Picker popup opened");
      }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <div id="colorpicker"></div>
    <script>
    function picker_open() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Picker popup opened");
    }
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");
    colorpicker.bind("open", picker_open);
    </script>

### close

Fires when the picker popup is closing.

#### Example - subscribe to the "close" event during initialization

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      close: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Picker popup closed");
      }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <div id="colorpicker"></div>
    <script>
    function picker_close() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Picker popup closed");
    }
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");
    colorpicker.bind("close", picker_close);
    </script>

[parseColor]: /api/javascript/kendo#parseColor
[Color]: /api/javascript/kendo#Color
