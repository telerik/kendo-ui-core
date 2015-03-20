---
title: Prevent custom values in Kendo UI ComboBox 
page_title: Prevent custom values in Kendo UI ComboBox
description: Example that shows how to prevent custom values in Kendo UI ComboBox
---

# How to prevent custom values in Kendo UI ComboBox

The example below demonstrates how to prevent custom values in Kendo UI ComboBox.

#### Example:

```html
  <div id="example">
    <div class="demo-section k-header">
      <h4>Products</h4>
      <input id="products" style="width: 400px" />
    </div>
    <script>
      $(document).ready(function() {
        $("#products").kendoComboBox({
          placeholder: "Select product",
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          filter: "contains",
          autoBind: false,
          minLength: 3,
          dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
              read: {
                url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
              }
            }
          },
          change: function(e) {
            var widget = e.sender;

            if (widget.value() && widget.select() === -1) {
              //custom has been selected
              widget.value(""); //reset widget
            }
          }
        });
      });
    </script>

    <style scoped>
      .demo-section {
        width: 400px;
      }
    </style>
  </div>
```
