namespace Kendo.Mvc.UI
{
    public class ChartOHLCAggregates
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartOHLCAggregates" /> class.
        /// </summary>
        /// <param name="open">The open aggregate.</param>
        /// <param name="high">The high aggregate.</param>
        /// <param name="low">The low aggregate.</param>
        /// <param name="close">The close aggregate.</param>
        public ChartOHLCAggregates(ChartSeriesAggregate? open, ChartSeriesAggregate? high, ChartSeriesAggregate? low, ChartSeriesAggregate? close)
        {
            Open = open;
            High = high;
            Low = low;
            Close = close;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartOHLCAggregates" /> class.
        /// </summary>
        public ChartOHLCAggregates()
        {
        }

        /// <summary>
        /// Gets or sets the open aggregate.
        /// </summary>
        public ChartSeriesAggregate? Open
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the high aggregate.
        /// </summary>
        public ChartSeriesAggregate? High
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the low aggregate.
        /// </summary>
        public ChartSeriesAggregate? Low
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the close aggregate.
        /// </summary>
        public ChartSeriesAggregate? Close
        {
            get;
            set;
        }

        public IChartSerializer CreateSerializer()
        {
            return new ChartOHLCAggregatesSerializer(this);
        }
    }
}