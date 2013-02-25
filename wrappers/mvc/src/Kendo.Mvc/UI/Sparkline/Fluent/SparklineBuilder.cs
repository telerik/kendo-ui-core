namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Collections;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Sparkline{T}"/> component.
    /// </summary>
    public class SparklineBuilder<T> : WidgetBuilderBase<Sparkline<T>, SparklineBuilder<T>>, IHideObjectMembers
        where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SparklineBuilder{T}"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public SparklineBuilder(Sparkline<T> component)
            : base(component)
        {
        }

        /// <summary>
        /// Sets the Sparkline data.
        /// </summary>
        /// <param name="data">The data for the default Sparkline series.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Sparkline()
        ///             .Name("Sparkline")
        ///             .Data(new int[] { 1, 2 })
        /// %&gt;
        /// </code>
        /// </example>
        public virtual SparklineBuilder<T> Data(IEnumerable data)
        {
            var boxedData = new List<T>();
            foreach (T item in data)
            {
                boxedData.Add(item);
            }

            Component.Data = boxedData;

            return this;
        }

        /// <summary>
        /// Sets the type of the sparkline.
        /// </summary>
        /// <param name="theme">The Sparkline type.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Sparkline()
        ///             .Name("Sparkline")
        ///             .Type(SparklineType.Area)
        /// %&gt;
        /// </code>
        /// </example>
        public SparklineBuilder<T> Type(SparklineType type)
        {
            Component.Type = type;
            return this;
        }

        /// <summary>
        /// Sets the per-point width of the sparkline.
        /// </summary>
        /// <param name="theme">The Sparkline per-point width.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Sparkline()
        ///             .Name("Sparkline")
        ///             .PointWidth(2)
        /// %&gt;
        /// </code>
        /// </example>
        public SparklineBuilder<T> PointWidth(double pointWidth)
        {
            Component.PointWidth = pointWidth;
            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events configuration action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Sparkline()
        ///             .Name("Sparkline")
        ///             .Events(events => events
        ///                 .OnLoad("onLoad")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public SparklineBuilder<T> Events(Action<ChartEventBuilder> configurator)
        {
            configurator(new ChartEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Sets the theme of the chart.
        /// </summary>
        /// <param name="theme">The Sparkline theme.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Sparkline()
        ///             .Name("Sparkline")
        ///             .Theme("Telerik")
        /// %&gt;
        /// </code>
        /// </example>
        public SparklineBuilder<T> Theme(string theme)
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
        ///  &lt;%= Html.Kendo().Sparkline()
        ///             .Name("Sparkline")
        ///             .ChartArea(chartArea => chartArea.margin(20))
        /// %&gt;
        /// </code>
        /// </example>
        public SparklineBuilder<T> ChartArea(Action<ChartAreaBuilder> configurator)
        {

            configurator(new ChartAreaBuilder(Component.ChartArea));
            return this;
        }

        /// <summary>
        /// Sets the Plot area.
        /// </summary>
        /// <param name="configurator">The Plot area.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Sparkline()
        ///             .Name("Sparkline")
        ///             .PlotArea(plotArea => plotArea.margin(20))
        /// %&gt;
        /// </code>
        /// </example>
        public SparklineBuilder<T> PlotArea(Action<PlotAreaBuilder> configurator)
        {

            configurator(new PlotAreaBuilder(Component.PlotArea));
            return this;
        }

        /// <summary>
        /// Defines the chart series.
        /// </summary>
        /// <param name="configurator">The add action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Sparkline(Model)
        ///             .Name("Sparkline")
        ///             .Series(series =>
        ///             {
        ///                 series.Bar(s => s.SalesAmount);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public SparklineBuilder<T> Series(Action<SparklineSeriesFactory<T>> configurator)
        {
            SparklineSeriesFactory<T> factory = new SparklineSeriesFactory<T>(Component);

            configurator(factory);

            return this;
        }

        /// <summary>
        /// Defines the options for all chart series of the specified type.
        /// </summary>
        /// <param name="configurator">The configurator.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Sparkline(Model)
        ///             .Name("Sparkline")
        ///             .SeriesDefaults(series => series.Bar().Stack(true))
        /// %&gt;
        /// </code>
        /// </example>
        public SparklineBuilder<T> SeriesDefaults(Action<SparklineSeriesDefaultsBuilder<T>> configurator)
        {
            configurator(new SparklineSeriesDefaultsBuilder<T>(Component));

            return this;
        }

        /// <summary>
        /// Defines the options for all chart axes of the specified type.
        /// </summary>
        /// <param name="configurator">The configurator.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Sparkline(Model)
        ///             .Name("Sparkline")
        ///             .AxisDefaults(axisDefaults => axisDefaults.MinorTickSize(5))
        /// %&gt;
        /// </code>
        /// </example>
        public SparklineBuilder<T> AxisDefaults(Action<ChartAxisDefaultsBuilder<T>> configurator)
        {

            configurator(new ChartAxisDefaultsBuilder<T>(Component));

            return this;
        }

        /// <summary>
        /// Configures the category axis
        /// </summary>
        /// <param name="configurator">The configurator</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Sparkline(Model)
        ///             .Name("Sparkline")
        ///             .CategoryAxis(axis => axis
        ///                 .Categories(s => s.DateString)
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public SparklineBuilder<T> CategoryAxis(Action<ChartCategoryAxisBuilder<T>> configurator)
        {
            var categoryAxis = new ChartCategoryAxis<T>(Component);

            configurator(new ChartCategoryAxisBuilder<T>(Component, categoryAxis));
            Component.CategoryAxes.Add(categoryAxis);

            return this;
        }

        /// <summary>
        /// Defines value axis options
        /// </summary>
        /// <param name="configurator">The configurator</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Sparkline(Model)
        ///             .Name("Sparkline")
        ///             .ValueAxis(a => a.Numeric().TickSize(4))
        /// %&gt;
        /// </code>
        /// </example>
        public SparklineBuilder<T> ValueAxis(Action<ChartValueAxisFactory<T>> configurator)
        {

            ChartValueAxisFactory<T> factory = new ChartValueAxisFactory<T>(Component, Component.ValueAxes);
            configurator(factory);

            return this;
        }

        /// <summary>
        /// Data Source configuration
        /// </summary>
        /// <param name="configurator">Use the configurator to set different data binding options.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Sparkline()
        ///             .Name("Sparkline")
        ///             .DataSource(ds =>
        ///             {
        ///                 ds.Ajax().Read(r => r.Action("SalesData", "Sparkline"));
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public SparklineBuilder<T> DataSource(Action<ReadOnlyAjaxDataSourceBuilder<T>> configurator)
        {
            configurator(new ReadOnlyAjaxDataSourceBuilder<T>(Component.DataSource, this.Component.ViewContext, this.Component.UrlGenerator));

            return this;
        }

        /// <summary>
        /// Enables or disables automatic binding.
        /// </summary>
        /// <param name="autoBind">
        /// Gets or sets a value indicating if the chart
        /// should be data bound during initialization.
        /// The default value is true.
        /// </param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Sparkline()
        ///             .Name("Sparkline")
        ///             .DataSource(ds =>
        ///             {
        ///                 ds.Ajax().Read(r => r.Action("SalesData", "Sparkline"));
        ///             })
        ///             .AutoBind(false)
        /// %&gt;
        /// </code>
        /// </example>
        public SparklineBuilder<T> AutoBind(bool autoBind)
        {
            Component.AutoBind = autoBind;

            return this;
        }

        /// <summary>
        /// Sets the series colors.
        /// </summary>
        /// <param name="colors">A list of the series colors.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Sparkline()
        ///             .Name("Sparkline")
        ///             .SeriesColors(new string[] { "#f00", "#0f0", "#00f" })
        /// %&gt;
        /// </code>
        /// </example>
        public SparklineBuilder<T> SeriesColors(IEnumerable<string> colors)
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
        ///  &lt;%= Html.Kendo().Sparkline()
        ///             .Name("Sparkline")
        ///             .SeriesColors("#f00", "#0f0", "#00f")
        /// %&gt;
        /// </code>
        /// </example>
        public SparklineBuilder<T> SeriesColors(params string[] colors)
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
        ///  &lt;%= Html.Kendo().Sparkline()
        ///             .Name("Sparkline")
        ///             .Tooltip(tooltip =>
        ///             {
        ///                 tooltip.Visible(true).Format("{0:C}");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public SparklineBuilder<T> Tooltip(Action<ChartTooltipBuilder> configurator)
        {

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
        ///  &lt;%= Html.Kendo().Sparkline()
        ///             .Name("Sparkline")
        ///             .Tooltip(true)
        /// %&gt;
        /// </code>
        /// </example>
        public SparklineBuilder<T> Tooltip(bool visible)
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
        ///  &lt;%= Html.Kendo().Sparkline()
        ///             .Name("Sparkline")
        ///             .Transitions(false)
        /// %&gt;
        /// </code>
        /// </example>
        public SparklineBuilder<T> Transitions(bool transitions)
        {
            Component.Transitions = transitions;
            return this;
        }
    }
}