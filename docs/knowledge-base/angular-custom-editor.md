---
title: Create Custom Grid Editors in AngularJS
page_title: Create Custom Editors When Using AngularJS - jQuery Data Grid
description: "Learn how to create custom editors in the Kendo UI Data Grid by using AngularJS."
previous_url: /controls/data-management/grid/how-to/AngularJS/angular-custom-editor
slug: howto_create_custom_editors_grid
tags: grid, create, custom, editors, angularjs
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
 <tr>
  <td>Preferred Framework</td>
  <td>AngularJS</td>
 </tr>
</table>

> Starting with R2 2022, the Kendo UI team officially drops the support for AngularJS 1.x through Kendo UI for jQuery. The AngularJS related files and functionality are removed from the bundles and distribution in R3 SP1 2023. The last version that contains the files is R3 2023.

## Description

How can I create a custom editor in the Kendo UI Grid in AngularJS applications?

## Solution

The following example demonstrates how to create a custom editor in the [Data Grid](https://www.telerik.com/kendo-ui/grid) in AngularJS applications.

> The example loads Kendo UI 2023.3.1010 version.

```dojo
  <script src="https://kendo.cdn.telerik.com/2023.3.1010/js/angular.min.js"></script>
  <script src="https://kendo.cdn.telerik.com/2023.3.1010/js/kendo.all.min.js"></script>
  <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
  <div id="example" ng-app="KendoDemos">
    <div ng-controller="MyCtrl">
      <kendo-grid options="mainGridOptions"></kendo-grid>
    </div>
  </div>

  <script>
    angular.module("KendoDemos", [ "kendo.directives" ])
    .controller("MyCtrl", function($scope, $compile){
      $scope.dataSource = new kendo.data.DataSource({
        pageSize: 20,
        data: products,
        autoSync: true,
        schema: {
          model: {
            id: "ProductID",
            fields: {
              ProductID: { editable: false, nullable: true },
              ProductName: { validation: { required: true } },
              Category: { defaultValue: { CategoryID: 1, CategoryName: "Beverages"} },
              UnitPrice: { type: "number", validation: { required: true, min: 1} }
            }
          }
        }
      });

      $scope.ddlDataSource = new kendo.data.DataSource({
        type: "odata",
        transport: {
          read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
        }
      });

      $scope.categoryDropDownEditor = function(container, options) {
        var editor = $('<input kendo-drop-down-list required k-data-text-field="\'CategoryName\'" k-data-value-field="\'CategoryID\'" k-data-source="ddlDataSource" data-bind="value:' + options.field + '"/>')
        .appendTo(container);
      }

      $scope.mainGridOptions = {
        dataSource: $scope.dataSource,
        pageable: true,
        height: 550,
        toolbar: ["create"],
        columns: [
          { field:"ProductName",title:"Product Name" },
          { field: "Category", title: "Category", width: "180px", editor: $scope.categoryDropDownEditor, template: "#=Category.CategoryName#" },
          { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "130px" },
          { command: "destroy", title: " ", width: "150px" }],
        editable: true
      };


    })
  </script>
```

## See Also

* [JavaScript API Reference of the Data Grid](/api/javascript/ui/grid)
* [jQuery Data Grid Overview (Demo)](https://demos.telerik.com/kendo-ui/grid/index)
* [Data Grid Overview (Documentation)]({% slug overview_kendoui_grid_widget %})
* [Product Page of the jQuery Data Grid](https://www.telerik.com/kendo-jquery-ui/data-grid-(table))
