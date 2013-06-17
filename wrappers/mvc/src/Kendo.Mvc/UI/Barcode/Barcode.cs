namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using System.Web;
    using Kendo.Mvc.UI.Html; 

    public class Barcode : WidgetBase
    {
        public Barcode(ViewContext viewContext, IJavaScriptInitializer javaScriptInitializer)
            : base(viewContext, javaScriptInitializer)
        {
            this.Encoding = BarcodeSymbology.Code128;
        }

        public string Value { get; set; }

        public BarcodeSymbology Encoding { get; set; }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            BarcodeHtmlBuilder builder = new BarcodeHtmlBuilder(this);

            builder.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            options["encoding"] = new { name = this.Encoding }.ToDictionary();

            if (Value.HasValue())
            {
                options["value"] = Value;
            }

            writer.Write(Initializer.Initialize(Selector, "Barcode", options));

            base.WriteInitializationScript(writer);
        }

        public override void VerifySettings()
        {
            base.VerifySettings();

            if (String.IsNullOrEmpty(Value))
            {
                throw new ArgumentException(Exceptions.CannotBeNullOrEmpty.FormatWith("Value"));
            }

            if (this.Encoding == BarcodeSymbology.EAN8 && this.Value.Length !=7 )
            {
                throw new ArgumentException(Exceptions.ValueNotValidForProperty.FormatWith("Value"));
            }

            //TODO ADD VALIDATION FOR ALL ENCODINGS
        }
    }
}
