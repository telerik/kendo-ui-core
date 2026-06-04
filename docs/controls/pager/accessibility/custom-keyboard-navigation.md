---
title: Custom Key Handling
page_title: jQuery Pager Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Pager by Kendo UI using the kendoKeydown event."
components: ["pager"]
slug: custom_keynav_pager_kendoui
position: 3
---

# Custom Key Handling

The Pager exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When a focused Pager button receives keyboard input, the `kendoKeydown` event fires before the Pager runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the Pager instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Pager from running its own keyboard handler for this key press.

## Overriding a Built-In Key Combination

The Pager uses `Arrow Left` and `Arrow Right` to navigate pages. The following example replaces them with `L` and `R`.

```dojo
    <div id="pager"></div>
    <script>
    var ds = new kendo.data.DataSource({
        data: [1,2,3,4,5,6,7,8,9,10,11,12],
        pageSize: 3
    });
    ds.read();
    $("#pager").kendoPager({
        dataSource: ds,
        kendoKeydown: function(e) {
            var keys = kendo.keys;

            if (e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 76) {
                e.preventKendoKeydown = true;
                var page = ds.page();
                if (page > 1) { ds.page(page - 1); }
            }

            if (e.keyCode === 82) {
                e.preventKendoKeydown = true;
                var page = ds.page();
                if (page < ds.totalPages()) { ds.page(page + 1); }
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds digit keys `1`-`4` to jump to that page directly.

```dojo
    <div id="pager"></div>
    <script>
    var ds = new kendo.data.DataSource({
        data: [1,2,3,4,5,6,7,8,9,10,11,12],
        pageSize: 3
    });
    ds.read();
    $("#pager").kendoPager({
        dataSource: ds,
        kendoKeydown: function(e) {
            if (e.keyCode >= 49 && e.keyCode <= 52) {
                var page = e.keyCode - 48;
                if (page <= ds.totalPages()) { ds.page(page); }
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [Pager Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/pager/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_pager_jquery %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the Pager]({% slug keynav_pager_jquery %})
* [Accessibility in the Pager]({% slug jquery_pager_accessibility %})
