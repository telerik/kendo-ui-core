---
title: Opening ComboBox on Focus in Kendo UI for jQuery
description: Learn how to configure the Kendo UI ComboBox for jQuery to open when the control gains focus, similar to the default behavior of the Telerik ComboBox.
type: how-to
page_title: How to Make Kendo UI ComboBox Open on Focus - Kendo UI for jQuery
slug: how-to-open-combobox-on-focus-kendo-ui-jquery
tags: kendo, ui, combobox, focus, open
res_type: kb
components: ["combobox"]
ticketid: 1675005
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI ComboBox for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.4.1112</td>
</tr>
</tbody>
</table>

## Description

By default, the Kendo UI ComboBox for jQuery opens its dropdown when the user clicks on the arrow icon on the right side of the control. However, the requirement is to have the ComboBox open when it gains focus.

This knowledge base article also answers the following questions:
- How can I make the Kendo UI ComboBox open when it gains focus?
- Is it possible to open the ComboBox dropdown on focus instead of clicking the arrow?

## Solution

To achieve the desired behavior of opening the Kendo UI ComboBox when it gains focus, use the following JavaScript code snippet. This solution involves finding all ComboBox instances on the page using the `.k-combobox` class, getting a reference to each, and attaching a "focus" event handler that opens the ComboBox when it gains focus.

```javascript
$(".k-combobox input[data-role='combobox']").each(function(){
    var combobox = $(this).data("kendoComboBox");
    combobox.input.on("focus", function (args) {
        var senderElement = $(args.currentTarget).siblings("input[data-role='combobox']");
        var senderReference = senderElement.data("kendoComboBox");

        senderReference.open();
    });
});
```

The above code snippet ensures that whenever any ComboBox gains focus, its dropdown opens.

For a practical implementation, refer to this example: 
```dojo
<div class="k-d-flex k-justify-content-center" style="padding-top: 54px;">
      <div  id="tshirt-view" class="k-w-300">
        <label for="products">Find a product</label>
        <input id="products" style="width: 100%;" />
        <div class="demo-hint">Hint: type at least three characters. For example "che".</div>
      </div>
    </div>
    <script>
      $(document).ready(function() {
        $("#products").kendoComboBox({
          placeholder: "Select product",
          dataTextField: "ProductName",
          dataValueField: "ProductID",          
          dataSource: {
            type: "odata-v4",
            serverFiltering: true,
            transport: {
              read: {
                url: "https://demos.telerik.com/service/v2/odata/Products",
              }
            }
          }
        });

        $(".k-combobox input[data-role='combobox']").each(function(){
          var combobox = $(this).data("kendoComboBox");
          combobox.input.on("focus", function (args) {
            var senderElement = $(args.currentTarget).siblings("input[data-role='combobox']");
            var senderReference= senderElement.data("kendoComboBox");

            senderReference.open();
          });
        })
      });
    </script>
```

## See Also

- [Kendo UI ComboBox for jQuery Documentation](https://docs.telerik.com/kendo-ui/controls/editors/combobox/overview)
- [ComboBox API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
- [Handling Focus Events in JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event)
