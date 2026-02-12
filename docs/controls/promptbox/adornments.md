---
title: Adornments
page_title: jQuery PromptBox Documentation - Adornments
description: "Learn how to enhance the Kendo UI for jQuery PromptBox component with icons, buttons, and other UI elements using adornments."
slug: adornments_kendoui_promptbox
position: 3
components: ["promptbox"]
---

# PromptBox Adornments

You can further customize the elements around the input area by using the specialized adornment configuration.

The PromptBox provides options to render content in specific locations relative to the input area&mdash;start, end, and top.

## Start Affix

The start adornments are displayed at the left side of the input in single-line mode, and at the bottom left corner when in multi-line mode. To add custom content to the start of the PromptBox input area, use the `startAffixTemplate` option.

```javascript
    $("#promptbox").kendoPromptBox({
        startAffixTemplate: () => kendo.ui.icon("paperclip")
    });
```

## End Affix

The end adornments are displayed at the end of the input, before the built-in controls. To add custom content to the end of the PromptBox input area, use the `endAffixTemplate` option.

```javascript
    $("#promptbox").kendoPromptBox({
        endAffixTemplate: () => kendo.ui.icon("gear")
    });
```

## Top Affix

The top adornments are displayed above the input area of the PromptBox and only apply in `'multi'` [mode]({% slug modes_kendoui_promptbox %}). To add custom content to the top of the PromptBox input area, use the `topAffixTemplate` option.

```javascript
    $("#promptbox").kendoPromptBox({
        mode: "multi",
        topAffixTemplate: '<div class="custom-header">Attached files:</div>'
    });
```

## Disabling Adornments

By default, the adornments are part of the PromptBox. When you set the `enable` option to `false`, the PromptBox applies disabled styling to the adornment elements. This styling sets `pointer-events` to `none` and adjusts the `opacity` to match the disabled appearance.

```javascript
    $("#promptbox").kendoPromptBox({
        enable: false,
        startAffixTemplate: "<button>Click me</button>"
    });
```

## See Also

* [PromptBox Modes]({% slug modes_kendoui_promptbox %})
* [Appearance of the PromptBox]({% slug appearance_kendoui_promptbox %})
* [JavaScript API Reference of the PromptBox](/api/javascript/ui/promptbox)
