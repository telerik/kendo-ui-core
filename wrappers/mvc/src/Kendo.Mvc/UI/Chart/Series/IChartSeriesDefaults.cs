namespace Kendo.Mvc.UI
{
    public interface IChartSeriesDefaults : IChartSeries
    {
        /// <summary>
        /// The default settings for all bar series
        /// </summary>
        IChartBarSeries Bar
        {
            get;
        }

        /// <summary>
        /// The default settings for all column series
        /// </summary>
        IChartBarSeries Column
        {
            get;
        }

        /// <summary>
        /// The default settings for all line series
        /// </summary>
        IChartLineSeries Line
        {
            get;
        }

        /// <summary>
        /// The default settings for all vertical line series
        /// </summary>
        IChartLineSeries VerticalLine
        {
            get;
        }

        /// <summary>
        /// The default settings for all area series
        /// </summary>
        IChartAreaSeries Area
        {
            get;
        }

        /// <summary>
        /// The default settings for all vertical area series
        /// </summary>
        IChartAreaSeries VerticalArea
        {
            get;
        }

        /// <summary>
        /// The default settings for all pie series
        /// </summary>
        IChartPieSeries Pie
        {
            get;
        }

        /// <summary>
        /// The default settings for all donut series
        /// </summary>
        IChartDonutSeries Donut
        {
            get;
        }

        /// <summary>
        /// The default settings for all scatter series
        /// </summary>
        IChartScatterSeries Scatter
        {
            get;
        }

        /// <summary>
        /// The default settings for all scatter line series
        /// </summary>
        IChartScatterLineSeries ScatterLine
        {
            get;
        }

        /// <summary>
        /// The default settings for all ohlc series
        /// </summary>
        IChartOHLCSeries OHLC
        {
            get;
        }

        /// <summary>
        /// The default settings for all radar area series.
        /// </summary>
        IChartAreaSeries RadarArea
        {
            get;
        }

        /// <summary>
        /// The default settings for all radar column series.
        /// </summary>
        IChartBarSeries RadarColumn
        {
            get;
        }

        /// <summary>
        /// The default settings for all radar line series.
        /// </summary>
        IChartLineSeries RadarLine
        {
            get;
        }
    }
}