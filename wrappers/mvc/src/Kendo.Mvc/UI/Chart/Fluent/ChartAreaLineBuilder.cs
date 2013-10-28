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
        /// Configures the line style for area series.
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