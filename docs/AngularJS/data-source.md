---
title: Directives with DataSource
page_title: Directives with DataSource | AngularJS Directives
description: "Learn more about the interaction between Kendo UI DataSource and AngularJS scope to take full advantage of AngularJS integration into Kendo UI controls."
slug: datasource_updates_angularjs_directives
position: 3
---

# Directives with DataSource

Most Kendo UI widgets work with a DataSource object. Kendo UI strives hard to keep simple cases simple, so you do not always have to create the DataSource object yourself.

## Actions

### Update the DataSource

Below is an example with static, local data. When you select an item in the Grid, two input fields become available and they are bound to that item's data. Editing the data in the input fields works as expected: the Grid updates.

The example below demonstrates how to try to update the data source.

###### Example

```html
<div ng-app="app" ng-controller="MyCtrl">
    <div kendo-grid
         k-data-source="gridData"
         k-columns="gridColumns"
         k-selectable="true"
         k-on-change="selected = data"></div>

    <p ng-show="selected">
      <label>Artist: <input ng-model="selected.artist" /></label>
      <br />
      <label>Track: <input ng-model="selected.track" /></label>
    </p>

    <button kendo-button ng-click="update()">
      Update from code
    </button>
</div>
<script>
angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
  $scope.gridData = [
    { artist: "Pink Floyd", track: "The dark side of the Moon" },
    { artist: "The Beatles", track: "I've just seen a face" },
    { artist: "Queen", track: "Innuendo" }
  ];
  $scope.gridColumns = [
    { field: "artist", title: "Artist" },
    { field: "track", title: "Track" }
  ];
  $scope.update = function() {
    $scope.gridData[0].track = "Hey you";
    console.log($scope.gridData);
  };
});
</script>
```

### Update the DataSource Object

However, if you click the **UPDATE FROM CODE** button, nothing appears to happen. The reason why this is so is because the grid's data source is actually a different object from `$scope.gridData`. When the widget initializes, it creates a `DataSource` object as a copy of the original object. Changing the original object has no effect on the grid.

**Solution** Create and place in scope the data source object yourself. Only the `controller` changes while the markup is the same. Use `kendo.data.ObservableArray` to update the data source.

###### Example  

```html
<div ng-app="app" ng-controller="MyCtrl">
    <div kendo-grid
         k-data-source="gridData"
         k-columns="gridColumns"
         k-selectable="true"
         k-on-change="selected = data"></div>

    <p ng-show="selected">
      <label>Artist: <input ng-model="selected.artist" /></label>
      <br />
      <label>Track: <input ng-model="selected.track" /></label>
    </p>

    <button kendo-button ng-click="update()">
      Update from code
    </button>
</div>
<script>
angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
    $scope.gridData = new kendo.data.ObservableArray([
      { artist: "Pink Floyd", track: "The dark side of the Moon" },
      { artist: "The Beatles", track: "I've just seen a face" },
      { artist: "Queen", track: "Innuendo" }
    ]);
    $scope.gridColumns = [
      { field: "artist", title: "Artist" },
      { field: "track", title: "Track" }
    ];
    $scope.update = function() {
      $scope.gridData[0].set("track", "Hey you");
    };
});
</script>
```

Note that the recommended way to update the object is to use the `set` method of the [ObservableObject](/api/javascript/data/observableobject). However, in this particular case the following approach works too.

###### Example

    $scope.gridData[0].track = "Hey you";

The reason behind this is the fact that when grid columns do not declare a template property, Angular-Kendo bindings automatically initialize it with a template, which uses `{{angular}}` expressions. So, if you just set the property in the object, the display will update, but it is Angular, not Kendo, that manages the update. The grid itself would not be notified about a change in the data. In general, try to use methods of the Observable objects to manage the data as this is the only guaranteed way that widgets will properly update.

## See Also

Other articles on AngularJS directives and integration with Kendo UI:

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [Global Events]({% slug global_events_angularjs_directives %})
* [Grid Settings]({% slug grid_settings_angularjs_directives %})
* [ng-* Directives in Widget Markup]({% slug ngrepeat_ngif_ngbind_support_angularjs %})
* [Memory Leaks]({% slug memory_leaks_angularjs_directives %})
* [How to Load View in Window]({% slug window_service_angularjs_directives %})
* [How to Nest Widgets]({% slug nest_widgets_angularjs_directives %})
* [Troubleshooting: Common Issues]({% slug common_issues_support_angularjs %})
