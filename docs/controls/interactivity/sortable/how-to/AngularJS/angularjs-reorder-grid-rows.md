---
title: Reorder AngularJS Grid Rows
page_title: Reorder AngularJS Grid Rows | Kendo UI Sortable
description: "Learn how to reorder AngularJS Grid rows by using the Kendo UI Sortable widget."
slug: howto_reorderangularjsgridrows_angular_sortable
---

# Reorder AngularJS Grid Rows

The example below demonstrates how to reorder Grid rows using Kendo UI Sortable in an AngularJS application.

###### Example

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

## See Also

Other articles and how-to examples on the Kendo UI Sortable:

* [Sortable JavaScript API Reference](/api/javascript/ui/sortable)
* [How to Nest Sortables]({% slug howto_nestsortables_sortable %})
* [How to Persist Order in localStorage]({% slug howto_persistoderinlocalstorage_sortable %})
* [How to Reorder Grid Rows]({% slug howto_reordergridrows_sortable %})
* [How to Reorder Multiple Items]({% slug howto_reordermultipleitems_sortable %})
* [How to Reorder Rows in Nested Grid]({% slug howto_reorderrowsinnestedgrid_sortable %})
* [How to Transfer Grid Rows]({% slug howto_transfergridrows_sortable %})

For more runnable examples on the Kendo UI Sortable, browse the [how-to articles]({% slug howto_usesortablewith_gridinbatcheditablemode_angular_sortable %}).
