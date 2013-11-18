using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Linq;
using System.Linq;
using System.Linq.Expressions;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Infrastructure;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult CustomAjaxBinding()
        {
            return View();
        }

        public ActionResult CustomAjaxBinding_Read([DataSourceRequest] DataSourceRequest request)
        {
            var dataContext = new SampleEntities();

            // Convert to view model to avoid JSON serialization problems due to circular references.
            IQueryable<OrderViewModel> orders = dataContext.Orders.Select(o => new OrderViewModel
            {
                OrderID = o.OrderID,
                ShipCity = o.ShipCity,
                ShipCountry = o.ShipCountry,
                ShipName = o.ShipName
            });

            orders = orders.ApplyOrdersFiltering(request.Filters);

            var total = orders.Count();

            orders = orders.ApplyOrdersSorting(request.Groups, request.Sorts);

            if (!request.Sorts.Any())
            {
                // Entity Framework doesn't support paging on unsorted data.
                orders = orders.OrderBy(o => o.OrderID);
            }

            orders = orders.ApplyOrdersPaging(request.Page, request.PageSize);

            IEnumerable data =  orders.ApplyOrdersGrouping(request.Groups);

            var result = new DataSourceResult()
            {
                Data = data,
                Total = total
            };

            return Json(result);
        }
    }

    public static class AjaxCustomBindingExtensions
    {
        public static IQueryable<OrderViewModel> ApplyOrdersPaging(this IQueryable<OrderViewModel> data, int page, int pageSize)
        {
            if (pageSize > 0 && page > 0)
            {
                data = data.Skip((page - 1) * pageSize);
            }

            data = data.Take(pageSize);

            return data;
        }

        public static IEnumerable ApplyOrdersGrouping(this IQueryable<OrderViewModel> data, IList<GroupDescriptor>
            groupDescriptors)
        {
            if (groupDescriptors != null && groupDescriptors.Any())
            {
                Func<IEnumerable<OrderViewModel>, IEnumerable<AggregateFunctionsGroup>> selector = null;
                foreach (var group in groupDescriptors.Reverse())
                {
                    if (selector == null)
                    {
                        if (group.Member == "ShipCity")
                        {
                            selector = Orders => BuildInnerGroup(Orders, o => o.ShipCity);
                        }
                        else if (group.Member == "ShipAddress")
                        {
                            selector = Orders => BuildInnerGroup(Orders, o => o.ShipAddress);
                        }
                        else if (group.Member == "ShipName")
                        {
                            selector = Orders => BuildInnerGroup(Orders, o => o.ShipName);
                        }
                        else if (group.Member == "ShipCountry")
                        {
                            selector = Orders => BuildInnerGroup(Orders, o => o.ShipCountry);
                        } 
                    }
                    else
                    {
                        if (group.Member == "ShipCity")
                        {
                            selector = BuildGroup(o => o.ShipCity, selector);
                        }
                        else if (group.Member == "ShipAddress")
                        {
                            selector = BuildGroup(o => o.ShipAddress, selector);
                        }
                        else if (group.Member == "ShipName")
                        {
                            selector = BuildGroup(o => o.ShipName, selector);
                        }
                        else if (group.Member == "ShipCountry")
                        {
                            selector = BuildGroup(o => o.ShipCountry, selector);
                        } 
                    }
                }

                return selector.Invoke(data).ToList();
            }

            return data.ToList();
        }

        private static Func<IEnumerable<OrderViewModel>, IEnumerable<AggregateFunctionsGroup>>
            BuildGroup<T>(Expression<Func<OrderViewModel, T>> groupSelector, Func<IEnumerable<OrderViewModel>,
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

        private static IEnumerable<AggregateFunctionsGroup> BuildInnerGroup<T>(IEnumerable<OrderViewModel>
            group, Expression<Func<OrderViewModel, T>> groupSelector)
        {
            return group.GroupBy(groupSelector.Compile())
                    .Select(i => new AggregateFunctionsGroup
                    {
                        Key = i.Key,
                        Member = groupSelector.MemberWithoutInstance(),
                        Items = i.ToList()
                    });
        }

        public static IQueryable<OrderViewModel> ApplyOrdersSorting(this IQueryable<OrderViewModel> data,
                    IList<GroupDescriptor> groupDescriptors, IList<SortDescriptor> sortDescriptors)
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

        private static IQueryable<OrderViewModel> AddSortExpression(IQueryable<OrderViewModel> data, ListSortDirection
                    sortDirection, string memberName)
        {
            if (sortDirection == ListSortDirection.Ascending)
            {
                switch (memberName)
                {
                    case "OrderID":
                        data = data.OrderBy(order => order.OrderID);
                        break;
                    case "ShipCity":
                        data = data.OrderBy(order => order.ShipCity);
                        break;
                    case "ShipCountry":
                        data = data.OrderBy(order => order.ShipCountry);
                        break;
                    case "ShipName":
                        data = data.OrderBy(order => order.ShipName);
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
                    case "ShipCity":
                        data = data.OrderByDescending(order => order.ShipCity);
                        break;
                    case "ShipCountry":
                        data = data.OrderByDescending(order => order.ShipCountry);
                        break;
                    case "ShipName":
                        data = data.OrderByDescending(order => order.ShipName);
                        break;
                }
            }
            return data;
        }

        public static IQueryable<OrderViewModel> ApplyOrdersFiltering(this IQueryable<OrderViewModel> data,
           IList<IFilterDescriptor> filterDescriptors)
        {
            if (filterDescriptors.Any())
            {
                data = data.Where(ExpressionBuilder.Expression<OrderViewModel>(filterDescriptors, false));
            }
            return data;
        }
    }
}
