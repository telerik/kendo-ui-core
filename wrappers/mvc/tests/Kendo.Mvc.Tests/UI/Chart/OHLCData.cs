namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;

    public class OHLCData
    {
        public string Name { get; set; }
        public decimal Open { get; set; }
        public decimal High { get; set; }
        public decimal Low { get; set; }
        public decimal Close { get; set; }
        public string Color { get; set; }
        public string BaseColor { get; set; }
    }

    public static class OHLCDataBuilder
    {
        public static List<OHLCData> GetCollection()
        {
            return new List<OHLCData>
            {
                new OHLCData
                {
                    Open = 3,
                    High = 4,
                    Low = 0,
                    Close = 1,
                    Color = "Color",
                    BaseColor = "BaseColor"
                },

                new OHLCData
                {
                    Open = 4,
                    High = 5,
                    Low = 1,
                    Close = 2,
                    Color = "Color1",
                    BaseColor = "BaseColor1"
                }
            };
        }
    }
}