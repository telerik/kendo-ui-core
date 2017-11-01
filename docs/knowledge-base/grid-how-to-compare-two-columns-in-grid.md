---
title: Compare 2 Columns in AngularJS Kendo Grid
description: An example on how to compare two columns in Grid
type: how-to
page_title: How to Compare Two Columns in Grid
slug: grid-how-to-compare-two-columns-in-grid
tags: grid, angularjs, compare
ticketid: 1122028
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr> <tr>
  <td>Made with version</td>
  <td>2017.2.621</td>
 </tr></table>


## Description
How do I compare two columns and then change the background color of one columns.

## Solution

The desired result can be achieved using the [column.template](docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.template) property and an if statement inside the [template](http://docs.telerik.com/kendo-ui/framework/templates/overview#template-syntax) to compare the values from the columns.

Please check the following example demonstrating this:

````html
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
````
