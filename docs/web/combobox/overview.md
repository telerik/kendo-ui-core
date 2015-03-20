---
title: Overview
page_title: Overview of jQuery UI combobox | Kendo UI Documentation
description: Create ComboBox UI widget, use Kendo UI templates, instructions how to use ComboBox.
position: 1
---

# ComboBox Overview

The ComboBox is a widget that displays a list of values and allows single selection from the list. Custom values may also be entered via keyboard input. If you want to restrict the user input then you can use the Kendo UI DropDownList widget.

The ComboBox represents a richer version of a `<select>` element, providing support for
local and remote data binding, item templates, and configurable options for controlling the list behavior.


## Getting Started

There are two ways to create a ComboBox:

1.  From a `<select>` element with HTML to define the list items
2.  From an `<input>` element with databinding to define the listitems

The ComboBox will look and operate consistently regardless of the initialization type.

### Creating a ComboBox from an existing &lt;input&gt; element

The ComboBox should be initialized after the DOM is fully loaded. It is recommended
that initialization is done within $(document).ready() statement.

> Widget copies any styles and CSS classes from the input element to the visible input and the wrapper element.

### Initialize a ComboBox using a jQuery selector
    
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

### Initialize a ComboBox from existing `<select>` element with a pre-defined structure

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

## Binding to Local or Remote Data

The ComboBox can be bound to both local arrays and remote data service via the
DataSource component; an abstraction for local and
remote data. Local arrays are appropriate for limited value options, while remote data binding is better for
larger data sets. With remote data-binding, items will be loaded on-demand; when they are displayed.
The DataSource component can be used to serve data from a variety of data services,
such as
[XML](http://en.wikipedia.org/wiki/XML),
[JSON](http://en.wikipedia.org/wiki/JSON), and
[JSONP](http://en.wikipedia.org/wiki/JSONP).


### Binding to a remote service
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

## Customizing Templates

The ComboBox uses Kendo UI templates to enable control over how item and popup header is rendered. For a
detailed description of the capabilities and syntax of the Kendo UI templates, please refer to the
[Kendo UI Templates documentation](/framework/templates/overview).

### Item template customization

The ComboBox uses Kendo UI templates to control how pop-up items are rendered.

#### Example - using an item template

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

### Header template customization

The ComboBox gives the ability to render a pop-up header.

#### Example - define a header template

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
    

## Accessing an existing ComboBox instance

You can reference an existing ComboBox widget via
[jQuery.data()](http://api.jquery.com/jQuery.data/).
    
    <input id="comboBox" />

    <script>
        var comboBox = $("#comboBox").data("kendoComboBox");
    </script>

## Customizing the width of the drop-down list

jQuery width() method can be used for changing the widget dimensions.

### Example
    
     <input id="comboBox" />

    <script>
        var combobox = $("#combobox").data("kendoComboBox");

        // set width of the drop-down list
        combobox.list.width(400);
    </script>

## Support for label element

Because of its complex rendering, focusing the widget using a `LABEL` element requires additional implementation.
Check [this Kendo UI Dojo snippet](http://dojo.telerik.com/uSeho), which shows how its done.

