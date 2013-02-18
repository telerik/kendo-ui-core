namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the chart series defaults.
    /// </summary>
    /// <typeparam name="TModel"></typeparam>
    public class ChartSeriesDefaultsBuilder<TModel> : IHideObjectMembers where TModel : class
    {
        private readonly Chart<TModel> chart;

        public ChartSeriesDefaultsBuilder(Chart<TModel> chart)
        {
            this.chart = chart;
        }

        /// <summary>
        /// Defines the default settings for bar series.
        /// </summary>
        public virtual ChartBarSeriesBuilder<TModel> Bar()
        {
            return new ChartBarSeriesBuilder<TModel>(chart.SeriesDefaults.Bar);
        }

        /// <summary>
        /// Defines the default settings for column series.
        /// </summary>
        public virtual ChartBarSeriesBuilder<TModel> Column()
        {
            return new ChartBarSeriesBuilder<TModel>(chart.SeriesDefaults.Column);
        }

        /// <summary>
        /// Defines the default settings for line series.
        /// </summary>
        public virtual ChartLineSeriesBuilder<TModel> Line()
        {
            return new ChartLineSeriesBuilder<TModel>(chart.SeriesDefaults.Line);
        }

        /// <summary>
        /// Defines the default settings for vertical line series.
        /// </summary>
        public virtual ChartLineSeriesBuilder<TModel> VerticalLine()
        {
            return new ChartLineSeriesBuilder<TModel>(chart.SeriesDefaults.VerticalLine);
        }

        /// <summary>
        /// Defines the default settings for area series.
        /// </summary>
        public virtual ChartAreaSeriesBuilder<TModel> Area()
        {
            return new ChartAreaSeriesBuilder<TModel>(chart.SeriesDefaults.Area);
        }

        /// <summary>
        /// Defines the default settings for vertical area series.
        /// </summary>
        public virtual ChartAreaSeriesBuilder<TModel> VerticalArea()
        {
            return new ChartAreaSeriesBuilder<TModel>(chart.SeriesDefaults.VerticalArea);
        }

        /// <summary>
        /// Defines the default settings for pie series.
        /// </summary>
        public virtual ChartPieSeriesBuilder<TModel> Pie()
        {
            return new ChartPieSeriesBuilder<TModel>(chart.SeriesDefaults.Pie);
        }

        /// <summary>
        /// Defines the default settings for donut series.
        /// </summary>
        public virtual ChartPieSeriesBuilder<TModel> Donut()
        {
            return new ChartDonutSeriesBuilder<TModel>(chart.SeriesDefaults.Donut);
        }

        /// <summary>
        /// Defines the default settings for scatter series.
        /// </summary>
        public virtual ChartScatterSeriesBuilder<TModel> Scatter()
        {
            return new ChartScatterSeriesBuilder<TModel>(chart.SeriesDefaults.Scatter);
        }

        /// <summary>
        /// Defines the default settings for scatter line series.
        /// </summary>
        public virtual ChartScatterLineSeriesBuilder<TModel> ScatterLine()
        {
            return new ChartScatterLineSeriesBuilder<TModel>(chart.SeriesDefaults.ScatterLine);
        }

        /// <summary>
        /// Defines the default settings for ohlc series.
        /// </summary>
        public virtual ChartOHLCSeriesBuilder<TModel> OHLC()
        {
            return new ChartOHLCSeriesBuilder<TModel>(chart.SeriesDefaults.OHLC);
        }
    }
}