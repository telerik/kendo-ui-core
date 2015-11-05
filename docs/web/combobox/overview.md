---
title: Overview
page_title: Overview | Kendo UI ComboBox Widget
description: "Learn how to initialize the Kendo UI ComboBox widget, configure its options and customize templates."
slug: overview_kendoui_combobox_widget
position: 1
---

# ComboBox Overview

[Kendo UI ComboBox widget](http://demos.telerik.com/kendo-ui/combobox/index) displays a list of values and allows single selection from that list. You are able to enter custom values by using a keyboard input. If you want to restrict the user input, you can use [Kendo UI DropDownList widget](http://demos.telerik.com/kendo-ui/dropdownlist/index). The ComboBox represents a richer version of the `<select>` element and provides support for local and remote data binding, item templates, and configurable options for controlling the list behavior.

## Getting Started

### Initialize the ComboBox 

There are two ways to create a ComboBox:

1.  From a `<select>` element with HTML to define the list items
2.  From an `<input>` element with databinding to define the list items

The ComboBox looks and operates consistently regardless of the initialization type you choose to apply.

#### Use an `<input>` Element

Initialize the ComboBox from an exisiting `<input>` element only after the DOM is fully loaded. It is recommended that initialization is done within the `$(document).ready()` statement.

> **Important**  
> The widget copies any styles and CSS classes from the input element to the visible input and the wrapper element.

#### Use a `<select>` Element

Initialize the ComboBox from an existing `<select>` element with a pre-defined structure:

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
    
#### Use a jQuery Selector

Initialize the ComboBox by using a jQuery selector:

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

## Bind to Local or Remote Data

The ComboBox can be bound to both local arrays and remote data service via the `DataSource` component<&mdash;>-</&mdash;>an abstraction for local and remote data. Local arrays are appropriate for limited value options, while remote data binding is better for larger data sets. With remote data-binding, items will be loaded on-demand, when they are displayed. The `DataSource` component can be used to serve data from a variety of data services, such as [XML](http://en.wikipedia.org/wiki/XML), [JSON](http://en.wikipedia.org/wiki/JSON), and [JSONP](http://en.wikipedia.org/wiki/JSONP).

###### Example - bind to a remote service

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

## Customize Templates

The ComboBox uses Kendo UI templates to enable control over how the item and popup header is rendered. For a detailed description of the capabilities and syntax of the Kendo UI templates, please refer to the [Kendo UI template documentation](/framework/templates/overview).

### Item Templates

The ComboBox uses Kendo UI templates to control how pop-up items are rendered.

###### Example - use an item template

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

The ComboBox allows you to render a pop-up header.

###### Example - define a header template

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


## Access the ComboBox Instance

You can refer an existing ComboBox widget via [jQuery.data()](http://api.jquery.com/jQuery.data/):

    <input id="comboBox" />

    <script>
        var comboBox = $("#comboBox").data("kendoComboBox");
    </script>

## Customize the Drop-Down List

You can customize the width of a drop-down list and change its dimensions by using the jQuery `width()` method.

###### Example

     <input id="comboBox" />

    <script>
        var combobox = $("#combobox").data("kendoComboBox");

        // set width of the drop-down list
        combobox.list.width(400);
    </script>

## `label` Element Support

Because of its complex rendering, focusing the widget by using a `label` element requires additional implementation. For more information about how to do it, check [this Kendo UI Dojo snippet](http://dojo.telerik.com/uSeho).

## See Also

Other articles on Kendo UI ComboBox:

* [Grouping Functionality]({% slug grouping_kendoui_combobox_widget %})
* [Virtualization]({% slug virtualization_kendoui_combobox_widget %})
* [Cascading ComboBoxes]({% slug cascading_kendoui_combobox_widget %})
* [Server Filtering]({% slug server_filtering_kendoui_combobox_widget %})
* [How to Add Option Label Manually]({% slug howto_add_option_label_manually_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Declaratively Initialize ComboBox with Templates]({% slug howto_declaratively_initialize_with_templates_combobox %})
* [How to Clear Filter on Open]({% slug howto_clear_filter_open_combobox %})
* [How to Detect When All Widgets Are Bound]({% slug howto_detect_when_widgets_bound_combobox %})
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Disable Child Cascading ComboBoxes]({% slug howto_disable_child_cascading_combobox %})
* [How to Expand Background of Long List Items]({% slug howto_expand_background_longlist_items_combobox %})
* [Overview of the ASP.NET MVC HtmlHelper Extension](/aspnet-mvc/helpers/combobox/overview)
* [Overview of the JSP Tag](/jsp/tags/combobox/overview)
* [Overview of the PHP Class](/php/widgets/combobox/overview) 
* [JavaScript API Reference](/api/javascript/ui/combobox)

Articles on Kendo UI DropDownList:

* [Overview]({% slug overview_kendoui_dropdownlist_widget %})
* [Cascading DropDownLists]({% slug cascading_kendoui_combobox_widget %})
* [JavaScript API Reference](/api/javascript/ui/dropdownlist)