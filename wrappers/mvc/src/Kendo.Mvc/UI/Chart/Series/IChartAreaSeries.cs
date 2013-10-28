namespace Kendo.Mvc.UI
{
    public interface IChartAreaSeries : IAreaSeries
    {

        /// <summary>
        /// The area chart line configuration.
        /// </summary>
        ChartAreaLine Line
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