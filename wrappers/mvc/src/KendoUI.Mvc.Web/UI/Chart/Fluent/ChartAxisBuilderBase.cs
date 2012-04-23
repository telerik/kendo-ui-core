// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI.Fluent
{
    using System;
    using KendoUI.Mvc.Infrastructure;
using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring axes.
    /// </summary>
    /// <typeparam name="TAxis"></typeparam>
    /// <typeparam name="TAxisBuilder">The type of the series builder.</typeparam>
    public abstract class ChartAxisBuilderBase<TAxis, TAxisBuilder> : IHideObjectMembers
        where TAxisBuilder : ChartAxisBuilderBase<TAxis, TAxisBuilder>
        where TAxis : IChartAxis
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisBuilderBase{TAxis, TAxisBuilder}"/> class.
        /// </summary>
        /// <param name="axis">The axis.</param>
        protected ChartAxisBuilderBase(TAxis axis)
        {
            Guard.IsNotNull(axis, "axis");

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
        /// Sets the axis minor tick size.
        /// </summary>
        /// <param name="minorTickSize">The minor tick size.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart(Model)
        ///            .Name("Chart")
        ///            .ValueAxis(a => a.Numeric().MinorTickSize(10))
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder MinorTickSize(int minorTickSize)
        {
            Axis.MinorTickSize = minorTickSize;

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Sets the axis major tick size.
        /// </summary>
        /// <param name="majorTickSize">The major tick size.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart(Model)
        ///            .Name("Chart")
        ///            .ValueAxis(a => a.Numeric().MajorTickSize(10))
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder MajorTickSize(int majorTickSize)
        {
            Axis.MajorTickSize = majorTickSize;

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Sets the major tick type.
        /// </summary>
        /// <param name="majorTickType">The major tick type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .ValueAxis(a => a.Numeric().MajorTickType(ChartAxisTickType.Inside))
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder MajorTickType(ChartAxisTickType majorTickType)
        {
            Axis.MajorTickType = majorTickType;

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Sets the minor tick type.
        /// </summary>
        /// <param name="minorTickType">The minor tick type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        ///             .ValueAxis(a => a.Numeric().MinorTickType(ChartAxisTickType.Inside))
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder MinorTickType(ChartAxisTickType minorTickType)
        {
            Axis.MinorTickType = minorTickType;

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Configures the major grid lines.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart()
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
            Guard.IsNotNull(configurator, "configurator");

            configurator(new ChartLineBuilder(Axis.MajorGridLines));

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Sets color and width of the major grid lines and enables them.
        /// </summary>
        /// <param name="color">The major gridlines width</param>
        /// <param name="width">The major gridlines color (CSS syntax)</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart()
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
        /// &lt;%= Html.Telerik().Chart()
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
            Guard.IsNotNull(configurator, "configurator");

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
        /// &lt;%= Html.Telerik().Chart()
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
        /// &lt;%= Html.Telerik().Chart()
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
            Guard.IsNotNull(configurator, "configurator");

            configurator(new ChartLineBuilder(Axis.Line));

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Sets color and width of the lines and enables them.
        /// </summary>
        /// <param name="color">The axis line width</param>
        /// <param name="width">The axis line color (CSS syntax)</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart()
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
        /// Sets value at which the first perpendicular axis crosses this axis.
        /// </summary>
        /// <param name="axisCrossingValue">The value at which the first perpendicular axis crosses this axis.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart(Model)
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis.AxisCrossingValue(4))
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder AxisCrossingValue(double axisCrossingValue)
        {
            Axis.AxisCrossingValues = new double[] { axisCrossingValue };

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Sets value at which perpendicular axes cross this axis.
        /// </summary>
        /// <param name="axisCrossingValues">The values at which perpendicular axes cross this axis.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart(Model)
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis.AxisCrossingValue(0, 10))
        ///            .ValueAxis(axis => axis.Numeric().Title("Axis 1"))
        ///            .ValueAxis(axis => axis.Numeric("secondary").Title("Axis 2"))
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder AxisCrossingValue(params double[] axisCrossingValues)
        {
            Axis.AxisCrossingValues = axisCrossingValues;

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Sets value at which perpendicular axes cross this axis.
        /// </summary>
        /// <param name="axisCrossingValues">The values at which perpendicular axes cross this axis.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart(Model)
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis.AxisCrossingValue(new double[] { 0, 10 }))
        ///            .ValueAxis(axis => axis.Numeric().Title("Axis 1"))
        ///            .ValueAxis(axis => axis.Numeric("secondary").Title("Axis 2"))
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder AxisCrossingValue(IEnumerable<double> axisCrossingValues)
        {
            Axis.AxisCrossingValues = axisCrossingValues;

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Configures the axis labels.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart()
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
        public TAxisBuilder Labels(Action<ChartAxisLabelsBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new ChartAxisLabelsBuilder(Axis.Labels));

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Sets the visibility of numeric axis chart labels.
        /// </summary>
        /// <param name="visible">The visibility. The default value is false.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart()
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
        /// <param name="addAction">The add action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart()
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis
        ///                 .PlotBands.Add()
        ///                 .From(1)
        ///                 .To(2)
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public TAxisBuilder PlotBands(Action<ChartAxisPlotBandsFactory<TAxis>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            ChartAxisPlotBandsFactory<TAxis> factory = new ChartAxisPlotBandsFactory<TAxis>(Axis);

            configurator(factory);

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Configures the chart axis title.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart()
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
            Guard.IsNotNull(configurator, "configurator");

            configurator(new ChartAxisTitleBuilder(Axis.Title));

            return this as TAxisBuilder;
        }

        /// <summary>
        /// Sets the axis title.
        /// </summary>
        /// <param name="title">The axis title.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart()
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
        /// Sets the color for all axis elements. Can be overriden by individual settings.
        /// </summary>
        /// <param name="color">The axis color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart()
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
        /// &lt;%= Html.Telerik().Chart()
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
    }
}