namespace Kendo.Mvc.UI.Html
{
    public class GaugeHtmlBuilder : HtmlBuilderBase
    {
        private readonly Gauge gauge;

        /// <summary>
        /// Initializes a new instance of the <see cref="GaugeHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The Gauge component.</param>
        public GaugeHtmlBuilder(Gauge component)
        {
            gauge = component;
        }

        /// <summary>
        /// Creates the chart top-level div.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode CreateGauge()
        {
            return new HtmlElement("div")
                .Attributes(gauge.HtmlAttributes);
        }

        /// <summary>
        /// Builds the Gauge component markup.
        /// </summary>
        /// <returns></returns>
        protected override IHtmlNode BuildCore()
        {
            return CreateGauge();
        }
    }
}