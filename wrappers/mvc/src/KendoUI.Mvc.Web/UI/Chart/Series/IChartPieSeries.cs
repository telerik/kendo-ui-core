// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Represents pie chart series
    /// </summary>
    public interface IChartPieSeries : IChartBoundSeries
    {
        /// <summary>
        /// Gets the data category member of the series.
        /// </summary>
        string CategoryMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the data expand member of the series.
        /// </summary>
        string ExplodeMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the data color member of the series.
        /// </summary>
        string ColorMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the pie chart data labels configuration
        /// </summary>
        ChartPieLabels Labels
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the pie's border
        /// </summary>
        ChartElementBorder Border
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the effects overlay
        /// </summary>
        ChartPieSeriesOverlay Overlay
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the padding of the pie chart
        /// </summary>
        int? Padding
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the start angle of the first pie segment
        /// </summary>
        int? StartAngle
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the pie chart connectors configuration
        /// </summary>
        ChartPieConnectors Connectors
        {
            get;
            set;
        }
    }
}