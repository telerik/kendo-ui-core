---
title: TreeListModel
page_title: API Reference for Kendo Data TreeListModel
description: Documentation how to get started with the TreeListModel.
res_type: api
---

# kendo.data.TreeListModel

The `kendo.data.TreeListModel` class represents a data item from the [kendo.data.TreeListDataSource](/api/javascript/data/treelistdatasource). Inherits from [kendo.data.Model](/api/javascript/data/model).

## Configuration

### parentId *(default: "{ type: 'number', nullable: true }")*

The name of the Model's parentId field. The Kendo UI TreeList distinguishes the root items based on the `parentId` field. If the `schema.model.fields.[parentIdField]` is nullable, root items with be items whose `parentId` field values are `null`. If the `schema.model.fields.[parentIdField]` is *not* nullable, root items will be items which have a default value for their data type.

#### Example

    <div id="treeList"></div>
    <script>
    var dataSource = new kendo.data.TreeListDataSource({
        data: [
            { id: 1, name: "John Doe", parentId: null },
            { id: 2, name: "Jane Smith", parentId: 1 },
            { id: 3, name: "Bob Johnson", parentId: 1 },
            { id: 4, name: "Alice Brown", parentId: 2 }
        ],
        schema: {
            model: {
                id: "id",
                parentId: "parentId",
                fields: {
                    parentId: { type: "number", nullable: true }
                }
            }
        }
    });

    $("#treeList").kendoTreeList({
        dataSource: dataSource,
        columns: ["name"]
    });

    // Access the parentId configuration
    var model = dataSource.options.schema.model;
    
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log("ParentId field configuration:", model.parentId);
    </script>

## Fields

### hasChildren `Boolean`

Indicates whether an item has children. When the `hasChildren` field value is `true`, the TreeList renders an expand icon.

>The data source calculates the `hasChildern` field value for local-binding scenarios.

>For lazy loading with remote data, calculate the field on the server.

>***The field is case-sensitive***.

> When the user clicks on the expand icon, the Kendo UI TreeList DataSource requests the children of the item by sending the parent item `id` as a request parameter, for example `&id=1`.

> The parameter name can be changed with the [`paramaterMap`](/api/javascript/data/datasource/configuration/transport.parametermap) function.

#### Example

    <div id="example">
      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";

          var dataSource = new kendo.data.TreeListDataSource({
            transport: {
              read: {
                url: crudServiceBaseUrl + "/EmployeeDirectory"
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

	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(root.hasChildren);
          });
      </script>
    </div>

## Methods

### loaded

Gets or sets the loaded flag of the TreeList. Setting the loaded flag to `false` allows reloading of child items.

#### Example

    <div id="treeList"></div>
    <script>
    var dataSource = new kendo.data.TreeListDataSource({
        data: [
            { id: 1, name: "John Doe", parentId: null },
            { id: 2, name: "Jane Smith", parentId: 1 },
            { id: 3, name: "Bob Johnson", parentId: 1 }
        ],
        schema: {
            model: {
                id: "id",
                parentId: "parentId"
            }
        }
    });

    $("#treeList").kendoTreeList({
        dataSource: dataSource,
        columns: ["name"]
    });

    dataSource.read().then(function() {
        var rootItem = dataSource.at(0);
        
        // Check if the item is loaded
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Item loaded status:", rootItem.loaded());
        
        // Set loaded to false to allow reloading
        rootItem.loaded(false);
        
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Item loaded status after setting to false:", rootItem.loaded());
    });
    </script>

## Events

See the [Model events](model#events) for all inherited events.
