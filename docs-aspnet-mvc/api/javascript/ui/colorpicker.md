---
title: ColorPicker
page_title: Configuration, methods and events of Kendo UI ColorPicker
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

Applicable only for the HSV selector, when a [`pallete`](#configuration-palette) is not specified.

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      buttons: false
    })
    </script>

### columns `Number`

The number of columns to show in the color dropdown when a [`pallete`](#configuration-palette) is specified.
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

### palette `String|Array` *(default: null)*

When a non-null `palette` argument is supplied, the drop-down will be
a simple color picker that lists the colors. The following are supported:

- "basic" -- displays 20 basic colors

- "websafe" -- display the "web-safe" color palette

- otherwise, pass a string with colors in HEX representation separated with
  commas, or an array of colors, and it will display that palette instead.
  If you pass an array it can contain strings supported by [parseColor][] or
  [Color][] objects.

If `palette` is missing or `null`, the widget will display the HSV
selector.

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

Only applicable for the HSV selector.

Displays the color preview element, along with an input field where the end user can paste a color in a CSS-supported notation.

#### Example

    <input id="colorpicker" type="color" />
    <script>
    $("#colorpicker").kendoColorPicker({
      preview: false
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

### value `String|Color` *(default: null)*

The initially selected color.
Note that when initializing the widget from an `<input>` element, the initial color will be decided by the field instead.

#### Example

    <div id="colorpicker"></div>
    <script>
    $("#colorpicker").kendoColorPicker({
      value: "#b72bba"
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

### value `String|Color` *(default: null)*

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
        console.log("The picked color is ", e.value);
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <div id="colorpicker"></div>
    <script>
    function picker_change(e) {
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
        console.log("The selected color is ", e.value);
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <div id="colorpicker"></div>
    <script>
    function picker_select(e) {
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
        console.log("Picker popup opened");
      }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <div id="colorpicker"></div>
    <script>
    function picker_open() {
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
        console.log("Picker popup closed");
      }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <div id="colorpicker"></div>
    <script>
    function picker_close() {
      console.log("Picker popup closed");
    }
    $("#colorpicker").kendoColorPicker();
    var colorpicker = $("#colorpicker").data("kendoColorPicker");
    colorpicker.bind("close", picker_close);
    </script>

[parseColor]: /api/javascript/kendo#parseColor
[Color]: /api/javascript/kendo#Color
