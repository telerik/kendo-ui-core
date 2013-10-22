namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Infrastructure;
    using System.Collections.Generic;
    using System.IO;
    using System.Web.Mvc;

    public class TimezoneEditor : WidgetBase
    {
        public TimezoneEditor(ViewContext viewContext,
                    IJavaScriptInitializer initializer,
                    ViewDataDictionary viewData)
            : base(viewContext, initializer, viewData)
        {

        }

        public string Value
        {
            get;
            set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = this.SeriailzeBaseOptions();

            writer.Write(Initializer.Initialize(Selector, "TimezoneEditor", options));

            base.WriteInitializationScript(writer);
        }

        protected virtual IDictionary<string, object> SeriailzeBaseOptions()
        {
            var options = new Dictionary<string, object>(Events);

            if (!string.IsNullOrEmpty(Value))
            {
                options["value"] = Value;
            }

            return options;
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            TimezoneEditorHtmlBuilder builder = new TimezoneEditorHtmlBuilder(this);

            builder.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}
