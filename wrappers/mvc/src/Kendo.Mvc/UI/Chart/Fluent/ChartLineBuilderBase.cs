namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="ChartLine"/>.
    /// </summary>
    public class ChartLineBuilderBase : IHideObjectMembers
    {
        private readonly ChartLineBase line;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLineBuilder" /> class.
        /// </summary>
        /// <param name="chartLine">The chart line.</param>
        public ChartLineBuilderBase(ChartLineBase chartLine)
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
        ///           .CategoryAxis(axis => axis.MajorGridLines(lines => lines.Color("#f00")))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ChartLineBuilderBase Color(string color)
        {
            line.Color = color;
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
        ///           .CategoryAxis(axis => axis.MajorGridLines(lines => lines.Width(2)))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public virtual ChartLineBuilderBase Width(int width)
        {
            line.Width = width;
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
        ///           .CategoryAxis(axis => axis.MajorGridLines(lines => lines.DashType(ChartDashType.Dot)))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ChartLineBuilderBase DashType(ChartDashType dashType)
        {
            line.DashType = dashType;
            return this;
        }
    }
}