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
