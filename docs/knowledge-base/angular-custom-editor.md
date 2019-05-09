---
title: Create Custom Editors
page_title: jQuery Grid Documentation | Create Custom Editors | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to create custom editors by using AngularJS."
previous_url: /controls/data-management/grid/how-to/AngularJS/angular-custom-editor
slug: howto_create_custom_editors_grid
---

# Create Custom Editors

The following example demonstrates how to create a custom editor in the [Grid](http://www.telerik.com/kendo-ui/grid) in AngularJS applications.

###### Example

```dojo
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

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [How to Bind to Telerik Backend Services]({% slug howto_bindto_telerik_backend_services_grid %})
* [How to Change Languages Dynamically]({% slug howto_dynamic_language_change %})
* [How to Create Custom ToolBar Templates]({% slug howto_create_custom_toolbar_templates_grid %})
* [How to Create Custom Edit Buttons]({% slug howto_create_custom_edit_buttons_grid %})
* [How to Use Resize Columns from a Button]({% slug howto_resize_columnsfrom_abutton_grid %})
* [How to Use AngularJS in Popup Editor Templates]({% slug howto_use_angularin_popup_editor_templates_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
