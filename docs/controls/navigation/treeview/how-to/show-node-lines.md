---
title: Show Lines between Nodes
page_title: Show Lines between Nodes | Kendo UI TreeView
description: "Learn how to show lines between Kendo UI TreeView nodes."
slug: howto_showlinesbetweennodes_treeview
---

# Show Lines between Nodes

The example below demonstrates how to show lines between Kendo UI TreeView nodes.

###### Example

```html
    <div id="treeview"></div>

    <script>
      $("#treeview").kendoTreeView({
        dataSource: [
          { text: "Furniture", items: [
            { text: "Tables & Chairs" },
            { text: "Sofas" },
            { text: "Occasional Furniture" }
          ] },
          { text: "Decor", items: [
            { text: "Bed Linen" },
            { text: "Curtains & Blinds" },
            { text: "Carpets" }
          ] }
        ]
      });

    </script>


    <style>
      body {
        font-size: 12px;
      }

      .k-treeview .k-top,
      .k-treeview .k-mid,
      .k-treeview .k-bot {
        background-image: url('http://aspnet-skins.telerikstatic.com/mvc/2012.2.607/Default/treeview-nodes.png');
        background-repeat: no-repeat;
        margin-left: -16px;
        padding-left: 16px;
      }

      .k-treeview .k-item { background-image: url('http://aspnet-skins.telerikstatic.com/mvc/2012.2.607/Default/treeview-line.png'); }
      .k-treeview .k-last { background-image: none; }


      .k-treeview .k-top { background-position: -91px 0; }
      .k-treeview .k-bot { background-position: -69px -22px; }
      .k-treeview .k-mid { background-position: -47px -44px; }
      .k-treeview .k-last .k-top { background-position: -25px -66px; }
      .k-treeview .k-group .k-last .k-bot { background-position: -69px -22px; }

      .k-treeview .k-item {
        background-repeat: no-repeat;
      }

      .k-treeview .k-first {
        background-repeat: no-repeat;
        background-position: 0 16px;
      }

    </style>
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
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Prevent Dragging Nodes to Deep Levels]({% slug howto_preventdragging_nodestodeeplevels_treeview %})
* [How to Prevent Dragging Nodes to Root Level]({% slug howto_preventdragging_nodestorootlevel_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Show Node Context Menu]({% slug howto_shiwnodecontextmenu_treeview %})
* [How to Sort Child Nodes]({% slug howto_sortchildnodes_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})
