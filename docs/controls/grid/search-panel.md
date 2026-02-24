---
title: Search Panel
page_title: jQuery Grid Documentation - Search Panel | Kendo UI 
description: "Get started with the jQuery Grid by Kendo UI and learn how to enable search panel to search through its data."
components: ["grid"]
slug: searchpanel_kendoui_grid_widget
position: 7
---

The Grid component has built-in search functionality that you can use through either the SmartBox Search mode or the Search Panel in the toolbar. Both options rely on Grid filtering to show only the relevant records.

## SmartBox Search

The Grid search functionality is available in the [AI Smart Box](slug:ai_toolbar_tool_kendoui_grid). The Smart Box Search mode uses the same Grid [`search`](/api/javascript/ui/grid/configuration/search) configuration, including [`search.fields`](/api/javascript/ui/grid/configuration/search.fields) and field operators.

To enable it, add the Smart Box tool to the Grid toolbar and configure the [`smartBox.searchSettings`](/api/javascript/ui/grid/configuration/smartbox.searchsettings) option.

```javascript
    $("#grid").kendoGrid({
        toolbar: ["smartBox"],
        search: {
            fields: [
                { name: "name", operator: "contains" },
                { name: "age", operator: "eq" }
            ]
        },
        smartBox: {
            activeMode: "Search",
            searchSettings: {
                enabled: true
            }
        }
    });
```

For additional Smart Box search capabilities, such as Semantic Search mode, refer to [Semantic Search](slug:smartbox_semantic_search_mode).

## Search Panel

> Search Panel functionality is available as of [`Kendo UI R3 2019`](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-r3-2019) release.

### Getting Started

To enable the functionality include the `search` option to the toolbar configuration.

In addition it is possible to customize which fields to search when a value is entered in the search input.

    $("#grid").kendoGrid({
        toolbar: ["search"],
        search: {
            fields: ["ContactTitle"]
        }
        ...
    });

### Specify the filter operator

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


### Known Limitations

* When filtering is enabled in the filter textboxes for all Grid columns will be populated with the value entered in the search textbox.

### See Also

* [Search Panel in the KendoUI Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/search-panel)
* [JavaScript API Reference of the KendoUI Grid](/api/javascript/ui/grid)
* [Grid Search API](/api/javascript/ui/grid/configuration/search)
* [Grid SmartBox API](/api/javascript/ui/grid/configuration/smartbox)
* [AI Smart Box](slug:ai_toolbar_tool_kendoui_grid)
* [Smart Grid Overview](slug:overview_smart_grid)
