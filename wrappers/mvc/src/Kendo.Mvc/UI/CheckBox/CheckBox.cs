namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Infrastructure;
    using System.Web.Mvc;

    public class CheckBox<T> : WidgetBase
    {
        public CheckBox(ViewContext viewContext, IJavaScriptInitializer initializer, ViewDataDictionary viewData)
            : base(viewContext, initializer, viewData)
        {
            Enabled = true;
        }

        public T Value
        {
            get;
            set;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public string Format
        {
            get;
            set;
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            VerifySettings();

            CheckBoxHtmlBuilder<T> renderer = new CheckBoxHtmlBuilder<T>(this);

            renderer.Build().WriteTo(writer);
        }
    }
}