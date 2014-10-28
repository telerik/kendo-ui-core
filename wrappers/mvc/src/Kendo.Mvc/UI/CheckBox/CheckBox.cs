namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Infrastructure;
    using System.Web.Mvc;

    public class CheckBox : WidgetBase
    {
        public CheckBox(ViewContext viewContext, IJavaScriptInitializer initializer, ViewDataDictionary viewData)
            : base(viewContext, initializer, viewData)
        {
            Enabled = true;
        }

        public bool Value
        {
            get;
            set;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public bool Checked
        {
            get;
            set;
        }

        public string Label
        {
            get;
            set;
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            VerifySettings();

            var renderer = new CheckBoxHtmlBuilder(this);

            renderer.Build().WriteTo(writer);
        }
    }
}