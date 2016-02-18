---
title: Overview
page_title: Overview | Kendo UI MultiSelect
description: "Learn how to initialize the Kendo UI MultiSelect widget, use templates and customize it functionalities."
slug: overview_kendoui_multiselect_widget
position: 1
---

# MultiSelect Overview

The [Kendo UI MultiSelect widget](http://demos.telerik.com/kendo-ui/multiselect/index) displays a list of options and allows multiple selections from this list. The widget represents a richer version of the `<select>` element, providing support for local and remote data binding, item and tag templates, and configurable options for controlling the list behavior.

## Getting Started

### Initialize the MultiSelect

The Kendo UI MultiSelect widget can be initialized in three ways:

1. By using the `<option>` tag of an existing `<select>` element with defined data items.
2. By binding the widget to a local data array and using the `<select>` element.
3. By binding the widget to a remote data service and using the `<select>` element.

The MultiSelect looks and operates consistently regardless of the initialization type you choose to apply.

> **Important**  
> * As MultiSelect should be initialized after the DOM is fully loaded, make sure you create it within a `$(document).ready()` statement.
> * The widget copies any styles and CSS classes from the input element to the wrapper element and visible input.

#### From Existing <slect> Element with Defined Data Items

The example below demonstrates how to initialize the MultiSelect from an existing `<select>` element with defined data items.

###### Example

    <select id="multiselect">
        <option>Item 1</option>
        <option>Item 2</option>
        <option>Item 3</option>
    </select>

    <script>
        $(document).ready(function(){
            $("#multiselect").kendoMultiSelect();
        });
    </script>

#### By Binding to Local Data

The MultiSelect can be bound to local data arrays via the [DataSource component](/framework/datasource/overview) - an abstraction for local and remote data. Local arrays are appropriate for limited value options.

The example below demonstrates how to initialize the MultiSelect by binding it to local data arrays.

###### Example

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

#### By Binding to Remote Service

The MultiSelect can be bound to remote data arrays via the [DataSource component](/framework/datasource/overview) - an abstraction for local and remote data. Remote data binding is appropriate for larger data sets, so that items are loaded on-demand, when displayed. The DataSource can be used to serve data from a variety of data services, such as [XML](http://en.wikipedia.org/wiki/XML), [JSON](http://en.wikipedia.org/wiki/JSON), and [JSONP](http://en.wikipedia.org/wiki/JSONP).

The example below demonstrates how to initialize the MultiSelect by binding it to a remote data service.

###### Example

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

## Templates

The MultiSelect uses [Kendo UI templates](/framework/templates/overview) to provide full control over the way an item, a tag, or a header is rendered.

### Item Templates

The example below demonstrates how to define an item template.

###### Example

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

### Tag Templates

The example below demonstrates how to define a tag template.

###### Example

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

### Header Templates

The MultiSelect allows you to render a pop-up header. The example below demonstrates how to define a header template.

###### Example

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

    <select id="multiselect"></select>

    <script>
        var multiselect = $("#multiselect").data("kendoMultiSelect");

        // set width of the drop-down list
        multiselect.list.width(400);
    </script>

### Pre-Selected Values

When the `autoBind` option is set to `false` you need to specify a list of data items instead of just list of strings. This functionality is supported in 2013 Q1 SP1 release and later versions of Kendo UI.

The example below demonstrates how to pre-select values on initial loading.

###### Example

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

### Scrollable Content

By design, when adding items that do not fit in the existing free space, the MultiSelect expands vertically. Limited expansion and scrolling can be achieved with the help of some CSS and JavaScript code. [The example in the Dojo](http://dojo.telerik.com/axeMa) demonstrates how to do this.

### Support for label Element

Because of its complex rendering, focusing the widget by using a label element requires additional implementation. For more information about how to do it, check this [Kendo UI Dojo snippet](http://dojo.telerik.com/uSeho).

## See Also

Other articles on Kendo UI MultiSelect:

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [Grouping Functionality]({% slug grouping_kendoui_multiselect_widget %})
* [Virtualization]({% slug virtualization_kendoui_multiselect_widget %})
* [Troubleshooting]({% slug troubleshooting_common_issues_multiselect_kendoui %})
* [How to Bind Values to Template]({% slug howto_bind_values_totemplate_multiselect %})
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Create Cascading MultiSelects]({% slug howto_create_cascading_widgets_multiselect %})
* [How to Create Checkbox Custom Item Template]({% slug howto_checkbox_custom_item_template_multiselect %})
* [How to Create Scrollable Data Items]({% slug howto_create_scrollable_data_items_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Preselect Items on Load in AngularJS]({% slug howto_preselect_itemson_load_angular_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Reorder Selected Items]({% slug howto_reorder_selected_items_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Select or Deselect All Items]({% slug howto_select_and_deselect_allitems_multiselect %})
* [How to Select the First Item on TAB]({% slug howto_select_thefirst_itemon_tab_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the MultiSelect Widget](/aspnet-mvc/helpers/multiselect/overview)
* [Overview of the MultiSelect JSP Tag]({% slug overview_multiselect_uiforjsp %})
* [Overview of the MultiSelect PHP Class](/php/widgets/multiselect/overview)

Articles on Kendo UI ComboBox:

* [Overview of the ComboBox Widget]({% slug overview_kendoui_combobox_widget %})
* [Grouping Functionality]({% slug grouping_kendoui_combobox_widget %})
* [Virtualization]({% slug virtualization_kendoui_combobox_widget %})
* [Cascading ComboBoxes]({% slug cascading_kendoui_combobox_widget %})
* [Server Filtering]({% slug server_filtering_kendoui_combobox_widget %})
* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)

Articles on Kendo UI DropDownList:

* [Overview of the DropDownList Widget]({% slug overview_kendoui_dropdownlist_widget %})
* [Cascading DropDownLists]({% slug cascading_kendoui_dropdownlist_widget %})
* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)
