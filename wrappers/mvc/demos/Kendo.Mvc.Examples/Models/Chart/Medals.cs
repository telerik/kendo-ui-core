using System;
using System.Linq;

namespace Kendo.Mvc.Examples.Models
{
    public class Medals
    {
        public Medals()
        {
        }

        public Medals(int year, int standing, int number, string country)
        {
            Year = year;
            Standing = standing;
            Number = number;
            Country = country;
        }

        public int Year { get; set; }
        public int Standing { get; set; }
        public int Number { get; set; }
        public string Country { get; set; }
    }
}