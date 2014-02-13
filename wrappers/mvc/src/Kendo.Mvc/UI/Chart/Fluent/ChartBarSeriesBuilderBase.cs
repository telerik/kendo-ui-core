using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI.Fluent
{
    public class ChartBarSeriesBuilderBase<TSeries, TSeriesBuilder> : ChartSeriesBuilderBase<TSeries, TSeriesBuilder>
        where TSeriesBuilder : ChartBarSeriesBuilderBase<TSeries, TSeriesBuilder>
        where TSeries : IBarSeries
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBarSeriesBuilderBasee{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartBarSeriesBuilderBase(TSeries series)
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
        public TSeriesBuilder Stack(bool stacked)
        {
            Series.Stacked = stacked;

            return (TSeriesBuilder)this;
        }

        /// <summary>
        /// Sets the name of the stack that this series belongs to. Each unique name creates a new stack.
        /// </summary>
        /// <param name="stackGroup">The name of the stack group.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("Chart")
        ///             .Series(series => series.Bar(s => s.Sales).Stack("Female"))
        /// %&gt;
        /// </code>
        /// </example>
        public TSeriesBuilder Stack(string stackGroup)
        {
            Series.StackGroup = stackGroup;

            return (TSeriesBuilder)this;
        }

        /// <summary>
        /// Sets the name of the stack that this series belongs to. Each unique name creates a new stack.
        /// </summary>
        /// <param name="stackType">The stack type.</param>
        /// <param name="stackGroup">The name of the stack group.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("Chart")
        ///             .Series(series => series.Bar(s => s.Sales).Stack("Female"))
        /// %&gt;
        /// </code>
        /// </example>
        public TSeriesBuilder Stack(ChartStackType stackType, string stackGroup = null)
        {
            Series.StackType = stackType;

            if (stackGroup != null) {
                Series.StackGroup = stackGroup;
            }

            return (TSeriesBuilder)this;
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
        public TSeriesBuilder Aggregate(ChartSeriesAggregate aggregate)
        {
            Series.Aggregate = aggregate;

            return (TSeriesBuilder)this;
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
        public TSeriesBuilder Gap(double gap)
        {
            Series.Gap = gap;

            return (TSeriesBuilder)this;
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
        public TSeriesBuilder Spacing(double spacing)
        {
            Series.Spacing = spacing;

            return (TSeriesBuilder)this;
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
        public TSeriesBuilder Labels(Action<ChartBarLabelsBuilder> configurator)
        {

            configurator(new ChartBarLabelsBuilder(Series.Labels));

            return (TSeriesBuilder)this;
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
        public TSeriesBuilder Labels(bool visible)
        {
            Series.Labels.Visible = visible;

            return (TSeriesBuilder)this;
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
        public TSeriesBuilder Border(int width, string color, ChartDashType dashType)
        {
            Series.Border = new ChartElementBorder(width, color, dashType);

            return (TSeriesBuilder)this;
        }

        /// <summary>
        /// Configures the bar border
        /// </summary>
        /// <param name="configurator">The border configuration action</param>
        public TSeriesBuilder Border(Action<ChartBorderBuilder> configurator)
        {
            configurator(new ChartBorderBuilder(Series.Border));
            return (TSeriesBuilder)this;
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
        public TSeriesBuilder Overlay(ChartBarSeriesOverlay overlay)
        {
            Series.Overlay = overlay;

            return (TSeriesBuilder)this;
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
        public TSeriesBuilder NegativeColor(string color)
        {
            Series.NegativeColor = color;

            return (TSeriesBuilder)this;
        }
    }
}
