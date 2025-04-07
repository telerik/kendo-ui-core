---
title: Custom Binding
page_title: Custom Binding
description: "Learn how to implement custom binding with Telerik UI Grid component for {{ site.framework }}."
previous_url: /helpers/grid/custom-binding, /helpers/data-management/grid/custom-binding, /helpers/data-management/grid/binding/custom-binding
slug: custombinding_grid_aspnetmvc
position: 7
---

# Custom Binding

The Telerik UI Grid for {{ site.framework }} allows you to bypass the built-in data processing and handle operations like paging, sorting, filtering, and grouping yourself.

{% if site.mvc %}
The Grid provides the following custom binding options:

* [Custom Server Binding](#custom-server-binding)
* [Custom Ajax Binding](#custom-ajax-binding)

## Custom Server Binding

1. Add a new parameter of type `Kendo.UI.DataSourceRequest` to the action method. It must contain information about the requested Grid data operation&mdash;paging, sorting, grouping, or filtering. Decorate this parameter with the `Kendo.UI.DataSourceRequestAttribute`. This attribute populates the `DataSourceRequest` object.

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

1. Handle the respective data operations.

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

```HtmlHelper
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
```


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

To download the Visual Studio Project, refer to [this GitHub repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridCustomServerBinding).

For a complete example, refer to the [demo on implementing server binding of the Grid](https://demos.telerik.com/aspnet-mvc/grid/serverbinding).  

{% endif %}

## Custom Ajax Binding

1. Add a new parameter of type `Kendo.UI.DataSourceRequest` to the action method. It must contain information about the requested Grid data operation&mdash;paging, sorting, grouping, or filtering. Decorate this parameter with the `Kendo.UI.DataSourceRequestAttribute`. This attribute populates the `DataSourceRequest` object.

        public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
        {
            IQueryable<Order> orders = new NorthwindEntities().Orders;
        }

1. Handle the respective data operations and calculate the total number of records.

    * Filtering

        ```
        namespace ProjectName.Controllers
        {
            public class GridController : Controller
            {
                public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
                {
                    IQueryable<Order> orders = new NorthwindEntities().Orders;
                    orders = orders.ApplyOrdersFiltering(request.Filters); // Pass the filter expressions from the request object.
                    var total = orders.Count();
                }
            }

            public static class AjaxCustomBindingExtensions
            {
                public static IQueryable<Order> ApplyOrdersFiltering(this IQueryable<Order> data, IList<IFilterDescriptor> filterDescriptors)
                {
                    if (filterDescriptors.Any())
                    {
                        data = data.Where(ExpressionBuilder.Expression<Order>(filterDescriptors, false));
                    }
                    return data;
                }
            }
        }
        ```
    
    * Sorting

        ```
        namespace ProjectName.Controllers
        {
            public class GridController : Controller
            {
                public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
                {
                    IQueryable<Order> orders = new NorthwindEntities().Orders;

                    ... // Filtering (code omitted).
                    var total = orders.Count();

                    orders = orders.ApplyOrdersSorting(request.Groups, request.Sorts); // Pass the sort expressions and groups from the request object.

                    if (!request.Sorts.Any() && !request.Groups.Any() && !request.Groups.Where(descriptor=>descriptor.SortDirection != ListSortDirection.Descending).Any())
                    {
                        // Entity Framework does not support paging on unsorted data.
                        orders = orders.OrderBy(o => o.OrderID);
                    }
                }
            }

            public static class AjaxCustomBindingExtensions
            {
                public static IQueryable<Order> ApplyOrdersSorting(this IQueryable<Order> data, IList<GroupDescriptor> groupDescriptors, IList<SortDescriptor> sortDescriptors)
                {
                    if (groupDescriptors != null && groupDescriptors.Any())
                    {
                        foreach (var groupDescriptor in groupDescriptors.Reverse())
                        {
                            data = AddSortExpression(data, groupDescriptor.SortDirection, groupDescriptor.Member);
                        }
                    }

                    if (sortDescriptors != null && sortDescriptors.Any())
                    {
                        foreach (SortDescriptor sortDescriptor in sortDescriptors)
                        {
                            data = AddSortExpression(data, sortDescriptor.SortDirection, sortDescriptor.Member);
                        }
                    }

                    return data;
                }

                private static IQueryable<Order> AddSortExpression(IQueryable<Order> data, ListSortDirection
                            sortDirection, string memberName)
                {
                    if (sortDirection == ListSortDirection.Ascending)
                    {
                        switch (memberName)
                        {
                            case "OrderID":
                                data = data.OrderBy(order => order.OrderID);
                                break;
                            case "ShipAddress":
                                data = data.OrderBy(order => order.ShipAddress);
                                break;
                        }
                    }
                    else
                    {
                        switch (memberName)
                        {
                            case "OrderID":
                                data = data.OrderByDescending(order => order.OrderID);
                                break;
                            case "ShipAddress":
                                data = data.OrderByDescending(order => order.ShipAddress);
                                break;
                        }
                    }
                    return data;
                }
            }
        }
        ```
    
    * Paging

        ```
        namespace ProjectName.Controllers
        {
            public class GridController : Controller
            {
                public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
                {
                    IQueryable<Order> orders = new NorthwindEntities().Orders;

                    ... // Filtering (code omitted).
                    var total = orders.Count();

                    ... // Sorting (code omitted).

                    orders = orders.ApplyOrdersPaging(request.Page, request.PageSize);

                }
            }

            public static class AjaxCustomBindingExtensions
            {
                public static IQueryable<Order> ApplyOrdersPaging(this IQueryable<Order> data, int page, int pageSize)
                {
                    if (pageSize > 0 && page > 0)
                    {
                        data = data.Skip((page - 1) * pageSize);
                    }
                    data = data.Take(pageSize);
                    return data;
                }
            }
        }
        ```
    
    * Grouping

        ```
        namespace ProjectName.Controllers
        {
            public class GridController : Controller
            {
                public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
                {
                    IQueryable<Order> orders = new NorthwindEntities().Orders;

                    ... // Filtering (code omitted).
                    var total = orders.Count();

                    ... // Sorting (code omitted).

                    ... // Paging (code omitted).

                    IEnumerable data = orders.ApplyOrdersGrouping(request.Groups);
                }
            }

            public static class AjaxCustomBindingExtensions
            {
                public static IEnumerable ApplyOrdersGrouping(this IQueryable<Order> data, IList<GroupDescriptor>
                    groupDescriptors)
                {
                    if (groupDescriptors != null && groupDescriptors.Any())
                    {
                        Func<IEnumerable<Order>, IEnumerable<AggregateFunctionsGroup>> selector = null;
                        foreach (var group in groupDescriptors.Reverse())
                        {
                            if (selector == null)
                            {
                                if (group.Member == "OrderID")
                                {
                                    selector = Orders => BuildInnerGroup(Orders, o => o.OrderID);
                                }
                                else if (group.Member == "ShipAddress")
                                {
                                    selector = Orders => BuildInnerGroup(Orders, o => o.ShipAddress);
                                } 
                            }
                            else
                            {
                                if (group.Member == "OrderID")
                                {
                                    selector = BuildGroup(o => o.OrderID, selector);
                                }
                                else if (group.Member == "ShipAddress")
                                {
                                    selector = BuildGroup(o => o.ShipAddress, selector);
                                }
                            }
                        }
                        return selector.Invoke(data).ToList();
                    }
                    return data.ToList();
                }

                private static Func<IEnumerable<Order>, IEnumerable<AggregateFunctionsGroup>>
                    BuildGroup<T>(Expression<Func<Order, T>> groupSelector, Func<IEnumerable<Order>,
                    IEnumerable<AggregateFunctionsGroup>> selectorBuilder)
                {
                    var tempSelector = selectorBuilder;
                    return g => g.GroupBy(groupSelector.Compile())
                                .Select(c => new AggregateFunctionsGroup
                                {
                                    Key = c.Key,
                                    HasSubgroups = true,
                                    Member = groupSelector.MemberWithoutInstance(),
                                    Items = tempSelector.Invoke(c).ToList()
                                });
                }

                private static IEnumerable<AggregateFunctionsGroup> BuildInnerGroup<T>(IEnumerable<Order>
                    group, Expression<Func<Order, T>> groupSelector)
                {
                    return group.GroupBy(groupSelector.Compile())
                            .Select(i => new AggregateFunctionsGroup
                            {
                                Key = i.Key,
                                Member = groupSelector.MemberWithoutInstance(),
                                Items = i.ToList()
                            });
                }
            }
        }
        ```

1. Create a new instance of `DataSourceResult`. Set the `Data` and `Total` properties to the processed data and to the total number of records.

        public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
        {
            IQueryable<Order> orders = new NorthwindEntities().Orders;

            ... // Filtering (code omitted).
            var total = orders.Count();

            ... // Sorting, Paging and Grouping (code omitted).

            // Initialize the DataSourceResult.
            var result = new DataSourceResult()
            {
                Data = orders, // Process data (filtered, sorted, paged, grouped data).
                Total = total // The total number of records.
            };
        }

1. Return the `DataSourceResult` as JSON.

        public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
        {
            IQueryable<Order> orders = new NorthwindEntities().Orders;
            ... // Filtering (code omitted).
            var total = orders.Count();

            ... // Sorting, Paging and Grouping (code omitted).
            
            var result = new DataSourceResult()
            {
                Data = orders,
                Total = total
            };

            // Return the result as JSON.
            return Json(result);
        }

1. Configure the Grid for custom Ajax binding.

    ```HtmlHelper
        @(Html.Kendo().Grid<KendoGridCustomAjaxBinding.Models.Order>()
            .Name("grid")
            .Columns(columns => {
                columns.Bound(o => o.OrderID);
                columns.Bound(o => o.ShipAddress);
            })
            .Pageable()
            .Sortable()
            .Filterable()
            .Groupable()
            .Scrollable()
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(15)
                .Read("Orders_Read", "Home")
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-grid name="grid">
            <datasource type="DataSourceTagHelperType.Ajax" page-size="15">
                <transport>
                    <read url="@Url.Action("Orders_Read", "Home")"/>
                </transport>
            </datasource>
            <columns>
                <column field="OrderID"/>
                <column field="ShipAddress"/>
            </columns>
            <pageable enabled="true"/>
            <sortable enabled="true"/>
            <filterable enabled="true"/>
            <scrollable enabled="true"/>
            <groupable enabled="true"/>
        </kendo-grid>
    ```
    {% endif %}

{% if site.mvc %}
To download the Visual Studio Project, refer to [this GitHub repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridCustomAjaxBinding).
{% endif %}

For a complete example, refer to the [demo on implementing custom Ajax binding of the Grid](https://demos.telerik.com/{{ site.platform }}/grid/customajaxbinding).  

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
{% if site.mvc %}
* [Custom Server Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/customserverbinding)
{% endif %}
* [Custom Ajax Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/customajaxbinding)
* [Server-Side API](/api/grid)