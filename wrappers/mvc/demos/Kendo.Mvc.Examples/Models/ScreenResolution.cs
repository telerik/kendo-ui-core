namespace Kendo.Mvc.Examples.Models
{
    public class ScreenResolution
    {
        public ScreenResolution()
        {
        }

        public ScreenResolution(string year,string resolution,int share, bool visibleInLegend, int orderNumber)
        {
            Year = year;
            Resolution = resolution;
            Share = share;
            VisibleInLegend = visibleInLegend;
            OrderNumber = orderNumber;
        }

        public string Year { get; set; }
        public string Resolution { get; set; }
        public int Share { get; set; }
        public bool VisibleInLegend { get; set; }
        public int OrderNumber { get; set; }
    }
}