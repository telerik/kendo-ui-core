namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring of all axes.
    /// </summary>
    public class ChartAxisDefaultsBuilder<TModel> : ChartAxisBuilderBase<IChartAxisDefaults, double, ChartAxisDefaultsBuilder<TModel>>
        where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisDefaultsBuilder{TModel}"/> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        public ChartAxisDefaultsBuilder(Chart<TModel> chart)
            : base(chart.AxisDefaults)
        {
        }
    }
}