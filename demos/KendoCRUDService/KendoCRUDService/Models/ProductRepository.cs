using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KendoCRUDService.Models
{
    public static class ProductRepository
    {
        public static IList<ProductModel> All()
        {
            var result = HttpContext.Current.Session["Products"] as IList<ProductModel>;

            if (result == null)
            {
                HttpContext.Current.Session["Products"] = result =
                    new SampleDataContext().Products.Select(p => new ProductModel
                     {
                         ProductID = p.ProductID,
                         ProductName = p.ProductName,
                         UnitPrice = (double)p.UnitPrice.GetValueOrDefault(),
                         UnitsInStock = p.UnitsInStock.GetValueOrDefault(),
                         Discontinued = p.Discontinued                         
                     }).ToList();
            }

            return result;
        }

        public static ProductModel One(Func<ProductModel, bool> predicate)
        {
            return All().FirstOrDefault(predicate);
        }

        public static void Insert(ProductModel product)
        {
            product.ProductID = All().OrderByDescending(p => p.ProductID).First().ProductID + 1;

            All().Insert(0, product);
        }

        public static void Insert(IEnumerable<ProductModel> products)
        {
            foreach (var product in products)
            {
                Insert(product);
            }
        }

        public static void Update(ProductModel product)
        {
            var target = One(p => p.ProductID == product.ProductID);
            if (target != null)
            {
                target.ProductName = product.ProductName;
                target.UnitPrice = product.UnitPrice;
                target.UnitsInStock = product.UnitsInStock;
                target.Discontinued = product.Discontinued;                
            }
        }

        public static void Update(IEnumerable<ProductModel> products)
        {
            foreach (var product in products)
            {
                Update(product);
            }
        }

        public static void Delete(ProductModel product)
        {
            var target = One(p => p.ProductID == product.ProductID);
            if (target != null)
            {
                All().Remove(target);
            }
        }

        public static void Delete(IEnumerable<ProductModel> products)
        {
            foreach (var product in products)
            {
                Delete(product);
            }
        }
    }
}