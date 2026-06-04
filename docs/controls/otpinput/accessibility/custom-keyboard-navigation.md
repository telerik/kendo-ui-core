---
title: Custom Key Handling
page_title: jQuery OTPInput Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery OTPInput by Kendo UI using the kendoKeydown event."
components: ["otpinput"]
slug: custom_keynav_otpinput_kendoui
position: 3
---

# Custom Key Handling

The OTPInput exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the OTPInput is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the OTPInput instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the OTPInput from running its own handler for this key press.

## Overriding a Built-In Key Combination

The OTPInput uses `Escape` to blur the input. The following example replaces `Escape` with `Q`.

```dojo
    <div id="otpinput"></div>
    <script>
    $("#otpinput").kendoOTPInput({
        length: 4,
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.ESC) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 81) {
                e.preventKendoKeydown = true;
                e.sender.element.find("input").trigger("blur");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds a `Ctrl+Delete` shortcut to clear all fields.

```dojo
    <div id="otpinput"></div>
    <script>
    $("#otpinput").kendoOTPInput({
        length: 4,
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.keyCode === kendo.keys.DELETE) {
                e.sender.value("");
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [OTPInput Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/otpinput/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_otpinput_jquery %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the OTPInput]({% slug keynav_otpinput_jquery %})
* [Accessibility in the OTPInput]({% slug jquery_otpinput_accessibility %})
