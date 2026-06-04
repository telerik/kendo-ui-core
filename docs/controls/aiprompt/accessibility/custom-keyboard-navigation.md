---
title: Custom Key Handling
page_title: jQuery AIPrompt Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery AIPrompt by Kendo UI using the kendoKeydown event."
components: ["aiprompt"]
slug: custom_keynav_aiprompt_kendoui
position: 3
---

# Custom Key Handling

The AIPrompt exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the AIPrompt is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the AIPrompt instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the AIPrompt from running its own handler for this key press.

## Overriding a Built-In Key Combination

The following example demonstrates how to replace the default `Escape` key behavior with the `Q` key to close the prompt.

```dojo
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.ESC) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 81) { // 'Q'
                e.preventKendoKeydown = true;
                e.sender.element.hide();
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example demonstrates how to add a `Ctrl+Enter` shortcut to submit the prompt.

```dojo
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.keyCode === kendo.keys.ENTER) {
                console.log("Prompt submitted");
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [AIPrompt Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/aiprompt/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_aiprompt_jquery %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the AIPrompt]({% slug jquery_aiprompt_accessibility %})
