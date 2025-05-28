---
title: Detecting Mode Switch in Kendo UI ColorPicker
description: Learn how to detect when a user switches between HEX and RGB modes in the Kendo UI ColorPicker component.
type: how-to
page_title: How to Detect Mode Change in Kendo UI ColorPicker
slug: detect-mode-change-kendo-ui-colorpicker
tags: kendo-ui,colorpicker,hex,rgb,mode-switch,events
res_type: kb
ticketid: 1688006
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® ColorPicker</td>
</tr>
<tr>
<td>Version</td>
<td>2025.1.227</td>
</tr>
</tbody>
</table>

## Description

I want to detect when a user switches between HEX and RGB modes in the [Kendo UI ColorPicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpicker). The component supports events such as `change`, `select`, `open`, and `close`, but none of these directly capture the mode switch action. How can I implement this functionality?

This knowledge base article also answers the following questions:
- How to track HEX and RGB mode changes in the Kendo UI ColorPicker?
- Is there an event to detect mode switching in Kendo UI ColorPicker?
- How to listen to mode toggle actions in Kendo UI ColorPicker?

## Solution

To achieve detection of mode switching between HEX and RGB, use the `open` event of the Kendo UI ColorPicker to attach a click listener to the toggle button. Use jQuery to check the currently visible mode.

### Steps:

1. Attach a handler to the `open` event of the ColorPicker.
2. Inside the handler, use jQuery to add a `click` event listener to the mode toggle button (`.k-colorgradient-toggle-mode`).
3. Use jQuery to determine which mode (HEX or RGB) is currently visible by checking the visibility of the respective elements.

### Example Implementation:

```javascript
var firstOpen = true;

$("#colorPicker").kendoColorPicker({
    open: function () {
        if (firstOpen) {
            firstOpen = false;
            $(".k-colorgradient-toggle-mode").click(function () {
                if ($("[data-bind='visible: isHEXMode']").is(":visible")) {
                    console.log("You are in HEX mode");
                } else if ($("[data-bind='visible: isRGBMode']").is(":visible")) {
                    console.log("You are in RGB mode");
                }
            });
        }
    }
});
```

### Explanation:
- The `open` event triggers when the ColorPicker's popup opens.
- The `firstOpen` flag ensures the click event listener is attached only once.
- The `click` listener checks which mode is currently visible using jQuery selectors and logs the result.

### Reference:
You can find a working example in the [Kendo UI Dojo](https://dojo.telerik.com/igUjiyHQ/15).

## See Also

- [Kendo UI ColorPicker Documentation](https://docs.telerik.com/kendo-ui/controls/colorpicker/overview)
- [Kendo UI ColorPicker Events](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpicker/events/open)
