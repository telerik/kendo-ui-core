namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="ChartAreaLineBuilder"/>.
    /// </summary>
    public class ChartAreaLineBuilder : ChartLineBuilderBase
    {
        private readonly ChartAreaLine line;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAreaLineBuilder" /> class.
        /// </summary>
        /// <param name="chartLine">The chart line.</param>
        public ChartAreaLineBuilder(ChartAreaLine chartLine)
            : base(chartLine)
        {
            line = chartLine;
        }

        /// <summary>
        /// Sets the line color
        /// </summary>
        /// <param name="color">The line color (CSS format).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Area(s => s.Sales)
        ///               .Line(line => line.Color("#f00"))
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public override ChartLineBuilderBase Color(string color)
        {
            base.Color(color);
            return this;
        }

        /// <summary>
        /// Sets the line width
        /// </summary>
        /// <param name="width">The line width.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Area(s => s.Sales)
        ///               .Line(line => line.Width(6))
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public override ChartLineBuilderBase Width(int width)
        {
            base.Width(width);
            return this;
        }

        /// <summary>
        /// Sets the line dashType.
        /// </summary>
        /// <param name="dashType">The line dashType.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Area(s => s.Sales)
        ///               .Line(line => line.DashType(ChartDashType.Dot))
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public override ChartLineBuilderBase DashType(ChartDashType dashType)
        {
            base.DashType(dashType);
            return this;
        }

        /// <summary>
        /// Sets the line opacity.
        /// </summary>
        /// <param name="opacity">The line opacity.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Area(s => s.Sales)
        ///               .Line(line => line.Opacity(0.2))
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public ChartAreaLineBuilder Opacity(double opacity)
        {
            line.Opacity = opacity;
            return this;
        }

        /// <summary>
        /// Configures the style for line series.
        /// </summary>
        /// <param name="style">The style. The default is normal.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Series(series => series
        ///                .Area(s => s.Sales)
        ///                .Line(line => line.Style(ChartAreaStyle.Step))
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartAreaLineBuilder Style(ChartAreaStyle style)
        {
            line.Style = style;

            return this;
        }
    }
}