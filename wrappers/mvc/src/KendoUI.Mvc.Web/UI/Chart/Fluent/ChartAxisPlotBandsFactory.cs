// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.UI;

    /// <summary>
    /// Creates plot bands for the <see cref="ChartAxisPlotBandsFactory{TAxis}" />.
    /// </summary>
    public class ChartAxisPlotBandsFactory<TAxis> : IHideObjectMembers
        where TAxis : IChartAxis
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisPlotBandsFactory{TAxis}"/> class.
        /// </summary>
        /// <param name="axis">The axis.</param>
        public ChartAxisPlotBandsFactory(TAxis axis)
        {
            Guard.IsNotNull(axis, "axis");

            Axis = axis;
        }

        /// <summary>
        /// The Axis
        /// </summary>
        private TAxis Axis
        {
            get;
            set;
        }

        /// <summary>
        /// Defines a item.
        /// </summary>
        /// <returns></returns>
        public ChartPlotBandsBuilder Add()
        {
            ChartPlotBand item = new ChartPlotBand();

            Axis.PlotBands.Add(item);

            return new ChartPlotBandsBuilder(item);
        }
    }
}