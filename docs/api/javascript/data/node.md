---
title: Node
page_title: API Reference for Kendo Data Node
description: Documentation how to get started with the kendo.data.Node, the extended type of kendo.data.Model. Find examples and guidelines for methods, fields and events of kendo.data.Node.
---

# kendo.data.Node

The `Node` is an extended type of [Model](/api/framework/model) that works with hierarchical data. The [HierarchicalDataSource](/api/framework/hierarchicaldatasource) contains instances of the `Node` type.

## Fields

See the [Model fields](/api/framework/model#fields) for all inherited fields.

### children

The child `kendo.data.HierarchicalDataSource` of the node. This field is initialized lazily, if the `hasChildren` field is set,
or when the [load](#methods-load) or [append](#methods-append) methods have been called.

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

See the [Model methods](/api/framework/model#methods) for all inherited methods.

### append

Appends a new item to the children data source, and initializes it if necessary.

#### Parameters

##### model `Object|kendo.data.Node`

The data for the new item

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

`Number` the zero based level of the node.

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

Loads the child nodes in the child data source, supplying the `id` of the Node to the request.

#### Example - load the child nodes

    <script>
    var dataSource = new kendo.data.HierarchicalDataSource({
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/Employees",
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

Gets or sets the loaded flag of the Node. Setting the loaded flag to `false` allows reloading of child items.

#### Example - reloading child nodes

    <script>
    var dataSource = new kendo.data.HierarchicalDataSource({
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/Employees",
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

`kendo.data.Node` the parent of the node; `null` if the node is a root node or doesn't have a parent.

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

See the [Model events](/api/framework/model#events) for all inherited events.
