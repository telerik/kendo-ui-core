---
title: Node
page_title: API Reference for Kendo Data Node
description: Documentation how to get started with the kendo.data.Node, the extended type of kendo.data.Model. Find examples and guidelines for methods, fields and events of kendo.data.Node.
res_type: api
---

# kendo.data.Node

The `Node` is an extended type of a [`Model`](/api/framework/model) that works with hierarchical data. The [HierarchicalDataSource](/api/framework/hierarchicaldatasource) contains instances of the `Node` type.

## Fields

See the [`Model` fields](/api/framework/model#fields) for all inherited fields.

### children

The child `kendo.data.HierarchicalDataSource` of the node. This field is initialized lazily if the `hasChildren` field is set or when the [`load`](/api/javascript/data/node/methods/load) or [`append`](/api/javascript/data/node/methods/append) methods were called.


<div class="meta-api-description">
Access and manipulate a node's child elements as a hierarchical data source collection, enabling retrieval, dynamic loading, binding, inspection, or modification of child nodes within tree or hierarchical structures. Support for lazy initialization of child nodes based on indicators like child existence flags, with the ability to programmatically load, append, or update child collections for hierarchical data handling, navigation, or UI representation in complex nested datasets. Configure, manage, and interact with children nodes for scenarios involving hierarchical data binding, dynamic child population, or programmatic tree traversal and manipulation.
</div>

#### Example - get the child nodes

    <script>
    var parentTask = new kendo.data.Node({ text: "Parent" });
    parentTask.append({ text: "Child" });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(parentTask.children.data().length); // outputs "1"
    var child = parentTask.children.at(0);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(child.text); // outputs "Child"
    </script>

#### Example - sync the child datasource

    <script>
    var parentTask = new kendo.data.Node({ text: "Parent" });
    parentTask.append({ text: "Child" }); // add new child node
    parentTask.children.sync();
    </script>

## Methods

See the [`Model` methods](/api/framework/model#methods) for all inherited methods.

### append

Appends a new item to the children data source and initializes it if necessary.


<div class="meta-api-description">
Add or insert a new child element to a hierarchical data node, enabling dynamic expansion or modification of tree-like structures by pushing or appending children nodes or models; control how new subordinate data entries are created, initialized, and linked within parent-child relationships in nested data sources, managing hierarchical metadata and ensuring proper integration of child items for dynamic tree updates, structure modification, or runtime insertion of child elements.
</div>

#### Parameters

##### model `Object|kendo.data.Node`

The data for the new item.

#### Example - append child nodes

    <script>
    var parentTask = new kendo.data.Node({ text: "Parent" });
    parentTask.append({ text: "Child" });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(parentTask.children.data().length); // outputs "1"
    var child = parentTask.children.at(0);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(child.text); // outputs "Child"
    </script>

### level

Gets the current nesting level of the node within the data source.


<div class="meta-api-description">
Determine or retrieve the depth, nesting position, or hierarchical level of an element or node within a tree or nested data structure, enabling developers to access the numeric rank or tier of a node inside parent-child relationships. This is useful for calculating indentation, applying conditional styles or logic based on how deep an item is within a hierarchy, managing multilayered data structures, and controlling rendering or behavior depending on node depth. Common use cases include finding how far down a node is nested, evaluating its relative position in a hierarchy, configuring UI layout based on levels, or implementing logic sensitive to the node’s place in a nested arrangement.
</div>

#### Returns

`Number`&mdash;The zero-based level of the node.

#### Example - get the level of the node

    <script>
    var dataSource = new kendo.data.HierarchicalDataSource({
        data: [
            {
                id: 1,
                text: "Root",
                items: [
                    { id: 2, text: "Child" }
                ]
            }
        ]
    });
    dataSource.read();
    var root = dataSource.get(1);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(root.level()); // outputs "0"
    root.load(); // Load child nodes
    var child = dataSource.get(2);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(child.level()); // outputs "1"
    </script>

### load

Loads the child nodes in the child data source and supplies the `id` of the `Node` to the request.


<div class="meta-api-description">
Control loading or refreshing child elements of a hierarchical data node by triggering data fetch operations tied to the node’s unique identifier; configure lazy loading, on-demand expansion, or real-time retrieval of nested child items from local or remote data sources, enabling dynamic updates, server-side filtering, incremental loading, and seamless integration with APIs or data endpoints that return children based on node context or ID.
</div>

#### Example - load the child nodes

    <script>
    var dataSource = new kendo.data.HierarchicalDataSource({
        transport: {
            read: {
                url: "https://demos.telerik.com/service/v2/core/Employees"
            }
        },
      schema: {
        model: {
          id: "EmployeeId",
          hasChildren: "HasEmployees"
        }
      }
    });
    dataSource.fetch(function() {
      var node = dataSource.at(0);
      node.load(); // load the child nodes
    });
    </script>

### loaded

Gets or sets the loaded flag of the `Node`. Setting the loaded flag to `false` allows the reloading of child items.


<div class="meta-api-description">
Retrieve or update the loaded state of a node in a hierarchical data structure, enabling control over whether a node's children are considered fetched or need reloading; check if a node is currently loaded, mark it as unloaded to force re-fetching child data, toggle the loaded flag to manage dynamic data loading, refresh or reset node state to trigger data retrieval, and configure lazy loading behavior by setting the loaded status for nodes within tree or hierarchical data sources.
</div>

#### Example - reload child nodes

    <script>
    var dataSource = new kendo.data.HierarchicalDataSource({
        transport: {
            read: {
                url: "https://demos.telerik.com/service/v2/core/Employees"
            }
        },
      schema: {
        model: {
          id: "EmployeeId",
          hasChildren: "HasEmployees"
        }
      }
    });

    dataSource.fetch(function() {
      var node = dataSource.at(0);
      node.load(); // load the child nodes
      node.loaded(false); // clear the loaded flag
      node.load(); // load the child nodes again
    });
    </script>

### parentNode

Gets the parent node.


<div class="meta-api-description">
Get or access the direct parent node or ancestor of a current item in a hierarchical or tree data structure to navigate upward, inspect parent elements, retrieve the immediate ancestor for traversal, update or manipulate parent nodes, identify relationships between nodes, handle tree navigation efficiently, determine the parent reference for a given node, enable moving up one level in nested structures, or fetch the node above the current one, with support for null results if the node is at the root level without parents.
</div>

#### Returns

`kendo.data.Node`&mdash;The parent of the node. Returns `null` if the node is a root node or does not have a parent.

#### Example - get the parent node

    <script>
    var dataSource = new kendo.data.HierarchicalDataSource({
       data: [
           {
               id: 1,
               text: "Root",
               items: [
                   { id: 2, text: "Child" }
               ]
           }
       ]
    });
    dataSource.read();
    var root = dataSource.get(1);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(root.parentNode()); // outputs "null"
    root.load(); // load child nodes
    var child = dataSource.get(2);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(child.parentNode().text); // outputs "Root"
    </script>

## Events

See the [`Model` events](/api/framework/model#events) for all inherited events.
