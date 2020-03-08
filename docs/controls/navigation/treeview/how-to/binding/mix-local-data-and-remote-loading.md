---
title: Combine Local Data with Remote Loading
page_title: Combine Local Data with Remote Loading | Kendo UI TreeView
description: "Learn how to partially preload Kendo UI TreeView items and request data that has not yet been loaded from a remote service."
slug: howto_combinelocaldatawithremoteloading_treeview
---

# Combine Local Data with Remote Loading

Your project might require you to partially preload TreeView items.

The following example demonstrates how to achieve this behavior and request data from a remote service that has not yet been loaded.

```dojo
  <div id="tree"></div>

  <script>
    var localData = [
      { id: 1, text: "Node 1", hasChildren: true, items: [
        { id: 101, text: "Node 1.1", hasChildren: true, items: [
          { id: 10101, text: "Node 1.1.1" }
        ] }
      ] },
      { id: 2, hasChildren: true, text: "Node 2" },
      { id: 3, hasChildren: true, text: "Node 3" }
    ];

    function get(data, id) {
      if (!id) {
        return data;
      } else {
        for (var i = 0; i < data.length; i++) {
          if (data[i].id == id) {
            return data[i].items;
          } else if (data[i].items) {
            var result = get(data[i].items, id);
            if (result) return result;
          }
        }
      }
    }

    $("#tree").kendoTreeView({
      dataSource: {
        transport: {
          read: function (options) {
            var id = options.data.id;
            var data = get(localData, id);

            if (data) {
              // The item is available in the local data.
              options.success(data);
            } else {

              // Here you can use $.ajax request and call options.success in a success handler.
              // For this example, mock the call to the server with static data.
              setTimeout(function() {
                options.success([
                  { id: id + 1, text: "Remote node 1", hasChildren: false },
                  { id: id + 2, text: "Remote node 2", hasChildren: true }
                ]);
              }, 1000);
            }
          }
        },
        schema: { model: { id: "id" } }
      }
    });

  </script>
```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
