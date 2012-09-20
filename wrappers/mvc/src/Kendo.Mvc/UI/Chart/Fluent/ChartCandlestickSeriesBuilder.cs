namespace Kendo.Mvc.UI.Fluent
{
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring candlestick series.
    /// </summary>
    /// <typeparam name="T">The type of the data item</typeparam>
    public class ChartCandlestickSeriesBuilder<T> : ChartOHLCSeriesBuilder<T>
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartCandlestickSeriesBuilder{T}"/> class.
        /// </summary>
        /// <param name="series">The series.</param>
        public ChartCandlestickSeriesBuilder(IChartCandlestickSeries series)
            : base(series)
        {
             Series = series;
        }

        /// <summary>
        /// Gets or sets the series.
        /// </summary>
        /// <value>The series.</value>
        public new IChartCandlestickSeries Series
        {
            get;
            private set;
        }

        /// <summary>
        /// Sets the bar effects overlay
        /// </summary>
        /// <param name="overlay">The candlestick effects overlay. The default is ChartBarSeriesOverlay.Glass</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series.Candlestick(s => s.Sales).Overlay(ChartBarSeriesOverlay.None))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartCandlestickSeriesBuilder<T> Overlay(ChartBarSeriesOverlay overlay)
        {
            Series.Overlay = overlay;

            return this;
        }
    }
}