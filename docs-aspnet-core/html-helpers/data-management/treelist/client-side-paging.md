---
title: Client-Side Paging
page_title: Client-Side Paging | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn how to enable the client-side paging feature to the Kendo UI TreeList HtmlHelper for ASP.NET Core."
slug: client_side_paging_aspnetcore_treelist_helper
position: 4
---

# Client-Side Paging

The TreeList supports client-side paging for large sets of data.

To enable the paging functionality, configure the `Pageable` settings.

> **Important**
> * Remember to set a `PageSize`. You can define a `PageSize` in the `Pageable` or in the `DataSource` settings. If an already existing dataSource instance is passed to the TreeList, then the `PageSize` option has to be set in the dataSource settings and not in the `Pageable` settings.
> * By default, `ServerOperations` are enabled in the Grid ASP.Net Core wrapper. For client-side paging you have to disable the server operations by setting the `ServerOperations` to `false`.

###### Example

    @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
        .Name("treelist")
        .Columns(columns =>
        {
            columns.Add().Field(e => e.FirstName).Title("Name").Template("#: FirstName # #: LastName #");            
            columns.Add().Field(e => e.Position);
            columns.Add().Field(e => e.HireDate).Format("{0:MMMM d, yyyy}");
        })
        .Filterable()
        .Sortable()
        .DataSource(dataSource => dataSource
            .ServerOperation(false)
            .Read(read => read.Action("All", "EmployeeDirectory"))
            .Model(m => {
                m.Id(f => f.EmployeeId);
                m.ParentId(f => f.ReportsTo);                
                m.Field(f => f.ReportsTo);
                m.Expanded(true);
            })
        )
        .Height(540)
        .Pageable(p => p.PageSize(15)
                        .PageSizes(true)
        )
    )

## See Also

* [JavaScript API Reference for the Kendo UI jQuery TreeList](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist)
* [UI for ASP.NET Core TreeList editing live demo](https://demos.telerik.com/aspnet-core/treelist/editing)
