---
title: Toggle Nodes with Single Click
page_title: Toggle Nodes with Single Click | Kendo UI TreeView
description: "Learn how to toggle nodes between expanded and collapsed states with a single click in the Kendo UI TreeView widget in AngularJS."
slug: howto_togglenodeswithsingleclick_angularjs_treeview
---

# Toggle Nodes with Single Click

The example below demonstrates how to toggle nodes of a Kendo UI TreeView between expanded and collapsed states with a single click in AngularJS.

###### Example

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

Other articles on the Kendo UI TreeView:

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Check Nodes Programmatically]({% slug howto_checknodeprogramatically_treeview %})
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})

For more runnable examples on the Kendo UI TreeView, browse its [**How To** documentation folder]({% slug howto_editnodesviaform_angularjs_treeview %}).
