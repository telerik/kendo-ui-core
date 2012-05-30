namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring scatter line series.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartScatterLineSeriesBuilder<T> : ChartScatterSeriesBuilderBase<IChartScatterLineSeries, ChartScatterLineSeriesBuilder<T>>
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
        /// Sets the chart line width.
        /// </summary>
        /// <param name="width">The line width.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.ScatterLine(s => s.x, s => s.y).Width(2))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartScatterLineSeriesBuilder<T> Width(double width)
        {
            Series.Width = width;

            return this;
        }

        /// <summary>
        /// Sets the chart line dash type.
        /// </summary>
        /// <param name="dashType">The line dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.ScatterLine(s => s.x, s => s.y).DashType(ChartDashType.Dot))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartScatterLineSeriesBuilder<T> DashType(ChartDashType dashType)
        {
            Series.DashType = dashType;

            return this;
        }

        /// <summary>
        /// Configures the behavior for handling missing values in scatter line series.
        /// </summary>
        /// <param name="missingValues">The missing values behavior. The default is to leave gaps.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .ScatterLine(s => s.x, s => s.y)
        ///                .MissingValues(ChartScatterLineMissingValues.Interpolate);
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartScatterLineSeriesBuilder<T> MissingValues(ChartScatterLineMissingValues missingValues)
        {
            Series.MissingValues = missingValues;

            return this;
        }
    }
}