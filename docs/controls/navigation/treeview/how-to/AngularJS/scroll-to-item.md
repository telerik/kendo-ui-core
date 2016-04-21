---
title: Scroll to Item
page_title: Scroll to Item | Kendo UI TreeView
description: "Learn how to scroll to an item of a Kendo UI TreeView widget with a given id in AngularJS."
slug: howto_scrolltoitem_angularjs_treeview
---

# Scroll to Item

The example below demonstrates how to scroll to an item of a Kendo UI TreeView widget with a given `id` in AngularJS.

###### Example

```html
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

How-to examples on Kendo UI TreeView in AngularJS:

* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_angularjs_treeview %})
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
