---
title: Scroll to selected item
page_title: Scroll to selected item
description: Scroll to selected item
---

# Scroll to selected item

The example below demonstrates how to scroll the treeview viewport to the selected node.

#### Example

```html
    <div id="tree"></div>

    <script>
      // setup: generate data, select item
      var data = [];
      for (var i = 0; i < 1000; i++) {
        data.push({ text: "Item " + i });
      }
      $("#tree").kendoTreeView({
        dataSource: data
      });
      var treeview = $("#tree").data("kendoTreeView");
      treeview.select(treeview.findByText("Item 500"));

      // scroll to selected item
      var itemScrollTop = treeview.select()[0].offsetTop;
      $("html,body").animate({ scrollTop: itemScrollTop });
    </script>
```
