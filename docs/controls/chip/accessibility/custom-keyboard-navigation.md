---
title: Custom Key Handling
page_title: jQuery Chip Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Chip by Kendo UI using the kendoKeydown event."
components: ["chip"]
slug: custom_keynav_chip_kendoui
position: 2
---

# Custom Key Handling

The Chip exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the Chip is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the Chip instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Chip from running its own handler for this key press.

## Overriding a Built-In Key Combination

The following example demonstrates how to replace the default `Enter` key behavior so that only `Space` activates the Chip.

```dojo
    <span id="chip"></span>
    <script>
    $("#chip").kendoChip({
        label: "Status",
        removable: true,
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.ENTER) {
                e.preventKendoKeydown = true;
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example demonstrates how to add the `X` key to remove the Chip.

```dojo
    <span id="chip"></span>
    <script>
    $("#chip").kendoChip({
        label: "Status",
        removable: true,
        kendoKeydown: function(e) {
            if (e.keyCode === 88) { // 'X'
                e.sender.element.remove();
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the Chip]({% slug jquery_chip_accessibility %})
