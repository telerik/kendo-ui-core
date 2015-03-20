---
title: Toggle nodes with single click
page_title: Toggle nodes with single click
description: Toggle nodes with single click
---

# Toggle nodes with single click

The example below demonstrates how to toggle nodes between expanded and collapsed state with a single click.

#### Example:

```html
    <div id="example" ng-app="KendoDemos">
        <div class="demo-section k-content" ng-controller="MyCtrl">
            <div kendo-tree-view="tree"
                 k-data-source="treeData"
                 ng-click="toggle($event)">
            </div>
        </div>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
          .controller("MyCtrl", function($scope){
              $scope.treeData = new kendo.data.HierarchicalDataSource({ data: [
                { text: "Item 1" },
                { text: "Item 2", items: [
                  { text: "SubItem 2.1" },
                  { text: "SubItem 2.2" }
                ] },
                { text: "Item 3" }
              ]});

              $scope.toggle = function(e) {
                var dataItem = this.tree.dataItem(e.target);
                dataItem.set("expanded", !dataItem.expanded);
              };
        })
    </script>
```
