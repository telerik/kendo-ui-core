using System;
using System.Linq;

namespace Kendo.Mvc.Examples.Models
{
    public class ElectricitySource
    {
        public ElectricitySource()
        {
        }

        public ElectricitySource(string source, int percentage)
        {
            Source = source;
            Percentage = percentage;
        }

        public string Source { get; set; }
        public int Percentage { get; set; }
        public bool Explode { get; set; }
    }
}