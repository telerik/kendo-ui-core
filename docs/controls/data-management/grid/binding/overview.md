---
title: Basics
page_title: jQuery Grid Documentation | Data Binding Basics | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to disable the default data binding behavior and how to bind the Grid to local data arrays and to remote data sources."
previous_url: /data-binding
slug: data_binding_grid
position: 1
---

# Data Binding Basics

By default, the Kendo UI Grid for jQuery automatically binds to data.

Immediately after the Grid loads, the [DataSource]({% slug overview_kendoui_datasourcecomponent %}) sends a query and the data is loaded to the widget. To disable this behavior, set the `autoBind` option of the widget to `false`, as shown below.

###### Example

    $("#grid").kendoGrid({
        autoBind: false,
        // Other configuration.
    });

For more information about binding the Grid to data, refer to the articles on:
* [Local data binding]({% slug virtual_scrolling_kendoui_grid_widget %})
* [Remote data binding]({% slug endless_scrolling_kendoui_grid_widget %})

## See Also

* [Local Data Binding of the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/local-data-binding)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Knowledge Base Section](/knowledge-base)
