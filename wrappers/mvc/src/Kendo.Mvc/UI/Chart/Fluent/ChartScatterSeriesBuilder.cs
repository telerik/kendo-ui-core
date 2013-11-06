namespace Kendo.Mvc.UI.Fluent
{
    using System;
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

        /// <summary>
        /// Configures the scatter series error bars.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .Scatter(s => s.x, s => s.y)
        ///                .ErrorBars(e => e.XValue(1))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ChartScatterSeriesBuilder<T> ErrorBars(Action<ScatterErrorBarsBuilder> configurator)
        {
            configurator(new ScatterErrorBarsBuilder(Series.ErrorBars));

            return this;
        }
    }
}