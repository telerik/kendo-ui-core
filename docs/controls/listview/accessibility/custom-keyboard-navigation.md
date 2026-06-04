---
title: Custom Key Handling
page_title: jQuery ListView Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery ListView by Kendo UI using the kendoKeydown event to override built-in key mappings and add custom key combinations."
components: ["listview"]
slug: custom_keynav_listview_kendoui
position: 2
---

# Custom Key Handling

The ListView exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs. You can use this event to override existing key mappings or to introduce completely new key combinations.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When a navigable ListView item receives keyboard input, the `kendoKeydown` event fires before the ListView runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the ListView instance.
* `e.keyCode` — the code of the pressed key. Use the `kendo.keys` constants for readable comparisons.
* `e.preventKendoKeydown` — set to `true` to prevent the ListView from running its own keyboard handler for this key press.

The ListView must have `navigatable: true` for keyboard navigation and the `kendoKeydown` event to be active.

## Overriding a Built-In Key Combination

The ListView uses `Arrow Up` and `Arrow Down` to move between items. The following example replaces them with the `U` and `D` keys.

```dojo
    <div id="listview"></div>
    <script>
    var ds = new kendo.data.DataSource({
        data: [{ name: "Alice" }, { name: "Bob" }, { name: "Carol" }]
    });
    $("#listview").kendoListView({
        dataSource: ds,
        navigatable: true,
        template: "<div class='k-listview-item'>#: name #</div>",
        kendoKeydown: function(e) {
            var lv = e.sender;
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 85) { // 'U'
                e.preventKendoKeydown = true;
                var focused = lv.current();
                var prev = focused.prev();
                if (prev.length) { lv.current(prev); }
            }

            if (e.keyCode === 68) { // 'D'
                e.preventKendoKeydown = true;
                var focused = lv.current();
                var next = focused.next();
                if (next.length) { lv.current(next); }
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds an `I` key shortcut that logs the data for the currently focused item.

```dojo
    <div id="listview"></div>
    <script>
    var ds = new kendo.data.DataSource({
        data: [{ name: "Alice" }, { name: "Bob" }, { name: "Carol" }]
    });
    $("#listview").kendoListView({
        dataSource: ds,
        navigatable: true,
        template: "<div class='k-listview-item'>#: name #</div>",
        kendoKeydown: function(e) {
            if (e.keyCode === 73) { // 'I'
                var data = e.sender.dataItem(e.sender.current());
                if (data) { console.log("Item:", kendo.stringify(data)); }
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the ListView]({% slug jquery_listview_accessibility %})
