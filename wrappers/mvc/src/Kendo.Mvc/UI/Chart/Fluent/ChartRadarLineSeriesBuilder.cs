using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI.Fluent
{
    public class ChartRadarLineSeriesBuilder<T> : ChartLineSeriesBuilderBase<IChartRadarLineSeries, ChartRadarLineSeriesBuilder<T>>
        where T : class
    {

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarLineSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartRadarLineSeriesBuilder(IChartRadarLineSeries series)
            : base(series)
        {
        } 

        /// <summary>
        /// Configures the style for radar line series.
        /// </summary>
        /// <param name="style">The style. The default is normal.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .RadarLine(s => s.Sales)
        ///                .Style(ChartRadarLineStyle.Smooth);
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartRadarLineSeriesBuilder<T> Style(ChartRadarLineStyle style)
        {
            Series.Style = style;

            return this;
        }
    }
}
