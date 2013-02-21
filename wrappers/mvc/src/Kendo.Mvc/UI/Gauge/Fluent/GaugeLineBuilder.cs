namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="GaugeLine"/>.
    /// </summary>
    public class GaugeLineBuilder : ChartLineBuilderBase
    {
        private readonly ChartLine line;

        /// <summary>
        /// Initializes a new instance of the <see cref="GugeLineBuilder" /> class.
        /// </summary>
        /// <param name="gaugeLine">The chart line.</param>
        public GaugeLineBuilder(ChartLine gaugeLine)
            : base(gaugeLine)
        {
            line = gaugeLine;
        }

        /// <summary>
        /// Sets the line visibility
        /// </summary>
        /// <param name="visible">The line visibility.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().LinearGauge()
        ///           .Name("linearGauge")
        ///           .Scale(scale => scale.Line(line => line.Color("#f00")))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public GaugeLineBuilder Visible(bool visible)
        {
            line.Visible = visible;
            return this;
        }
    }
}