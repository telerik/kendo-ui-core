---
title: Templates
page_title: jQuery MultiColumnComboBox Documentation | Templates
description: "Get started with the jQuery MultiColumnComboBox by Kendo UI and implement its column, header, footer, and no-data templates."
slug: templates_kendoui_multicolumncombobox
position: 7
---

# Templates

The MultiColumnComboBox uses [Kendo UI templates](/framework/templates/overview) to provide full control over the way pop-up items are rendered.

For more information on the capabilities and syntax of the templates, refer to this [documentation article]({% slug overview_kendoui_templatescomponent %}). For a runnable example, refer to the [demo on customizing the templates in the MultiColumnComboBox](https://demos.telerik.com/kendo-ui/multicolumncombobox/template).

## Column Templates

You can define [column templates](/api/javascript/ui/multicolumncombobox/configuration/columns.template) and [header column templates](/api/javascript/ui/multicolumncombobox/configuration/columns.headertemplate) to customize the layout of your project.

    <input id="multicolumncombobox" />
    <script>
        $("#multicolumncombobox").kendoMultiColumnComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Apples", value: "1" },
                { text: "Oranges", value: "2" }
            ],
            columns: [
                { field: "text", template: "Cell Text: #:text#", headerTemplate: "<strong>Text</strong>"},
                { field: "value", template: "Cell Value: <strong>#:value#</strong>", headerTemplate: "<strong>Value</strong>"}
            ]
        });
    </script>

## Header Templates

The header template manages the way the popup header of a MultiColumnComboBox is rendered.

    <input id="comboBox" />
    <!-- Template -->
    <script id="headerTemplate" type="text/x-kendo-template">
        <strong>Header</strong>
    </script>

    <!-- MultiColumnComboBox initialization -->
    <script>
        $(document).ready(function() {
            $("#comboBox").kendoMultiColumnComboBox({
                headerTemplate: $("#headerTemplate").html(),
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                columns: [
                    { field: "ProductName", title: "ProductName" },
                    { field: "ProductID", title: "ProductID" }
                ],
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

The footer template manages the way the popup footer of a MultiColumnComboBox is rendered. The footer is re-rendered on every change of the Data Source. The context of the template is the widget itself.

    <input id="comboBox" />
    <!-- Template -->
    <script id="footerTemplate" type="text/x-kendo-template">
        Total <strong>#: instance.dataSource.total() #</strong> items found
    </script>

    <!-- MultiColumnComboBox initialization -->
    <script>
        $(document).ready(function() {
            $("#comboBox").kendoMultiColumnComboBox({
                footerTemplate: $("#footerTemplate").html(),
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                columns: [
                    { field: "ProductName", title: "ProductName" },
                    { field: "ProductID", title: "ProductID" }
                ],
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

The MultiColumnComboBox widget displays `noDataTemplate` in the popup when the data source is empty.

> When the `noDataTemplate` option is defined, the widget always opens the popup element.

    <input id="comboBox" />
    <!-- Template -->
    <script id="noDataTemplate" type="text/x-kendo-template">
        <strong>No Data!</strong>
    </script>

    <!-- MultiColumnComboBox initialization -->
    <script>
        $(document).ready(function() {
            $("#comboBox").kendoMultiColumnComboBox({
                noDataTemplate: $("#noDataTemplate").html(),
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                filter: "contains",
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

* [Using Templates in the MultiColumnComboBox (Demo)](https://demos.telerik.com/kendo-ui/multicolumncombobox/template)
* [JavaScript API Reference of the MultiColumnComboBox](/api/javascript/ui/multicolumncombobox)
