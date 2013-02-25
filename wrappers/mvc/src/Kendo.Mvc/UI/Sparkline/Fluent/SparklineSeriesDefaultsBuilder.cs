namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the sparkline series defaults.
    /// </summary>
    /// <typeparam name="TModel"></typeparam>
    public class SparklineSeriesDefaultsBuilder<TModel> : IHideObjectMembers where TModel : class
    {
        private readonly Sparkline<TModel> sparkline;

        public SparklineSeriesDefaultsBuilder(Sparkline<TModel> sparkline)
        {
            this.sparkline = sparkline;
        }

        /// <summary>
        /// Defines the default settings for bar series.
        /// </summary>
        public virtual ChartBarSeriesBuilder<TModel> Bar()
        {
            return new ChartBarSeriesBuilder<TModel>(sparkline.SeriesDefaults.Bar);
        }

        /// <summary>
        /// Defines the default settings for column series.
        /// </summary>
        public virtual ChartBarSeriesBuilder<TModel> Column()
        {
            return new ChartBarSeriesBuilder<TModel>(sparkline.SeriesDefaults.Column);
        }

        /// <summary>
        /// Defines the default settings for line series.
        /// </summary>
        public virtual ChartLineSeriesBuilder<TModel> Line()
        {
            return new ChartLineSeriesBuilder<TModel>(sparkline.SeriesDefaults.Line);
        }

        /// <summary>
        /// Defines the default settings for area series.
        /// </summary>
        public virtual ChartAreaSeriesBuilder<TModel> Area()
        {
            return new ChartAreaSeriesBuilder<TModel>(sparkline.SeriesDefaults.Area);
        }

        /// <summary>
        /// Defines the default settings for pie series.
        /// </summary>
        public virtual ChartPieSeriesBuilder<TModel> Pie()
        {
            return new ChartPieSeriesBuilder<TModel>(sparkline.SeriesDefaults.Pie);
        }
    }
}