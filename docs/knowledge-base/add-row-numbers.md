---
title: Add Numbers to the Grid Rows
page_title: Render Numbers for the Rows - jQuery Data Grid
description: "Learn how to implement row numbers in the Kendo UI Grid for jQuery component."
previous_url: /controls/data-management/grid/how-to/Templates/add-row-numbers
slug: howto_addrownumbers_grid
tags: grid, row, numbers, kendoui, jquery
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
</table>

## Description

How can I implement row numbers in a Kendo UI Grid?

## Solution

To achieve the desired scenario, use the [`page()`](/api/javascript/data/datasource/methods/page) and [`pageSize()`](/api/javascript/data/datasource/methods/pagesize) methods of the Data Source.

```dojo
  <div id="grid"></div>
    <script>
      var record = 0;

      $("#grid").kendoGrid({
        dataSource: {
          type: "odata-v4",
          transport: {
            read: "https://demos.telerik.com/service/v2/odata/Customers"
          },
          pageSize: 20

        },
        sortable: true,
        columns: [
          {
            title: "#",
            template: "#= ++record #",
            width: 50
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

* [JavaScript API Reference of the jQuery Data Grid](/api/javascript/ui/grid)
* [jQuery Data Grid Overview (Demo)](https://demos.telerik.com/kendo-ui/grid/index)
* [Data Grid Overview (Documentation)]({% slug overview_kendoui_grid_widget %})
* [Product Page of the jQuery Data Grid](https://www.telerik.com/kendo-jquery-ui/data-grid-(table))
