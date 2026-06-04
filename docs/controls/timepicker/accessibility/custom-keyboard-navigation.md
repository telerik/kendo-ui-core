---
title: Custom Key Handling
page_title: jQuery TimePicker Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery TimePicker by Kendo UI using the kendoKeydown event."
components: ["timepicker"]
slug: custom_keynav_timepicker_kendoui
position: 2
---

# Custom Key Handling

The TimePicker exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the TimePicker is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the TimePicker instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the TimePicker from running its own handler for this key press.

## Overriding a Built-In Key Combination

The following example replaces `Arrow Up` and `Arrow Down` with `U` and `D` to change the time.

```dojo
    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        value: new Date(),
        kendoKeydown: function(e) {
            var keys = kendo.keys;
            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            var val = e.sender.value() || new Date();
            if (e.keyCode === 85) {
                e.preventKendoKeydown = true;
                val.setMinutes(val.getMinutes() + 30);
                e.sender.value(val);
            }

            if (e.keyCode === 68) {
                e.preventKendoKeydown = true;
                val.setMinutes(val.getMinutes() - 30);
                e.sender.value(val);
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds a `T` key shortcut to set the value to the current time.

```dojo
    <input id="timepicker" />
    <script>
    $("#timepicker").kendoTimePicker({
        kendoKeydown: function(e) {
            if (e.keyCode === 84) {
                e.sender.value(new Date());
                e.sender.close();
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the TimePicker]({% slug jquery_timepicker_accessibility %})
