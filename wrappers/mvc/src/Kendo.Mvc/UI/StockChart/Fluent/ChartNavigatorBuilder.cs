namespace Kendo.Mvc.UI.Fluent
{
    using System;
    
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="ChartNavigator"/>.
    /// </summary>
    public class ChartNavigatorBuilder<T> : IHideObjectMembers where T : class
    {
        private readonly ChartNavigator<T> navigator;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNavigatorBuilder" /> class.
        /// </summary>
        /// <param name="chartTitle">The stock chart navigator.</param>
        public ChartNavigatorBuilder(ChartNavigator<T> chartNavigator)
        {
            navigator = chartNavigator;
        }

        /// <summary>
        /// Sets the selection range
        /// </summary>
        /// <param name="text">The selection range.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().StockChart(Model)
        ///           .Name("StockChart")
        ///           .Navigator(nav => nav.Select(DateTime.Today.AddMonths(-1), DateTime.Today))
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartNavigatorBuilder<T> Select(DateTime? from, DateTime? to)
        {
            navigator.Select.From = from;
            navigator.Select.To = to;

            return this;
        }

        /// <summary>
        /// Defines the navigator series. At least one series should be configured.
        /// </summary>
        /// <param name="configurator">The add action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().StockChart(Model)
        ///             .Name("Chart")
        ///             .Navigator(nav =>
        ///                  nav.Series(series =>
        ///                 {
        ///                     series.Bar(s => s.SalesAmount);
        ///                 })
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartNavigatorBuilder<T> Series(Action<ChartSeriesFactory<T>> configurator)
        {
            ChartSeriesFactory<T> factory = new ChartSeriesFactory<T>(navigator);

            configurator(factory);

            return this;
        }
    }
}