---
title: Overview
page_title: Overview | Kendo UI ListBox
description: "Learn how to initialize the Kendo UI ListBox widget and configure its behavior."
slug: overview_kendoui_listbox_widget
position: 1
---

# ListBox Overview

The [Kendo UI ListBox widget](http://demos.telerik.com/kendo-ui/listbox/index) displays a list of data that is contained in a box.

It allows single or multiple selection, reordering of selected items, and deleting items and features keyboard navigation as well as the dragging and dropping of items. You can also connect the ListBox with another list-box and customize the widget with the use of templates, toolbar positioning, placeholder and hint, and localization of its command buttons messages.

## Getting Started

### Initialize the ListBox

To create a Kendo UI ListBox, use a `select` HTML element and supply the configuration settings in the initialization script. Alternatively, you can use the declarative approach which conforms to the convention of initializing Kendo UI widgets with [`data`](/intro/widget-basics/data-attribute-initialization) attributes.

###### Example

    <!-- Add the select HTML element that is going to hold the Kendo UI ListBox widget -->
    <select id="optional">
        <option>Steven White</option>
        <option>Nancy King</option>
        <option>Nancy Davolio</option>
    </select>

If a data source is not provided in its configuration settings, the ListBox uses the options from the HTML elements as its data source. You can configure the widget for remote operations. For more information, refer to the articles on:

* [DataSource]({% slug overview_kendoui_datasourcecomponent %})&mdash;The DataSource is one of the pivotal Kendo UI components. It is an abstraction for using local or remote data and a key concept in understanding how the Grid functions.
* [Remote CRUD Operations]({% slug cruddataoperations_kendoui_datasourcecomponent %}#remote-transport-crud-operations)&mdash;The section elaborates on scenarios, in which data is retrieved from and submitted to a remote data service through HTTP requests made by the Kendo UI DataSource.

### Bind to Local Arrays

The following example demonstrates how to initialize the ListBox and bind it to a local data array.

###### Example

```dojo
    <select id="listbox"></select>

    <!-- Initialize the ListBox -->
    <script>
        $(document).ready(function(){
            $("#listbox").kendoListBox({
                dataSource: [
                    { name: "Jane Doe" },
                    { name: "John Doe" }
                ],
                template: "<div>#:name#</div>",
                toolbar: {
                    tools: [ "moveUp", "moveDown", "remove" ]
                }
            });
        });
    </script>
```

When you use complex data objects, use the `dataTextField` and `dataValueField` properties to notify the widget of your preferred binding behavior.

### Bind to Remote Data

You can also bind the `DataSource` to remote data. The following example demonstrates how to bind the Kendo UI ListBox to a remote service.

###### Example

```dojo

     <select id="listbox"></select>

    <!-- Initialize the ListBox -->
    <script>
        $(document).ready(function(){
            $("#listbox").kendoListBox({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                    }
                },
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                toolbar: {
                    tools: [ "moveUp", "moveDown", "remove" ]
                }
            });
        });
    </script>
```

## Features

The ListBox delivers the following features:

* [Selection](#selection)
* [Reordering of selected items](#reordering-of-selections)
* [Dragging and dropping of items](#dragging-and-dropping)
* [Item templates](#item-templates)
* [Localization](#localization)

### Selection

The ListBox has a default `single` selection. To configure multiple selection, add `selectable: "multiple"` to its settings. When selected, multiple selected items move together, that is, the selected items are transferred to another Kendo UI ListBox together or reordered as a set among other items.

### Reordering of Selections

Selected items can be reordered by using any of the following approaches:

1. The `moveUp` and `moveDown` command buttons of the toolbar.
1. The drag-and-drop functionality if the widget is `draggable`.
1. The `Ctrl`+`Shift`+ <kbd>&darr;</kbd> or `Ctrl`+`Shift`+ <kbd>&uarr;</kbd> keyboard combination.

> **Important**
>
> Currently, the widget does not support the drag-and-drop feature for multiple selected items.

###### Example

```dojo

    <select id="listbox"></select>
    <script>
        $("#listbox").kendoListBox({
            selectable: "multiple",
            dataSource: [
                { name: "John", id: 1 },
                { name: "Jane", id: 2 },
                { name: "Jim", id: 3 },
                { name: "Tim", id: 4 },
                { name: "Mary", id: 5 }
            ],
            dataTextField: "name",
            dataValueField: "id",
            toolbar: {
              tools: [ "moveUp", "moveDown", "remove" ]
            }
        });
    </script>
```

### Dragging and Dropping

To enable the drag-and-drop feature of the ListBox, set its [`draggable`](/api/javascript/ui/listbox/configuration/draggable) property to `true`. You can also customize the drag-and-drop behavior of the widget by using its `draggable.placeholder` and `draggable.hint` options.

##### Example

```dojo

    <select id="listbox"></select>
    <script>
        $("#listbox").kendoListBox({
            draggable: {
                hint: function(element) {
                    return $("<span></span>")
                        .text(element.text())
                        .css("color", "#FF0000");
                },
                placeholder: function(element) {
                    return element.clone().css({
                        "opacity": 0.3,
                        "border": "1px dashed #000000"
                    });
                }
            },
            dataSource: [
                { name: "John", id: 1 },
                { name: "Jane", id: 2 },
                { name: "Jim", id: 3 },
                { name: "Tim", id: 4 },
                { name: "Mary", id: 5 }
            ],
            dataTextField: "name",
            dataValueField: "id"
        });
    </script>
```

### Item Templates

The ListBox supports the use of [templates]({% slug overview_kendoui_templatescomponent %}) for its items that are passed as а function or string.

##### Example

```dojo

    <script type="text/kendo-x-tmpl" id="template">
        <h5 style="color:#=data.color#">#=name#</h5>
    </script>

    <select id="listbox"></select>
    <script>
        $("#listbox").kendoListBox({
            dataSource: {
                data: [
                    { name: "Red", color: "red" },
                    { name: "Blue", color: "blue" },
                    { name: "Green", color: "green" }
                ]
            },
            template: kendo.template($("#template").html())
        });
    </script>

```

### Localization

You can configure the ListBox messages for each toolbar command button. The messages serve as tooltip text when the user hovers over the buttons.

##### Example

```dojo

    <select id="listbox">
        <option>Steven White</option>
        <option>Nancy King</option>
        <option>Nancy Davolio</option>
        <option>Robert Davolio</option>
        <option>Michael Leverling</option>
        <option>Andrew Callahan</option>
        <option>Michael Suyama</option>
    </select>
    <script>
        $(document).ready(function () {
            $("#listbox").kendoListBox({
                toolbar: {
                    position: "bottom",
                    tools: ["moveUp", "moveDown", "remove", "transferAllFrom", "transferAllTo", "transferFrom", "transferTo"]
                },
                messages: {
                    tools: {
                        moveUp: "Promote",
                        moveDown: "Demote",
                        remove: "Remove Employee",
                        transferTo: "Transfer To",
                        transferFrom: "Transfer From",
                        transferAllTo: "Transfer All To",
                        transferAllFrom: "Transfer All From"
                    }
                }
            });
        });
    </script>
```

## See Also

* [JavaScript API Reference of the ListBox](/api/javascript/ui/listbox)
* [ListBox Official Demo](http://demos.telerik.com/kendo-ui/listbox/index)
