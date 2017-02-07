---
title: Overview
page_title: Overview | Kendo UI ComboBox
description: "Learn how to initialize the Kendo UI ComboBox widget, configure its options and customize templates."
slug: overview_kendoui_combobox_widget
position: 1
---

# ComboBox Overview

The [Kendo UI ComboBox widget](http://demos.telerik.com/kendo-ui/combobox/index) displays a list of values and allows for a single selection from that list.

It enables the user to enter custom values through the keyboard. The ComboBox represents a richer version of the `<select>` element and provides support for local and remote data binding, item templates, and configurable options for controlling the list behavior.

To restrict the user input, use the [Kendo UI DropDownList](http://demos.telerik.com/kendo-ui/dropdownlist/index).

## Getting Started

### Initialize the ComboBox

You can initialize the Kendo UI ComboBox widget in any of the following ways:

1. By using the `<option>` tag of an existing `<select>` element with defined data items.
2. By binding the widget to a local data array and using the `<input>` element.
3. By binding the widget to a remote data service and using the `<input>` element.

The ComboBox looks and operates consistently regardless of the initialization type you choose to apply.

> **Important**  
> * Verify that you create the ComboBox within a `$(document).ready()` statement because the widget has to be initialized after the DOM is fully loaded.
> * The widget copies any styles and CSS classes from the `input` element to the `wrapper` element and visible input.

#### Use option Tags of Existing select Elements

To initialize the ComboBox by binding the widget to a local data array and utilizing the `<select>` element, use the [Data Source component]({% slug overview_kendoui_datasourcecomponent %}). It is an abstraction for local and remote data. Local arrays are appropriate for limited value options.

The following example demonstrates how to initialize the ComboBox by using this approach.

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

#### Bind to Local Data Arrays

To initialize the ComboBox by binding the widget to a local data array and utilizing the `<input>` element, use the [Data Source component]({% slug overview_kendoui_datasourcecomponent %}). It is an abstraction for local and remote data. Local arrays are appropriate for limited value options.

The following example demonstrates how to initialize the ComboBox by using this approach.

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

#### Bind to Remote Data Services

To initialize the ComboBox by binding the widget to remote data arrays and utilizing the `<input>` element, use the [Data Source component]({% slug overview_kendoui_datasourcecomponent %}). It is an abstraction for local and remote data. Remote data binding is appropriate for larger data sets, so that items are loaded on demand when displayed. You can use the DataSource for serving data from a variety of data services such as [XML](http://en.wikipedia.org/wiki/XML), [JSON](http://en.wikipedia.org/wiki/JSON), and [JSONP](http://en.wikipedia.org/wiki/JSONP).

The following example demonstrates how to initialize the ComboBox by using this approach.

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

For more information on the capabilities and syntax of the templates, refer to the [documentation]({% slug overview_kendoui_templatescomponent %}).

### Item Templates

The item template manages the way the list items of a ComboBox are rendered.  

The following example demonstrates how to define an item template.

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

The header template manages the way the pop-up header of a ComboBox is rendered.

The ComboBox allows you to render a pop-up header. The following example demonstrates how to define a header template.

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

The footer template manages the way the pop-up footer of a ComboBox is rendered. The footer is re-rendered on every change of the Data Source. The context of the template is the widget itself.

The following example demonstrates how to define a footer template.

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

The following example demonstrates how to define a `noDataTemplate` template.

> **Important**
>
> When the `noDataTemplate` option is defined, the widget always opens the popup element.

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

### Change the List Width

To customize the width of a drop-down list and change its dimensions, use the jQuery `width()` method.

###### Example

     <input id="comboBox" />

    <script>
        var combobox = $("#combobox").data("kendoComboBox");

        // set width of the drop-down list
        combobox.list.width(400);
    </script>

### Adjust the Popup Width

You can let the popup element automatically adjust its width according to the length of the item label it displays. When the `autoWidth` option is set to `true`, the popup shows the content on one line and does not wrap it up.

###### Example

    <input id="combobox" style="width: 100px;" />
    <script>
    $("#combobox").kendoComboBox({
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

    <input id="combobox">
    <script>
      $(document).ready(function() {
        $("#combobox").kendoComboBox({
            dataSource: ["Item1", "Item2"]
        });

        //the DIV popup element that holds header, footer templates and the suggestion options.
        var popupElement = $("#combobox-list");

        console.log(popupElement);
      });
    </script>

### Support label Elements

Because of its complex rendering, the focusing of the widget by using a `label` element requires additional implementation. For more information on how to do it, refer to [this Kendo UI Dojo snippet](http://dojo.telerik.com/uSeho).

### Remove Input Values

The ComboBox enables you to remove the values from the input area of the widget through the `clearButton` configuration option. By default, the option is enabled and is set to `true`. As a result, a **x** button appears in the input area on hover. When clicked, it resets the value of the widget and triggers the `change` event.

## Reference

### Existing Instances

To refer an existing ComboBox widget, use the [jQuery.data()](http://api.jquery.com/jQuery.data/) configuration option.

###### Example

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

* [Overview of the DropDownList Widget]({% slug overview_kendoui_dropdownlist_widget %})
* [Cascading DropDownLists]({% slug cascading_kendoui_dropdownlist_widget %})
* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)

Articles on the Kendo UI MultiSelect:

* [Overview of the MultiSelect Widget]({% slug overview_kendoui_multiselect_widget %})
* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)

Articles on the Kendo UI AutoComplete:

* [Overview of the AutoComplete Widget]({% slug overview_kendoui_autocomplete_widget %})
* [AutoComplete JavaScript API Reference](/api/javascript/ui/autocomplete)
