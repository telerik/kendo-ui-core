---
title: Filter Out Search Results
page_title: Filter Out Search Results | Kendo UI TreeView
description: "Learn how to search for tree nodes and show thema long with their parent nodes in a Kendo UI TreeView widget."
slug: howto_filetroutserachresults_treeview
---

# Filter Out Search Results

Your project might require you to enable the searching for TreeView nodes which match a text string.

The following example demonstrates how to achieve this behavior and then show the nodes along with their parent items.

```dojo
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

    // Sets the "hidden" field on items that match the query.
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
        // Re-apply the filter on the children.
        dataSource.filter({ field: "hidden", operator: "neq", value: true });
      }

      return hasVisibleChildren;
    }
  </script>
```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
