---
title: Custom Key Handling
page_title: jQuery Drawer Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Drawer by Kendo UI using the kendoKeydown event."
components: ["drawer"]
slug: custom_keynav_drawer_kendoui
position: 3
---

# Custom Key Handling

The Drawer exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the Drawer is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the Drawer instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Drawer from running its own handler for this key press.

## Overriding a Built-In Key Combination

The following example demonstrates how to replace the default `Escape` key behavior with the `Q` key to close the Drawer.

```dojo
    <div id="drawer">
        <div>Drawer content here</div>
    </div>
    <script>
    $("#drawer").kendoDrawer({
        mode: "push",
        template: "<ul><li>Item 1</li><li>Item 2</li></ul>",
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.ESC) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 81) { // 'Q'
                e.preventKendoKeydown = true;
                e.sender.hide();
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example demonstrates how to add a `Ctrl+O` shortcut to toggle the Drawer.

```dojo
    <div id="drawer">
        <div>Main content</div>
    </div>
    <script>
    $("#drawer").kendoDrawer({
        mode: "push",
        template: "<ul><li>Item 1</li><li>Item 2</li></ul>",
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.keyCode === 79) { // Ctrl+O
                if (e.sender.visible) {
                    e.sender.hide();
                } else {
                    e.sender.show();
                }
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [Drawer Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/drawer/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_drawer_jquery %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the Drawer]({% slug jquery_drawer_accessibility %})
