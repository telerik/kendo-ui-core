---
title: Overview
page_title: Overview | Kendo UI MultiColumnComboBox
description: "Learn how to initialize the Kendo UI MultiColumnComboBox widget, configure its options, and customize its templates."
slug: overview_kendoui_multicolumncombobox_widget
position: 1
---

# MultiColumnComboBox Overview

As of the Kendo UI R3 2018, the Kendo UI for jQuery suite delivers the [MultiColumnComboBox](http://demos.telerik.com/kendo-ui/multicolumncombobox/index).

The MultiColumnComboBox visualizes huge sets of data in a grid-like table. Besides the core functionality that the standard Kendo UI ComboBox provides, such as virtualization, templates, cascading functionality, and data-binding scenarios, the MultiColumnComboBox enables you to define columns that will be rendered in the drop-down (along with additional options for them) and specify against which fields from the data source the filter will apply.

## Getting Started

### Initialize the MultiColumnComboBox

To initialize the MultiColumnComboBox, use any of the following approaches:

1. Use the `<option>` tag of an existing `<select>` element with defined data items.
2. Bind the widget to a local data array and use the `<input>` element.
3. Bind the widget to a remote data service and use the `<input>` element.

The MultiColumnComboBox looks and operates consistently regardless of the initialization type you choose to apply.

> **Important**
> * Verify that you create the MultiColumnComboBox within a `$(document).ready()` statement because the widget has to be initialized after the DOM fully loads.
> * The widget copies any styles and CSS classes from the `input` element to the `wrapper` element and visible input.

## Columns

The MultiColumnComboBox widget provides allows you to predefine the columns that will be rendered in the drop-down. You can also set which field from the `dataItem` will be populated, set a title, template, `headerTemplate`, and width. For more information, refer to the [API for the columns configuration of the MultiColumnComboBox](/api/javascript/ui/multicolumncombobox/configuration/columns#related-properties).

### Columns Width

The MultiColumnComboBox allows you to set the width of the drop-down through the [`dropDownWidth`](/api/javascript/ui/multicolumncombobox/configuration/dropdownwidth) option. In addition, the columns also allow you to [set their width](/api/javascript/ui/multicolumncombobox/configuration/columns.width).

> **Important**
>
> * If the widths of all columns are defined in pixels through their `width` option, the `dropDownWidth` value (if set) is overridden.
> * In all other cases when the widths of all columns are not set, the `dropDownWidth` value is applied to the element.

The following example demonstrates how to combine the column width values, set the drop-down width value, and ender a drop-down with a width of 300px in the MultiColumnComboBox.

###### Example

    <input id="multicolumncombobox" />
    <script>
        $("#multicolumncombobox").kendoMultiColumnComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Apples", value: "1", width: 150  },
                { text: "Oranges", value: "2", width: 150 }
            ],
            columns: [
                { field: "text", title: "Text" },
                { field: "value", title: "Value" }
            ]
        });
    </script>

The following example demonstrated how to set a specific width for the first column and calculate the rest of the space (the set `dropDownWidth` column width) so that the space is evenly split between the rest of the columns.

###### Example

    <input id="multicolumncombobox" />
    <script>
        $("#multicolumncombobox").kendoMultiColumnComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dropDownWidth: 350,
            dataSource: [
                { text: "Apples", value: "1", subtitle: "subtitle 1", width: 150 },
                { text: "Oranges", value: "2", subtitle: "subtitle 2"},
                { text: "Kiwis", value: "3", subtitle: "subtitle 3"}
            ],
            columns: [
                { field: "text", title: "Text" },
                { field: "value", title: "Value" },
                { field: "subtitle", title: "SubTitle" }
            ]
        });
    </script>

## Filtering

Besides the standard filter options, the MultiColumnComboBox allows you to set fields against which the data will be filtered. The option accepts an array of strings.

###### Example

    <input id="multicolumncombobox" />
    <script>
        $("#multicolumncombobox").kendoMultiColumnComboBox({
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            filterFields: ["text", "value"],
            dataSource: [
                { text: "Apples", value: "1", subtitle: "subtitle 1", width: 150 },
                { text: "Oranges", value: "2", subtitle: "subtitle 2"},
                { text: "Kiwis", value: "3", subtitle: "subtitle 3"}
            ],
            columns: [
                { field: "text", title: "Text" },
                { field: "value", title: "Value" },
                { field: "subtitle", title: "SubTitle" }
            ]
        });
    </script>

## Data Binding

When you configure the local or remote dataSource of the MultiColumnComboBox, enabling paging functionality and setting [`pageSize`](/api/javascript/data/datasource/configuration/pagesize) is efficient only when you use paging together with [virtualization]({% slug virtualization_kendoui_combobox_widget %}). In all other cases, enabling paging and setting `pageSize` is considered as incorrect configuration.

### Bind to Local Data Arrays

To initialize the MultiColumnComboBox by binding the widget to a local data array and utilizing the `<input>` element, use the [Data Source component]({% slug overview_kendoui_datasourcecomponent %}). It is an abstraction for local and remote data. Local arrays are appropriate for limited value options.

The following example demonstrates how to initialize the MultiColumnComboBox by using this approach.

###### Example

    <input id="comboBox" />

    <script>
      $(document).ready(function(){
        $("#comboBox").kendoMultiColumnComboBox({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: [
            { text: "Item1", value: "1" },
            { text: "Item2", value: "2" }
          ],
          columns: [
                { field: "text", title: "Text" },
                { field: "value", title: "Value" }
          ]
        });
      });
    </script>

### Bind to Remote Data Services

