---
title: Custom Key Handling
page_title: jQuery Window Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Window by Kendo UI using the kendoKeydown event to override built-in key mappings and add custom key combinations."
components: ["window"]
slug: custom_keynav_window_kendoui
position: 3
---

# Custom Key Handling

The Window exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs. You can use this event to override existing key mappings or to introduce completely new key combinations.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the Window is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the Window instance.
* `e.keyCode` — the code of the pressed key. Use the `kendo.keys` constants for readable comparisons.
* `e.preventKendoKeydown` — set to `true` to prevent the Window from running its own handler for this key press.

## Overriding a Built-In Key Combination

The Window uses `Arrow` keys to move and `Escape` to close. The following example replaces `Escape` so it minimizes instead of closing the window.

```dojo
    <div id="window">Window content</div>
    <script>
    $("#window").kendoWindow({
        width: 400,
        title: "Demo Window",
        actions: ["Minimize", "Close"],
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.ESC) {
                e.preventKendoKeydown = true;
                e.sender.minimize();
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds a `C` key shortcut that centers the Window on screen.

```dojo
    <div id="window">Window content</div>
    <script>
    $("#window").kendoWindow({
        width: 400,
        title: "Demo Window",
        kendoKeydown: function(e) {
            if (e.keyCode === 67) { // 'C'
                e.sender.center();
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [Window Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/window/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_window %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the Window]({% slug keynav_window %})
* [Accessibility in the Window]({% slug jquery_window_accessibility %})
