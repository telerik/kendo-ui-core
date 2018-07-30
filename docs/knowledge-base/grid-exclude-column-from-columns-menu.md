---
title: Exclude Hidden Column from Columns Menu List
description: An example demonstrating how to remove an item from the list of columns in the Column Menu
type: how-to
page_title: Exclude Specific Column from List in Column Menu | Kendo UI Grid
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

A grid has the ability to allow the user to hide or show columns via the Columns Menu; but what if I want to hide a column and not have it show up in the list to un-hide?

## Solution

In order to implement the described functionality, take advantage of the [columnMenuInit event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnmenuinit) of the Kendo UI Grid API and remove the desired element(s) using jQuery.

The following code snippet demonstrates how the event could be configured:

```
columnMenuInit(e){
  e.container.find('li[role="menuitemcheckbox"]:nth-child(2)').remove();
}
```

Sample demonstrating the implementation:

```html
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

* [columnMenuInit event API Reference.](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnmenuinit)
* [How to Change the Column Names inside the Column Menu of the Grid.](https://docs.telerik.com/kendo-ui/knowledge-base/grid-column-menu-change-text)
* [How to Include Hidden Columns in PDF Export.](https://docs.telerik.com/kendo-ui/knowledge-base/grid-include-hidden-columns-to-exported-pdf)
