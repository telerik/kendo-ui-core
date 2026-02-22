---
title: Data Binding
page_title: jQuery Menu Documentation - Data Binding
description: "Get started with the jQuery Menu by Kendo UI and bind the component to local data arrays or to remote data services."
components: ["menu"]
slug: databinding_kendoui_menu
position: 2
---

# Data Binding

As of the Kendo UI R2 2019 release, you can use the [`HierarchicalDataSource`](/api/framework/hierarchicaldatasource) for binding components to data.

## Binding to Local Data

The following example demonstrates how to create a Menu and bind it to a local data source.

    <ul id="menu"></ul>

    <script>
    $(document).ready(function() {
        $("#menu").kendoMenu({
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

    <ul id="menu"></ul>

    <script>
    $(document).ready(function() {
        $("#menu").kendoMenu({
            dataTextField: "FullName",
            dataSource: {
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
            }
        })
    });
    </script>

## See Also

* [Local Data Binding of the Menu (Demo)](https://demos.telerik.com/kendo-ui/menu/local-data-binding)
* [Remote Data Binding of the Menu (Demo)](https://demos.telerik.com/kendo-ui/menu/remote-data-binding)
* [JavaScript API Reference of the Menu](/api/javascript/ui/menu)
