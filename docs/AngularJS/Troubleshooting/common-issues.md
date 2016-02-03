---
title: Common Issues
page_title: Common Issues | Kendo UI Troubleshooting
description: "Learn about the solutions of issues that may occur while working with Kendo UI controls in AngularJS."
slug: common_issues_support_angularjs
---

# Common Issues

This page provides solutions for common problems you may encounter while working with Kendo UI widgets in AngularJS.

## Widget is not initialized

The widget is designed to evaluate all `tag` attributes, even HTML attributes, that match widget's specific options list.
Every widget has a specific list of options that will be used

If any of the defined attributes cannot be found in the $scope, then the widget puts its
initialization on hold. Hence the widget will never initialize.

For instance, a DatePicker widget with an *empty* `value` attribute **will not be initialized**.

```html
<div ng-app="app" ng-controller="MyCtrl">
    <input kendo-date-picker value="" />
</div>
<script>
angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
});
```
The widget will check the tag element attributes and will find a`value` attribute, because the widget has a [value](/api/javascript/ui/datepicker#configuration-value) option.
The evaluation against the `$scope` will return `undefined`, hence the widget will never initialize.

**Solution**

Unfortunately, there isn't an easy solution, as the described behavior is part of the core initialization logic of the Kendo UI directives.
**The best approach will be to avoid rendering empty attributes that match the widget options.**

> This issue is observable after Q2 2015 release where widgets are initialized synchronously abiding the priority of the Angular JS directives.

## AngularJS templates are note evaluated before widget initialization

This is a common scenario, when you would like to decorate the initial HTML element using AngularJS templates. Since Q2 2015, however,
widgets are initialized synchronously. This will result into unevaluated template value during widget initialization.
This is expected behavior and has worked only by chance.

**Solution**

The proper way to handle such unevaluated templates is to use a custom AngularJS directive with higher priority. Thus AngularJS will
evaluate it before the Kendo UI directives and the HTML element will be decorated/rendered properly.

Fore more details about directives priority check AngularJS documentation:

- [Directive priority](https://docs.angularjs.org/api/ng/service/$compile#-priority-)
