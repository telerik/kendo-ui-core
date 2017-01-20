---
title: Adjust Row Heights with ng-if Column Templates When Columns Are Locked
page_title: Adjust Row Heights with ng-if Column Templates When Columns Are Locked | Kendo UI Grid
description: "Learn how to adjust row heights for a Kendo UI Grid with locked columns and a column template that uses `ng-if` in AngularJS applications."
slug: howto_adjust_row_heights_template_locked_columns_grid
---

# Adjust Row Heights with ng-if Column Templates When Columns Are Locked

You might have to handle a scenario with locked columns where the content of the column template is initially hidden through the `ng-if` directive.

In such cases, showing the content later might cause issues related to the proper calculation of the row heights for the locked and unlocked parts of the Grid. To avoid such possible behavior, when the scope value that controls the visibility of the template content is changed, conditionally call the [`resize()`](/api/javascript/kendo#methods-resize) and [`refresh()`](/api/javascript/ui/grid#methods-refresh) methods of the Grid in its [`dataBound`](/api/javascript/ui/grid#events-dataBound) event.

The following example demonstrates how to adjust the row heights in a Kendo UI Grid with locked columns and with a column template that uses the `ng-if` directive.

###### Example

```html
    <div id="example" ng-app="KendoDemos">
      <div ng-controller="MyCtrl">
        <kendo-grid k-scope-field="grid" options="mainGridOptions"></kendo-grid>
        <kendo-button k-click="toggleVisible">Toggle hidden</kendo-button>
      </div>
    </div>

    <style>
      .contact-info-form {
        list-style-type: none;
        margin: 30px 0;
        padding: 0;
      }

      .contact-info-form li {
        margin: 10px 0;
      }

      .contact-info-form label {
        display: inline-block;
        width: 100px;
        text-align: right;
        font-weight: bold;
      }
    </style>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
        .controller("MyCtrl", function($scope, $timeout){
        $scope.visible = false;
        $scope.mainGridOptions = {
          dataSource: {
            type: "odata",
            transport: {
              read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
            },
            pageSize: 5,
            serverPaging: true,
            serverSorting: true
          },
          sortable: true,
          dataBound: function(e){
              if(!$scope.visible){
              	e.sender.resize(true);
              }
          },
          pageable: true,
          height: 500,
          columns: [{
            field: "FirstName",
            title: "First Name",
            width: "120px",
            locked: true
          },{
            field: "LastName",
            title: "Last Name",
            width: "320px",
            template: '<div ng-if=visible><div>Custom content</div><div>Custom content</div><div>Custom content</div><div>Custom content</div><div>Custom content</div></div>'
          },{
            field: "Country",
            width: "320px"
          },{
            field: "City",
            width: "320px"
          },]
        };

        $scope.toggleVisible = function(){
          $scope.visible = !$scope.visible;  
          $scope.grid.refresh();
        }
      })
    </script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to AngularJS:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Bind to Telerik Backend Services]({% slug howto_bindto_telerik_backend_services_grid %})
* [How to Change Languages Dynamically]({% slug howto_dynamic_language_change %})
* [How to Create Custom ToolBar Templates]({% slug howto_create_custom_toolbar_templates_grid %})
* [How to Create Custom Edit Buttons]({% slug howto_create_custom_edit_buttons_grid %})
* [How to Use Resize Columns from a Button]({% slug howto_resize_columnsfrom_abutton_grid %})
* [How to Use AngularJS in Popup Editor Templates]({% slug howto_use_angularin_popup_editor_templates_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_dynamic_language_change %}).
