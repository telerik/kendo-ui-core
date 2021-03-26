---
title: ForeignKey Column
page_title: jQuery Grid Documentation | ForeignKey Column
description: "Get started with the jQuery Grid by Kendo UI and learn how to set up the ForeignKey column."
slug: foreignkeycolumn_kendoui_grid_widget
position: 10
---

# ForeignKey Column

The ForeignKey column functionality of the Kendo UI Grid is primarily used for matching the value of a bound property to a desired text field from an external for the grid collection. It follows the convention of the SQL ForeignKey functionality that is used for linking two tables based on a foreign key.

The foreign values for the columns of the grid could be supplied in two ways:

* [Binding to a local collection](#binding-to-a-local-collection)
* [Binding to a remote collection](#binding-to-a-remote-collection)

## Binding to a Local Collection

Binding the column to a local collection of items can be done via the [column.values](/api/javascript/ui/grid/configuration/columns.values) option. 

```
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
    columns: [
        { field: "productName" },
        { field: "category", values: [
        { text: "Beverages", value: 1 },
        { text: "Food", value: 2 }
        ] }
    ],
    dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
    ]
    });
    </script>
```

## Binding to a Remote Collection

In order to bind the column to a remote collection of items, supply the [column.dataSource](/api/javascript/ui/grid/configuration/columns.dataSource) option. It is mandatory to supply the [columns.dataValueField](/api/javascript/ui/grid/configuration/columns.dataValueField) and [columns.dataTextField](/api/javascript/ui/grid/configuration/columns.dataTextField) options in order to ensure that the column values will be bound to the correct foreign value. 

```
columns:[{ 
        field: "CategoryID",
        width: "200px",
        dataTextField: "CategoryName",
        dataValueField: "CategoryID",
        dataSource: {
                        type: "odata",
                        transport: {
                            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
                        }
                    },
        title: "Category" 
    }]
```


## See Also

* [Foreign Key Column Local Binding (Demo)](https://demos.telerik.com/kendo-ui/grid/foreignkeycolumn)
* [Foreign Key Column Remote Binding (Demo)](https://demos.telerik.com/kendo-ui/grid/foreignkeycolumnbinding)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
