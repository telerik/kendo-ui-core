---
title: Custom Key Handling
page_title: jQuery Dialog Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Dialog by Kendo UI using the kendoKeydown event."
components: ["dialog"]
slug: custom_keynav_dialog_kendoui
position: 2
---

# Custom Key Handling

The Dialog exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the Dialog is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the Dialog instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Dialog from running its own handler for this key press.

## Overriding a Built-In Key Combination

The following example demonstrates how to replace the default `Escape` key behavior with the `Q` key to close the Dialog.

```dojo
    <div id="dialog">Dialog content</div>
    <script>
    $("#dialog").kendoDialog({
        title: "Confirm",
        width: 400,
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

The following example demonstrates how to add the `C` key to center the Dialog on the screen.

```dojo
    <div id="dialog">Dialog content</div>
    <script>
    $("#dialog").kendoDialog({
        title: "Confirm",
        width: 400,
        kendoKeydown: function(e) {
            if (e.keyCode === 67) { // 'C'
                e.sender.wrapper.css({
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                });
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the Dialog]({% slug jquery_dialog_accessibility %})
