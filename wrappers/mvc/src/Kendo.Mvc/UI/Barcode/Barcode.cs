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
            this.Border = new BarcodeElementBorder();
            this.Padding = new BarcodeSpacing();
            this.Text = new BarcodeTextElement();
        }

        public string Value { get; set; }

        public string Background { get; set; }

        public BarcodeSymbology Encoding { get; set; }

        public BarcodeElementBorder Border { get; set; }

        public BarcodeSpacing Padding { get; set; }

        public BarcodeTextElement Text { get; set; }

        public int? Height { get; set; }

        public int? Width { get; set; }

        public string Color { get; set; }

        public bool Checksum { get; set; }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            BarcodeHtmlBuilder builder = new BarcodeHtmlBuilder(this);

            builder.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            options["type"] = this.Encoding;

            if (this.Encoding == BarcodeSymbology.GS1128)
            {
                options["type"] = "gs1-128";
            }

            if (this.Checksum == false)
            {
                options["checksum"] = this.Checksum;
            }

            if (Value.HasValue())
            {
                options["value"] = Value;
            }

            if (Background.HasValue())
            {
                options["background"] = Background;
            }

            if (Color.HasValue())
            {
                options["color"] = Color;
            }

            if (Height.HasValue)
            {
                options["height"] = Height;
            }

            if (Width.HasValue)
            {
                options["width"] = Width;
            }

            if (this.Border.Color.HasValue() || this.Border.DashType !=  null || 
                this.Border.Width.HasValue)
            {
                options["border"] = new BarcodeElementBorderSerializer(this.Border).Serialize();
            }

            if (this.Padding.ShouldSerialize())
            {
                options["padding"] = this.Padding.CreateSerializer().Serialize();
            }

            if (this.Text.ShouldSerialize())
            {
                options["text"] = this.Text.ToJson();
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
