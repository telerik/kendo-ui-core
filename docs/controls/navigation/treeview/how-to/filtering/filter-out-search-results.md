---
title: Filter Out Search Results
page_title: Filter Out Search Results | Kendo UI TreeView
description: "Learn how to search for tree nodes and show thema long with their parent nodes in a Kendo UI TreeView widget."
slug: howto_filetroutserachresults_treeview
---

# Filter Out Search Results

Your project might require you to enable the searching for TreeView nodes which match a text string.

The following example demonstrates how to achieve this behavior and then show the nodes along with their parent items.

###### Example


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

## See Also

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Check Nodes Programmatically]({% slug howto_checknodeprogramatically_treeview %})
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})

For more runnable examples on the Kendo UI TreeView, browse its [**How To** documentation folder]({% slug howto_bindcheckedstatecustommodelfields_angulartreeview %}).
