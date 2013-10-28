using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI.Fluent
{
    public abstract class ChartScatterLineSeriesBuilderBase<TSeries, TBuilder>: ChartScatterSeriesBuilderBase<TSeries, TBuilder>
        where TBuilder : ChartScatterLineSeriesBuilderBase<TSeries, TBuilder>
        where TSeries : IScatterLineSeries
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterLineSeriesBuilderBase{TSeries, TBuilder}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartScatterLineSeriesBuilderBase(TSeries series)
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
        public TBuilder Width(double width)
        {
            Series.Width = width;

            return (TBuilder)this;
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
        public TBuilder DashType(ChartDashType dashType)
        {
            Series.DashType = dashType;

            return (TBuilder)this;
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
        public TBuilder MissingValues(ChartScatterLineMissingValues missingValues)
        {
            Series.MissingValues = missingValues;

            return (TBuilder)this;
        }
    }
}
