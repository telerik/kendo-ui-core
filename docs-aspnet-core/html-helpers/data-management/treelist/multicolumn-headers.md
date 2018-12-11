---
title: Multicolumn Headers
page_title: Multicolumn Headers | Kendo UI TreeList HtmlHelper for ASP.NET Core
description: "Learn how to apply the multicolumn headers feature to the Kendo UI TreeList HtmlHelper for ASP.NET Core."
slug: multicolumn_aspnetcore_treelist_helper
position: 3
---

# Multicolumn Headers

The multicolumn headers of the TreeList represent a tree-like structure where one or more columns can be grouped together by a common header.

That common header in turn can be a child of another upper `MultiColumn` header which can also span both columns and other headers. For more information, refer to the [demo on implementing multicolumn headers](https://demos.telerik.com/aspnet-core/treelist/multicolumnheaders).

###### Example

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

The above definition will be presented in the following output:

![TreeList multi column header](images/treelist-multicolumn-headers.png)

## See Also

* [JavaScript API Reference for the Kendo UI jQuery TreeList](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist)
* [UI for ASP.NET Core TreeList editing live demo](https://demos.telerik.com/aspnet-core/treelist/editing)
