---
title: Stopping NVDA Double Announcement in Kendo UI for jQuery NumericTextBox
description: Learn how to stop NVDA from double-announcing labels or titles in Kendo UI for jQuery NumericTextBox when in read-only mode by controlling the auto-generated tooltip and screen reader output.
type: how-to
page_title: Prevent NVDA from Repeating Labels in Kendo NumericTextBox
meta_title: Prevent NVDA from Repeating Labels in Kendo NumericTextBox
slug: numerictextbox-stop-nvda-double-announcement-of-title
tags: numerictextbox, kendo-ui-for-jquery, accessibility, nvda, screen-reader
res_type: kb
ticketid: 1719778
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>Kendo UI for jQuery NumericTextBox</td>
</tr>
<tr>
<td> Version </td>
<td>2026.1.415</td>
</tr>
</tbody>
</table>

## Description

When using the [Kendo UI for jQuery NumericTextBox](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox), the NVDA screen reader may double-announce the label or title when the widget is in read-only mode. This issue occurs because the NumericTextBox renders two `<input>` elements. When the formatted input gains focus, an internal handler transfers focus to the other input, triggering the repeated announcement. Simply adding `aria-hidden="true"` is not a viable solution since Chromium-based browsers block this attribute for focusable elements.

This knowledge base article also answers the following questions:
- How to fix NVDA announcing the page title multiple times in Kendo NumericTextBox?
- How to make Kendo NumericTextBox read-only without NVDA double announcements?
- How to prevent NVDA from announcing hidden elements in Kendo NumericTextBox?

## Solution

To stop NVDA from double-announcing the label or title, prevent the focus transfer and adjust the accessibility attributes of the NumericTextBox. Use the following code to initialize the NumericTextBox in read-only mode while preventing the focus transfer:

```HTML
<label id="numeric-label" for="numeric">Amount</label>
<input id="numeric" title="textbox for amount" />
```

```JavaScript
$(document).ready(function () {
    let numeric = $("#numeric").kendoNumericTextBox({
        format: "c",
        culture: "en-US",
        spinners: false,
        decimals: 2,
        restrictDecimals: true
    }).data("kendoNumericTextBox");

    numeric.readonly(true);
    const displayInput = numeric.wrapper.find("input.k-input-inner").filter(":visible");

    displayInput.off("focus.kendoNumericTextBox");
    displayInput.attr({
        id: "numeric-display",
        "aria-labelledby": "numeric-label"
    });

    $("#numeric-label").attr("for", "numeric-display");
});
```

### Notes

- This approach modifies internal event handling and is not part of the documented API. It may require updates in future versions.
- Apply this solution only to NumericTextBoxes in read-only mode.

## See Also

- [Kendo UI for jQuery NumericTextBox Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox)
- [ARIA Practices for Numeric Widgets](https://www.w3.org/TR/wai-aria-practices/#spinbutton)
