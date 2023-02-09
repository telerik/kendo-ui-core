---
title: Create Custom Number Editor by Using NumericTextBox
page_title: Create Custom Number Editor - Kendo UI Grid for jQuery
description: "Learn how to create a custom number editor in the Kendo UI Grid for jQuery by using the Kendo UI NumericTextBox."
previous_url: /controls/data-management/grid/how-to/Editing/grid-custom-number-editor, /controls/editors/numerictextbox/how-to/custom-number-editor-grid
slug: howto_create_custom_number_editor_numerictextbox_grid
tags: grid, custom, number, editor, numerictextbox
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Telerik® UI Grid for jQuery</td>
 </tr>
</table>

## Description

How can I create a Data Grid component with a custom number editor by using the Kendo UI for jQuery NumericTextBox?

## Solution

To achieve the desired scenario, use the following suggested implementation:

```dojo
  <div>I want to change 11.11% discount to 22.22% via editing. But 22.00% is thrown back at input of 0.2222</div>
  <div id="grid"/>
  <script>
    $(document).ready(function(){
      $("#grid").kendoGrid({
        columns:[
          {
            field: "FirstName",
            title: "First Name"
          },
          {
            field: "LastName",
            title: "Last Name"
          },
          {
            field: "MyDiscount",
            title: "My Discount",
            format: "{0:p5}",
            editor: discountEditor,
          }
        ],
        dataSource: {
          data: [
            {
              FirstName: "Joe",
              LastName: "Smith",
              MyDiscount: 0.1111
            },
            {
              FirstName: "Jane",
              LastName: "Smith",
              MyDiscount: 0.1
            }
          ]
        },
        editable: true
      });

      function discountEditor (container, options) {
          $('<input data-bind="value:' + options.field + '"/>')
              .appendTo(container)
              .kendoNumericTextBox({
                decimals: 7,
                format: "p5"
              });
      }
    });
  </script>
```

## See Also

* [JavaScript API Reference of the jQuery Grid](/api/javascript/ui/grid)
