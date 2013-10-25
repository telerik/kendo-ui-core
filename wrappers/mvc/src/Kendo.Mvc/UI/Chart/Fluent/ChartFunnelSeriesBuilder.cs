namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring funnel series.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartFunnelSeriesBuilder<T> : IHideObjectMembers
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartFunnelSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartFunnelSeriesBuilder(IChartFunnelSeries series)
        {
             Series = series;
        }

        /// <summary>
        /// Gets or sets the series.
        /// </summary>
        /// <value>The series.</value>
        public IChartFunnelSeries Series
        {
            get;
            private set;
        }

        /// <summary>
        /// Sets the name of the series.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .Series(series => series.Funnel(s => s.Sales, s => s.DateString).Name("Sales"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartFunnelSeriesBuilder<T> Name(string text)
        {
            Series.Name = text;

            return this;
        }

        /// <summary>
        /// Sets the segmentSpacing of the chart.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.Funnel(s => s.Sales, s => s.DateString).SegmentSpacing(5))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartFunnelSeriesBuilder<T> SegmentSpacing(double segmentSpacing)
        {
            Series.SegmentSpacing = segmentSpacing;

            return this;
        }

        /// <summary>
        /// Sets the neck ratio of the funnel chart.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.Funnel(s => s.Sales, s => s.DateString).NeckRatio(3))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartFunnelSeriesBuilder<T> NeckRatio(double neckRatio)
        {
            Series.NeckRatio = neckRatio;

            return this;
        }

        /// <summary>
        /// Sets the dynamic slope of the funnel chart.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.Funnel(s => s.Sales, s => s.DateString).DynamicSlope(true))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartFunnelSeriesBuilder<T> DynamicSlope(bool dynamicSlope)
        {
            Series.DynamicSlope = dynamicSlope;

            return this;
        }

        /// <summary>
        /// Sets the dynamic height of the funnel chart.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.Funnel(s => s.Sales, s => s.DateString).DynamicHeight(true))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartFunnelSeriesBuilder<T> DynamicHeight(bool dynamicHeight)
        {
            Series.DynamicHeight = dynamicHeight;

            return this;
        }

        /// <summary>
        /// Configures the funnel chart labels.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .Funnel(s => s.Sales, s => s.DateString)
        ///                .Labels(labels => labels
        ///                    .Color("red")
        ///                    .Visible(true)
        ///                );
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartFunnelSeriesBuilder<T> Labels(Action<ChartFunnelLabelsBuilder> configurator)
        {

            configurator(new ChartFunnelLabelsBuilder(Series.Labels));

            return this;
        }

        /// <summary>
        /// Sets the visibility of funnel chart labels.
        /// </summary>
        /// <param name="visible">The visibility. The default value is false.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .Funnel(s => s.Sales, s => s.DateString)
        ///                .Labels(true);
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartFunnelSeriesBuilder<T> Labels(bool visible)
        {
            Series.Labels.Visible = visible;

            return this;
        }

        /// <summary>
        /// Sets the funnel segments border
        /// </summary>
        /// <param name="width">The funnel segments border width.</param>
        /// <param name="color">The funnel segments border color (CSS syntax).</param>
        /// <param name="dashType">The funnel segments border dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series.Funnel(s => s.Sales, s => s.DateString).Border(1, "#000", ChartDashType.Dot))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartFunnelSeriesBuilder<T> Border(int width, string color, ChartDashType dashType)
        {
            Series.Border = new ChartElementBorder(width, color, dashType);

            return this;
        }

        /// <summary>
        /// Configures the funnel border
        /// </summary>
        /// <param name="configurator">The border configuration action</param>
        public ChartFunnelSeriesBuilder<T> Border(Action<ChartBorderBuilder> configurator)
        {
            configurator(new ChartBorderBuilder(Series.Border));
            return this;
        }

    }
}