using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;
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
            IQueryable<Product> products = new NorthwindDataContext().Products;

            var total = products.Count();

            products = products.ApplySorting(request.Groups, request.Sorts);

            products = products.ApplyPaging(request.Page, request.PageSize);

            IEnumerable data =  products.ApplyGrouping(request.Groups);

            var result = new DataSourceResult()
            {
                Data = data,
                Total = total
            };

            return Json(result);
        }
    }

    public static class ProductCustomBindingExtensions
    {
        public static IQueryable<Product> ApplyPaging(this IQueryable<Product> data, int page, int pageSize)
        {
            if (pageSize > 0 && page > 0)
            {
                data = data.Skip((page - 1) * pageSize);
            }

            data = data.Take(pageSize);

            return data;
        }

        public static IEnumerable ApplyGrouping(this IQueryable<Product> data, IList<GroupDescriptor>
            groupDescriptors)
        {
            if (groupDescriptors.Any())
            {
                Func<IEnumerable<Product>, IEnumerable<AggregateFunctionsGroup>> selector = null;
                foreach (var group in groupDescriptors.Reverse())
                {
                    if (selector == null)
                    {
                        if (group.Member == "ProductName")
                        {
                            selector = Products => BuildInnerGroup(Products, o => o.ProductName);
                        }
                        else if (group.Member == "UnitPrice")
                        {
                            selector = Products => BuildInnerGroup(Products, o => o.UnitPrice);
                        }
                        else if (group.Member == "UnitsInStock")
                        {
                            selector = Products => BuildInnerGroup(Products, o => o.UnitsInStock);
                        }
                    }
                    else
                    {
                        if (group.Member == "ProductName")
                        {
                            selector = BuildGroup(o => o.ProductName, selector);
                        }
                        else if (group.Member == "UnitPrice")
                        {
                            selector = BuildGroup(o => o.UnitPrice, selector);
                        }
                        else if (group.Member == "UnitsInStock")
                        {
                            selector = BuildGroup(o => o.UnitsInStock, selector);
                        }
                    }
                }

                return selector.Invoke(data).ToList();
            }

            return data;
        }

        private static Func<IEnumerable<Product>, IEnumerable<AggregateFunctionsGroup>>
            BuildGroup<T>(Func<Product, T> groupSelector, Func<IEnumerable<Product>,
            IEnumerable<AggregateFunctionsGroup>> selectorBuilder)
        {
            var tempSelector = selectorBuilder;
            return g => g.GroupBy(groupSelector)
                         .Select(c => new AggregateFunctionsGroup
                         {
                             Key = c.Key,
                             HasSubgroups = true,
                             Items = tempSelector.Invoke(c).ToList()
                         });
        }

        private static IEnumerable<AggregateFunctionsGroup> BuildInnerGroup<T>(IEnumerable<Product>
            group, Func<Product, T> groupSelector)
        {
            return group.GroupBy(groupSelector)
                    .Select(i => new AggregateFunctionsGroup
                    {
                        Key = i.Key,
                        Items = i.ToList()
                    });
        }
        public static IQueryable<Product> ApplySorting(this IQueryable<Product> data,
                    IList<GroupDescriptor> groupDescriptors, IList<SortDescriptor> sortDescriptors)
        {
            if (groupDescriptors.Any())
            {
                foreach (var groupDescriptor in groupDescriptors.Reverse())
                {
                    data = AddSortExpression(data, groupDescriptor.SortDirection, groupDescriptor.Member);
                }
            }

            if (sortDescriptors.Any())
            {
                foreach (SortDescriptor sortDescriptor in sortDescriptors)
                {
                    data = AddSortExpression(data, sortDescriptor.SortDirection, sortDescriptor.Member);
                }
            }

            return data;
        }

        private static IQueryable<Product> AddSortExpression(IQueryable<Product> data, ListSortDirection
                    sortDirection, string memberName)
        {
            if (sortDirection == ListSortDirection.Ascending)
            {
                switch (memberName)
                {
                    case "ProductID":
                        data = data.OrderBy(Product => Product.ProductID);
                        break;
                    case "ProductName":
                        data = data.OrderBy(Product => Product.ProductName);
                        break;
                    case "UnitPrice":
                        data = data.OrderBy(Product => Product.UnitPrice);
                        break;
                    case "UnitsInStock":
                        data = data.OrderBy(Product => Product.UnitsInStock);
                        break;
                }
            }
            else
            {
                switch (memberName)
                {
                    case "ProductID":
                        data = data.OrderByDescending(Product => Product.ProductID);
                        break;
                    case "ProductName":
                        data = data.OrderByDescending(Product => Product.ProductName);
                        break;
                    case "UnitPrice":
                        data = data.OrderByDescending(Product => Product.UnitPrice);
                        break;
                    case "UnitsInStock":
                        data = data.OrderByDescending(Product => Product.UnitsInStock);
                        break;
                }
            }
            return data;
        }
    }
}
