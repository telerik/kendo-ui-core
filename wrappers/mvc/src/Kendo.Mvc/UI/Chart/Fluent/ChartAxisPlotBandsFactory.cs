namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.UI;

    /// <summary>
    /// Creates plot bands for the <see cref="ChartAxisPlotBandsFactory{TAxis, TValue}" />.
    /// </summary>
    public class ChartAxisPlotBandsFactory<TAxis, TValue> : IHideObjectMembers
        where TAxis : IChartAxis<TValue>
        where TValue : struct
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisPlotBandsFactory{TAxis, TValue}"/> class.
        /// </summary>
        /// <param name="axis">The axis.</param>
        public ChartAxisPlotBandsFactory(TAxis axis)
        {

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
        /// Adds a plot band.
        /// </summary>
        /// <returns></returns>
        public ChartPlotBandsBuilder<TValue> Add()
        {
            var item = new ChartPlotBand<TValue>();

            Axis.PlotBands.Add(item);

            return new ChartPlotBandsBuilder<TValue>(item);
        }

        /// <summary>
        /// Defines a item.
        /// </summary>
        /// <returns></returns>
        public ChartPlotBandsBuilder<TValue> Add(TValue from, TValue to, string color)
        {
            var item = new ChartPlotBand<TValue>();

            Axis.PlotBands.Add(item);
            item.From = from;
            item.To = to;
            item.Color = color;

            return new ChartPlotBandsBuilder<TValue>(item);
        }
    }
}