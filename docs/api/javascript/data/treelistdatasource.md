---
title: TreeListDataSource
page_title: API Reference for Kendo UI TreeListDataSource
description: Learn more about the configuration of Kendo UI TreeListDataSource, methods and events.
res_type: api
---

# kendo.data.TreeListDataSource

The data source used by the [kendo.ui.TreeList](/api/javascript/ui/treelist) widget.
Inherits from [kendo.data.DataSource](/api/javascript/data/datasource). The TreeListDataSource contains instances of the
[kendo.data.TreeListModel](/api/javascript/data/treelistmodel) class.


## Configuration

See the [DataSource configuration](/api/javascript/data/datasource#configuration) for all inherited configuration options.

### schema `Object`

The schema configuration of the TreeListDataSource.


<div class="meta-api-description">
Define and configure the structure and interpretation of hierarchical or nested data for tree-like data sources, including how to specify unique identifiers, parent-child relationships, field mappings, data types, default values, parsing logic, and transformation functions to correctly model and bind complex nested datasets for tree components. Control schema setup for processing raw nested data, mapping hierarchical relationships with id and parentId, managing field definitions, enforcing data typing, customizing parsing and data transformation workflows, and setting field-level configurations to accurately represent and manipulate tree-structured data models in interactive UI elements.
</div>

#### Example

    <script>
      var dataSource = new kendo.data.TreeListDataSource({
        data: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", Phone: "(555) 924-9726", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", Phone: "(438) 738-4935", parentId: 1 },
          { id: 3, Name: "Priscilla Frank", Position: "Chief Product Officer", Phone: "(217) 280-5300", parentId: 1 }
        ],
        schema: {
          model: {
            id: "id",
            parentId: "parentId",
            expanded: true,
            fields: {
              Name: { type: "string" },
              Position: { type: "string" },
              Phone: { type: "string" }
            }
          }
        }
      });

      dataSource.read();
    </script>

### schema.model `Object`

The model configuration of the TreeListDataSource. See [kendo.data.TreeListModel](/api/javascript/data/treelistmodel) for more info.


<div class="meta-api-description">
Configure and define the data structure, item fields, unique identifiers, default values, and validation rules that shape and control hierarchical data binding in tree or nested list views. Set up or customize the model schema to manage how nested or parent-child items are interpreted, validated, and displayed in a tree-like data grid, including mapping data fields to control item types, relationships, and consistency. Enable schema-driven data validation and field configuration for complex hierarchical datasets used in tree lists, outline data shape for robust binding, and control item identity and relationships within nested data structures.
</div>

