---
title: Resize columns from a button
page_title: Resize columns from a button
description: Resize columns from a button
---

# Resize columns from a button

The example below demonstrates how to resize the grid columns using a custom button inside the grid and AngularJS handlers.

#### Example:

```html
     <div id="example" ng-app="KendoDemos">
      <div ng-controller="MyCtrl">
        <div kendo-grid="kg" options="mainGridOptions">
        </div>
        <br /><br />
        <button class="k-button" ng-click="onClick()">Disable resizing</button>
      </div>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
      .controller("MyCtrl", function($scope){

        $scope.onClick = function(){
          $scope.isDisabled=true;
        }
        
        $scope.expandButton = function(){
          $scope.kg.thead.prev().find("col").eq(0).width(200);
          $scope.kg.tbody.prev().find("col").eq(0).width(200);
        }

        $scope.mainGridOptions = {
          dataSource: {
            type: "odata",
            transport: {
              read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
            },
            pageSize: 5,
            serverPaging: true,
            serverSorting: true
          },
          sortable: true,
          pageable: true,
          columns: [{
            field: "FirstName",
            title: "First Name",
            width: "120px"
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
            field: "Title",
            width: "120px"
          },{ 
            field: "Button",
            width: "120px",
            template: '<button class="k-button" ng-click="expandButton()" ng-disabled="isDisabled">Resize</button>'
          }
				]
        };
      })
    </script>
```
