---
title: Use AngularJS in popup editor template
page_title: Use AngularJS in popup editor template
description: Kendo UI Grid example that demontrates how to use AngularJS in Grid popup editor template.
---

# Use AngularJS in popup editor template

The example below demonstrates how to use AngularJS directives in custom Grid popup editor template.

The dataItem is made dirty via `ng-change` (for HTML elements) and `k-on-change` (for Kendo UI widget). Otherwise the DataSource will not update modified data items.

#### Example:

```html
    <div id="example" ng-app="KendoDemos">
      <div ng-controller="MyCtrl">
        <kendo-grid options="mainGridOptions"></kendo-grid>

        <script type="text/x-kendo-template" id="template">
            <label>Product Name <input k-on-change="dataItem.dirty=true" kendo-dropdownlist k-data-source="productNames" ng-model="dataItem.ProductName" /><label>
            <br />
            <label>Unit Price <input k-on-change="dataItem.dirty=true" kendo-numeric-text-box k-ng-model="dataItem.UnitPrice" /></label>
            <br />
            <label my-directive>Discontinued <input type="checkbox" ng-change="dataItem.dirty=true" ng-model="dataItem.Discontinued" /></label>
        </script>
      </div>
    </div>

    <script>
      var crudServiceBaseUrl = "http://demos.telerik.com/kendo-ui/service";
      angular.module("KendoDemos", [ "kendo.directives" ])
      .directive("myDirective", function() {
        return {
          restrict: "AE",
          link: function(scope, element) {
            if (scope.dataItem.Discontinued) {
              element.css("background-color", "red");
            } else {
              element.css("background-color", "green");
            }
          }
        };
      })
      .controller("MyCtrl", function($scope) {
        $scope.mainGridOptions = {
          dataSource: {
            transport: {
              read:  {
                url: crudServiceBaseUrl + "/Products",
                dataType: "jsonp"
              },
              update: {
                url: crudServiceBaseUrl + "/Products/Update",
                dataType: "jsonp"
              },
              destroy: {
                url: crudServiceBaseUrl + "/Products/Destroy",
                dataType: "jsonp"
              },
              create: {
                url: crudServiceBaseUrl + "/Products/Create",
                dataType: "jsonp"
              },
              parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                  return {models: kendo.stringify(options.models)};
                }
              }
            },
            batch: true,
            pageSize: 20,
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true } },
                  UnitPrice: { type: "number", validation: { required: true, min: 1} },
                  Discontinued: { type: "boolean" },
                  UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                }
              }
            }
          },
          pageable: true,
          height: 550,
          toolbar: ["create"],
          columns: [
            { field: "ProductName", title: "Product Name" },
            { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "120px" },
            { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
            { field: "Discontinued", width: "120px" },
            { command: ["edit", "destroy"], title: " ", width: "200px" }],
          editable: {
            mode: "popup",
            template: kendo.template($("#template").html())
          }
        };

        $scope.productNames = [
          "Chai",
          "Chang",
          "Aniseed Syrup",
          "Chef Anton's Cajun Seasoning"
        ];
      });
    </script>
```
