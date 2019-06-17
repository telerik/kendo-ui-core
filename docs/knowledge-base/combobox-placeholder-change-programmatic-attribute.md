---
title: Change Placeholder Text after Initialization
description: An example demonstrating how to change the placeholder text of a Kendo UI ComboBox
type: how-to
page_title: Configure the Placeholder Attribute | Kendo UI ComboBox
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

To set the text of the Kendo UI ComboBox's placeholder, refer to its [input element](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox/fields/input) and change the [placeholder attribute using jQuery](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#The_placeholder_attribute).

```javascript
     var comboBox = $("#combobox").data("kendoComboBox");
     $(comboBox.input).attr('placeholder', '--select--');
```

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

* [input - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox/fields/input)
* [placeholder attribute - MDN web docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#The_placeholder_attribute)
