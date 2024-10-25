---
title: Dynamically Change Languages in the Grid in AngularJS
page_title: Change Languages Dynamically When Using AngularJS - jQuery Data Grid
description: "Learn how to dynamically change the language of the Kendo UI for jQuery Data Grid in an AngularJS application."
previous_url: /controls/data-management/grid/how-to/AngularJS/angular-dynamic-language-change
slug: howto_dynamic_language_change
tags: grid, change, languages, dynamically, angularjs
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
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

> Starting with R2 2022, the Kendo UI team officially drops the support for AngularJS 1.x through Kendo UI for jQuery. The AngularJS related files and functionality are removed from the bundles and distribution in R3 SP1 2023. The last version that contains the files is R3 2023.

## Description

How can I dynamically change the language of the Kendo UI Grid in AngularJS applications?

## Solution

The following example represents the AngularJS version of [this demo](https://demos.telerik.com/kendo-ui/grid/localization).

> The example loads Kendo UI 2023.3.1010 version.

```dojo
  <script src="https://kendo.cdn.telerik.com/2023.3.1010/js/angular.min.js"></script>
  <script src="https://kendo.cdn.telerik.com/2023.3.1010/js/kendo.all.min.js"></script>
  
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

* [JavaScript API Reference of the Data Grid](/api/javascript/ui/grid)
* [jQuery Data Grid Overview (Demo)](https://demos.telerik.com/kendo-ui/grid/index)
* [Data Grid Overview (Documentation)]({% slug overview_kendoui_grid_widget %})
* [Product Page of the jQuery Data Grid](https://www.telerik.com/kendo-jquery-ui/data-grid-(table))
