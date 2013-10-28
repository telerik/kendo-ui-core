namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring scatter series.
    /// </summary>
    /// <typeparam name="TSeries">The type of the data item</typeparam>
    /// <typeparam name="TBuilder">The type of the builder</typeparam>
    public abstract class ChartScatterSeriesBuilderBase<TSeries, TBuilder> : ChartSeriesBuilderBase<TSeries, TBuilder>
        where TSeries : IScatterSeries
        where TBuilder : ChartScatterSeriesBuilderBase<TSeries, TBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterSeriesBuilderBase{TSeries, TBuilder}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartScatterSeriesBuilderBase(TSeries series)
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
        public TBuilder Labels(Action<ChartPointLabelsBuilder> configurator)
        {
            configurator(new ChartPointLabelsBuilder(Series.Labels));

            return (TBuilder)this;
        }

        /// <summary>
        /// Sets the visibility of scatter chart labels.
        /// </summary>
        /// <param name="visible">The visibility. The default value is false.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .Scatter(s => s.x, s => s.y)
        ///                .Labels(true);
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder Labels(bool visible)
        {
            Series.Labels.Visible = visible;

            return (TBuilder)this;
        }

        /// <summary>
        /// Configures the scatter chart markers.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .Scatter(s => s.x, s => s.y)
        ///                .Markers(markers => markers
        ///                    .Type(ChartMarkerShape.Triangle)
        ///                );
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TBuilder Markers(Action<ChartMarkersBuilder> configurator)
        {
            configurator(new ChartMarkersBuilder(Series.Markers));

            return (TBuilder)this;
        }

        /// <summary>
        /// Sets the visibility of scatter chart markers.
        /// </summary>
        /// <param name="visible">The visibility. The default value is true.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .Scatter(s => s.x, s => s.y)
        ///                .Markers(true);
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TBuilder Markers(bool visible)
        {
            Series.Markers.Visible = visible;

            return (TBuilder)this;
        }

        /// <summary>
        /// Sets the axis name to use for this series.
        /// </summary>
        /// <param name="axis">The axis name for this series.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .Series(series => series.Scatter(s => s.X, s => s.Y).Name("Scatter").XAxis("secondary"))
        ///            .XAxis(axis => axis.Numeric())
        ///            .XAxis(axis => axis.Numeric("secondary"))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TBuilder XAxis(string axis)
        {
            Series.XAxis = axis;

            return (TBuilder)this;
        }

        /// <summary>
        /// Sets the axis name to use for this series.
        /// </summary>
        /// <param name="axis">The axis name for this series.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .Series(series => series.Scatter(s => s.Sales).Name("Sales").YAxis("secondary"))
        ///            .YAxis(axis => axis.Numeric())
        ///            .YAxis(axis => axis.Numeric("secondary"))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TBuilder YAxis(string axis)
        {
            Series.YAxis = axis;

            return (TBuilder)this;
        }

        /// <summary>
        /// Not applicable to scatter series
        /// </summary>
        [EditorBrowsable(EditorBrowsableState.Never)]
        public override TBuilder Axis(string axis)
        {
            return base.Axis(axis);
        }
    }
}