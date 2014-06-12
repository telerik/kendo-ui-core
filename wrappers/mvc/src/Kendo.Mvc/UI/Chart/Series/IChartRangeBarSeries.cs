namespace Kendo.Mvc.UI
{
    public interface IChartRangeBarSeries : IBarSeries
    {
        string FromField { get; set; }

        string ToField { get; set; }
    }
}
