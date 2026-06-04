---
title: Custom Key Handling
page_title: jQuery Switch Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Switch by Kendo UI using the kendoKeydown event."
components: ["switch"]
slug: custom_keynav_switch_kendoui
position: 3
---

# Custom Key Handling

The Switch exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the Switch is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the Switch instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Switch from running its own handler for this key press.

## Overriding a Built-In Key Combination

The Switch uses `Space` to toggle its state. The following example replaces `Space` with the `T` key.

```dojo
    <input id="switch" />
    <script>
    $("#switch").kendoSwitch({
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.SPACEBAR) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 84) {
                e.preventKendoKeydown = true;
                e.sender.toggle();
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds `Y` and `N` keys to set the Switch to on and off.

```dojo
    <input id="switch" />
    <script>
    $("#switch").kendoSwitch({
        kendoKeydown: function(e) {
            if (e.keyCode === 89) {
                e.sender.check(true);
            }

            if (e.keyCode === 78) {
                e.sender.check(false);
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [Switch Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/switch/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_kendoui_switch %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the Switch]({% slug keynav_kendoui_switch %})
* [Accessibility in the Switch]({% slug jquery_switch_accessibility %})
