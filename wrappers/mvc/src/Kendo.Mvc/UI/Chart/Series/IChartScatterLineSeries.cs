namespace Kendo.Mvc.UI
{
    public interface IChartScatterLineSeries : IScatterLineSeries
    {
        /// <summary>
        /// The scatter line chart error bars configuration.
        /// </summary>
        ScatterErrorBars ErrorBars
        {
            get;
            set;
        }

        /// <summary>
        /// The style of the series.
        /// </summary>
        ChartScatterLineStyle Style
        {
            get;
            set;
        }
    }
}