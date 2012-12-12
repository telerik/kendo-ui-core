namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="ChartArea"/>.
    /// </summary>
    public class ChartAreaBuilder : IHideObjectMembers
    {
        private readonly ChartArea chartArea;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAreaBuilder" /> class.
        /// </summary>
        /// <param name="chartArea">The chart area.</param>
        public ChartAreaBuilder(ChartArea chartArea)
        {
            this.chartArea = chartArea;
        }

        /// <summary>
        /// Sets the chart area background color.
        /// </summary>
        /// <param name="background">The background color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .ChartArea(chartArea => chartArea.Background("Red"))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAreaBuilder Background(string background)
        {
            chartArea.Background = background;
            return this;
        }

        /// <summary>
        /// Sets the chart area margin.
        /// </summary>
        /// <param name="top">The chart area top margin.</param>
        /// <param name="right">The chart area right margin.</param>
        /// <param name="bottom">The chart area bottom margin.</param>
        /// <param name="left">The chart area left margin.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .ChartArea(chartArea => chartArea.Margin(0, 5, 5, 0))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAreaBuilder Margin(int top, int right, int bottom, int left)
        {
            chartArea.Margin.Top = top;
            chartArea.Margin.Right = right;
            chartArea.Margin.Bottom = bottom;
            chartArea.Margin.Left = left;

            return this;
        }

        /// <summary>
        /// Sets the chart area margin.
        /// </summary>
        /// <param name="margin">The chart area margin.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .ChartArea(chartArea => chartArea.Margin(5))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>          
        public ChartAreaBuilder Margin(int margin)
        {
            chartArea.Margin = new ChartSpacing(margin);
            return this;
        }

        /// <summary>
        /// Sets the chart area border.
        /// </summary>
        /// <param name="width">The border width.</param>
        /// <param name="color">The border color (CSS syntax).</param>
        /// <param name="dashType">The border dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .ChartArea(chartArea => chartArea.Border(1, "#000", ChartDashType.Dot))
        ///            .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAreaBuilder Border(int width, string color, ChartDashType dashType)
        {
            chartArea.Border = new ChartElementBorder(width, color, dashType);
            return this;
        }

        /// <summary>
        /// Configures the plot area border
        /// </summary>
        /// <param name="configurator">The border configuration action</param>
        public ChartAreaBuilder Border(Action<ChartBorderBuilder> configurator)
        {
            configurator(new ChartBorderBuilder(chartArea.Border));
            return this;
        }
    }
}