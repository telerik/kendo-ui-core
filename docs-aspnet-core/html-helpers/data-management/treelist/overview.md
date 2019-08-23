---
title: Overview
page_title: TreeList Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn the basics when working with the Telerik UI TreeList HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/treelist
slug: htmlhelpers_treelist_aspnetcore
position: 1
---

# TreeList HtmlHelper Overview

The Telerik UI TreeList HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI TreeList widget.

The TreeList enables the display of self-referencing tabular data and allows sorting, filtering, and data editing.

* [Demo page for the TreeList](https://demos.telerik.com/aspnet-core/treelist/index)

## Initializing the TreeList

The following example demonstrates how to define the TreeList by using the TreeList HtmlHelper.

> The TreeList HtmlHelper distinguishes the root items based on the `ParentId` field. If the `ParentId` is set as `.Nullable(true)`, root items with be items whose `ParentId` field values are `null`. If the `ParentId` is not nullable (`.Nullable(false)`), root items will be items which have a default value for their data type.

```Model
    public class EmployeeViewModel
    {
        // The Id.
        public int EmployeeID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        // A nullable ParentId.
        public int? ReportsTo { get; set; }

        public string Address { get; set; }

        // This is a case-sensitive property. Define it only if you want to use lazy-loading.
        // If it is not defined, the TreeList will calculate and assign its value on the client.
        public bool hasChildren { get; set; }
    }
```
```Controller
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
```Razor
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
            m.ParentId(f => f.ReportsTo).Nullable(true);
            m.Field(f => f.FirstName);
            m.Field(f => f.LastName);
            m.Field(f => f.ReportsTo);
        })
    )
)
```

## Basic Configuration

The following example demonstrates the basic configuration for the TreeList HtmlHelper.

```Controller
	public JsonResult All([DataSourceRequest] DataSourceRequest request)
	{
	    var result = GetDirectory().ToTreeDataSourceResult(request,
	        e => e.EmployeeId,
	        e => e.ReportsTo,
	        e => e
	    );

	    return Json(result, JsonRequestBehavior.AllowGet);
	}

    public JsonResult Destroy([DataSourceRequest] DataSourceRequest request, EmployeeDirectoryModel employee)
    {
        // Delete from database. Return the deleted item in an array and call the ToTreeDataSourceResult() method.
        return Json(new[] { employee }.ToTreeDataSourceResult(request, ModelState));
    }

    public JsonResult Create([DataSourceRequest] DataSourceRequest request, EmployeeDirectoryModel employee)
    {
        // Create in the database. Return the created item with an Id/ParentId fields in an array and call the ToTreeDataSourceResult() method.
        return Json(new[] { employee }.ToTreeDataSourceResult(request, ModelState));
    }

    public JsonResult Update([DataSourceRequest] DataSourceRequest request, EmployeeDirectoryModel employee)
    {
        // Update in database. Return the updated item in an array and call the ToTreeDataSourceResult() method.
        return Json(new[] { employee }.ToTreeDataSourceResult(request, ModelState));
    }
```
```Razor
@(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
    .Name("treelist")
    .Toolbar(toolbar => toolbar.Create())
    .Columns(columns =>
    {
        columns.Add().Field(e => e.FirstName).Title("First Name").Width(220);
        columns.Add().Field(e => e.LastName).Title("Last Name").Width(100);
        columns.Add().Field(e => e.HireDate).Format("{0:MMMM d, yyyy}");
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
            m.ParentId(f => f.ReportsTo).Nullable(false);
            m.Expanded(true);
        })
    )
    .Height(540)
)
```

## Functionality and Features

* [Ajax binding]({% slug htmlhelpers_treelist_aspnetcore_ajaxbinding %})
* [Editing]({% slug editing_aspnetcore_treelist_helper %})
* [Paging]({% slug client_side_paging_aspnetcore_treelist_helper %})
* [Multi-column headers]({% slug multicolumn_aspnetcore_treelist_helper %})

## Events

You can subscribe to all TreeList [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist#events). For a complete example on basic TreeList events, refer to the [demo on using the events of the TreeList](https://demos.telerik.com/aspnet-core/treelist/events).

```Razor
    @(Html.Kendo().TreeList<KendoTreeListBinding.Models.EmployeeViewModel>()
        .Name("treelist")
        /* Other configurations. */
        .Events(events => {
            events.DataBinding("onDataBinding");
            events.DataBound("onDataBound");
        })
    )
    <script>
        function onDataBinding(e) {
            // Handle the dataBinding event.
            var treelist = this;
        }

        function onDataBound(e) {
            // Handle the dataBound event.
            var treelist = e.sender;
        }
    </script>
```

## Referencing Existing Instances

To reference an existing Kendo UI TreeList instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [TreeList API](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist#methods) to control its behavior.

    @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
        .Name("treelist")
        /* Other configurations. */
    )
    <script>
        $(function() {
            // The Name() of the TreeList is used to get its client-side instance.
            var treelist = $("#treelist").data("kendoTreeList");
        });
    </script>

## See Also

* [Basic Usage of the TreeList HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/treelist/index)
* [Server-Side API](/api/treelist)
