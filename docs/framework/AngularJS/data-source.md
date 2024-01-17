---
title: Data Source Integration
page_title: Data Source Integration | AngularJS Directives
description: "Learn more about the interaction between Kendo UI DataSource and AngularJS scope to take full advantage of AngularJS integration into Kendo UI controls."
previous_url: /AngularJS/data-source
slug: datasource_updates_angularjs_directives
position: 4
---

# Data Source Integration

> Starting with R2 2022, the Kendo UI team officially drops the support for AngularJS 1.x through Kendo UI for jQuery. The AngularJS related files and functionality are removed from the bundles and distribution in R3 SP1 2023. The last version that contains the files is R3 2023.
> This does not impact [Kendo UI for Angular (2+)](https://www.telerik.com/kendo-angular-ui) suite.
> If you still need to use AngularJS in your project, check [this article]({% slug angularjs_legacy_files_kendoui %}) that explains how to get the legacy files.
>For information regarding extended support for AngularJS, please visit [Extended Long Term Support]({% slug supportedversions_kendoui %}#extended-long-term-support)

Even though you do not have to always create a `DataSource` object, most Kendo UI widgets require it.

## Updating the Data Source

The following example contains static local data and demonstrates how to try to update the data source. When you select an item in the Grid, two input fields become available and they are bound to that item's data. Editing the data in the input fields works as expected: the Grid updates.

```dojo
<div ng-app="app" ng-controller="MyCtrl">
    <div kendo-grid
         k-data-source="gridData"
         k-columns="gridColumns"
         k-selectable="true"
         k-on-change="onChange(data)"></div>

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
  $scope.onChange = function(data){
    $scope.selected = data;
  };
});
</script>
```

## Updating the DataSource Object

However, if you click the **UPDATE FROM CODE** button, nothing appears to happen. The reason is that the data source of the Grid is a different object from `$scope.gridData`. When the widget initializes, it creates a `DataSource` object as a copy of the original object. Changing the original object has no effect on the Grid.

**Solution** Create and place in a scope the data source object yourself. Only the `controller` changes while the markup is the same. Use `kendo.data.ObservableArray` to update the data source.

```dojo
<div ng-app="app" ng-controller="MyCtrl">
    <div kendo-grid
         k-data-source="gridData"
         k-columns="gridColumns"
         k-selectable="true"
         k-on-change="onChange(data)"></div>

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
    $scope.onChange = function(data){
      $scope.selected = data;
    };
});
</script>
```

The recommended way to update the object is to use the `set` method of the [`ObservableObject`](/api/javascript/data/observableobject). However, in this case, the `$scope.gridData[0].track = "Hey you";` configuration approach works too. The reason is that when the Grid columns do not declare a template property, AngularJS-Kendo UI bindings automatically initialize it with a template which uses `{% raw %}{{angular}}{% endraw %}` expressions. Therefore, if you only set the property in the object, AngularJS (which manages the display state) will render the update. The Grid itself will not be notified about a change in the data. In general, try to use methods of the `Observable` objects to manage the data as this is the only guaranteed way that widgets will properly update.

## See Also

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [Global Events]({% slug global_events_angularjs_directives %})
* [Grid Settings]({% slug grid_settings_angularjs_directives %})



