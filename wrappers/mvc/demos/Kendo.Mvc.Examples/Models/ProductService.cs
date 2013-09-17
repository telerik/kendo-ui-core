using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Kendo.Mvc.Examples.Models
{
    public class ProductService : IDisposable
    {
        private SampleEntities entities;

        public ProductService(SampleEntities entities)
        {
            this.entities = entities;
        }

        public IEnumerable<ProductViewModel> Read()
        {
            return entities.Products.Select(product => new ProductViewModel
            {
                 ProductID = product.ProductID,
                 ProductName = product.ProductName,
                 UnitPrice = product.UnitPrice.HasValue ? product.UnitPrice.Value : default(decimal),
                 UnitsInStock = product.UnitsInStock.HasValue ? product.UnitsInStock.Value : default(short),
                 QuantityPerUnit = product.QuantityPerUnit,
                 Discontinued = product.Discontinued,
                 CategoryID = product.CategoryID,
                 Category = new CategoryViewModel()
                 {
                     CategoryID = product.Category.CategoryID,
                     CategoryName = product.Category.CategoryName
                 },
                 LastSupply = DateTime.Today
            });
        }

        public void Create(ProductViewModel product)
        {
            var entity = new Product();

            entity.ProductName = product.ProductName;
            entity.UnitPrice = product.UnitPrice;
            entity.UnitsInStock = (short)product.UnitsInStock;
            entity.Discontinued = product.Discontinued;
            entity.CategoryID = product.CategoryID;

            if (product.Category != null)
            {
                entity.CategoryID = product.Category.CategoryID;
            }

            entities.Products.Add(entity);
            entities.SaveChanges();

            product.ProductID = entity.ProductID;
        }

        public void Update(ProductViewModel product)
        {
            var entity = new Product();

            entity.ProductID = product.ProductID;
            entity.ProductName = product.ProductName;
            entity.UnitPrice = product.UnitPrice;
            entity.UnitsInStock = (short)product.UnitsInStock;
            entity.Discontinued = product.Discontinued;
            entity.CategoryID = product.CategoryID;

            if (product.Category != null)
            {
                entity.CategoryID = product.Category.CategoryID;
            }

            entities.Products.Attach(entity);
            entities.Entry(entity).State = EntityState.Modified;
            entities.SaveChanges();
        }

        public void Destroy(ProductViewModel product)
        {
            var entity = new Product();

            entity.ProductID = product.ProductID;

            entities.Products.Attach(entity);

            entities.Products.Remove(entity);

            var orderDetails = entities.Order_Details.Where(pd => pd.ProductID == entity.ProductID);

            foreach (var orderDetail in orderDetails)
            {
                entities.Order_Details.Remove(orderDetail);
            }

            entities.SaveChanges();
        }

        public void Dispose()
        {
            entities.Dispose();
        }
    }
}