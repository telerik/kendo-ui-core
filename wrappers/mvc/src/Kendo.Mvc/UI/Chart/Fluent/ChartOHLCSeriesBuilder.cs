namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring bar series.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartOHLCSeriesBuilder<T> : ChartSeriesBuilderBase<IChartOHLCSeries, ChartOHLCSeriesBuilder<T>>
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartOHLCSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartOHLCSeriesBuilder(IChartOHLCSeries series)
            : base(series)
        {
        }

        /// <summary>
        /// Sets the aggregate function for date series.
        /// This function is used when a category (an year, month, etc.) contains two or more points.
        /// </summary>
        /// <param name="open">Open aggregate name.</param>
        /// <param name="high">High aggregate name.</param>
        /// <param name="low">Low aggregate name.</param>
        /// <param name="close">Close aggregate name.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("Chart")
        ///             .Series(series => series.OHLC(s => s.Sales).Aggregates(ChartSeriesAggregate.Avg))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartOHLCSeriesBuilder<T> Aggregates(
            ChartSeriesAggregate? open = null,
            ChartSeriesAggregate? high = null,
            ChartSeriesAggregate? low = null,
            ChartSeriesAggregate? close = null
            )
        {
            Series.Aggregates.Open = open;
            Series.Aggregates.High = high;
            Series.Aggregates.Low = low;
            Series.Aggregates.Close = close;

            return this;
        }

        /// <summary>
        /// Set distance between category clusters. 
        /// <param name="gap">
        /// A value of 1 means that there is a total of 1 point width between categories. 
        /// The distance is distributed evenly on each side.
        /// The default value is 1
        /// </param>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///     .Name("Chart")
        ///     .Series(series => series.OHLC(s => s.Sales).Gap(1.5))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartOHLCSeriesBuilder<T> Gap(double gap)
        {
            Series.Gap = gap;

            return this;
        }

        /// <summary>
        /// Sets a value indicating the distance between points in the same category.
        /// </summary>
        /// <param name="spacing">
        /// Value of 1 means that the distance between points in the same category.
        /// The default value is 0.3
        /// </param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///     .Name("Chart")
        ///     .Series(series => series.Spacing(s => s.Sales).Spacing(1))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartOHLCSeriesBuilder<T> Spacing(double spacing)
        {
            Series.Spacing = spacing;

            return this;
        }

        /// <summary>
        /// Sets the points border
        /// </summary>
        /// <param name="width">The points border width.</param>
        /// <param name="color">The points border color (CSS syntax).</param>
        /// <param name="dashType">The points border dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.OHLC(s => s.Sales).Border("1", "#000", ChartDashType.Dot))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartOHLCSeriesBuilder<T> Border(int width, string color, ChartDashType dashType)
        {
            Series.Border = new ChartElementBorder(width, color, dashType);

            return this;
        }

        /// <summary>
        /// Configures the ohlc chart lines.
        /// </summary>
        /// <param name="width">The lines width.</param>
        /// <param name="color">The lines color.</param>
        /// <param name="dashType">The lines dashType.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .OHLC(s => s.Sales)        
        ///               .Line(2, "red", ChartDashType.Dot)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartOHLCSeriesBuilder<T> Line(int width, string color, ChartDashType dashType)
        {
            Series.Line.Width = width;
            Series.Line.Color = color;
            Series.Line.DashType = dashType;

            return this;
        }

        /// <summary>
        /// Configures the ohlc chart lines.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Area(s => s.Sales)        
        ///               .Line(line => line.Opacity(0.2))
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartOHLCSeriesBuilder<T> Line(Action<ChartAreaLineBuilder> configurator)
        {
            configurator(new ChartAreaLineBuilder(Series.Line));

            return this;
        }
    }
}