---
title: DataSource vs. Angular scope
---

{% raw %}

# Kendo DataSource vs. Angular scope

Most Kendo UI widgets work with a DataSource object. Kendo strives hard to keep simple cases simple, so you don't always have to create the DataSource object yourself.

Below is an example with static, local data. When you select an item in the grid, two input fields become available and they are bound to that item's data. Editing the data in the input fields will work as expected — the grid magically updates. But if you click the button (“Update from code”) nothing appears to happen.

#### Trying to update data source
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
The reason why this happens is because the grid's data source is actually a different object from $scope.gridData. When the widget initializes it creates a DataSource object as a copy of the original object. Changing the original object has no effect on the grid.

## The fix

To fix this issue we need to create and place in scope the data source object ourselves. Only the controller changes, the markup is the same:

#### Using kendo.data.ObservableArray to update the data source

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
Note that I used [ObservableObject](/api/framework/observableobject.md)'s `set` method in order to update the object. This is the recommended way. In this particular case the following will work too:

    $scope.gridData[0].track = "Hey you";

but that's because of a relatively ugly hack: when grid columns don't declare a template property, Angular-Kendo bindings will automatically initialize it with a template which uses `{{angular}}` expressions. So if you just set the property in the object, the display will update, but it's Angular, not Kendo, who manages that. The grid itself would not be notified about a change in the data. In general we recommend using methods of the Observable objects to manage the data, that's the only guaranteed way that widgets will properly update.

{% endraw %}
