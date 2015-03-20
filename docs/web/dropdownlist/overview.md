---
title: Overview
page_title: Overview of DropDownList widget - primary uses
description: Quickly explore all features of Kendo UI DropDown control and how to use them.
position: 1
---

# DropDownList Overview

The Kendo UI DropDownList widget displays a list of values and allows a single selection from the
list. User input is restricted. If keyboard input is needed, then you should use the Kendo UI ComboBox component.


## Getting Started

There are two ways to create a DropDownList

1.  From a &lt;select&gt; element with HTML to define the list items
2.  From an &lt;input&gt; element with databinding to define the list items



The DropDownList will look and operate consistently regardless of the initialization type.

### Create a DropDownList from existing &lt;input&gt; element

The DropDownList should be initialized after the DOM is fully loaded. It is recommended
that initialization is done within $(document).ready() statement.

> Widget copies any styles and CSS classes from the input element to the wrapper element.

### Initialize a DropDownList using a jQuery selector

    <input id="dropdownlist">

    <script>
      $(document).ready(function() {
        $("#dropdownlist").kendoDropDownList({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: [
            { text: "Item1", value: "1" },
            { text: "Item2", value: "2" }
          ]
        });
      });
    </script>

### Create a DropDownList from existing &lt;select&gt; element with a pre-defined structure

    <select id="dropdownlist">
        <option>Item 1</option>
        <option>Item 2</option>
        <option>Item 3</option>
    </select>

    <script>
        $(document).ready(function(){
            $("#dropdownlist").kendoDropDownList();
        });
    </script>

## Binding to Local or Remote Data

The DropDownList can be bound to both local array and remote data service via the
DataSource component; an abstraction for local and
remote data. Local arrays are appropriate for limited value options, while remote data binding is better for
larger data sets. With remote data-binding, items will be loaded on-demand; when they are displayed.
The DataSource component can be used to serve data from a variety of data services,
such as
[XML](http://en.wikipedia.org/wiki/XML),
[JSON](http://en.wikipedia.org/wiki/JSON), and
[JSONP](http://en.wikipedia.org/wiki/JSONP).

### Binding to a remote OData service

    <input id="dropdownlist">

    <script>
        $(document).ready(function() {
            $("#dropdownlist").kendoDropDownList({
                index: 0,
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                dataSource: {
                    type: "odata", // specifies data protocol
                    transport: {
                        read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                    }
                }
            });
        });
    </script>

## Customize Templates

The DropDownList uses Kendo UI templates to enable control over how item, popup header and selected value is rendered. For a
detailed description of the capabilities and syntax of the Kendo UI templates, please refer to the
[Kendo UI Templates documentation](/framework/templates/overview).

### Item template customization

#### Example - define an item template

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
                            url: "http://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

### Value template customization

> Note that value template should be consisted only of inline HTML elements.

#### Example - define a value template

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
                            url: "http://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

### Header template customization

The DropDownList provides the ability to render a popup header.

#### Example - define a header template

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
                            url: "http://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

## Customize the width of the DropDownList

jQuery width() method can be used for changing the widget dimensions.

### Example

    <input id="dropDownList">
    <script>
      $(document).ready(function() {
        $("#dropDownList").kendoDropDownList();
        var dropdownlist = $("#dropDownList").data("kendoDropDownList");
        dropdownlist.list.width(400);
      });
    </script>

### Set the list dimensions (MVVM)

```html
  <input id="ddl" data-role="dropdownlist" data-bind="source: foo" />

  <script>
    var vm = {
      foo: [ "one", "two" ]
    }

    kendo.bind(document.body, vm);
    $("#ddl").data("kendoDropDownList").list.width(400);
  </script>
```
