---
title: Custom Key Handling
page_title: jQuery InlineAIPrompt Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery InlineAIPrompt by Kendo UI using the kendoKeydown event."
components: ["inlineaiprompt"]
slug: custom_keynav_inlineaiprompt_kendoui
position: 1
---

# Custom Key Handling

The InlineAIPrompt exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the InlineAIPrompt is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the InlineAIPrompt instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the InlineAIPrompt from running its own handler for this key press.

## Overriding a Built-In Key Combination

The following example replaces `Escape` with `Q` to close the prompt.

```dojo
    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.ESC) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 81) {
                e.preventKendoKeydown = true;
                e.sender.element.hide();
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds `Ctrl+Enter` to submit the prompt.

```dojo
    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.keyCode === kendo.keys.ENTER) {
                console.log("Prompt submitted");
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the InlineAIPrompt]({% slug jquery_inlineaiprompt_accessibility %})
