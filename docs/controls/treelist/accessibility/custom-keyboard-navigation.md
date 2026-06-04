---
title: Custom Key Handling
page_title: jQuery TreeList Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery TreeList by Kendo UI using the kendoKeydown event to override built-in key mappings and add custom key combinations."
components: ["treelist"]
slug: custom_keynav_treelist_kendoui
position: 3
---

# Custom Key Handling

The TreeList exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs. You can use this event to override existing key mappings or to introduce completely new key combinations.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the navigable TreeList table receives keyboard input, the `kendoKeydown` event fires before the TreeList runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the TreeList instance.
* `e.keyCode` — the code of the pressed key. Use the `kendo.keys` constants for readable comparisons.
* `e.preventKendoKeydown` — set to `true` to prevent the TreeList from running its own keyboard handler for this key press.

The TreeList must have `navigatable: true` for keyboard navigation and the `kendoKeydown` event to be active.

## Overriding a Built-In Key Combination

The TreeList uses `Arrow` keys to navigate between cells and to expand/collapse rows. The following example replaces `Arrow Up`, `Arrow Down`, `Arrow Left`, and `Arrow Right` with the `U`, `D`, `L`, and `R` keys.

```dojo
    <div id="treelist"></div>
    <script>
    $("#treelist").kendoTreeList({
        navigatable: true,
        columns: [
            { field: "name", expandable: true, title: "Name" },
            { field: "age", title: "Age" }
        ],
        dataSource: {
            data: [
                { id: 1, parentId: null, name: "Alice", age: 30 },
                { id: 2, parentId: 1, name: "Bob", age: 25 },
                { id: 3, parentId: null, name: "Carol", age: 28 }
            ]
        },
        kendoKeydown: function(e) {
            var tl = e.sender;
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN ||
                e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 85) { // 'U'
                e.preventKendoKeydown = true;
                tl.current(tl.current().closest("tr").prev("tr").find("td:first"));
            }

            if (e.keyCode === 68) { // 'D'
                e.preventKendoKeydown = true;
                tl.current(tl.current().closest("tr").next("tr").find("td:first"));
            }

            if (e.keyCode === 76) { // 'L'
                e.preventKendoKeydown = true;
                tl.current(tl.current().prev("td"));
            }

            if (e.keyCode === 82) { // 'R'
                e.preventKendoKeydown = true;
                tl.current(tl.current().next("td"));
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds a `Ctrl+E` shortcut to select the currently focused row. This key combination has no built-in meaning in the TreeList.

```dojo
    <div id="treelist"></div>
    <script>
    $("#treelist").kendoTreeList({
        navigatable: true,
        selectable: "row",
        columns: [
            { field: "name", expandable: true, title: "Name" },
            { field: "age", title: "Age" }
        ],
        dataSource: {
            data: [
                { id: 1, parentId: null, name: "Alice", age: 30 },
                { id: 2, parentId: null, name: "Bob", age: 25 },
                { id: 3, parentId: null, name: "Carol", age: 28 }
            ]
        },
        kendoKeydown: function(e) {
            var tl = e.sender;
            var current = tl.current();

            if (e.ctrlKey && e.keyCode === 69) { // Ctrl+E
                e.preventKendoKeydown = true;
                if (current && current.length) {
                    tl.select(current.closest("tr"));
                }
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [TreeList Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/treelist/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_kendoui_treelist_widget %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the TreeList]({% slug keynav_kendoui_treelist_widget %})
* [Accessibility in the TreeList]({% slug jquery_treelist_accessibility %})
