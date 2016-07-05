---
title: Overview
page_title: Overview | Kendo UI ComboBox
description: "Learn how to initialize the Kendo UI ComboBox widget, configure its options and customize templates."
slug: overview_kendoui_combobox_widget
position: 1
---

# ComboBox Overview

The [Kendo UI ComboBox widget](http://demos.telerik.com/kendo-ui/combobox/index) displays a list of values and allows for a single selection from that list. It enables the user to enter custom values through the keyboard. The ComboBox represents a richer version of the `<select>` element and provides support for local and remote data binding, item templates, and configurable options for controlling the list behavior.

To restrict the user input, use the [Kendo UI DropDownList widget](http://demos.telerik.com/kendo-ui/dropdownlist/index).

## Getting Started

### Initialize the ComboBox

The Kendo UI ComboBox widget can be initialized in three ways:

1. By using the `<option>` tag of an existing `<select>` element with defined data items.
2. By binding the widget to a local data array and using the `<input>` element.
3. By binding the widget to a remote data service and using the `<input>` element.

The ComboBox looks and operates consistently regardless of the initialization type you choose to apply.

> **Important**  
> * As a ComboBox must be initialized after the DOM is fully loaded, make sure you create it within a `$(document).ready()` statement.
> * The widget copies any styles and CSS classes from the input element to the wrapper element and visible input.

**Use the `<option>` tag of an existing `<select>` element**

The example below demonstrates how to initialize the ComboBox from an existing `<select>` element with defined data items.

###### Example

    <select id="comboBox">
        <option>Item 1</option>
        <option>Item 2</option>
        <option>Item 3</option>
    </select>

    <script>
        $(document).ready(function(){
            $("#comboBox").kendoComboBox();
        });
    </script>

**Bind to a local data array**

Bind the ComboBox to local data arrays through the [DataSource component]({% slug overview_kendoui_datasourcecomponent %})&mdash;an abstraction for local and remote data.

Local arrays are appropriate for limited value options.

The example below demonstrates how to initialize the ComboBox by binding it to local data arrays.

###### Example

    <input id="comboBox" />

    <script>
      $(document).ready(function(){
        $("#comboBox").kendoComboBox({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: [
            { text: "Item1", value: "1" },
            { text: "Item2", value: "2" }
          ]
        });
      });
    </script>

**Bind to a remote data service**

Bind the ComboBox to remote data arrays through the [DataSource component]({% slug overview_kendoui_datasourcecomponent %})&mdash;an abstraction for local and remote data.

Remote data binding is appropriate for larger data sets, so that items are loaded on demand when displayed. The DataSource can be used to serve data from a variety of data services, such as [XML](http://en.wikipedia.org/wiki/XML), [JSON](http://en.wikipedia.org/wiki/JSON), and [JSONP](http://en.wikipedia.org/wiki/JSONP).

The example below demonstrates how to initialize the ComboBox by binding it to a remote data service.

###### Example

    <input id="comboBox" />

    <script>
    $(document).ready(function() {
        $("#comboBox").kendoComboBox({
            index: 0,
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            filter: "contains",
            dataSource: {
                transport: {
                    read: {
                        dataType: "jsonp",
                        url: "http://demos.telerik.com/kendo-ui/service/Products"
                    }
                }
            }
        });
    });
    </script>

## Templates

The ComboBox uses [Kendo UI templates](/framework/templates/overview) to provide full control over the way pop-up items are rendered.

### Item Templates

The example below demonstrates how to define an item template.

###### Example

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
                            url: "http://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

### Header Templates

The ComboBox allows you to render a pop-up header. The example below demonstrates how to define a header template.

###### Example

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
                            url: "http://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

### Footer Templates

The ComboBox allows you to render a pop-up footer. The footer is re-rendered on every DataSource change. The context of the template is the widget itself.

The example below demonstrates how to define a footer template.

###### Example

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
                            url: "http://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

### No-Data Templates

The ComboBox widget displays `noDataTemplate` in the popup when the data source is empty.

The example below demonstrates how to define a `noDataTemplate` template.

> **Important**
>
> When the `noDataTemplate` option is defined, the widget will always open the popup element.

###### Example

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
                            url: "http://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

## Configuration

### Drop-Down List

To customize the width of a drop-down list and change its dimensions, use the jQuery `width()` method.

###### Example

     <input id="comboBox" />

    <script>
        var combobox = $("#combobox").data("kendoComboBox");

        // set width of the drop-down list
        combobox.list.width(400);
    </script>

### Support for label Elements

Because of its complex rendering, the focusing of the widget by using a `label` element requires additional implementation. For more information on how to do it, refer to [this Kendo UI Dojo snippet](http://dojo.telerik.com/uSeho).

### Input Removal

The ComboBox enables you to remove the values from the input area of the widget through the `clearButton` configuration option. By default, it is enabled and set to `true`. As a result, a **x** button appears in the input area on hover. When clicked, it resets the value of the widget and triggers the `change` event.

## Reference

### Existing Instances

You can refer an existing ComboBox widget via [jQuery.data()](http://api.jquery.com/jQuery.data/):

    <input id="comboBox" />

    <script>
        var comboBox = $("#comboBox").data("kendoComboBox");
    </script>

## See Also

Other articles on the Kendo UI ComboBox:

* [Grouping Functionality]({% slug grouping_kendoui_combobox_widget %})
* [Virtualization]({% slug virtualization_kendoui_combobox_widget %})
* [Cascading ComboBoxes]({% slug cascading_kendoui_combobox_widget %})
* [Server Filtering]({% slug server_filtering_kendoui_combobox_widget %})
* [Troubleshooting]({% slug troubleshooting_common_issues_combobox_kendoui %})
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Expand Background of Long List Items]({% slug howto_expand_background_longlist_items_combobox %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the ComboBox Widget](/aspnet-mvc/helpers/combobox/overview)
* [Overview of the ComboBox JSP Tag]({% slug overview_combobox_uiforjsp %})
* [Overview of the ComboBox PHP Class](/php/widgets/combobox/overview)
* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)

Articles on the Kendo UI DropDownList:

* [Overview of the DropDown Widget]({% slug overview_kendoui_dropdownlist_widget %})
* [Cascading DropDownLists]({% slug cascading_kendoui_dropdownlist_widget %})
* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)

Articles on the Kendo UI MultiSelect:

* [Overview of the MultiSelect Widget]({% slug overview_kendoui_multiselect_widget %})
* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)

Articles on the Kendo UI AutoComplete:

* [Overview of the AutoComplete Widget]({% slug overview_kendoui_autocomplete_widget %})
* [AutoComplete JavaScript API Reference](/api/javascript/ui/autocomplete)
