---
title: Bind to Flat Tables
page_title: Bind to Flat Tables | Kendo UI TreeView
description: "Learn how to bind the Kendo UI TreeView widget to a flat data table that keeps references about the hierarchical structure."
slug: bindtoflattables_treeview_widget
position: 2
---

# Bind to Flat Tables

[Kendo UI TreeView widget](http://demos.telerik.com/kendo-ui/treeview/index) expects hierarchical data, so any flat structure must be converted to a hierarchical one before binding the widget to it. This article shows two methods for the conversion of flat data into hierarchical one, which differ from each other in the amount of time necessary for their completion and the resulting tree.

## Methods

### Initial All-Data Pre-processing

This method pre-processes all available data and converts it into a hierarchy prior to binding the TreeView widget. This requires more time and memory, and the resulting tree is fully rendered.

The example below demonstrates how to pre-process all data before binding the TreeView to it.

###### Example

    <div id="tree"></div>
    <script>
    var flatData = [
      { id: 1, parent: 0, text: "Item 1" },
      { id: 2, parent: 0, text: "Item 2" },
      { id: 3, parent: 0, text: "Item 3" },
      { id: 4, parent: 0, text: "Item 4" },
      { id: 5, parent: 1, text: "Item 1.1" },
      { id: 6, parent: 1, text: "Item 1.2" },
      { id: 7, parent: 1, text: "Item 1.3" },
      { id: 8, parent: 3, text: "Item 3.1" },
      { id: 9, parent: 3, text: "Item 3.2" },
      { id: 10, parent: 5, text: "Item 1.1.1" },
      { id: 11, parent: 5, text: "Item 1.1.2" },
      { id: 12, parent: 5, text: "Item 1.1.3" }
    ];

    function processTable(data, idField, foreignKey, rootLevel) {
      var hash = {};

      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var id = item[idField];
        var parentId = item[foreignKey];

        hash[id] = hash[id] || [];
        hash[parentId] = hash[parentId] || [];

        item.items = hash[id];
        hash[parentId].push(item);
      }

      return hash[rootLevel];
    }

    // the tree for visualizing data
    $("#tree").kendoTreeView({
      dataSource: processTable(flatData, "id", "parent", 0),
      loadOnDemand: false
    });
    </script>

### Incremental Data Filtering

This second method allows nodes to be loaded on demand, but is more computationally intensive as it requires the collection to be filtered each time a node gets expanded.

The example below demonstrates how to filter data incrementally.

###### Example

    <div id="tree"></div>
    <script>
    var flatData = [
      { id: 1, parent: null, text: "Item 1" },
      { id: 2, parent: null, text: "Item 2" },
      { id: 3, parent: null, text: "Item 3" },
      { id: 4, parent: null, text: "Item 4" },
      { id: 5, parent: 1, text: "Item 1.1" },
      { id: 6, parent: 1, text: "Item 1.2" },
      { id: 7, parent: 1, text: "Item 1.3" },
      { id: 8, parent: 3, text: "Item 3.1" },
      { id: 9, parent: 3, text: "Item 3.2" },
      { id: 10, parent: 5, text: "Item 1.1.1" },
      { id: 11, parent: 5, text: "Item 1.1.2" },
      { id: 12, parent: 5, text: "Item 1.1.3" }
    ];

    // the tree for visualizing data
    $("#tree").kendoTreeView({
      dataSource: {
        transport: {
          read: function(options) {
            var id = options.data.id || null;

            options.success($.grep(flatData, function(x) {
              return x.parent == id;
            }));
          }
        },
        schema: {
          model: {
            id: "id",
            hasChildren: function(x) {
              var id = x.id;

              for (var i = 0; i < flatData.length; i++) {
                if (flatData[i].parent == id) {
                  return true;
                }
              }
              return false;
            }
          }
        }
      }
    })
    </script>

## See Also

Other articles on Kendo UI TreeView:

* [Overview of the TreeView Widget]({% slug overview_kendoui_treeview_widget %})
* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
