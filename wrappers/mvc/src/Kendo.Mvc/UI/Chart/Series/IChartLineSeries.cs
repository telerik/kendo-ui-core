namespace Kendo.Mvc.UI
{
    public interface IChartLineSeries : ILineSeries, ICategoricalErrorBarsSeries
    {

        /// <summary>
        /// The style of the series.
        /// </summary>
        ChartLineStyle Style
        {
            get;
            set;
        }
    }
}
