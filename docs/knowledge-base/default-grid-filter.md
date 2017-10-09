---
title: Grid default filter operator
description: Set default filter operators row filterable Kendo Ui Grid
type: how-to
page_title: Set default grid filter operators
slug: default-grid-filter
tags: grid,default filter,row filter,operator,kendo grid
ticketid: 1114303
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
</table>


## Description

The grid automatically selects the firts filter operator in the dropdown. I want the filter operator which is selected by default to be a different one. How can I do that?

## Solution

- on the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-dataBound) event of the grid, find the filter dropdown and [`select()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist#methods-select) the desired default filter option


- on the [`filter`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-filter) event of the grid, if the filter is cleared, select the desired default filter option

```html

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