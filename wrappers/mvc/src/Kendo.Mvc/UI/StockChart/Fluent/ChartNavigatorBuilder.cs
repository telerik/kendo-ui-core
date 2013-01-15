namespace Kendo.Mvc.UI.Fluent
{
    using System;
    
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="ChartNavigator{T}"/>.
    /// </summary>
    public class ChartNavigatorBuilder<T> : IHideObjectMembers where T : class
    {
        private readonly ChartNavigator<T> navigator;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNavigatorBuilder{T}" /> class.
        /// </summary>
        /// <param name="chartNavigator">The stock chart navigator.</param>
        public ChartNavigatorBuilder(ChartNavigator<T> chartNavigator)
        {
            navigator = chartNavigator;
        }

        /// <summary>
        /// Sets the selection range
        /// </summary>
        /// <param name="from">The selection range start.</param>
        /// <param name="to">The selection range end.</param>
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
            configurator(new ChartSeriesFactory<T>(navigator));

            return this;
        }

        /// <summary>
        /// Sets the navigator visibility
        /// </summary>
        /// <param name="visible">The navigator visibility.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().StockChart(Model)
        ///            .Name("Chart")
        ///            .Navigator(nav => nav
        ///                 .Series(series =>
        ///                 {
        ///                    series.Bar(s => s.SalesAmount);
        ///                 })
        ///                 .Visible(false)
        ///            )
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartNavigatorBuilder<T> Visible(bool visible)
        {
            navigator.Visible = visible;
            return this;
        }

        /// <summary>
        /// Defines the navigator hint.
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
        public ChartNavigatorBuilder<T> Hint(Action<ChartNavigatorHintBuilder> configurator)
        {
            configurator(new ChartNavigatorHintBuilder(navigator.Hint));

            return this;
        }

        /// <summary>
        /// Data Source configuration for the Navigator.
        /// When configured, the Navigator will filter the main StockChart data source to the selected range.
        /// </summary>
        /// <param name="configurator">Use the configurator to set different data binding options.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().StockChart()
        ///             .Name("Chart")
        ///             .Navigator(navi => navi
        ///             .DataSource(ds =>
        ///                 {
        ///                     ds.Ajax().Read(r => r.Action("SalesData", "Chart"));
        ///                 })
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartNavigatorBuilder<T> DataSource(Action<ReadOnlyAjaxDataSourceBuilder<T>> configurator)
        {
            configurator(new ReadOnlyAjaxDataSourceBuilder<T>(navigator.DataSource, navigator.ViewContext, navigator.UrlGenerator));

            return this;
        }

        /// <summary>
        /// Sets the field used by the navigator date axes.
        /// </summary>
        /// <param name="dateField">The date field.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().StockChart(Model)
        ///             .Name("Chart")
        ///             .Navigator(navi => navi
        ///                 .DateField("Date")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartNavigatorBuilder<T> DateField(string dateField)
        {
            navigator.DateField = dateField;
            return this;
        }

        /// <summary>
        /// Enables or disables automatic binding.
        /// </summary>
        /// <param name="autoBind">
        /// Gets or sets a value indicating if the navigator
        /// should be data bound during initialization.
        /// The default value is true.
        /// </param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().StockChart()
        ///             .Name("Chart")
        ///             .Navigator(navi => navi
        ///                 .DataSource(ds =>
        ///                 {
        ///                     ds.Ajax().Read(r => r.Action("SalesData", "Chart"));
        ///                 })
        ///                 .AutoBind(false)
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartNavigatorBuilder<T> AutoBind(bool autoBind)
        {
            navigator.AutoBind = autoBind;

            return this;
        }
    }
}