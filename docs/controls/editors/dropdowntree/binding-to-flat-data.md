---
title: Binding to Flat Tables
page_title: Binding to Flat Tables | Kendo UI DropDownTree
description: "Learn how to bind the Kendo UI DropDownTree widget to a flat data table that keeps references about the hierarchical structure."
slug: bindtoflattables_dropdowntree_widget
position: 2
---

# Binding to Flat Tables

The [Kendo UI DropDownTree](http://demos.telerik.com/kendo-ui/dropdowntree/index) expects hierarchical data.

That is why, before binding the DropDownTree to data, you have to convert all flat structures to hierarchical data.

## Approaches

You can use either of the following approaches to convert flat data into a hierarchical structure. These approaches differ from each other in the amount of time necessary for their completion and the resulting tree.

* [Initial all data pre-processing](#initial-all-data-pre-processing)
* [Incremental data filtering](#incremental-data-filtering)

### Initial All-Data Pre-Processing

Prior to binding the DropDownTree widget, you can pre-process all available data and convert it into a hierarchy. This approach requires more time and memory, and the resulting tree is fully rendered.

###### Example

    <input id="dropdowntree"></input>
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
    $("#dropdowntree").kendoDropDownTree({
      dataSource: processTable(flatData, "id", "parent", 0),
      loadOnDemand: false
    });
    </script>

### Incremental Data Filtering

You can also load the nodes on demand. However, this approach is more computationally intensive than the initial all-data pre-processing because it requires the filtering of the collection each time a node gets expanded.

###### Example

    <input id="dropdowntree"></input>
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

    $("#dropdowntree").kendoDropDownTree({
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

* [Overview of the DropDownTree]({% slug overview_kendoui_dropdowntree_widget %})
* [DropDownTree JavaScript API Reference](/api/javascript/ui/dropdowntree)
