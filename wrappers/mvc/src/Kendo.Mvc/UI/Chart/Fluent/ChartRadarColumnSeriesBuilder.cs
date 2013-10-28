using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI.Fluent
{
    public class ChartRadarColumnSeriesBuilder<T> : ChartBarSeriesBuilderBase<IBarSeries, ChartRadarColumnSeriesBuilder<T>>
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRadarColumnSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartRadarColumnSeriesBuilder(IBarSeries series)
            : base(series)
        {
        }
    }
}
