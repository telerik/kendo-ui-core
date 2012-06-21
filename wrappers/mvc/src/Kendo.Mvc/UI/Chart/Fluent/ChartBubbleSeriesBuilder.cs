namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.UI;
    using System;
    using System.ComponentModel;

    /// <summary>
    /// Defines the fluent interface for configuring bubble series.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartBubbleSeriesBuilder<T> : ChartScatterSeriesBuilderBase<IChartBubbleSeries, ChartBubbleSeriesBuilder<T>>
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartBubbleSeriesBuilder(IChartBubbleSeries series)
            : base(series)
        {
        }

        /// <summary>
        /// Configures the scatter chart labels.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .Scatter(s => s.x, s => s.y)
        ///                .Labels(labels => labels
        ///                    .Position(ChartBarLabelsPosition.Above)
        ///                    .Visible(true)
        ///                );
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBubbleSeriesBuilder<T> NegativeValues(Action<ChartNegativeValueSettingsBuilder> configurator)
        {
            configurator(new ChartNegativeValueSettingsBuilder(Series.NegativeValues));

            return this;
        }

        /// <summary>
        /// Sets the markers border
        /// </summary>
        /// <param name="width">The markers border width.</param>
        /// <param name="color">The markers border color (CSS syntax).</param>
        /// <param name="dashType">The markers border dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///                .Bubble(s => s.Sales)
        ///                .Border(1, "Red");
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartBubbleSeriesBuilder<T> Border(int width, string color)
        {
            Series.Border = new ChartElementBorder(width, color, ChartDashType.Solid);
            return this;
        }

        /// <summary>
        /// Not applicable to bubble series
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        public override ChartBubbleSeriesBuilder<T> Markers(Action<ChartMarkersBuilder> configurator)
        {
            return base.Markers(configurator);
        }

        /// <summary>
        /// Not applicable to bubble series
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        public override ChartBubbleSeriesBuilder<T> Markers(bool visible)
        {
            return base.Markers(visible);
        }
    }
}