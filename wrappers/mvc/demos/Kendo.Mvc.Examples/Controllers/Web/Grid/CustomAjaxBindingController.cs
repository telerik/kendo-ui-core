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
            var loadOptions = new DataLoadOptions();
            loadOptions.LoadWith<Order>(o => o.Customer);
            var dataContext = new NorthwindDataContext
            {
                LoadOptions = loadOptions
            };
            
            IQueryable<Order> orders = dataContext.Orders;            

            orders = orders.ApplyOrdersFiltering(request.Filters);

            var total = orders.Count();

            orders = orders.ApplyOrdersSorting(request.Groups, request.Sorts);

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
        public static IQueryable<Order> ApplyOrdersPaging(this IQueryable<Order> data, int page, int pageSize)
        {
            if (pageSize > 0 && page > 0)
            {
                data = data.Skip((page - 1) * pageSize);
            }

            data = data.Take(pageSize);

            return data;
        }

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

        public static IQueryable<Order> ApplyOrdersSorting(this IQueryable<Order> data,
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
                    case "Customer.ContactName":
                        data = data.OrderBy(order => order.Customer.ContactName);
                        break;
                    case "ShipAddress":
                        data = data.OrderBy(order => order.ShipAddress);
                        break;
                    case "OrderDate":
                        data = data.OrderBy(order => order.OrderDate);
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
                    case "Customer.ContactName":
                        data = data.OrderByDescending(order => order.Customer.ContactName);
                        break;
                    case "ShipAddress":
                        data = data.OrderByDescending(order => order.ShipAddress);
                        break;
                    case "OrderDate":
                        data = data.OrderByDescending(order => order.OrderDate);
                        break;
                }
            }
            return data;
        }

        public static IQueryable<Order> ApplyOrdersFiltering(this IQueryable<Order> data,
           IList<IFilterDescriptor> filterDescriptors)
        {
            if (filterDescriptors.Any())
            {
                data = data.Where(ExpressionBuilder.Expression<Order>(filterDescriptors));
            }
            return data;
        }
    }
}
