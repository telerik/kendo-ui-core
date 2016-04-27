---
title: Attach Methods to Data Items
page_title: Attach Methods to Data Items | Kendo UI TreeView
description: "Learn how to attach methods to data items at different levels of the Kendo UI TreeView widget and use them in a template."
slug: howto_attache_methodsto_dataitems_treeview
---

# Attach Methods to Data Items

The example below demonstrates how to attach methods to data items at different levels of the Kendo UI TreeView widget and use them in a template.

###### Example


```html
    <div id="treeview"></div>

    <script>
      var SubCategory = {
        displayName: function() {
          return this.SubCategoryName;
        }
      };

      var Category = {
        displayName: function() {
          return this.CategoryName;
        },
        children: {
          schema: {
            data: "subcategories",
            model: SubCategory
          }
        }
      };

      $("#treeview").kendoTreeView({
        template: "#: item.displayName() #",
        dataSource: {
          data: [
            { CategoryName: "Reds", status: "online", subcategories: [
              { SubCategoryName: "Yellow" },
              { SubCategoryName: "Orange" },
              { SubCategoryName: "Red" }
            ] },
            { CategoryName: "Blues", status: "offline", subcategories: [
              { SubCategoryName: "Green" },
              { SubCategoryName: "Turquose" },
              { SubCategoryName: "Blue" }
            ] }
          ],
          schema: {
            model: Category
          }
        }
      });
    </script>
```

## See Also

How-to examples on Kendo UI TreeView in AngularJS:

* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_angularjs_treeview %})
* [How to Scroll to Item]({% slug howto_scrolltoitem_angularjs_treeview %})
* [How to Toggle Nodes with Single Click]({% slug howto_togglenodeswithsingleclick_angularjs_treeview %})

Articles and other how-to examples on Kendo UI TreeView:

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
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
