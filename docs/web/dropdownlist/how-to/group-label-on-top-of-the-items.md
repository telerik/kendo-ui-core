---
title: Move the group label on top of the items
page_title: Move the group label on top of the items
description: Example that shows how to move the group label on top of the items. The approach is also applicable for the ComboBox and MultiSelect widgets
---

# Move the group label on top of the items

Example that shows how to move the group label on top of the items. The approach is also applicable for ComboBox and MultiSelect

#### Example:

```html
<input id="customers" style="width: 400px" />
    <script>
      $(document).ready(function() {
        $("#customers").kendoDropDownList({
          dataTextField: "ContactName",
          dataValueField: "CustomerID",
          fixedGroupTemplate: "LEFT ALIGNED, FULL ROW #=data#",
          groupTemplate: "FULL LINE ABOVE ROW: #: data #",
          height: 400,
          dataSource: {
            type: "odata",
            transport: {
              read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
            },
            group: { field: "Country" }
          }
        });
      });
    </script>
    <style>
      .k-list > .k-item.k-first {
        padding-top: 2em;
      }

      .k-list > .k-state-hover.k-first {
        padding-top: calc(2em - 1px);
      }

      .k-list > .k-item.k-first > .k-group {
        height: 2em;
        left: 0;
      }

      .k-list > .k-state-hover.k-first > .k-group {
        top: -1px;
        left: -1px;
      }
    </style>
```
