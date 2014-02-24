namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.UI.Html;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Web.Mvc; 

    public class MaskedTextBox : WidgetBase
    {
        public MaskedTextBox(ViewContext viewContext, IJavaScriptInitializer javaScriptInitializer, ViewDataDictionary viewData)
            : base(viewContext, javaScriptInitializer, viewData)
        {
            Enabled = true;
            Rules = new Dictionary<string, object>();
        }

        public string Mask
        {
            get;
            set;
        }

        public string Culture
        {
            get;
            set;
        }     

        public bool Enabled
        {
            get;
            set;
        }

        public string PromptChar
        {
            get;
            set;
        }

        public Dictionary<string, object> Rules
        {
            get;
            private set;
        }

        public string Value
        {
            get;
            set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            if (Mask.HasValue())
            {
                options["mask"] = Mask;
            }

            if (Culture.HasValue())
            {
                options["culture"] = Culture;
            }

            if (PromptChar.HasValue())
            {
                options["promptChar"] = PromptChar;
            }

            options["rules"] = Rules;

            writer.Write(Initializer.Initialize(Selector, "MaskedTextBox", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {

            VerifySettings();

            MaskedTextBoxHtmlBuilder renderer = new MaskedTextBoxHtmlBuilder(this);

            renderer.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}