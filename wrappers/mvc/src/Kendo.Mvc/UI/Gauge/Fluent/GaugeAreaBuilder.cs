namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="GaugeArea"/>.
    /// </summary>
    public class GaugeAreaBuilder : IHideObjectMembers
    {
        private readonly GaugeArea gaugeArea;

        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeAreaBuilder" /> class.
        /// </summary>
        /// <param name="gaugeArea">The gauge area.</param>
        public GaugeAreaBuilder(GaugeArea gaugeArea)
        {
            this.gaugeArea = gaugeArea;
        }

        /// <summary>
        /// Sets the chart area background color.
        /// </summary>
        /// <param name="background">The background color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .GaugeArea(gaugeArea => gaugeArea.Background("red"))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeAreaBuilder Background(string background)
        {
            gaugeArea.Background = background;
            return this;
        }

        /// <summary>
        /// Sets the gauge area margin.
        /// </summary>
        /// <param name="top">The gauge area top margin.</param>
        /// <param name="right">The gauge area right margin.</param>
        /// <param name="bottom">The gauge area bottom margin.</param>
        /// <param name="left">The gauge area left margin.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .GaugeArea(gaugeArea => gaugeArea.Margin(0, 5, 5, 0))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeAreaBuilder Margin(int top, int right, int bottom, int left)
        {
            gaugeArea.Margin.Top = top;
            gaugeArea.Margin.Right = right;
            gaugeArea.Margin.Bottom = bottom;
            gaugeArea.Margin.Left = left;

            return this;
        }

        /// <summary>
        /// Sets the gauge area margin.
        /// </summary>
        /// <param name="margin">The gauge area margin.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .GaugeArea(gaugeArea => gaugeArea.Margin(5))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>          
        public GaugeAreaBuilder Margin(int margin)
        {
            gaugeArea.Margin = new ChartSpacing(margin);
            return this;
        }

        /// <summary>
        /// Sets the gauge area border.
        /// </summary>
        /// <param name="width">The border width.</param>
        /// <param name="color">The border color (CSS syntax).</param>
        /// <param name="dashType">The border dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .GaugeArea(gaugeArea => gaugeArea.Border(1, "#000", ChartDashType.Dot))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeAreaBuilder Border(int width, string color, ChartDashType dashType)
        {
            gaugeArea.Border = new ChartElementBorder(width, color, dashType);
            return this;
        }

        /// <summary>
        /// Configures the gauge area border
        /// </summary>
        /// <param name="configurator">The border configuration action</param>
        public GaugeAreaBuilder Border(Action<ChartBorderBuilder> configurator)
        {
            configurator(new ChartBorderBuilder(gaugeArea.Border));
            return this;
        }
    }
}