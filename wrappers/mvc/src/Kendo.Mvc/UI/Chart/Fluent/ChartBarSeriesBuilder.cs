namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring bar series.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartBarSeriesBuilder<T> : ChartSeriesBuilderBase<IChartBarSeries, ChartBarSeriesBuilder<T>>
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBarSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartBarSeriesBuilder(IChartBarSeries series)
            : base(series)
        {
        }

        /// <summary>
        /// Sets a value indicating if the bars should be stacked.
        /// </summary>
        /// <param name="stacked">A value indicating if the bars should be stacked.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("Chart")
        ///             .Series(series => series.Bar(s => s.Sales).Stack(true))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBarSeriesBuilder<T> Stack(bool stacked)
        {
            Series.Stacked = stacked;

            return this;
        }

        /// <summary>
        /// Sets the name of the stack that this series belongs to. Each unique name creates a new stack.
        /// </summary>
        /// <param name="stackName">The name of the stack.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("Chart")
        ///             .Series(series => series.Bar(s => s.Sales).Stack("Female"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBarSeriesBuilder<T> Stack(string stackName)
        {
            Series.StackName = stackName;

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
        ///             .Series(series => series.Bar(s => s.Sales).Aggregate())
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBarSeriesBuilder<T> Aggregate(ChartSeriesAggregate aggregate)
        {
            Series.Aggregate = aggregate;

            return this;
        }

        /// <summary>
        /// Set distance between category clusters. 
        /// <param name="gap">
        /// A value of 1 means that there is a total of 1 column width / bar height between categories.
        /// The distance is distributed evenly on each side.
        /// The default value is 1.5
        /// </param>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///     .Name("Chart")
        ///     .Series(series => series.Bar(s => s.Sales).Gap(1))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBarSeriesBuilder<T> Gap(double gap)
        {
            Series.Gap = gap;

            return this;
        }

        /// <summary>
        /// Sets a value indicating the distance between bars / categories.
        /// </summary>
        /// <param name="spacing">
        /// Value of 1 means that the distance between bars is equal to their width.
        /// The default value is 0
        /// </param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///     .Name("Chart")
        ///     .Series(series => series.Spacing(s => s.Sales).Spacing(1))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBarSeriesBuilder<T> Spacing(double spacing)
        {
            Series.Spacing = spacing;

            return this;
        }

        /// <summary>
        /// Configures the bar chart labels.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Chart()
        ///             .Name("Chart")
        ///             .Series(series => series
        ///                 .Bar(s => s.Sales)
        ///                 .Labels(labels => labels
        ///                     .Position(ChartBarLabelsPosition.InsideEnd)
        ///                     .Visible(true)
        ///                 );
        ///              )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBarSeriesBuilder<T> Labels(Action<ChartBarLabelsBuilder> configurator)
        {

            configurator(new ChartBarLabelsBuilder(Series.Labels));

            return this;
        }

        /// <summary>
        /// Sets the visibility of bar chart labels.
        /// </summary>
        /// <param name="visible">The visibility. The default value is false.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Chart()
        ///             .Name("Chart")
        ///             .Series(series => series
        ///                 .Bar(s => s.Sales)
        ///                 .Labels(true);
        ///              )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBarSeriesBuilder<T> Labels(bool visible)
        {
            Series.Labels.Visible = visible;

            return this;
        }

        /// <summary>
        /// Sets the bars border
        /// </summary>
        /// <param name="width">The bars border width.</param>
        /// <param name="color">The bars border color (CSS syntax).</param>
        /// <param name="dashType">The bars border dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.Bar(s => s.Sales).Border("1", "#000", ChartDashType.Dot))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartBarSeriesBuilder<T> Border(int width, string color, ChartDashType dashType)
        {
            Series.Border = new ChartElementBorder(width, color, dashType);

            return this;
        }

        /// <summary>
        /// Sets the bar effects overlay
        /// </summary>
        /// <param name="overlay">The bar effects overlay. The default is ChartBarSeriesOverlay.Glass</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.Bar(s => s.Sales).Overlay(ChartBarSeriesOverlay.None))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartBarSeriesBuilder<T> Overlay(ChartBarSeriesOverlay overlay)
        {
            Series.Overlay = overlay;

            return this;
        }

        /// <summary>
        /// Sets the bar color for negative values
        /// </summary>
        /// <param name="color">The bar color for negative values(CSS syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.Bar(s => s.Sales).NegativeColor("Red"))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartBarSeriesBuilder<T> NegativeColor(string color)
        {
            Series.NegativeColor = color;

            return this;
        }
    }
}