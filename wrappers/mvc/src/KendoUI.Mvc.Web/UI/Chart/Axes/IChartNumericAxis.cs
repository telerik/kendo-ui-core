// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Represents a numeric axis
    /// </summary>
    public interface IChartNumericAxis : IChartValueAxis
    {
        /// <summary>
        /// The axis minimum value
        /// </summary>
        double? Min { get; set; }

        /// <summary>
        /// The axis maximum value
        /// </summary>
        double? Max { get; set; }

        /// <summary>
        /// The interval between major divisions
        /// </summary>
        double? MajorUnit { get; set; }

        /// <summary>
        /// The axis label format
        /// </summary>
        string Format { get; set; }
    }
}