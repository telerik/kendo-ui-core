---
title: Expand All Nodes upon Check
page_title: Expand All Nodes upon Check | Kendo UI TreeView
description: "Learn how to expand all child nodes of a Kendo UI TreeView widget when checking a root node."
slug: howto_expandallnodes_uponcheck_treeview
---

# Expand All Nodes upon Check

The example below demonstrates how to expand all child nodes of a Kendo UI TreeView widget when checking a root node.

###### Example

```html
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
