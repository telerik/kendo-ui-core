---
title: Change the Default Filter Operator
description: An example on how to change the default filter operator in the Kendo UI Grid.
type: how-to
page_title: Change the Default Filter Operator | Kendo UI Grid
slug: grid-change-default-filter-operator
tags: grid, filter, filtering, change, default, operator, menu
ticketid: 1147525
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I change the default filter operator of the Grid?

## Solution

Within [`filterMenuInit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/filtermenuinit), change the value of the DropDownList by using its API.

```dojo
    <div id="example">
      <div id="grid"></div>
      <script>
        $(document).ready(function() {
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
                    Freight: { type: "number" },
                    ShipName: { type: "string" },
                    OrderDate: { type: "date" },
                    ShipCity: { type: "string" }
                  }
                }
              },
              pageSize: 20,
              serverPaging: true,
              serverFiltering: true,
              serverSorting: true
            },
            height: 550,
            filterable: true,
            sortable: true,
            pageable: true,
            columns: [{
              field:"OrderID",
              filterable: false
            },
                      "Freight",
                      {
                        field: "OrderDate",
                        title: "Order Date",
                        format: "{0:MM/dd/yyyy}"
                      }, {
                        field: "ShipName",
                        title: "Ship Name"
                      }, {
                        field: "ShipCity",
                        title: "Ship City"
                      }
                     ],
            filterMenuInit:onFilterMenuInit
          });
        });

        function onFilterMenuInit(e) {
          e.container.find('[data-bind="value: filters[0].operator"]').data('kendoDropDownList').value("neq")
          e.container.find('[data-bind="value: filters[1].operator"]').data('kendoDropDownList').value("neq")
        }

      </script>
    </div>
```
