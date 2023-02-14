---
title: Show a Context Menu of a TreeView Node
page_title: Show a Context Menu of a TreeView Node
description: "Learn how to show a ContextMenu with tree-item actions in a Kendo UI for jQuery TreeView widget."
slug: howto_shiwnodecontextmenu_treeview
previous_url: /controls/navigation/treeview/how-to/integration/show-context-menu
tags: telerik, kendo, jquery, treeview, show, contextmenu, for, nodes, items
component: treeview
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® TreeView for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I show a ContextMenu with tree-item actions in the Kendo UI for jQuery TreeView?

## Solution

The following example demonstrates how to achieve the desired behavior.

```dojo
    <ul id="treeview">
      <li data-expanded="true">
        <span class="k-sprite folder"></span>
        My Website
        <ul>
          <li><span class="k-sprite html"></span>index.html</li>
          <li><span class="k-sprite image"></span>body-back.png</li>
          <li><span class="k-sprite image"></span>my-photo.jpg</li>
        </ul>
      </li>
    </ul>


    <ul id="menu">
        <li><img src="https://demos.telerik.com/kendo-ui/content/web/toolbar/forward.png" />Send via e-mail</li>
        <li><img src="https://demos.telerik.com/kendo-ui/content/web/treeview/close.png" />Delete</li>
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
        background-image: url("https://demos.telerik.com/kendo-ui/content/web/treeview/coloricons-sprite.png");
      }
      .folder { background-position: 0 -16px; }
      .html { background-position: 0 -48px; }
      .image { background-position: 0 -64px; }

    </style>
```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
