---
title: Use Sortable with Grid in AngularJS
page_title: Use Sortable with Grid in AngularJS | Kendo UI Sortable
description: "Learn how to reorder AngularJS Grid rows by using the Kendo UI Sortable widget."
previous_url: /controls/interactivity/sortable/how-to/AngularJS/angularjs-reorder-grid-rows, /controls/interactivity/sortable/how-to/AngularJS/angularjs-batch-editable-grid
slug: howto_usesortablewith_gridinbatcheditablemode_angular_sortable
---

# Use Sortable with Grid in AngularJS

The examples below demonstrate how to use the Kendo UI Sortable widget with a Kendo UI Grid either in an editable or in a non-editable mode in AngularJS applications.

## Non-Editable Grid Mode

The example below demonstrates how to reorder the rows of a Kendo UI Grid in a non-editable mode by using the Kendo UI Sortable in AngularJS.

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

## Editable Grid Mode

The example below demonstrates how to reorder the rows of a Kendo UI Grid in an editable mode by using the Kendo UI Sortable in AngularJS.

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
      .controller("MyCtrl", function($scope, $compile){
        $scope.dataSource = new kendo.data.DataSource({
          pageSize: 20,
          data: products,
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

        $scope.textBoxEditor = function(container, options) {
          var editor = $('<input class="k-textbox" required data-value-update="input" data-bind="value:' + options.field + '"/>')
          .appendTo(container);
        }

        $scope.numericTextBoxEditor = function(container, options) {
          var editor = $('<input kendo-numeric-text-box required data-bind="value:' + options.field + '"/>')
          .appendTo(container);
        }

        $scope.mainGridOptions = {
          dataSource: $scope.dataSource,
          pageable: true,
          height: 550,
          toolbar: ["create"],
          columns: [
            { field:"ProductName",title:"Product Name", editor: $scope.textBoxEditor },
            { field: "Category.CategoryName", title: "Category", width: "180px", editor: $scope.textBoxEditor },
            { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "130px", editor: $scope.numericTextBoxEditor },
            { command: "destroy", title: " ", width: "150px" }],
          editable: true,
          edit: function(e) {
            // Find and update the numerictextbox value
            var input = e.container.find("[data-role=numerictextbox]");
            var widget = input.data("kendoNumericTextBox");
            var model = e.model;

            input.on("keyup", function() {
              widget.value(input.val());  
              widget.trigger("change");
            });
          }
        };

        $scope.sortableOptions = {
          filter: ".k-grid tr[data-uid]:not(.k-grid-edit-row)",
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

      })
    </script>
```

## See Also

Other articles and how-to examples on the Kendo UI Sortable:

* [Sortable JavaScript API Reference](/api/javascript/ui/sortable)
* [How to Nest Sortables]({% slug howto_nestsortables_sortable %})
* [How to Persist Order in localStorage]({% slug howto_persistoderinlocalstorage_sortable %})
* [How to Reorder Rows in Nested Grid]({% slug howto_reorderrowsinnestedgrid_sortable %})
* [How to Transfer Grid Rows]({% slug howto_transfergridrows_sortable %})

For more runnable examples on the Kendo UI Sortable, browse its [**How To** documentation folder]({% slug howto_usesortablewithgrid_inincellediting_sortable %}).
