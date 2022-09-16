---
title: Templates
page_title: jQuery AutoComplete Documentation | Templates
description: "Get started with the jQuery AutoComplete by Kendo UI and use the item, header, footer, and no-data templates to organize its data."
slug: templates_kendoui_autocomplete
position: 5
---

# Templates

The AutoComplete provides full control over the way an item, the popup header and the popup footer are rendered by using the Kendo UI templates.

For more information on the capabilities and syntax of the templates, refer to this [documentation article]({% slug overview_kendoui_templatescomponent %}). For a runnable example, refer to the [demo on customizing the templates in the AutoComplete](https://demos.telerik.com/kendo-ui/autocomplete/template).

## Item Templates

The item template manages the way the list items of an AutoComplete are rendered.

The following example demonstrates how to define an item template.

    <input id="autoComplete" />
    <!-- Template -->
    <script id="scriptTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#, CustomerID: #:data.CustomerID#
    </script>

    <!-- AutoComplete initialization -->
    <script>
        $(document).ready(function() {
            $("#autoComplete").kendoAutoComplete({
                template: $("#scriptTemplate").html(),
                dataTextField: "ContactName",
                dataSource: {
                    transport: {
                        read: {
                            dataType: "jsonp",
                            url: "https://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

## Header Templates

The header template manages the way the popup header of an AutoComplete is rendered.

    <input id="autoComplete" />
    <!-- Template -->
    <script id="headerTemplate" type="text/x-kendo-template">
        <strong>Header</strong>
    </script>

    <!-- AutoComplete initialization -->
    <script>
        $(document).ready(function() {
            $("#autoComplete").kendoAutoComplete({
                headerTemplate: $("#headerTemplate").html(),
                dataTextField: "ContactName",
                dataSource: {
                    transport: {
                        read: {
                            dataType: "jsonp",
                            url: "https://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

## Footer Templates

The footer template manages the way the popup footer of an AutoComplete is rendered. The footer is re-rendered on every change of the Data Source. The context of the template is the widget itself.

    <input id="autoComplete" />
    <!-- Template -->
    <script id="footerTemplate" type="text/x-kendo-template">
        Total <strong>#: instance.dataSource.total() #</strong> items found
    </script>

    <!-- AutoComplete initialization -->
    <script>
        $(document).ready(function() {
            $("#autoComplete").kendoAutoComplete({
                footerTemplate: $("#footerTemplate").html(),
                dataTextField: "ContactName",
                dataSource: {
                    transport: {
                        read: {
                            dataType: "jsonp",
                            url: "https://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

## No-Data Templates

The AutoComplete displays `noDataTemplate` in the popup when the data source is empty.

> When the `noDataTemplate` option is defined, the AutoComplete always opens its popup element.

    <input id="autoComplete" />
    <!-- Template -->
    <script id="noDataTemplate" type="text/x-kendo-template">
        <strong>No Data!</strong>
    </script>

    <!-- AutoComplete initialization -->
    <script>
        $(document).ready(function() {
            $("#autoComplete").kendoAutoComplete({
                noDataTemplate: $("#noDataTemplate").html(),
                dataTextField: "ContactName",
                dataSource: {
                    transport: {
                        read: {
                            dataType: "jsonp",
                            url: "https://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

## See Also

* [Customizing Templates in the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/template)
* [JavaScript API Reference of the AutoComplete](/api/javascript/ui/autocomplete)
