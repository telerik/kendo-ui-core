using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kendo.Mvc.Examples.Models
{
    public class InternetUsers
    {
        public InternetUsers(int year, string country, double value)
        {
            Year = year;
            Value = value;
            Country = country;
        }

        public int Year { get; set; }
        public double Value { get; set; }
        public string Country { get; set; }
    }
}