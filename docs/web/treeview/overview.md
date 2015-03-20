---
title: Overview
page_title: Overview of Kendo UI jQuery TreeView widget
description: Documentation for Kendo UI TreeView widget.
position: 1
---

# Overview

The TreeView displays hierarchical data in a traditional tree structure. It supports user
interaction through the mouse or touch to perform re-ordering operations via drag-and-drop.

## Getting Started

A TreeView can be created in two ways:

1.  Define a hierarchical list with static HTML
2.  Use dynamic data binding either to a local or remote data source.

Static HTML definition is appropriate for small hierarchies and for data that does not change frequently.
Databinding should be used for larger data sets and for data that changes frequently.


## Creating a TreeView from HTML

### Create a hierarchical list in HTML

    <ul id="treeView">
        <li>Item 1
            <ul>
                <li>Item 1.1</li>
                <li>Item 1.2</li>
            </ul>
        </li>
        <li>Item 2</li>
    </ul>

Initialization of a TreeView should occur after the DOM is fully loaded,
preferably in the $(document).ready() event handler.

### Initialize a TreeView using a selector within $(document).ready()

    $(document).ready(function() {
        $("#treeView").kendoTreeView();
    });

## Creating a TreeView with Data Binding to a Local Data Source

### Create the TreeView container

    <div id="treeView"></div>

### Initialize and bind the TreeView

    $(document).ready(function() {
        $("#treeView").kendoTreeView({
            dataSource: [
                {
                    text: "Item 1",
                    items: [
                        { text: "Item 1.1" },
                        { text: "Item 1.2" }
                    ]
                },
                { text: "Item 2" }
            ]
        })
    });

### Binding to a remote HierarchicalDataSource

    $("#treeView").kendoTreeView({
        dataSource: {
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/Employees",
                    dataType: "json"
                }
            },
            schema: {
                model: {
                    id: "EmployeeId",
                    hasChildren: "HasEmployees"
                }
            }
        }
    })

A complete reference on how to bind the TreeView to different service end-points can be found
on the [HierarchicalDataSource API help](/api/framework/hierarchicaldatasource).

### Enabling drag-and-drop for TreeView nodes

    $("#treeView").kendoTreeView({
        dragAndDrop: true
    });

When drag-and-drop is enabled, the nodes of a TreeView can be dragged and dropped between all
levels, with useful tooltips helping indicate where the node will be dropped.


## Accessing an Existing TreeView

You can reference an existing **TreeView** instance via
[jQuery.data()](http://api.jquery.com/jQuery.data/). Once a reference has been established, you can
use the API to control its behavior.

### Accessing an existing TreeView instance

    var treeView = $("#treeView").data("kendoTreeView");

## Item definition

When binding through the dataSource configuration option, each item can have the following properties:

    var item = {
        text: "Item text",

        // if specified, renders the item as a link. (<a href=""></a>)
        url: "/",

        // renders a <img class="k-image" src="/images/icon.png" />
        imageUrl: "/images/icon.png",

        // renders a <span class="k-sprite icon save" />
        spriteCssClass: "icon save",

        // specifies whether the node text should be encoded or not
        // useful when rendering node-specific HTML
        encoded: false,

        // specifies whether the item is initially expanded
        // (applicable when the item has child nodes)
        expanded: true,

        // specifies whether the item checkbox is initially checked
        // (applicable for items with checkboxes using the default checkbox template)
        checked: true,

        // specifies whether the item is initially selected
        selected: true,

        // indicates the sub-items of the item
        items: [
            { text: "Subitem text" }
        ]
    };

The **text**, **imageUrl**, **spriteCssClass** and **url** fields can be changed through the
[datatextfield](/api/web/treeview#dataTextField), [dataimageurlfield](/api/web/treeview#dataImageUrlField),
[dataspritecssclassfield](/api/web/treeview#dataSpriteCssClassField), and [dataurlfield](/api/web/treeview#dataUrlField),
respectively.

You can add arbitrary fields when binding through a dataSource. These are stored in the HierarchicalDataSource,
and can be easily accessed through the treeview [dataItem method](/api/web/treeview#dataitem):

## Common operations

### Getting the node data in the select event handler

    function onSelect(e) {
        // `this` refers to the TreeView object
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

Since the dataItem is of type [Node](/api/framework/node),
you can use its [loaded flag](/api/framework/node#methods-loaded) to force reloading of nodes from the server.

### Reloading child nodes when nodes are expanded

    function onExpand(e) {
        var dataItem = this.dataItem(e.node);

        dataItem.loaded(false);
    }

    $("#treeview").kendoTreeView({
        dataSource: remoteDataSource,
        expand: onExpand
    });

The Node.loaded method sets the loaded flag of the node, indicating that it needs to be refreshed.

### Gathering the checked nodes from a treeview

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

The same approach can be used for gathering of expanded nodes.

### Projecting the TreeView state

Because the HierarchicalDataSource does not support data projection, you might need to remap state fields via the [schema.parse](/api/framework/datasource#configuration-schema.parse) configuration option:

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
