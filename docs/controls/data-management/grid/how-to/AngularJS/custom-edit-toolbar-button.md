---
title: Create Custom Edit Buttons
page_title: Create Custom Edit Buttons | Kendo UI Grid
description: "Learn how to create a custom Edit button in the Kendo UI Grid widget by using AngularJS."
slug: howto_create_custom_edit_buttons_grid
---

# Create Custom Edit Buttons

The example below demonstrates how to create a custom **Edit** button in the Toolbar of the Kendo UI Grid widget by using AngularJS.

###### Example

```html
     <div id="example" ng-app="KendoDemos">
      <div ng-controller="MyCtrl">
        <div kendo-grid="myGrid" options="mainGridOptions"></div>
      </div>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
             .controller("MyCtrl", MyCtrl);

      function MyCtrl($scope) {
        $scope.crudServiceBaseUrl = "http://demos.telerik.com/kendo-ui/service";
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

Other articles on the Kendo UI Grid and how-to examples related to AngularJS:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Bind to Telerik Backend Services]({% slug howto_bindto_telerik_backend_services_grid %})
* [How to Change Languages Dynamically]({% slug howto_dynamic_language_change %})
* [How to Create Custom ToolBar Templates]({% slug howto_create_custom_toolbar_templates_grid %})
* [How to Create Custom Editors]({% slug howto_create_custom_editors_grid %})
* [How to Use AngularJS in Popup Editor Templates]({% slug howto_use_angularin_popup_editor_templates_grid %})
* [How to Use Resize Columns from a Button]({% slug howto_resize_columnsfrom_abutton_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
