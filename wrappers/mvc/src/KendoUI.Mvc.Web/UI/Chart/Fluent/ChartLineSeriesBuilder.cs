// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring line series.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartLineSeriesBuilder<T> : ChartSeriesBuilderBase<IChartLineSeries, ChartLineSeriesBuilder<T>>
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
        /// Sets a value indicating if the lines should be stacked.
        /// </summary>
        /// <param name="stacked">A value indicating if the lines should be stacked.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .Series(series => series.Line(s => s.Sales).Stack(true))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartLineSeriesBuilder<T> Stack(bool stacked)
        {
            Series.Stacked = stacked;

            return this;
        }

        /// <summary>
        /// Configures the line chart labels.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .Series(series => series
        ///                 .Line(s => s.Sales)
        ///                 .Labels(labels => labels
        ///                     .Position(ChartBarLabelsPosition.Above)
        ///                     .Visible(true)
        ///                 );
        ///              )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartLineSeriesBuilder<T> Labels(Action<ChartPointLabelsBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new ChartPointLabelsBuilder(Series.Labels));

            return this;
        }

        /// <summary>
        /// Sets the visibility of line chart labels.
        /// </summary>
        /// <param name="visible">The visibility. The default value is false.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .Series(series => series
        ///                 .Line(s => s.Sales)
        ///                 .Labels(true);
        ///              )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartLineSeriesBuilder<T> Labels(bool visible)
        {
            Series.Labels.Visible = visible;

            return this;
        }

        /// <summary>
        /// Sets the line chart line width.
        /// </summary>
        /// <param name="width">The line width.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.Line(s => s.Sales).Width(2))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartLineSeriesBuilder<T> Width(double width)
        {
            Series.Width = width;

            return this;
        }

        /// <summary>
        /// Sets the line chart line dash type.
        /// </summary>
        /// <param name="dashType">The line dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series.Line(s => s.Sales).DashType(ChartDashType.Dot))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartLineSeriesBuilder<T> DashType(ChartDashType dashType)
        {
            Series.DashType = dashType;

            return this;
        }

        /// <summary>
        /// Configures the line chart markers.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .Series(series => series
        ///                 .Line(s => s.Sales)
        ///                 .Markers(markers => markers
        ///                     .Type(ChartMarkerShape.Triangle)
        ///                 );
        ///              )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartLineSeriesBuilder<T> Markers(Action<ChartMarkersBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new ChartMarkersBuilder(Series.Markers));

            return this;
        }

        /// <summary>
        /// Sets the visibility of line chart markers.
        /// </summary>
        /// <param name="visible">The visibility. The default value is true.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .Series(series => series
        ///                 .Line(s => s.Sales)
        ///                 .Markers(true);
        ///              )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartLineSeriesBuilder<T> Markers(bool visible)
        {
            Series.Markers.Visible = visible;

            return this;
        }

        /// <summary>
        /// Configures the behavior for handling missing values in line series.
        /// </summary>
        /// <param name="missingValues">The missing values behavior. The default is to leave gaps.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .Series(series => series
        ///                 .Line(s => s.Sales)
        ///                 .MissingValues(ChartLineMissingValues.Interpolate);
        ///              )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartLineSeriesBuilder<T> MissingValues(ChartLineMissingValues missingValues)
        {
            Series.MissingValues = missingValues;

            return this;
        }
    }
}