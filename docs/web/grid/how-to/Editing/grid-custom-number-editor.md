---
title: Custom number editor using Kendo UI NumericTextBox
page_title: Custom number editor using Kendo UI NumericTextBox
description: Custom number editor using Kendo UI NumericTextBox
---

# Custom number editor using Kendo UI NumericTextBox

The following runnable sample demonstrates how to create Kendo UI Grid with custom number editor using Kendo UI NumericTextBox 

#### Example

```html
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