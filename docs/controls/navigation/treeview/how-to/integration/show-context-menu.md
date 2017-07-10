---
title: Show Node Context Menu
page_title: Show Node Context Menu | Kendo UI TreeView
description: "Learn how to show a ContextMenu with tree-item actions in a Kendo UI TreeView widget."
slug: howto_shiwnodecontextmenu_treeview
---

# Show Node Context Menu

The following example demonstrates how to show a ContextMenu with tree-item actions in a TreeView widget.

###### Example

```html
    <ul id="treeview">
      <li data-expanded="true">
        <span class="k-sprite folder"></span>
        My Web Site
        <ul>
          <li><span class="k-sprite html"></span>index.html</li>
          <li><span class="k-sprite image"></span>body-back.png</li>
          <li><span class="k-sprite image"></span>my-photo.jpg</li>
        </ul>
      </li>
    </ul>


    <ul id="menu">
        <li><img src="http://demos.telerik.com/kendo-ui/content/web/toolbar/forward.png" />Send via e-mail</li>
        <li><img src="http://demos.telerik.com/kendo-ui/content/web/treeview/close.png" />Delete</li>
    </ul>

    <script>
      $(document).ready(function() {
        $("#treeview").kendoTreeView();

        $("#menu").kendoContextMenu({
          // listen to right-clicks on treeview container
          target: "#treeview",

          // show when node text is clicked
          filter: ".k-in",

          // handle item clicks
          select: function(e) {
            var button = $(e.item);
            var node = $(e.target);
            alert(kendo.format("'{0}' button clicked on '{1}' node", button.text(), node.text()));

            // you can get the node data (e.g. id) via the TreeView dataItem method:
            // $("#treeview").data("kendoTreeView").dataItem(node);
          }
        });
      });
    </script>

    <style scoped>
      /* allow menu to break out of treeview container */
      div.k-treeview {
        overflow: visible;
      }

      #treeview .k-sprite {
        background-image: url("http://demos.telerik.com/kendo-ui/content/web/treeview/coloricons-sprite.png");
      }
      .folder { background-position: 0 -16px; }
      .html { background-position: 0 -48px; }
      .image { background-position: 0 -64px; }

    </style>
```

## See Also

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Check Nodes Programmatically]({% slug howto_checknodeprogramatically_treeview %})
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})

For more runnable examples on the Kendo UI TreeView, browse its [**How To** documentation folder]({% slug howto_bindcheckedstatecustommodelfields_angulartreeview %}).
