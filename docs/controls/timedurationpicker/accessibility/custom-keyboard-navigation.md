---
title: Custom Key Handling
page_title: jQuery TimeDurationPicker Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery TimeDurationPicker by Kendo UI using the kendoKeydown event."
components: ["timedurationpicker"]
slug: custom_keynav_timedurationpicker_kendoui
position: 2
---

# Custom Key Handling

The TimeDurationPicker exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the TimeDurationPicker is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the TimeDurationPicker instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the TimeDurationPicker from running its own handler for this key press.

## Overriding a Built-In Key Combination

The following example replaces `Arrow Up` and `Arrow Down` with `U` and `D` to change the duration value.

```dojo
    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: ["hours", "minutes"],
        kendoKeydown: function(e) {
            var keys = kendo.keys;
            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 85) {
                e.preventKendoKeydown = true;
                var val = e.sender.value() || 0;
                e.sender.value(val + 60000);
            }

            if (e.keyCode === 68) {
                e.preventKendoKeydown = true;
                var val = e.sender.value() || 0;
                e.sender.value(Math.max(0, val - 60000));
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds `Ctrl+Delete` to clear the value.

```dojo
    <input id="timedurationpicker" />
    <script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: ["hours", "minutes"],
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.keyCode === kendo.keys.DELETE) {
                e.sender.value(null);
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the TimeDurationPicker]({% slug jquery_timedurationpicker_accessibility %})
