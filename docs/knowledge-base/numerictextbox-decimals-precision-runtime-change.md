---
title: Define Decimals Property at Runtime in NumericTextBox
description: An example on how to configure the precision of the Kendo UI NumericTextBox during runtime.
type: how-to
page_title: Change Decimal Placement at Runtime | Kendo UI NumericTextBox
slug: numerictextbox-decimals-precision-runtime-change
tags: numerictextbox, decimals, precision, runtime, change
ticketid: 1383068
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>NumericTextBox for Progress® Kendo UI®</td>
 </tr>

  <td>Product Version</td>
  <td>2019.1.115</td>
 </tr>
</table>

## Description

How can I change the `decimals` property of the Kendo UI NumericTextBox at runtime from two decimal places to three?

## Solution

1. [Set the format](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/configuration/format) of the NumericTextBox initially to `n2`.
1. When an event has occurred, such as a button click, get a reference to the NumericTextBox.
1. [Get the value](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/methods/value) of the NumericTextBox.
1. By using [the `setOptions` method](https://docs.telerik.com/kendo-ui/api/javascript/ui/widget/methods/setoptions), configure the `value`, `format`, and [`decimals`](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/configuration/decimals) properties.

```dojo
    <input id="numericTextBox1" />

    <button class="k-button">Change Decimal</button>
    <script>   
      $("#numericTextBox1").kendoNumericTextBox({
        decimals: 2,
        format: "n2",
        value: 11.1234,
        step: 0.01,
      });

      $("button").click(function() {
        var numTextBox = $('#numericTextBox1').data('kendoNumericTextBox');
        var numValue = numTextBox.value();
        numTextBox.setOptions({ value: numValue, format: "n3", decimals: 3, step: 0.001});
      });
    </script>
```

## See Also

* [API Reference of `format`](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/configuration/format)
* [API Reference of `value`](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/methods/value)
* [API Reference of `setOptions`](https://docs.telerik.com/kendo-ui/api/javascript/ui/widget/methods/setoptions)
* [API Reference of `decimals`](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/configuration/decimals)
