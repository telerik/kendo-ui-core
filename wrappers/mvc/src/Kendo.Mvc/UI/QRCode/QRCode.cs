namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI.Html;


    public class QRCode: WidgetBase
    {
        public QRCode(ViewContext viewContext, IJavaScriptInitializer initializer)
            : base(viewContext, initializer)
        {
            this.ErrorCorrectionLevel = QRErrorCorrectionLevel.L;
            this.Border = new QRBorder();
            this.Options = new Dictionary<string, object>();
        }

        protected virtual Dictionary<string, object> Options
        {
            get;
            set;
        }

        public string Value 
        { 
            get; 
            set; 
        }

        public QRBorder Border
        {
            get;
            set;
        }
        public int? Size
        {
            get;
            set;
        }

        public string DarkModuleColor
        {
            get;
            set;
        }

        public string Background 
        {
            get; 
            set; 
        }

        public QRErrorCorrectionLevel ErrorCorrectionLevel
        {
            get;
            set;
        }

        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            if (this.ErrorCorrectionLevel != DefaultErrorCorrectionLevel)
            {
                Options["errorCorrectionLevel"] = this.ErrorCorrectionLevel.ToString();
            }            

            if (!string.IsNullOrEmpty(Value))
            {
                Options["value"] = Value;
            }

            if (!string.IsNullOrEmpty(Background))
            {
                Options["background"] =Background;
            }

            if (!string.IsNullOrEmpty(DarkModuleColor))
            {
                Options["darkModuleColor"] = DarkModuleColor;
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

        private const QRErrorCorrectionLevel DefaultErrorCorrectionLevel = QRErrorCorrectionLevel.L;
    }
}
