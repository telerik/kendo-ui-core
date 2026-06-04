---
title: Custom Key Handling
page_title: jQuery DropDownTree Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery DropDownTree by Kendo UI using the kendoKeydown event to override built-in key mappings and add custom key combinations."
components: ["dropdowntree"]
slug: custom_keynav_dropdowntree_kendoui
position: 2
---

# Custom Key Handling

The DropDownTree exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs. You can use this event to override existing key mappings or to introduce completely new key combinations.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the DropDownTree wrapper or popup tree receives keyboard input, the `kendoKeydown` event fires before the DropDownTree runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the DropDownTree instance.
* `e.keyCode` — the code of the pressed key. Use the `kendo.keys` constants for readable comparisons.
* `e.preventKendoKeydown` — set to `true` to prevent the DropDownTree from running its own keyboard handler for this key press.

When the popup tree is focused, the embedded TreeView also handles keyboard navigation. Preventing the DropDownTree handler does not automatically prevent the TreeView handler, so custom popup navigation may also need to override the TreeView keydown behavior.

## Overriding a Built-In Key Combination

The DropDownTree uses `Arrow Up` and `Arrow Down` to navigate between tree nodes in the popup. The following example replaces them with the `U` and `D` keys. When one of these keys is pressed while the popup is closed, the popup opens first. The `e.preventDefault()` call prevents the letter from being typed in the input.

```dojo
    <input id="dropdowntree" />
    <script>
    $("#dropdowntree").kendoDropDownTree({
        dataSource: [
                    { text: "Fruits", expanded: true, items: [{ text: "Apple" }, { text: "Banana" }] },
                    { text: "Vegetables", expanded: true, items: [{ text: "Carrot" }, { text: "Pepper" }] }
        ],
        kendoKeydown: function(e) {
            var ddt = e.sender;
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 85) { // 'U'
                e.preventKendoKeydown = true;
                e.preventDefault();
                if (!ddt.popup.visible()) {
                    ddt.open();
                }
                var tv = ddt.treeview;
                var current = tv.current();
                if (current && current.length) {
                    var prev = current.prev(".k-treeview-item");
                    if (prev.length) {
                        tv.current(prev);
                    }
                }
            }

            if (e.keyCode === 68) { // 'D'
                e.preventKendoKeydown = true;
                e.preventDefault();
                if (!ddt.popup.visible()) {
                    ddt.open();
                }
                var tv = ddt.treeview;
                var current = tv.current();
                if (current && current.length) {
                    var next = current.next(".k-treeview-item");
                    if (next.length) {
                        tv.current(next);
                    }
                } else {
                    var first = tv.element.find(".k-treeview-item:first");
                    if (first.length) {
                        tv.current(first);
                    }
                }
            }
        }
    });

    var ddt = $("#dropdowntree").data("kendoDropDownTree");
            ddt.treeview.element.off("keydown.kendoTreeView");
            ddt.treeview.element.on("keydown.kendoTreeView", ddt.treeview, function(e) {
                if (e.keyCode !== kendo.keys.UP && e.keyCode !== kendo.keys.DOWN) {
                    ddt.treeview._keydown(e);
                }
            });
    </script>
```

## Adding a Custom Key Combination

The following example adds a `Ctrl+Delete` shortcut that clears the current DropDownTree selection.

```dojo
    <input id="dropdowntree" />
    <script>
    $("#dropdowntree").kendoDropDownTree({
        dataSource: [
            { text: "Fruits", items: [{ text: "Apple" }, { text: "Banana" }] }
        ],
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.keyCode === kendo.keys.DELETE) {
                e.preventKendoKeydown = true;
                e.sender.value([]);
                e.sender.close();
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the DropDownTree]({% slug jquery_dropdowntree_accessibility %})
