---
title: Create Custom Edit Buttons
page_title: Create Custom Edit Buttons | Kendo UI Grid for jQuery
description: "An example on how to create a custom Edit button by using AngularJS in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/AngularJS/custom-edit-toolbar-button
slug: howto_create_custom_edit_buttons_grid
tags: grid, create, custom, edit, buttons
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
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
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

## Description

How can I create a custom **Edit** button by using AngularJS in the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to create a custom **Edit** button in the Toolbar of the Grid in AngularJS applications.

```dojo
     <div id="example" ng-app="KendoDemos">
      <div ng-controller="MyCtrl">
        <div kendo-grid="myGrid" options="mainGridOptions"></div>
      </div>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
             .controller("MyCtrl", MyCtrl);

      function MyCtrl($scope) {
        $scope.crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";
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

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
