namespace Kendo.Mvc.UI
{
    public interface IChartRangeBarSeries : IChartBarSeries
    {
        string FromField { get; set; }

        string ToField { get; set; }
    }
}
