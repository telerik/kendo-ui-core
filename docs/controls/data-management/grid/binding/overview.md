---
title: Overview
page_title: jQuery Grid Documentation | Data Binding Overview
description: "Get started with the jQuery Grid by Kendo UI and learn how to disable the default data binding behavior and how to bind the Grid to local data arrays and to remote data sources."
previous_url: /data-binding
slug: data_binding_grid
position: 1
---

# Data Binding Overview

By default, the Kendo UI Grid for jQuery automatically binds to data.

Immediately after the Grid loads, the [DataSource]({% slug overview_kendoui_datasourcecomponent %}) sends a query and the data is loaded to the widget. To disable this behavior, set the `autoBind` option of the widget to `false`, as shown below.

    $("#grid").kendoGrid({
        autoBind: false,
        // Other configuration.
    });

For more information about binding the Grid to data, refer to the articles on:
* [Local data binding]({% slug local_data_grid %})
* [Remote data binding]({% slug remote_data_binding_grid %})

## KB Articles on Binding

* [Using Nested Model Properties]({% slug howto_use_nested_model_properties_grid %})
* [Loading and Appending More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [Find Out More in the Knowledge Base](/knowledge-base)

## See Also

* [Local Data Binding of the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/local-data-binding)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Knowledge Base Section](/knowledge-base)
