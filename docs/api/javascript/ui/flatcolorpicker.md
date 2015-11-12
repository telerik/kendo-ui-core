---
title: FlatColorPicker
page_title: Configuration, methods and events of Kendo UI FlatColorPicker
---

# kendo.ui.FlatColorPicker

This is the HSV color selector, which is used by default in the
`kendo.ui.ColorPicker` popup when there is no `palette` set.

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

### value `String | Color` *(default: null)*

Specifies the initially selected color.

#### Example

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      value: "#b72bba"
    });
    </script>

### preview `Boolean` *(default: true)*

Specifies whether we should display the preview bar which displays the
current color and the input field.

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

### value `String|Color` *(default: null)*

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

The value of the ColorPicker.

#### Example - subscribe to the "change" event during initialization

    <div id="flatpicker"></div>
    <script>
    $("#flatpicker").kendoFlatColorPicker({
      change: function(e) {
        console.log("The newly selected color is ", e.value);
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <div id="flatpicker"></div>
    <script>
    function picker_change(e) {
      console.log("The newly selected color is ", e.value);
    }
    $("#flatpicker").kendoFlatColorPicker();
    var flatpicker = $("#flatpicker").data("kendoFlatColorPicker");
    flatpicker.bind("change", picker_change);
    </script>

[parseColor]: /api/javascript/kendo#parseColor
[Color]: /api/javascript/kendo#Color
