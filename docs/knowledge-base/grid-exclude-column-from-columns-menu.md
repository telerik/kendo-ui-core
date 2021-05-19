---
title: Exclude Hidden Columns from Column Menu List in Grid
description: An example on how to remove an item from the list of columns in the column menu of the Kendo UI Grid for jQuery.
type: how-to
page_title: Exclude Specific Columns from Column List | Kendo UI Grid for jQuery
slug: grid-exclude-column-from-columns-menu
tags: grid, exclude, hidden, column, columns, menu
ticketid: 1158504
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2018.2.516</td>
 </tr>
</table>

## Description

A Grid allows the user to hide or show columns through its column menu but how can I hide a specific column and avoid showing it in the column menu list?

## Solution

Use the [`columnMenuInit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnmenuinit) event of the Grid and remove the desired element or elements by using jQuery.

```
columnMenuInit(e){
  e.container.find('li[role="menuitemcheckbox"]:nth-child(2)').remove();
}
```

The following example demonstrates the full implementation of the suggested approach.

```dojo
<div id="grid"></div>
<script>
  $(document).ready(function() {
    $("#grid").kendoGrid({
      columnMenuInit(e){
        e.container.find('li[role="menuitemcheckbox"]:nth-child(2)').remove();
      },
      dataSource: {
        type: "odata",
        transport: {
          read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
        },
        schema: {
          model: {
            fields: {
              OrderID: { type: "number" },
              ShipCountry: { type: "string" },
              ShipName: { type: "string" },
              ShipAddress: { type: "string" }                                        
            }
          }
        },
        pageSize: 30,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
      },
      height: 550,
      sortable: true,
      filterable: true,
      columnMenu: true,
      pageable: true,
      columns: [ {
        field: "OrderID",
        title: "Order ID",
        width: 120
      }, {
        field: "ShipCountry",
        title: "Ship Country"
      }, {
        field: "ShipName",
        title: "Ship Name"
      },  {
        field: "ShipAddress",
        filterable: false
      }
               ]
    });
  });
</script>
```

## See Also

* [API Reference of the columnMenuInit Event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnmenuinit)
* [How to Change the Column Names inside the Column Menu of the Grid](https://docs.telerik.com/kendo-ui/knowledge-base/grid-column-menu-change-text)
* [How to Include Hidden Columns in PDF Export](https://docs.telerik.com/kendo-ui/knowledge-base/grid-include-hidden-columns-to-exported-pdf)
