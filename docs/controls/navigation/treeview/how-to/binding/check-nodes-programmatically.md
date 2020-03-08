---
title: Check Nodes Programmatically
page_title: Check Nodes Programmatically | Kendo UI TreeView
description: "Learn how to check the checkbox of a Kendo UI TreeView node programmatically."
previous_url: /web/treeview/how-to/check-nodes-programatically
slug: howto_checknodeprogramatically_treeview
---

# Check Nodes Programmatically

The following example demonstrates how to programmatically select the checkbox of a TreeView node.

```dojo
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

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
