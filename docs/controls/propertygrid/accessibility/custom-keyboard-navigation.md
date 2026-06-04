---
title: Custom Key Handling
page_title: jQuery PropertyGrid Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery PropertyGrid by Kendo UI using the kendoKeydown event."
components: ["propertygrid"]
slug: custom_keynav_propertygrid_kendoui
position: 3
---

# Custom Key Handling

The PropertyGrid exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the PropertyGrid table receives keyboard input, the `kendoKeydown` event fires before the PropertyGrid runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the PropertyGrid instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the PropertyGrid from running its own keyboard handler for this key press.

## Overriding a Built-In Key Combination

The PropertyGrid uses `Arrow` keys to navigate rows. The following example replaces `Arrow Up` and `Arrow Down` with `U` and `D`.

```dojo
    <div id="propertygrid"></div>
    <script>
    $("#propertygrid").kendoPropertyGrid({
        model: { field1: "value1", field2: "value2" },
        kendoKeydown: function(e) {
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            var focused = $(document.activeElement).closest("tr");
            if (e.keyCode === 85) {
                e.preventKendoKeydown = true;
                focused.prev("tr").find("td:first").trigger("focus");
            }

            if (e.keyCode === 68) {
                e.preventKendoKeydown = true;
                focused.next("tr").find("td:first").trigger("focus");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds `Ctrl+Home` and `Ctrl+End` shortcuts to jump to the first and last row.

```dojo
    <div id="propertygrid"></div>
    <script>
    $("#propertygrid").kendoPropertyGrid({
        model: { field1: "value1", field2: "value2" },
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.keyCode === kendo.keys.HOME) {
                e.sender.element.find("tr:first td:first").trigger("focus");
            }

            if (e.ctrlKey && e.keyCode === kendo.keys.END) {
                e.sender.element.find("tr:last td:first").trigger("focus");
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [PropertyGrid Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/propertygrid/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_propertygrid_jquery %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the PropertyGrid]({% slug keynav_propertygrid_jquery %})
* [Accessibility in the PropertyGrid]({% slug jquery_propertygrid_accessibility %})
