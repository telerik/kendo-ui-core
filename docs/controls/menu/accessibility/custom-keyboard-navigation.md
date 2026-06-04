---
title: Custom Key Handling
page_title: jQuery Menu Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Menu by Kendo UI using the kendoKeydown event."
components: ["menu"]
slug: custom_keynav_menu_kendoui
position: 3
---

# Custom Key Handling

The Menu exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When a focused Menu item receives keyboard input, the `kendoKeydown` event fires before the Menu runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the Menu instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Menu from running its own keyboard handler for this key press.

## Overriding a Built-In Key Combination

The Menu uses `Arrow Left` and `Arrow Right` to navigate between top-level items. The following example replaces them with `L` and `R`.

```dojo
    <ul id="menu">
        <li>File<ul><li>New</li><li>Open</li></ul></li>
        <li>Edit<ul><li>Copy</li><li>Paste</li></ul></li>
        <li>Help</li>
    </ul>
    <script>
    $("#menu").kendoMenu({
        kendoKeydown: function(e) {
            var keys = kendo.keys;

            if (e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            var focused = $(document.activeElement).closest(".k-menu-item");
            if (e.keyCode === 76) {
                e.preventKendoKeydown = true;
                focused.prev(".k-menu-item").find("> .k-link").trigger("focus");
            }

            if (e.keyCode === 82) {
                e.preventKendoKeydown = true;
                focused.next(".k-menu-item").find("> .k-link").trigger("focus");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds digit keys `1`-`3` to open the corresponding top-level item.

```dojo
    <ul id="menu">
        <li>File<ul><li>New</li><li>Open</li></ul></li>
        <li>Edit<ul><li>Copy</li><li>Paste</li></ul></li>
        <li>Help</li>
    </ul>
    <script>
    $("#menu").kendoMenu({
        kendoKeydown: function(e) {
            if (e.keyCode >= 49 && e.keyCode <= 51) {
                var idx = e.keyCode - 49;
                var item = e.sender.element.children(".k-menu-item").eq(idx);
                e.sender.open(item);
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [Menu Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/menu/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_menu_jquery %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the Menu]({% slug keynav_menu_jquery %})
* [Accessibility in the Menu]({% slug jquery_menu_accessibility %})
