---
title: Custom Key Handling
page_title: jQuery DateRangePicker Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery DateRangePicker by Kendo UI using the kendoKeydown event."
components: ["daterangepicker"]
slug: custom_keynav_daterangepicker_kendoui
position: 2
---

# Custom Key Handling

The DateRangePicker exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the DateRangePicker is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the DateRangePicker instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the DateRangePicker from running its own handler for this key press.

## Overriding a Built-In Key Combination

The following example demonstrates how to replace the default `Arrow Up`/`Arrow Down` keys with `U` and `D` to shift the range forward or back one day.

```dojo
    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        kendoKeydown: function(e) {
            var drp = e.sender;
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 85 || e.keyCode === 68) { // 'U' or 'D'
                e.preventKendoKeydown = true;
                var range = drp.range();
                if (!range || !range.start) { return; }
                var delta = e.keyCode === 85 ? 1 : -1;
                var start = new Date(range.start);
                var end = range.end ? new Date(range.end) : null;
                start.setDate(start.getDate() + delta);
                if (end) { end.setDate(end.getDate() + delta); }
                drp.range({ start: start, end: end });
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example demonstrates how to add a `Ctrl+Delete` shortcut to clear the range.

```dojo
    <div id="daterangepicker"></div>
    <script>
    $("#daterangepicker").kendoDateRangePicker({
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.keyCode === kendo.keys.DELETE) {
                e.preventKendoKeydown = true;
                e.sender.range({ start: null, end: null });
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the DateRangePicker]({% slug jquery_daterangepicker_accessibility %})
