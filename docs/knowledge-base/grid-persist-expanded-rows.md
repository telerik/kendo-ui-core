---
title: Persist expanded rows in Kendo Grid
description: An example on how to persist the Kendo UI Grid expanded rows.
type: how-to
page_title:  Persist expanded rows in Kendo Grid | Kendo UI Grid
slug: grid-persist-expanded-rows
tags: grid, persist, detail, expand, expanded, refresh
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
  <td>2017.3.1026</td>
 </tr>
</table>

## Description

How can I persist expanded rows after grid refresh?

## Solution

A possible solution is to save the expanded rows in the [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) of the browser. Within the [detailExpand](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/detailexpand) event handler add the expanded row to the `localStorage` and then remove it within the [detailCollapse](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/detailcollapse) event handler. Finally, when the [dataBound](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event is fired, expand all rows saved to the `localStorage` using the [expandRow](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/expandrow) method.

```dojo
  <div id="example">
      <div id="grid"></div>
      <a class='k-button' id='read'>Read</a>
      <script type="text/x-kendo-template" id="template">
        <div class="tabstrip">
           <ul>
              <li class="k-state-active">
                 Orders
              </li>
              <li>
                 Contact Information
              </li>
           </ul>
           <div>
              <div class="orders"></div>
           </div>
           <div>
              <div class='employee-details'>
                 <ul>
                    <li><label>Country:</label>#= Country #</li>
                    <li><label>City:</label>#= City #</li>
                    <li><label>Address:</label>#= Address #</li>
                    <li><label>Home Phone:</label>#= HomePhone #</li>
                 </ul>
              </div>
           </div>
        </div>

      </script>

      <script>
        $(document).ready(function() {

          var grid = $("#grid").kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
              },
              pageSize: 20,
              serverPaging: true,
              serverSorting: true,
              schema:{
                model:{
                  id:'EmployeeID'
                }
              }
            },
            height: 550,
            sortable: true,
            pageable: false,
            detailTemplate: kendo.template($("#template").html()),
            detailInit: detailInit,
            dataBound:onDataBound,
            detailExpand:onDetailExpand,
            detailCollapse:onDetailCollapse,
            columns: [
              {
                field: "FirstName",
                title: "First Name",
                width: "120px"
              },
              {
                field: "LastName",
                title: "Last Name",
                width: "120px"
              },
              {
                field: "Country",
                width: "120px"
              },
              {
                field: "City",
                width: "120px"
              },
              {
                field: "Title"
              }
            ]
          }).data('kendoGrid');

          $('#read').on('click', function(){
            grid.dataSource.read();
          });
        });

        function onDataBound(e){

          var items = localStorage['expanded'];
          var grid = this;
          if(items){
            items = JSON.parse(items);
            items.forEach(function(x){
              var item = grid.dataSource.view().find(function(y){
                return y.EmployeeID == x;
              });

              if(item){
                var row = $('#'+grid.element.attr('id') + ' tr[data-uid="'+item.uid+'"]')
                grid.expandRow(row);
              }
            })
          }
        }

        function onDetailExpand(e){
          var item = this.dataItem(e.masterRow);

          var items = localStorage['expanded'];

          if(items){
            items = JSON.parse(items);

          }else{
            items = [];
          }

          items.push(item.EmployeeID);
          localStorage['expanded'] = JSON.stringify(items);
        }

        function onDetailCollapse(e){
          var item = this.dataItem(e.masterRow);
          var items =JSON.parse(localStorage['expanded']);

          items = items.filter(function(x){
            return x != item.EmployeeID;
          });

          localStorage['expanded'] = JSON.stringify(items);
        }



        function detailInit(e) {
          var detailRow = e.detailRow;

          detailRow.find(".tabstrip").kendoTabStrip({
            animation: {
              open: { effects: "fadeIn" }
            }
          });

          detailRow.find(".orders").kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
              },
              serverPaging: true,
              serverSorting: true,
              serverFiltering: true,
              pageSize: 7,
              filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
              { field: "OrderID", title:"ID", width: "70px" },
              { field: "ShipCountry", title:"Ship Country", width: "110px" },
              { field: "ShipAddress", title:"Ship Address" },
              { field: "ShipName", title: "Ship Name", width: "300px" }
            ]
          });
        }
      </script>
      <style>
        .k-detail-cell .k-tabstrip .k-content {
          padding: 0.2em;
        }
        .employee-details ul
        {
          list-style:none;
          font-style:italic;
          margin: 15px;
          padding: 0;
        }
        .employee-details ul li
        {
          margin: 0;
          line-height: 1.7em;
        }

        .employee-details label
        {
          display:inline-block;
          width:90px;
          padding-right: 10px;
          text-align: right;
          font-style:normal;
          font-weight:bold;
        }
      </style>
    </div>
```
