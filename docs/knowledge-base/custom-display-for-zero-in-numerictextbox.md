---
title: Custom Display for Zero Values in NumericTextBox
description: Learn how to display a custom format when the value is zero in a Kendo UI NumericTextBox.
type: how-to
page_title: How to Customize Zero Value Display in Kendo UI NumericTextBox
slug: custom-display-for-zero-in-numerictextbox
tags: kendo-ui, numerictextbox, customization, format, zero
res_type: kb
ticketid: 1670959
---

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>NumericTextBox for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.4.1112</td>
</tr>
</tbody>
</table>

## Description
I want to change my existing [NumericTextBox](https://www.telerik.com/kendo-jquery-ui/documentation/controls/numerictextbox/overview) to display a custom format when the value is zero. Specifically, double zeros should be displayed for zero values, whereas all other values should be displayed normally. 

This KB article also answers the following questions:
- How to customize the zero value display in NumericTextBox?
- Can I format the zero value differently in a NumericTextBox?
- Is it possible to show double zeros for a zero value in NumericTextBox?

## Solution
To achieve custom formatting for zero values in a NumericTextBox, utilize the [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/events/change) event and the [`setOptions()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/widget/methods/setoptions) method to conditionally update the format. 

Here's how to implement this approach:

1. Initialize the NumericTextBox with a default format.
2. Use the `change` event to check the current value of the NumericTextBox.
3. If the value is zero, update the format to show double zeros using `setOptions()`.
4. If the value is not zero and the current format is set to show double zeros, revert back to the default format.

```dojo
   <input id="numerictextbox" />
    <script>
      $("#numerictextbox").kendoNumericTextBox({
        format: "0",
        change: function(e) {
          if(e.sender.value() === 0) {
            e.sender.setOptions({
              format: "0.0"
            })
          } else {
            if(e.sender.options.format == "0.0") {
              e.sender.setOptions({
                format: "0"
              })
            }
          }
        }
      });
    </script>
```

## See Also
- [NumericTextBox Change Event Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/events/change)
- [NumericTextBox Overview](https://docs.telerik.com/kendo-ui/controls/editors/numerictextbox/overview)
