
namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.ComponentModel.DataAnnotations;
    
    public class Customer
    {
        public int Id
        {
            get;
            set;
        }

        public string Name
        {
            get;
            set;
        }
        [Required]
        public string Address
        {
            get;
            set;
        }

        public DateTime RegisterAt
        {
            get;
            set;
        }

        public decimal Balance
        {
            get;
            set;
        }

        public bool IsActive
        {
            get;
            set;
        }

        public Gender Gender
        {
            get;
            set;
        }
    }

    public enum Gender
    {
        Female,
        Male
    }
}
