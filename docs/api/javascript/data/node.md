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

#### Example - get the child nodes

    <script>
    var parent = new kendo.data.Node({ text: "Parent" });
    parent.append({ text: "Child" });
    console.log(parent.children.data().length); // outputs "1"
    var child = parent.children.at(0);
    console.log(child.text); // outputs "Child"
    </script>

#### Example - sync the child datasource

    <script>
    var parent = new kendo.data.Node({ text: "Parent" });
    parent.append({ text: "Child" }); // add new child node
    parent.children.sync();
    </script>

## Methods

See the [`Model` methods](/api/framework/model#methods) for all inherited methods.

### append

Appends a new item to the children data source and initializes it if necessary.

#### Parameters

##### model `Object|kendo.data.Node`

The data for the new item.

#### Example - append child nodes

    <script>
    var parent = new kendo.data.Node({ text: "Parent" });
    parent.append({ text: "Child" });
    console.log(parent.children.data().length); // outputs "1"
    var child = parent.children.at(0);
    console.log(child.text); // outputs "Child"
    </script>

### level

Gets the current nesting level of the node within the data source.

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
    console.log(root.level()); // outputs "0"
    root.load(); // Load child nodes
    var child = dataSource.get(2);
    console.log(child.level()); // outputs "1"
    </script>

### load

Loads the child nodes in the child data source and supplies the `id` of the `Node` to the request.

#### Example - load the child nodes

    <script>
    var dataSource = new kendo.data.HierarchicalDataSource({
        transport: {
            read: {
                url: "https://demos.telerik.com/kendo-ui/service/Employees",
                dataType: "jsonp"
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

#### Example - reload child nodes

    <script>
    var dataSource = new kendo.data.HierarchicalDataSource({
        transport: {
            read: {
                url: "https://demos.telerik.com/kendo-ui/service/Employees",
                dataType: "jsonp"
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
    console.log(root.parentNode()); // outputs "null"
    root.load(); // load child nodes
    var child = dataSource.get(2);
    console.log(child.parentNode().text); // outputs "Root"
    </script>

## Events

See the [`Model` events](/api/framework/model#events) for all inherited events.
