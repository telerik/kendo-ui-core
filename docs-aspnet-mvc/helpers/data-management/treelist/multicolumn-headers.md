---
title: Multicolumn Headers
page_title: Multicolumn Headers | Telerik UI TreeList HtmlHelper for ASP.NET MVC
description: "Learn how to apply the multicolumn headers feature to the Telerik UI TreeList HtmlHelper for ASP.NET MVC."
slug: multicolumn_headers_mvc_treelist_helper
position: 3
---

# Multicolumn Headers

The multi-column headers of the TreeList represent a tree-like structure where one or more columns can be grouped together by a common header.

That common header in turn can be a child of another upper `MultiColumn` header which can also span both columns and other headers. For a runnable example, refer to the [demo on implementing multi-column headers in the TreeList](https://demos.telerik.com/aspnet-mvc/treelist/multicolumnheaders).

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

![Multi-column headers](images/treelist-multicolumn-headers.png)

## See Also

* [Implementing Multi-Column Headers in the TreeList HtmlHelper for ASP.NET MVC](https://demos.telerik.com/aspnet-mvc/treelist/multicolumnheaders)
* [TreeList Server-Side API](/api/treelist)
* [TreeList Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist)
