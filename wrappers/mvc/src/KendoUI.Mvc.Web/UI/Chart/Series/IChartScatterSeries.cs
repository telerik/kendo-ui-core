// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System.Collections;

    /// <summary>
    /// Represents chart scatter series
    /// </summary>
    public interface IChartScatterSeries : IChartSeries
    {
        /// <summary>
        /// Gets the X data member of the series.
        /// </summary>
        string XMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the Y data member of the series.
        /// </summary>
        string YMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the scatter chart data labels configuration
        /// </summary>
        ChartPointLabels Labels
        {
            get;
            set;
        }

        /// <summary>
        /// The scatter chart markers configuration.
        /// </summary>
        ChartMarkers Markers
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the X axis name to use for this series.
        /// </summary>
        string XAxis
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Y axis name to use for this series.
        /// </summary>
        string YAxis
        {
            get;
            set;
        }

        /// <summary>
        /// The data used for binding.
        /// </summary>
        IEnumerable Data
        {
            get;
            set;
        }
    }
}