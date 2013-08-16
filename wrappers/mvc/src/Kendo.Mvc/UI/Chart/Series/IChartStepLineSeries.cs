namespace Kendo.Mvc.UI
{
    public interface IChartStepLineSeries : IChartBoundSeries
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
        /// Aggregate function for date series.
        /// </summary>
        ChartSeriesAggregate? Aggregate
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the step line chart data labels configuration
        /// </summary>
        ChartPointLabels Labels
        {
            get;
        }

        /// <summary>
        /// The step line chart markers configuration.
        /// </summary>
        ChartMarkers Markers
        {
            get;
            set;
        }

        /// <summary>
        /// The behavior for handling missing values in step line series.
        /// </summary>
        ChartStepLineMissingValues? MissingValues
        {
            get;
            set;
        }

        /// <summary>
        /// The step line chart step line configuration.
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