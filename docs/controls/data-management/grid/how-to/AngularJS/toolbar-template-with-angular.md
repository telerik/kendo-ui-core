---
title: Create Custom ToolBar Templates
page_title: Create Custom ToolBar Templates | Kendo UI Grid
description: "Learn how to create a custom ToolBar template in an AngularJS application using the Kendo UI Grid widget."
slug: howto_create_custom_toolbar_templates_grid
---

# Create Custom ToolBar Templates

The example below demonstrates how to create a custom ToolBar template in AngularJS application.

###### Example

```html
<div id="example" ng-app="KendoDemos">
  <div ng-controller="MyCtrl">

      <script id="template" type="text/x-kendo-template">
          {{ gridName }}
          <a class="k-button" href="\#" ng-click="toolbarClick()">Command</a>
      </script>

      <div kendo-grid
         k-toolbar="toolbarTemplate"
         k-columns="[{ title: 'foo' , field: 'foo' },
                    { title: 'bar' , field: 'bar' }]"
         k-data-source="data">
      </div>
  </div>
</div>

<script>
    function MyCtrl($scope) {
        $scope.data = new kendo.data.DataSource({ data: [{foo: "foo", bar: "bar"}] });
        $scope.gridName = "My Grid";
        $scope.toolbarTemplate = $("#template").html();
        $scope.toolbarClick = function() { console.log("click"); }
    }

    angular.module("KendoDemos", ["kendo.directives"])
           .controller("MyCtrl", MyCtrl);
</script>
```

## See Also

Other articles on the [Kendo UI Grid](http://www.telerik.com/kendo-ui/grid) and how-to examples related to AngularJS:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Bind to Telerik Backend Services]({% slug howto_bindto_telerik_backend_services_grid %})
* [How to Change Languages Dynamically]({% slug howto_dynamic_language_change %})
* [How to Create Custom Editors]({% slug howto_create_custom_editors_grid %})
* [How to Create Custom Edit Buttons]({% slug howto_create_custom_edit_buttons_grid %})
* [How to Use AngularJS in Popup Editor Templates]({% slug howto_use_angularin_popup_editor_templates_grid %})
* [How to Use Resize Columns from a Button]({% slug howto_resize_columnsfrom_abutton_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
