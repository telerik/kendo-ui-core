---
title: Custom editor with Angular JS
page_title: Custom editor with Angular JS
description: Kendo Grid custom editor with Angular JS
---

# Kendo Grid custom editor with Angular JS

The example below demonstrates how to create custom editor in Kendo Grid using AngularJS

#### Example:

```html
  <script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
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
          read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
        }
      });

      $scope.categoryDropDownEditor = function(container, options) {
        var editor = $('<input kendo-drop-down-list required k-data-text-field="\'CategoryName\'" k-data-value-field="\'CategoryID\'" k-data-source="ddlDataSource" data-bind="value:' + options.field + '"/>')
        .appendTo(container);

        $compile(editor)($scope);
        editor.css("visibility", "visible");
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
