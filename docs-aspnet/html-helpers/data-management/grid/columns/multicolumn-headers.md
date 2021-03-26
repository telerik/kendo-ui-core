---
title: Multi-Column Headers
page_title: Multi-Column Headers
description: "The Multi-Column Header feature of the Telerik UI Grid component for {{ site.framework }} allows you to group one or more columns under a common higher-level header."
slug: multicolumn_headers_aspnetcore_grid
position: 5
---

# Multi-Column Headers

The multicolumn headers of the Grid represent a tree-like structure where the user can group one or more columns together by a common header.

For a runnable example, refer to the [demo on implementing multi-column headers in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/multicolumnheaders).

That common header in turn can be a child of another upper `MultiColumn` header which can also span both columns and other headers.

        .Columns(columns =>
        {
            columns.Group(colGroup =>
            {
                colGroup.Title("Ship Information");
                colGroup.Columns(cols =>
                {
                    cols.Bound(f => f.OrderID).Width(200);
                    cols.Bound(f => f.ShipCountry).Width(200);
                });
            });
        })

The previous example results in the following output.

![A Telerik UI Grid HtmlHelper for {{ site.framework }} with a column group](colgroup.png)

## See Also

* [Implementing Multi-Column Headers in the Grid (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/multicolumnheaders)
* [Server-Side API](/api/grid)
