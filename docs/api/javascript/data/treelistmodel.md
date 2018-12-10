---
title: TreeListModel
page_title: API Reference for Kendo Data TreeListModel
description: Documentation how to get started with the TreeListModel.
res_type: api
---

# kendo.data.TreeListModel

The `kendo.data.TreeListModel` class represents a data item from the [kendo.data.TreeListDataSource](treelistdatasource). Inherits from [kendo.data.Model](model).

## Configuration

### parentId

The name of the Model's parentId field.

## Fields

### hasChildren `Boolean`

Indicates whether an item has children.

#### Example - get input element

    <div id="example">
      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

          var dataSource = new kendo.data.TreeListDataSource({
            transport: {
              read: {
                url: crudServiceBaseUrl + "/EmployeeDirectory",
                dataType: "jsonp"
              }
            },
            schema: {
              model: {
                id: "EmployeeId",
                parentId: "ReportsTo",
                fields: {
                  EmployeeId: { type: "number", nullable: false },
                  ReportsTo: { field: "ReportsTo", nullable: true }
                }
              }
            }
          });

          dataSource.read().then(function() {
            var root = dataSource.at(0);

            console.log(root.hasChildren);
          });
      </script>
    </div>

## Methods

### loaded

Gets or sets the loaded flag of the TreeList. Setting the loaded flag to `false` allows reloading of child items.

## Events

See the [Model events](model#events) for all inherited events.
