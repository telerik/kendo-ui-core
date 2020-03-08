---
title: Overview
page_title: AngularJS Directives Overview | AngularJS Directives
description: "Learn more about the AngularJS integration of Kendo UI controls and find out how to use the widgets in AngularJS applications."
previous_url: /using-kendo-with-angularjs, /AngularJS/introduction
slug: angularjs_integration_directives
position: 1
---

# AngularJS Directives Overview

This article demonstrates the basics of the integration between Kendo UI and AngularJS.

For more information, refer to the page on [developing with AngularJS](https://www.telerik.com/kendo-ui/angularjs-and-kendo-ui-framework-integration "Developing with AngularJS?").

## Getting Started

Kendo UI is seamlessly used with AngularJS. It is possible to integrate the two frameworks through the AngularJS directives for Kendo UI widgets. These directives are part of the product distribution and are officially supported by the Kendo UI team. In this way, you benefit from the features available in AngularJS, such as declarative data binding, routing, form validation, and others, and employ them when building up your project.

> The initialization of Kendo UI widgets in AngularJS projects is not designed to be combined with the Kendo UI server wrappers. Using wrappers is equivalent to [jQuery plugin syntax initialization]({% slug initialize_widgets_using_jquery_plugins_installation %}). To create Kendo UI widget instances with AngularJS, do not use server wrappers for these instances. Also, the two frameworks have some overlapping features, such as Angular binding and Kendo UI MVVM, which must not be mixed.

## Basic Usage of the Kendo UI AngularJS Directives

The AngularJS bindings are integrated into Kendo UI.

* If you are using one of the bundles, such as `kendo.all.min.js`, the required code is already there.
* If you load individual Kendo UI files, also load `kendo.angular.js` or `kendo.angular.min.js`. It has to be loaded after `kendo.core.js`.
* To activate the Angular bindings, load `angular.js` before you load Kendo UI and load the scripts in the following order.

        <script src="jquery.js"></script>
        <script src="angular.js"></script>
        <script src="kendo.all.js"></script>

* Load the Kendo UI stylesheets too. When you create your AngularJS application, declare a dependency on `"kendo.directives"`.

        var app = angular.module("your-angular-app", [ "kendo.directives" ]);

## Referencing Widgets

You can reference a widget by using any of the following approaches:

* Getting instances in the `controller`&mdash;To call methods on a widget from your controller, you might sometimes need a reference to the widget. To get such, assign a name to the `kendo-widget-name` attribute.

    ```dojo
        <div ng-app="app" ng-controller="MyCtrl">
          <input kendo-datepicker="datePicker" k-on-change="onChange()">
        </div>
        <script>
          angular.module("app", [ "kendo.directives" ]).controller("MyCtrl", function($scope) {
            $scope.onChange = function() {
              alert($scope.datePicker.value());
            };
            });
        </script>
      ```

* Using the `tag` directive&mdash;As of the Kendo UI Q1 2015 release, if you use the `tag` directive variant, you can set the `k-scope-field` to achieve the same.

    ```dojo
        <div ng-app="app" ng-controller="MyCtrl">
          <kendo-date-picker k-scope-field="datePicker" k-on-change="onChange()"></kendo-date-picker>
        </div>
        <script>
          angular.module("app", [ "kendo.directives" ]).controller("MyCtrl", function($scope) {
            $scope.onChange = function() {
             alert($scope.datePicker.value());
            };
          });
        </script>
    ```

* Setting Options in a Link Function&mdash;As of the Kendo UI Q2 2015 release, the timeout initialization of the widgets is removed. To set the options of a widget as part of the link function of a custom directive, use `k-ng-delay` and `timeout`.

    ```dojo
        <div id="example" ng-app="KendoDemos">
            <div class="demo-section k-header" ng-controller="MyCtrl">
                <my-custom-directive />
            </div>
        </div>
        <script>
            angular.module("KendoDemos", [ "kendo.directives" ])
                .directive('myCustomDirective', function($timeout) {
                    return {
                        template: '<input kendo-auto-complete k-options="options" k-ng-delay="options" style="width: 100%;" />',
                        link: function (scope) {
                        $timeout(function() {
                            scope.options = { placeholder: 'placeholder text here'};
                        })
                    }
                };
            })
            .controller("MyCtrl", function($scope){});
        </script>
    ```

## Known Limitations

As of the Kendo UI 2015 Q2 release, if the `k-options` of the widget is bound to a non-existent object, the widget is not initialized. The reason is a change that was introduced to accommodate the AngularJS router implementation and which causes the widget to require the settings of the `options` object first to be configured.

## See Also

* [Global Events]({% slug global_events_angularjs_directives %})
* [Widget Events]({% slug angularjs_widget_events %})
* [Model and Value Bindings]({% slug angularjs_value_model_binding %})
* [Delayed Initialization]({% slug angularjs_delayed_initialization %})
* [Troubleshooting: Common Issues]({% slug common_issues_support_angularjs %})
* [Angular 2 Migration Guide](https://www.telerik.com/blogs/ngmigrate-helps-you-move-from-angularjs-1-to-angular-2)
