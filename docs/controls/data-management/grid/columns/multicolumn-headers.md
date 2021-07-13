---
title: Multi-Column Headers
page_title: jQuery Grid Documentation | Multi-Column Headers
description: "Get started with the multicolumn headers feature of the jQuery Grid by Kendo UI allowing you to group together one or more columns by a common header."
previous_url: /appearance/columns/multicolumn-headers
slug: multicolumn_headers_kendoui_grid_widget
position: 4
---

# Multi-Column Headers

The multicolumn headers of the Grid represent a tree-like structure where the user can group one or more columns together by a common header.

For a runnable example, refer to the [demo on implementing multi-column headers in the Grid](https://demos.telerik.com/kendo-ui/grid/multicolumnheaders).

That common header in turn can be a child of another upper `MultiColumn` header which can also span both columns and other headers. For more information, refer to the [demo on implementing multicolumn headers](https://demos.telerik.com/kendo-ui/grid/multicolumnheaders).

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

The previous example results in the following output.

<img src="multicolumn-headers.png">

## KB Articles on Column Headers

* [Hiding Columns on Clicking the Headers and Restore Them on Clicking a Button]({% slug howto_hide_columns_and_subcolumns_grid %})
* [Find Out More in the Knowledge Base](/knowledge-base)

## See Also

* [Implementing Multi-Column Headers in the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/multicolumnheaders)
* [Multicolumn Headers API Reference](/api/javascript/ui/grid/configuration/columns.columns)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
