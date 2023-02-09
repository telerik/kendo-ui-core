---
title: Expand All TreeView Nodes upon Check
page_title: Expand All TreeView Nodes upon Check
description: "Learn how to expand all child nodes of a Kendo UI for jQuery TreeView widget when checking a root node."
slug: howto_expandallnodes_uponcheck_treeview
previous_url: /controls/navigation/treeview/how-to/nodes/expand-all-nodes-upon-check
tags: telerik, kendo, jquery, treeview, expand, all, nodes, upon, check
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

How can I expand all child nodes when checking a root node in the Kendo UI for jQuery TreeView?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
  <div id="tree"></div>

  <script>
    $("#tree").kendoTreeView({
      checkboxes: {
        checkChildren: true
      },
      check: function(e) {
        this.expandRoot = e.node;

        this.expand($(this.expandRoot).find(".k-item").addBack());
      },
      dataBound: function(e) {
        if (this.expandRoot) {
          this.expand(e.node.find(".k-item"));
        }
      },

      // mocked datasource for the example
      dataSource: {
        transport: {
          read: function(options) {
            if (!window.counter) window.counter = 1;

            // stub server
            setTimeout(function() {
              if (counter < 20) {
                options.success([
                  { text: "item " + (counter++) },
                  { text: "item " + (counter++) },
                  { text: "item " + (counter++), hasChildren: false }
                ]);
              } else {
                options.success([]);
              }
            }, 500);
          }
        },
        schema: {
          model: {
            id: "id",
            hasChildren: "hasChildren"
          }
        }
      }
    });
  </script>
```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
