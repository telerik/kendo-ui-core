---
title: Filter out search results
page_title: Filter out search results
description: Filter out search results
---

# Filter out search results

The example below demonstrates how to search for tree nodes that match a text string and show them along with their parent nodes.

#### Example


```html
  <input class="k-textbox" placeholder="I am looking for..." />

  <div id="treeview"></div>

  <script>

    $("input").on("input", function() {
      var query = this.value.toLowerCase();
      var dataSource = $("#treeview").data("kendoTreeView").dataSource;

      filter(dataSource, query);
    });

    $("#treeview").kendoTreeView({
      loadOnDemand: false,
      dataSource: {
        data: [
          { text: "All", expanded: true, items: [
            { text: "Foo" },
            { text: "Bar", items: [
              { text: "Qux" },
              { text: "Cat" }
            ] },
            { text: "Baz" }
          ] }
        ]
      }
    });

    // sets "hidden" field on items matching query
    function filter(dataSource, query) {
      var hasVisibleChildren = false;
      var data = dataSource instanceof kendo.data.HierarchicalDataSource && dataSource.data();

      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var text = item.text.toLowerCase();
        var itemVisible =
            query === true // parent already matches
            || query === "" // query is empty
            || text.indexOf(query) >= 0; // item text matches query

        var anyVisibleChildren = filter(item.children, itemVisible || query); // pass true if parent matches

        hasVisibleChildren = hasVisibleChildren || anyVisibleChildren || itemVisible;

        item.hidden = !itemVisible && !anyVisibleChildren;
      }

      if (data) {
        // re-apply filter on children
        dataSource.filter({ field: "hidden", operator: "neq", value: true });
      }

      return hasVisibleChildren;
    }
  </script>
```
