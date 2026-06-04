---
title: Custom Key Handling
page_title: jQuery Grid Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Grid by Kendo UI using the kendoKeydown event to override built-in key mappings and add custom key combinations."
components: ["grid"]
slug: custom_keynav_grid_kendoui
position: 3
---

# Custom Key Handling

The Grid exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs. You can use this event to override existing key mappings or to introduce completely new key combinations.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the navigable Grid table receives keyboard input, the `kendoKeydown` event fires before the Grid runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the Grid instance.
* `e.keyCode` — the code of the pressed key. Use the `kendo.keys` constants for readable comparisons.
* `e.preventKendoKeydown` — set to `true` to prevent the Grid from running its own keyboard handler for this key press.

The Grid must have `navigatable: true` for keyboard navigation and the `kendoKeydown` event to be active.

## Overriding a Built-In Key Combination

The Grid uses `Arrow` keys to navigate between cells. The following example replaces `Arrow Up`, `Arrow Down`, `Arrow Left`, and `Arrow Right` with the `U`, `D`, `L`, and `R` keys.

```dojo
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        navigatable: true,
        columns: [
            { field: "name", title: "Name" },
            { field: "age", title: "Age" }
        ],
        dataSource: [
            { name: "Alice", age: 30 },
            { name: "Bob", age: 25 },
            { name: "Carol", age: 28 }
        ],
        kendoKeydown: function(e) {
            var grid = e.sender;
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN ||
                e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 85) { // 'U'
                e.preventKendoKeydown = true;
                grid.current(grid.current().closest("tr").prev("tr").children("td").eq(grid.current().index()));
            }

            if (e.keyCode === 68) { // 'D'
                e.preventKendoKeydown = true;
                grid.current(grid.current().closest("tr").next("tr").children("td").eq(grid.current().index()));
            }

            if (e.keyCode === 76) { // 'L'
                e.preventKendoKeydown = true;
                grid.current(grid.current().prev("td"));
            }

            if (e.keyCode === 82) { // 'R'
                e.preventKendoKeydown = true;
                grid.current(grid.current().next("td"));
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds `Alt+N` and `Alt+P` shortcuts to navigate to the next and previous pages. These key combinations have no built-in meaning in the Grid.

```dojo
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        navigatable: true,
        pageable: true,
        columns: [
            { field: "name", title: "Name" },
            { field: "age", title: "Age" }
        ],
        dataSource: {
            data: [
                { name: "Alice", age: 30 },
                { name: "Bob", age: 25 },
                { name: "Carol", age: 28 },
                { name: "Dave", age: 35 },
                { name: "Eve", age: 22 }
            ],
            pageSize: 2
        },
        kendoKeydown: function(e) {
            var ds = e.sender.dataSource;

            if (e.altKey && e.keyCode === 78) { // Alt+N
                e.preventKendoKeydown = true;
                var next = ds.page() + 1;
                if (next <= ds.totalPages()) { ds.page(next); }
            }

            if (e.altKey && e.keyCode === 80) { // Alt+P
                e.preventKendoKeydown = true;
                var prev = ds.page() - 1;
                if (prev >= 1) { ds.page(prev); }
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [Grid Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/grid/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_kendoui_grid_widget %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the Grid]({% slug keynav_kendoui_grid_widget %})
* [Accessibility in the Grid]({% slug jquery_grid_accessibility %})
