---
title: Loading and expanding only the first level data in the TreeList
description: Learn how to load the Telerik UI for {{ site.framework }} TreeList expanded initially up to a certain point (level in the hierarchy).
type: how-to
page_title: Loading and expanding only the first level data in the TreeList
slug: treelist-load-and-expand-one-level-of-data
ticketid: 1627637
tags: treelist, expand, partial, read, request, node, root, level, initially, load, only, telerik, core, mvc
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} TreeList</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.3.1010 version</td>
 </tr>
</table>

## Description

How do I expand only the first item on page load in the Telerik UI for {{ site.framework }} TreeList.

## Solution

To achieve the desired results:

1. Set the TreeList [`AutoBind()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/treelistbuilder#autobindsystemboolean) property explicitly to `false`.
1. Make a read request (the custom call which will return the initial data) by using the client-side dataSource's [`read()`](/api/javascript/data/datasource/methods/read) method.
1. Use the client-side TreeListDataSource's [`load()`](/api/javascript/data/treelistdatasource/methods/load) method to load the root.
1. To expand only the items which are in the view, use the client-side [`expand()`](/api/javascript/ui/treelist/methods/expand) method - this will not make a request for non-loaded items.


```Index.cshtml
    @(Html.Kendo().TreeList<EmployeeDirectoryRemoteModel>()
        .Name("treelist")
        .Columns(columns =>
        {
            columns.Add().Field(f => f.FirstName).Width(250);
            columns.Add().Field(e => e.LastName);
            columns.Add().Field(e => e.Position);
            columns.Add().Field(e => e.Extension).Title("Ext").Format("{0:#}");
        })
        .AutoBind(false)
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
```Script.js
    <script>
        $(document).ready(function () {

            setTimeout(function () {
                var treelist = $("#treelist").data("kendoTreeList");

                treelist.dataSource.read().then(function () {
                    var root = treelist.dataSource.at(0); // Gather the root return treelist.dataSource.load(root); // Load the root item.
    
                }).then(function () {
                    var root = treelist.dataSource.at(0); // Obtain the root item.
                    var children = treelist.dataSource.childNodes(root); // Get a reference of the child nodes.
                    treelist.expand(treelist.items());  // Expand the items that are only within the boundaries of the view.
                });
            })
        })
    </script>
```
{% if site.core %}
```Controller.cs
	public class EmployeeDirectoryController : Controller
    {
        private IEmployeeDirectoryService employeeDirectory;

        public EmployeeDirectoryController(
            IEmployeeDirectoryService service)
        {
            employeeDirectory = service;
        }

        public JsonResult Index([DataSourceRequest] DataSourceRequest request, int? id)
        {
            var result = ((EmployeeDirectoryService)employeeDirectory).GetAllRemote().ToTreeDataSourceResult(request,
                e => e.EmployeeId,
                e => e.ReportsTo,
                e => id.HasValue ? e.ReportsTo == id : e.ReportsTo == null,
                e => e
            );

            return Json(result);
        }
    }
```
{% else %}
```Controller.cs
    public class EmployeeDirectoryController : Controller
    {
        private EmployeeDirectoryService employeeDirectory;

        public EmployeeDirectoryController()
        {
            employeeDirectory = new EmployeeDirectoryService(new DemoDBContext());
        }

        public JsonResult Index([DataSourceRequest] DataSourceRequest request, int? id)
        {
            var result = ((EmployeeDirectoryService) employeeDirectory).GetAllRemote().ToTreeDataSourceResult(request,
                e => e.EmployeeId,
                e => e.ReportsTo,
                e => id.HasValue ? e.ReportsTo == id : e.ReportsTo == null,
                e => e
            );

            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
```
{% endif %}

## More {{ site.framework }} TreeList Resources
* [{{ site.framework }} TreeList Documentation]({% slug htmlhelpers_treelist_aspnetcore %})
* [{{ site.framework }} TreeList Demos](https://demos.telerik.com/{{ site.platform }}/treelist/index)
{% if site.core %}
* [{{ site.framework }} TreeList Product Page](https://www.telerik.com/aspnet-core-ui/treelist)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)
{% else %}
* [{{ site.framework }} TreeList Product Page](https://www.telerik.com/aspnet-mvc/treelist)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the TreeList for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist)
* [Server-Side API Reference of the TreeList for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/treelist)
* [Server-Side TagHelper API Reference of the TreeList for {{ site.framework }}](https://docs.telerik.com/aspnet-core/api/taghelpers/treelist)
* [Telerik REPL: Load and expand only the first level data in the TreeList](https://netcorerepl.telerik.com/wxFEQyOL10jhfbhi36)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)