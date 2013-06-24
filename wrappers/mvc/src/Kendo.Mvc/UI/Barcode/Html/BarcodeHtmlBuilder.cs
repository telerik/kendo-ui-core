namespace Kendo.Mvc.UI.Html
{
    public class BarcodeHtmlBuilder
    {
        private readonly Barcode Barcode;

        /// <summary>
        /// Initializes a new instance of the <see cref="BarcodeHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The Barcode component.</param>
        public BarcodeHtmlBuilder(Barcode component)
        {
            Barcode = component;
        }

        /// <summary>
        /// Creates the barcode top-level div.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode CreateBarcode()
        {
            return new HtmlElement("div")
                .Attributes(Barcode.HtmlAttributes);
        }

        /// <summary>
        /// Builds the Barcode component markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            return new HtmlElement("div")
                            .Attribute("id", Barcode.Id)
                            .Attributes(Barcode.HtmlAttributes)
                            .PrependClass("k-barcode");
        }
    }
}