---
title: Toggle Nodes with Single Click
page_title: Toggle Nodes with Single Click | Kendo UI TreeView
description: "Learn how to toggle nodes between expanded and collapsed states with a single click in the Kendo UI TreeView widget in AngularJS."
slug: howto_togglenodeswithsingleclick_angularjs_treeview
---

# Toggle Nodes with Single Click

You might need to toggle the TreeView nodes between their expanded and collapsed state all at once.

The following example demonstrates how to achieve this behavior through a single click.

```dojo
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
                  var target = $(e.target);
                  var toggleIcon = target.closest(".k-icon");
                  if (!toggleIcon.length) {
                      this.tree.toggle(target.closest(".k-item"));
                  }
              };
        })
    </script>
```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
