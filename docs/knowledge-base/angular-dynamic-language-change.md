---
title: Dynamically Change Languages in the Grid in AngularJS
page_title: Change Languages Dynamically in the Grid in AngularJS | Kendo UI Grid for jQuery
description: "An example on how to dynamically change the language of the Kendo UI Grid in an AngularJS application."
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
  <td>Progress AngularJS Kendo UI Grid</td>
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

How can I dynamically change the language of the Kendo UI Grid in AngularJS applications?

## Solution

The following example represents the AngularJS version of [this demo](https://demos.telerik.com/kendo-ui/grid/localization).

```dojo
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

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
