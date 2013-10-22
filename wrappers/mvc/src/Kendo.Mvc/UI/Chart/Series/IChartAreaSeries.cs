namespace Kendo.Mvc.UI
{
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
        /// Aggregate function for date series.
        /// </summary>
        ChartSeriesAggregate? Aggregate
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
        ChartAreaLine Line
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

        /// <summary>
        /// The style of the series.
        /// </summary>
        ChartAreaStyle Style
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the series error bars options
        /// </summary>
        CategoricalErrorBars ErrorBars
        {
            get;
            set;
        }
    }
}