---
title: Limit Maximum Number of Columns Visible at a Time Using the Column Menu
page_title: Limit the Number of Columns at a Time Using the Column Menu - Kendo UI Grid for jQuery
description: "Learn how to disable column items in the Column menu when a max number of columns is already shown"
previous_url: /controls/data-management/grid/how-to/Layout/allow-a-single-expanded-row-only
slug: howto_limit_max_number_columns_visible_grid
tags: grid, limit, columns, visible, show, hide
component: chart
ticketid: 1572191
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I limit the number of columns that can be shown with the Column menu?

## Solution

1. Specify the maximum number of columns that can be visible In the [`columnMenuInit`](/api/javascript/ui/grid/events/columnmenuinit) event handler. Disable the items in the Column menu by adding the `k-disabled` / `k-state-disabled` CSS class if the checked items are equal to or higher than the max number.
1. Disable or enable items based on the checked item number in the [`columnHide`](/api/javascript/ui/grid/events/columnhide) and [`columnShow`](/kendo-ui/api/javascript/ui/grid/events/columnshow) event handlers.

The following example demonstrates how to collapse a Grid row that was previously expanded when the user expands a new one.

```dojo
      <div id="grid"></div>
      <script>
        let container,
            columnsMenu,
            checkbox,
            unchecked,
            maxVisibleColumns;

        $(document).ready(function () {
          $("#grid").kendoGrid({
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
            columns: [
              {
                field: "OrderID",
                title: "Order ID",
                hidden: true,
                width: 120
              }, {
                field: "ShipCountry",
                title: "Ship Country",
                hidden: true,
              }, {
                field: "ShipName",
                title: "Ship Name",
                hidden: true,
              }, {
                field: "ShipAddress",
                title: "Ship Address",
                filterable: false,
                hidden: true,
              },
              {
                field: "ShipCity",
                title: "Ship Address",
                filterable: false
              },
              {
                field: "ShipVia",
                title: "Ship Address",
                filterable: false
              },
              {
                field: "EmployeeID",
                title: "Ship Address",
                filterable: false
              },
              {
                field: "Freight",
                title: "Ship Address",
                filterable: false
              }
            ],
            columnMenuInit: function(e) {
              container = e.container;
              columnsMenu = container.find(".k-columns-item ul");
              checkbox = columnsMenu.find("input");
              unchecked = checkbox.not(":checked");
              maxVisibleColumns = 5; //set the maximum visible columns at a time

              let checked = checkbox.filter(":checked");
              if(checked.length >= maxVisibleColumns) {
                unchecked.closest("li").addClass("k-state-disabled"); //disable items for hidden columns
              }

            },
            columnHide: function(e) {
              setTimeout(function() {
                checkForMaxItems();
              });
            },
            columnShow: function() {
              setTimeout(function() {
                checkForMaxItems()
              });
            }
          });
        });

        function checkForMaxItems() {
          let checkedCount = columnsMenu.find("input:checked").length,
              unchecked = checkbox.not(":checked");

          if(checkedCount >= maxVisibleColumns) {
            unchecked.closest("li").addClass("k-state-disabled");
          } else {
            unchecked.closest("li").removeClass("k-state-disabled");
          }
        }
      </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