#### Example

    <script>
      var dataSource = new kendo.data.TreeListDataSource({
        data: [
          { EmployeeID: 1, Name: "Daryl Sweeney", Position: "CEO", Phone: "(555) 924-9726", parentId: null },
          { EmployeeID: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", Phone: "(438) 738-4935", parentId: 1 },
          { EmployeeID: 3, Name: "Priscilla Frank", Position: "Chief Product Officer", Phone: "(217) 280-5300", parentId: 1 }
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

See the [DataSource methods](/api/javascript/data/datasource#methods) for all inherited methods.

### load

Loads the child nodes of a model.


<div class="meta-api-description">
Fetch or retrieve child nodes dynamically, enabling lazy-loading or on-demand loading of hierarchical data structures; configure or trigger loading of children for a specific parent node or model within a tree or nested list, update and populate the children collection programmatically, control the asynchronous fetching process of child elements, handle partial data loading in tree views or data grids, implement expandable node loading, refresh or update node children state after data retrieval, manage hierarchical data fetching logic, and set up automatic or manual loading of child nodes to optimize performance and data rendering in tree components.
</div>

#### Parameters

##### model `kendo.data.TreeListModel`

The model that must be loaded.

#### Returns

`Promise` A promise that will be resolved when the child nodes have been loaded, or rejected if an HTTP error occurs.

#### Example

    <script>
      var dataSource = new kendo.data.TreeListDataSource({
        transport: {
          read: {
            url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory"
          }
        },
        schema: {
          model: {
            id: "EmployeeId",
            fields: {
              EmployeeId: { type: "number", nullable: false },
              parentId: { field: "ReportsTo", nullable: true }
            }
          }
        }
      });

      dataSource.read().then(function() {
        // load child nodes of first root item
        var root = dataSource.at(0);
        return dataSource.load(root);
      }).then(function() {
        // log child nodes of first root
        var root = dataSource.at(0);
        var children = dataSource.childNodes(root);
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(children);
      });
    </script>

### childNodes

Child nodes for model.


<div class="meta-api-description">
Access or retrieve the immediate child nodes or nested items of a given data model within a hierarchical tree structure, enabling iteration, inspection, updating, or rebinding of subordinate records or rows; use this method to manage, manipulate, or render direct descendants, child collections, nested data entries, or hierarchical relationships when working with tree-like data sources, expanding or collapsing branches, traversing descendants, or dynamically modifying child elements linked to a parent model in a TreeList or similar nested data frameworks.
</div>

#### Parameters

##### model `kendo.data.TreeListModel`

The model whose children must be returned.

#### Returns

`Array` of the child items.

#### Example

    <script>
      var dataSource = new kendo.data.TreeListDataSource({
        data: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", Phone: "(555) 924-9726", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", Phone: "(438) 738-4935", parentId: 1 },
          { id: 3, Name: "Priscilla Frank", Position: "Chief Product Officer", Phone: "(217) 280-5300", parentId: 1 }
        ],
        schema: {
          model: {
            id: "id",
            expanded: true
          }
        }
      });

      dataSource.read();

      var firstNode = dataSource.view()[0];
      var childNodes = dataSource.childNodes(firstNode);
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(childNodes); // returns an array of the child nodes of the first node
    </script>

### rootNodes

Return all root nodes.


<div class="meta-api-description">
Get the top-level elements, root or parentless nodes, from a hierarchical tree data structure to access, iterate through, select, render, update, or initialize user interfaces with only the highest level items before loading children or expanding branches. Extract the initial layer of nodes from a tree data source, retrieve all root nodes as objects for manipulating or displaying the base elements in tree lists, hierarchical views, or navigation trees. Enable fetching or controlling first-tier nodes in nested data models to manage hierarchy root-level selections, batch updates, or preloading steps in tree components and data trees.
</div>

#### Returns

`Array` of the root items.

#### Example

    <script>
      var dataSource = new kendo.data.TreeListDataSource({
        data: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", Phone: "(555) 924-9726", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", Phone: "(438) 738-4935", parentId: 1 },
          { id: 3, Name: "Priscilla Frank", Position: "Chief Product Officer", Phone: "(217) 280-5300", parentId: 1 }
        ],
        schema: {
          model: {
            id: "id",
            expanded: true
          }
        }
      });

      dataSource.read();

      var rootNodes = dataSource.rootNodes();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(rootNodes); // returns an array of the root nodes
    </script>

### parentNode

The parent of given node.


<div class="meta-api-description">
Retrieve or access the immediate parent node of a given tree or hierarchical data element to navigate, traverse, or query ancestor relationships within nested data structures, enabling hierarchical lookups, lineage tracing, node re-parenting, updating parent-child links, or managing tree data connections and parent references in complex data lists or trees.
</div>

#### Parameters

##### model `kendo.data.TreeListModel`

The model whose parent must be returned.

#### Returns

`kendo.data.TreeListModel` parent of the node.

#### Example

    <script>
      var dataSource = new kendo.data.TreeListDataSource({
        data: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", Phone: "(555) 924-9726", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", Phone: "(438) 738-4935", parentId: 1 },
          { id: 3, Name: "Priscilla Frank", Position: "Chief Product Officer", Phone: "(217) 280-5300", parentId: 1 }
        ],
        schema: {
          model: {
            id: "id",
            expanded: true
          }
        }
      });

      dataSource.read();

      var childNode = dataSource.view()[1];
      var parentNode = dataSource.parentNode(childNode);
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(parentNode); // returns the parent node of the passed node
    </script>

### level

The hierarchical level of the node.


<div class="meta-api-description">
Retrieve or calculate the depth, nesting level, or hierarchy tier of a specific tree node to understand its position within a hierarchical data structure, enabling indentation control, conditional styling, dynamic formatting, or logic branching based on how deeply nested an item is; supports queries to determine parent-child relations, node levels, or hierarchy depths for tree data visualization, manipulation, or structural analysis in tree or list components.
</div>

#### Parameters

##### model `kendo.data.TreeListModel`

The model whose level must be calculated.

#### Returns

`Number` the hierarchy level of the node.

#### Example - get the level of an item in the TreeListDataSource
    <script>
      var dataSource = new kendo.data.TreeListDataSource({
        transport: {
          read: {
            url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
          }
        },
        schema: {
          model: {
            id: "EmployeeID",
            parentId: "ReportsTo",
            fields: {
              ReportsTo: { field: "ReportsTo",  nullable: true },
              EmployeeID: { field: "EmployeeId", type: "number" }
            },
            expanded: true
          }
        },
        change: function(e){
          var item = dataSource.get(9);
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("Employee with name " + item.FirstName + "is at level: " + dataSource.level(item));
        }
      });
      dataSource.read();
    </script>
