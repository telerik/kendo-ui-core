---
title: Expand All Nodes upon Check
page_title: Expand All Nodes upon Check | Kendo UI TreeView
description: "Learn how to expand all child nodes of a Kendo UI TreeView widget when checking a root node."
slug: howto_expandallnodes_uponcheck_treeview
---

# Expand All Nodes upon Check

The following example demonstrates how to expand all child nodes of a TreeView when checking a root node.

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
