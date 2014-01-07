using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using KendoCRUDService.Models;
using System.Web.Caching;

namespace KendoCRUDService.Hubs
{
    public class ProductHub : Hub
    {
        public IEnumerable<ProductSignalR> Read()
        {
            var products = HttpContext.Current.Cache["products"] as IEnumerable<ProductSignalR>;

            if (products == null)
            {
                using (var context = new SampleDataContext())
                {
                    var createdAt = DateTime.Now;

                    products = context.Products
                                      .OrderBy(p => p.ProductName)
                                      .ToList() // Execute the query because Linq to SQL doesn't get Guid.NewGuid()
                                      .Select(p => new ProductSignalR
                                      {
                                           ID = Guid.NewGuid(),
                                           ProductName = p.ProductName,
                                           UnitPrice = (double)p.UnitPrice.GetValueOrDefault(),
                                           UnitsInStock = p.UnitsInStock.GetValueOrDefault(),
                                           CreatedAt = createdAt = createdAt.AddMilliseconds(1)
                                      })
                                      .ToList();
                }

                HttpContext.Current.Cache.Add("products", 
                    products, 
                    null, 
                    Cache.NoAbsoluteExpiration, 
                    TimeSpan.FromMinutes(30), 
                    System.Web.Caching.CacheItemPriority.Normal, 
                    null
                );
            }

            return products;
        }

        public void Update(ProductSignalR product)
        {
            Clients.Others.update(product);
        }

        public void Destroy(ProductSignalR product)
        {
            Clients.Others.destroy(product);
        }

        public ProductSignalR Create(ProductSignalR product)
        {
            product.ID = Guid.NewGuid();
            product.CreatedAt = DateTime.Now;

            Clients.Others.create(product);

            return product;
        }
    }
}