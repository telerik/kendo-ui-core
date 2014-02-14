namespace Kendo.Mvc.UI
{
    public interface ILineSeries : IChartBoundSeries
    {
        /// <summary>
        /// A value indicating if the lines should be stacked.
        /// </summary>
        bool? Stacked
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