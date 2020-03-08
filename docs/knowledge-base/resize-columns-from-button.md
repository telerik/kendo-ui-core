---
title: Resize Columns from a Button
page_title: Resize Columns from a Button | Kendo UI Grid for jQuery
description: "An example on how to resize the columns of the Kendo UI Grid for jQuery by using a custom button and AngularJS handlers."
previous_url: /controls/data-management/grid/how-to/AngularJS/resize-columns-from-button
slug: howto_resize_columnsfrom_abutton_grid
tags: resize, columns, using, custom, button, angularjs
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
  <tr>
  <td>Preferred Framework</td>
  <td>AngularJS</td>
 </tr>
</table>

## Description

How can I resize the columns of the Kendo UI Grid for jQuery by using a custom button and AngularJS handlers?

## Solution

The following example demonstrates how to resize the columns of the Grid by using a custom button and AngularJS handlers.

```dojo
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
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
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

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
