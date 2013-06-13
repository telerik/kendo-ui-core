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

    public class Barcode : WidgetBase
    {
        public Barcode(ViewContext viewContext, IJavaScriptInitializer javaScriptInitializer)
            : base(viewContext, javaScriptInitializer)
        { 
           
        }

        public string Value { get; set; }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);
            
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
        }
    }
}
