namespace Kendo.Mvc.Examples.Models
{
    using System.ComponentModel.DataAnnotations;

    public class ProductDto
    {        
        public int ProductID
        {
            get;
            set;
        }

        public string ProductName
        {
            get;
            set;
        }
        
        public decimal UnitPrice
        {
            get;
            set;
        }

        public int UnitsInStock
        {
            get;
            set;
        }

        public int UnitsOnOrder
        {
            get;
            set;
        }

        public bool Discontinued
        {
            get;
            set;
        }
    }
}