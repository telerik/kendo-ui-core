namespace Kendo.Mvc.UI
{
    public interface IChartScatterLineSeries : IChartScatterSeries
    {
        /// <summary>
        /// The line chart line width.
        /// </summary>
        double? Width
        {
            get;
            set;
        }

        /// <summary>
        /// The chart line dash type.
        /// </summary>
        ChartDashType? DashType
        {
            get;
            set;
        }

        /// <summary>
        /// The behavior for handling missing values in scatter line series.
        /// </summary>
        ChartScatterLineMissingValues? MissingValues
        {
            get;
            set;
        }

        /// <summary>
        /// The style of the series.
        /// </summary>
        ChartScatterLineStyle Style
        {
            get;
            set;
        }
    }
}