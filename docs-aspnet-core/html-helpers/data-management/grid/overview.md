---
title: Overview
page_title: Grid | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Grid HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/grid
slug: htmlhelpers_grid_aspnetcore_overview
position: 1
---

# Grid HtmlHelper Overview

The Grid HtmlHelper extension is a server-side wrapper for the [Kendo UI Grid](https://demos.telerik.com/kendo-ui/grid/index) widget.

It enables you to configure the Kendo UI Grid widget from server-side code and helps with data binding and editing. The [Grid](http://docs.telerik.com/kendo-ui/controls/data-management/grid/overview) is a powerful control for displaying data in a tabular format. It provides many options, such as paging, sorting, filtering, grouping, and editing, which determine the way data is presented and manipulated. The Grid can be bound to local or remote data by using the [Kendo UI DataSource](http://docs.telerik.com/kendo-ui/framework/datasource/overview) component.

For more information on the HtmlHelper, refer to the article on the [Grid HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/grid/overview).

## Basic Usage

The following example demonstrates how to define the Grid by using the Grid HtmlHelper.

###### Example

```Razor
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.Customer>()
		.Name("grid")
		.Columns(columns =>
		{
			columns.Bound(c => c.ContactName).Width(140);
			columns.Bound(c => c.ContactTitle).Width(190);
			columns.Bound(c => c.CompanyName);
			columns.Bound(c => c.Country).Width(110);
		})
		.DataSource(dataSource => dataSource
			.Ajax()
			.Read(read => read.Action("Customers_Read", "Grid"))
		)
    )
```
```Controller
    namespace Kendo.Mvc.Examples.Controllers
    {
	    public partial class GridController : BaseController
    {
        private IProductService productService;

        public GridController(
            IProductService service)
        {
			productService = service;
		}

        [Demo]
        public IActionResult Index()
        {
            return View();
        }

		public IActionResult Customers_Read([DataSourceRequest] DataSourceRequest request)
		{
			return Json(GetCustomers().ToDataSourceResult(request));
		}

		private static IEnumerable<CustomerViewModel> GetCustomers()
		{
            using (var northwind = new SampleEntitiesDataContext())
            {
                return northwind.Customers.Select(customer => new CustomerViewModel
                {
                    CustomerID = customer.CustomerID,
                    CompanyName = customer.CompanyName,
                    ContactName = customer.ContactName,
                    ContactTitle = customer.ContactTitle,
                    Address = customer.Address,
                    City = customer.City,
                    Region = customer.Region,
                    PostalCode = customer.PostalCode,
                    Country = customer.Country,
                    Phone = customer.Phone,
                    Fax = customer.Fax,
                    Bool = customer.Bool
                }).ToList();
            }
		}

		public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
		{
			return Json(GetOrders().ToDataSourceResult(request));
		}

		private static IEnumerable<OrderViewModel> GetOrders()
		{
            using (var northwind = new SampleEntitiesDataContext())
            {
                var customers = northwind.Customers.ToList();

                return northwind.Orders.ToList().Select(order => new OrderViewModel
                {
                    ContactName = customers.First(c => c.CustomerID == order.CustomerID).ContactName,
                    Freight = order.Freight,
                    OrderDate = order.OrderDate,
                    ShippedDate = order.ShippedDate,
                    OrderID = order.OrderID,
                    ShipAddress = order.ShipAddress,
                    ShipCountry = order.ShipCountry,
                    ShipName = order.ShipName,
                    ShipCity = order.ShipCity,
                    EmployeeID = order.EmployeeID,
                    CustomerID = order.CustomerID
                }).ToList();
            }
		}

            public ActionResult Products_Read([DataSourceRequest] DataSourceRequest request)
            {
                return Json(productService.Read().ToDataSourceResult(request));
            }
        }
    }
```

## Configuration

The following example demonstrates the basic configuration of the Grid HtmlHelper and how to get the Grid instance.

###### Example

```
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.Customer>()
		.Name("grid")
		.Columns(columns =>
		{
			columns.Bound(c => c.ContactName).Width(140);
			columns.Bound(c => c.ContactTitle).Width(190);
			columns.Bound(c => c.CompanyName);
			columns.Bound(c => c.Country).Width(110);
		})
		.HtmlAttributes(new { style = "height: 380px;" })
		.Scrollable()
		.Groupable()
		.Sortable()
		.Pageable(pageable => pageable
			.Refresh(true)
			.PageSizes(true)
			.ButtonCount(5))
		.DataSource(dataSource => dataSource
			.Ajax()
			.Read(read => read.Action("Customers_Read", "Grid"))
		)
    )

    <script>
    $(function() {
        //Notice that the Name() of the Grid is used to get its client-side instance.
        var grid = $("#grid").data("kendoGrid");
    });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Grid HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/grid/overview)
* [Grid Official Demos](http://demos.telerik.com/aspnet-core/grid/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
