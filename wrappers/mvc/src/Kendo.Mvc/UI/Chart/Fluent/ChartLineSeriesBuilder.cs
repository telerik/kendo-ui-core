namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring line series.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartLineSeriesBuilder<T> : ChartLineSeriesBuilderBase<IChartLineSeries, ChartLineSeriesBuilder<T>>
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLineSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartLineSeriesBuilder(IChartLineSeries series)
            : base(series)
        {
        }    

        /// <summary>
        /// Configures the style for line series.
        /// </summary>
        /// <param name="style">The style. The default is normal.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .Line(s => s.Sales)
        ///                .Style(ChartLineStyle.Step);
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartLineSeriesBuilder<T> Style(ChartLineStyle style)
        {
            Series.Style = style;

            return this;
        }

        /// <summary>
        /// Configures the series error bars
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .Line(s => s.Sales)
        ///                .ErrorBars(e => e.Value(1));
        ///            )
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartLineSeriesBuilder<T> ErrorBars(Action<CategoricalErrorBarsBuilder> configurator)
        {
            configurator(new CategoricalErrorBarsBuilder(Series.ErrorBars));
            return this;
        }
    }
}