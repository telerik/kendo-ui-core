---
title: Flat Data
page_title: jQuery TreeView Documentation | Flat Data 
description: "Get started with the jQuery TreeView by Kendo UI and learn how to bind the widget to a flat data table that keeps references about the hierarchical structure."
previous_url: /controls/navigation/treeview/binding-to-flat-data
slug: bindtoflattables_treeview_widget
position: 2
---

# Flat Data Binding

The TreeView expects hierarchical data and you have to convert all flat structures to hierarchical data before binding the widget to it.

To convert flat data into hierarchical structure, use either of the following approaches which differ in the necessary time for their completion and the resulting tree:

* [Initial preprocessing of all data](#initial-all-data-pre-processing)
* [Incremental data filtering](#incremental-data-filtering)

## Initial All-Data Pre-Processing

The pre-processing of all available data and its conversion into a hierarchy prior to binding the TreeView widget requires more time and memory, and the resulting tree is fully rendered.

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

    // The tree for visualizing data.
    $("#tree").kendoTreeView({
      dataSource: processTable(flatData, "id", "parent", 0),
      loadOnDemand: false
    });
    </script>

## Incremental Data Filtering

Allowing the loading of the nodes on demand is more computationally intensive as it requires the collection to be filtered each time a node gets expanded.

The following example demonstrates how to filter data incrementally.

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

    // The tree for visualizing data.
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

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
