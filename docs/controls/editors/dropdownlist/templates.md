---
title: Templates
page_title: jQuery DropDownList Documentation | Templates | Kendo UI
description: "Get started with the jQuery DropDownList by Kendo UI and learn how to customize its item, value, header, footer, and no-data templates."
slug: templates_dropdownlist_widget
position: 6
---

# Templates

The DropDownList provides full control over the rendering of items, selected values, and popup headers by using [Kendo UI templates]({% slug overview_kendoui_templatescomponent %}).

For a complete example, refer to the [demo on customizing the DropDownList templates](https://demos.telerik.com/kendo-ui/dropdownlist/template).

The DropDownList supports the following templates:

* [Item templates](#item-templates)
* [Value templates](#value-templates)
* [Header templates](#header-templates)
* [Footer templates](#footer-templates)
* [No-data templates](#no-data-templates)

## Item Templates

The item template manages the way the list items of a DropDownList are rendered.

###### Example

    <input id="dropdownlist" />
    <!-- Template -->
    <script id="scriptTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#, CustomerID: #:data.CustomerID#
    </script>

    <!-- DropDownList initialization -->
    <script>
        $(document).ready(function() {
            $("#dropdownlist").kendoDropDownList({
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

## Value Templates

The value template manages the way the selected value of a DropDownList is rendered.

> Value templates must consist of inline HTML elements only.

###### Example

    <input id="dropdownlist" />
    <!-- Template -->
    <script id="valueTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#
    </script>

    <!-- DropDownList initialization -->
    <script>
        $(document).ready(function() {
            $("#dropdownlist").kendoDropDownList({
                valueTemplate: $("#valueTemplate").html(),
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

The header template manages the way the popup header of a DropDownList is rendered.

###### Example

    <input id="dropdownlist" />
    <!-- Template -->
    <script id="headerTemplate" type="text/x-kendo-template">
        <strong>Header</strong>
    </script>

    <!-- DropDownList initialization -->
    <script>
        $(document).ready(function() {
            $("#dropdownlist").kendoDropDownList({
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

The footer template manages the way the popup footer of a DropDownList is rendered. The footer is re-rendered on every change of the Data Source. The context of the template is the widget itself.

###### Example

    <input id="dropdownlist" />
    <!-- Template -->
    <script id="footerTemplate" type="text/x-kendo-template">
        Total <strong>#: instance.dataSource.total() #</strong> items found
    </script>

    <!-- DropDownList initialization -->
    <script>
        $(document).ready(function() {
            $("#dropdownlist").kendoDropDownList({
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

The DropDownList widget displays `noDataTemplate` in the popup when the data source is empty.

> When the `noDataTemplate` option is defined, the DropDownList always opens the popup element.

###### Example

    <input id="dropDownList" />
    <!-- Template -->
    <script id="noDataTemplate" type="text/x-kendo-template">
        <strong>No Data!</strong>
    </script>

    <!-- DropDownList initialization -->
    <script>
        $(document).ready(function() {
            $("#dropDownList").kendoDropDownList({
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

* [Customizing the Templates in the DropDownList (Demo)](https://demos.telerik.com/kendo-ui/dropdownlist/template)
* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
