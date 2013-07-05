namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI.Html;

    /// <summary>
    /// The server side wrapper for the Kendo UI QRCode.
    /// </summary>
    public class QRCode: WidgetBase
    {
        public QRCode(ViewContext viewContext, IJavaScriptInitializer initializer)
            : base(viewContext, initializer)
        {
            this.ErrorCorrection = QRErrorCorrectionLevel.L;
            this.Border = new QRBorder();
            this.Options = new Dictionary<string, object>();
        }

        protected virtual Dictionary<string, object> Options
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the QRCode value.
        /// </summary>
        /// <value>The QRCode value.</value>
        public string Value
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the render type.
        /// </summary>
        /// <value>The render type.</value>
        public RenderingMode? RenderAs
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the border configuration.
        /// </summary>
        public QRBorder Border
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the QRCode size.
        /// </summary>
        /// <value>The QRCode size.</value>
        public int? Size
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the QRCode color.
        /// </summary>
        /// <value>The QRCode color.</value>
        public string Color
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the QRCode background.
        /// </summary>
        /// <value>The QRCode background.</value>
        public string Background
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the QRCode error correction level.
        /// </summary>
        /// <value>The QRCode error correction level.</value>
        public QRErrorCorrectionLevel ErrorCorrection
        {
            get;
            set;
        }

        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            if (ErrorCorrection != DefaultErrorCorrection)
            {
                Options["errorCorrection"] = ErrorCorrection.ToString();
            }

            if (!string.IsNullOrEmpty(Value))
            {
                Options["value"] = Value;
            }

            if (RenderAs.HasValue) {
                Options["renderAs"] = RenderAs.ToString().ToLowerInvariant();
            }

            if (!string.IsNullOrEmpty(Background))
            {
                Options["background"] =Background;
            }

            if (!string.IsNullOrEmpty(Color))
            {
                Options["color"] = Color;
            }

            if (this.Size.HasValue)
            {
                Options["size"] = Size;
            }

            if (this.Border.ShouldSerialize())
            {
                Options["border"] = Border.ToJson();
            }

            writer.Write(Initializer.Initialize(Selector, "QRCode", Options));
            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            var htmlBuilder = new QRCodeHtmlBuilder(this);
            if (!HtmlAttributes.ContainsKey("id"))
            {
                HtmlAttributes["id"] = Id;
            }

            htmlBuilder
                .Build()
                .WriteTo(writer);

            base.WriteHtml(writer);
        }

        private const QRErrorCorrectionLevel DefaultErrorCorrection = QRErrorCorrectionLevel.L;
    }
}
