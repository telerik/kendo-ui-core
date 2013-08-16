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
        /// Defines the default settings for step line series.
        /// </summary>
        public virtual ChartStepLineSeriesBuilder<TModel> StepLine()
        {
            return new ChartStepLineSeriesBuilder<TModel>(chart.SeriesDefaults.StepLine);
        }

        /// <summary>
        /// Defines the default settings for vertical step line series.
        /// </summary>
        public virtual ChartStepLineSeriesBuilder<TModel> VerticalStepLine()
        {
            return new ChartStepLineSeriesBuilder<TModel>(chart.SeriesDefaults.VerticalStepLine);
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
        /// Defines the default settings for area step series.
        /// </summary>
        public virtual ChartStepAreaSeriesBuilder<TModel> StepArea()
        {
            return new ChartStepAreaSeriesBuilder<TModel>(chart.SeriesDefaults.StepArea);
        }

        /// <summary>
        /// Defines the default settings for vertical step area series.
        /// </summary>
        public virtual ChartStepAreaSeriesBuilder<TModel> VerticalStepArea()
        {
            return new ChartStepAreaSeriesBuilder<TModel>(chart.SeriesDefaults.VerticalStepArea);
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

        /// <summary>
        /// Defines the default settings for bullet series.
        /// </summary>
        public virtual ChartBulletSeriesBuilder<TModel> Bullet()
        {
            return new ChartBulletSeriesBuilder<TModel>(chart.SeriesDefaults.Bullet);
        }

        /// <summary>
        /// Defines the default settings for vertical bullet series.
        /// </summary>
        public virtual ChartBulletSeriesBuilder<TModel> VerticalBullet()
        {
            return new ChartBulletSeriesBuilder<TModel>(chart.SeriesDefaults.VerticalBullet);
        }

        /// <summary>
        /// Defines the default settings for radar area series.
        /// </summary>
        public virtual ChartAreaSeriesBuilder<TModel> RadarArea()
        {
            return new ChartAreaSeriesBuilder<TModel>(chart.SeriesDefaults.RadarArea);
        }

        /// <summary>
        /// Defines the default settings for radar column series.
        /// </summary>
        public virtual ChartBarSeriesBuilder<TModel> RadarColumn()
        {
            return new ChartBarSeriesBuilder<TModel>(chart.SeriesDefaults.RadarColumn);
        }

        /// <summary>
        /// Defines the default settings for radar line series.
        /// </summary>
        public virtual ChartLineSeriesBuilder<TModel> RadarLine()
        {
            return new ChartLineSeriesBuilder<TModel>(chart.SeriesDefaults.RadarLine);
        }
    }
}