// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Defines the behavior for handling missing values in line series.
    /// </summary>
    public enum ChartLineMissingValues
    {
        /// <summary>
        /// The value is interpolated from neighboring points.
        /// </summary>
        Interpolate,

        /// <summary>
        /// The value is assumed to be zero.
        /// </summary>
        Zero,

        /// <summary>
        /// The line stops before the missing point and continues after it.
        /// </summary>
        Gap
    }
}