---
title: Refreshing Widgets
page_title: Refreshing Widgets upon Option Changes | AngularJS Directives
description: "Learn how to refresh Kendo UI widgets in AngularJS applications."
previous_url: /framework/AngularJS/introduction#updating-widgets-upon-option-changes
slug: angularjs_integration_rebind
position: 3
---

# Refreshing Widgets

To create a widget that automatically updates when some of the scope variables changes, update the widget from `controller` by using the special `k-rebind` attribute.

This option destroys the original widget and recreates it using the changed option. To use `k-options` and pass the same variable to `k-rebind` when watching multiple options for changes, use the `<ul kendo-menu k-options="menuOptions" k-rebind="menuOptions"> ... </ul>` configuration. This approach is not suitable for data-bound widgets because they are recreated each time their data is changed&mdash;for example, after paging the Grid.

```dojo
    <div ng-app="app" ng-controller="MyCtrl">
      <ul kendo-menu k-orientation="orientation" k-rebind="orientation">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
      <select kendo-drop-down-list ng-model="orientation">
        <option>horizontal</option>
        <option>vertical</option>
      </select>
    </div>
    <script>
      angular.module("app", [ "kendo.directives" ]).controller("MyCtrl", function($scope) {
        $scope.orientation = "horizontal";
      });
    </script>
```

## See Also

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [Global Events]({% slug global_events_angularjs_directives %})
