---
title: Scope Bindings
page_title: Model and Value Binding | AngularJS Directives
description: "Learn more about the AngularJS bindings integration of Kendo UI controls and find out how to use the widgets in AngularJS applications."
previous_url: /framework/AngularJS/introduction#applying-scope-bindings
slug: angularjs_value_model_binding
position: 5
---

# Scope Bindings

> Starting with R2 2022, the Kendo UI team officially drops the support for AngularJS 1.x through Kendo UI for jQuery. The AngularJS related files and functionality are removed from the bundles and distribution in R3 SP1 2023. The last version that contains the files is R3 2023.
> This does not impact [Kendo UI for Angular (2+)](https://www.telerik.com/kendo-angular-ui) suite.
> If you still need to use AngularJS in your project, check [this article]({% slug angularjs_legacy_files_kendoui %}) that explains how to get the legacy files.
>For information regarding extended support for AngularJS, please visit [Extended Long Term Support]({% slug supportedversions_kendoui %}#extended-long-term-support)

Kendo UI supports the application of scope bindings in AngularJS applications.

## Using the ng-model Value

To bind the value of widgets that provide a `value()` method to the AngularJS scope, use the standard `ng-model` directive.

The following example demonstrates how to bind the input field to the scope variable. When you select a date, the `birthday` variable is set to the value of the input field as a string.

```
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2023.3.1010/js/angular.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2023.3.1010/js/kendo.all.min.js"></script>
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/7.0.1/default/default-ocean-blue.css">

    <div ng-app="app" ng-controller="MyCtrl">
      <label>Birthday: <input kendo-date-picker ng-model="birthday" /></label>
      <p>
        Your selection: {% raw %}{{ birthday }}{% endraw %}
      </p>
    </div>
    <script>
        angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {});
    </script>
```

## Using the k-ng-model Value

If your element is a form field that has a text value, such as `<input>` or `<textarea>`, `ng-model` binds the field contents. Therefore, regarding the previous DatePicker example, you will get a string date instead of a JavaScript `Date` object in the scope.

> If you are using AngularJS, it is convenient to apply the native Angular routing mechanism and data binding. However, do not mix these with the Kendo UI MVVM.

The following example demonstrates how to get the actual `widget.value()` by using `k-ng-model`. The directive will update the `birthday` variable with the selected `Date` object whenever the `change` event is fired.

```
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2023.3.1010/js/angular.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2023.3.1010/js/kendo.all.min.js"></script>
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/7.0.1/default/default-ocean-blue.css">

    <div ng-app="app" ng-controller="MyCtrl">
      <label>Birthday: <input kendo-date-picker k-ng-model="birthday" /></label>
      <p>
        Your selection: {% raw %}{{ birthday }}{% endraw %}
      </p>
    </div>
    <script>
    angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
    });
    </script>
```

## Using the k-value-primitive Attribute

The `k-value-primitive` attribute is available for the DropDownList, ComboBox, MultiSelect, and AutoComplete widgets.

The `k-value-primitive` option enables you to set the widget to either use primitive or object values. It works in a similar way as the `data-value-primitive` option in the [MVVM value binding]({% slug valuebinding_mvvm_kendoui %}#use-the-value-binding-with-a-select-widget-to-update-the-view-model-field-with-the-value-field-when-the-initial-value-is-null). By using this option you can always apply the `k-ng-model` attribute no matter if you are using primitive or non-primitive values. By default, the attribute is set to `false`.

### Disabling k-value-primitive

Setting the `k-value-primitive` to `false` forces the widget to accept or return an object or an array of objects for the MultiSelect holding the current value selected.

The following example demonstrates how to display the `Chai` option in the MultiSelect as selected with the widget value set to `[{"ProductName":"Chai","ProductID":1}]`.

```
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2023.3.1010/js/angular.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2023.3.1010/js/kendo.all.min.js"></script>
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/7.0.1/default/default-ocean-blue.css">

    <div ng-app="app" ng-controller="MyCtrl">
        <h4>Select product</h4>
        <select kendo-multi-select k-options="selectOptions" k-ng-model="selectedIds" k-value-primitive="false"></select>
        <p ng-show="selectedIds.length"><br />Selected: {% raw %}{{ selectedIds }}{% endraw %}</p>
    </div>
    <script>
      angular.module("app", [ "kendo.directives" ]).controller("MyCtrl", function($scope){
        $scope.selectOptions = {
          placeholder: "Select products...",
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          dataSource: {
            transport: {
              read: {
                url: "https://demos.telerik.com/service/v2/core/products"
              }
            }
          }
        };
        $scope.selectedIds = [ {ProductName: "Chai", ProductID: 1} ];
      })
    </script>
```

### Enabling k-value-primitive

When `k-value-primitive` is set to `true`, you can pass an array of primitive values which hold the IDs of the elements that you want to select.

The following example demonstrates how to display `Chai` and `Mishi Kobe Niku` as selected with the widget value set to `[1,9]`.

```
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2023.3.1010/js/angular.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2023.3.1010/js/kendo.all.min.js"></script>
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/7.0.1/default/default-ocean-blue.css">

    <div ng-app="app" ng-controller="MyCtrl">
        <h4>Select product</h4>
        <select kendo-multi-select k-options="selectOptions" k-ng-model="selectedIds" k-value-primitive="true"></select>
        <p ng-show="selectedIds.length"><br />Selected: {% raw %}{{ selectedIds }}{% endraw %}</p>
    </div>
    <script>
      angular.module("app", [ "kendo.directives" ]).controller("MyCtrl", function($scope){
        $scope.selectOptions = {
          placeholder: "Select products...",
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          dataSource: {
            transport: {
              read: {
                url: "https://demos.telerik.com/service/v2/core/products"
              }
            }
          }
        };
        $scope.selectedIds = [1, 9] ;
      })
    </script>
```

## See Also

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [Global Events]({% slug global_events_angularjs_directives %})
