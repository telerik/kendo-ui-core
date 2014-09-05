namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Aggregate function for date series.
    /// </summary>
    public enum ChartSeriesAggregate
    {
        /// <summary>
        /// The highest value for the date period
        /// </summary>
        Max,

        /// <summary>
        /// The lowest value for the date period
        /// </summary>
        Min,

        /// <summary>
        /// The sum of all values for the date period
        /// </summary>
        Sum,

        /// <summary>
        /// The sum of all values for the date period. If there are not data for the current period of time the aggregate will return 'null'(instead of 'zero' for the sum aggregate).
        /// </summary>
        SumOrNull,

        /// <summary>
        /// The number of values for the date period
        /// </summary>
        Count,

        /// <summary>
        /// The average of all values for the date period
        /// </summary>
        Avg,

        /// <summary>
        /// The first of all values for the date period
        /// </summary>
        First
    }
}
