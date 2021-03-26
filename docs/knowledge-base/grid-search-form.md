---
title: Grid External Search Form
description: An example on how to implement an external search form for the Kendo UI Grid.
type: how-to
page_title: Search Form for Grid | Kendo UI Grid for jQuery
slug: grid-search-form
tags: kendoui, kendo, grid, search, panel, form, external, filter, before, load
res_type: kb
ticketid: 1148195
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
  <td>Created with version</td>
  <td>2017.3.1026</td>
 </tr>
</table>

## Description

I want to implement a search form that accepts search criteria before populating the grid. Please advise how I can achieve this.

## Solution

The most common way of implementing such functionality is the following:

1. Set the [`autoBind`](/api/javascript/ui/grid/configuration/autobind) Kendo UI Grid property to `false`
1. Add a click handler to some button to be executed when the filter criteria is submitted
1. Get the Kendo UI Grid instance and filter the data source with the [`filter()`](/api/javascript/data/datasource/methods/filter) method.

```dojo
    <div id="example">
      <label for="orderIdFrom">Order From</label>
      <input type="text" class="num" id="orderIdFrom" placeholder="min 10248" required value="10248"/>
      <label for="orderIdTo">Order To</label>
      <input type="text" id="orderIdTo" placeholder="max  110077" class="num" required value="10250"/>
      <button class="k-button" onclick="search()">Search</button>
      <br /><br /><br />
      <div id="grid"></div>
      <script>
        function search(){
          if($("[data-role='validator']").data("kendoValidator").validate()){
            var orderFrom = $("#orderIdFrom").data("kendoNumericTextBox").value();
            var orderTo = $("#orderIdTo").data("kendoNumericTextBox").value();
            var externalFilter = { 
              logic: "and",
              filters:[
                {field:"OrderID", operator: "gte", value:orderFrom },
                {field:"OrderID", operator: "lte", value:orderTo },
              ]
            };
            grid.dataSource.filter(externalFilter);
          }
        }

        $(".num").kendoNumericTextBox();
        var grid = $("#grid").kendoGrid({
          autoBind:false,
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
          }, "Freight",
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
           }]
        }).data("kendoGrid");
        $(".num").kendoValidator()
      </script>
    </div>
```
