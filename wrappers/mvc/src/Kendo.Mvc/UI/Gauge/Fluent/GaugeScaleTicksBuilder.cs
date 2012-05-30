namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="GaugeScaleTicks"/>.
    /// </summary>
    public class GaugeScaleTicksBuilder : IHideObjectMembers
    {
        private readonly GaugeScaleTicks ticks;

        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeScaleTicksBuilder" /> class.
        /// </summary>
        /// <param name="gaugeTicks">The gauge scale ticks.</param>
        public GaugeScaleTicksBuilder(GaugeScaleTicks gaugeTicks)
        {
            ticks = gaugeTicks;
        }

        /// <summary>
        /// Sets the ticks color
        /// </summary>
        /// <param name="color">The ticks color (CSS format).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Scale(scale => scale.MajorTicks(ticks => ticks.Color("#f00")))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public GaugeScaleTicksBuilder Color(string color)
        {
            ticks.Color = color;
            return this;
        }

        /// <summary>
        /// Sets the ticks width
        /// </summary>
        /// <param name="width">The ticks width.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Scale(scale => scale.MajorTicks(ticks => ticks.Width(2)))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeScaleTicksBuilder Width(int width)
        {
            ticks.Width = width;
            return this;
        }

        /// <summary>
        /// Sets the ticks size
        /// </summary>
        /// <param name="size">The ticks size.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Scale(scale => scale.MajorTicks(ticks => ticks.Size(2)))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeScaleTicksBuilder Size(int size)
        {
            ticks.Size = size;
            return this;
        }

        /// <summary>
        /// Sets the ticks dashType
        /// </summary>
        /// <param name="dashType">The ticks dashType.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Scale(scale => scale.MajorTicks(ticks => ticks.DashType(ChartDashType.Dot)))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeScaleTicksBuilder DashType(ChartDashType dashType)
        {
            ticks.DashType = dashType;
            return this;
        }

        /// <summary>
        /// Sets the ticks visibility
        /// </summary>
        /// <param name="visible">The ticks visibility.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Scale(scale => scale.MajorTicks(ticks => ticks.Visible(false)))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeScaleTicksBuilder Visible(bool visible)
        {
            ticks.Visible = visible;
            return this;
        }
    }
}