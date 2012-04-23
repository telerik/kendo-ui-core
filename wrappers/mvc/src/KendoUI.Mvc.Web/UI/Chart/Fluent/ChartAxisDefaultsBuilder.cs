// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring of all axes.
    /// </summary>
    public class ChartAxisDefaultsBuilder<TModel> : ChartAxisBuilderBase<IChartAxisDefaults, ChartAxisDefaultsBuilder<TModel>>
        where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisDefaultsBuilder{TModel}"/> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        public ChartAxisDefaultsBuilder(Chart<TModel> chart)
            : base(chart.AxisDefaults)
        {
        }
    }
}