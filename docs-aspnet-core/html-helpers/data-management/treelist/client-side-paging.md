---
title: Client-Side Paging
page_title: Client-Side Paging | Kendo UI TreeList HtmlHelper for ASP.NET Core
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

The root TreeList items have their `parentId` field set to the default value for no parent. By default, the value is `null` and can be configured through the `dataSource.schema.model.fields[FIELD_NAME].defaultValue` option.

> **Important**
>
> If you use client-side paging together with editing, the user adds an item, and the `id` field of the model has to be nullable (for example, `int?`), then you have to configure the model so that it features a default `id` field value on the client-side which is different from the default `parentId` field value. In such cases, the default value of the `id` field (`null`) will equal the default `parentId` field value (`null`) which creates a circular dependency. To avoid this issue, set the default `id` field to a different value&mdash;for example, `zero`.

###### Example

    @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
        .Name("treelist")
        ...
        .DataSource(dataSource => dataSource
            .ServerOperation(false)
            .Read(read => read.Action("All", "EmployeeDirectory"))
            .Model(m => {
                // assuming the "EmployeeId" field is equal to null by default and
                // the default value of the "ReportsTo" field is also null
                m.Field(f => f.EmployeeId).DefaultValue(0);
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

* [API Reference of the Kendo UI TreeList for jQuery](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist)
* [Demo on UI for ASP.NET Core TreeList Editing](https://demos.telerik.com/aspnet-core/treelist/editing)
