---
title: ng-repeat, ng-if and ng-bind integration
---

{% raw %}


# `ng-repeat`, `ng-if` and `ng-bind` Support

Prior to the Q2 2015 release, the Kendo UI widgets which were instantiated over existing markup **partially supported `ng-repeat`** and other DOM manipulation directives in the markup. Subsequent changes to the markup caused by those directives were not handled correctly, though.

The widgets who exhibited that behavior were the *tabstrip*, *panelbar*, *menu*, *treeview* and several mobile widgets. The support of that behavior was accidental and not intentional, due to the directives instantiating the widgets in a `$timeout` (`setTimeout`) wrap.

The timeout initialization caused several other issues, though. The widget instances were not accessible in a reliable manner; each widget instantiation required several additional `$scope.digest` cycles to be executed.
Performance was negatively affected and the widget initialization was visible to the end user in certain scenarios. The [change from June 17th](https://github.com/telerik/kendo-ui-core/commit/0a4912ea9c14b2924d9914a5108ae2c2f636e4ed) removed the timeout implementation,
effectively breaking the accidental `ng-repeat` support in later releases.

## Suggested Approach

The recommended means to achieve dynamic content generation for the listed widgets is through the `dataSource` configuration option.

### TreeView With DataSource in AngularJS

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

### PanelBar with DataSource in AngularJS
```html
  <div ng-app="foo">
      <div ng-controller="MyCtrl">
        <ul kendo-panel-bar k-data-source="panelBarDataSource"></ul>
      </div>
  </div>

  <script>
    angular.module("foo", [ "kendo.directives" ]).controller("MyCtrl", function($scope) {
      $scope.panelBarDataSource = [
        {
          text: "Item 1 (link)",
          cssClass: "myClass",                            // Add custom CSS class to the item, optional, added 2012 Q3 SP1.
          url: "http://www.kendoui.com/"                  // link URL if navigation is needed (optional)
        },
        {
          text: "<b>Item 2</b>",
          encoded: false,                                 // Allows use of HTML for item text
          content: "text"                                 // content within an item
        },
        {
          text: "Item 3",
          // content URL to load within an item
          contentUrl: "http://demos.telerik.com/kendo-ui/content/web/panelbar/ajax/ajaxContent1.html"
        },
        {
          text: "Item 4",
          // item image URL, optional
          imageUrl: "http://demos.telerik.com/kendo-ui/content/shared/icons/sports/baseball.png",
          expanded: true,                                 // item is rendered expanded
          items: [{                                       // Sub item collection.
            text: "Sub Item 1"
          },
                  {
                    text: "Sub Item 2"
                  }]
        },
        {
          text: "Item 5"
        }
      ]
    });
  </script>
```

### TabStrip with DataSource in AngularJS
```html
  <div ng-app="foo">
    <div ng-controller="MyCtrl">
      <div kendo-tab-strip k-data-source="tabStripDataSource" k-data-text-field="'text'" k-data-content-field="'content'"></div>
    </div>
  </div>

  <script>
    angular.module("foo", [ "kendo.directives" ]).controller("MyCtrl", function($scope) {
      $scope.foo = "Hello from angular";

      $scope.tabStripDataSource = [
        {
          text: "Item 1",
          content: "Item 1 content - {{foo}}"
        },
        {
          text: "Item 2",
          content: "Item 2 content - {{foo}}"
        }
      ]
    });

  </script>
```

### Menu with DataSource in AngularJS
```html
    <div ng-app="foo">
        <div ng-controller="MyCtrl">
            <div kendo-menu k-data-source="menuDataSource"></div>
        </div>
    </div>

    <script>
        angular.module("foo", [ "kendo.directives" ]).controller("MyCtrl", function($scope) {
            $scope.foo = "Hello from angular";

            $scope.menuDataSource = [{
                text: "Item 1 {{foo}}",
                cssClass: "myClass",
                url: "http://www.kendoui.com"
            },
            {
                text: "<b>Item 2</b>",
                encoded: false
            },
            {
                text: "Item 3",
                items: [{
                    text: "Sub Item 1"
                },
                {
                    text: "Sub Item 2"
                }]
            },
            {
                text: "Item 4",
                spriteCssClass: "imageClass3"
            }];
        });

    </script>
```

## `k-ng-delay` Workaround

If generating content with the data-source is not desired, a possible workaround of the behavior may be implemented using the `k-ng-delay` configuration option.

> **Important**  
> The approach is not recommended, and has some side effects, like FOUC and decreased performance.

```html
    <div ng-app="app" ng-controller="MyCtrl">
        <ul kendo-tree-view k-ng-delay="treeInit">
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
        angular.module("app", ["kendo.directives"]).controller("MyCtrl", function($scope, $timeout) {
            $scope.tree = [
                { text: "Foo", items: [
                    { text: "Foo 1" },
                { text: "Foo 2" } ] },
                { text: "Bar", items: [
                    { text: "Bar 1" },
                { text: "Bar 2" } ] },
            ];

            $timeout(function() {
                $scope.treeInit = true;
            });
        });
    </script>
```