To initialize the MultiColumnComboBox by binding the widget to remote data arrays and utilizing the `<input>` element, use the [Data Source component]({% slug overview_kendoui_datasourcecomponent %}). It is an abstraction for local and remote data. Remote data binding is appropriate for larger data sets, so that items are loaded on demand when displayed. You can use the DataSource for serving data from a variety of data services such as [XML](http://en.wikipedia.org/wiki/XML), [JSON](http://en.wikipedia.org/wiki/JSON), and [JSONP](http://en.wikipedia.org/wiki/JSONP).

The following example demonstrates how to initialize the MultiColumnComboBox by using this approach.

###### Example

    <input id="comboBox" />

    <script>
    $(document).ready(function() {
        $("#comboBox").kendoMultiColumnComboBox({
            index: 0,
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            columns: [
                    { field: "ProductName", title: "ProductName" },
                    { field: "ProductID", title: "ProductID" }
            ],
            dataSource: {
                transport: {
                    read: {
                        dataType: "jsonp",
                        url: "https://demos.telerik.com/kendo-ui/service/Products"
                    }
                }
            }
        });
    });
    </script>

## Templates

The MultiColumnComboBox uses [Kendo UI templates](/framework/templates/overview) to provide full control over the way pop-up items are rendered.

For more information on the capabilities and syntax of the templates, refer to the [documentation]({% slug overview_kendoui_templatescomponent %}).

### Column Templates

You can define [column templates](/api/javascript/ui/multicolumncombobox/configuration/columns.template) and [header column templates](/api/javascript/ui/multicolumncombobox/configuration/columns.headertemplate) to customize the layout of your project.

###### Example

    <input id="multicolumncombobox" />
    <script>
        $("#multicolumncombobox").kendoMultiColumnComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Apples", value: "1" },
                { text: "Oranges", value: "2" }
            ],
            columns: [
                { field: "text", template: "Cell Text: #:text#", headerTemplate: "<strong>Text</strong>"},
                { field: "value", template: "Cell Value: <strong>#:value#</strong>", headerTemplate: "<strong>Value</strong>"}
            ]
        });
    </script>

### Header Templates

The header template manages the way the pop-up header of a MultiColumnComboBox is rendered. The MultiColumnComboBox allows you to render a pop-up header.

The following example demonstrates how to define a header template.

###### Example

    <input id="comboBox" />
    <!-- Template -->
    <script id="headerTemplate" type="text/x-kendo-template">
        <strong>Header</strong>
    </script>

    <!-- MultiColumnComboBox initialization -->
    <script>
        $(document).ready(function() {
            $("#comboBox").kendoMultiColumnComboBox({
                headerTemplate: $("#headerTemplate").html(),
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                columns: [
                    { field: "ProductName", title: "ProductName" },
                    { field: "ProductID", title: "ProductID" }
                ],
                dataSource: {
                    transport: {
                        read: {
                            dataType: "jsonp",
                            url: "https://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

### Footer Templates

The footer template manages the way the pop-up footer of a MultiColumnComboBox is rendered. The footer is re-rendered on every change of the Data Source. The context of the template is the widget itself.

The following example demonstrates how to define a footer template.

###### Example

    <input id="comboBox" />
    <!-- Template -->
    <script id="footerTemplate" type="text/x-kendo-template">
        Total <strong>#: instance.dataSource.total() #</strong> items found
    </script>

    <!-- MultiColumnComboBox initialization -->
    <script>
        $(document).ready(function() {
            $("#comboBox").kendoMultiColumnComboBox({
                footerTemplate: $("#footerTemplate").html(),
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                columns: [
                    { field: "ProductName", title: "ProductName" },
                    { field: "ProductID", title: "ProductID" }
                ],
                dataSource: {
                    transport: {
                        read: {
                            dataType: "jsonp",
                            url: "https://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

### No-Data Templates

The MultiColumnComboBox widget displays `noDataTemplate` in the popup when the data source is empty.

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

    <!-- MultiColumnComboBox initialization -->
    <script>
        $(document).ready(function() {
            $("#comboBox").kendoMultiColumnComboBox({
                noDataTemplate: $("#noDataTemplate").html(),
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                filter: "contains",
                dataSource: {
                    transport: {
                        read: {
                            dataType: "jsonp",
                            url: "https://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

## See Also

* [Grouping Functionality]({% slug grouping_kendoui_multicolumncombobox_widget %})
* [Virtualization]({% slug virtualization_kendoui_multicolumncombobox_widget %})
* [Cascading MultiColumnComboBoxes]({% slug cascading_kendoui_multicolumncombobox_widget %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the MultiColumnComboBox Widget](/aspnet-mvc/helpers/multicolumncombobox/overview)
* [Overview of the MultiColumnComboBox JSP Tag]({% slug overview_multicolumncombobox_uiforjsp %})
* [Overview of the MultiColumnComboBox PHP Class](/php/widgets/multicolumncombobox/overview)
* [MultiColumnComboBox JavaScript API Reference](/api/javascript/ui/multicolumncombobox)

Articles on the Kendo UI DropDownList:

* [Overview of the DropDownList Widget]({% slug overview_kendoui_dropdownlist_widget %})
* [Cascading DropDownLists]({% slug cascading_kendoui_combobox_widget %})
* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)

Articles on the Kendo UI MultiSelect:

* [Overview of the MultiSelect Widget]({% slug overview_kendoui_multiselect_widget %})
* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)

Articles on the Kendo UI AutoComplete:

* [Overview of the AutoComplete Widget]({% slug overview_kendoui_autocomplete_widget %})
* [AutoComplete JavaScript API Reference](/api/javascript/ui/autocomplete)
