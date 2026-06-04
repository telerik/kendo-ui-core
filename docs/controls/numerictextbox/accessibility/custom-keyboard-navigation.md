---
title: Custom Key Handling
page_title: jQuery NumericTextBox Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery NumericTextBox by Kendo UI using the kendoKeydown event."
components: ["numerictextbox"]
slug: custom_keynav_numerictextbox_kendoui
position: 3
---

# Custom Key Handling

The NumericTextBox exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the NumericTextBox is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the NumericTextBox instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the NumericTextBox from running its own handler for this key press.

## Overriding a Built-In Key Combination

The NumericTextBox uses `Arrow Up` and `Arrow Down` to increment and decrement the value. The following example replaces them with `U` and `D`.

```dojo
    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        value: 5,
        min: 0,
        max: 100,
        kendoKeydown: function(e) {
            var ntb = e.sender;
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 85) {
                e.preventKendoKeydown = true;
                ntb.value(ntb.value() + ntb.step());
                ntb.trigger("change");
            }

            if (e.keyCode === 68) {
                e.preventKendoKeydown = true;
                ntb.value(ntb.value() - ntb.step());
                ntb.trigger("change");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds an `M` key shortcut to multiply the value by 10.

```dojo
    <input id="numerictextbox" />
    <script>
    $("#numerictextbox").kendoNumericTextBox({
        value: 5,
        kendoKeydown: function(e) {
            if (e.keyCode === 77) {
                e.sender.value(e.sender.value() * 10);
                e.sender.trigger("change");
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [NumericTextBox Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/numerictextbox/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_numerictextbox %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the NumericTextBox]({% slug keynav_numerictextbox %})
* [Accessibility in the NumericTextBox]({% slug jquery_numerictextbox_accessibility %})
