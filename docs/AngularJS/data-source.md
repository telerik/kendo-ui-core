---
title: DataSource
page_title: DataSource  
description: "Learn more about the interaction between Kendo UI DataSource and AngularJS scope to take full advantage of AngularJS integration into Kendo UI controls."
position: 3
---

# DataSource

Most Kendo UI widgets work with a DataSource object. Kendo UI strives hard to keep simple cases simple, so you do not always have to create the DataSource object yourself.

Below is an example with static, local data. When you select an item in the grid, two input fields become available and they are bound to that item's data. Editing the data in the input fields works as expected: the grid magically updates. 

###### Example - trying to update the data source

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

However, if you click the **UPDATE FROM CODE** button, nothing appears to happen. The reason why this is so is because the grid's data source is actually a different object from `$scope.gridData`. When the widget initializes it creates a `DataSource` object as a copy of the original object. Changing the original object has no effect on the grid.

**Solution**: Create and place in scope the data source object yourself. Only the `controller` changes while the markup is the same. Use `kendo.data.ObservableArray` to update the data source:   

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

Note that the recommended way to update the object is to use the `set` method of the [ObservableObject](/api/framework/observableobject.md). However, in this particular case the following approach works too:

    $scope.gridData[0].track = "Hey you";

The reason behind this is the fact that when grid columns do not declare a template property, Angular-Kendo bindings automatically initialize it with a template, which uses `{{angular}}` expressions. So, if you just set the property in the object, the display will update, but it is Angular, not Kendo, that manages the update. The grid itself would not be notified about a change in the data. In general, try to use methods of the Observable objects to manage the data as this is the only guaranteed way that widgets will properly update.