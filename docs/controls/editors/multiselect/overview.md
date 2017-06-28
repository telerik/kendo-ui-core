---
title: Overview
page_title: Overview | Kendo UI MultiSelect
description: "Learn how to initialize the Kendo UI MultiSelect widget, use templates and customize it functionalities."
slug: overview_kendoui_multiselect_widget
position: 1
---

# MultiSelect Overview

The [Kendo UI MultiSelect widget](http://demos.telerik.com/kendo-ui/multiselect/index) displays a list of options and allows multiple selections from this list.

The widget represents a richer version of the `<select>` element and provides support for local and remote data binding, item and tag templates, and configurable options for controlling the list behavior.

## Getting Started

### Initialize the MultiSelect

You can initialize the Kendo UI MultiSelect widget in any of the following ways:

1. By using the `<option>` tag of an existing `<select>` element with defined data items.
2. By binding the widget to a local data array and using the `<select>` element.
3. By binding the widget to a remote data service and using the `<select>` element.

The MultiSelect looks and operates consistently regardless of the initialization type you choose to apply.

> **Important**
> * Verify that you create the MultiSelect within a `$(document).ready()` statement because the widget has to be initialized after the DOM is fully loaded.
> * The widget copies any styles and CSS classes from the `input` element to the `wrapper` element and visible input.

#### Use option Tags of Existing select Elements

To initialize the MultiSelect by binding the widget to a local data array and utilizing the `<select>` element, use the [Data Source component]({% slug overview_kendoui_datasourcecomponent %}). It is an abstraction for local and remote data. Local arrays are appropriate for limited value options.

The following example demonstrates how to initialize the MultiSelect by using this approach.

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

#### Bind to Local Data Arrays

To initialize the MultiSelect by binding the widget to a local data array and utilizing the `<input>` or the `<select>` element, use the [Data Source component]({% slug overview_kendoui_datasourcecomponent %}). It is an abstraction for local and remote data. Local arrays are appropriate for limited value options.

The following example demonstrates how to initialize the MultiSelect by using this approach.

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

#### Bind to Remote Data Services

To initialize the MultiSelect by binding the widget to remote data arrays and utilizing the `<input>` or the `<select>` element, use the [Data Source component]({% slug overview_kendoui_datasourcecomponent %}). It is an abstraction for local and remote data. Remote data binding is appropriate for larger data sets, so that items are loaded on demand when displayed. You can use the DataSource for serving data from a variety of data services such as [XML](http://en.wikipedia.org/wiki/XML), [JSON](http://en.wikipedia.org/wiki/JSON), and [JSONP](http://en.wikipedia.org/wiki/JSONP).

The following example demonstrates how to initialize the MultiSelect by using this approach.

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

For more information on the capabilities and syntax of the templates, refer to the [documentation]({% slug overview_kendoui_templatescomponent %}).

### Item Templates

The item template manages the way the list items of a MultiSelect are rendered.  

The following example demonstrates how to define an item template.

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

The value template manages the way the tag of a MultiSelect is rendered.

The following example demonstrates how to define a tag template.

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

The header template manages the way the pop-up header of a MultiSelect is rendered.

The following example demonstrates how to define a header template.

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

### Footer Templates

The footer template manages the way the pop-up footer of a MultiSelect is rendered. The footer is re-rendered on every change of the Data Source. The context of the template is the widget itself.

The following example demonstrates how to define a footer template.

###### Example

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
                            url: "http://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

### No-Data Templates

The MultiSelect widget displays `noDataTemplate` in the popup when the data source is empty.

The following example demonstrates how to define a `noDataTemplate` template.

> **Important**
>
> When the `noDataTemplate` option is defined, the widget always opens the popup element.

###### Example

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
                            url: "http://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

## Configuration

### Change the List Width

To customize the width of a drop-down list and change its dimensions, use the jQuery `width()` method.

###### Example

    <select id="multiselect"></select>

    <script>
        var multiselect = $("#multiselect").data("kendoMultiSelect");

        // set width of the drop-down list
        multiselect.list.width(400);
    </script>

### Adjust the Popup Width

You can let the popup element automatically adjust its width according to the length of the item label it displays. When the `autoWidth` option is set to `true`, the popup shows the content on one line and does not wrap it up.

###### Example

    <input id="multiselect" style="width: 100px;" />
    <script>
    $("#multiselect").kendoMultiSelect({
      autoWidth: true,
      dataSource: {
        data: ["Short item", "An item with really, really long text"]
      }
    });
    </script>

### Access *-list Elements

The drop-down list renders an ID attribute, generated from the ID of the widget and the `-list` suffix.

The ID can be used to style the element or to access a specific element inside the popup element.

> **Important**
>
> If the widget has no ID, the drop-down element will have no ID either.

###### Example

    <select id="multiselect"></select>
    <script>
      $(document).ready(function() {
        $("#multiselect").kendoMultiSelect({
            dataSource: ["Item1", "Item2"]
        });

        //the DIV popup element that holds header, footer templates and the suggestion options.
        var popupElement = $("#multiselect-list");

        console.log(popupElement);
      });
    </script>

### Preselect Values

When the `autoBind` option is set to `false` you need to specify a list of data items instead of just list of strings. This functionality is supported in 2013 Q1 SP1 release and later versions of Kendo UI.

The following example demonstrates how to pre-select values on initial loading.

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

### Manage Scrollable Content

By design, when the user adds items that do not fit in the existing free space, the MultiSelect expands vertically. To achieve limited expansion and scrolling, refer to the Dojo example on how to handle this issue by [using CSS and JavaScript code](http://dojo.telerik.com/axeMa).

### Support label Elements

Because of its complex rendering, focusing the widget by using a `label` element requires additional implementation. For more information about how to do it, check [this Kendo UI Dojo snippet](http://dojo.telerik.com/uSeho).

### Remove Input Values

The MultiSelect enables you to remove the values from the input area of the widget through the `clearButton` configuration option. By default, the option is enabled and is set to `true`. As a result, a **x** button appears in the input area on hover. When clicked, it resets the value of the widget and triggers the `change` event.

## See Also

Other articles on the Kendo UI MultiSelect:

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [Grouping Functionality]({% slug grouping_kendoui_multiselect_widget %})
* [Virtualization]({% slug virtualization_kendoui_multiselect_widget %})
* [Troubleshooting]({% slug troubleshooting_common_issues_multiselect_kendoui %})
* [How to Preselect Items on Load in AngularJS]({% slug howto_preselect_itemson_load_angular_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the MultiSelect Widget](/aspnet-mvc/helpers/multiselect/overview)
* [Overview of the MultiSelect JSP Tag]({% slug overview_multiselect_uiforjsp %})
* [Overview of the MultiSelect PHP Class](/php/widgets/multiselect/overview)

Articles on the Kendo UI ComboBox:

* [Overview of the ComboBox Widget]({% slug overview_kendoui_combobox_widget %})
* [Grouping Functionality]({% slug grouping_kendoui_combobox_widget %})
* [Virtualization]({% slug virtualization_kendoui_combobox_widget %})
* [Cascading ComboBoxes]({% slug cascading_kendoui_combobox_widget %})
* [Server Filtering]({% slug server_filtering_kendoui_combobox_widget %})
* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)

Articles on the Kendo UI DropDownList:

* [Overview of the DropDownList Widget]({% slug overview_kendoui_dropdownlist_widget %})
* [Cascading DropDownLists]({% slug cascading_kendoui_dropdownlist_widget %})
* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)

Articles on the Kendo UI AutoComplete:

* [Overview of the AutoComplete Widget]({% slug overview_kendoui_autocomplete_widget %})
* [AutoComplete JavaScript API Reference](/api/javascript/ui/autocomplete)
