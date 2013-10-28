using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI.Fluent
{
    public class ChartPolarLineSeriesBuilder<T> : ChartScatterLineSeriesBuilderBase<IChartPolarLineSeries, ChartPolarLineSeriesBuilder<T>>
         where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPolarLineSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartPolarLineSeriesBuilder(IChartPolarLineSeries series)
            : base(series)
        {
        }

        /// <summary>
        /// Configures the style for scatterLine series.
        /// </summary>
        /// <param name="style">The style. The default is normal.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .PolarLine(s => s.x, s => s.y)
        ///                .Style(ChartPolarLineStyle.Smooth);
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartPolarLineSeriesBuilder<T> Style(ChartPolarLineStyle style)
        {
            Series.Style = style;

            return this;
        }
    }
}
