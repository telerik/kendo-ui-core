namespace Kendo.Mvc.UI
{
    public interface IChartLineSeries: ILineSeries
    {

        /// <summary>
        /// The style of the series.
        /// </summary>
        ChartLineStyle Style
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the series error bars options
        /// </summary>
        CategoricalErrorBars ErrorBars
        {
            get;
            set;
        }
    }
}
