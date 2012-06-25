namespace Kendo.Mvc.Examples.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel;    
    
    public class ClientOrderViewModel
    {        
        public int OrderID
        {
            get;
            set;
        }
        
        public string ContactName
        {
            get;
            set;
        }

        public string ShipAddress
        {
            get;
            set;
        }

        [Required]
        public DateTime? OrderDate
        {
            get;
            set;
        }

        public string ShipCountry
        {
            get;
            set;
        }

        public string ShipName
        {
            get;
            set;
        }

        public int EmployeeID
        {
            get;
            set;
        }

        [UIHint("ClientEmployee"), Required]
        public ClientEmployeeViewModel Employee
        {
            get;
            set;
        }
    }
}
