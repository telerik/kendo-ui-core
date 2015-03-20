---
title: Custom edit toolbar button
page_title: Custom edit toolbar button
description: Custom edit toolbar button
---

# Custom edit toolbar button

The example below demonstrates how to create custom edit button in the Grid's toolbar using AngularJS

#### Example:

```html
     <div id="example" ng-app="KendoDemos">
      <div ng-controller="MyCtrl">
        <div kendo-grid="myGrid" options="mainGridOptions"></div>
      </div>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ]);
      function MyCtrl($scope) {
				$scope.crudServiceBaseUrl = "http://demos.telerik.com/kendo-ui/service"
        $scope.dataSource = new kendo.data.DataSource({
          transport: {
            read:  {
              url: $scope.crudServiceBaseUrl + "/Products",
              dataType: "jsonp"
            },
            update: {
              url: $scope.crudServiceBaseUrl + "/Products/Update",
              dataType: "jsonp"
            },
            destroy: {
              url: $scope.crudServiceBaseUrl + "/Products/Destroy",
              dataType: "jsonp"
            },
            create: {
              url: $scope.crudServiceBaseUrl + "/Products/Create",
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
        });

        $scope.mainGridOptions = {
          dataSource: $scope.dataSource,
          sortable: true,
          selectable:true,
          pageable: true,
          editable: "popup",
          toolbar: ["create", { name: "customEdit", text: "Edit", imageClass: "k-edit", className: "k-custom-edit", iconClass: "k-icon" }],
          columns: [
            "ProductName",
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
            { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
            { field: "Discontinued", width: "120px" }]
        };

        $scope.$on("kendoWidgetCreated", function(event, widget){
          if (widget === $scope.myGrid) {
            widget.element.find(".k-custom-edit").on("click", function(e){
              e.preventDefault();
              var selected = $scope.myGrid.select();
              if(selected.length == 0){
              	alert('No record selected')
              } else {
              	$scope.myGrid.editRow(selected);
              }
              
            });
          }
        });
      }
    </script>
```
