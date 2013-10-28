namespace Kendo.Mvc.Examples.Models
{
    public class SiteOptimizationItem
    {
        public SiteOptimizationItem()
        {
        }

        public SiteOptimizationItem(string description, int visitors)
        {
            Visitors = visitors;
            Description = description;
        }

        public string Description { get; set; }
        public int Visitors { get; set; }
    }
}