---
title: Common Issues
page_title: Common Issues | AngularJS Directives
description: "Learn about the solutions of issues that may occur while working with Kendo UI controls in AngularJS."
slug: common_issues_support_angularjs
position: 1
---

# Common Issues

This page provides solutions to common issues you may encounter while working with Kendo UI widgets in AngularJS.

## Performance

### Widgets Are Not Initialized

The Kendo UI controls are designed to evaluate all `tag` attributes, even HTML attributes, that match their specific options. Each widget has a specific list of options that is used.

If any of the defined attributes cannot be found in the `$scope`, the widget puts its initialization on hold. Hence, the widget would never initialize.

For instance, a DatePicker with an empty `value` attribute would not initialize, as demonstrated in the example below.

###### Example

```html
    <div ng-app="app" ng-controller="MyCtrl">
        <input kendo-date-picker value="" />
    </div>
    <script>
    angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
    });
```

In the case of this example, the widget checks the `tag` element attributes and finds a`value` attribute, because the widget has a [`value` option](/api/javascript/ui/datepicker#configuration-value). The evaluation against the `$scope` returns `undefined`, hence the widget will not initialize.

**Solution**

Unfortunately, there is no easy solution, as the described behavior is part of the core initialization logic of the Kendo UI directives. The best approach is to avoid rendering empty attributes that match the widget options.

> **Important**
>
> This issue is observable after the Kendo UI Q2 2015 release, where widgets are initialized synchronously abiding the priority of the Angular JS directives.

### AngularJS Templates Are Not Evaluated before Widget Initialization

This is a common scenario, when you would like to decorate the initial HTML element using AngularJS templates. As of Kendo UI Q2 2015 release, however, widgets are initialized synchronously, which results in unevaluated template value during widget initialization. This behavior is expected and has worked only by chance.

**Solution**

The proper way to handle such unevaluated templates is to use a custom AngularJS directive with higher priority. Thus AngularJS evaluates it before the Kendo UI directives and the HTML element is decorated and rendered properly.

Fore more details, refer to the [article on the priorities of AngularJS directives](https://docs.angularjs.org/api/ng/service/$compile).

### Widget With 'ng-model' Directive Does Not Reflect Model Value

Since `Angular 1.4.9` widgets initialized from `SELECT` element **does not reflect changes to the model field**. This is due to a change in the Angular implementation related to `ngModel.$render`. In the new Angular versions, that method is **overridden** in favor
to a custom Angular implementation that supports adding custom `OPTION` elements. This enhancement, however, breaks our `ngModel` support, because we also depends on `ngModel.$render` method to reflect any changes done in the model.
Basically our [ngModel.$render](https://github.com/telerik/kendo-ui-core/blob/master/src/kendo.angular.js#L388) is **directly overridden** by the Angular new function.

#### Solution

The available workarounds in this case are:

- Use `k-ng-model` directive instead. Check the [corresponding documentation](http://docs.telerik.com/kendo-ui/AngularJS/introduction#scope-bindings) for more details.
- Use `k-ng-delay` mapped to the `ng-model` model field. The purpose of this code is to postpone the `ngModel.$render` set on our side, hence it will win over the Angular `ngModel.$render` custom method

##### Example using `ng-model` directive

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
                    url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
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

### Widget Loses Its Value

When the `ng-model` and `k-ng-model` directives are applied together, there is a chance for the widget to lose its value. This is due the fact that both directives update the element value simultaneously, which results in a conflict issue.

**Solution**

Use only one of the two directives&mdash;either `k-ng-model` or `ng-model`.

## See Also

Other articles on AngularJS directives and integration with Kendo UI:

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [Global Events]({% slug global_events_angularjs_directives %})
* [Grid Settings]({% slug grid_settings_angularjs_directives %})
* [Directives with DataSource]({% slug datasource_updates_angularjs_directives %})
* [ng-* Directives in Widget Markup]({% slug ngrepeat_ngif_ngbind_support_angularjs %})
* [Memory Leaks]({% slug memory_leaks_angularjs_directives %})
* [How to Load View in Window]({% slug window_service_angularjs_directives %})
* [How to Nest Widgets]({% slug nest_widgets_angularjs_directives %})
