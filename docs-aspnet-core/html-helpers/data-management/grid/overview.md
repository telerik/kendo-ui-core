---
title: Overview
page_title: Grid Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn the basics when working with the Telerik UI Grid HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/grid
slug: htmlhelpers_grid_aspnetcore_overview
position: 1
---

# Grid HtmlHelper Overview

The Telerik UI Grid HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Grid widget.

The Grid is a powerful control for displaying data in a tabular format. It provides options for executing data operations, such as paging, sorting, filtering, grouping, and editing, which determine the way the data is presented and manipulated. The Grid supports data binding to local and remote sets of data by using the Kendo UI for jQuery DataSource component.

* [Demo page for the Grid](https://demos.telerik.com/aspnet-core/grid/index)

## Advance Reading

Because of the numerous functionalities it supports, the Grid is the most complex of the Telerik UI HTML Helpers. To gain greater confidence before you start working with it, make sure you get familiar with the following concepts:

* [DataSource]({% slug htmlhelpers_datasource_aspnetcore %})&mdash;The DataSource is one of the pivotal suite components. It is an abstraction for using local or remote data and a key concept in understanding how the Grid functions.
* [Remote CRUD operations]({% slug ajaxediting_grid_aspnetcore %})&mdash;The section elaborates on scenarios in which data is retrieved from and submitted to a remote data service through HTTP requests that are made by the DataSource.
* [Remote data binding]({% slug htmlhelpers_grid_aspnetcore_ajaxbinding %})&mdash;The article provides information on server filtering, paging, and other features of the Grid.

## Initializing the Grid

The following example demonstrates how to define the Grid by using the Grid HtmlHelper.

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

## Basic Configuration

The following example demonstrates the basic configuration for the Grid HtmlHelper.

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

## Functionality and Features

* [Data binding]({% slug htmlhelpers_grid_aspnetcore_ajaxbinding %})
* [Editing]({% slug batchediting_grid_aspnetcore %})
* [Filtering]({% slug htmlhelpers_grid_aspnetcore_filtering %})
* [Grouping]({% slug htmlhelpers_grid_aspnetcore_grouping %})
* [Paging]({% slug htmlhelpers_grid_aspnetcore_paging %})
* [Sorting]({% slug htmlhelpers_grid_aspnetcore_sorting %})
* [Excel export]({% slug excelexport_gridhelper_aspnetcore %})
* [Templates]({% slug clientdetailtemplate_grid_aspnetcore %})
* [Scroll modes]({% slug htmlhelpers_grid_aspnetcore_scrolling %})
* [Selection]({% slug htmlhelpers_grid_aspnetcore_selection %})
* [Adaptive rendering]({% slug adaptive_rendering_gridhelper_aspnetcore %})
* [Search panel]({% slug htmlhelpers_grid_aspnetcore_searchpanel %})

## See Also

* [Basic Usage of the Grid HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/index)
* [Using the API of the Grid HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/api)
* [API Reference of the Grid HtmlHelper for ASP.NET Core](/api/grid)
