---
title: Notes on ng-repeat
---

{% raw %}

# Notes on `ng-repeat`

For widgets that are instantiated from plain HTML, it might be tempting to use `ng-repeat` to build that HTML. That works to initialize the widget, but it won't work properly to update the widget if the data changes later. It isn't possible to fix this; the widgets build their own DOM on initialization and that doesn't necessarily match the original HTML (which `ng-repeat` will generate). Here is an example of what to avoid:

#### The ng-repeat directive can't update widget items

```html
<div ng-app="app" ng-controller="MyCtrl">
    <button ng-click="add()">Add new</button>
    <ul kendo-tree-view>
      <li ng-repeat="item in tree">
        {{item.text}}
        <ul>
          <li ng-repeat="item in item.items">
            {{item.text}}
          </li>
        </ul>
      </li>
    </ul>
</div>
<script>
angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
    $scope.tree = [
      { text: "Foo", items: [
        { text: "Foo 1" },
        { text: "Foo 2" } ] },
      { text: "Bar", items: [
        { text: "Bar 1" },
        { text: "Bar 2" } ] },
    ];

    $scope.add = function() {
      $scope.tree.push({
        text: "This is broken",
        items: [ { text: "Badly" } ]
      });
    };
});
</script>
```
When you click "Add new", a new item is pushed to the tree. `ng-repeat` does its job and inserts the new DOM elements, but they aren't styled and don't behave correctly. The widget itself gets no notice about the new item.

To create a widget that needs to be updated you can use a data source and manipulate that:

#### Use data source to add items to widgets

```html
<div ng-app="app" ng-controller="MyCtrl">
    <button ng-click="add()">Add new</button>
    <div kendo-tree-view k-data-source="tree"></div>
</div>
<script>
angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope) {
    $scope.tree = new kendo.data.ObservableArray([
      { text: "Foo", items: [
        { text: "Foo 1" },
        { text: "Foo 2" } ] },
      { text: "Bar", items: [
        { text: "Bar 1" },
        { text: "Bar 2" } ] },
    ]);
    $scope.add = function() {
      $scope.tree.push({
        text: "This works",
        items: [ { text: "Sweet" } ]
      });
    };
});
</script>
```
{% endraw %}
