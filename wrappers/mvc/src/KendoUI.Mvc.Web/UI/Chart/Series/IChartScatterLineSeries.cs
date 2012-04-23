// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Represents chart scatter line series
    /// </summary>
    public interface IChartScatterLineSeries : IChartScatterSeries
    {
        /// <summary>
        /// The line chart line width.
        /// </summary>
        double? Width
        {
            get;
            set;
        }

        /// <summary>
        /// The chart line dash type.
        /// </summary>
        ChartDashType? DashType
        {
            get;
            set;
        }

        /// <summary>
        /// The behavior for handling missing values in scatter line series.
        /// </summary>
        ChartScatterLineMissingValues? MissingValues
        {
            get;
            set;
        }
    }
}