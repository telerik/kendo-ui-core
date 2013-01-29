namespace Kendo.Mvc.Examples.Models
{
    using System;
    using System.Web;
    using System.Collections.Generic;
    using System.Linq;

    public static class SessionClientProductRepository
    {
        public static IList<ClientProductViewModel> All()
        {
            IList<ClientProductViewModel> result = (IList<ClientProductViewModel>)HttpContext.Current.Session["ClientProducts"];

            if (result == null)
            {
                HttpContext.Current.Session["ClientProducts"] = result =
                    (from product in new NorthwindDataContext().Products
                     select new ClientProductViewModel
                     {
                         ProductID = product.ProductID,
                         ProductName = product.ProductName,
                         UnitPrice = product.UnitPrice.HasValue ? product.UnitPrice.Value : default(decimal),
                         UnitsInStock = product.UnitsInStock.HasValue ? product.UnitsInStock.Value : default(short),
                         Discontinued = product.Discontinued,
                         CategoryID = product.CategoryID.HasValue ? product.CategoryID.Value : default(int),
                         Category = new ClientCategoryViewModel()
                         {
                             CategoryID = product.Category.CategoryID,
                             CategoryName = product.Category.CategoryName
                         }
                     }).ToList();
            }

            return result;
        }

        public static ClientProductViewModel One(Func<ClientProductViewModel, bool> predicate)
        {
            return All().Where(predicate).FirstOrDefault();
        }

        public static void Insert(ClientProductViewModel product)
        {
            product.ProductID = All().OrderByDescending(p => p.ProductID).First().ProductID + 1;
            product.CategoryID = product.Category.CategoryID;
            All().Insert(0, product);
        }

        public static void Update(ClientProductViewModel product)
        {
            ClientProductViewModel target = One(p => p.ProductID == product.ProductID);
            if (target != null)
            {
                target.ProductName = product.ProductName;
                target.UnitPrice = product.UnitPrice;
                target.UnitsInStock = product.UnitsInStock;
                target.Discontinued = product.Discontinued;
                target.Category = product.Category;
                target.CategoryID = product.Category.CategoryID;
            }
        }

        public static void Delete(ClientProductViewModel product)
        {
            ClientProductViewModel target = One(p => p.ProductID == product.ProductID);
            if (target != null)
            {
                All().Remove(target);
            }
        }
    }
}
