namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="ChartElementBorder"/>.
    /// </summary>
    public class ChartBorderBuilder : IHideObjectMembers
    {
        private readonly ChartElementBorder border;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBorderBuilder" /> class.
        /// </summary>
        /// <param name="chartBorder">The chart border.</param>
        public ChartBorderBuilder(ChartElementBorder chartBorder)
        {
            border = chartBorder;
        }

        /// <summary>
        /// Sets the border color.
        /// </summary>
        /// <param name="color">The border color (CSS format).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .ChartArea(chartArea => chartArea.Border(border => border.Color("#f00")))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartBorderBuilder Color(string color)
        {
            border.Color = color;
            return this;
        }

        /// <summary>
        /// Sets the border opacity
        /// </summary>
        /// <param name="opacity">The border opacity (CSS format).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .ChartArea(chartArea => chartArea.Border(border => border.Opacity(0.2)))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartBorderBuilder Opacity(double opacity)
        {
            border.Opacity = opacity;
            return this;
        }

        /// <summary>
        /// Sets the border width.
        /// </summary>
        /// <param name="width">The border width.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .ChartArea(chartArea => chartArea.Border(border => border.Width(2)))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartBorderBuilder Width(int width)
        {
            border.Width = width;
            return this;
        }

        /// <summary>
        /// Sets the border dashType.
        /// </summary>
        /// <param name="dashType">The border dashType.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .ChartArea(chartArea => chartArea.Border(border => border.DashType(ChartDashType.Dot)))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartBorderBuilder DashType(ChartDashType dashType)
        {
            border.DashType = dashType;
            return this;
        }
    }
}