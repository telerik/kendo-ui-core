// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Represents the chart data binding settings
    /// </summary>
    public class ChartDataBindingSettings
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartDataBindingSettings" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        public ChartDataBindingSettings(IChart chart)
        {
            Ajax = new ChartBindingSettings(chart);
        }

        /// <summary>
        /// Represents the chart Ajax binding settings
        /// </summary>
        public ChartBindingSettings Ajax
        {
            get;
            private set;
        }
    }
}
