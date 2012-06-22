using System.Collections.Generic;

namespace Kendo.Mvc.UI.Tests
{
    public class BubbleData
    {
        public float X { get; set; }
        public float Y { get; set; }
        public float Size { get; set; }
    }

    public static class BubbleDataBuilder
    {
        public static List<BubbleData> GetCollection()
        {
            return new List<BubbleData>
            {
                new BubbleData
                {
                    X = 1, 
                    Y = 2,
                    Size = 3
                },

                new BubbleData
                {
                    X = 3, 
                    Y = 4,
                    Size = 3
                }
            };
        }
    }
}