namespace Kendo.Mvc.UI
{
    public class ChartSeriesDefaults<T> : ChartSeriesBase<T>, IChartSeriesDefaults where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartSeriesDefaults{T}" /> class.
        /// </summary>
        public ChartSeriesDefaults()
        {
            Bar = new ChartBarSeries<T, object>();
            Column = new ChartBarSeries<T, object>();
            Line = new ChartLineSeries<T, object>();
            VerticalLine = new ChartLineSeries<T, object>();
            Pie = new ChartPieSeries<T, object>();
            Donut = new ChartDonutSeries<T, object>();
            Scatter = new ChartScatterSeries<T, object, object>();
            ScatterLine = new ChartScatterLineSeries<T, object, object>();
            Area = new ChartAreaSeries<T, object>();
            VerticalArea = new ChartAreaSeries<T, object>();
            StepArea = new ChartStepAreaSeries<T, object>();
            VerticalStepArea = new ChartStepAreaSeries<T, object>();
            OHLC = new ChartOHLCSeries<T, object, string>();
            Bullet = new ChartBulletSeries<T, object, string>();
            VerticalBullet = new ChartBulletSeries<T, object, string>();
            RadarArea = new ChartRadarAreaSeries<T, object>();
            RadarColumn = new ChartRadarColumnSeries<T, object>();
            RadarLine = new ChartRadarLineSeries<T, object>();
            PolarArea = new ChartPolarAreaSeries<T, object, object>();
            PolarLine = new ChartPolarLineSeries<T, object, object>();
            PolarScatter = new ChartPolarScatterSeries<T, object, object>();
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
        /// The default settings for all step area series.
        /// </summary>
        public IChartStepAreaSeries StepArea
        {
            get;
            private set;
        }

        /// <summary>
        /// The default settings for all vertical step area series.
        /// </summary>
        public IChartStepAreaSeries VerticalStepArea
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
        /// The default settings for all donut series.
        /// </summary>
        public IChartDonutSeries Donut
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

        /// <summary>
        /// The default settings for all bullet series.
        /// </summary>
        public IChartBulletSeries Bullet
        {
            get;
            private set;
        }

        /// <summary>
        /// The default settings for all vertical bullet series.
        /// </summary>
        public IChartBulletSeries VerticalBullet
        {
            get;
            private set;
        }

        /// <summary>
        /// The default settings for all radar area series.
        /// </summary>
        public IChartAreaSeries RadarArea
        {
            get;
            private set;
        }

        /// <summary>
        /// The default settings for all radar column series.
        /// </summary>
        public IChartBarSeries RadarColumn
        {
            get;
            private set;
        }

        /// <summary>
        /// The default settings for all radar line series.
        /// </summary>
        public IChartLineSeries RadarLine
        {
            get;
            private set;
        }

        /// <summary>
        /// The default settings for all polar area series.
        /// </summary>
        public IChartScatterSeries PolarArea
        {
            get;
            private set;
        }

        /// <summary>
        /// The default settings for all polar line series.
        /// </summary>
        public IChartScatterSeries PolarLine
        {
            get;
            private set;
        }

        /// <summary>
        /// The default settings for all polar scatter series.
        /// </summary>
        public IChartScatterSeries PolarScatter
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