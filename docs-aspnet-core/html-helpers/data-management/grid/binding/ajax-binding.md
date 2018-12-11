---
title: Ajax Binding
page_title: Ajax Binding | Kendo UI Grid HtmlHelper for ASP.NET Core
description: "Learn how to implement Ajax Binding with Kendo UI Grid HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_grid_aspnetcore_ajaxbinding
previous_url: /aspnet-core/helpers/html-helpers/grid/ajax-binding
---

# Ajax Binding

This article demonstrates how to configure the Kendo UI Grid extension for Ajax binding to make Ajax requests upon paging, sorting, filtering, or grouping.

## Getting Started

When configured for Ajax binding, the Kendo UI Grid for ASP.NET Core makes Ajax requests when doing paging, sorting, filtering, grouping, or when saving data.

### The Basics

The Ajax-bound mode has the following features:

 - The Grid retrieves only the data (in JSON format) representing the current page. As a result, only the Grid is updated.
 - All Grid templates (column, detail) are executed client-side. They follow the [Kendo UI Template](http://docs.telerik.com/kendo-ui/framework/templates/overview) definition rules and may contain embedded JavaScript code.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Grid for ASP.NET Core to do Ajax binding to the Northwind database, the **Products** table.

1. Create a new ASP.NET Core Web Application. Follow the steps from the [introductory article]({% slug gettingstarted_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET Core to the application.
1. Install the EntityFrameworkCore NuGet package
1. Install Microsoft.EntityFrameworkCore.SqlServer package
1. Run the following command in the Package Management Console. It will generate models from the tables in a database called 'Sample'. For more information on scaffolding a model from an existing database refer to [this Microsoft article](https://docs.microsoft.com/en-us/ef/core/get-started/aspnetcore/existing-db#reverse-engineer-your-model).

    Scaffold-DbContext "Server=.\SQLSERVER;Database=Sample;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models

1. Open the `HomeController.cs` and add a new action method which will return the Products as JSON. The Grid makes Ajax requests to this action.

    ###### Example

        public IActionResult Customers_Read()
        {
        }

1. Add a new parameter of type `Kendo.Mvc.UI.DataSourceRequest` to the action. It will contain the current Grid request information&mdash;page, sort, group, and filter. Decorate that parameter with the `Kendo.Mvc.UI.DataSourceRequestAttribute`. This attribute will populate the `DataSourceRequest` object from the posted data. Now import the `Kendo.Mvc.UI` namespace.

    ###### Example

        public IActionResult Customers_Read([DataSourceRequest]DataSourceRequest request)
        {
        }

1. Use the `ToDataSourceResult` extension method to convert the Products to a `Kendo.Mvc.UI.DataSourceResult` object. This extension method will page, filter, sort, or group your data using the information provided by the `DataSourceRequest` object. To use the `ToDataSourceResult` extension method, import the `Kendo.Mvc.Extensions` namespace.

    ###### Example

        public ActionResult Customers_Read([DataSourceRequest]DataSourceRequest request)
        {
            using (var northwind = new SampleContext())
            {
                IEnumerable<Customers> customers = northwind.Customers;
                DataSourceResult result = customers.ToDataSourceResult(request);
            }
        }

1. Return the `DataSourceResult` as JSON. Configure the Kendo UI Grid for Ajax binding.

    ###### Example

        public ActionResult Customers_Read([DataSourceRequest]DataSourceRequest request)
        {
            using (var northwind = new SampleContext())
            {
                IEnumerable<Customers> customers = northwind.Customers;
                DataSourceResult result = customers.ToDataSourceResult(request);
                return Json(result);
            }
        }

1. In the view, configure the Grid to use the action method created in the previous steps.

    ###### Example

        @(Html.Kendo().Grid<KendoGridAjaxBinding.Models.Customers>()
              .Name("grid")
              .DataSource(dataSource => dataSource //Configure the Grid data source.
                  .Ajax() //Specify that Ajax binding is used.
                  .Read(read => read.Action("Customers_Read", "Home")) //Set the action method which will return the data in JSON format.
               )
              .Columns(columns =>
              {
                  //Create a column bound to the ProductID property.
                  columns.Bound(product => product.ProductID);
                  //Create a column bound to the ProductName property.
                  columns.Bound(product => product.ProductName);
                  //Create a column bound to the UnitsInStock property.
                  columns.Bound(product => product.UnitsInStock);
              })
              .Pageable() // Enable paging
              .Sortable() // Enable sorting
        )

1. Build and run the application.


## See Also

* [Overview of the Grid HtmlHelper]({% slug htmlhelpers_grid_aspnetcore_overview %})
* [Overview of the Kendo UI Grid Widget](http://docs.telerik.com/kendo-ui/controls/data-management/grid/overview)
