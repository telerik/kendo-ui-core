// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Represents chart area chart series
    /// </summary>
    public interface IChartAreaSeries : IChartBoundSeries
    {
        /// <summary>
        /// A value indicating if the areas should be stacked.
        /// </summary>
        bool Stacked
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the area chart data labels configuration
        /// </summary>
        ChartPointLabels Labels
        {
            get;
        }

        /// <summary>
        /// The area chart markers configuration.
        /// </summary>
        ChartMarkers Markers
        {
            get;
            set;
        }

        /// <summary>
        /// The behavior for handling missing values in area series.
        /// </summary>
        ChartAreaMissingValues? MissingValues
        {
            get;
            set;
        }

        /// <summary>
        /// The area chart line configuration.
        /// </summary>
        ChartLine Line
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