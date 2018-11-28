---
title: Client-side paging
page_title: Client-side paging | Kendo UI TreeList HtmlHelper
description: "Learn how to enable the client-side paging feature to the Kendo UI TreeList for ASP.NET MVC."
slug: client_side_paging_mvc_treelist_helper
position: 4
---

# Client-side paging

The TreeList supports client-side paging for large sets of data. To enable the paging functionality configure the [Pageable settings](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/TreeListPageableSettingsBuilder).

> * Don't forget to set a [`PageSize`](http://kendobuild-staging.openstack.progress.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/TreeListPageableSettingsBuilder#methods-PageSize(System.Double)). A `PageSize` can be defined in the `Pageable` settings, or in the [`DataSource`](http://kendobuild-staging.openstack.progress.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/AjaxDataSourceBuilderBase#methods-PageSize(System.Int32)) settings. If an already existing datasource instance is passed to the treelist, then the `PageSize` option should be set in the dataSource's settings and not in the `Pageable` settings.
> * When using the Grid MVC wrapper, by default [`ServerOperations`] (http://kendobuild-staging.openstack.progress.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/AjaxDataSourceBuilderBase#methods-ServerOperation(System.Boolean))    are enabled. As this is a client-side paging, it is necessary to disable the server operations by setting the `ServerOperations` to false.

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


> * When client-side paging is used with editing and an item is added, if the "id" field of the model should be nullable (e.g. `int?`), then the model should be configured to have a default "id" field value on the client-side that is **different** from the default "parentId" field value. This is required as root TreeList items have their "parentId" field set to the default value for no parent (by default this is equal to `null`, but can be configured from the `dataSource.schema.model.fields[FIELD_NAME].defaultValue` option). If this is the case, the default value of the "id" field (null) will be equal to the default "parentId" field value (null), which creates a circular dependency. Setting the default "id" field to a different value (e.g. zero) can be done instead.

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

Other articles and how-to examples on the Kendo UI TreeList:

* [JavaScript API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist)
