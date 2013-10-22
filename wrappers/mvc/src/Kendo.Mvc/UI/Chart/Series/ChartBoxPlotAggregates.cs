namespace Kendo.Mvc.UI
{
    public class ChartBoxPlotAggregates
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBoxPlotAggregates" /> class.
        /// </summary>
        /// <param name="lower">The lower aggregate.</param>
        /// <param name="q1">The q1 aggregate.</param>
        /// <param name="median">The median aggregate.</param>
        /// <param name="q3">The q3 aggregate.</param>
        /// <param name="upper">The upper aggregate.</param>
        /// <param name="mean">The mean aggregate.</param>
        /// <param name="outliers">The outliers aggregate.</param>
        public ChartBoxPlotAggregates(
            ChartSeriesAggregate? lower,
            ChartSeriesAggregate? q1,
            ChartSeriesAggregate? median,
            ChartSeriesAggregate? q3,
            ChartSeriesAggregate? upper,
            ChartSeriesAggregate? mean,
            ChartSeriesAggregate? outliers)
        {
            Lower = lower;
            Q1 = q1;
            Median = median;
            Q3 = q3;
            Upper = upper;
            Mean = mean;
            Outliers = outliers;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBoxPlotAggregates" /> class.
        /// </summary>
        public ChartBoxPlotAggregates()
        {
        }

        /// <summary>
        /// Gets or sets the lower aggregate.
        /// </summary>
        public ChartSeriesAggregate? Lower { get; set; }

        /// <summary>
        /// Gets or sets the q1 aggregate.
        /// </summary>
        public ChartSeriesAggregate? Q1 { get; set; }

        /// <summary>
        /// Gets or sets the median aggregate.
        /// </summary>
        public ChartSeriesAggregate? Median { get; set; }

        /// <summary>
        /// Gets or sets the q3 aggregate.
        /// </summary>
        public ChartSeriesAggregate? Q3 { get; set; }

        /// <summary>
        /// Gets or sets the upper aggregate.
        /// </summary>
        public ChartSeriesAggregate? Upper { get; set; }

        /// <summary>
        /// Gets or sets the mean aggregate.
        /// </summary>
        public ChartSeriesAggregate? Mean { get; set; }

        /// <summary>
        /// Gets or sets the outliers aggregate.
        /// </summary>
        public ChartSeriesAggregate? Outliers { get; set; }

        public IChartSerializer CreateSerializer()
        {
            return new ChartBoxPlotAggregatesSerializer(this);
        }
    }
}