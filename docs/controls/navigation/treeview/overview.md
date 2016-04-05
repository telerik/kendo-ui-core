---
title: Overview
page_title: Overview | Kendo UI TreeView
description: "Learn how to initialize the Kendo UI TreeView widget and configure its behavior."
slug: overview_kendoui_treeview_widget
position: 1
---

# TreeView Overview

The [Kendo UI TreeView widget](http://demos.telerik.com/kendo-ui/treeview/index) displays hierarchical data in a traditional tree structure. It supports user interaction through mouse or touch to perform re-ordering operations via drag-and-drop.

## Getting Started

### Initialize the TreeView

Kendo UI TreeView can be created in two ways:

1.  Through the definition of a hierarchical list by using static HTML. This approach is suitable for small hierarchies and for data that does not frequently change.
2.  Through the usage of dynamic data binding either to a local, or a remote data source. This approach is suitable for larger data sets and for data that frequently changes.

> **Important**
>
> As TreeView should be initialized after the DOM is fully loaded, make sure you create it within a `$(document).ready()` statement.

#### Through Hierarchical HTML List

The example below demonstrates how to initialize the TreeView through a hierarchical list in HTML.

###### Example

    <ul id="treeView">
        <li>Item 1
            <ul>
                <li>Item 1.1</li>
                <li>Item 1.2</li>
            </ul>
        </li>
        <li>Item 2</li>
    </ul>

    <script>
    $(document).ready(function() {
        $("#treeView").kendoTreeView();
    });
    </script>

#### Through Data Binding to Local Array

The example below demonstrates how to create a TreeView and bind it to a local data source.

###### Example

    <div id="treeView"></div>

    <script>
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
    </script>

#### Through Data Binding to Remote Service

The example below demonstrates how to create a TreeView and bind it to a remote HierarchicalDataSource.

###### Example

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

For a complete reference on how to bind the TreeView to different service end-points, refer to the [`HierarchicalDataSource` API article](/api/framework/hierarchicaldatasource).

## Configuration

### Drag and Drop

When the drag-and-drop feature is enabled, the nodes of a TreeView can be dragged and dropped between all levels. The functionality also features useful tooltips that help users indicate where the node is going to be dropped.

The example below demonstrates how to enable the drag-and-drop functionality for TreeView nodes.

###### Example

    $("#treeView").kendoTreeView({
        dragAndDrop: true
    });

### Item Properties

When binding the TreeView through the `dataSource` configuration option, each item can acquire the properties demonstrated in the example below.

###### Example

    var item = {
        text: "Item text",

        // If specified, renders the item as a link (<a href=""></a>)
        url: "/",

        // Renders a <img class="k-image" src="/images/icon.png" />
        imageUrl: "/images/icon.png",

        // Renders a <span class="k-sprite icon save" />
        spriteCssClass: "icon save",

        // Specifies whether the node text should be encoded, or not
        //(useful when rendering node-specific HTML)
        encoded: false,

        // Specifies whether the item is initially expanded
        // (applicable when the item has child nodes)
        expanded: true,

        // Specifies whether the item checkbox is initially checked
        // (applicable for items with checkboxes using the default checkbox template)
        checked: true,

        // Specifies whether the item is initially selected
        selected: true,

        // Indicates the sub-items of the item
        items: [
            { text: "Subitem text" }
        ]
    };

The `text`, `imageUrl`, `spriteCssClass`, and `url` fields can be configured through the [`datatextfield`](/api/web/treeview#dataTextField), [`dataimageurlfield`](/api/web/treeview#dataImageUrlField), [`dataspritecssclassfield`](/api/web/treeview#dataSpriteCssClassField), and [`dataurlfield`](/api/web/treeview#dataUrlField) options respectively.

You can add arbitrary fields when binding through `dataSource`. These are stored in the `HierarchicalDataSource`, and can be easily accessed through the TreeView [`dataItem` method](/api/web/treeview#dataitem).

## Common Scenarios

### Get Node Data in select Event Handler

The example below demonstrates how to get the node data in the `select` event handler.

###### Example

    function onSelect(e) {
        // this refers to the TreeView object
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

### Reload Child Nodes When Nodes Expand

Since `dataItem` is of the [`Node`](/api/framework/node) type, you are able to use its [loaded flag](/api/framework/node#methods-loaded) to force reloading of nodes from the server. The `Node.loaded` method sets the loaded flag of the node, indicating that it needs to be refreshed.

The example below demonstrates how to reload child nodes when nodes are expanded.

###### Example

    function onExpand(e) {
        var dataItem = this.dataItem(e.node);

        dataItem.loaded(false);
    }

    $("#treeview").kendoTreeView({
        dataSource: remoteDataSource,
        expand: onExpand
    });

### Gather Checked Nodes from TreeView

The example below demonstrates how to gather the checked nodes from a Kendo UI TreeView. You are able to use the same approach for gathering expanded nodes.

###### Example

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

### Project TreeView State

The `HierarchicalDataSource` does not support data projection. Therefore, you might need to remap state fields via the [`schema.parse`](/api/framework/datasource#configuration-schema.parse) configuration option.

The example below demonstrates how to project a TreeView state.

###### Example

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

## Reference

### Existing Instances

Refer to an existing TreeView instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference has been established, use the [TreeView API](/api/javascript/ui/treeview) to control its behavior.

The example below demonstrates how to access an existing TreeView instance.

###### Example

    var treeView = $("#treeView").data("kendoTreeView");

## See Also

Other articles and how-to examples on Kendo UI TreeView:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the TreeView](/aspnet-mvc/helpers/treeview/overview)
* [Overview of the TreeView JSP Tag]({% slug overview_treeview_uiforjsp %})
* [Overview of the TreeView PHP Class](/php/widgets/treeview/overview)
* [Bind to Flat Tables]({% slug bindtoflattables_treeview_widget %})
* [How to Attach Methods to Data Items]({% slug howto_attache_methodsto_dataitems_treeview %})
* [How to Check Nodes Programatically]({% slug howto_checknodeprogramatically_treeview %})
* [How to Combine Local Data with Remote Loading]({% slug howto_combinelocaldatawithremoteloading_treeview %})
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Expand All Nodes upon Check]({% slug howto_expandallnodes_uponcheck_treeview %})
* [How to Expand Nodes during Drag]({% slug howto_expandnodesduringdrag_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Prevent Dragging Nodes to Root Level]({% slug howto_preventdragging_nodestorootlevel_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Show Lines between Nodes]({% slug howto_showlinesbetweennodes_treeview %})
* [How to Show Node Context Menu]({% slug howto_shiwnodecontextmenu_treeview %})
* [How to Sort Child Nodes]({% slug howto_sortchildnodes_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})
* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)

How-to examples on Kendo UI TreeView in AngularJS:

* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_angularjs_treeview %})
* [How to Scroll to Item]({% slug howto_scrolltoitem_angularjs_treeview %})
* [How to Toggle Nodes with Single Click]({% slug howto_togglenodeswithsingleclick_angularjs_treeview %})
