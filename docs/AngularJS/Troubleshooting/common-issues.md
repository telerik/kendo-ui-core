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
