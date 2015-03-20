---
title: Mix local data and remote loading
page_title: Mix local data and remote loading
description: Mix local data and remote loading
---

# Mix local data and remote loading

The example below demonstrates how to preload the treeview data partially and request data that has not yet been loaded from a remote service.


#### Example:

```html
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
              // item is available in local data
              options.success(data);
            } else {

              // here you can use $.ajax request and call options.success in success handler

              // for this example, mock call to server with static data
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
