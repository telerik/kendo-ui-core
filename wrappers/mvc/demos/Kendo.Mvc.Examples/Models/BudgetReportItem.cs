namespace Kendo.Mvc.Examples.Models
{
    public class BudgetReportItem
    {
        public string Unit { get; set; }
        public int Budget { get; set; }
        public int Spending { get; set; }

        public BudgetReportItem(string unit, int budget, int spending)
        {
            Unit = unit;
            Budget = budget;
            Spending = spending;
        }
    }
}