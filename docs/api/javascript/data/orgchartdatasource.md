---
title: OrgChartDataSource
page_title: API Reference for Kendo UI OrgChartDataSource
description: Learn more about the configuration of Kendo UI OrgChartDataSource, methods and events.
res_type: api
---

# kendo.data.OrgChartDataSource

The data source used by the [kendo.ui.OrgChart](/api/javascript/ui/orgchart) widget.
Inherits from [kendo.data.TreeListDataSource](/api/javascript/data/treelistdatasource). The OrgChartDataSource contains instances of the
[kendo.data.OrgChartModel](/api/javascript/data/orgchartmodel) class.


## Configuration

See the [TreeListDataSource configuration](/api/javascript/data/treelistdatasource#configuration) for all inherited configuration options.

### schema `Object`

The schema configuration of the OrgChartDataSource.

### schema.model `Object`

The model configuration of the OrgChartDataSource. See [kendo.data.OrgChartModel](/api/javascript/data/orgchartmodel) for more info.

#### Example

    <script>
      var dataSource = new kendo.data.OrgChartDataSource({
        data: [
          { EmployeeID: 1, name: "Daryl Sweeney", title: "CEO", parentId: null },
          { EmployeeID: 2, name: "Guy Wooten", title: "Chief Technical Officer", parentId: 1 },
          { EmployeeID: 3, name: "Priscilla Frank", title: "Chief Product Officer", parentId: 1 }
        ],
        schema: {
          model: {
            id: "EmployeeID",
            parentId:"parentId",
            expanded: true
          }
        }
      });
    </script>

## Methods

See the [TreeListDataSource methods](/api/javascript/data/treelistdatasource#methods) for all inherited methods.


### groupedItemsTree

Builds and returns an items tree when grouping is enabled.

#### Parameters

##### groupField `String`

The field the items should be grouped by.

#### Returns

`Array` An array featuring the tree-like hierarchy in the source.

#### Example

    <script>
      var dataSource = new kendo.data.OrgChartDataSource({
          transport: {
                  read: {
                  url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
                  dataType: "jsonp"
              }
          },
          schema: {
              model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                      EmployeeId: { type: "number", nullable: false },
                      ReportsTo: { field: "ReportsTo", nullable: true },
                      title: { field: "Position", nullable: true },
                      name: { field: "FirstName", nullable: true }
                  },
                  expanded: true
              }
          }
      });

        dataSource.read().then(function() {
          var tree = dataSource.groupedItemsTree("Title");

          console.log(tree);
        });
    </script>

### itemChildren

Returns a list of all direct child items.

#### Parameters

##### item `kendo.data.OrgChartModel` *(optional)*

The parent item. If this parameter is not specified, the root level items will be returned.

##### fromView `bool` *(optional)*

Whether the data should be taken from the `dataSource.view()` (only the visible items) or from the `.data()` call (all loaded items in the DataSource). If this parameter is not specified, the items will be taken from the `data()` method.

#### Returns

`Array` The list of all direct child items.

#### Example

    <script>
      var dataSource = new kendo.data.OrgChartDataSource({
        data: [
          { id: 1, name: "Jill", title: "Boss", expanded: true },
          { id: 2, name: "James", title: "Lead", expanded: true, parentId: 1 },
          { id: 3, name: "Joe", title: "Worker", expanded: true, parentId: 2 },
          { id: 4, name: "Jack", title: "Worker", expanded: true, parentId: 2 },
        ]
      });

      dataSource.read().then(function() {
        var children = dataSource.itemChildren(dataSource.data()[0]);
        console.log(children);
      });
    </script>

### itemsTree

Builds and returns an items tree.

#### Parameters

##### item `kendo.data.OrgChartModel` *(optional)*

The parent item for which the tree should be created. If this parameter is not specified, the tree will be build for the entire source.

#### Returns

`Array` An array featuring the tree-like hierarchy in the source.

#### Example

    <script>
      var dataSource = new kendo.data.OrgChartDataSource({
          transport: {
                  read: {
                  url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
                  dataType: "jsonp"
              }
          },
          schema: {
              model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                      EmployeeId: { type: "number", nullable: false },
                      ReportsTo: { field: "ReportsTo", nullable: true },
                      title: { field: "Position", nullable: true },
                      name: { field: "FirstName", nullable: true }
                  },
                  expanded: true
              }
          }
      });

        dataSource.read().then(function() {
          var tree = dataSource.itemsTree();

          console.log(tree);
        });
    </script>

### prospectParents

Returns a list of all items in the source that can be parents of the passed item. It will filter-out the item and the full hierarchy of its children.

#### Parameters

##### item `kendo.data.OrgChartModel`

The item the prospect parents should be identified for.

#### Returns

`Array` The list of all possible parents.

#### Example

    <script>
      var dataSource = new kendo.data.OrgChartDataSource({
        data: [
          { id: 1, name: "Jill", title: "Boss", expanded: true },
          { id: 2, name: "James", title: "Lead", expanded: true, parentId: 1 },
          { id: 3, name: "Joe", title: "Worker", expanded: true, parentId: 2 },
          { id: 4, name: "Jack", title: "Worker", expanded: true, parentId: 2 },
        ]
      });

      dataSource.read().then(function() {
        var possibleParents = dataSource.prospectParents(dataSource.data()[1]);
        console.log(children);
      });
    </script>
