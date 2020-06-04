---
title: Search Panel
page_title: jQuery Grid Documentation | Search Panel | Kendo UI 
description: "Get started with the jQuery Grid by Kendo UI and learn how to enable search panel to search through its data."
slug: searchpanel_kendoui_grid_widget
position: 5
---

# Search Panel

The Grid widget has a built-in feature that enables the users to search through the data. The Search Panel uses filtering under the hood to show only the relevant records in the Grid.

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

## Known Limitations

* When filtering is enabled in the filter textboxes for all Grid columns will be populated with the value entered in the search textbox.
* When the server operations are enabled, you can search only by using string fields. Using the `Contains` filter operation is available only for string types.

## See Also

* [Search Panel in the KendoUI Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/search-panel)
* [JavaScript API Reference of the KendoUI Grid](/api/javascript/ui/grid)
