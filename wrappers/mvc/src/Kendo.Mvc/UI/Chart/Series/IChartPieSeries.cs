namespace Kendo.Mvc.UI
{
    public interface IChartPieSeries : IChartBoundSeries
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
        /// Gets the data explode member of the series.
        /// </summary>
        string ExplodeMember
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