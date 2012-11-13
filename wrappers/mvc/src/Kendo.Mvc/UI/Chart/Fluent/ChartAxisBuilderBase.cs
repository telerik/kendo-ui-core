namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring axes.
    /// </summary>
    /// <typeparam name="TAxis"></typeparam>
    /// <typeparam name="TValue"></typeparam>
    /// <typeparam name="TAxisBuilder">The type of the series builder.</typeparam>
    public abstract class ChartAxisBuilderBase<TAxis, TValue, TAxisBuilder> : IHideObjectMembers
        where TAxisBuilder : ChartAxisBuilderBase<TAxis, TValue, TAxisBuilder>
        where TValue : struct
        where TAxis : IChartAxis<TValue>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisBuilderBase{TAxis, TValue, TAxisBuilder}"/> class.
        /// </summary>
        /// <param name="axis">The axis.</param>
        protected ChartAxisBuilderBase(TAxis axis)
        {

            Axis = axis;
        }

        /// <summary>
        /// Gets or sets the axis.
        /// </summary>
        /// <value>The axis.</value>
        public TAxis Axis
        {
            get;
            private set;
        }

        /// <summary>
        /// Configures the major ticks.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .ValueAxis(axis => axis
        ///                .MajorTicks(ticks => ticks
        ///                    .Visible(false)
        ///                )
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder MajorTicks(Action<ChartAxisTicksBuilder> configurator)
        {

            configurator(new ChartAxisTicksBuilder(Axis.MajorTicks));

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Configures the minor ticks.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart(Model)
        ///            .Name("Chart")
        ///            .ValueAxis(axis => axis
        ///                .MinorTicks(ticks => ticks
        ///                    .Visible(false)
        ///                )
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder MinorTicks(Action<ChartAxisTicksBuilder> configurator)
        {

            configurator(new ChartAxisTicksBuilder(Axis.MinorTicks));

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Configures the major grid lines.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis
        ///                .Categories(s => s.DateString)
        ///                .MajorGridLines(lines => lines.Visible(true))
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder MajorGridLines(Action<ChartLineBuilder> configurator)
        {

            configurator(new ChartLineBuilder(Axis.MajorGridLines));

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Sets color and width of the major grid lines and enables them.
        /// </summary>
        /// <param name="color">The major gridlines width</param>
        /// <param name="width">The major gridlines color (CSS syntax)</param>
        /// <param name="dashType">The major gridlines line dashType.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis
        ///                .Categories(s => s.DateString)
        ///                .MajorGridLines(2, "red", ChartDashType.Dot)
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder MajorGridLines(int width, string color, ChartDashType dashType)
        {
            Axis.MajorGridLines.Width = width;
            Axis.MajorGridLines.Color = color;
            Axis.MajorGridLines.DashType = dashType;
            Axis.MajorGridLines.Visible = true;

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Configures the minor grid lines.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis
        ///                .Categories(s => s.DateString)
        ///                .MinorGridLines(lines => lines.Visible(true))
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder MinorGridLines(Action<ChartLineBuilder> configurator)
        {

            configurator(new ChartLineBuilder(Axis.MinorGridLines));

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Sets color and width of the minor grid lines and enables them.
        /// </summary>
        /// <param name="color">The minor gridlines width</param>
        /// <param name="width">The minor gridlines color (CSS syntax)</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis
        ///                .Categories(s => s.DateString)
        ///                .MinorGridLines(2, "red", ChartDashType.Dot)
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder MinorGridLines(int width, string color, ChartDashType dashType)
        {
            Axis.MinorGridLines.Width = width;
            Axis.MinorGridLines.Color = color;
            Axis.MinorGridLines.DashType = dashType;
            Axis.MinorGridLines.Visible = true;

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Configures the axis line.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis
        ///                .Categories(s => s.DateString)
        ///                .Line(line => line.Color("#f00"))
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder Line(Action<ChartLineBuilder> configurator)
        {

            configurator(new ChartLineBuilder(Axis.Line));

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Sets color and width of the lines and enables them.
        /// </summary>
        /// <param name="color">The axis line width</param>
        /// <param name="width">The axis line color (CSS syntax)</param>
        /// <param name="dashType">The axis line dashType.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis
        ///                .Categories(s => s.DateString)
        ///                .Line(2, "#f00", ChartDashType.Dot)
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder Line(int width, string color, ChartDashType dashType)
        {
            Axis.Line.Width = width;
            Axis.Line.Color = color;
            Axis.Line.DashType = dashType;
            Axis.Line.Visible = true;

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Configures the axis labels.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis
        ///                .Labels(labels => labels
        ///                    .Color("Red")
        ///                    .Visible(true)
        ///                );
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TAxisBuilder Labels(Action<ChartAxisLabelsBuilder> configurator)
        {

            configurator(new ChartAxisLabelsBuilder(Axis.Labels));

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Sets the visibility of numeric axis chart labels.
        /// </summary>
        /// <param name="visible">The visibility. The default value is false.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis.Labels(true))
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder Labels(bool visible)
        {
            Axis.Labels.Visible = visible;

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Defines the plot bands items.
        /// </summary>
        /// <param name="configurator">The add action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis
        ///                 .PlotBands.Add()
        ///                 .From(1)
        ///                 .To(2)
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder PlotBands(Action<ChartAxisPlotBandsFactory<TAxis, TValue>> configurator)
        {

            var factory = new ChartAxisPlotBandsFactory<TAxis, TValue>(Axis);

            configurator(factory);

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Configures the chart axis title.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis
        ///                .Categories(s => s.DateString)
        ///                .Title(title => title.Text("Axis"))
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder Title(Action<ChartAxisTitleBuilder> configurator)
        {

            configurator(new ChartAxisTitleBuilder(Axis.Title));

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Sets the axis title.
        /// </summary>
        /// <param name="title">The axis title.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis
        ///                .Categories(s => s.DateString)
        ///                .Title("Axis")
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder Title(string title)
        {
            Axis.Title.Text = title;

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Renders the axis in the pane with the specified name.
        /// </summary>
        /// <param name="pane">The pane name.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Panes(panes => {
        ///                panes.Add().Title("Value");
        ///                panes.Add("volumePane").Title("Volume");
        ///            })
        ///            .CategoryAxis(axis => axis
        ///                .Categories(s => s.DateString)
        ///                .Pane("volumePane")
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder Pane(string pane)
        {
            Axis.Pane = pane;

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Sets the color for all axis elements. Can be overriden by individual settings.
        /// </summary>
        /// <param name="color">The axis color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis
        ///                .Categories(s => s.DateString)
        ///                .Color("#ff0000")
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder Color(string color)
        {
            Axis.Color = color;

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Sets the axis reverse option.
        /// </summary>
        /// <param name="reverse">A value indicating if the axis labels should be rendered in reverse.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis
        ///                .Categories(s => s.DateString)
        ///                .Reverse(true)
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder Reverse(bool reverse)
        {
            Axis.Reverse = reverse;

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Sets the axis visibility
        /// </summary>
        /// <param name="visible">The axis visibility.</param>
        public TAxisBuilder Visible(bool visible)
        {
            Axis.Visible = visible;
            return this as TAxisBuilder;
        }

        /// <summary>
        /// A value indicating if the automatic axis range should snap to 0.
        /// </summary>
        /// <param name="narrowRange">The narrowRange value.</param>
        public TAxisBuilder NarrowRange(bool narrowRange)
        {
            Axis.NarrowRange = narrowRange;
            return this as TAxisBuilder;
        }
    }
}