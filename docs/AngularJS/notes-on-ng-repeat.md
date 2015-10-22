---
title: Other Directives Support
page_title: Other Directives Support
description: "Learn more about the `ng-repeat`, `ng-if`, `ng-bind` directives supported by Kendo UI controls in AngularJS."
position: 6
---

# Other Directives Support 

Prior to Kendo UI Q2 2015 release, the widgets which were instantiated over existing markup partially supported `ng-repeat`, `ng-if`, `ng-bind`, and other DOM manipulation directives in the markup. Subsequent changes to the markup, caused by those directives, were not handled correctly though.

## Overview

The widgets which exhibited that behavior were the `tabstrip`, `panelbar`, `menu`, `treeview` and several mobile widgets. The support of that behavior was accidental and not intentional, due to the directives instantiating the widgets in a `$timeout` (`setTimeout`) wrap.

The timeout initialization caused several other issues as well. The widget instances were not accessible in a reliable manner. Each widget instantiation required several additional `$scope.digest` cycles to be executed. Performance was negatively affected and the widget initialization was visible to the end user in certain scenarios. The [change from June 17](https://github.com/telerik/kendo-ui-core/commit/0a4912ea9c14b2924d9914a5108ae2c2f636e4ed) removed the timeout implementation, effectively breaking the accidental `ng-repeat` support in later releases.

## `dataSource` Approach

The recommended approach to achieve dynamic content generation for the listed widgets is through the `dataSource` configuration option.  

###### Example - TreeView with `DataSource` in AngularJS

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

###### Example - PanelBar with `DataSource` in AngularJS

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

###### Example - TabStrip with `DataSource` in AngularJS

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

###### Example - Menu with `DataSource` in AngularJS

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

## `k-ng-delay` Approach

If generating content with `DataSource` is not desired, a possible workaround of the behavior may be implemented using the `k-ng-delay` configuration option.

> **Important**
> The approach is not recommended and has some side effects, such as FOUC (flash of unstyled content), and decreased performance.

###### Example - TabStrip with directives and delayed initialization

```html
<div id="example" ng-app="KendoDemos">
    <div class="demo-section k-content">
        <div ng-controller="MyCtrl">
            <div kendo-tab-strip k-ng-delay="tabStripDelay">
              <!-- tab list -->
              <ul>
                <li ng-repeat="tab in tabs">{{tab}}</li>
              </ul>

              <div ng-repeat="tabContent in tabContents">
                {{ tabContent }}
              </div>

            </div>
        </div>
    </div>
</div>

<script>
  angular.module("KendoDemos", [ "kendo.directives" ])
      .controller("MyCtrl", function($scope, $timeout){
          $scope.tabs = [ "t1", "t2" ];
          $scope.tabContents = [ "tc1", "tc2" ];

                $timeout(function() {
            $scope.tabStripDelay = true;
          });
      })
</script>
```