---
title: Change Languages Dynamically
page_title: Change Languages Dynamically | Kendo UI Grid
description: "Learn how to dynamically change the language of a Kendo UI Grid widget in an AngularJS application."
slug: howto_dynamic_language_change
---

# Change Languages Dynamically

The example below demonstrates how to dynamically change the language of the Kendo UI Grid. This is an AngularJS version of [this demo](http://demos.telerik.com/kendo-ui/grid/localization).

###### Example

```html
<div id="example" ng-app="KendoDemos">
    <div ng-controller="MyCtrl">
        <kendo-grid k-scope-field="grid" options="mainGridOptions" k-rebind="language"></kendo-grid>
        <kendo-dropdownlist k-scope-field="dropdownlist" k-options="dropDownListOptions"></kendo-dropdownlist>
    </div>
</div>

<script>
    angular.module("KendoDemos", [ "kendo.directives" ])
        .controller("MyCtrl", function($scope) {
            $scope.language = "en-US";

            $scope.changeLanguage = function() {
              var value = this.value();
              kendo.ui.progress($scope.grid.wrapper, true);
              var baseUrl = '//kendo.cdn.telerik.com/2016.1.226/js/messages/kendo.messages.';
              $.getScript(baseUrl + value + ".min.js", function () {
                kendo.ui.progress($scope.grid.wrapper, false);
                $scope.$apply(function () {
                  $scope.language = value;
                });
              });
            };

            $scope.dropDownListOptions = {
              change: $scope.changeLanguage,
              dataTextField: "text",
              dataValueField: "value",
              dataSource: [
                {text: "en-US"},
                {text: "bg-BG"},
                {text: "zh-CN"},
                {text: "ru-RU"}
              ]
            };

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
                pageable: true,
                filterable: true,
                dataBound: function() {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
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
                    field: "Title"
                }]
            };
        });
</script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to AngularJS:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Bind to Telerik Backend Services]({% slug howto_bindto_telerik_backend_services_grid %})
* [How to Create Custom Editors]({% slug howto_create_custom_editors_grid %})
* [How to Create Custom ToolBar Templates]({% slug howto_create_custom_toolbar_templates_grid %})
* [How to Create Custom Edit Buttons]({% slug howto_create_custom_edit_buttons_grid %})
* [How to Use Resize Columns from a Button]({% slug howto_resize_columnsfrom_abutton_grid %})
* [How to Use AngularJS in Popup Editor Templates]({% slug howto_use_angularin_popup_editor_templates_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
