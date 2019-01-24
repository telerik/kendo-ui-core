---
title: Multicolumn Headers
page_title: jQuery Grid Documentation | Multicolumn Headers | Kendo UI
description: "Get started with the multicolumn headers feature of the jQuery Grid by Kendo UI allowing you to group together one or more columns by a common header."
slug: multicolumn_headers_kendoui_grid_widget
position: 4
---

# Multicolumn Headers

The multicolumn headers of the Kendo UI Grid for jQuery represent a tree-like structure where one or more columns can be grouped together by a common header.

That common header in its turn can be a child of another upper `MultiColumn` header which can also span both columns and other headers. For more information, refer to the [demo on implementing multicolumn headers](https://demos.telerik.com/kendo-ui/grid/multicolumnheaders).

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

## See Also

* [Multicolumn Headers API Reference](/api/javascript/ui/grid/configuration/columns.columns)
* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
