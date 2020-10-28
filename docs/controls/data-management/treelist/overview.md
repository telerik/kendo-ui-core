---
title: Overview
page_title: jQuery TreeList Documentation | TreeList Overview
description: "Get started with the jQuery TreeList by Kendo UI and learn how to initialize and configure the widget."
slug: overview_kendoui_treelist_widget
position: 1
---

# TreeList Overview

The TreeList enables the display of self-referencing tabular data and allows sorting, filtering, and data editing.

* [Demo page for the TreeList](https://demos.telerik.com/kendo-ui/treelist/index)

## Basic Configuration

To initialize a the TreeList, use an empty `div` element and supply all TreeList settings in the initialization script.

    <!-- Define the HTML div that is going to hold the TreeList -->
    <div id="treelist"></div>

Kendo UI TreeList needs a data source from which it will retrieve the data for display. The widget uses a special [`kendo.data.TreeListDataSource`](/api/javascript/data/treelistdatasource) type which contains instances of a custom [`kendo.data.TreeListModel`](/api/javascript/data/treelistmodel) that represents the data items.

The TreeList renders its hierarchy based on the `parentId`-`id` relationship. The data objects contain both an `id` and a `parentId` field which describe the hierarchy of the items. You can change these field names by using the [`schema.model` definition](/api/javascript/data/datasource/configuration/schema#schema.model).

> * The TreeList distinguishes the root items based on the `parentId`.
>   * If the `schema.model.fields.[parentIdField]` is nullable, root items will be the items whose `parentId` field values are `null`.
>   * If the `schema.model.fields.[parentIdField]` is not nullable, root items will be the items which have a default value for their data type.
> * When you use the `schema.model.fields` configuration, list all fields. Set the field which represents the `id` through the `schema.model.id`. If these are not set, they will still work for displaying data but will post incomplete objects on the server when editing items.

The following example demonstrates how to map the `parentId` field to the corresponding `parentId` field in the data. The schema definition will inform the data source that the `ReportsTo` field is the `parentId` field.

```
    schema:{
        model:{
            parentId: "ReportsTo",
            fields:{
                ReportsTo: { type: "number", nullable: true }
            }

        }
    }
```

## Functionality and Features

* [Data binding]({% slug databinding_kendoui_treelist %})
* [Editing]({% slug editing_kendoui_treelist_widget %})
* [Paging]({% slug paging_kendoui_treelist %})
* [Scrolling]({% slug scrolling_kendoui_treelist %})
* [Multi-column headers]({% slug multicolumnheaders_kendoui_treelist %})
* [Row Selection]({% slug selection_kendoui_treelist %})

## Events, Fields, and Methods

The following example demonstrates how to use [methods](/api/javascript/ui/treelist#methods) and [fields](/api/javascript/ui/treelist#fields) of the TreeList.

```dojo
    <div id="treelist"></div>
    <script>
    $("#treelist").kendoTreeList({
      columns: [
        { field: "Name" },
        { field: "Position" }
      ],
      dataSource: {
        data: [
          { id: 1, parentId: null, Name: "Jane Smith", Position: "CEO" },
          { id: 2, parentId: 1,    Name: "Alex Sells", Position: "EVP Sales" },
          { id: 3, parentId: 1,    Name: "Bob Price",  Position: "EVP Marketing" }
        ]
      }
    });

    // Get a reference to the kendo.ui.TreeList instance.
    var treelist = $("#treelist").data("kendoTreeList");

    // Use the expand method to expand the first row.
    treelist.expand($("#treelist tbody>tr:eq(0)"));
    </script>
```

To handle the [events](/api/javascript/ui/treelist#events) of the TreeList, use either of the following approaches:

* Specify the JavaScript function which will handle the event during the initialization of the widget.
* Use the `bind` method of the widget after initialization.

The event handler is the JavaScript function that is invoked when the event is fired. The argument of the event handler is a JavaScript object which contains event-specific data. Get a reference of the widget which fired the event through the `sender` field of the event argument. The function context of the event handler which is available through the `this` keyword is set to the instance of the widget which fired the event. For a runnable example, refer to the [demo on using the events of the TreeList](https://demos.telerik.com/kendo-ui/treelist/events).

The following example demonstrates how to subscribe to a TreeList event during the initialization of the widget.

```dojo
    <div id="treelist"></div>
    <script>
    $("#treelist").kendoTreeList({
      columns: [
        { field: "Name" },
        { field: "Position" }
      ],
      dataSource: {
        data: [
          { id: 1, parentId: null, Name: "Jane Smith", Position: "CEO" },
          { id: 2, parentId: 1,    Name: "Alex Sells", Position: "EVP Sales" },
          { id: 3, parentId: 1,    Name: "Bob Price",  Position: "EVP Marketing" }
        ]
      },
      dataBound: function(e) {
        console.log("dataBound");
      }
    });
    </script>
```

The following example demonstrates how to subscribe to a TreeList event by using the `bind` method.

```dojo
    <div id="treelist"></div>
    <script>
    function treelist_databound(e) {
        console.log("dataBound");
    }
    $("#treelist").kendoTreeList({
      columns: [
        { field: "Name" },
        { field: "Position" }
      ],
      dataSource: {
        data: [
          { id: 1, parentId: null, Name: "Jane Smith", Position: "CEO" },
          { id: 2, parentId: 1,    Name: "Alex Sells", Position: "EVP Sales" },
          { id: 3, parentId: 1,    Name: "Bob Price",  Position: "EVP Marketing" }
        ]
      }
    });
    var treelist = $("#treelist").data("kendoTreeList");
    treelist.bind("dataBound", treelist_databound);
    </script>
```

## Referencing Existing Instances

To refer to an existing TreeList instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method and pass `"kendoTreeList"` as an argument. Once a reference has been established, use the [API of the TreeList](/api/javascript/ui/treelist) to control its behavior.

```dojo
    <div id="treelist"></div>
    <script>
    $("#treelist").kendoTreeList({
      columns: [
        { field: "Name" },
        { field: "Position" }
      ],
      dataSource: {
        data: [
          { id: 1, parentId: null, Name: "Jane Smith", Position: "CEO" },
          { id: 2, parentId: 1,    Name: "Alex Sells", Position: "EVP Sales" },
          { id: 3, parentId: 1,    Name: "Bob Price",  Position: "EVP Marketing" }
        ]
      }
    });
    // Get a reference to the kendo.ui.TreeList instance.
    var treelist = $("#treelist").data("kendoTreeList");
    </script>
```

## See Also

* [Basic Usage of the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/index)
* [Using the API of the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/api)
* [TreeList JavaScript API Reference](/api/javascript/ui/treelist)
