using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI
{
    public interface IBarSeries : IChartBoundSeries
    {
        /// <summary>
        /// A value indicating if the bars should be stacked.
        /// </summary>
        bool? Stacked
        {
            get;
            set;
        }

        /// <summary>
        /// The stack group that this series belongs to.
        /// </summary>
        string StackGroup
        {
            get;
            set;
        }

        /// <summary>
        /// The type of stack to plot
        /// </summary>
        ChartStackType? StackType
        {
            get;
            set;
        }

        /// <summary>
        /// Aggregate function for date series.
        /// </summary>
        ChartSeriesAggregate? Aggregate
        {
            get;
            set;
        }

        /// <summary>
        /// The distance between category clusters.
        /// </summary>
        double? Gap
        {
            get;
            set;
        }

        /// <summary>
        /// Space between bars.
        /// </summary>
        double? Spacing
        {
            get;
            set;
        }

        /// <summary>
        /// The orientation of the bars.
        /// </summary>
        ChartSeriesOrientation Orientation
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the bar chart data labels configuration
        /// </summary>
        ChartBarLabels Labels
        {
            get;
        }

        /// <summary>
        /// Gets or sets the bar's border
        /// </summary>
        ChartElementBorder Border
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the effects overlay
        /// </summary>
        ChartBarSeriesOverlay Overlay
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the model color member name.
        /// </summary>
        /// <value>The model color member name.</value>
        string ColorMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the series color for negative values
        /// </summary>
        string NegativeColor
        {
            get;
            set;
        }
    }
}
