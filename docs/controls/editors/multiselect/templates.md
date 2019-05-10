---
title: Templates
page_title: jQuery MultiSelect Documentation | Templates | Kendo UI
description: "Get started with the jQuery MultiSelect by Kendo UI and learn how to customize its item, value, header, footer, and no-data templates."
slug: templates_multiselect
position: 7
---

# Templates

The MultiSelect provides full control over the rendering of items, selected values, and popup headers by using [Kendo UI templates]({% slug overview_kendoui_templatescomponent %}).

For a complete example, refer to the [demo on customizing the MultiSelect templates](https://demos.telerik.com/kendo-ui/multiselect/template).

The MultiSelect supports the following templates:

* [Item templates](#item-templates)
* [Tag templates](#tag-templates)
* [Header templates](#header-templates)
* [Footer templates](#footer-templates)
* [No-data templates](#no-data-templates)

## Item Templates

The item template manages the way the list items of a MultiSelect are rendered.

    <select id="multiselect" multiple></select>
    <!-- Item Template -->
    <script id="itemTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#, CustomerID: #:data.CustomerID#
    </script>

    <!-- MultiSelect initialization -->
    <script>
        $(document).ready(function() {
            $("#multiselect").kendoMultiSelect({
                itemTemplate: $("#itemTemplate").html(),
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

## Tag Templates

The tag template manages the way the tag of a MultiSelect is rendered.

    <select id="multiselect" multiple></select>
    <!-- Item Template -->
    <script id="tagTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#
    </script>

    <!-- MultiSelect initialization -->
    <script>
        $(document).ready(function() {
            $("#multiselect").kendoMultiSelect({
                tagTemplate: $("#tagTemplate").html(),
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

The header template manages the way the popup header of a MultiSelect is rendered.

    <select id="multiselect" />
    <!-- Template -->
    <script id="headerTemplate" type="text/x-kendo-template">
        <strong>Header</strong>
    </script>

    <!-- MultiSelect initialization -->
    <script>
        $(document).ready(function() {
            $("#multiselect").kendoMultiSelect({
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

The footer template manages the way the pop-up footer of a MultiSelect is rendered. The footer is re-rendered on every change of the Data Source. The context of the template is the widget itself.

    <select id="multiselect" />
    <!-- Template -->
    <script id="footerTemplate" type="text/x-kendo-template">
        Total <strong>#: instance.dataSource.total() #</strong> items found
    </script>

    <!-- MultiSelect initialization -->
    <script>
        $(document).ready(function() {
            $("#multiselect").kendoMultiSelect({
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

## No-Data Templates

The MultiSelect widget displays `noDataTemplate` in the popup when the data source is empty.

> When the `noDataTemplate` option is defined, the MultiSelect always opens the popup element.

    <select id="multiselect" />
    <!-- Template -->
    <script id="noDataTemplate" type="text/x-kendo-template">
        <strong>No Data!</strong>
    </script>

    <!-- MultiSelect initialization -->
    <script>
        $(document).ready(function() {
            $("#multiselect").kendoMultiSelect({
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

* [Customizing the Templates in the MultiSelect (Demo)](https://demos.telerik.com/kendo-ui/multiselect/template)
* [JavaScript API Reference of the MultiSelect](/api/javascript/ui/muultiselect)
