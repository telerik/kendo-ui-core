---
title: Common Issues
page_title: Common Issues | AngularJS Directives
description: "Learn about the solutions of issues that may occur while working with Kendo UI controls in AngularJS."
slug: common_issues_support_angularjs
position: 1
---

# Common Issues

This page provides solutions to common issues you might encounter while handling Kendo UI widgets in AngularJS.

## Widgets are not initialized

> The issue is observable as of the Kendo UI Q2 2015 release where widgets are initialized synchronously abiding by the priority of the Angular JS directives.

**Cause** The Kendo UI controls are designed to evaluate all `tag` attributes&mdash;even HTML attributes&mdash;which match their specific options. Each widget has a specific list of options that is used. If a defined attribute cannot be found in the `$scope`, the widget puts its initialization on hold and the widget itself is not initialized. For example, a DatePicker with an empty `value` attribute will not initialize.

```dojo
    <div ng-app="app" ng-controller="MyCtrl">
        <input kendo-date-picker value="" />
    </div>
    <script>
    angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
    });
```

In the previous example, the widget checks the `tag` element attributes and finds a `value` attribute, because it has a [`value`](/api/javascript/ui/datepicker/configuration/value) option. The evaluation against the `$scope` returns `undefined` and the widget does not initialize.

**Solution** The described behavior is part of the core initialization logic of the Kendo UI directives. To handle this issue, avoid the rendering of empty attributes which match the options of the widget.

## AngularJS templates are not evaluated before widget initialization

**Cause** This is a commonly occurring scenario when you want to decorate the initial HTML element by using AngularJS templates. However, as of the Kendo UI Q2 2015 release widgets are initialized synchronously. This results in a template value that is not evaluated during the initialization of the widget. Such behavior is expected and has so far worked by chance.

**Solution** To handle such unevaluated templates, use a custom AngularJS directive with higher priority. As a result, AngularJS evaluates it before the Kendo UI directives and the HTML element is properly decorated and rendered.

Fore more details, refer to the [article on the priorities of AngularJS directives](https://docs.angularjs.org/api/ng/service/$compile).

## Widgets with ng-model directives do not reflect a model value

**Cause** As of the Angular 1.4.9 release, widgets that are initialized from the `select` element do not reflect changes to the model field. This is due to a change in the Angular implementation related to the `ngModel.$render` method. In the new Angular versions, this method is overridden in favor of a custom Angular implementation which supports the addition of custom `option` elements. However, this enhancement breaks the Kendo UI `ngModel` support, because it also depends on the `ngModel.$render` method to reflect the changes which are made in the model. Basically, the Kendo UI [`ngModel.$render`](https://github.com/telerik/kendo-ui-core/blob/master/src/kendo.angular.js#L388) method is directly overridden by the new Angular function.

**Solution** To work around the issues, use either of the following approaches:

* Use the `k-ng-model` directive instead. For more information, refer to the [corresponding documentation]({% slug angularjs_integration_directives %}#scope-bindings).
* Use the `k-ng-delay` attribute that is mapped to the `ng-model` model field. The aim is to postpone `ngModel.$render` that is set on Kendo UI side and, as a result, to enable it to take precedence over the Angular `ngModel.$render` custom method.

The following example demonstrates how to use the `ng-model` directive.

```
<div id="example" ng-app="KendoDemos">
    <div class="demo-section k-content" ng-controller="MyCtrl">

    <h4 style="padding-top: 2em;">Remote data</h4>
    <select kendo-drop-down-list
            k-data-text-field="'ProductName'"
            k-data-value-field="'ProductID'"
            k-data-source="productsDataSource"
            ng-model="selectedProductId"
            k-ng-delay="selectedProductId"
            style="width: 100%"></select>

      <h4 style="padding-top: 2em;">Selected Product Id</h4>
      <em>{{selectedProductId}}</em>

</div>
</div>

<script>
  angular.module("KendoDemos", [ "kendo.directives" ])
      .controller("MyCtrl", function($scope, $timeout){
          $scope.productsDataSource = {
            type: "odata",
            serverFiltering: true,
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
                }
            }
        };

    $scope.selectedProductId = null;

    //simulate delay to fetch selectedID
    $timeout(function(){
      $scope.selectedProductId = 2;
    },2000);

  })
</script>
```

## The MultiSelect throws an exception

The Kendo UI MultiSelect widget sometimes throws an exception which states that it `cannot get length from undefined` or similar.

**Cause** One of the most frequent reasons for this issue is that the field set to the `k-ng-model` directive is `undefined`. The following example demonstrates an incorrect definition of the `k-ng-model` field.

```
<div id="example" ng-app="KendoDemos">
    <div class="demo-section k-content" ng-controller="MyCtrl">
        <h4>Select product</h4>
        <select kendo-multi-select k-options="selectOptions" k-ng-model="selectedIds"></select>
        <p ng-show="selectedIds.length" style="padding-top: 1em;">Selected: {{ selectedIds }}</p>
    </div>
</div>

<script>
  angular.module("KendoDemos", [ "kendo.directives" ])
    .controller("MyCtrl", function($scope){
        $scope.selectOptions = {
            placeholder: "Select products...",
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            valuePrimitive: true,
            autoBind: false,
            dataSource: {
                type: "odata",
                serverFiltering: true,
                transport: {
                    read: {
                        url: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
                    }
                }
            }
        };

        //$scope.selectedIds is undefined
      })
</script>
```

**Solution** Define the `k-ng-model` field to an empty array. The following example demonstrates the correct definition of the `k-ng-model` field.

```
<div id="example" ng-app="KendoDemos">
    <div class="demo-section k-content" ng-controller="MyCtrl">
        <h4>Select product</h4>
        <select kendo-multi-select k-options="selectOptions" k-ng-model="selectedIds"></select>
        <p ng-show="selectedIds.length" style="padding-top: 1em;">Selected: {{ selectedIds }}</p>
    </div>
</div>

<script>
  angular.module("KendoDemos", [ "kendo.directives" ])
    .controller("MyCtrl", function($scope){
        $scope.selectOptions = {
            placeholder: "Select products...",
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            valuePrimitive: true,
            autoBind: false,
            dataSource: {
                type: "odata",
                serverFiltering: true,
                transport: {
                    read: {
                        url: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
                    }
                }
            }
        };

        $scope.selectedIds = [];
      })
</script>
```

## The widget loses its vValue

When the `ng-model` and `k-ng-model` directives are applied together, it is possible for the widget to lose its value.

**Cause** The reason is that both directives update the element value simultaneously and this results in conflicting behavior.

**Solution** Use only one of the two directives&mdash;either `k-ng-model` or `ng-model`.

## See Also

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [Global Events]({% slug global_events_angularjs_directives %})
* [Grid Settings]({% slug grid_settings_angularjs_directives %})
* [Directives with DataSource]({% slug datasource_updates_angularjs_directives %})
* [ng-* Directives in Widget Markup]({% slug ngrepeat_ngif_ngbind_support_angularjs %})
* [Memory Leaks]({% slug memory_leaks_angularjs_directives %})
* [How to Load View in Window]({% slug window_service_angularjs_directives %})
* [How to Nest Widgets]({% slug nest_widgets_angularjs_directives %})
