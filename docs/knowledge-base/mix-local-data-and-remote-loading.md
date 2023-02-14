---
title: Combine Local Data with Remote Loading in the TreeView
page_title: Combine Local Data with Remote Loading in the TreeView
description: "Learn how to partially preload Kendo UI for jQuery TreeView items and request data that has not yet been loaded from a remote service."
slug: howto_combinelocaldatawithremoteloading_treeview
previous_url: /controls/navigation/treeview/how-to/binding/mix-local-data-and-remote-loading
tags: telerik, kendo, jquery, treeview, combine, local, data, with, remote, loading
component: treeview
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® TreeView for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I partially preload items in the Kendo UI for jQuery TreeView?

## Solution

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
