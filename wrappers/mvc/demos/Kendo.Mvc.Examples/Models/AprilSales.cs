namespace Kendo.Mvc.Examples.Models
{
    public class AprilSales
    {
        public AprilSales()
        {
        }

        public AprilSales(int current, int target, string category)
        {
            Current = current;
            Target = target;
            Category = category;
        }

        public string Category { get; set; }
        public int Current { get; set; }
        public int Target { get; set; }
    }
}