---
title: Multi-Column Headers
page_title: jQuery TreeList Documentation | Multi-Column Headers
description: "Get started with the jQuery TreeList by Kendo UI and implement multi-column headers in the widget."
slug: multicolumnheaders_kendoui_treelist
position: 6
---

# Multi-Column Headers

The multi-column headers of the TreeList represent a tree-like structure where one or more columns can be grouped together by a common header.

That common header in turn can be a child of another upper `MultiColumn` header which can also span both columns and other headers. For a runnable example, refer to the [demo on implementing multi-column headers in the TreeList](https://demos.telerik.com/kendo-ui/treelist/multicolumnheaders).

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

The previous example will present the following output.

<img src="multicolumn-headers.png">

## See Also

* [Rendering Multi-Column Headers in the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/multicolumnheaders)
* [TreeList JavaScript API Reference](/api/javascript/ui/treelist)
