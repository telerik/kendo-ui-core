namespace Kendo.Mvc.Examples.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel;    
    
    public class ClientEmployeeViewModel
    {
        [ReadOnly(true)]
        public int EmployeeID
        {
            get;
            set;
        }

        public string EmployeeName
        {
            get;
            set;
        }
    }
}
