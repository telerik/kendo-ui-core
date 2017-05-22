---
title: TreeList
page_title: TreeList | UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the TreeList Html helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_treelist_aspnetcore
---

# TreeList HtmlHelper

The TreeList HtmlHelper extension is a server-side wrapper for the [Kendo UI TreeList](http://demos.telerik.com/aspnet-mvc/treelist/index).

It enables the display of self-referencing tabular data and allows sorting, filtering, and data editing.

For more information on the HtmlHelper, refer to the article on the [TreeList HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/treelist/overview).

## Basic Usage

The following example demonstrates how to define the TreeList by using the TreeList Html helper and bind it to remote data.

###### Example

```tab-Controller

 public JsonResult All([DataSourceRequest] DataSourceRequest request)
    {
        var result = GetDirectory().ToTreeDataSourceResult(request,
            e => e.EmployeeId,
            e => e.ReportsTo,
            e => e
        );

        return Json(result, JsonRequestBehavior.AllowGet);
    }
```
```tab-Razor

@(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
    .Name("treelist")
    .Columns(columns =>
    {
        columns.Add().Field(f => f.FirstName).Width(250).Title("First Name");
        columns.Add().Field(e => e.LastName).Title("Last Name");
        columns.Add().Field(e => e.Position);
        columns.Add().Field(e => e.Extension).Title("Ext").Format("{0:#}");
    })
    .DataSource(dataSource => dataSource
        .Read(read => read.Action("Index", "EmployeeDirectory"))
        .Model(m => {
            m.Id(f => f.EmployeeId);
            m.ParentId(f => f.ReportsTo);
            m.Field(f => f.FirstName);
            m.Field(f => f.LastName);
            m.Field(f => f.ReportsTo);
        })
    )
)
```

## Configuration

The following example demonstrates the basic configuration for the TreeList with editing.

###### Example

```tab-Controller

	public JsonResult All([DataSourceRequest] DataSourceRequest request)
	{
	    var result = GetDirectory().ToTreeDataSourceResult(request,
	        e => e.EmployeeId,
	        e => e.ReportsTo,
	        e => e
	    );

	    return Json(result, JsonRequestBehavior.AllowGet);
	}
```
```tab-Razor

@(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
    .Name("treelist")
    .Toolbar(toolbar => toolbar.Create())
    .Columns(columns =>
    {
        columns.Add().Field(e => e.FirstName).Title("First Name").Width(220);
        columns.Add().Field(e => e.LastName).Title("Last Name").Width(100);
        columns.Add().Field(e => e.Position);
        columns.Add().Field(e => e.HireDate).Format("{0:MMMM d, yyyy}");
        columns.Add().Field(e => e.Phone);
        columns.Add().Field(e => e.Extension).Title("Ext").Format("{0:#}");
        columns.Add().Title("Edit").Width(250).Command(c =>
        {
            c.Edit();
            c.Destroy();
        })
        .HtmlAttributes(new {
            style = "text-align: center;"
        });
    })
    .Editable(e=>e.Mode("inline"))
    .DataSource(dataSource => dataSource
        .Create(create => create.Action("Create", "EmployeeDirectory"))
        .Read(read => read.Action("All", "EmployeeDirectory"))
        .Update(update => update.Action("Update", "EmployeeDirectory"))
        .Destroy(delete => delete.Action("Destroy", "EmployeeDirectory"))
        .Model(m => {
            m.Id(f => f.EmployeeId);
            m.ParentId(f => f.ReportsTo);
            m.Expanded(true);
            m.Field(f => f.FirstName);
            m.Field(f => f.LastName);
            m.Field(f => f.ReportsTo);
            m.Field(f => f.HireDate);
            m.Field(f => f.BirthDate);
            m.Field(f => f.Extension);
            m.Field(f => f.Position);
        })
    )
    .Height(540)
)
```

## See Also

* [JavaScript API Reference of the TreeList](../../../kendo-ui/api/javascript/ui/treelist)
* [TreeList HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/treelist/overview)
* [TreeList Official Demos](http://demos.telerik.com/aspnet-core/treelist/index)
* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
