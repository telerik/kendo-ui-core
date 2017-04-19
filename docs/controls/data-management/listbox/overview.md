---
title: Overview
page_title: Overview | Kendo UI ListBox
description: "Learn how to initialize the Kendo UI ListBox widget and configure its behavior."
slug: overview_kendoui_listbox_widget
position: 1
---

# ListBox Overview

The [Kendo UI ListBox widget](http://demos.telerik.com/kendo-ui/listbox/index) displays a list of data contained in a box and allows single or multiple selection, reordering, deleting items and features keyboard navigation as well as drag and drop. The Kendo UI ListBox can be connected with another listbox. The widget can be customized with the use of templates, toolbar positioning, placeholder and hint and command buttons messages localization.

## Getting Started

### Initialize the ListBox

To create a Kendo UI ListBox, use a `select` element and supply the configuration settings in the initialization script. Alternatively, use the declarative approach which conforms to the convention of initializing Kendo UI widgets with [`data attributes`](/intro/widget-basics/data-attribute-initialization).

###### Example

    <!-- Add the select HTML element that is going to hold the Kendo UI ListBox widget -->
    <select id="optional">
        <option>Steven White</option>
        <option>Nancy King</option>
        <option>Nancy Davolio</option>
    </select>

Kendo UI ListBox will use the options from the HTML elements as its data source if a data source is not provided in its configuration settings. The Kendo UI ListBox can be configured for remote operations. More information is available at:

* [DataSource]({% slug overview_kendoui_datasourcecomponent %})&mdash;The DataSource is one of the pivotal Kendo UI components. It is an abstraction for using local or remote data and a key concept in understanding how the Grid functions.
* [Remote CRUD Operations]({% slug cruddataoperations_kendoui_datasourcecomponent %}#remote-transport-crud-operations)&mdash;The section elaborates on scenarios, in which data is retrieved from and submitted to a remote data service through HTTP requests made by the Kendo UI DataSource.

### Bind to Local Arrays

The following example demonstrates how to initialize the ListBox and bind it to a local data array.

###### Example

```html
    <select id="listbox"></select>

    <!-- Initialize the ListBox -->
    <script>
        $(document).ready(function(){
            $("#listBox").kendoListBox({
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

When using complex data objects, use the `dataTextField` and `dataValueField` properties to notify the widget of your preferred binding behaviour.

### Bind to Remote Data

You can also bind the `DataSource` to remote data. The following example demonstrates how to binding the Kendo UI ListBox to a remote service.

###### Example

```html

     <select id="listbox"></select>

    <!-- Initialize the ListBox -->
    <script>
        $(document).ready(function(){
            $("#listBox").kendoListBox({
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

### Selection

The Kendo UI ListBox has a default `single` selection. To configure multiple selection, add `selectable: "multiple"` to its settings. Multiple selected items will move together when selected, i.e. the selected items will be transfered to another Kendo UI ListBox together or reordered as a set among other items.

### Reorder Selected Items

Selected items can be reordered with the toolbar `moveUp` and `moveDown` command buttons, drag and drop if the widget is `draggable` and with keyboard navigation <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>&darr;</kbd> or <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>&uarr;</kbd>

> **Important**
>
> Currently multiple selected items cannot be dragged & dropped

###### Example

```html

    <select id="listBox"></select>
    <script>
        $("#listBox").kendoListBox({
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

### Drag and Drop

The Kendo Ui ListBox drag and drop functionality can be enabled by setting its [`draggable`](/api/javascript/ui/listbox#configuration-draggable) propery to `true`. The drag and drop behaviour can be customized with a `draggable.placeholder` and a `draggable.hint`.

##### Example

```html

    <select id="listBox"></select>
    <script>
        $("#listBox").kendoListBox({
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

### Templates

The Kendo UI ListBox supports the use of [templates]({% slug overview_kendoui_templatescomponent %}) for its items passed as а function or string.

##### Example

```html

    <script type="text/kendo-x-tmpl" id="template">
        <h5 style="color:#=data.color#">#=name#</h5>
    </script>

    <select id="listBox"></select>
    <script>
        $("#listBox").kendoListBox({
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

The Kendo UI ListBox messages can be configured for each toolbar command button. The messages serve as tooltip text when a user hovers over the buttons.

##### Example

```html

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

Other resources for the Kendo UI ListBox:

* [JavaScript API Reference](/api/javascript/ui/listbox)
* [Official Demos Site](http://demos.telerik.com/kendo-ui/listbox/index)
