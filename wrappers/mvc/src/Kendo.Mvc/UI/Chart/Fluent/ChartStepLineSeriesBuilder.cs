namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring step line series.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartStepLineSeriesBuilder<T> : ChartSeriesBuilderBase<IChartStepLineSeries, ChartStepLineSeriesBuilder<T>>
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartStepLineSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartStepLineSeriesBuilder(IChartStepLineSeries series)
            : base(series)
        {
        }

        /// <summary>
        /// Sets a value indicating if the areas should be stacked.
        /// </summary>
        /// <param name="stacked">A value indicating if the areas should be stacked.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("Chart")
        ///             .Series(series => series.StepLine(s => s.Sales).Stack(true))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartStepLineSeriesBuilder<T> Stack(bool stacked)
        {
            Series.Stacked = stacked;

            return this;
        }

        /// <summary>
        /// Sets the aggregate function for date series.
        /// This function is used when a category (an year, month, etc.) contains two or more points.
        /// </summary>
        /// <param name="aggregate">Aggregate function name.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("Chart")
        ///             .Series(series => series.StepLine(s => s.Sales).Aggregate())
        /// %&gt;
        /// </code>
        /// </example>
        public ChartStepLineSeriesBuilder<T> Aggregate(ChartSeriesAggregate aggregate)
        {
            Series.Aggregate = aggregate;

            return this;
        }

        /// <summary>
        /// Configures the step line chart labels.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Chart()
        ///             .Name("Chart")
        ///             .Series(series => series
        ///                 .StepLine(s => s.Sales)
        ///                 .Labels(labels => labels
        ///                     .Position(ChartBarLabelsPosition.Above)
        ///                     .Visible(true)
        ///                 );
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartStepLineSeriesBuilder<T> Labels(Action<ChartPointLabelsBuilder> configurator)
        {
            configurator(new ChartPointLabelsBuilder(Series.Labels));

            return this;
        }

        /// <summary>
        /// Sets the visibility of step line chart labels.
        /// </summary>
        /// <param name="visible">The visibility. The default value is false.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Chart()
        ///             .Name("Chart")
        ///             .Series(series => series
        ///                 .StepLine(s => s.Sales)
        ///                 .Labels(true);
        ///              )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartStepLineSeriesBuilder<T> Labels(bool visible)
        {
            Series.Labels.Visible = visible;

            return this;
        }

        /// <summary>
        /// Configures the step line chart line.
        /// </summary>
        /// <param name="width">The line width.</param>
        /// <param name="color">The line color.</param>
        /// <param name="dashType">The line dashType.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .StepLine(s => s.Sales)        
        ///               .Line(2, "red", ChartDashType.Dot)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartStepLineSeriesBuilder<T> Line(int width, string color, ChartDashType dashType)
        {
            Series.Line.Width = width;
            Series.Line.Color = color;
            Series.Line.DashType = dashType;

            return this;
        }

        /// <summary>
        /// Configures the step line chart line.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .StepLine(s => s.Sales)        
        ///               .Line(line => line.Opacity(0.2))
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartStepLineSeriesBuilder<T> Line(Action<ChartAreaLineBuilder> configurator)
        {
            configurator(new ChartAreaLineBuilder(Series.Line));

            return this;
        }

        /// <summary>
        /// Configures the step line chart markers.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Chart()
        ///             .Name("Chart")
        ///             .Series(series => series
        ///                 .StepLine(s => s.Sales)
        ///                 .Markers(markers => markers
        ///                     .Type(ChartMarkerShape.Triangle)
        ///                 );
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartStepLineSeriesBuilder<T> Markers(Action<ChartMarkersBuilder> configurator)
        {
            configurator(new ChartMarkersBuilder(Series.Markers));

            return this;
        }

        /// <summary>
        /// Sets the visibility of step line chart markers.
        /// </summary>
        /// <param name="visible">The visibility. The default value is true.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Chart()
        ///             .Name("Chart")
        ///             .Series(series => series
        ///                 .StepLine(s => s.Sales)
        ///                 .Markers(true);
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartStepLineSeriesBuilder<T> Markers(bool visible)
        {
            Series.Markers.Visible = visible;

            return this;
        }

        /// <summary>
        /// Configures the behavior for handling missing values in step line series.
        /// </summary>
        /// <param name="missingValues">The missing values behavior. The default is to leave gaps.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Chart()
        ///             .Name("Chart")
        ///             .Series(series => series
        ///                 .StepLine(s => s.Sales)
        ///                 .MissingValues(ChartStepLineMissingValues.Interpolate);
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartStepLineSeriesBuilder<T> MissingValues(ChartStepLineMissingValues missingValues)
        {
            Series.MissingValues = missingValues;

            return this;
        }
    }
}