namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring scatter line series.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartScatterLineSeriesBuilder<T> : ChartScatterLineSeriesBuilderBase<IChartScatterLineSeries, ChartScatterLineSeriesBuilder<T>>
        where T : class
    {

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterLineSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartScatterLineSeriesBuilder(IChartScatterLineSeries series)
            : base(series)
        {
        }

        /// <summary>
        /// Configures the scatter line series error bars.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .ScatterLine(s => s.x, s => s.y)
        ///                .ErrorBars(e => e.XValue(1))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ChartScatterLineSeriesBuilder<T> ErrorBars(Action<ScatterErrorBarsBuilder> configurator)
        {
            configurator(new ScatterErrorBarsBuilder(Series.ErrorBars));

            return this;
        }

        /// <summary>
        /// Configures the style for scatterLine series.
        /// </summary>
        /// <param name="style">The style. The default is normal.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .ScatterLine(s => s.x, s => s.y)
        ///                .Style(ChartScatterLineStyle.Smooth);
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartScatterLineSeriesBuilder<T> Style(ChartScatterLineStyle style)
        {
            Series.Style = style;

            return this;
        }
    }
}