
namespace Kendo.Mvc.UI.Html
{
    public class QRCodeHtmlBuilder : HtmlBuilderBase
    {
        private readonly QRCode qrCode;

        /// <summary>
        /// Initializes a new instance of the <see cref="QRCodeHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The QRCode component.</param>
        public QRCodeHtmlBuilder(QRCode component)
        {
            qrCode = component;
        }

        /// <summary>
        /// Creates the QRCode top-level div.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode CreateQRCode()
        {
            return new HtmlElement("div")
                .Attributes(qrCode.HtmlAttributes);
        }

        /// <summary>
        /// Builds the QRCode component markup.
        /// </summary>
        /// <returns></returns>
        protected override IHtmlNode BuildCore()
        {
            return CreateQRCode();
        }
    }
}
