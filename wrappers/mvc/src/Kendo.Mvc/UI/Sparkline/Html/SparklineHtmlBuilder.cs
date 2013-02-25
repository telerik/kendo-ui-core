namespace Kendo.Mvc.UI.Html
{
    public class SparklineHtmlBuilder<T> : HtmlBuilderBase where T : class
    {
        private readonly Sparkline<T> sparkline;

        /// <summary>
        /// Initializes a new instance of the <see cref="SparklineHtmlBuilder{T}" /> class.
        /// </summary>
        /// <param name="component">The Sparkline component.</param>
        public SparklineHtmlBuilder(Sparkline<T> component)
        {
            sparkline = component;
        }

        /// <summary>
        /// Creates the chart top-level div.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode CreateSparkline()
        {
            return new HtmlElement("span")
                .Attributes(sparkline.HtmlAttributes)
                .PrependClass("k-sparkline");
        }

        /// <summary>
        /// Builds the Sparkline component markup.
        /// </summary>
        /// <returns></returns>
        protected override IHtmlNode BuildCore()
        {
            return CreateSparkline();
        }
    }
}
