namespace Kendo.Mvc.UI
{
    public interface IChartBarSeries : IBarSeries
    {
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