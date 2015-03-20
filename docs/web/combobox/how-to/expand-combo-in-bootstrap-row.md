---
title: Expand ComboBox located in Bootstrap layout
page_title: Expand ComboBox located in Bootstrap layout
description: Example that shows how to expand Kendo UI ComboBox located in Bootstrap layout
---

# How to make Kendo UI ComboBox visible input readonly

The example below demonstrates how to expand Kendo UI ComboBox located in Bootstrap layout.
Basically you should set the input width to be 100%.

#### Example:

```html
  <div class="row">
    <div class="col-md-8"><input id="categories" style="width: 100%" /></div>
    <div class="col-md-4">.col-md-4</div>
  </div>
  <script>
    $(document).ready(function() {
        $("#categories").kendoComboBox({
            dataTextField: "CategoryName",
            dataValueField: "CategoryID",
            dataSource: {
                type: "odata",
                serverFiltering: true,
                transport: {
                    read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
                }
            }
        });
    });
  </script>
</div>
```
