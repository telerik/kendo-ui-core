namespace Kendo.Mvc.Examples.Models
{
    using System;
    using System.Web;
    using System.Collections.Generic;
    using System.Linq;

    public static class SessionProductRepository
    {
        public static IList<EditableProduct> All()
        {
            IList<EditableProduct> result = (IList<EditableProduct>)HttpContext.Current.Session["Products"];

            if (result == null)
            {
                HttpContext.Current.Session["Products"] = result =
                    (from product in new NorthwindDataContext().Products
                     select new EditableProduct
                     {
                         ProductID = product.ProductID,
                         ProductName = product.ProductName,
                         UnitPrice = product.UnitPrice.HasValue ? product.UnitPrice.Value : default(decimal),
                         UnitsInStock = product.UnitsInStock.HasValue ? product.UnitsInStock.Value : default(int),
                         Discontinued = product.Discontinued,
                         LastSupply = DateTime.Today
                     }).ToList();
            }

            return result;
        }

        public static EditableProduct One(Func<EditableProduct, bool> predicate)
        {
            return All().Where(predicate).FirstOrDefault();
        }

        public static void Insert(EditableProduct product)
        {
            product.ProductID = All().OrderByDescending(p => p.ProductID).First().ProductID + 1;

            All().Insert(0, product);
        }

        public static void Update(EditableProduct product)
        {
            EditableProduct target = One(p => p.ProductID == product.ProductID);
            if (target != null)
            {
                target.ProductName = product.ProductName;
                target.UnitPrice = product.UnitPrice;
                target.UnitsInStock = product.UnitsInStock;
                target.Discontinued = product.Discontinued;
                target.LastSupply = product.LastSupply;
            }
        }

        public static void Delete(EditableProduct product)
        {
            EditableProduct target = One(p => p.ProductID == product.ProductID);
            if (target != null)
            {
                All().Remove(target);
            }
        }
    }
}