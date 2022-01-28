---
title: Widget Initialization
page_title: Initialization of Widgets | AngularJS Directives
description: "Learn how to initialize and configure AngularJS integrated Kendo UI widgets in AngularJS applications."
previous_url: /framework/AngularJS/introduction#creating-widgets
slug: angularjs_initialization
position: 1
---

# Widget Initialization

The AngularJS directives operate on attributes like `kendo-widget-name`.

For example, to get the DatePicker widget, use the `<label>Birthday: <input kendo-date-picker /></label>` configuration. When AngularJS compiles the HTML, the Kendo UI directive turn the `<input>` field into a nice DatePicker widget. For example, to discard the dashes after `kendo-` as a shortcut approach, use the `<input kendo-numerictextbox />` configuration.

## Using HTML Options

You can specify any options that are supported by Kendo UI widgets in `element` attributes by converting the option name from camelCase to dash-separated-words and prefixing it with a `k-`.

> * If any of the defined attribute options are `undefined`, the widget will not initialize. For example, if the NumericTextBox `k-max` attribute points to a `$scope.maxNumber` field which is `undefined`, it will not initialize.
> * If the attributes match the widget options, Kendo UI bindings parse them without prefixes. For example, the HTML5 `placeholder` attribute defined in the NumericTextBox element will be parsed as an Angular expression, because the widget has a `placeholder` option. Because of this built-in functionality, ensure that the attribute has a valid Angular expression or a valid string value, rendered between `'` (single quote) characters.

## Setting Options as Attributes

The following example demonstrates an important detail&mdash;the `'Increment'` and `'Decrement'` strings are quoted inside the attribute values. Without the single quote inside they are interpreted as variable names and AngularJS-Kendo UI will look for the `$scope.Increment` and `$scope.Decrement` variables. The omission of the quotes is a common error&mdash;that is why AngularJS-Kendo UI emit a warning in the JS console whenever such variables are not found.

```dojo
    <div ng-app="app" ng-controller="MyCtrl">
        <input kendo-numerictextbox k-min="1" k-max="10" k-up-arrow-text="'Increment'" k-down-arrow-text="'Decrement'">
    </div>
    <script>
    angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
    });
    </script>
```

## Specifying Options from the Controller

The following example demonstrates how to specify options from the `controller` in AngularJS projects.

```dojo
    <div ng-app="app" ng-controller="MyCtrl">
        <input kendo-numerictextbox k-min="1" k-max="10" k-up-arrow-text="textUp" k-down-arrow-text="textDown">
    </div>
    <script>
    angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
        $scope.textUp = "Increment";
        $scope.textDown = "Decrement";
    });
    </script>
```

## Setting Array and Object Options as Attributes

The following example demonstrates how to use declarative attributes for the `array` and `object` configuration options.

```dojo
    <div ng-app="app" ng-controller="MyCtrl">
        <textarea kendo-editor
                  k-tools="[
                      'bold',
                      'italic',
                      'undeline',
                      {
                        name: 'foreColor',
                        palette: [ '#f00', '#0f0', '#00f' ]
                      }
                  ]"></textarea>
    </div>
    <script>
    angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
    });
    </script>
```

## Configuring Widgets in the Controller

The following example demonstrates how to store the whole widget configuration in the `controller` by using the special `k-options` attribute.

> If any of the defined attribute options are `undefined`, the widget will not initialize. For example, if the NumericTextBox `k-max` attribute points to a `$scope.maxNumber` field which is `undefined`, it will not initialize.

```dojo
    <div ng-app="app" ng-controller="MyCtrl">
        <input kendo-date-picker k-options="monthPickerConfig">
    </div>
    <script>
    angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
        $scope.monthPickerConfig = {
          start  : "year",
          depth  : "year",
          format : "MMMM yyyy"
        };
    });
    </script>
```

## See Also

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [Global Events]({% slug global_events_angularjs_directives %})
