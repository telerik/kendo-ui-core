---
title: Custom Key Handling
page_title: jQuery ToolBar Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery ToolBar by Kendo UI using the kendoKeydown event."
components: ["toolbar"]
slug: custom_keynav_toolbar_kendoui
position: 3
---

# Custom Key Handling

The ToolBar exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When a focused ToolBar item receives keyboard input, the `kendoKeydown` event fires before the ToolBar runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the ToolBar instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the ToolBar from running its own keyboard handler for this key press.

## Overriding a Built-In Key Combination

The ToolBar uses `Arrow Left` and `Arrow Right` to navigate between items. The following example replaces them with `L` and `R`.

```dojo
    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoToolBar({
        items: [
            { type: "button", text: "Bold", icon: "bold" },
            { type: "button", text: "Italic", icon: "italic" },
            { type: "button", text: "Underline", icon: "underline" }
        ],
        kendoKeydown: function(e) {
            var keys = kendo.keys;
            if (e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            var focused = $(document.activeElement);
            if (e.keyCode === 76) {
                e.preventKendoKeydown = true;
                focused.prev(".k-toolbar-item").trigger("focus");
            }

            if (e.keyCode === 82) {
                e.preventKendoKeydown = true;
                focused.next(".k-toolbar-item").trigger("focus");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds digit keys `1`-`3` to activate the corresponding tool.

```dojo
    <div id="toolbar"></div>
    <script>
    $("#toolbar").kendoToolBar({
        items: [
            { type: "button", text: "Bold", icon: "bold" },
            { type: "button", text: "Italic", icon: "italic" },
            { type: "button", text: "Underline", icon: "underline" }
        ],
        kendoKeydown: function(e) {
            if (e.keyCode >= 49 && e.keyCode <= 51) {
                var idx = e.keyCode - 49;
                e.sender.element.find(".k-toolbar-item").eq(idx).trigger("click");
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [ToolBar Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/toolbar/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_kendoui_toolbar %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the ToolBar]({% slug keynav_kendoui_toolbar %})
* [Accessibility in the ToolBar]({% slug jquery_toolbar_accessibility %})
