---
title: Search Panel
page_title: jQuery Grid Documentation - Search Panel | Kendo UI 
description: "Get started with the jQuery Grid by Kendo UI and learn how to enable search panel to search through its data."
slug: searchpanel_kendoui_grid_widget
position: 7
---

# Search Panel

The Grid component has a built-in feature that enables the users to search through the data. The Search Panel uses filtering under the hood to show only the relevant records in the Grid.

> Search Panel functionality is available as of [`Kendo UI R3 2019`](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-r3-2019) release.

## Getting Started

To enable the functionality include the `search` option to the toolbar configuration.

In addition it is possible to customize which fields to search when a value is entered in the search input.

    $("#grid").kendoGrid({
        toolbar: ["search"],
        search: {
            fields: ["ContactTitle"]
        }
        ...
    });

## Specify the filter operator

As of Kendo UI 2021 R3 SP1, you can specify filter operators for each filter type. With this update, you can filter non-string types.

The following example demonstrates how to specify which fields to include in the search

    $("#grid").kendoGrid({
        columns: [
            { field: "name" },
            { field: "age" }
        ],
        dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
        toolbar:["search"],
        search: {
            fields: ["name"] // Or, specify multiple fields by adding them to the array, e.g ["name", "age"]
        }
    });

The following example demonstrates how to specify the operator for the field that will be used in the filter expression.

    $("#grid").kendoGrid({
        columns: [
            { field: "name" },
            { field: "age" }
        ],
        dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
        toolbar:["search"],
        search: {
            fields: ["name", { name: "age", operator: "eq" }]
        }
    });


## Known Limitations

* When filtering is enabled in the filter textboxes for all Grid columns will be populated with the value entered in the search textbox.

## See Also

* [Search Panel in the KendoUI Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/search-panel)
* [JavaScript API Reference of the KendoUI Grid](/api/javascript/ui/grid)
