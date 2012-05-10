namespace Kendo.Mvc.UI.Fluent
{
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
        /// &lt;% Html.Telerik().LinearGauge()
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
        /// Sets the chart area margin.
        /// </summary>
        /// <param name="top">The chart area top margin.</param>
        /// <param name="right">The chart area right margin.</param>
        /// <param name="bottom">The chart area bottom margin.</param>
        /// <param name="left">The chart area left margin.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().LinearGauge()
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
        /// Sets the chart area margin.
        /// </summary>
        /// <param name="margin">The chart area margin.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().LinearGauge()
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
        /// Sets the chart area border.
        /// </summary>
        /// <param name="width">The border width.</param>
        /// <param name="color">The border color (CSS syntax).</param>
        /// <param name="dashType">The border dash type.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Telerik().LinearGauge()
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
    }
}