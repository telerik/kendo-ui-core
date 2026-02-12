---
title: Disabled State
page_title: jQuery PromptBox Documentation - Disabled State
description: "Enable or disable the Kendo UI for jQuery PromptBox and its individual buttons."
slug: disabled_kendoui_promptbox
position: 6
components: ["promptbox"]
---

# Disabled PromptBox

The PromptBox provides built-in support for disabling both the entire component and individual buttons.

To disable the PromptBox component, set the `enable` option to `false`. This prevents user interaction with the input area and all built-in tools.

You can also disable each tool independently while keeping the rest of the PromptBox functional. To achieve this, set the `enable` option of the respective button settings object.

```javascript
    $("#promptbox").kendoPromptBox({
        enable: false
    });
```

## Disabling Individual Buttons

To disable a specific button, use the `enabled` option within the button configuration.

```javascript
    $("#promptbox").kendoPromptBox({
        fileSelectButton: {
            enable: false
        }
    });
```

## See Also

* [JavaScript API Reference of the PromptBox](/api/javascript/ui/promptbox)
* [PromptBox Appearance]({% slug appearance_kendoui_promptbox %})
