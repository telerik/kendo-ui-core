---
title: Custom Key Handling
page_title: jQuery ListBox Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery ListBox by Kendo UI using the kendoKeydown event."
components: ["listbox"]
slug: custom_keynav_listbox_kendoui
position: 2
---

# Custom Key Handling

The ListBox exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the ListBox is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the ListBox instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the ListBox from running its own handler for this key press.

## Overriding a Built-In Key Combination

The ListBox uses `Arrow Up` and `Arrow Down` to navigate items. The following example replaces them with `U` and `D`.

```dojo
    <select id="listbox"></select>
    <script>
    $("#listbox").kendoListBox({
        dataSource: ["Alice", "Bob", "Carol"],
        kendoKeydown: function(e) {
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            var focused = $(document.activeElement);
            if (e.keyCode === 85) {
                e.preventKendoKeydown = true;
                focused.prev(".k-list-item").trigger("focus");
            }

            if (e.keyCode === 68) {
                e.preventKendoKeydown = true;
                focused.next(".k-list-item").trigger("focus");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds a `Ctrl+A` shortcut to select all items.

```dojo
    <select id="listbox"></select>
    <script>
    $("#listbox").kendoListBox({
        dataSource: ["Alice", "Bob", "Carol"],
        selectable: "multiple",
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.keyCode === 65) {
                e.preventKendoKeydown = true;
                e.sender.items().each(function() {
                    e.sender.select($(this));
                });
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the ListBox]({% slug jquery_listbox_accessibility %})
