---
title: Overview
page_title: Overview of jQuery UI multiselect | Kendo UI Documentation
description: Create MultiSelect UI widget, use Kendo UI templates, instructions how to use MultiSelect.
---

# MultiSelect Overview

The MultiSelect widget displays a list of options and allows multiple selection from this list.

The MultiSelect represents a richer version of the `SELECT` element, providing support for
local and remote data binding, item and tag templates, and configurable options for controlling the list behavior.


## Getting Started

There are two ways to create a MultiSelect from a `SELECT` element:

1.  Using its `<option>` tag to define a list of items.
2.  With databinding to remote data service.


The MultiSelect will look and operate consistently regardless of the initialization type.

### Creating a MultiSelect from an existing &lt;select&gt; element with defined data items

    <select id="multiselect">
        <option>Item 1</option>
        <option>Item 2</option>
        <option>Item 3</option>
    </select>
    
    <script>
        $('#multiselect').kendoMultiSelect();
    </script>

The MultiSelect should be initialized after the DOM is fully loaded. It is recommended
that initialization is done within $(document).ready() statement.

> Widget copies any styles and CSS classes from the input element to the wrapper element and visible input.

### Initialize a MultiSelect using a selector within $(document).ready()
    
    <select id="multiselect"></select>
    
    <script>
      $(document).ready(function(){
        $("#multiselect").kendoMultiSelect({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: [
            { text: "Item1", value: "1" },
            { text: "Item2", value: "2" }
          ]
        });
      });
    </script>

### Create a MultiSelect from existing `<select>` element with a pre-defined structure

    <select id="multiselect" multiple>
        <option>Item 1</option>
        <option>Item 2</option>
        <option>Item 3</option>
    </select>

    <script>
        $(document).ready(function(){
            $("#multiselect").kendoMultiSelect();
        });
    </script>

## Bind to Local or Remote Data

The MultiSelect can be bound to both local arrays and remote data via the
DataSource component; an abstraction for local and
remote data. Local arrays are appropriate for limited value options, while remote data binding is better for
larger data sets. With remote data-binding, items will be loaded on-demand; when they are displayed.
The DataSource component can be used to serve data from a variety of data services,
such as
[XML](http://en.wikipedia.org/wiki/XML),
[JSON](http://en.wikipedia.org/wiki/JSON), and
[JSONP](http://en.wikipedia.org/wiki/JSONP).

### Bind to a remote service

    <select id="multiselect" multiple></select>

    <script>
    $(document).ready(function() {
        $("#multiselect").kendoMultiSelect({
            dataTextField: "ProductName",
            dataValueField: "ProductID",
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

The MultiSelect uses Kendo UI templates to enable you to control how item, tag or header is rendered. For more
detailed description of the capabilities and syntax of the Kendo UI templates, please refer to the
[Kendo UI Templates documentation](/framework/templates/overview).

### Item template customization

#### Example - define an item template

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
                            url: "http://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

### Tag template customization

#### Example - define a tag template

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
                            url: "http://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

### Header template customization

The MultiSelect gives you the ability to render a pop-up header.

#### Example - define a header template

    <input id="multiselect" />
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
                            url: "http://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

## Customize the width of the drop-down list

jQuery width() method can be used for changing the widget dimension.

### Example
    <select id="multiselect"></select>
    
    <script>
        var multiselect = $("#multiselect").data("kendoMultiSelect");

        // set width of the drop-down list
        multiselect.list.width(400);
    </script>

## Pre-select values on initial loading

When autoBind option is set to false you will need to specify a list of data items instead of just list of strings.
This functionality is supported in Q1 SP1 2013 release and later versions of Kendo UI.
    
    <select id="multiselect"></select>
    <!-- MultiSelect initialization -->
    <script>
        $(document).ready(function() {
            $("#multiselect").kendoMultiSelect({
                autoBind: false,
                dataTextField: "Name",
                dataValueField: "Id",
                dataSource: {
                    type: "odata",
                    serverFiltering: true,
                    transport: {
                        read: {
                            url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
                        }
                    }
                },
                value: [
                    { ProductName: "Chang", ProductID: 2 },
                    { ProductName: "Uncle Bob's Organic Dried Pears", ProductID: 7 }
                ]
            });
        });
    </script>

## How to make the MultiSelect widget scrollable

By design, the MultiSelect expands vertically when adding more items that do not fit in the existing free space. Limited expansion and scrolling can be achieved with some CSS and JavaScript code. Check [this Kendo UI Dojo snippet](http://dojo.telerik.com/axeMa), which shows how its done.

## Support for label element

Because of its complex rendering, focusing the widget using a `LABEL` element requires additional implementation.
Check [this Kendo UI Dojo snippet](http://dojo.telerik.com/uSeho), which shows how its done.
