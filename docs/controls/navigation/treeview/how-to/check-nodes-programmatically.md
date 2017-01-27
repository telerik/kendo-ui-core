---
title: Check Nodes Programmatically
page_title: Check Nodes Programmatically | Kendo UI TreeView
description: "Learn how to check the checkbox of a Kendo UI TreeView node programmatically."
previous_url: /web/treeview/how-to/check-nodes-programatically
slug: howto_checknodeprogramatically_treeview
---

# Check Nodes Programmatically

The example below demonstrates how to check the checkbox of a Kendo UI TreeView node programmatically.

###### Example

```html
  <div id="tree"></div>

  <script>
    $("#tree").kendoTreeView({
      checkboxes: {
        checkChildren: true
      },

      dataSource: {
        data: [
          { text: "Foo", expanded: true, items: [
            { text: "Bar" },
            { text: "Baz" }
          ] }
        ]
      }
    });

    var treeview = $("#tree").data("kendoTreeView");

    var bar = treeview.findByText("Bar");

    treeview.dataItem(bar).set("checked", true);
  </script>
```

## See Also

Other articles on the Kendo UI TreeView:

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})

For more runnable examples on the Kendo UI TreeView, browse its [**How To** documentation folder]({% slug howto_editnodesviaform_angularjs_treeview %}).
