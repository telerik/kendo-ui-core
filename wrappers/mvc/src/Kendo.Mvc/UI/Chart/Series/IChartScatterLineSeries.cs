namespace Kendo.Mvc.UI
{
    public interface IChartScatterLineSeries : IScatterLineSeries, IScatterErrorBarsSeries 
    {
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