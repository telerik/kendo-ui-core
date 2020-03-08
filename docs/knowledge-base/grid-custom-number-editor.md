---
title: Create Custom Number Editor Using NumericTextBox
page_title: Create Custom Number Editor | Kendo UI Grid for jQuery
description: "An example on how to create a custom number editor in the Kendo UI Grid for jQuery by using the Kendo UI NumericTextBox."
previous_url: /controls/data-management/grid/how-to/Editing/grid-custom-number-editor
slug: howto_create_custom_number_editor_numerictextbox_grid
tags: grid, custom, number, editor, numerictextbox
component: grid
type: how-to
res_type: kb
---

The following example demonstrates how to create a Grid with a custom number editor by using the NumericTextBox.

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

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
