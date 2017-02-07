---
title: Overview
page_title: Overview | Kendo UI DropDownList
description: "Learn how to initialize the Kendo UI DropDownList widget, configure its options and customize templates."
slug: overview_kendoui_dropdownlist_widget
position: 1
---

# DropDownList Overview

The [Kendo UI DropDownList widget](http://demos.telerik.com/kendo-ui/dropdownlist/index) displays a list of values and allows for a single selection from the list.

The user input is restricted within the predefined options.

To apply a keyboard input, use the [Kendo UI ComboBox]({% slug overview_kendoui_combobox_widget %}).

## Getting Started

### Initialize the DropDownList

You can initialize the Kendo UI DropDownList widget in any of the following ways:

1. By using the `<option>` tag of an existing `<select>` element with defined data items.
2. By binding the widget to a local data array and using the `<input>` or the `<select>` element.
3. By binding the widget to a remote data service and using the `<input>` or the `<select>` element.

The DropDownList looks and operates consistently regardless of the initialization type you choose to apply.

> **Important**
> * Verify that you create the DropDownList within a `$(document).ready()` statement because the widget has to be initialized after the DOM is fully loaded.
> * The widget copies any styles and CSS classes from the `input` element to the `wrapper` element and visible input.

#### Use option Tags of Existing select Elements

The following example demonstrates how to initialize the DropDownList from an existing `<select>` element with defined data items.

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

#### Bind to Local Data Arrays

To initialize the DropDownList by binding the widget to a local data array and utilizing the `<input>` or the `<select>` element, use the [Data Source component]({% slug overview_kendoui_datasourcecomponent %}). It is an abstraction for local and remote data. Local arrays are appropriate for limited value options.

The following example demonstrates how to initialize the DropDownList by using this approach.

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

#### Bind to Remote Data Services

To initialize the DropDownList by binding the widget to remote data arrays and utilizing the `<input>` or the `<select>` element, use the [Data Source component]({% slug overview_kendoui_datasourcecomponent %}). It is an abstraction for local and remote data. Remote data binding is appropriate for larger data sets, so that items are loaded on demand when displayed. You can use the DataSource for serving data from a variety of data services such as [XML](http://en.wikipedia.org/wiki/XML), [JSON](http://en.wikipedia.org/wiki/JSON), and [JSONP](http://en.wikipedia.org/wiki/JSONP).

The following example demonstrates how to initialize the DropDownList by using this approach.

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

For more information on the capabilities and syntax of the templates, refer to the [documentation]({% slug overview_kendoui_templatescomponent %}).

### Item Templates

The item template manages the way the list items of a DropDownList are rendered.  

The following example demonstrates how to define an item template.

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

The value template manages the way the selected value of a DropDownList is rendered.  

The following example demonstrates how to define a value template.

> **Important**
>
> Value templates must consist of inline HTML elements only.

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

The header template manages the way the pop-up header of a DropDownList is rendered.

The following example demonstrates how to define a header template.

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

### Footer Templates

The footer template manages the way the pop-up footer of a DropDownList is rendered. The footer is re-rendered on every change of the Data Source. The context of the template is the widget itself.

The following example demonstrates how to define a footer template.

###### Example

    <input id="dropdownlist" />
    <!-- Template -->
    <script id="footerTemplate" type="text/x-kendo-template">
        Total <strong>#: instance.dataSource.total() #</strong> items found
    </script>

    <!-- DropDownList initialization -->
    <script>
        $(document).ready(function() {
            $("#dropdownlist").kendoDropDownList({
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

The DropDownList widget displays `noDataTemplate` in the popup when the data source is empty.

The following example demonstrates how to define a `noDataTemplate` template.

> **Important**
>
> When the `noDataTemplate` option is defined, the widget always opens the popup element.

###### Example

    <input id="dropDownList" />
    <!-- Template -->
    <script id="noDataTemplate" type="text/x-kendo-template">
        <strong>No Data!</strong>
    </script>

    <!-- DropDownList initialization -->
    <script>
        $(document).ready(function() {
            $("#dropDownList").kendoDropDownList({
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

    <input id="dropDownList">
    <script>
      $(document).ready(function() {
        $("#dropDownList").kendoDropDownList();
        var dropdownlist = $("#dropDownList").data("kendoDropDownList");
        dropdownlist.list.width(400);
      });
    </script>

The following example demonstrates how to set the list dimensions through an MVVM binding.

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

### Adjust the Popup Width

You can let the popup element automatically adjust its width according to the length of the item label it displays. When the `autoWidth` option is set to `true`, the popup shows the content on one line and does not wrap it up.

###### Example

    <input id="dropdownlist" style="width: 100px;" />
    <script>
    $("#dropdownlist").kendoDropDownList({
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

    <input id="ddl">
    <script>
      $(document).ready(function() {
        $("#ddl").kendoDropDownList({
            dataSource: ["Item1", "Item2"]
        });

        //the DIV popup element that holds header, footer templates and the suggestion options.
        var popupElement = $("#ddl-list");

        console.log(popupElement);
      });
    </script>

### Support label Elements

Because of its complex rendering, focusing the widget by using a `label` element requires additional implementation. For more information about how to do it, check [this Kendo UI Dojo snippet](http://dojo.telerik.com/uSeho).

## See Also

Other articles on the Kendo UI DropDownList:

* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)
* [Grouping Functionality]({% slug grouping_kendoui_combobox_widget %})
* [Virtualization]({% slug virtualization_kendoui_combobox_widget %})
* [Cascading DropDownLists]({% slug cascading_kendoui_dropdownlist_widget %})
* [Troubleshooting]({% slug troubleshooting_common_issues_dropdownlist_kendoui %})
* [How to Cascade DropDownLists Using `ng-repeat`]({% slug howto_cascade_withngrepeat_distinct_values_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [Overview of the ASP.NET MVC HtmlHelper Extension fro the DropDownList Widget](/aspnet-mvc/helpers/dropdownlist/overview)
* [Overview of the DropDownList JSP Tag]({% slug overview_dropdownlist_uiforjsp %})
* [Overview of the DropDownList PHP Class](/php/widgets/dropdownlist/overview)

Articles on the Kendo UI ComboBox:

* [Overview of the ComboBox Widget]({% slug overview_kendoui_combobox_widget %})
* [Grouping Functionality]({% slug grouping_kendoui_combobox_widget %})
* [Virtualization]({% slug virtualization_kendoui_combobox_widget %})
* [Cascading ComboBoxes]({% slug cascading_kendoui_combobox_widget %})
* [Server Filtering]({% slug server_filtering_kendoui_combobox_widget %})
* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)

Articles on the Kendo UI MultiSelect:

* [Overview of the MultiSelect Widget]({% slug overview_kendoui_multiselect_widget %})
* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)

Articles on the Kendo UI AutoComplete:

* [Overview of the AutoComplete Widget]({% slug overview_kendoui_autocomplete_widget %})
* [AutoComplete JavaScript API Reference](/api/javascript/ui/autocomplete)
