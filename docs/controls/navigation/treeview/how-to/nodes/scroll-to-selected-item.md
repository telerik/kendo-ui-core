---
title: Scroll to Selected Item
page_title: Scroll to Selected Item | Kendo UI TreeView
description: "Learn how to scroll the Kendo UI TreeView viewport to the selected node."
slug: howto_scrolltoselecteditem_treeview
---

# Scroll to Selected Item

The following example demonstrates how to scroll the TreeView viewport to the selected node.

```dojo
    <div id="tree"></div>

    <script>
      // Set up: generate the data, select an item.
      var data = [];
      for (var i = 0; i < 1000; i++) {
        data.push({ text: "Item " + i });
      }
      $("#tree").kendoTreeView({
        dataSource: data
      });
      var treeview = $("#tree").data("kendoTreeView");
      treeview.select(treeview.findByText("Item 500"));

      // Scroll to the selected item.
      var itemScrollTop = treeview.select()[0].offsetTop;
      $("html,body").animate({ scrollTop: itemScrollTop });
    </script>
```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
