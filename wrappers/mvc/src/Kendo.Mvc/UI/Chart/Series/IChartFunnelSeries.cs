namespace Kendo.Mvc.UI
{
    public interface IChartFunnelSeries : IChartBoundSeries
    {
        /// <summary>
        /// Gets the series type.
        /// </summary>
        string Type
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the data visibleInLegend member of the series.
        /// </summary>
        string VisibleInLegendMember
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the ratio top-base/bottom-base of the funnel chart.
        /// </summary>
        double NeckRatio
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets dynamicSlope option of the funnel chart.
        /// </summary>
        bool DynamicSlope
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the dynamicHeight of the funnel chart.
        /// </summary>
        bool DynamicHeight
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the space between the segments of the funnel chart.
        /// </summary>
        double SegmentSpacing
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
        /// Gets or sets the funnel chart data labels configuration
        /// </summary>
        ChartFunnelLabels Labels
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the funnel segments border
        /// </summary>
        ChartElementBorder Border
        {
            get;
            set;
        }
    }
}