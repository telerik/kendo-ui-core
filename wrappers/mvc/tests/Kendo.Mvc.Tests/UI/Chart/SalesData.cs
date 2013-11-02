namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;

    public class SalesData
    {
        public string RepName { get; set; }

        public string DateString { get; set; }

        public DateTime Date { get; set; }

        public decimal TotalSales { get; set; }

        public decimal RepSales { get; set; }

        public decimal RepSalesLow { get; set; }

        public decimal RepSalesHigh { get; set; }

        public bool Explode { get; set; }

        public bool VisibleInLegend { get; set; }

        public string Color { get; set; }

        public string NoteText { get; set; }
    }

    public static class SalesDataBuilder
    {
        public static List<SalesData> GetCollection()
        {
            return new List<SalesData>
            {
                new SalesData
                {
                    RepName = "Nancy Davolio",
                    Date = DateTime.Parse("2010/08/01"),
                    DateString = "Aug 2010",
                    TotalSales = 15458,
                    RepSales = 2015,
                    RepSalesLow = 2000,
                    RepSalesHigh = 2100,
                    Explode = true,
                    VisibleInLegend = true,
                    Color = "red",
                    NoteText = "NoteText"
                },

                null,

                new SalesData
                {
                    RepName = "Nancy Davolio", 
                    Date = DateTime.Parse("2010/09/01"),
                    DateString = "Sept 2010",
                    TotalSales = 26598,
                    RepSales = 6003,
                    RepSalesLow = 6000,
                    RepSalesHigh = 6100,
                    Explode = false,
                    VisibleInLegend = true,
                    NoteText = "NoteText"
                }
            };
        }
    }
}