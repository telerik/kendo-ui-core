---
title: Clear filter on open 
page_title: Clear filter on open
description: Example that shows how to clear Kendo UI ComboBox filter on open
---

# How to clear filter on open

The example below demonstrates how to clear filter on open.

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
          open: function() {
            var filters = this.dataSource.filter();

            if (filters) {
              //clear applied filters
              this.dataSource.filter({});
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
