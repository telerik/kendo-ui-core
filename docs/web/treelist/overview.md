---
title: Overview
page_title: Overview of TreeList UI widget | Kendo UI Documentation
description: Quick steps to help you create a Kendo UI TreeList
position: 1
---

# TreeList Introduction

The Kendo UI TreeList widget enables display of self-referencing tabular data, and allows sorting, filtering, and editing of data

## Getting Started

The Kendo UI TreeList needs a data source where the data is retrieved from. The treelist uses a special type of Kendo UI DataSource - the [kendo.data.TreeListDataSource](/api/javascript/data/treelistdatasource). The `TreeListDataSource` contains instances of a custom Kendo UI model - [kendo.data.TreeListModel](/api/javascript/data/treelistmodel) - which represents the treelist data items.

## Binding to a JavaScript array

To create a Kendo UI TreeList, use an empty `div` element and supply all TreeList settings in the initialization script.

### Example - create a TreeList from an empty div

```html
<!-- Define the HTML div that will hold the TreeList -->
<div id="treelist"></div>

<!-- Initialize the TreeList -->
<script>

    $(document).ready(function(){
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
    });

</script>
```

Note that data objects contain both an `id` and `parentId` field, which describe the hierarchy of items. These field names can be changed via the [`schema.model`](/api/javascript/data/datasource#configuration-schema-model) definition.

## Binding to remote data

The TreeListDataSource can be bound to remote data, in order to enable the TreeList to load items from a web service. This allows TreeList items to be retrieved from and saved to a database on the server. To enable remote binding, set the DataSource `transport`:

### Example - bind the TreeList to a remote service

```html
    <!-- Define the HTML div that will hold the TreeList -->
    <div id="treelist"></div>

    <script>

        $(document).ready(function(){
            var serviceRoot = "http://demos.telerik.com/kendo-ui/service";

            // Create the TreeListDataSource
            var dataSource = new kendo.data.TreeListDataSource({
                transport: {
                    // Define the remote end points
                    read:  {
                        url: serviceRoot + "/EmployeeDirectory/All",
                        dataType: "jsonp"
                    },
                    update: {
                        url: serviceRoot + "/EmployeeDirectory/Update",
                        dataType: "jsonp"
                    },
                    destroy: {
                        url: serviceRoot + "/EmployeeDirectory/Destroy",
                        dataType: "jsonp"
                    },
                    create: {
                        url: serviceRoot + "/EmployeeDirectory/Create",
                        dataType: "jsonp"
                    },

                    // Post changed models in the `model` field, as serialized JSON
                    parameterMap: function(options, operation) {
                        if (operation !== "read" && options.models) {
                            return { models: kendo.stringify(options.models) };
                        }
                    }
                },

                // Enable batch updates
                batch: true,

                // Define the model schema
                schema: {
                    model: {
                        id: "EmployeeId",
                        fields: {
                            EmployeeId: { type: "number", editable: false, nullable: false },
                            parentId: { field: "ReportsTo", nullable: true },
                            FirstName: { validation: { required: true } },
                            LastName: { validation: { required: true } },
                            HireDate: { type: "date" },
                            Phone: { type: "string" },
                            HireDate: { type: "date" },
                            BirthDate: { type: "date" },
                            Extension: { type: "number", validation: { min: 0, required: true } },
                            Position: { type: "string" }
                        }
                    }
                }
            });

            // Create the TreeList
            $("#treelist").kendoTreeList({
                // Declare the TreeList columns
                columns: [
                    { field: "LastName", title: "Last Name" },
                    { field: "Position" }
                ],
                // Bind the TreeList to the dataSource
                dataSource: dataSource
            });
        });

    </script>
```

Note that the `parentId` is mapped from the `ReportsTo` field by the line `parentId: { field: "ReportsTo", nullable: true }`. The TreeList renders its hierarchy based on the `parentId` - `id` relationship.

> All fields must be listed when using `schema.model.fields`. The field which represents the `id` of the event must also be set via `schema.model.id`. Not setting these will still work for displaying data, but will post incomplete objects on the server when editing items.

## Getting reference to a Kendo UI TreeList

To get a reference to a Kendo UI TreeList instance, use the jQuery `data` method and pass "kendoTreeList" as argument:

### Example - get reference to a Kendo UI TreeList

```html
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
          { id: 2, parentId: 1,    Name: "Alex Sells", Position: "EVP Sales" }
          { id: 3, parentId: 1,    Name: "Bob Price",  Position: "EVP Marketing" }
        ]
      }
    });
    // Get reference to the kendo.ui.TreeList instance
    var treelist = $("#treelist").data("kendoTreeList");
    </script>
```

## Using the API of Kendo UI TreeList

The TreeList widget exposes a set of [methods](/api/javascript/ui/treelist#methods) and [fields](/api/javascript/ui/treelist#fields) which you can use.

### Example - use the API of the Kendo UI TreeList

```html
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
          { id: 2, parentId: 1,    Name: "Alex Sells", Position: "EVP Sales" }
          { id: 3, parentId: 1,    Name: "Bob Price",  Position: "EVP Marketing" }
        ]
      }
    });

    // Get reference to the kendo.ui.TreeList instance
    var treelist = $("#treelist").data("kendoTreeList");

    // Use the expand method to expand the first row
    treelist.expand($("#treelist tbody>tr:eq(0)"));
    </script>
```

## Subscribing to the events of Kendo UI TreeList

The treelist widget supports a set of [events](/api/javascript/ui/treelist#events) which you can subscribe to. There are two ways to handle events:

* Specify the JavaScript function which will handle the event during widget initialization.
* Use the `bind` method of the widget.

The event handler is the JavaScript function invoked when the event is fired. The argument of the event handler is a JavaScript object which contains event-specific data.
You can get a reference of the widget which fired the event via the `sender` field of the event argument.
The function context of the event handler (available via the `this` keyword) is set to the instance of the widget which fired the event.

### Example - subscribe to a treelist event during initialization

```html
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
          { id: 2, parentId: 1,    Name: "Alex Sells", Position: "EVP Sales" }
          { id: 3, parentId: 1,    Name: "Bob Price",  Position: "EVP Marketing" }
        ]
      },
      dataBound: function(e) {
        console.log("dataBound");
      }
    });
    </script>
```

### Example - subscribe to a treelist event using the bind method

```html
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
          { id: 2, parentId: 1,    Name: "Alex Sells", Position: "EVP Sales" }
          { id: 3, parentId: 1,    Name: "Bob Price",  Position: "EVP Marketing" }
        ]
      }
    });
    var treelist = $("#treelist").data("kendoTreeList");
    treelist.bind("dataBound", treelist_databound);
    </script>
```
