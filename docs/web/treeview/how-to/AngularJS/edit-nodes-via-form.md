---
title: Edit nodes via form
page_title: Edit nodes via form
description: Edit nodes via form
---

# Edit nodes via form

The example below demonstrates how to allow users to edit nodes via a standalone form using AngularJS

#### Example:

```html
    <div ng-app="KendoDemos">
      <div ng-controller="MyCtrl">
        <!-- TreeView -->
        <div class="box-col">
          <h4>Employees</h4>
          <div kendo-tree-view="tree"
               k-data-text-field="'name'"
               k-data-source="treeData"
               k-on-change="selectedItem = dataItem"></div>
        </div>

        <!-- edit form -->
        <div class="box-col" ng-show="selectedItem">
          <h4>Editing employee: {{selectedItem.name}}</h4>

          <label>Name: <input ng-model="selectedItem.name" ng-change="update(selectedItem)"
                              class="k-textbox"></label>
          <label>Age: <input ng-model="selectedItem.age" ng-change="update(selectedItem)"
                             kendo-numeric-text-box k-format="'#'" ></label>
        </div>
      </div>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
      .controller("MyCtrl", function ($scope) {
        $scope.treeData = new kendo.data.HierarchicalDataSource({ data: [
          { name: "John Smith", age: 34 },
          { name: "Jane Doe", age: 30, expanded: true, items: [
            { name: "Peter Smith", age: 34 },
            { name: "Gordon Brown", age: 28 }
          ] },
          { name: "Maxwell Smith", age: 48 }
        ]});

        $scope.update = function(item) {
          var tree = this.tree;
          var name = item.name;
          var dataItem = tree.dataItem(tree.select());
          dataItem.name = undefined; // force refresh of dataItem
          dataItem.set("name", name);
        };
      });
    </script>
    <style>
      .k-treeview .k-in {
        padding: 5px;
      }
      label {
        display: block;
      }
      .box-col { float: left; width: 250px; }
    </style>
```
