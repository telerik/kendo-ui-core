// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Defines the behavior for handling missing values in scatter line series.
    /// </summary>
    public enum ChartScatterLineMissingValues
    {
        /// <summary>
        /// The value is interpolated from neighboring points.
        /// </summary>
        Interpolate,

        /// <summary>
        /// The line stops before the missing point and continues after it.
        /// </summary>
        Gap
    }
}