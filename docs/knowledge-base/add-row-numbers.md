---
title: Add Row Numbers
page_title: Add Row Numbers | Kendo UI Grid for jQuery
description: "An example on how to implement row numbers in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Templates/add-row-numbers
slug: howto_addrownumbers_grid
tags: grid, row, numbers
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
</table>

## Description

How can I implement row numbers in a Kendo UI Grid?

## Solution

Use the [`page()`](/api/javascript/data/datasource/methods/page) and [`pageSize()`](/api/javascript/data/datasource/methods/pagesize) methods of the Data Source.

```dojo
  <div id="grid"></div>
    <script>
      var record = 0;

      $("#grid").kendoGrid({
        dataSource: {
          type: "odata",
          transport: {
            read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
          },
          pageSize: 20

        },
        sortable: true,
        columns: [
          {
            title: "#",
            template: "#= ++record #",
            width: 35
          }, {
            field: "ContactName", title: "Contact Name"
          }, {
            field: "CompanyName",
            title: "Company Name"
          }, {
            field: "Country",
            width: 150
          }
        ],
        pageable: true,
        dataBinding: function() {
          record = (this.dataSource.page() -1) * this.dataSource.pageSize();
        }
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
