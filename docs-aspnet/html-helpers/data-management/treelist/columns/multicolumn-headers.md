---
title: Multi-Column Headers
page_title: Multi-Column Headers
description: "Learn how to apply the multi-column header feature to the Telerik UI TreeList HtmlHelper for {{ site.framework }}."
previous_url: /html-helpers/data-management/treelist/multicolumn-headers, /helpers/data-management/treelist/multicolumn-headers
slug: multicolumn_aspnetcore_treelist_helper
position: 3
---

# Multi-Column Headers

The multi-column headers of the TreeList represent a tree-like structure where one or more columns can be grouped together by a common header.

That common header in turn can be a child of another upper `MultiColumn` header which can also span both columns and other headers. For a runnable example, refer to the [demo on implementing multi-column headers in the TreeList](https://demos.telerik.com/{{ site.platform }}/treelist/multicolumnheaders).

    columns.Group(group => group
        .Title("Personal Info")
        .Columns(info =>
        {
            info.Add().Field(x => x.LastName).Width(120);
            info.Group(g => g
                .Title("Location")
                .Columns(location =>
                {
                    location.Add().Field(c => c.City).Width(140);
                    location.Add().Field(c => c.Country).Width(140);
                })
            );
            info.Add().Field(x => x.Phone);
        })
    );

The previous example will present the following output.

![TreeList multi-column headers](../images/treelist-multicolumn-headers.png)

## See Also

* [Implementing Multi-Column Headers in the TreeList HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/treelist/multicolumnheaders)
* [Server-Side API](/api/treelist)
