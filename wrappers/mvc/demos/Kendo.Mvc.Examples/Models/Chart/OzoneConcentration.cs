using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models
{
    public class OzoneConcentration
    {
        public int Year { get; set; }
        public double Lower { get; set; }
        public double Q1 { get; set; }
        public double Median { get; set; }
        public double Q3 { get; set; }
        public double Upper { get; set; }
        public double Mean { get; set; }
        public List<double> Outliers { get; set; }
    }
}