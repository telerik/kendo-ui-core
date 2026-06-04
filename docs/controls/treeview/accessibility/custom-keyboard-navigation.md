---
title: Custom Key Handling
page_title: jQuery TreeView Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery TreeView by Kendo UI using the kendoKeydown event to override built-in key mappings and add custom key combinations."
components: ["treeview"]
slug: custom_keynav_treeview_kendoui
position: 2
---

# Custom Key Handling

The TreeView exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs. You can use this event to override existing key mappings or to introduce completely new key combinations.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When a focused TreeView node receives keyboard input, the `kendoKeydown` event fires before the TreeView runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the TreeView instance.
* `e.keyCode` — the code of the pressed key. Use the `kendo.keys` constants for readable comparisons.
* `e.preventKendoKeydown` — set to `true` to prevent the TreeView from running its own keyboard handler for this key press.

## Overriding a Built-In Key Combination

The TreeView uses `Arrow Up` and `Arrow Down` to move between nodes, and `Arrow Left` and `Arrow Right` to collapse and expand. The following example replaces `Arrow Up`, `Arrow Down`, `Arrow Left`, and `Arrow Right` with the `U`, `D`, `L`, and `R` keys.

```dojo
    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
        dataSource: [
            { text: "Furniture", items: [
                { text: "Tables" }, { text: "Chairs" }
            ]},
            { text: "Decor", items: [
                { text: "Candles" }, { text: "Frames" }
            ]}
        ],
        kendoKeydown: function(e) {
            var tv = e.sender;
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN ||
                e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            var current = tv.current();
            if (!current) { return; }
            var node = tv.dataItem(current);

            if (e.keyCode === 85) { // 'U'
                e.preventKendoKeydown = true;
                var prev = current.prev(".k-treeview-item");
                if (prev.length) { tv.current(prev); }
            }

            if (e.keyCode === 68) { // 'D'
                e.preventKendoKeydown = true;
                var next = current.next(".k-treeview-item");
                if (next.length) { tv.current(next); }
            }

            if (e.keyCode === 76) { // 'L' — collapse
                e.preventKendoKeydown = true;
                if (node && node.expanded) { tv.collapse(current); }
            }

            if (e.keyCode === 82) { // 'R' — expand
                e.preventKendoKeydown = true;
                if (node && node.hasChildren) { tv.expand(current); }
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds an `I` key shortcut that logs the data of the currently focused node.

```dojo
    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
        dataSource: [
            { text: "Furniture", items: [{ text: "Tables" }] },
            { text: "Decor" }
        ],
        kendoKeydown: function(e) {
            if (e.keyCode === 73) { // 'I'
                var node = e.sender.dataItem(e.sender.current());
                if (node) { console.log("Node:", node.text); }
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the TreeView]({% slug jquery_treeview_accessibility %})
