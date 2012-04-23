// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Defines the available bar series effects overlays
    /// </summary>
    public sealed class ChartBarSeriesOverlay
    {
        private readonly object value;

        public object Value
        {
            get
            {
                return value;
            }
        }

        /// <summary>
        /// The bars have no effect overlay
        /// </summary>
        public static readonly ChartBarSeriesOverlay None =
            new ChartBarSeriesOverlay(null);

        /// <summary>
        /// The bars have glass effect overlay
        /// </summary>
        public static readonly ChartBarSeriesOverlay Glass =
            new ChartBarSeriesOverlay(new { gradient = "glass" });

        private ChartBarSeriesOverlay(object value)
        {
            this.value = value;
        }
    }
}
