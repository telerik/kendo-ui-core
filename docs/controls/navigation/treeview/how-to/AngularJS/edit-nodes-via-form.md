---
title: Edit Nodes via Form
page_title: Edit Nodes via Form | Kendo UI TreeView
description: "Learn how to allow users to edit nodes via a standalone form using AngularJS with the Kendo UI TreeView widget."
slug: howto_editnodesviaform_angularjs_treeview
---

# Edit Nodes via Form

The example below demonstrates how to allow users to edit nodes via a standalone form using AngularJS with the Kendo UI TreeView widget.

###### Example

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

## See Also

How-to examples on Kendo UI TreeView in AngularJS:

* [How to Scroll to Item]({% slug howto_scrolltoitem_angularjs_treeview %})
* [How to Toggle Nodes with Single Click]({% slug howto_togglenodeswithsingleclick_angularjs_treeview %})

Articles and other how-to examples on Kendo UI TreeView:

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Attach Methods to Data Items]({% slug howto_attache_methodsto_dataitems_treeview %})
* [How to Check Nodes Programatically]({% slug howto_checknodeprogramatically_treeview %})
* [How to Combine Local Data with Remote Loading]({% slug howto_combinelocaldatawithremoteloading_treeview %})
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Expand All Nodes upon Check]({% slug howto_expandallnodes_uponcheck_treeview %})
* [How to Expand Nodes during Drag]({% slug howto_expandnodesduringdrag_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Prevent Dragging Nodes to Deep Levels]({% slug howto_preventdragging_nodestodeeplevels_treeview %})
* [How to Prevent Dragging Nodes to Root Level]({% slug howto_preventdragging_nodestorootlevel_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Show Lines between Nodes]({% slug howto_showlinesbetweennodes_treeview %})
* [How to Show Node Context Menu]({% slug howto_shiwnodecontextmenu_treeview %})
* [How to Sort Child Nodes]({% slug howto_sortchildnodes_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})
