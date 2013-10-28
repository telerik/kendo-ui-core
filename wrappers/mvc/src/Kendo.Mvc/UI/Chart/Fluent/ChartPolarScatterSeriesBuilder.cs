using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI.Fluent
{
    public class ChartPolarScatterSeriesBuilder<T> : ChartScatterSeriesBuilderBase<IChartPolarScatterSeries, ChartPolarScatterSeriesBuilder<T>>
         where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPolarScatterSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartPolarScatterSeriesBuilder(IChartPolarScatterSeries series)
            : base(series)
        {
        }
    }
}
