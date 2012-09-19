namespace Kendo.Mvc.UI
{
    public class ChartSeriesDefaults<T> : ChartSeriesBase<T>, IChartSeriesDefaults where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartSeriesDefaults{T}" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        public ChartSeriesDefaults(Chart<T> chart)
            : base(chart)
        {
            Bar = new ChartBarSeries<T, object>(chart);
            Column = new ChartBarSeries<T, object>(chart);
            Line = new ChartLineSeries<T, object>(chart);
            VerticalLine = new ChartLineSeries<T, object>(chart);
            Pie = new ChartPieSeries<T, object>(chart);
            Scatter = new ChartScatterSeries<T, object, object>(chart);
            ScatterLine = new ChartScatterLineSeries<T, object, object>(chart);
            Area = new ChartAreaSeries<T, object>(chart);
            VerticalArea = new ChartAreaSeries<T, object>(chart);
            OHLC = new ChartOHLCSeries<T, object>(chart);
        }

        /// <summary>
        /// The default settings for all bar series.
        /// </summary>
        public IChartBarSeries Bar
        {
            get;
            private set;
        }

        /// <summary>
        /// The default settings for all column series.
        /// </summary>
        public IChartBarSeries Column
        {
            get;
            private set;
        }

        /// <summary>
        /// The default settings for all area series.
        /// </summary>
        public IChartAreaSeries Area
        {
            get;
            private set;
        }

        /// <summary>
        /// The default settings for all vertical area series.
        /// </summary>
        public IChartAreaSeries VerticalArea
        {
            get;
            private set;
        }

        /// <summary>
        /// The default settings for all line series.
        /// </summary>
        public IChartLineSeries Line
        {
            get;
            private set;
        }

        /// <summary>
        /// The default settings for all vertical line series.
        /// </summary>
        public IChartLineSeries VerticalLine
        {
            get;
            private set;
        }

        /// <summary>
        /// The default settings for all pie series.
        /// </summary>
        public IChartPieSeries Pie
        {
            get;
            private set;
        }

        /// <summary>
        /// The default settings for all scatter series.
        /// </summary>
        public IChartScatterSeries Scatter
        {
            get;
            private set;
        }

        /// <summary>
        /// The default settings for all scatter line series.
        /// </summary>
        public IChartScatterLineSeries ScatterLine
        {
            get;
            private set;
        }

        /// <summary>
        /// The default settings for all ohlc series.
        /// </summary>
        public IChartOHLCSeries OHLC
        {
            get;
            private set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartSeriesDefaultsSerializer(this);
        }
    }
}