---
title: Restricting Decimals in Kendo UI NumericTextBox
description: Learn how to configure the Kendo UI NumericTextBox to only accept and display integer values.
type: how-to
page_title: How to Make Kendo UI NumericTextBox Accept Only Integers
slug: how-to-restrict-decimals-kendo-numeric-text-box
tags: kendo, ui, numeric, textbox, integer, decimal, restrict
res_type: kb
ticketid: 1662969
---

## Environment

| Product | Kendo UI for jQuery |
| --- | --- |
| Version | 2024.1.319 |

## Description

I want the Kendo UI [NumericTextBox](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox) to display only integers, without any decimal points. How can I achieve this?

This KB article also answers the following questions:
- How to configure NumericTextBox to prevent decimal input?
- How to ensure the NumericTextBox only displays integer values?
- How to format NumericTextBox to exclude decimal points?

## Solution

To restrict the Kendo UI NumericTextBox to only accept and display integers, use the [`decimals`](/api/javascript/ui/numerictextbox/configuration/decimals), [`restrictDecimals`](/api/javascript/ui/numerictextbox/configuration/restrictdecimals), and  [`format`](/api/javascript/ui/numerictextbox/configuration/format) configuration options. Set `decimals` to `0` to prevent decimal inputs, `restrictDecimals` to `true` to ensure that no decimal points can be entered, and add the needed `format` with zero digits for decimals.

Here is a sample configuration:

```javascript
$("#numericTextBox").kendoNumericTextBox({
    value: 123.456, // Initial value
    decimals: 0,
    restrictDecimals: true,
    format: "c0"
});
```

The above configuration ensures that the NumericTextBox component will:
- Not allow users to input decimal values.
- Display the value as an integer without decimal points.
- Format the display value without any decimal fraction.

For an interactive example, refer to the example below:
```dojo
   <input id="numerictextbox" />
    <script>
      $("#numerictextbox").kendoNumericTextBox({
        value: 123.456,
        decimals: 0,
        restrictDecimals: true,
        format: "n0"
      });
    </script>
```

## See Also

- [Official NumericTextBox Documentation](https://docs.telerik.com/kendo-ui/controls/numerictextbox/overview)
- [NumericTextBox API](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox)
- [Number Formatting](https://docs.telerik.com/kendo-ui/globalization/intl/numberformatting)
