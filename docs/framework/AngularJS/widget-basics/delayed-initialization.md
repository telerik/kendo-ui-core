---
title: Delayed Widget Initialization
page_title: Delayed Widget Initialization | AngularJS Directives
description: "Learn how to delay the initialization of Kendo UI widgets in AngularJS applications."
previous_url: /framework/AngularJS/introduction#delaying-widget-initialization
slug: angularjs_delayed_initialization
position: 2
---

# Delayed Widget Initialization

Specific scenarios may require you to postpone the creation of a widget until some asynchronously loaded data becomes available.

For example, initializing a Grid when you load the column definitions from the server as the Grid does not support re-defining columns after the widget is instantiated.

## Using the k-ng-delay Attribute

To delay the initialization of a widget, use the special `k-ng-delay` attribute.

The following example demonstrates that the Grid is created only when the `gridOptions` variable becomes available.

    // In the controller.
    $http({ method: "GET", url: "customers.json" })
      .success(function(result){
        var dataSource = new kendo.data.DataSource({
          data: result.data
        });
        $scope.gridOptions = {
          dataSource: data,
          columns: result.columns,
          ...
        };
      });

    <!-- in HTML: -->
    <div kendo-grid k-options="gridOptions" k-ng-delay="gridOptions"></div>

## Using HTTP Calls

You can load the widget data with a `$http` call and initialize the widget when the data is available.

```dojo
<div ng-app="app" ng-controller="MyCtrl">
  <select kendo-drop-down-list k-options="customOptions" k-ng-delay="customOptions.dataSource"></select>
</div>
<script>
  angular.module("app", [ "kendo.directives" ]).controller("MyCtrl", function($scope, $http) {
    $http({method: "GET", url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"})
      .success(function(result){
        $scope.customOptions.dataSource = new kendo.data.DataSource({
          data: result.d
        });
      });
    $scope.customOptions = {
      dataTextField: "ProductName",
      dataValueField: "ProductID"
    };
  });
</script>
```

## See Also

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [Global Events]({% slug global_events_angularjs_directives %})
