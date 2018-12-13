---
title: Compare Two Columns in AngularJS Grids
description: An example on how to compare two columns of a Kendo UI Grid in AngularJS.
type: how-to
page_title: Compare Two Columns | Kendo UI Grid
slug: grid-how-to-compare-two-columns-in-grid
tags: grid, angularjs, compare
ticketid: 1122028
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr> <tr>
  <td>Made with version</td>
  <td>2017.2.621</td>
 </tr></table>


## Description

How can I compare two Grid columns and then change the background color of one of them in AngularJS projects?

## Solution

Use the [`column.template`](/api/javascript/ui/grid/configuration/columns.template) property and an `if` statement inside the [template](/framework/templates/overview#template-syntax) to compare the values from the columns.

```dojo
    <div id="example" ng-app="KendoDemos">
      <div ng-controller="MyCtrl">
        <kendo-grid options="mainGridOptions">
        </kendo-grid>
      </div>
    </div>
    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
        .controller("MyCtrl", function($scope){
        $scope.mainGridOptions = {
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
            },
            pageSize: 5,
            serverPaging: true,
            serverSorting: true
          },
          sortable: true,
          pageable: true,
          dataBound: function() {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
          },
          columns: [{
            field: "FirstName",
            title: "First Name",
            width: "120px",
            template:"#if(FirstName.length >LastName.length){#<span class='blue'>#: FirstName #</span>#}else{#<span class='red'>#: FirstName #</span>#}#"
          },{
            field: "LastName",
            title: "Last Name",
            width: "120px"
          },{
            field: "Country",
            width: "120px"
          },{
            field: "City",
            width: "120px"
          },{
            field: "Title"
          }]
        };

        $scope.detailGridOptions = function(dataItem) {
          return {
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
              },
              serverPaging: true,
              serverSorting: true,
              serverFiltering: true,
              pageSize: 5,
              filter: { field: "EmployeeID", operator: "eq", value: dataItem.EmployeeID }
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
              { field: "OrderID", title:"ID", width: "56px" },
              { field: "ShipCountry", title:"Ship Country", width: "110px" },
              { field: "ShipAddress", title:"Ship Address" },
              { field: "ShipName", title: "Ship Name", width: "190px" }
            ]
          };
        };
      })
    </script>
    <style>
      .blue{
        background-color:blue
      }

      .red{
        background-color:red
      }
    </style>
```
