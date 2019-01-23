---
title: Define Decimals Property at Runtime
description: An example demonstrating how to configure the precision of the NumericTextBox during runtime
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

How can I change the decimals property of Kendo UI NumericTextBox from two decimals places to three during runtime?

## Solution

1. [Set the format](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/configuration/format) of the NumericTextBox initially to "n2".
1. When an event has occurred, such as a button click, get a reference to the NumericTextBox.
1. [Get the value](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/methods/value) of the NumericTextBox.
1. Using [the setOptions method](https://docs.telerik.com/kendo-ui/api/javascript/ui/widget/methods/setoptions), configure the value, format, and [decimals](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/configuration/decimals) properties.

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

* [format - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/configuration/format)
* [value - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/methods/value)
* [setOptions - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/widget/methods/setoptions)
* [decimals - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/configuration/decimals)
