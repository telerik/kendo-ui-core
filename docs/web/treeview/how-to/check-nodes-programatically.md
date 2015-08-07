---
title: Check nodes programatically
page_title: Check nodes programatically
description: Check nodes programatically
---

# Check nodes programatically

The example below demonstrates how to check the checkbox of a node programatically

#### Example

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
