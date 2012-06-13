using System;
using System.Linq;

namespace Kendo.Mvc.Examples.Models
{
    public class InternetUsers
    {
        public InternetUsers()
        {
        }

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