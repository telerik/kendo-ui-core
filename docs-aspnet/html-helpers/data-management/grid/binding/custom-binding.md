---
title: Custom Binding
page_title: Custom Binding
description: "Learn how to implement custom binding with Telerik UI Grid HtmlHelper for {{ site.framework }}."
previous_url: /helpers/grid/custom-binding, /helpers/data-management/grid/custom-binding, /helpers/data-management/grid/binding/custom-binding
slug: custombinding_grid_aspnetmvc
position: 5
---

# Custom Binding

The Telerik UI Grid for {{ site.framework }} enables you to bypass the built-in data processing and to handle operations such paging, sorting, filtering, and grouping yourself.

The Grid provides options for setting {% if site.mvc %}[custom server-binding](#setting-custom-server-binding) and {% endif %}[custom Ajax-binding](#setting-custom-ajax-binding).

{% if site.mvc %}

## Setting Custom Server Binding

1. Add a new parameter of type `Kendo.UI.DataSourceRequest` to the action method. It will contain the current Grid request information&mdash;page, sort, group, and filter. Decorate this parameter with the `Kendo.UI.DataSourceRequestAttribute`. This attribute is responsible for populating the `DataSourceRequest` object.

        public ActionResult Index([DataSourceRequest(Prefix = "Grid")] DataSourceRequest request)
        {
            IQueryable<Order> orders = new NorthwindEntities().Orders;
        }

1. Assign a default `pageSize`.

        public ActionResult Index([DataSourceRequest(Prefix = "Grid")] DataSourceRequest request)
        {
            if (request.PageSize == 0)
            {
            request.PageSize = 10;
            }

            IQueryable<Order> orders = new NorthwindEntities().Orders;
        }

1. Handle the appropriate data operations.

        public ActionResult Index([DataSourceRequest(Prefix = "Grid")] DataSourceRequest request)
        {
            if (request.PageSize == 0)
            {
                request.PageSize = 10;
            }
            IQueryable<Order> orders = new NorthwindEntities().Orders;

            if (request.Sorts.Any())
            {
                foreach (SortDescriptor sortDescriptor in request.Sorts)
                {
                    if (sortDescriptor.SortDirection == ListSortDirection.Ascending)
                    {
                        switch (sortDescriptor.Member)
                        {
                            case "OrderID":
                                orders= orders.OrderBy(order => order.OrderID);
                                break;
                            case "ShipAddress":
                                orders= orders.OrderBy(order => order.ShipAddress);
                                break;
                        }
                    }
                    else
                    {
                        switch (sortDescriptor.Member)
                        {
                            case "OrderID":
                                orders= orders.OrderByDescending(order => order.OrderID);
                                break;
                            case "ShipAddress":
                                orders= orders.OrderByDescending(order => order.ShipAddress);
                                break;
                        }
                    }
                }
            }
            else
            {
                // If cannot page unsorted data.
                orders = orders.OrderBy(o => o.OrderID);
            }

            // Apply paging.
            if (request.Page > 0) {
                orders = orders.Skip((request.Page - 1) * request.PageSize);
            }
            orders = orders.Take(request.PageSize);
        }

1. Calculate the total number of records.

        public ActionResult Index([DataSourceRequest(Prefix = "Grid")] DataSourceRequest request)
        {
            if (request.PageSize == 0)
            {
                request.PageSize = 10;
            }
            IQueryable<Order> orders = new NorthwindEntities().Orders;

            // Apply sorting (code omitted).
            // Calculate the total number of records before paging.
            var total = orders.Count();
            // Apply paging.

            ViewData["total"] = total;
        }

1. Pass the processed data to the View.

        public ActionResult Index([DataSourceRequest]DataSourceRequest request)
        {
            // Get the data (code omitted).
            // Apply sorting (code omitted).
            // Calculate the total number of records (code omitted).
            // Apply paging (code omitted).

            return View(orders);
        }

1. Set `EnableCustomBinding(true)` through the Grid widget declaration.

        @model IEnumerable<KendoGridCustomServerBinding.Models.Order>

        @(Html.Kendo().Grid(Model)
            .Name("Grid")
            .EnableCustomBinding(true)
            .Columns(columns => {
                columns.Bound(o => o.OrderID);
                columns.Bound(o => o.ShipAddress);
            })
            .Pageable()
            .Sortable()
            .Scrollable()
        )

1. If paging is enabled, assign the total number of records through the `DataSource`.

        @model IEnumerable<KendoGridCustomServerBinding.Models.Order>

        @(Html.Kendo().Grid(Model)
            .Name("Grid")
            .EnableCustomBinding(true)
            .Columns(columns => {
                columns.Bound(o => o.OrderID);
                columns.Bound(o => o.ShipAddress);
            })
            .Pageable()
            .Sortable()
            .Scrollable()
            .DataSource(dataSource => dataSource
                .Server()
                .Total((int)ViewData["total"]) // set the total number of records
            )
        )

To download the Visual Studio Project, refer to [this GitHub repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/custom-server-binding).

{% endif %}

## Setting Custom Ajax Binding

1. Add a new parameter of type `Kendo.UI.DataSourceRequest` to the action method. It will contain the current Grid request information&mdash;page, sort, group, and filter. Decorate this parameter with the `Kendo.UI.DataSourceRequestAttribute`. This attribute is responsible for populating the `DataSourceRequest` object.

        public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
        {
            IQueryable<Order> orders = new NorthwindEntities().Orders;
        }

1. Handle the appropriate data operations and calculate the total number of records.

        public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
        {
            IQueryable<Order> orders = new NorthwindEntities().Orders;

            // Apply sorting.

            if (request.Sorts.Any())
            {
                foreach (SortDescriptor sortDescriptor in request.Sorts)
                {
                    if (sortDescriptor.SortDirection == ListSortDirection.Ascending)
                    {
                        switch (sortDescriptor.Member)
                        {
                            case "OrderID":
                                orders= orders.OrderBy(order => order.OrderID);
                                break;
                            case "ShipAddress":
                                orders= orders.OrderBy(order => order.ShipAddress);
                                break;
                        }
                    }
                    else
                    {
                        switch (sortDescriptor.Member)
                        {
                            case "OrderID":
                                orders= orders.OrderByDescending(order => order.OrderID);
                                break;
                            case "ShipAddress":
                                orders= orders.OrderByDescending(order => order.ShipAddress);
                                break;
                        }
                    }
                }
            }
            else
            {
                // If cannot page unsorted data.
                orders = orders.OrderBy(o => o.OrderID);
            }

            var total = orders.Count();

            // Apply paging.
            if (request.Page > 0) {
                orders = orders.Skip((request.Page - 1) * request.PageSize);
            }
            orders = orders.Take(request.PageSize);
        }

1. Create a new instance of `DataSourceResult`. Set the `Data` and `Total` properties to the processed data and to the total number of records.

        public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
        {
            // Get the data (code omitted).
            IQueryable<Order> orders = new NorthwindEntities().Orders;
            // Apply sorting (code omitted).
            // Apply paging (code omitted).
            // Initialize the DataSourceResult.
            var result = new DataSourceResult()
            {
                Data = orders, // Process data (paging and sorting applied).
                Total = total // The total number of records.
            };
        }

1. Return the `DataSourceResult` as JSON.

        public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
        {
            // Get the data (code omitted).
            IQueryable<Order> orders = new NorthwindEntities().Orders;
            // Apply sorting (code omitted).
            // Apply paging (code omitted).
            // Initialize the DataSourceResult (code omitted).
            var result = new DataSourceResult()
            {
                Data = orders, // Process data (paging and sorting applied)
                Total = total // Total number of records
            };

            // Return the result as JSON.
            return Json(result);
        }

1. Configure the Grid for custom Ajax binding.

        @(Html.Kendo().Grid<KendoGridCustomAjaxBinding.Models.Order>()
            .Name("Grid")
            .EnableCustomBinding(true)
            .Columns(columns => {
                columns.Bound(o => o.OrderID);
                columns.Bound(o => o.ShipAddress);
            })
            .Pageable()
            .Sortable()
            .Scrollable()
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read("Orders_Read", "Home")
            )
        )

{% if site.mvc %}
To download the Visual Studio Project, refer to [this GitHub repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/custom-ajax-binding).
{% endif %}

## See Also

{% if site.mvc %}
* [Custom Server Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/customserverbinding)
{% endif %}
* [Custom Ajax Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/customajaxbinding)
* [Server-Side API](/api/grid)
