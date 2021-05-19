---
title: Change Placeholder Text after Initialization
description: An example on how to change the placeholder text of a Kendo UI ComboBox for jQuery.
type: how-to
page_title: Configure the Placeholder Attribute | Kendo UI ComboBox for jQuery
slug: combobox-placeholder-change-programmatic-attribute
tags: combobox, placeholder, change, programmatic, attribute, initialization
ticketid: 1411783
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>ComboBox for Progress® Kendo UI®</td>
 </tr>

  <td>Product Version</td>
  <td>2019.2.514</td>
 </tr>
</table>

## Description

How can I change the placeholder text of a Kendo UI ComboBox after it has already been initialized?

## Solution

To set the placeholder text of the Kendo UI ComboBox, refer to its [`input` element](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox/fields/input) and change the [`placeholder` attribute by using jQuery](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#The_placeholder_attribute).

```javascript
     var comboBox = $("#combobox").data("kendoComboBox");
     $(comboBox.input).attr('placeholder', '--select--');
```

The following example demonstrates the full implementation of the suggested approach.

```dojo
    <input id="combobox" />
    <script>
      $(document).ready(function () {

        $("#combobox").kendoComboBox({
          placeholder: "Select..."
        });

        var comboBox = $("#combobox").data("kendoComboBox");
        $(comboBox.input).attr('placeholder', '--select--');

      });
    </script>
```

## See Also

* [API Reference of the input Element](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox/fields/input)
* [Official MDN Web Documentation of the placeholder Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#The_placeholder_attribute)
