---
title: Templates
page_title: jQuery DropDownTree Documentation | Templates
description: "Get started with the jQuery DropDownTree by Kendo UI and use the node, value, header, footer, and no-data template in the widget."
slug: templates_kendoui_dropdowntree
position: 6
---

# Templates

The DropDownTree provides full control over the way an item, a selected value, a popup header or footer is rendered through the Kendo UI for jQuery templates.

For more information on the capabilities and syntax of the templates, refer to this [documentation article](https://docs.telerik.com/kendo-ui/framework/templates/overview). For a runnable example, refer to the [demo on using templates in the DropDownTree](https://demos.telerik.com/kendo-ui/dropdowntree/templates).

## Item Template

The item template manages the way the nodes in the DropDownTree are rendered.

    <input id="dropdowntree">
    <script id="treeview-template" type="text/kendo-ui-template">
            #: item.text #
            <a class='k-icon k-i-close-outline' href='\#'></a>
    </script>
    <script>
        $(document).ready(function() {
            $("#dropdowntree").kendoDropDownTree({
                template: kendo.template($("#treeview-template").html()),
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

## Value Template

The value template manages the way the selected items in the input area of the DropDownTree are rendered.

> Value templates must consist of `inline` HTML elements only.

    <input id="dropdowntree"></input>
    <!-- Template -->
    <script id="valueTemplate" type="text/x-kendo-template">
        ContactName: #:data.FullName#
    </script>

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
            valueTemplate: $("#valueTemplate").html(),
            dataSource: myDataSource,
            dataTextField: "FullName"
        });
    </script>

## Header Template

The header template manages the way the pop-up header of a DropDownTree is rendered.

    <input id="dropdowntree">
    <script id="headerTemplate" type="text/x-kendo-template">
        <strong>Header</strong>
    </script>
    <script>
        $(document).ready(function() {
            $("#dropdowntree").kendoDropDownTree({
                headerTemplate: $("#headerTemplate").html(),
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

## Footer Template

The footer template manages the way the pop-up footer of a DropDownList is rendered. The footer is re-rendered on every change of the Data Source. The context of the template is the widget itself.

    <input id="dropdowntree"></input>
    <!-- Template -->
    <script id="footerTemplate" type="text/x-kendo-template">
    <strong>this is footer</strong>
    </script>

    <script>
    var serviceRoot = "https://demos.telerik.com/kendo-ui/service";

    $("#dropdowntree").kendoDropDownTree({
        footerTemplate: $("#footerTemplate").html(),
        dataSource: {
        transport: {
            read: {
            dataType: "jsonp",
            url: "https://demos.telerik.com/kendo-ui/service/Employees"
            }
        },
        schema: {
            model: {
            id: "EmployeeId",
            hasChildren: "HasEmployees"
            }
        }
        },
        dataTextField: "FullName"
    });
    </script>

## No-Data Template

The DropDownList displays `noDataTemplate` in the popup when the data source is empty.

> When the `noDataTemplate` option is defined, the widget always opens the popup element.

    <input id="dropdowntree"></input>
    <!-- Template -->
    <script id="noDataTemplate" type="text/x-kendo-template">
        <strong>No Data!</strong>
    </script>

    <script>
    var serviceRoot = "https://demos.telerik.com/kendo-ui/service";

    $("#dropdowntree").kendoDropDownTree({
        noDataTemplate: $("#noDataTemplate").html(),
        filter: "contains",
        dataSource: {
        transport: {
            read: {
            dataType: "jsonp",
            url: "https://demos.telerik.com/kendo-ui/service/Employees"
            }
        },
        schema: {
            model: {
            id: "EmployeeId",
            hasChildren: "HasEmployees"
            }
        }
        },
        dataTextField: "FullName"
    });
    </script>

## See Also

* [Templates in the DropDownTree (Demo)](https://demos.telerik.com/kendo-ui/dropdowntree/templates)
* [JavaScript API Reference of the DropDownTree](/api/javascript/ui/dropdowntree)
