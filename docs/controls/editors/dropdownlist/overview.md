---
title: Overview
page_title: Overview | Kendo UI DropDownList
description: "Learn how to initialize the Kendo UI DropDownList widget, configure its options and customize templates."
slug: overview_kendoui_dropdownlist_widget
position: 1
---

# DropDownList Overview

The [Kendo UI DropDownList widget](http://demos.telerik.com/kendo-ui/dropdownlist/index) displays a list of values and allows for a single selection from the list. The user input is restricted within the predefined options. Use the Kendo UI ComboBox control if you want to apply a keyboard input.

## Getting Started

### Initialize the DropDownList

The Kendo UI DropDownList widget can be initialized in three ways:

1. By using the `<option>` tag of an existing `<select>` element with defined data items.
2. By binding the widget to a local data array and using the `<input>` or `<select>` element.
3. By binding the widget to a remote data service and using the `<input>` or `<select>` element.

The DropDownList looks and operates consistently regardless of the initialization type you choose to apply.

> **Important**
> * As DropDownList should be initialized after the DOM is fully loaded, make sure you create it within a `$(document).ready()` statement.
> * The widget copies any styles and CSS classes from the input element to the wrapper element and visible input.

#### From Existing select Element

The example below demonstrates how to initialize the DropDownList from an existing `<select>` element with defined data items.

###### Example

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

#### By Binding to Local Array

The DropDownList can be bound to local data arrays via the [DataSource component](/framework/datasource/overview) - an abstraction for local and remote data. Local arrays are appropriate for limited value options.

The example below demonstrates how to initialize the DropDownList by binding it to a local data array.

###### Example

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

#### By Binding to Remote Service

The DropDownList can be bound to remote data arrays via the [DataSource component](/framework/datasource/overview) - an abstraction for local and remote data. Remote data binding is appropriate for larger data sets, so that items are loaded on-demand, when displayed. The DataSource can be used to serve data from a variety of data services, such as [XML](http://en.wikipedia.org/wiki/XML), [JSON](http://en.wikipedia.org/wiki/JSON), and [JSONP](http://en.wikipedia.org/wiki/JSONP).

The example below demonstrates how to initialize the DropDownList by binding it to a remote data service.

###### Example

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

The DropDownList uses [Kendo UI templates](/framework/templates/overview) to provide full control over the way an item, a selected value, or a pop-up header is rendered.

### Item Templates

The example below demonstrates how to define an item template.

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
                            url: "http://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

### Value Templates

The example below demonstrates how to define a value template.

> **Important**
>
> Note that value templates should consist of inline HTML elements only.

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
                            url: "http://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

### Header Templates

The DropDownList allows you to render a pop-up header. The example below demonstrates how to define a header template.

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
                            url: "http://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

## Configuration

### Drop-Down List

You can customize the width of a drop-down list and change its dimensions by using the jQuery `width()` method.

###### Example

    <input id="dropDownList">
    <script>
      $(document).ready(function() {
        $("#dropDownList").kendoDropDownList();
        var dropdownlist = $("#dropDownList").data("kendoDropDownList");
        dropdownlist.list.width(400);
      });
    </script>

The example below demonstrates how to set the list dimensions through MVVM binding.

###### Example

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

### Support for Elements: label

Because of its complex rendering, focusing the widget by using a `label` element requires additional implementation. For more information about how to do it, check [this Kendo UI Dojo snippet](http://dojo.telerik.com/uSeho).

## See Also

Other articles on Kendo UI DropDownList:

* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)
* [Grouping Functionality]({% slug grouping_kendoui_combobox_widget %})
* [Virtualization]({% slug virtualization_kendoui_combobox_widget %})
* [Cascading DropDownLists]({% slug cascading_kendoui_dropdownlist_widget %})
* [Troubleshooting]({% slug troubleshooting_common_issues_dropdownlist_kendoui %})
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
* [Overview of the ASP.NET MVC HtmlHelper Extension fro the DropDownList Widget](/aspnet-mvc/helpers/dropdownlist/overview)
* [Overview of the DropDownList JSP Tag]({% slug overview_dropdownlist_uiforjsp %})
* [Overview of the DropDownList PHP Class](/php/widgets/dropdownlist/overview)

Articles on Kendo UI ComboBox:

* [Overview of the ComboBox Widget]({% slug overview_kendoui_combobox_widget %})
* [Grouping Functionality]({% slug grouping_kendoui_combobox_widget %})
* [Virtualization]({% slug virtualization_kendoui_combobox_widget %})
* [Cascading ComboBoxes]({% slug cascading_kendoui_combobox_widget %})
* [Server Filtering]({% slug server_filtering_kendoui_combobox_widget %})
* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)

Articles on Kendo UI MultiSelect:

* [Overview of the MultiSelect Widget]({% slug overview_kendoui_multiselect_widget %})
* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
