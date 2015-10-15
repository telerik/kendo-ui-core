---
title: Reorder AngularJS Grid rows
page_title: Reorder AngularJS Grid rows
description: Reorder AngularJS Grid rows
---

# Reorder AngularJS Grid rows

The following runnable sample demonstrates how to reorder Grid rows using Kendo UI Sortable in AngularJS application.

#### Example:

```html
  <script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

  <div id="example" ng-app="KendoDemos">
    <div ng-controller="MyCtrl">
      <kendo-sortable options="sortableOptions">
        <kendo-grid k-scope-field="myGrid" options="mainGridOptions"></kendo-grid>
      </kendo-sortable>
    </div>
  </div>

  <script>
    angular.module("KendoDemos", [ "kendo.directives" ])
    .controller("MyCtrl", function($scope){
      $scope.mainGridOptions = {
        dataSource: {
          data: products.slice(0, 20),
          schema: {
            model: {
              fields: {
                ProductName: { type: "string" },
                UnitPrice: { type: "number" },
                UnitsInStock: { type: "number" },
                Discontinued: { type: "boolean" }
              }
            }
          }
        },
        columns: [
          "ProductName",
          { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" },
          { field: "UnitsInStock", title: "Units In Stock", width: "130px" },
          { field: "Discontinued", width: "130px" }
        ]
      };

      $scope.sortableOptions = {
        filter: ".k-grid tr[data-uid]",
        hint: $.noop,
        cursor: "move",
        placeholder: function(element) {
          return element
                    .clone()
                    .removeAttr("uid")
                    .addClass("k-state-hover")
                    .css("opacity", 0.65);
        },
        container: ".k-grid tbody",
        change: function(e) {
          var grid = $scope.myGrid,
              dataItem = grid.dataSource.getByUid(e.item.data("uid"));

          grid.dataSource.remove(dataItem);
          grid.dataSource.insert(e.newIndex, dataItem);
        }
      };
    });
  </script>
```
