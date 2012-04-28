namespace KendoUI.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using KendoUI.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Chart{T}"/> component.
    /// </summary>
    public class ChartBuilder<T> : ViewComponentBuilderBase<Chart<T>, ChartBuilder<T>>, IHideObjectMembers where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBuilder{T}"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public ChartBuilder(Chart<T> component)
            : base(component)
        {
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events configuration action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .ClientEvents(events => events
        ///                 .OnLoad("onLoad")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> ClientEvents(Action<ChartClientEventsBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new ChartClientEventsBuilder(Component.ClientEvents));

            return this;
        }

        /// <summary>
        /// Sets the theme of the chart.
        /// </summary>
        /// <param name="theme">The Chart theme.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .Theme("Telerik")
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> Theme(string theme)
        {
            Component.Theme = theme;
            return this;
        }

        /// <summary>
        /// Sets the Chart area.
        /// </summary>
        /// <param name="configurator">The Chart area.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .ChartArea(chartArea => chartArea.margin(20))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> ChartArea(Action<ChartAreaBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new ChartAreaBuilder(Component.ChartArea));
            return this;
        }

        /// <summary>
        /// Sets the Plot area.
        /// </summary>
        /// <param name="configurator">The Plot area.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .PlotArea(plotArea => plotArea.margin(20))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> PlotArea(Action<PlotAreaBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new PlotAreaBuilder(Component.PlotArea));
            return this;
        }

        /// <summary>
        /// Sets the title of the chart.
        /// </summary>
        /// <param name="title">The Chart title.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .Title("Yearly sales")
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> Title(string title)
        {
            Component.Title.Text = title;
            return this;
        }

        /// <summary>
        /// Defines the title of the chart.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .Title(title => title.Text("Yearly sales"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> Title(Action<ChartTitleBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new ChartTitleBuilder(Component.Title));

            return this;
        }

        /// <summary>
        /// Sets the legend visibility.
        /// </summary>
        /// <param name="visible">A value indicating whether to show the legend.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .Legend(false)
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> Legend(bool visible)
        {
            Component.Legend.Visible = visible;

            return this;
        }

        /// <summary>
        /// Configures the legend.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .Legend(legend => legend.Visible(true).Position(ChartLegendPosition.Bottom))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> Legend(Action<ChartLegendBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new ChartLegendBuilder(Component.Legend));

            return this;
        }

        /// <summary>
        /// Defines the chart series.
        /// </summary>
        /// <param name="configurator">The add action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .Series(series =>
        ///             {
        ///                 series.Bar(s => s.SalesAmount);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> Series(Action<ChartSeriesFactory<T>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            ChartSeriesFactory<T> factory = new ChartSeriesFactory<T>(Component);

            configurator(factory);

            return this;
        }

        /// <summary>
        /// Defines the options for all chart series of the specified type.
        /// </summary>
        /// <param name="configurator">The configurator.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .SeriesDefaults(series => series.Bar().Stack(true))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> SeriesDefaults(Action<ChartSeriesDefaultsBuilder<T>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new ChartSeriesDefaultsBuilder<T>(Component));

            return this;
        }

        /// <summary>
        /// Defines the options for all chart axes of the specified type.
        /// </summary>
        /// <param name="configurator">The configurator.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .AxisDefaults(axisDefaults => axisDefaults.MinorTickSize(5))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> AxisDefaults(Action<ChartAxisDefaultsBuilder<T>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new ChartAxisDefaultsBuilder<T>(Component));

            return this;
        }

        /// <summary>
        /// Configures the category axis
        /// </summary>
        /// <param name="configurator">The configurator</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .CategoryAxis(axis => axis
        ///                 .Categories(s => s.DateString)
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> CategoryAxis(Action<ChartCategoryAxisBuilder<T>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new ChartCategoryAxisBuilder<T>(Component));

            return this;
        }

        /// <summary>
        /// Defines value axis options
        /// </summary>
        /// <param name="configurator">The configurator</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .ValueAxis(a => a.Numeric().TickSize(4))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> ValueAxis(Action<ChartValueAxisFactory<T>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            ChartValueAxisFactory<T> factory = new ChartValueAxisFactory<T>(Component, Component.ValueAxes);
            configurator(factory);

            return this;
        }

        /// <summary>
        /// Defines X-axis options for scatter charts
        /// </summary>
        /// <param name="configurator">The configurator</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .XAxis(a => a.Numeric().Max(4))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> XAxis(Action<ChartXYAxisFactory<T>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            var factory = new ChartXYAxisFactory<T>(Component, Component.XAxes);
            configurator(factory);

            return this;
        }

        /// <summary>
        /// Configures Y-axis options for scatter charts.
        /// </summary>
        /// <param name="configurator">The configurator</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .YAxis(a => a.Numeric().Max(4))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> YAxis(Action<ChartXYAxisFactory<T>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            var factory = new ChartXYAxisFactory<T>(Component, Component.YAxes);
            configurator(factory);

            return this;
        }

        /// <summary>
        /// Use it to configure binding.
        /// </summary>
        /// <param name="configurator">Use the configurator to set different data binding options.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .DataBinding(dataBinding =>
        ///             {
        ///                 dataBinding.Ajax().Select("SalesData", "Chart").Enabled((bool)ViewData["bindSales"]);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> DataBinding(Action<ChartDataBindingConfigurationBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new ChartDataBindingConfigurationBuilder(Component.DataBinding));

            return this;
        }

        /// <summary>
        /// Sets the series colors.
        /// </summary>
        /// <param name="colors">A list of the series colors.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .SeriesColors(new string[] { "#f00", "#0f0", "#00f" })
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> SeriesColors(IEnumerable<string> colors)
        {
            Component.SeriesColors = colors;

            return this;
        }

        /// <summary>
        /// Sets the series colors.
        /// </summary>
        /// <param name="colors">The series colors.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .SeriesColors("#f00", "#0f0", "#00f")
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> SeriesColors(params string[] colors)
        {
            Component.SeriesColors = colors;

            return this;
        }

        /// <summary>
        /// Use it to configure the data point tooltip.
        /// </summary>
        /// <param name="configurator">Use the configurator to set data tooltip options.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .Tooltip(tooltip =>
        ///             {
        ///                 tooltip.Visible(true).Format("{0:C}");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> Tooltip(Action<ChartTooltipBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new ChartTooltipBuilder(Component.Tooltip));

            return this;
        }

        /// <summary>
        /// Sets the data point tooltip visibility.
        /// </summary>
        /// <param name="visible">
        /// A value indicating if the data point tooltip should be displayed.
        /// The tooltip is not visible by default.
        /// </param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .Tooltip(true)
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> Tooltip(bool visible)
        {
            Component.Tooltip.Visible = visible;

            return this;
        }

        /// <summary>
        /// Enables or disabled animated transitions on initial load and refresh. 
        /// </summary>
        /// <param name="transitions">
        /// A value indicating if transition animations should be played.
        /// </param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .Transitions(false)
        /// %&gt;
        /// </code>
        /// </example>
        public ChartBuilder<T> Transitions(bool transitions)
        {
            Component.Transitions = transitions;
            return this;
        }
    }
}