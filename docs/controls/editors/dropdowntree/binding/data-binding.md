---
title: Local and Remote Data
page_title: jQuery DropDownTree Documentation | Local and Remote Data Binding
description: "Get started with the jQuery DropDownTree by Kendo UI and bind the widget to local or remote data."
slug: databinding_kendoui_dropdowntree
position: 1
---

# Local and Remote Data Binding

The DropDownTree provides options for binding it to [local data arrays](#binding-to-local-data) and [remote data services](#binding-to-remote-data).

## Binding to Local Data

Local arrays are suitable for limited value options.

To initialize the DropDownTree by binding the widget to a local data array, use the [Data Source component]({% slug overview_kendoui_datasourcecomponent %}). It is an abstraction for local and remote data.

    <input id="dropdowntree">

    <script>
        $(document).ready(function() {
            $("#dropdowntree").kendoDropDownTree({
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
            });
        });
    </script>

## Binding to Remote Data

The following example demonstrates how to create a DropDownTree and bind it to a remote HierarchicalDataSource.

    <input id="dropdowntree"></input>

    <script>
        var serviceRoot = "https://demos.telerik.com/kendo-ui/service";
        var myDataSource = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                url: serviceRoot + "/Employees",
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

        $("#dropdowntree").kendoDropDownTree({
            dataSource: myDataSource,
            dataTextField: "FullName"
        });
    </script>

## See Also

* [Remote Data Binding by the DropDownTree (Demo)](https://demos.telerik.com/kendo-ui/dropdowntree/remote-data-binding)
* [OData Binding by the DropDownTree (Demo)](https://demos.telerik.com/kendo-ui/dropdowntree/odata-binding)
* [JavaScript API Reference of the DropDownTree](/api/javascript/ui/dropdowntree)
