---
title: Change Group Header Position When Columns Are Locked
page_title: Header Position of Locked Columns | Kendo UI Grid for jQuery
description: "An example on how to change the position of the group header when locked columns are used in the Kendo UI Grid."
previous_url: /controls/data-management/grid/how-to/Layout/change-group-header-position-when-locked-columns-are-used
slug: howto_change_group_header_position_wthlocked_columns_grid
tags: grid, change, group, header, position, locked, frozen, columns
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
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>

</table>


## Description

How can I change the header position of the locked columns in a Kendo UI Grid?

## Solution

The following example demonstrates how to change the group header position when locked columns are used to show them on the right table.

```dojo
    <div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataBound: function(e){
              var grid = this;
              this.lockedTable.find(".k-grouping-row").each(function(index) {
                var arrow = $(this).find("a");
                grid.tbody.find(".k-grouping-row:eq("+index+") td").text($(this).text())
                $(this).find("p").text(" ").append(arrow);
              })
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
                    ShipCity: { type: "string" },
                    ShipAddress: { type: "string" }
                  }
                }
              },
              pageSize: 30
            },
            height: 540,
            sortable: true,
            reorderable: true,
            groupable: true,
            resizable: true,
            filterable: true,
            columnMenu: true,
            pageable: true,
            columns: [ {
              field: "OrderID",
              title: "Order ID",
              locked: true,
              lockable: false,
              width: 50
            }, {
              field: "ShipCountry",
              title: "Ship Country",
              width: 300
            }, {
              field: "ShipCity",
              title: "Ship City",
              width: 300
            },{
              field: "ShipName",
              title: "Ship Name",
              width: 300
            },  {
              field: "ShipAddress",
              lockable: false,
              width: 400
            }
                     ]
          });
        });
      </script>
    </div>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
