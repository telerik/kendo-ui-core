---
title: Custom Key Handling
page_title: jQuery Signature Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Signature by Kendo UI using the kendoKeydown event."
components: ["signature"]
slug: custom_keynav_signature_kendoui
position: 2
---

# Custom Key Handling

The Signature exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the Signature is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the Signature instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Signature from running its own handler for this key press.

## Overriding a Built-In Key Combination

The following example overrides `Escape` with `Q` to clear the signature.

```dojo
    <div id="signature"></div>
    <script>
    $("#signature").kendoSignature({
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.ESC) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 81) {
                e.preventKendoKeydown = true;
                e.sender.value("");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds `Ctrl+Delete` to clear the signature pad.

```dojo
    <div id="signature"></div>
    <script>
    $("#signature").kendoSignature({
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.keyCode === kendo.keys.DELETE) {
                e.sender.value("");
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the Signature]({% slug jquery_signature_accessibility %})
