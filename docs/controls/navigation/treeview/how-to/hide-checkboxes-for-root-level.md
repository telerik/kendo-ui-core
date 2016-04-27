---
title: Hide Checkboxes for Root Level
page_title: Hide Checkboxes for Root Level | Kendo UI TreeView
description: "Learn how to use the checkboxes.template configuration option to hide checkboxes for root level items in a Kendo UI TreeView widget."
slug: howto_hidecheckboxesforrootlevel_treeview
---

# Hide Checkboxes for Root Level

The example below demonstrates how to use the `checkboxes.template` configuration option to hide the checkboxes for the root level items in a Kendo UI TreeView widget.

###### Example

```html
    <div id="treeview"></div>

    <script>
      $("#treeview").kendoTreeView({
        checkboxes: {
          checkChildren: true,
          template:
            "# if (item.level() > 0) { #" +
                "<input type='checkbox' #= item.checked ? 'checked' : '' #>" +
            "# } #"
        },

        dataSource: [
          { id: 1, text: "My Documents", expanded: true, spriteCssClass: "rootfolder", items: [
            { id: 2, text: "Kendo UI Project", expanded: true, spriteCssClass: "folder", items: [
              { id: 3, text: "about.html", spriteCssClass: "html" },
              { id: 4, text: "index.html", spriteCssClass: "html" },
              { id: 5, text: "logo.png", spriteCssClass: "image" }
            ]
            },
            { id: 6, text: "New Web Site", expanded: true, spriteCssClass: "folder", items: [
              { id: 7, text: "mockup.jpg", spriteCssClass: "image" },
              { id: 8, text: "Research.pdf", spriteCssClass: "pdf" },
            ] }
          ] },
          { id: 9, text: "Reports", expanded: true, spriteCssClass: "folder", items: [
              { id: 10, text: "February.pdf", spriteCssClass: "pdf" },
              { id: 11, text: "March.pdf", spriteCssClass: "pdf" },
              { id: 12, text: "April.pdf", spriteCssClass: "pdf" }
            ] }
          ]
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
* [How to Attach Methods to Data Items]({% slug howto_attache_methodsto_dataitems_treeview %})
* [How to Check Nodes Programatically]({% slug howto_checknodeprogramatically_treeview %})
* [How to Combine Local Data with Remote Loading]({% slug howto_combinelocaldatawithremoteloading_treeview %})
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Expand All Nodes upon Check]({% slug howto_expandallnodes_uponcheck_treeview %})
* [How to Expand Nodes during Drag]({% slug howto_expandnodesduringdrag_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Prevent Dragging Nodes to Deep Levels]({% slug howto_preventdragging_nodestodeeplevels_treeview %})
* [How to Prevent Dragging Nodes to Root Level]({% slug howto_preventdragging_nodestorootlevel_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Show Lines between Nodes]({% slug howto_showlinesbetweennodes_treeview %})
* [How to Show Node Context Menu]({% slug howto_shiwnodecontextmenu_treeview %})
* [How to Sort Child Nodes]({% slug howto_sortchildnodes_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})
