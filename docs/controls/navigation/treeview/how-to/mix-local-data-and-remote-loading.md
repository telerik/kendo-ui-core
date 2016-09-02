---
title: Combine Local Data with Remote Loading
page_title: Combine Local Data with Remote Loading | Kendo UI TreeView
description: "Learn how to partially preload Kendo UI TreeView items and request data that has not yet been loaded from a remote service."
slug: howto_combinelocaldatawithremoteloading_treeview
---

# Combine Local Data with Remote Loading

The example below demonstrates how to partially preload Kendo UI TreeView items and request data that has not yet been loaded from a remote service.

###### Example

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

## See Also

Other articles on the Kendo UI TreeView:

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Check Nodes Programmatically]({% slug howto_checknodeprogramatically_treeview %})
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})

For more runnable examples on the Kendo UI TreeView, browse its [**How To** documentation folder]({% slug howto_editnodesviaform_angularjs_treeview %}).
