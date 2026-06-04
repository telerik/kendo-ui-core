---
title: Custom Key Handling
page_title: jQuery Button Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Button by Kendo UI using the kendoKeydown event."
components: ["button"]
slug: custom_keynav_button_kendoui
position: 3
---

# Custom Key Handling

The Button exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the Button is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the Button instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Button from running its own handler for this key press.

## Overriding a Built-In Key Combination

The following example demonstrates how to replace the default `Enter` key behavior so that only `Space` activates the Button.

```dojo
    <button id="button">Click Me</button>
    <script>
    $("#button").kendoButton({
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.ENTER) {
                e.preventKendoKeydown = true;
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example demonstrates how to add a `Ctrl+B` shortcut to toggle bold styling on the Button.

```dojo
    <button id="button">Toggle Bold</button>
    <script>
    $("#button").kendoButton({
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.keyCode === 66) { // Ctrl+B
                e.sender.element.toggleClass("k-font-weight-bold");
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [Button Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/button/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_button %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the Button]({% slug jquery_button_accessibility %})
