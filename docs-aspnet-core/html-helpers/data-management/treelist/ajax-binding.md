---
title: Ajax Binding
page_title: Ajax Binding | Kendo UI TreeList HtmlHelper for ASP.NET Core
description: "Learn the basics when working with the TreeList HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_treelist_aspnetcore_ajaxbinding
---

# Ajax Binding

This article demonstrates how to configure the Kendo UI TreeList extension for Ajax binding to make Ajax requests upon loading child nodes, sorting or filtering.

## Getting Started

When configured for Ajax binding, the Kendo UI TreeList for ASP.NET Core makes Ajax requests when doing sorting, filtering or when expanding a node.

### The Basics

The Ajax-bound mode has the following features:

- The TreeList retrieves only the data (in JSON format) representing the current level items.
- All column templates are executed client-side. They follow the [Kendo UI Template](http://docs.telerik.com/kendo-ui/framework/templates/overview) definition rules and may contain embedded JavaScript code.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI TreeList for ASP.NET Core to do Ajax binding.

1. Create a new ASP.NET Core Web Application. Follow the steps from the [introductory article]({% slug gettingstarted_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET Core to the application.
1. Open the `HomeController.cs` and add a new action method which will return the items as JSON. The TreeList makes Ajax requests to this action.

    ###### Example

        public IActionResult TreeList_Read()
        {
        }

1. Add a new parameter of type `Kendo.Mvc.UI.DataSourceRequest` to the action. It will contain the current TreeList request information about sorting, aggregates and filtering. Decorate that parameter with the `Kendo.Mvc.UI.DataSourceRequestAttribute`. This attribute will populate the `DataSourceRequest` object from the posted data. Now import the `Kendo.Mvc.UI` namespace. Also add another parameter which will indicate which parent node has been expanded.

    ###### Example

        public IActionResult TreeList_Read([DataSourceRequest]DataSourceRequest request, int? parentId)
        {
        }

1. Use the `ToTreeDataSourceResult` extension method to convert the items collection to a `Kendo.Mvc.UI.TreeDataSourceResult` object. This extension method will filter, sort, calculate aggregates and find only the current level items of your data using the information provided by the `DataSourceRequest` object. To use the `ToTreeDataSourceResult` extension method, import the `Kendo.Mvc.Extensions` namespace.

    ###### Example

        public JsonResult Index([DataSourceRequest] DataSourceRequest request, int? parentId)
        {
            var result = ((EmployeeDirectoryService) employeeDirectory).GetAllRemote().ToTreeDataSourceResult(request,
                e => e.EmployeeId,
                e => e.ReportsTo,
                e => id.HasValue ? e.ReportsTo == parentId : e.ReportsTo == null,
                e => e
            );

        }

1. Return the `TreeDataSourceResult` as JSON. Configure the Kendo UI TreeList for Ajax binding.

    ###### Example

        public JsonResult Index([DataSourceRequest] DataSourceRequest request, int? parentId)
        {
            var result = ((EmployeeDirectoryService) employeeDirectory).GetAllRemote().ToTreeDataSourceResult(request,
                e => e.EmployeeId,
                e => e.ReportsTo,
                e => id.HasValue ? e.ReportsTo == parentId : e.ReportsTo == null,
                e => e
            );

            return Json(result, JsonRequestBehavior.AllowGet);
        }

1. In the view, configure the TreeList to use the action method created in the previous steps.

    ###### Example

        @(Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryRemoteModel>()
            .Name("treelist")
            .Columns(columns =>
            {
                columns.Add().Field(f => f.FirstName).Width(250).Title("First Name");
                columns.Add().Field(e => e.LastName).Title("Last Name");
                columns.Add().Field(e => e.Position);
                columns.Add().Field(e => e.Extension).Title("Ext").Format("{0:#}");
            })
            .Filterable()
            .Sortable()
            .DataSource(dataSource => dataSource
                .Read(read => read.Action("Index", "EmployeeDirectory"))
                .Model(m => {
                    m.Id(f => f.EmployeeId);
                    m.ParentId(f => f.ReportsTo).Nullable(true);
                    m.Field(f => f.FirstName);
                    m.Field(f => f.LastName);
                    m.Field(f => f.ReportsTo);
                })
                .Aggregates(x=> x.Add(y=> y.BirthDate).Count())
            )
        )

1. Build and run the application.

## See Also

* [Overview of the TreeList HtmlHelper]({% slug htmlhelpers_treelist_aspnetcore %})
* [Overview of the Kendo UI TreeList Widget](http://docs.telerik.com/kendo-ui/controls/data-management/treelist/overview)
