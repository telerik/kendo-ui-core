using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Kendo.Mvc.Examples.Models
{
    public class ClientProductViewModel
    {
        [ScaffoldColumn(false)]
        public int ProductID
        {
            get;
            set;
        }

        [Required]
        [DisplayName("Product name")]
        public string ProductName
        {
            get;
            set;
        }

        [Required]
        [DisplayName("Unit price")]
        [DataType(DataType.Currency)]
        [Range(0, int.MaxValue)]
        public decimal UnitPrice
        {
            get;
            set;
        }

        [Required]
        [DisplayName("Units in stock")]
        [DataType("Integer")]
        [Range(0, int.MaxValue)]
        public int UnitsInStock
        {
            get;
            set;
        }

        public bool Discontinued
        {
            get;
            set;
        }

        [DisplayName("Quantity Per Unit")]
        public string QuantityPerUnit
        {
            get;
            set;
        }

        public int CategoryID { get; set; }

        [UIHint("ClientCategory")]
        public ClientCategoryViewModel Category { get; set; }
    }
}