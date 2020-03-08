---
title: Scroll to Item
page_title: Scroll to Item | Kendo UI TreeView
description: "Learn how to scroll to an item of a Kendo UI TreeView widget with a given id in AngularJS."
slug: howto_scrolltoitem_angularjs_treeview
---

# Scroll to Item

You might need to list a great number of items in the TreeView of your AngularJS application.

The following example demonstrates how to scroll to a particular item of the TreeView that has a given `id`.

```dojo
    <div id="example" ng-app="KendoDemos">
      <div class="demo-section k-content" ng-controller="MyCtrl">
        <div kendo-tree-view="tree" k-options="treeOptions"></div>

        <button class="k-button" ng-click="scrollToItem()">Scroll to item</button>
      </div>
    </div>

    <style>
      .k-button {
                position: fixed;
        top: 1em;
        right: 1em;
      }
    </style>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
      .controller("MyCtrl", function($scope){

        $scope.treeOptions = {
          dataSource: {
            data: generate(3, 5) // 5^3 nodes
          }
        };

        $scope.scrollToItem = function() {
          var tree = $scope.tree;
          var found = tree.dataSource.get(17); // get item by id

          if (found) {
            // visual cue, remove to prevent selection
            found.set("selected", true);

            var li = tree.findByUid(found.uid);

            var itemScrollTop = li[0].offsetTop;
            $("html,body").animate({ scrollTop: itemScrollTop });
          }
        };

        // functions that generate items
        function item(level, id) {
          var hasChildren = level > 0;
          return { id: id, text: "Node " + id, expanded: hasChildren };
        }

        function generate(level, count) {
          var result = [];
          if (level > 0) {
            for (var i = 0; i < count; i++) {
              var x = item(level, level * count + i);

              x.items = generate(level-1, count);
              result.push(x);
            }
          }
          return result;
        }

      })
    </script>

```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
