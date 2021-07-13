---
title: Common Scenarios
page_title: jQuery TreeView Documentation | Common Scenarios
description: "Get started with the jQuery TreeView by Kendo UI and implement some common use-case scenarios."
slug: commonscenarios_kendoui_treeview
position: 20
---

# Common Scenarios

This article provides common scenarios you might encounter when working with the Kendo UI TreeView widget.

* [Getting the data of the nodes](#getting-the-node-data)
* [Reloading child nodes when nodes expand](#reloading-child-nodes-when-nodes-expand)
* [Gathering checked nodes from the TreeView](#gathering-child-nodes-from-the-treeview)
* [Projecting the state of the TreeView](#projecting-the-treeview-state)

## Getting the Node Data

You can get the TreeView node data in the `select` event handler.

    function onSelect(e) {
        // This refers to the TreeView object.
        var dataItem = this.dataItem(e.node);

        console.log("Selected node with id=" + dataItem.id);
    }

    $("#treeview").kendoTreeView({
        dataSource: [
            { id: 1, text: "Item 1", items: [
                { id: 3, text: "Item 3" }
            ] },
            { id: 2, text: "Item 2" }
        ],
        select: onSelect
    });

## Reloading Child Nodes When Nodes Expand

Since `dataItem` is of the [`Node`](/api/framework/node) type, you can use its [`loaded`](/api/framework/node#methods-loaded) flag to force the reloading of nodes from the server. The `Node.loaded` method sets the `loaded` flag of the node and indicates that it needs to be refreshed.

    function onExpand(e) {
        var dataItem = this.dataItem(e.node);

        dataItem.loaded(false);
    }

    $("#treeview").kendoTreeView({
        dataSource: remoteDataSource,
        expand: onExpand
    });

## Gathering Checked Nodes from the TreeView

The following example demonstrates how to gather the checked nodes from a Kendo UI TreeView. You can also use this approach to gather expanded nodes.

    var treeview = $("#treeview").data("kendoTreeView");
    var checkedNodes = [];

    function gatherStates(nodes) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].checked) {
                checkedNodes.push(nodes[i].id);
            }

            if (nodes[i].hasChildren) {
               gatherStates(nodes[i].children.view());
            }
        }
    }

    gatherStates(treeview.dataSource.view());

## Projecting the TreeView State

The `HierarchicalDataSource` does not support data projection. Therefore, you might need to remap the state fields by using the [`schema.parse`](/api/framework/datasource#configuration-schema.parse) configuration option.

    <div id="tree">
    <script>
      $("#tree").kendoTreeView({
        dataSource: {
          transport: {
            read: function (options) {
              setTimeout(function() {
                options.success([
                  { hasChildren: false, text: "Node 1", Downloaded: false },
                  { hasChildren: true, text: "Node 2", Downloaded: true, items: [
                    { hasChildren: false, text: "Node 2.1", Downloaded: false },
                  ] }
                ]);
              }, 1000);
            }
          },
          schema: {
            parse: function(response) {
              return $.map(response, function(x) {
                x.expanded = x.Downloaded;
                return x;
              });
            },
            model: {
              id: "id",
              hasChildren: "hasChildren",
              children: "items"
            }
          }
        }
      });

    </script>

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
