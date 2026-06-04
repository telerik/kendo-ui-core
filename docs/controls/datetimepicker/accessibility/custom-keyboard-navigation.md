---
title: Custom Key Handling
page_title: jQuery DateTimePicker Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery DateTimePicker by Kendo UI using the kendoKeydown event."
components: ["datetimepicker"]
slug: custom_keynav_datetimepicker_kendoui
position: 2
---

# Custom Key Handling

The DateTimePicker exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the DateTimePicker is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the DateTimePicker instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the DateTimePicker from running its own handler for this key press.

## Overriding a Built-In Key Combination

The following example demonstrates how to replace the default `Arrow Up`/`Arrow Down` keys with `U` and `D` to advance or go back one day.

```dojo
    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        value: new Date(),
        kendoKeydown: function(e) {
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 85) { // 'U' — advance one day
                e.preventKendoKeydown = true;
                var d = new Date(e.sender.value() || new Date());
                d.setDate(d.getDate() + 1);
                e.sender.value(d);
            }

            if (e.keyCode === 68) { // 'D' — go back one day
                e.preventKendoKeydown = true;
                var d = new Date(e.sender.value() || new Date());
                d.setDate(d.getDate() - 1);
                e.sender.value(d);
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example demonstrates how to add a `Ctrl+Shift+Y` shortcut to set the value to the current date and time and close both popups. 

```dojo
    <input id="datetimepicker" />
    <script>
    $("#datetimepicker").kendoDateTimePicker({
        value: new Date(),
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.shiftKey && e.keyCode === 89) { // Ctrl+Shift+Y
                e.preventKendoKeydown = true;
                e.sender.value(new Date());
                e.sender.close("date");
                e.sender.close("time");
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the DateTimePicker]({% slug jquery_datetimepicker_accessibility %})
