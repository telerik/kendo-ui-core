// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using Telerik.Web.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring scatter series.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartScatterSeriesBuilder<T> : ChartScatterSeriesBuilderBase<IChartScatterSeries, ChartScatterSeriesBuilder<T>>
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartScatterSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartScatterSeriesBuilder(IChartScatterSeries series)
            : base(series)
        {
        }
    }
}