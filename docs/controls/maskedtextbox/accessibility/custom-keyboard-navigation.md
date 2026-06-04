---
title: Custom Key Handling
page_title: jQuery MaskedTextBox Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery MaskedTextBox by Kendo UI using the kendoKeydown event."
components: ["maskedtextbox"]
slug: custom_keynav_maskedtextbox_kendoui
position: 2
---

# Custom Key Handling

The MaskedTextBox exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the MaskedTextBox is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the MaskedTextBox instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the MaskedTextBox from running its own handler for this key press.

## Overriding a Built-In Key Combination

The MaskedTextBox uses `Escape` to clear focus. The following example replaces `Escape` with `Q`.

```dojo
    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox({
        mask: "(000) 000-0000",
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.ESC) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 81) {
                e.preventKendoKeydown = true;
                e.sender.element.trigger("blur");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds a `Ctrl+Delete` shortcut to clear the input value.

```dojo
    <input id="maskedtextbox" />
    <script>
    $("#maskedtextbox").kendoMaskedTextBox({
        mask: "(000) 000-0000",
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
* [Accessibility in the MaskedTextBox]({% slug jquery_maskedtextbox_accessibility %})
