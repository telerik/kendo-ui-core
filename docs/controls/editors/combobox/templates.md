---
title: Templates
page_title: jQuery ComboBox Documentation | Templates
description: "Get started with the jQuery ComboBox by Kendo UI and use the item, header, footer, and no-data templates to organize its data."
slug: templates_kendoui_combobox
position: 5
---

# Templates

The ComboBox provides full control over the way an item, the popup header and the popup footer are rendered by using the Kendo UI templates.

For more information on the capabilities and syntax of the templates, refer to this [documentation article]({% slug overview_kendoui_templatescomponent %}). For a runnable example, refer to the [demo on customizing the templates in the ComboBox](https://demos.telerik.com/kendo-ui/combobox/template).

## Item Templates

The item template manages the way the list items of a ComboBox are rendered.

The following example demonstrates how to define an item template.

    <input id="comboBox" />
    <!-- Template -->
    <script id="scriptTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#, CustomerID: #:data.CustomerID#
    </script>

    <!-- ComboBox initialization -->
    <script>
        $(document).ready(function() {
            $("#comboBox").kendoComboBox({
                template: $("#scriptTemplate").html(),
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
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

The header template manages the way the popup header of a ComboBox is rendered.

    <input id="comboBox" />
    <!-- Template -->
    <script id="headerTemplate" type="text/x-kendo-template">
        <strong>Header</strong>
    </script>

    <!-- ComboBox initialization -->
    <script>
        $(document).ready(function() {
            $("#comboBox").kendoComboBox({
                headerTemplate: $("#headerTemplate").html(),
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
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

The footer template manages the way the pop-up footer of a ComboBox is rendered. The footer is re-rendered on every change of the Data Source. The context of the template is the widget itself.

    <input id="comboBox" />
    <!-- Template -->
    <script id="footerTemplate" type="text/x-kendo-template">
        Total <strong>#: instance.dataSource.total() #</strong> items found
    </script>

    <!-- ComboBox initialization -->
    <script>
        $(document).ready(function() {
            $("#comboBox").kendoComboBox({
                footerTemplate: $("#footerTemplate").html(),
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
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

The ComboBox displays the `noDataTemplate` in the popup when the data source is empty.

> When the `noDataTemplate` option is defined, the ComboBox always opens the popup element.

    <input id="comboBox" />
    <!-- Template -->
    <script id="noDataTemplate" type="text/x-kendo-template">
        <strong>No Data!</strong>
    </script>

    <!-- ComboBox initialization -->
    <script>
        $(document).ready(function() {
            $("#comboBox").kendoComboBox({
                noDataTemplate: $("#noDataTemplate").html(),
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
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

* [Customizing Templates in the ComboBox (Demo)](https://demos.telerik.com/kendo-ui/combobox/template)
* [JavaScript API Reference of the ComboBox](/api/javascript/ui/combobox)
