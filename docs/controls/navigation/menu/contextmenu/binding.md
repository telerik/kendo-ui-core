---
title: Data Binding
page_title: jQuery ContextMenu Documentation | Data Binding
description: "Get started with the jQuery ContextMenu by Kendo UI and bind the widget to local data arrays or remote data services."
slug: binding_kendoui_contextmenu
position: 2
---

# Data Binding

As of the Kendo UI R2 2019 release, you can use the [`HierarchicalDataSource`](/api/framework/hierarchicaldatasource) for binding widgets to data.

## Binding to Local Data

The following example demonstrates how to create a ContextMenu and bind it to a local data source.

    <div id="target">target</div>
    <ul id="contextmenu"></ul>

    <script>
    $(document).ready(function() {
        $("#contextmenu").kendoContextMenu({
            target: "#target",
            dataSource: [
                {
                    text: "Item 1",
                    expanded: true,
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

The following example demonstrates how to create a Menu and bind it to a remote HierarchicalDataSource.

    <div id="target">target</div>
    <ul id="contextmenu"></ul>

    <script>
    $(document).ready(function() {
        $("#contextmenu").kendoContextMenu({
            target: "#target",
            dataTextField: "FullName",
            dataSource: {
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
            }
        })
    });
    </script>

## See Also

* [Basic Usage of the ContextMenu (Demo)](https://demos.telerik.com/kendo-ui/menu/context-menu)
* [JavaScript API Reference of the Menu](/api/javascript/ui/menu)
