---
title: Adjust Row Heights When Columns Are Locked
page_title: Row Heights of Locked Columns | Kendo UI Grid for jQuery
description: "An example on how to adjust the height of the Kendo UI Grid for jQuery rows when columns are locked."
previous_url: /controls/data-management/grid/how-to/AngularJS/adjust-row-heights-for-grid-with-locked-columns
slug: howto_adjust_row_heights_template_locked_columns_grid
tags: grid, adjust, row, height, locked
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

You might have to handle a scenario with locked columns where the content of the column template is initially hidden through the `ng-if` directive.

In such cases, if you show the content later, you might cause issues related to the proper calculation of the row heights for the locked and unlocked parts of the Grid. To avoid such possible issues, conditionally call the [`resize()`](/api/javascript/kendo/methods/resize) and [`refresh()`](/api/javascript/ui/grid/methods/refresh) methods of the Grid in its [`dataBound`](/api/javascript/ui/grid/events/databound) event when the scope value that controls the visibility of the template content is changed.

## Solution

The following example demonstrates how to adjust the row heights in a Kendo UI Grid with locked columns and with a column template that uses the `ng-if` directive.

```dojo
    <div id="example" ng-app="KendoDemos">
      <div ng-controller="MyCtrl">
        <kendo-grid k-scope-field="grid" options="mainGridOptions"></kendo-grid>
        <kendo-button k-click="toggleVisible">Toggle hidden</kendo-button>
      </div>
    </div>

    <style>
      .contact-info-form {
        list-style-type: none;
        margin: 30px 0;
        padding: 0;
      }

      .contact-info-form li {
        margin: 10px 0;
      }

      .contact-info-form label {
        display: inline-block;
        width: 100px;
        text-align: right;
        font-weight: bold;
      }
    </style>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
        .controller("MyCtrl", function($scope, $timeout){
        $scope.visible = false;
        $scope.mainGridOptions = {
          dataSource: {
            type: "odata",
            transport: {
              read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
            },
            pageSize: 5,
            serverPaging: true,
            serverSorting: true
          },
          sortable: true,
          dataBound: function(e){
              if(!$scope.visible){
              	e.sender.resize(true);
              }
          },
          pageable: true,
          height: 500,
          columns: [{
            field: "FirstName",
            title: "First Name",
            width: "120px",
            locked: true
          },{
            field: "LastName",
            title: "Last Name",
            width: "320px",
            template: '<div ng-if=visible><div>Custom content</div><div>Custom content</div><div>Custom content</div><div>Custom content</div><div>Custom content</div></div>'
          },{
            field: "Country",
            width: "320px"
          },{
            field: "City",
            width: "320px"
          },]
        };

        $scope.toggleVisible = function(){
          $scope.visible = !$scope.visible;
          $scope.grid.refresh();
        }
      })
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
