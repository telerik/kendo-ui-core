namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;

    public class BoxPlotData
    {
        public string Name { get; set; }
        public decimal Lower { get; set; }
        public decimal Q1 { get; set; }
        public decimal Median { get; set; }
        public decimal Q3 { get; set; }
        public decimal Upper { get; set; }
        public decimal Mean { get; set; }
        public decimal[] Outliers { get; set; }
    }

    public static class BoxPlotDataBuilder
    {
        public static List<BoxPlotData> GetCollection()
        {
            return new List<BoxPlotData>
            {
                new BoxPlotData
                {
                    Lower = 3,
                    Q1 = 0,
                    Median = 1,
                    Q3 = 2,
                    Upper = 4,
                    Mean = 3
                }
            };
        }
    }
}