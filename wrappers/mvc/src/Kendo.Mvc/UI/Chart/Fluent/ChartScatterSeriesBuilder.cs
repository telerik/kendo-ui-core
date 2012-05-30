namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring scatter series.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartScatterSeriesBuilder<T> : ChartScatterSeriesBuilderBase<IChartScatterSeries, ChartScatterSeriesBuilder<T>>
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartScatterSeriesBuilder(IChartScatterSeries series)
            : base(series)
        {
        }
    }
}