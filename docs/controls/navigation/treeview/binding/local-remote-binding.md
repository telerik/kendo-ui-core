---
title: Local and Remote Data
page_title: jQuery TreeView Documentation | Local and Remote Data 
description: "Get started with the jQuery TreeView by Kendo UI and learn how to initialize the widget and use its events."
slug: databinding_kendoui_treeview
position: 1
---

# Local and Remote Data Binding

The TreeView provides options for binding it to local data arrays or remote data services.

For more information on binding the TreeView to different service end-points, refer to the [`HierarchicalDataSource`](/api/framework/hierarchicaldatasource) documentation.

## Binding to Local Data

The following example demonstrates how to create a TreeView and bind it to a local data source.

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

## Binding to Remote Data

The following example demonstrates how to create a TreeView and bind it to a remote HierarchicalDataSource.

    $("#treeView").kendoTreeView({
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/Employees",
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

## See Also

* [Local Data Binding of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/local-data-binding)
* [Remote Data Binding of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/remote-data-binding)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
