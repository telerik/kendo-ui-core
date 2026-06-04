---
title: Custom Key Handling
page_title: jQuery ColorPicker Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery ColorPicker by Kendo UI using the kendoKeydown event."
components: ["colorpicker"]
slug: custom_keynav_colorpicker_kendoui
position: 2
---

# Custom Key Handling

The ColorPicker exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the ColorPicker is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the ColorPicker instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the ColorPicker from running its own handler for this key press.

## Overriding a Built-In Key Combination

The following example demonstrates how to replace the default `Escape` key behavior with the `Q` key to close the picker popup.

```dojo
    <input id="colorpicker" />
    <script>
    $("#colorpicker").kendoColorPicker({
        value: "#ff0000",
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.ESC) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 81) { // 'Q'
                e.preventKendoKeydown = true;
                e.sender.close();
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example demonstrates how to add `R`, `G`, and `B` keys to set preset colors.

```dojo
    <input id="colorpicker" />
    <script>
    $("#colorpicker").kendoColorPicker({
        value: "#ff0000",
        kendoKeydown: function(e) {
            if (e.keyCode === 82) { // 'R'
                e.sender.value("#ff0000");
            }
            if (e.keyCode === 71) { // 'G'
                e.sender.value("#00ff00");
            }
            if (e.keyCode === 66) { // 'B'
                e.sender.value("#0000ff");
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the ColorPicker]({% slug jquery_colorpicker_accessibility %})
