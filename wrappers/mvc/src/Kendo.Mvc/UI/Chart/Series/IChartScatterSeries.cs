namespace Kendo.Mvc.UI
{
    using System.Collections;

    public interface IChartScatterSeries : IScatterSeries
    {
        /// <summary>
        /// The scatter chart error bars configuration.
        /// </summary>
        ScatterErrorBars ErrorBars
        {
            get;
            set;
        }
    }
}