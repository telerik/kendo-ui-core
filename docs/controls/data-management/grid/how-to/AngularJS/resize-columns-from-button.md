---
title: Resize Columns from a Button
page_title: Resize Columns from a Button | Kendo UI Grid
description: "Learn how to resize or disable the resizing option inside the Kendo UI Grid widget by using custom buttons and AngularJS handlers."
slug: howto_resize_columnsfrom_abutton_grid
---

# Resize Columns from a Button

The example below demonstrates how to resize the columns of a Kendo UI Grid widget by using a custom button and AngularJS handlers.

###### Example

```html
     <div id="example" ng-app="KendoDemos">
      <div ng-controller="MyCtrl">
        <div kendo-grid="kg" options="mainGridOptions">
        </div>
        <br /><br />
        <button class="k-button" ng-click="onClick()">Disable resizing</button>
      </div>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
      .controller("MyCtrl", function($scope){

        $scope.onClick = function(){
          $scope.isDisabled=true;
        }

        $scope.expandButton = function(){
          $scope.kg.thead.prev().find("col").eq(0).width(200);
          $scope.kg.tbody.prev().find("col").eq(0).width(200);
        }

        $scope.mainGridOptions = {
          dataSource: {
            type: "odata",
            transport: {
              read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
            },
            pageSize: 5,
            serverPaging: true,
            serverSorting: true
          },
          sortable: true,
          pageable: true,
          columns: [{
            field: "FirstName",
            title: "First Name",
            width: "120px"
          },{
            field: "LastName",
            title: "Last Name",
            width: "120px"
          },{
            field: "Country",
            width: "120px"
          },{
            field: "City",
            width: "120px"
          },{
            field: "Title",
            width: "120px"
          },{
            field: "Button",
            width: "120px",
            template: '<button class="k-button" ng-click="expandButton()" ng-disabled="isDisabled">Resize</button>'
          }
				]
        };
      })
    </script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to AngularJS:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Bind to Telerik Backend Services]({% slug howto_bindto_telerik_backend_services_grid %})
* [How to Change Languages Dynamically]({% slug howto_dynamic_language_change %})
* [How to Create Custom ToolBar Templates]({% slug howto_create_custom_toolbar_templates_grid %})
* [How to Create Custom Editors]({% slug howto_create_custom_editors_grid %})
* [How to Create Custom Edit Buttons]({% slug howto_create_custom_edit_buttons_grid %})
* [How to Use AngularJS in Popup Editor Templates]({% slug howto_use_angularin_popup_editor_templates_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
