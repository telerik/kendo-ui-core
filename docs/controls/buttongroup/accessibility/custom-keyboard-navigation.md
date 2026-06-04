---
title: Custom Key Handling
page_title: jQuery ButtonGroup Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery ButtonGroup by Kendo UI using the kendoKeydown event."
components: ["buttongroup"]
slug: custom_keynav_buttongroup_kendoui
position: 3
---

# Custom Key Handling

The ButtonGroup exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the ButtonGroup is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the ButtonGroup instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the ButtonGroup from running its own handler for this key press.

## Overriding a Built-In Key Combination

The following example demonstrates how to replace the default `Arrow Left`/`Arrow Right` keys with `L` and `R` for button navigation.

```dojo
    <div id="buttongroup"></div>
    <script>
    $("#buttongroup").kendoButtonGroup({
        items: [
            { text: "Bold", icon: "bold" },
            { text: "Italic", icon: "italic" },
            { text: "Underline", icon: "underline" }
        ],
        kendoKeydown: function(e) {
            var keys = kendo.keys;

            if (e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            var focused = $(document.activeElement);
            if (e.keyCode === 76) { // 'L'
                e.preventKendoKeydown = true;
                focused.prev(".k-button").trigger("focus");
            }

            if (e.keyCode === 82) { // 'R'
                e.preventKendoKeydown = true;
                focused.next(".k-button").trigger("focus");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example demonstrates how to add digit keys `1`-`3` to select the corresponding button.

```dojo
    <div id="buttongroup"></div>
    <script>
    $("#buttongroup").kendoButtonGroup({
        items: [
            { text: "Bold", icon: "bold" },
            { text: "Italic", icon: "italic" },
            { text: "Underline", icon: "underline" }
        ],
        kendoKeydown: function(e) {
            if (e.keyCode >= 49 && e.keyCode <= 51) {
                var idx = e.keyCode - 49;
                e.sender.select(idx);
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [ButtonGroup Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/buttongroup/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_buttongroup_jquery %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the ButtonGroup]({% slug jquery_buttongroup_accessibility %})
