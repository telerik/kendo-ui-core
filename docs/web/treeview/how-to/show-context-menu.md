---
title: Show node context menu
page_title: Show node context menu
description: Show node context menu
---

# Show node context menu

The example below demonstrates how to show a context menu with tree item actions.

#### Example

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
