---
title: Set the Default Filter Operator in the Grid
description: An example on how to set the default filter operators of the Kendo UI Grid rows.
type: how-to
page_title: Set the Default Filter Operator | Kendo UI Grid for jQuery
slug: default-grid-filter
tags: grid, default filter, row filter, operator, kendo grid
ticketid: 1114303
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>


## Description

The Grid automatically selects the first filter operator in the dropdown.

How can I change the default filter operator and select to display a different one?

## Solution

1. On the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event of the grid, find the filter dropdown and [`select()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/methods/select) the desired default filter option.
1. On the [`filter`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/filter) event of the Grid, if the filter is cleared, select the desired default filter option.

```dojo

    <div id="grid"></div>
          <script>
            $(document).ready(function() {
              var grid = $("#grid").kendoGrid({
                dataSource: {
                  type: "odata",
                  transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                  },
                  schema: {
                    model: {
                      fields: {
                        OrderID: { type: "number" },
                        OrderDate: { type: "date" },
                        ShippedDate: { type: "date" }
                      }
                    }
                  },
                  pageSize: 20,
                  serverPaging: true,
                  serverFiltering: true,
                },
                height: 550,
                filterable: {
                  mode: "row"
                },
                pageable: true,
                columns:
                [{
                  field: "OrderID",
                  width: 50,
                  filterable: {
                    cell: {
                      showOperators: false
                    }
                  }
                },{
                  field: "OrderDate",
                  title: "Order Date",
                  format: "{0:MM/dd/yyyy}",
                  width:200
                }],
                filter: function(e){
                  if(!e.filter){
                    if(e.field === "ShippedDate" || e.field === "OrderDate"){
                      var filterCell = e.sender.thead.find(".k-filtercell[data-field='" + e.field + "']");
                      var filterDropDown = filterCell.find("[data-role='dropdownlist']").data("kendoDropDownList")
                      filterDropDown.select(3);
                      filterDropDown.trigger("change");
                    }
                  }
                }
                }).data("kendoGrid");

              grid.one("dataBound", function(e){
                var filterCell = e.sender.thead.find(".k-filtercell[data-field='OrderDate']");
                var filterDropDown = filterCell.find("[data-role='dropdownlist']").data("kendoDropDownList");
                filterDropDown.select(3);
                filterDropDown.trigger("change");
              });
            });
          </script>

```
