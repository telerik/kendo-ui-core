---
title: Overview
page_title: Overview | Kendo UI DropDownList Widget
description: "Learn how to initialize the Kendo UI DropDownList widget, configure its options and customize templates."
slug: overview_kendoui_dropdownlist_widget
position: 1
---

# DropDownList Overview

[Kendo UI DropDownList widget](http://demos.telerik.com/kendo-ui/dropdownlist/index) displays a list of values and allows for a single selection from the list. The user input is restricted within the predefined options. Use the Kendo UI ComboBox control if you want to apply a keyboard input.

## Getting Started

### Initialize the DropDownList 

There are two ways to create a DropDownList:

1.  From a `<select>` element with HTML to define the list items
2.  From an `<input>` element with databinding to define the list items

The DropDownList looks and operates consistently regardless of the initialization type you choose to apply.

#### Use an `<input>` Element

Initialize the DropDownList from an exisiting `<input>` element only after the DOM is fully loaded. It is recommended that initialization is done within the `$(document).ready()` statement.

> **Important**  
> The widget copies any styles and CSS classes from the input element to the visible input and the wrapper element.

#### Use a `<select>` Element

Initialize the DropDownList from an existing `<select>` element with a pre-defined structure:

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


### Use a jQuery Selector

Initialize the DropDownList by using a jQuery selector:

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

## Data Binding

The DropDownList can be bound to both local arrays and remote data service via the `DataSource` component<&mdash;>-</&mdash;>an abstraction for local and remote data. Local arrays are appropriate for limited value options, while remote data binding is better for larger data sets. With remote data-binding, items will be loaded on-demand; when they are displayed. The DataSource component can be used to serve data from a variety of data services, such as [XML](http://en.wikipedia.org/wiki/XML), [JSON](http://en.wikipedia.org/wiki/JSON), and [JSONP](http://en.wikipedia.org/wiki/JSONP).

###### Example - bind to a remote OData service

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

## Templates

The DropDownList uses Kendo UI templates to enable control over how item, popup header and selected value is rendered. For a detailed description of the capabilities and syntax of the Kendo UI templates, please refer to the [Kendo UI Templates documentation](/framework/templates/overview).

### Item Templates

###### Example - use an item template

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

### Value Templates

> **Important** 
> Note that value template should be consisted only of inline HTML elements.

###### Example - define a value template

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

### Header Templates

The DropDownList allows you to render a pop-up header.

###### Example - define a header template

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

## Cusomization

You can customize the width of a the DropDownList and change its dimensions by using the jQuery `width()` method.

###### Example

    <input id="dropDownList">
    <script>
      $(document).ready(function() {
        $("#dropDownList").kendoDropDownList();
        var dropdownlist = $("#dropDownList").data("kendoDropDownList");
        dropdownlist.list.width(400);
      });
    </script>

###### Example - set the list dimensions (MVVM)

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

## See Also

Other articles on Kendo UI DropDownList:

* [JavaScript API Reference](/api/javascript/ui/dropdownlist)
* [Grouping Functionality]({% slug grouping_kendoui_combobox_widget %})
* [Virtualization]({% slug virtualization_kendoui_combobox_widget %})
* [Cascading DropDownLists]({% slug cascading_kendoui_combobox_widget %})
* [How to Cascade DropDownLists Using `ng-repeat`]({% slug howto_cascade_withngrepeat_distinct_values_dropdownlist %})
* [How to Validate DropDownLists by Using Required Attributes]({% slug howto_validate_using_required_attributes_dropdownlist %})
* [How to Cascade from Multiple Parents]({% slug howto_cascade_multiple_parents_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Detect Input Change Events]({% slug howto_detect_input_change_events_dropdownlist %})
* [How to Detect Wrapper Blur Events]({% slug howto_detect_wrapper_blur_events_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Preselect Items]({% slug howto_preselect_items_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
* [Overview of the ASP.NET MVC HtmlHelper Extension](/aspnet-mvc/helpers/dropdownlist/overview)
* [Overview of the JSP Tag](/jsp/tags/dropdownlist/overview)
* [Overview of the PHP Class](/php/widgets/dropdownlist/overview)

Articles on Kendo UI ComboBox:

* [Overview]({% slug overview_kendoui_combobox_widget %})
* [Cascading ComboBoxes]({% slug cascading_kendoui_combobox_widget %})
* [Server Filtering]({% slug server_filtering_kendoui_combobox_widget %})
* [JavaScript API Reference](/api/javascript/ui/combobox)
