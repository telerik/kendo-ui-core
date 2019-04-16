---
title: Overview
page_title: Overview | Kendo UI TreeList
description: "Learn how to initialize the Kendo UI TreeList widget and configure its behavior."
slug: overview_kendoui_treelist_widget
position: 1
---

# TreeList Overview

The [Kendo UI TreeList widget](http://demos.telerik.com/kendo-ui/treelist/index) enables the display of self-referencing tabular data and allows sorting, filtering, and data editing.

## Getting Started

### Initialize the TreeList

To create a Kendo UI TreeList, use an empty `div` element and supply all TreeList settings in the initialization script.

###### Example

    <!-- Define the HTML div that is going to hold the TreeList -->
    <div id="treelist"></div>

Kendo UI TreeList needs a data source from where it is able to retrieve the data you want it to display. The widget uses a special type of Kendo UI DataSource&mdash;[`kendo.data.TreeListDataSource`](/api/javascript/data/treelistdatasource). The `TreeListDataSource` contains instances of a custom Kendo UI model&mdash;[`kendo.data.TreeListModel`](/api/javascript/data/treelistmodel)&mdash;which represents the TreeList data items.

The TreeList renders its hierarchy based on the `parentId` - `id` relationship. The data objects contain both an `id` and a `parentId` field which describe the hierarchy of items. These field names can be changed via the [`schema.model` definition](/api/javascript/data/datasource/configuration/schema#schema.model).

Map the `parentId` field to the corresponding parentId field in your data. The schema definition below will inform the data source that the `ReportsTo` field is the `parentId` field:

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

> **Important**
>
> The Kendo UI TreeList distinguishes the root items based on the `parentId`. If the `schema.model.fields.[parentIdField]` is nullable, root items with be items whose `parentId` field values are `null`. If the `schema.model.fields.[parentIdField]` is *not* nullable, root items will be items which have a default value for their data type.
>
> When you use the `schema.model.fields` configuration, list all fields. Set the field which represents the `id` through the `schema.model.id`. If these are not set, they will still work for displaying data, but will post incomplete objects on the server when editing items.

### Bind to Local Arrays

The following example demonstrates how to initialize the TreeList and bind it to a local data array.

###### Example with a nullable parentId

```dojo
    <div id="treelist"></div>

    <!-- Initialize the TreeList -->
    <script>

      $(document).ready(function(){
        $("#treelist").kendoTreeList({
          columns: [
            { field: "parentId", width:150 },
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: {
            schema:{
              model:{
                id: "id",
                parentId:"parentId",
                fields:{
                  id: { type: "number"},
                  parentId: { type: "number", nullable:true }
                }
              }
            },
            data: [
              // Jane Smith is the root item because her parentId is null
              { id: 1, parentId: null, Name: "Jane Smith", Position: "CEO" },
              { id: 2, parentId: 1,    Name: "Alex Sells", Position: "EVP Sales" },
              { id: 3, parentId: 1,    Name: "Bob Price",  Position: "EVP Marketing" }
            ]
          }
        });
      });
    </script>
```

###### Example with a non-nullable parentId

```dojo
    <div id="treelist"></div>

    <!-- Initialize the TreeList -->
    <script>

      $(document).ready(function(){
        $("#treelist").kendoTreeList({
          columns: [
            { field: "parentId", width:150 },
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: {
            schema:{
              model:{
                id: "id",
                parentId:"parentId",
                fields:{
                  id: { type: "number"},
                  parentId: { type: "number", nullable:false }
                }
              }
            },
            data: [
              // Jane Smith is the root item because her parentId is 0 which is the default value for number types and the parentId field is NOT nullable
              { id: 1, parentId: 0, Name: "Jane Smith", Position: "CEO" },
              { id: 2, parentId: 1,    Name: "Alex Sells", Position: "EVP Sales" },
              { id: 3, parentId: 1,    Name: "Bob Price",  Position: "EVP Marketing" }
            ]
          }
        });
      });
    </script>

```

### Bind to Remote Data

You can also bind the `TreeListDataSource` to remote data. This means that the TreeList will load items from a web service. Remote data binding enables the retrieval of data from the server and the saving of the TreeList data items to the server database.

For additional information, refer to the article on the [Kendo UI DataSource]({% slug overview_kendoui_datasourcecomponent %}).

The following example demonstrates how to enable the remote binding for the TreeList by setting the DataSource `transport`.

> To lazy load the Kendo UI TreeList hierarchy, calculate and include the boolean [`hasChildren`](/api/javascript/data/treelistmodel/fields/haschildren) field on the server.

> When the user clicks on the expand icon, the Kendo UI TreeList DataSource requests the children of the item by sending the parent item `id` as a request parameter, for example `&id=1`.

> The parameter name can be changed with the [`paramaterMap`](/api/javascript/data/datasource/configuration/transport.parametermap) function. Example controller code in the [`kendo-ui-demos service`](https://github.com/telerik/kendo-ui-demos-service/blob/master/demos-and-odata-v3/KendoCRUDService/Controllers/EmployeeDirectoryController.cs)

###### Example

```dojo

    <div id="treelist"></div>

    <script>

        $(document).ready(function(){
            var serviceRoot = "https://demos.telerik.com/kendo-ui/service";

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
                        parentId: "ReportsTo",
                        fields: {
                            EmployeeId: { type: "number", editable: false, nullable: false },
                            ReportsTo: { type: "number", nullable: true },
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

## Features

### Client-Side Paging

The Kendo UI TreeList supports client-side paging for large sets of data. To enable the paging functionality, configure the [`pageable`](http://docs.telerik.com/kendo-ui/api/javascript/ui/treelist/configuration/pageable) settings.

> Remember to set a [`pageSize`](/api/javascript/data/datasource/configuration/pagesize). You can define a `pageSize` in the `pageable` or in the [`dataSource`](/api/javascript/ui/treelist/configuration/datasource) settings. If an already existing dataSource instance is passed to the TreeList, then the `pageSize` option has to be set in the dataSource settings and not in the `pageable` settings.

###### Example

    $(document).ready(function () {
        var service = "https://demos.telerik.com/kendo-ui/service";

        $("#treelist").kendoTreeList({
            dataSource: {
                transport: {
                    read: {
                        url: service + "/EmployeeDirectory/All",
                        dataType: "jsonp"
                    }
                },
                schema: {
                    model: {
                        id: "EmployeeId",
                        parentId: "ReportsTo",
                        expanded: true,
                        fields: {
                            ReportsTo: { nullable: true },
                            EmployeeId: { type: "number" },
                            HireDate: { field: "HireDate", type: "date" }
                        }
                    }
                }
            },
            height: 540,
            filterable: true,
            sortable: true,
            columns: [
                {
                    field: "FirstName", title: "Name",
                    template: "#: FirstName # #: LastName #"
                },
                { field: "Position" },
                { field: "HireDate", title: "Hire Date", format: "{0:MMMM d, yyyy}" }
            ],
            pageable: {
                pageSize: 15,
                pageSizes: true
            }
        });
    });

### Scrolling

By default, the scrolling is enabled. However, the enabled scrolling functionality does not guarantee the rendering of scrollbars because scrolling requires you to define some of the widget dimensions:

1. To achieve vertical scrolling, set a height to the TreeList. If the height is not defined, the TreeList will to expand vertically to show all rows.
2. To achieve horizontal scrolling, you have to explicitly defined the widths of all columns in pixels and their sum must exceed the width of the TreeList.

You can independently control vertical and horizontal scrolling.

When scrolling is enabled, the TreeList renders two tables&mdash;one for the header area and one for the scrollable data area. This ensures that the header area of the TreeList is always visible during vertical scrolling. Take the two tables into account when you need to manually make JavaScript or CSS updates to the Grid tables.

###### Example

    <div class="k-widget k-grid k-treelist">
        <div class="k-grid-header">
            <div class="k-grid-header-wrap">
                <table>...</table>
            </div>
        </div>
        <div class="k-grid-content">
            <table>...</table>
        </div>
    </div>

> **Important**
>
> To achieve a maximum level of accessibility with assistive technologies for the TreeList, disable the scrolling feature.

For more information on the scrolling functionality of the TreeList, refer to the article on the [appearance of the Grid]({% slug scrolling_kendoui_grid_widget %})&mdash;in this respect, the two widgets are similar.

* [Set 100% Height and Auto-Resize]({% slug height_kendoui_grid_widget %})
* [Remove the Vertical Scrollbar]({% slug scrolling_kendoui_grid_widget %})
* [Columns and Column Widths]({% slug column_widths_kendoui_grid_widget %})
* [Locked Columns]({% slug locked_columns_kendoui_grid_widget %})

More information about TreeList scrolling is available in the [Grid Appearance](/controls/data-management/grid/appearance) help article, as the two widgets are similar with this regard.

* [Set 100% Height and Auto-Resize](/controls/data-management/grid/appearance#set-100-height-and-auto-resize)
* [Remove the Vertical Scrollbar](/controls/data-management/grid/appearance#remove-the-vertical-scrollbar)
* [Columns and Column Widths](/controls/data-management/grid/appearance#columns)
* [Locked Columns](/controls/data-management/grid/appearance#locked-columns)

### Multicolumn Headers

The multicolumn headers of the Kendo UI TreeList for jQuery represent a tree-like structure where one or more columns can be grouped together by a common header.

That common header in turn can be a child of another upper `MultiColumn` header which can also span both columns and other headers. For more information, refer to the [demo on implementing multicolumn headers](https://demos.telerik.com/kendo-ui/treelist/multicolumnheaders).

###### Example

    columns: [
    {
        title: "Personal Info",
        columns: [
            { field: "name" },
            { field: "birthdate" }
        ]
    },
    {
        title: "Location",
        columns: [
            { field: "city" },
            { field: "country" }
        ]
    },
    {
        field: "phone"
    }]

The above definition will be presented in the following output:

<img src="multicolumn-headers.png">

## TreeList API

### Methods and Fields

The TreeList exposes a set of [methods](/api/javascript/ui/treelist#methods) and [fields](/api/javascript/ui/treelist#fields) you can use.

The following example demonstrates how to apply the [API of the TreeList](/api/javascript/ui/treelist).

###### Example

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

    // Get reference to the kendo.ui.TreeList instance
    var treelist = $("#treelist").data("kendoTreeList");

    // Use the expand method to expand the first row
    treelist.expand($("#treelist tbody>tr:eq(0)"));
    </script>
```

### Events

The TreeList supports a set of [events](/api/javascript/ui/treelist#events) you can subscribe to.

To handle the events, either:

* Specify the JavaScript function which will handle the event during the initialization of the widget, or
* Use the `bind` method of the widget after initialization.

The event handler is the JavaScript function invoked when the event is fired. The argument of the event handler is a JavaScript object which contains event-specific data. Get a reference of the widget, which fired the event, via the `sender` field of the event argument. The function context of the event handler (available via the `this` keyword) is set to the instance of the widget which fired the event.

The following example demonstrates how to subscribe to a TreeList event during the initialization of the widget.

###### Example

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

###### Example

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

## Reference

### Existing Instances

To refer to an existing TreeList instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method and pass `"kendoTreeList"` as an argument. Once a reference has been established, use the [API of the TreeList](/api/javascript/ui/treelist) to control its behavior.

The following example demonstrates how to access an existing TreeList instance.

###### Example

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
    // Get reference to the kendo.ui.TreeList instance
    var treelist = $("#treelist").data("kendoTreeList");
    </script>
```

## See Also

* [Overview of the ASP.NET MVC HtmlHelper Extension](/aspnet-mvc/helpers/treelist/overview)
* [Overview of the JSP Tag]({% slug overview_treelist_uiforjsp %})
* [Overview of the PHP Class](/php/widgets/treelist/overview)
* [How to Hide Edit Fields on Different Levels]({% slug howto_hideeditfieldsondifferentlevels_treelist %})
* [How to Show Checkbox Column]({% slug howto_showcheckboxcolumn_treelist %})
* [How to Show Context Menu]({% slug howto_showcontextmenu_treelist %})
* [How to Update Field in All Child Nodes]({% slug howto_updatefieldinallchildnodes_treelist %})
* [How to Update Field in All Child Nodes in AngularJS]({% slug howto_updatefieldinallchildnodes_angularjs_treelist %})
* [JavaScript API Reference](/api/javascript/ui/treelist)
