// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Represents chart line chart series
    /// </summary>
    public interface IChartLineSeries : IChartBoundSeries
    {
        /// <summary>
        /// A value indicating if the lines should be stacked.
        /// </summary>
        bool Stacked
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the line chart data labels configuration
        /// </summary>
        ChartPointLabels Labels
        {
            get;
        }

        /// <summary>
        /// The line chart markers configuration.
        /// </summary>
        ChartMarkers Markers
        {
            get;
            set;
        }

        /// <summary>
        /// The line chart line width.
        /// </summary>
        double? Width
        {
            get;
            set;
        }

        /// <summary>
        /// The line chart line dash type.
        /// </summary>
        ChartDashType? DashType
        {
            get;
            set;
        }

        /// <summary>
        /// The behavior for handling missing values in line series.
        /// </summary>
        ChartLineMissingValues? MissingValues
        {
            get;
            set;
        }

        /// <summary>
        /// The orientation of the series.
        /// </summary>
        ChartSeriesOrientation Orientation
        {
            get;
            set;
        }
    }
}