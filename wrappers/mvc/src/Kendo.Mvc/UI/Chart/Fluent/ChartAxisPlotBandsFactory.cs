namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Creates plot bands for the <see cref="ChartAxisPlotBandsFactory{TAxis}" />.
    /// </summary>
    public class ChartAxisPlotBandsFactory<TAxis> : IHideObjectMembers
        where TAxis : IChartAxis
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisPlotBandsFactory{TAxis}"/> class.
        /// </summary>
        /// <param name="axis">The axis.</param>
        public ChartAxisPlotBandsFactory(TAxis axis)
        {
            Guard.IsNotNull(axis, "axis");

            Axis = axis;
        }

        /// <summary>
        /// The Axis
        /// </summary>
        private TAxis Axis
        {
            get;
            set;
        }

        /// <summary>
        /// Defines a item.
        /// </summary>
        /// <returns></returns>
        public ChartPlotBandsBuilder Add()
        {
            ChartPlotBand item = new ChartPlotBand();

            Axis.PlotBands.Add(item);

            return new ChartPlotBandsBuilder(item);
        }
    }
}